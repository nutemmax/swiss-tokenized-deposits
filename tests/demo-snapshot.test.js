const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const appPath = path.join(__dirname, '..', 'demo', 'deprecated', 'v1', 'app.js');
const appSource = fs.readFileSync(appPath, 'utf8')
  .replace("document.addEventListener('DOMContentLoaded', init);", '')
  .concat('\nglobalThis.__demoSnapshot = { state, snapshot, failureApplicable, failureTrigger, finalStep, currentSteps, MODELS, SCENARIOS, FAILURES };');
const sandbox = {};
vm.runInNewContext(appSource, sandbox, { filename: appPath });
const { state, snapshot, failureApplicable, failureTrigger, finalStep, currentSteps, MODELS, SCENARIOS, FAILURES } = sandbox.__demoSnapshot;

function setScenario(model, scenario, step, failure = 'none') {
  Object.assign(state, { model, scenario, step, failure, playing: false, selectedActor: 'alice', timer: null });
  return snapshot();
}

let result = setScenario('mirrored', 'interbank', 4, 'sic');
assert.equal(result.bankASnb, 1000, 'SIC failure must not debit Bank A');
assert.equal(result.bankBSnb, 1000, 'SIC failure must not credit Bank B');
assert.equal(result.lucaToken, 0, 'SIC failure must not create Luca token value');
assert.equal(result.settlementStatus, 'SIC not settled');

result = setScenario('mirrored', 'interbank', 5, 'receiver');
assert.equal(result.bankASnb, 900, 'Final SIC leg remains visible after receiving-bank rejection');
assert.equal(result.bankBSnb, 1100, 'Final SIC leg remains visible after receiving-bank rejection');
assert.equal(result.lucaToken, 0, 'Receiving-bank rejection must not create Luca token value');
assert.equal(result.holder, 'Bank B suspense / repair');

result = setScenario('mirrored', 'mint', 3, 'dlt');
assert.equal(result.aliceOrdinary, 900, 'DLT failure retains the reservation');
assert.equal(result.aliceMirror, 100, 'DLT failure retains the mirrored subaccount');
assert.equal(result.tokenSupply, 0, 'DLT failure must not mint token supply');

result = setScenario('native', 'bridge', 3, 'dlt');
assert.equal(result.locked, true, 'Bridge failure retains the source lock');
assert.equal(result.wrapped, 0, 'Bridge failure must not create a wrapped unit');
assert.equal(result.destinationValue, 0, 'Bridge failure must not record destination value');

result = setScenario('instruction', 'mint', 3);
assert.equal(result.instructionValue, 100, 'Instruction model records its payment instruction');
assert.equal(result.tokenSupply, 0, 'Instruction model does not present a deposit-token supply');
assert.equal(result.debtor, 'Bank A ordinary deposit');

result = setScenario('mirrored', 'redeem', 3);
assert.equal(result.tokenSupply, 0, 'Burn removes the token representation');
assert.equal(result.aliceOrdinary, 900, 'Burn alone must not release ordinary value');
assert.equal(result.aliceMirror, 100, 'Mirror remains held until release evidence is accepted');

result = setScenario('stablecoin', 'netting', 4);
assert.equal(result.bankASnb, 1000, 'Stablecoin netting must not mutate SIC balances');
assert.equal(result.bankBSnb, 1000, 'Stablecoin netting must not mutate SIC balances');
assert.equal(result.settlementStatus, 'No SIC leg in this model');

result = setScenario('native', 'cbdc', 3);
assert.equal(result.wcbdcA, 0, 'Wholesale CBDC leaves Bank A only on institutional settlement');
assert.equal(result.wcbdcB, 100, 'Wholesale CBDC reaches Bank B only on institutional settlement');

result = setScenario('mirrored', 'conditional', 2);
assert.equal(result.locked, true, 'Conditional payment locks the mirrored claim before the condition is verified');
assert.equal(result.aliceToken, 100, 'Locked conditional value remains Alice’s pending claim');
assert.equal(result.lucaToken, 0, 'Luca receives nothing before verified release');

result = setScenario('mirrored', 'conditional', 5);
assert.equal(result.aliceToken, 0, 'Verified release removes the conditional value from Alice');
assert.equal(result.lucaToken, 100, 'Verified release credits Luca');
assert.equal(result.tokenSupply, 100, 'Conditional transfer conserves token supply');

result = setScenario('instruction', 'conditional', 6);
assert.equal(result.aliceOrdinary, 900, 'Released instruction payment debits Alice’s ordinary deposit');
assert.equal(result.lucaOrdinary, 100, 'Released instruction payment credits Luca’s ordinary deposit');
assert.equal(result.tokenSupply, 0, 'Conditional payment instruction is not presented as deposit-token supply');

Object.assign(state, { model: 'mirrored', scenario: 'correspondent', step: 0, failure: 'none' });
assert.deepEqual(Array.from(currentSteps()), ['Confirm payee', 'Discover path', 'Validate', 'Lock & delegate', 'Settle'], 'Agorá flow exposes the canonical five stages');
result = setScenario('mirrored', 'correspondent', 3);
assert.equal(result.locked, true, 'Agorá-style workflow locks value only after validation');
result = setScenario('mirrored', 'correspondent', 4);
assert.equal(result.lucaOrdinary, 100, 'Agorá-style settlement records usable receiving value');
assert.equal(result.workflowStatus, 'Complete', 'Agorá-style fifth stage completes the workflow');

for (const model of Object.keys(MODELS)) {
  for (const scenario of Object.keys(SCENARIOS)) {
    const terminal = finalStepFor(model, scenario);
    for (let step = 0; step <= terminal; step += 1) {
      result = setScenario(model, scenario, step);
      for (const [key, value] of Object.entries(result)) {
        if (typeof value === 'number') assert.ok(Number.isFinite(value) && value >= 0, `${model}/${scenario}/${step}: ${key} must be a non-negative number`);
      }
      if (model === 'instruction') assert.equal(result.tokenSupply, 0, `${model}/${scenario}/${step}: instruction model must not display token supply`);
      if (scenario !== 'mismatch' && model !== 'instruction') assert.equal(result.tokenSupply, result.aliceToken + result.lucaToken, `${model}/${scenario}/${step}: displayed supply must equal displayed customer token balances`);
    }
    result = setScenario(model, scenario, terminal);
    assert.equal(result.workflowStatus, 'Complete', `${model}/${scenario}: normal terminal state must complete`);
    for (const failure of Object.keys(FAILURES).filter((value) => value !== 'none')) {
      const applicable = failureApplicable(failure, model, scenario);
      if (!applicable) continue;
      const trigger = failureTrigger(failure, scenario);
      result = setScenario(model, scenario, trigger, failure);
      assert.equal(result.workflowStatus, 'Blocked', `${model}/${scenario}/${failure}: trigger must block the workflow`);
      assert.equal(result.legalStatus, 'Not final', `${model}/${scenario}/${failure}: trigger must not produce legal finality`);
      result = setScenario(model, scenario, terminal, failure);
      assert.equal(result.workflowStatus, 'Blocked', `${model}/${scenario}/${failure}: a blocked failure must remain blocked at the terminal step`);
    }
  }
}

console.log('demo snapshot checks passed');

function finalStepFor(model, scenario) {
  Object.assign(state, { model, scenario, step: 0, failure: 'none' });
  return finalStep();
}
