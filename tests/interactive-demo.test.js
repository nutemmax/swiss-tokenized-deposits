const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');

const demoPath = path.join(__dirname, '..', 'demo', 'index.html');
const html = fs.readFileSync(demoPath, 'utf8');
let source = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert.ok(source, 'demo script must exist');
source = source.slice(source.indexOf('"use strict";'));
const marker = 'function renderModelCards() {';
source = source.slice(0, source.indexOf(marker))
  .concat('\nglobalThis.__demoData = { models, modelGroups, scenarios, scenarioVariants, sceneLayouts, mismatchLayouts, failures, failureRules, auditInventory, validationStats, scenarioFor, layoutFor, failureCaseFor, failureDisplayFor, applicableFailureEntries, scenarioGroupsFor };');

const sandbox = {
  document: {
    querySelector: () => null,
    createElement: () => ({ className: '', setAttribute: () => {} })
  }
};
vm.runInNewContext(source, sandbox, { filename: demoPath });
const { models, modelGroups, scenarios, sceneLayouts, mismatchLayouts, failures, failureRules, auditInventory, validationStats, scenarioFor, layoutFor, failureCaseFor, failureDisplayFor, applicableFailureEntries, scenarioGroupsFor } = sandbox.__demoData;
const plain = (value) => JSON.parse(JSON.stringify(value));

assert.equal(Object.keys(models).length, 4, 'four money models must remain available');
assert.equal(Object.keys(scenarios).length, 11, 'all eleven scenarios must remain available');
assert.equal(Object.keys(models).length * Object.keys(scenarios).length, 44, 'all model/scenario combinations must remain addressable');
assert.equal(models.native.name, 'Ledger-native deposit', 'native model must use the visible taxonomy name');
assert.deepEqual(plain(modelGroups.map(({ id, label, modelIds }) => ({ id, label, modelIds }))), [
  { id: 'baseline', label: 'Baseline', modelIds: ['instruction'] },
  { id: 'tokenized', label: 'Tokenized deposit', modelIds: ['mirrored', 'native'] },
  { id: 'comparator', label: 'Comparator', modelIds: ['stablecoin'] }
], 'models must use the baseline, tokenized-deposit and comparator taxonomy');
assert.deepEqual(plain(validationStats), {
  totalSteps: 75,
  explanationCount: 300,
  failureCombinationCount: 173,
  reachableStateCount: 1060
});
assert.deepEqual(plain(auditInventory.counts), {
  moneyModels: 4,
  scenarios: 11,
  modelScenarioCombinations: 44,
  scenarioSteps: 75,
  resolvedStepDescriptions: 300,
  failureModes: 7,
  applicableFailureCombinations: 173,
  reachableSimulatorStates: 1060
}, 'the machine-readable audit inventory must intentionally assert the complete reachable surface');
assert.equal(auditInventory.resolvedSteps.length, 300, 'inventory must enumerate every resolved model/scenario/step');
assert.equal(auditInventory.resolvedFailures.length, 173, 'inventory must enumerate every applicable model/scenario/failure');

const reviewedSemanticBaselines = {
  'instruction/mint': '00c847c374f6d5dfa9cc8643e6629098c211f18282dc848887f47a453ed15921',
  'instruction/redeem': '79f0bef16033c18ccf709d1744035d2f17b4751a21394d438af5b99bc8f28899',
  'instruction/same': 'b8736ee7aac1a2e90cc848424aea77e9b6dd6e5ba744181f2574a30523a48877',
  'instruction/interbank': 'bafb99fb24f07d72bd82270c852706515c5e8414a9c2304d52f277c6a2a2e032',
  'instruction/conditional': '771ca8dc13b5cbec675d7ca017d9dd4c440035db1389a46173f1dd45e2dcdac3',
  'instruction/netting': '770085b2701cad5f405dbf788e3c1231f08ec8998a1f0daeea3bcc3db4230af3',
  'instruction/correspondent': '3b59b9d4822be31e109485152a95e9e9ceb945eceb645a928a0a20d1e3e4d4df',
  'instruction/pvp': '79e85253badc7812fd87944d4bb4add024f6669ea538204adf4bfb3e9874a8b7',
  'instruction/cbdc': '767f53cc874f261d23d48656c4a9bb5bb2d5e465a500fccde14c79c175a75788',
  'instruction/bridge': 'c62c96bc5963dee10b5216ef7354166463ad0b1c5ce2f73d72ce53f572302ef2',
  'instruction/mismatch': '52ddded7316212d55e678bd5a5caa93ad0a4370139025c2ae209e050d2a707d8',
  'mirrored/mint': 'd75e4c90083abb8a39bad6b8fd2b3e1f13db6cd87dcfc8afcc4cfe76ad4d2f64',
  'mirrored/redeem': '61cf0d5d348fb882790519475cd6268a7ad1da9e5fb65ea75958308a0a49bf9d',
  'mirrored/same': 'ed8b9a51f2fa43741674cc75ef9dd62b61d4415e32000b935f65bde0ca10a44e',
  'mirrored/interbank': '7ee4fb421cba23f910ca87664bb653bf2bbc2938bca9a6fefb5e5124431d502f',
  'mirrored/conditional': '58f8e69085e2a7d117ee64131b847517da523eda7469c3051c48f5c1ee0c7e4a',
  'mirrored/netting': '5504ac1860fe9e03d9a41db8b5671ae561aaa783ededba800dcdc7511f629eb3',
  'mirrored/correspondent': 'ad2c74651b4e2b58b56fb58e329e0b958483f142ddfd4d7fef78768f927a509a',
  'mirrored/pvp': '78cde819ffa9fe759995cedf629cb346f499771b78854ef130683e58fb754f51',
  'mirrored/cbdc': 'c7a326fd104e7b238fc282dccfe772f230479f9e91f5222b59724bc21f468083',
  'mirrored/bridge': 'bb281cf44ce5f659a7dfafe0fd797b0e1f6ae796f69bd697e4493aca701e5b1d',
  'mirrored/mismatch': 'e7b26e27a17e3aa81da7cc25aad52367ffc067dd2d51ceaa2cc4fa2c96ccd8ce',
  'native/mint': '21553d8d1bb8bef709d5422e6e95099690c8f9d757783a547c3dd6b8256d9784',
  'native/redeem': '42edec6b8f2bb908ab2c914565083c783dce30af679a89fb582d21995ae6bc5d',
  'native/same': '9b48e3a0f89ea8004a6103f005351a5db016014319c098b826857c6bff902d2a',
  'native/interbank': 'a85096d9a9343673838c6d76476f2912f174c902b40dc4a0e879fc81238c3dd4',
  'native/conditional': 'c20339a07bf5119afd4033ca4f49022e59aafb89a581dd4cbdc2142ac0fa4862',
  'native/netting': '487d2ca5db761c476816951a730f765a0a582a96408a5906829500e5fbcc1432',
  'native/correspondent': '9276a3dedc582dc5d4da2ac805a69a89133d344ee79c133ba953948af4dc7886',
  'native/pvp': '40797d03428bdad719bca2f2c8671175a454842268f256221aa3bb54b23a47ca',
  'native/cbdc': '3a52c9a7577c9eebe625d403a986473777c7d08fdb1f85629595a9a406ae51dd',
  'native/bridge': '2ed9d8faefaee8105136a3424127b5d47df12ed02fd479809707fc5a76c3ec46',
  'native/mismatch': 'dc26713c63b04ae0dd500a6390222375bc342d8968d8436b88db080fd03d45fc',
  'stablecoin/mint': '0392437b61347504d3ea71324958864baf14f1ecdc0ae2b1c79b94364452b5e0',
  'stablecoin/redeem': 'cea6c5f4f9ebdb4905738c640871f43dc60a6a39f1207316b25bcab34e317316',
  'stablecoin/same': '6f2075f930d1c23de1efa1b4460fef78a1027e250d3b6e65a669ab4096234c50',
  'stablecoin/interbank': '32e0dae8bdfa1d85bed9d0898fbddccf5da434ea69444b37c4087b682101adfb',
  'stablecoin/conditional': '2aa75250d09dadbc65e497d0ff6265afd9b12dc4afc1f587acce71d568f21841',
  'stablecoin/netting': 'b6e24b4e8a2378f0df71b087df42f6d61d857e5eb18cc141f5ce6322643e0ca9',
  'stablecoin/correspondent': '1b4833c52d25cdfeace069bcb8630a3709d0a4d64ca8d4c753e1f2874899ecfe',
  'stablecoin/pvp': '0db910f05d9e608fad6967bfff44bf944dae8ae69afa129c34e9352f210474a7',
  'stablecoin/cbdc': 'ef83c4210383642367d722a871a86b32374dee6790359b4cad2b7f2d1cb37d3c',
  'stablecoin/bridge': '6c1f2a9f5f7c268bdbcd30b67c445e1bf1a56d8994638a577113b79576f29794',
  'stablecoin/mismatch': 'e29f90abdbb3488fb9512b2f2569a6569ed122d9edd0c3a63e934ffcbd92b0fb'
};

const resolvedSemanticDigest = (modelId, scenarioId) => {
  const resolved = scenarioFor(modelId, scenarioId);
  const reviewedFields = {
    name: resolved.name,
    treatment: resolved.treatment,
    description: resolved.description,
    settlement: resolved.settlement,
    steps: resolved.steps.map((step) => ({
      label: step.label,
      actor: step.actor,
      action: step.action,
      object: step.object,
      result: step.result,
      explanation: step.explanations[modelId],
      scene: step.scene
    }))
  };
  return crypto.createHash('sha256').update(JSON.stringify(reviewedFields)).digest('hex');
};

assert.deepEqual(Object.keys(reviewedSemanticBaselines).sort(), auditInventory.models.flatMap(({ id: modelId }) => auditInventory.scenarios.map(({ id: scenarioId }) => `${modelId}/${scenarioId}`)).sort(), 'semantic baselines must cover every resolved model/scenario combination');
for (const [combination, expectedDigest] of Object.entries(reviewedSemanticBaselines)) {
  const [modelId, scenarioId] = combination.split('/');
  assert.equal(resolvedSemanticDigest(modelId, scenarioId), expectedDigest, `${combination} actor, action, object, result, explanation, settlement or movement changed without semantic review`);
}

const allScenarioIds = Object.keys(scenarios);
const allScenarioGroups = plain(scenarioGroupsFor(allScenarioIds));
assert.equal(allScenarioIds.length, 11, 'the full scenario library must keep all eleven scenarios');
assert.ok(allScenarioGroups.every((group) => group.scenarioIds.length > 0), 'the full library must not render empty scenario groups');
const groupedScenarioIds = allScenarioGroups.flatMap((group) => group.scenarioIds);
assert.equal(new Set(groupedScenarioIds).size, groupedScenarioIds.length, 'the full library must not duplicate scenarios');
assert.deepEqual(groupedScenarioIds.slice().sort(), allScenarioIds.slice().sort(), 'the full library must contain every scenario');
assert.deepEqual(plain(scenarioGroupsFor([])), [], 'empty scenario selections must not create headings');

for (const [scenarioId, scenario] of Object.entries(scenarios)) {
  const expectedSteps = scenarioId === 'correspondent' ? 5 : 7;
  assert.equal(scenario.steps.length, expectedSteps, `${scenarioId} must expose ${expectedSteps} guided steps`);
  assert.ok(scenario.summary, `${scenarioId} must provide compact chooser copy`);
  assert.ok(scenario.description, `${scenarioId} must provide a scenario introduction`);
  const nodeIds = new Set(sceneLayouts[scenarioId].map((node) => node.id));
  for (const [index, step] of scenario.steps.entries()) {
    for (const field of ['label', 'actor', 'action', 'object', 'result']) {
      assert.ok(step[field], `${scenarioId}/${index} must define ${field}`);
    }
    assert.ok(step.scene.focus.every((id) => nodeIds.has(id)), `${scenarioId}/${index} focus must reference visible actors`);
    for (const modelId of Object.keys(models)) assert.ok(step.explanations[modelId], `${modelId}/${scenarioId}/${index} must have an explanation`);
  }
}

assert.match(html, /id="change-flow"/, 'workspace must use one Change flow control');
assert.match(html, /id="run-mode-select"/, 'workspace must use one run-mode control');
assert.match(html, /id="step-list"/, 'workspace must include the consolidated step navigator');
assert.match(html, /Mirrored deposit · Conditional payment · 7 steps · Normal and failure runs/, 'hero must show compact run metadata');
assert.match(html, /id="open-featured-flow"[\s\S]*?Open mirrored conditional payment/, 'hero must expose the featured walkthrough action');
assert.match(html, /openFeaturedFlow\.addEventListener\("click", \(\) => startScenario\("mirrored", "conditional"\)\)/, 'featured action must open the mirrored conditional flow directly');
assert.match(html, /href="#landing-models"/, 'hero must link to model and scenario selection');
assert.match(html, /--red: #E60000;/, 'the landing page must use the requested red accent');
assert.match(html, /<section class="landing-orientation"[\s\S]*?The deposit stays a bank liability. Its operating record changes./, 'the landing page must explain tokenized deposits before the simulator');
assert.match(html, /class="claim-map"[\s\S]*?Claim[\s\S]*?Representation[\s\S]*?Authority[\s\S]*?Settlement[\s\S]*?Control/, 'the claim map must separate the core bank design questions');
assert.match(html, /<section class="representation-rail"[\s\S]*?The token can mean four different things.[\s\S]*?Payment instruction[\s\S]*?Mirrored deposit[\s\S]*?Ledger-native deposit[\s\S]*?Non-bank stablecoin/, 'the landing page must introduce all four representations before the simulator');
assert.ok(html.indexOf('class="representation-rail"') < html.indexOf('class="landing-explainer"'), 'the representation rail must appear before workflow choices');
assert.match(html, /<section class="landing-explainer"[\s\S]*?Use a token only when the workflow changes.[\s\S]*?Shared workflow state[\s\S]*?Conditional cash[\s\S]*?Coordinated settlement/, 'the landing page must explain when a tokenized workflow earns its place');
assert.match(html, /<section class="bank-decisions"[\s\S]*?Who is the debtor\?[\s\S]*?Which record decides a dispute\?[\s\S]*?What creates finality\?[\s\S]*?How does the bank recover\?/, 'the landing page must introduce bank design choices before model selection');
assert.match(html, /id="landing-scenarios" aria-labelledby="landing-scenario-title">/, 'the scenario library must be visible without a prior model selection');
assert.doesNotMatch(html, /scenario-library-toggle|scenarioScope|scenarioIdsFor/, 'the landing page must not hide scenarios behind a suggested-library mode');
assert.match(html, /landing: \{ model: "mirrored" \}/, 'mirrored deposit must be the default landing model');
assert.match(html, /function scenarioGroupsFor\(ids\)/, 'scenario grouping must remain pure');
assert.equal((html.match(/function renderScenarioGroups\(/g) || []).length, 1, 'landing and dialog must share one scenario-group renderer');
assert.match(html, /renderScenarioGroups\(elements\.landingScenarioGroups,[\s\S]*?scenarioIds: Object\.keys\(scenarios\)[\s\S]*?markRecommended: false/, 'the landing must show every scenario without Recommended badges');
assert.match(html, /renderModelCards\(\);\s*renderLandingScenarios\(\);/, 'the full scenario library must render on the initial landing page');
assert.match(html, /scenarioIds: Object\.keys\(scenarios\)/, 'Change flow dialog must retain the full scenario library');
assert.match(html, /function commitFlow\(scenarioId\)[\s\S]*?state\.dialogReturnFocus = null;[\s\S]*?elements\.dialog\.close\(\);[\s\S]*?startScenario\(modelId, scenarioId\)/, 'dialog commit must keep focus on the new scenario heading');
assert.match(html, /elements\.dialog\.addEventListener\("close"[\s\S]*?state\.dialogReturnFocus\?\.focus/, 'dialog cancellation must restore focus to Change flow');
assert.match(html, /function chooseLandingModel\(/, 'landing model selection must reveal scenario navigation');
assert.match(html, /function startScenario\(modelId, scenarioId\)/, 'workspace must open only after both landing choices are known');
assert.match(html, /function startScenario\(modelId, scenarioId\)[\s\S]*?state\.landing\.model = modelId/, 'every opened flow must become the selected Overview model');
assert.match(html, /id="back-to-overview"/, 'workspace must provide a visible route back to the research overview');
assert.match(html, /function showOverview\([\s\S]*?if \(state\.landing\.model\)[\s\S]*?renderLandingScenarios\(\)/, 'return navigation must restore the landing selection');
assert.doesNotMatch(html.slice(html.indexOf('function showOverview()'), html.indexOf('function openFlowDialog()')), /state\.landing\.model\s*=/, 'return navigation must preserve landing state');
assert.match(html, /h1\[tabindex="-1"\]:focus \{ outline: none; \}/, 'programmatically focused page headings must suppress the browser outline');
for (const control of ['button', 'select', 'a']) assert.match(html, new RegExp(`${control}:focus-visible`), `${control} must retain visible keyboard focus`);
assert.match(html, /<section class="swiss-context" id="swiss-context" aria-labelledby="swiss-context-title">/, 'Swiss context must be visible before scenario selection');
assert.ok(html.indexOf('id="swiss-context"') < html.indexOf('id="landing-models"'), 'Swiss context must appear before model choice');
assert.ok(html.indexOf('class="bank-decisions"') < html.indexOf('id="swiss-context"'), 'bank design choices must lead into the Swiss reference map');
for (const [name, status] of [['SIC and Instant Payments', 'Production'], ['Project Agorá', 'Controlled real-value test'], ['Project Helvetia', 'Pilot in production infrastructure'], ['BX Digital', 'Production for approved DLT-securities scope']]) {
  assert.match(html, new RegExp(`<strong>${name}</strong>[\\s\\S]*?<span class="reference-status">${status}</span>`), `${name} must retain its status`);
}
assert.match(html, /class="reference-logo-bay"/, 'Swiss reference points must use common logo bays');
assert.doesNotMatch(html, /reference-sigil/, 'Swiss reference points must not use placeholder monograms');
for (const source of ['SIX', 'BIS', 'SNB', 'BX Digital']) {
  assert.match(html, new RegExp(`data-logo-source="${source}" src="data:image/svg\\+xml;base64,[A-Za-z0-9+/=]+"`), `${source} must use its official mark as an embedded SVG image`);
}
assert.match(html, /alt="" data-logo-source="SIX"/, 'SIX mark must remain decorative because the card title names SIC and Instant Payments');
assert.match(html, /alt="" data-logo-source="BIS"/, 'BIS mark must remain decorative because the card title names Project Agorá');
assert.match(html, /alt="" data-logo-source="SNB"/, 'SNB mark must remain decorative because the card title names Project Helvetia');
assert.match(html, /alt="" data-logo-source="BX Digital"/, 'BX Digital mark must remain decorative because the card title names BX Digital');
assert.doesNotMatch(html, /landing-scenario-help|All 11 scenarios for/, 'the landing page must not repeat the scenario count after model selection');
assert.match(html, /unifying ledger for platform-authoritative tokenized commercial-bank deposits[\s\S]*?jurisdictional ledgers for tokenized central-bank reserves/, 'Agorá must explain its wholesale tokenized-deposit architecture');
assert.match(html, /platform-as-record model differs from a CBS-authoritative mirrored deposit/, 'Agorá must distinguish its authority model from a mirrored deposit');
assert.match(html, /wholesale CBDC on SIX Digital Asset Platform[\s\S]*?synchronizes a DLT transaction with an RTGS payment in SIC/, 'Helvetia must explain its two settlement approaches');
assert.match(html, /links securities transfers on its DLT infrastructure with RTGS settlement in central-bank money through SIC/, 'BX Digital must explain its securities settlement link');
assert.match(html, /do not approve or prescribe a bank-specific tokenized deposit/, 'Swiss initiatives must not imply a blueprint or approval');
assert.doesNotMatch(html, /hero-architecture|landing-lenses|landing-report|landing-conclusion|landing-landscape|data-hero-icon|data-guide-icon/, 'redundant landing sections and their initialization hooks must be removed');
assert.match(html, /id="failure-summary"/, 'selected failure modes must receive a contextual scenario panel');
assert.doesNotMatch(html, /id="run-indicator"/, 'failure context must replace the former small status tag');
assert.match(html, /<div class="stage-topline">[\s\S]*?<div class="stage-controls" aria-label="Step controls">/, 'playback controls must stay in the stage header');
assert.match(html, /grid-template-columns: 86px 72px 144px/, 'playback controls must retain fixed desktop slots');
assert.doesNotMatch(html, /class="step-controls"/, 'playback controls must not move with inspector copy');
assert.match(html, /className = "journey-token-layer"/, 'moving objects must use one persistent journey layer');
assert.match(html, /function journeyTokenPlan\(/, 'moving objects must preserve their position between steps');
assert.match(html, /function maxReachableStep\(\)[\s\S]*?currentFailureCase\(\)\?\.trigger/, 'failure runs must stop navigation at the exact failed action');
assert.match(html, /button\.disabled = index > maxReachableStep\(\)/, 'steps after a triggered failure must be visibly unavailable');
assert.match(html, /state\.step = Math\.max\(0, Math\.min\(nextStep, maxReachableStep\(\)\)\)/, 'direct step navigation must clamp at the failure trigger');
assert.match(html, /item\.label\.length > 4/, 'long moving-object labels must receive a wider marker');
assert.doesNotMatch(html, /\.journey-arrow\.is-moving::before/, 'moving objects must not be recreated as connector pseudo-elements');
assert.match(html, /<section class="scenario-details"/, 'scenario details must always be visible');
assert.doesNotMatch(html, /<details class="scenario-details"/, 'scenario details must not require disclosure interaction');
assert.doesNotMatch(html, /id="change-model"|id="change-scenario"|id="reset"|id="failure-options"/, 'superseded controls must be removed');

const modelIds = Object.keys(models);
const scenarioIds = Object.keys(scenarios);
for (const modelId of modelIds) {
  for (const scenarioId of scenarioIds) {
    const resolved = scenarioFor(modelId, scenarioId);
    const layout = layoutFor(modelId, scenarioId);
    const nodeIds = new Set(layout.map(({ id }) => id));
    assert.ok(resolved.description.length >= 150, `${modelId}/${scenarioId} must have a substantial resolved introduction`);
    assert.ok(resolved.treatment, `${modelId}/${scenarioId} must state its evidence treatment`);
    for (const [stepIndex, step] of resolved.steps.entries()) {
      for (const field of ['label', 'actor', 'action', 'object', 'result']) assert.ok(step[field], `${modelId}/${scenarioId}/${stepIndex} must resolve ${field}`);
      const explanation = step.explanations[modelId];
      assert.ok(explanation && explanation.length >= 45, `${modelId}/${scenarioId}/${stepIndex} must have a substantive model-specific explanation`);
      assert.ok(step.scene.focus.every((id) => nodeIds.has(id)), `${modelId}/${scenarioId}/${stepIndex} focus must resolve to a visible node`);
      assert.ok(step.scene.moves.every((move) => nodeIds.has(move.from) && nodeIds.has(move.to) && move.label), `${modelId}/${scenarioId}/${stepIndex} movements must resolve to visible nodes`);
    }

    const applicable = new Map(applicableFailureEntries(modelId, scenarioId));
    for (const failureId of Object.keys(failures)) {
      const failureCase = failureCaseFor(modelId, scenarioId, failureId);
      assert.equal(applicable.has(failureId), Boolean(failureCase), `${modelId}/${scenarioId}/${failureId} availability must come from one explicit rule`);
      if (!failureCase) continue;
      assert.ok(failureRules[scenarioId][failureId], `${modelId}/${scenarioId}/${failureId} must have an explicit scenario rule`);
      assert.ok(Number.isInteger(failureCase.trigger) && failureCase.trigger >= 0 && failureCase.trigger < resolved.steps.length, `${modelId}/${scenarioId}/${failureId} trigger must be in range`);
      assert.ok(nodeIds.has(failureCase.target), `${modelId}/${scenarioId}/${failureId} target must be visible`);
      for (const field of ['description', 'stateBefore', 'changedRecords', 'modelConsequence', 'prohibitedRetry', 'recoveryEvidence', 'recoveryOwner', 'outcomes']) {
        assert.ok(failureCase[field], `${modelId}/${scenarioId}/${failureId} must resolve ${field}`);
      }
      assert.notEqual(failureCase.description, failureCase.summary, `${modelId}/${scenarioId}/${failureId} must add a scenario-specific failure sentence`);
      assert.match(failureCase.modelConsequence, /authoritative/i, `${modelId}/${scenarioId}/${failureId} must state the model-specific authoritative record consequence`);
      const failureDisplay = failureDisplayFor(modelId, scenarioId, failureId);
      const triggerStep = resolved.steps[failureCase.trigger];
      assert.notEqual(failureDisplay.title, triggerStep.label, `${modelId}/${scenarioId}/${failureId} blocked title must not repeat a successful event label`);
      assert.notEqual(failureDisplay.stateLabel, triggerStep.scene.stateLabel, `${modelId}/${scenarioId}/${failureId} blocked state must not show successful completion`);
      assert.notEqual(failureDisplay.currentRecord, triggerStep.result, `${modelId}/${scenarioId}/${failureId} blocked record must preserve the last-valid state, not the successful result`);
      assert.equal(failureDisplay.explanation, `${failureCase.description} ${failureCase.modelConsequence}`, `${modelId}/${scenarioId}/${failureId} visible failure copy must combine scenario and model consequences`);
    }
  }
}

const failureCounts = Object.fromEntries(Object.keys(failures).map((failureId) => [failureId, auditInventory.resolvedFailures.filter((entry) => entry.failureId === failureId).length]));
assert.deepEqual(plain(failureCounts), { aml: 32, dlt: 38, sic: 6, receiver: 11, reconciliation: 44, key: 38, condition: 4 }, 'failure coverage must remain an intentional scenario/model matrix');
assert.equal(failureCaseFor('stablecoin', 'interbank', 'sic'), null, 'same-issuer stablecoin transfer must not expose SIC failure');
assert.equal(failureCaseFor('stablecoin', 'netting', 'sic'), null, 'issuer-scheme netting must not expose SIC failure');
assert.equal(failureCaseFor('mirrored', 'correspondent', 'receiver').trigger, 0, 'Agorá payee rejection must occur during confirmation of payee');
assert.equal(failureCaseFor('mirrored', 'correspondent', 'receiver').target, 'confirmation', 'Agorá payee rejection must appear on the receiving institution, not Luca');
assert.match(failureCaseFor('mirrored', 'correspondent', 'receiver').targetLabel, /receiving institution’s confirmation of Luca/, 'Agorá payee rejection must name the failing receiving-institution action while Luca remains human');
assert.equal(failureCaseFor('mirrored', 'correspondent', 'aml').trigger, 2, 'Agorá participant rejection must occur during validation');
assert.equal(failureCaseFor('native', 'conditional', 'condition').trigger, 4, 'failed or expired conditions must stop at verification');
assert.equal(failureCaseFor('native', 'interbank', 'receiver').target, 'bankB', 'receiving-bank rejection must appear on the receiving bank');
assert.equal(failureCaseFor('stablecoin', 'cbdc', 'receiver').target, 'issuer', 'stablecoin customer-credit rejection must appear on the issuer, not the wCBDC receiving bank');
assert.equal(failureCaseFor('native', 'mismatch', 'reconciliation').target, 'reconcile', 'reconciliation mismatch must appear on the control');
assert.equal(failureCaseFor('stablecoin', 'netting', 'reconciliation').target, 'netting', 'issuer-scheme netting must expose reconciliation failure at cycle completion');
assert.equal(failureCaseFor('native', 'mismatch', 'dlt'), null, 'native mismatch repair must not require the authoritative ledger when correcting supporting records');
assert.equal(failureCaseFor('stablecoin', 'mismatch', 'key'), null, 'stablecoin mismatch repair must not require an issuer-ledger signing event when correcting backing records');
assert.equal(failureCaseFor('native', 'mint', 'key').target, 'ledger', 'contract pause must appear on the ledger, not Alice');
assert.doesNotMatch(html, /failureTargets|Math\.min\([^)]*trigger|targets\s*:/, 'failure resolution must not use generic triggers or fallback targets');

const instructionMint = scenarioFor('instruction', 'mint');
assert.match(instructionMint.description, /instruction is a request to move account money, not money itself/i);
assert.match(instructionMint.summary, /without minting a monetary claim/i);
assert.equal(instructionMint.steps[3].label, 'Instruction recorded');
assert.match(instructionMint.steps[3].explanations.instruction, /not a newly minted monetary claim/i);
assert.deepEqual(plain(instructionMint.steps[3].scene.moves), [{ from: 'issuer', to: 'ledger', label: 'INSTR' }], 'instruction creation must animate an instruction, not CHF money');
assert.deepEqual(plain(instructionMint.steps[5].scene.moves), [{ from: 'ledger', to: 'wallet', label: 'INSTR' }], 'instruction availability must animate an instruction, not a monetary claim');
const instructionRedeem = scenarioFor('instruction', 'redeem');
assert.match(instructionRedeem.description, /does not burn money/i);
assert.match(instructionRedeem.summary, /without describing cancellation as burning money/i);
assert.equal(instructionRedeem.steps[3].label, 'Instruction resolved');
assert.match(instructionRedeem.steps[3].explanations.instruction, /disables a request; it does not burn money/i);
assert.deepEqual(plain(instructionRedeem.steps[3].scene.moves), [{ from: 'issuer', to: 'ledger', label: 'STATUS' }], 'instruction resolution must animate a status update, not CHF money');
assert.deepEqual(plain(instructionRedeem.steps[5].scene.moves), [{ from: 'ledger', to: 'account', label: 'EVID' }], 'account posting must animate accepted evidence, not a claim moving out of the instruction ledger');
const instructionBridge = scenarioFor('instruction', 'bridge');
assert.match(instructionBridge.description, /wrapped reference is not the underlying deposit claim/i);
assert.match(instructionBridge.summary, /without transferring the underlying deposit claim/i);
assert.match(instructionBridge.steps[4].explanations.instruction, /not money and cannot itself debit Alice’s core account/i);
assert.deepEqual(plain(instructionBridge.steps[2].scene.moves), [], 'holding an instruction must not depict a monetary transfer into the source record');
assert.deepEqual(plain(instructionBridge.steps[5].scene.moves), [{ from: 'destLedger', to: 'destWallet', label: 'REF' }], 'destination delivery must animate the wrapped reference, not CHF money');
const instructionSame = scenarioFor('instruction', 'same');
assert.equal(instructionSame.steps[3].actor, 'Bank A');
assert.match(instructionSame.steps[3].result, /ready to post/i);
assert.equal(instructionSame.steps[4].actor, 'Bank A core banking');
assert.match(instructionSame.steps[4].result, /Luca’s account credited/i);
assert.deepEqual(plain(instructionSame.steps[5].scene.moves), [], 'instruction availability must not animate the instruction as the deposit claim');
const mirroredSame = scenarioFor('mirrored', 'same');
assert.equal(mirroredSame.steps[3].actor, 'DLT token mirror');
assert.equal(mirroredSame.steps[4].actor, 'Bank A core banking');
assert.match(mirroredSame.steps[4].explanations.mirrored, /authoritative liability reallocation/i);
assert.equal(scenarioFor('stablecoin', 'same').name, 'Same-issuer stablecoin transfer');
assert.equal(layoutFor('instruction', 'same').find(({ id }) => id === 'ledger').title, 'Instruction + core posting');
assert.equal(layoutFor('mirrored', 'same').find(({ id }) => id === 'ledger').title, 'DLT token mirror');
assert.equal(layoutFor('native', 'same').find(({ id }) => id === 'ledger').note, 'Authoritative deposit claim');
assert.equal(layoutFor('stablecoin', 'same').find(({ id }) => id === 'ledger').title, 'Issuer ledger');

for (const modelId of ['instruction', 'mirrored', 'stablecoin']) {
  const agora = scenarioFor(modelId, 'correspondent');
  assert.match(`${agora.name} ${agora.treatment}`, /comparison|adaptation/i, `${modelId} Agorá flow must be labelled as non-native`);
}
assert.equal(scenarioFor('native', 'correspondent').treatment, 'Closest tested architecture');
for (const modelId of modelIds) {
  const agoraText = JSON.stringify(scenarioFor(modelId, 'correspondent'));
  assert.doesNotMatch(agoraText, /prototype (integrated|integrates) an FX execution service/i, `${modelId} Agorá copy must not claim integrated FX execution`);
  assert.match(agoraText, /did not integrate an FX execution service/i, `${modelId} Agorá copy must state the prototype limitation`);
  assert.equal(scenarioFor(modelId, 'correspondent').steps[4].scene.moves[0].label, 'SETTLE', 'Agorá settlement movement must not masquerade as FX execution');
}

const stablecoinInterbank = scenarioFor('stablecoin', 'interbank');
assert.equal(stablecoinInterbank.name, 'Same-issuer transfer comparison');
assert.equal(stablecoinInterbank.settlement, 'Direct issuer-ledger holder transfer');
assert.match(stablecoinInterbank.summary, /without an intrinsic SIC leg/i);
assert.doesNotMatch(stablecoinInterbank.steps.map((step) => `${step.actor} ${step.action}`).join(' '), /SIC|Bank A|Bank B/, 'same-issuer transfer events must not be presented as interbank SIC events');
assert.match(stablecoinInterbank.steps[4].explanations.stablecoin, /Wholesale central-bank money is not the customer-facing asset/i);
const stablecoinNetting = scenarioFor('stablecoin', 'netting');
assert.match(stablecoinNetting.summary, /issuer-scheme rules/i);
assert.equal(stablecoinNetting.steps[1].scene.moves.filter((move) => move.to === 'queue').length, 2, 'both netting obligations must reach the queue before offset');
assert.match(stablecoinNetting.steps[4].explanations.stablecoin, /not SIC settlement/i);
const stablecoinCbdc = scenarioFor('stablecoin', 'cbdc');
assert.equal(stablecoinCbdc.category, 'infrastructure');
assert.match(stablecoinCbdc.summary, /issuer claim separate from an institutional wholesale-CBDC funding leg/i);
assert.match(stablecoinCbdc.steps[5].explanations.stablecoin, /issuer ledger records Luca’s customer-facing claim/i);
assert.match(stablecoinCbdc.steps[5].explanations.stablecoin, /wCBDC position does not become Luca’s asset/i);
assert.deepEqual(plain(stablecoinCbdc.steps[5].scene.moves[0]), { from: 'issuer', to: 'luca', label: 'CLAIM' }, 'stablecoin customer claim must move from the issuer, not the wCBDC bank');
assert.equal(layoutFor('stablecoin', 'cbdc').find(({ id }) => id === 'issuer').role, 'issuer', 'stablecoin wCBDC comparison must show the issuer separately from both settlement banks');

assert.deepEqual(plain(mismatchLayouts), {
  instruction: { bankRecord: { title: 'Core-account record', note: 'Authoritative deposit position' }, ledgerRecord: { title: 'Instruction record', note: 'Digital payment request' } },
  mirrored: { bankRecord: { title: 'CBS liability record', note: 'Authoritative deposit position' }, ledgerRecord: { title: 'DLT token mirror', note: 'Synchronized representation' } },
  native: { bankRecord: { title: 'Bank control record', note: 'Accounting and reporting copy' }, ledgerRecord: { title: 'DLT holder record', note: 'Authoritative claim position' } },
  stablecoin: { bankRecord: { title: 'Backing records', note: 'Reserve and guarantee support' }, ledgerRecord: { title: 'Issuer token ledger', note: 'Authoritative issuer claim' } }
}, 'mismatch labels must identify the authoritative record for every model');
for (const modelId of ['native', 'stablecoin']) {
  const repair = scenarioFor(modelId, 'mismatch').steps[5].scene.moves;
  assert.deepEqual(plain(repair), [
    { from: 'ledgerRecord', to: 'reconcile', label: 'AUTH' },
    { from: 'reconcile', to: 'bankRecord', label: 'FIX' }
  ], `${modelId} recovery arrows must lead from the authoritative ledger through reconciliation to the supporting record`);
}
for (const modelId of ['instruction', 'mirrored']) {
  const repair = scenarioFor(modelId, 'mismatch').steps[5].scene.moves[0];
  assert.deepEqual(plain(repair), { from: 'reconcile', to: 'ledgerRecord', label: 'FIX' }, `${modelId} recovery must repair the non-authoritative digital record`);
}

const visualRoles = layoutFor('native', 'mismatch').map(({ role }) => role);
assert.equal(new Set(visualRoles).size, visualRoles.length, 'Operations, bank record, reconciliation and ledger record must use distinct semantic visual roles');
for (const scenarioId of ['pvp', 'cbdc']) {
  const layout = layoutFor('stablecoin', scenarioId);
  assert.equal(layout.find(({ id }) => id === (scenarioId === 'pvp' ? 'chf' : 'alice')).role, 'alice', `${scenarioId} must show Alice as a human`);
  assert.equal(layout.find(({ id }) => id === (scenarioId === 'pvp' ? 'eur' : 'luca')).role, 'luca', `${scenarioId} must show Luca as a human`);
}
assert.equal(layoutFor('instruction', 'bridge').find(({ id }) => id === 'sourceWallet').role, 'alice', 'bridge must show Alice as a human where she participates');
assert.notEqual(layoutFor('stablecoin', 'interbank').find(({ id }) => id === 'bankA').role, 'bank', 'non-bank stablecoin issuer must not use the ordinary bank role');
assert.match(html, /reconciliation: iconVisual\("git-compare-arrows", "badge-check"\)/, 'normal reconciliation must look confirmed, not permanently failed');
assert.match(html, /operations: iconVisual\("workflow", "refresh-cw"\)/, 'Operations must communicate investigation and controlled repair');
assert.match(html, /wallet: iconVisual\("wallet-cards"\)/, 'wallets must use a wallet visual');
assert.equal(sceneLayouts.netting.find(({ id }) => id === 'queue').role, 'queue', 'payment queue must not use a bank-account visual');
assert.match(html, /queue: iconVisual\("workflow", "arrow-right-left"\)/, 'payment queue must use a queue/workflow visual');
assert.match(html, /validation: iconVisual\("badge-check", "building-2"\)/, 'normal validation must use a neutral confirmation visual');
assert.doesNotMatch(html.match(/const visualByRole = \{[\s\S]*?\n        \};/)?.[0] || '', /shield-alert/, 'normal visual roles must not use the AML incident glyph');

console.log('Interactive demo content and navigation checks passed');
