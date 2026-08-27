const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const demoPath = path.join(__dirname, '..', 'demo', 'index.html');
const html = fs.readFileSync(demoPath, 'utf8');
let source = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert.ok(source, 'demo script must exist');
source = source.slice(source.indexOf('"use strict";'));
const marker = 'const validationStats = validateDemoData();';
source = source.slice(0, source.indexOf(marker) + marker.length)
  .concat('\nglobalThis.__demoData = { models, scenarios, sceneLayouts, failures, validationStats };');

const sandbox = {
  document: {
    querySelector: () => null,
    createElement: () => ({ className: '', setAttribute: () => {} })
  }
};
vm.runInNewContext(source, sandbox, { filename: demoPath });
const { models, scenarios, sceneLayouts, failures, validationStats } = sandbox.__demoData;

assert.equal(Object.keys(models).length, 4, 'four money models must remain available');
assert.equal(Object.keys(scenarios).length, 11, 'all eleven scenarios must remain available');
assert.equal(Object.keys(models).length * Object.keys(scenarios).length, 44, 'all model/scenario combinations must remain addressable');
assert.deepEqual(JSON.parse(JSON.stringify(validationStats)), {
  totalSteps: 75,
  explanationCount: 300,
  failureCombinationCount: 169
});

for (const [scenarioId, scenario] of Object.entries(scenarios)) {
  const expectedSteps = scenarioId === 'correspondent' ? 5 : 7;
  assert.equal(scenario.steps.length, expectedSteps, `${scenarioId} must expose ${expectedSteps} guided steps`);
  assert.ok(scenario.summary, `${scenarioId} must provide compact chooser copy`);
  assert.ok(scenario.description.split(/\s+/).length >= 25, `${scenarioId} must provide a comprehensive scenario introduction`);
  const nodeIds = new Set(sceneLayouts[scenarioId].map((node) => node.id));
  for (const [index, step] of scenario.steps.entries()) {
    for (const field of ['label', 'actor', 'action', 'object', 'result']) {
      assert.ok(step[field], `${scenarioId}/${index} must define ${field}`);
    }
    assert.ok(step.scene.focus.every((id) => nodeIds.has(id)), `${scenarioId}/${index} focus must reference visible actors`);
    for (const modelId of Object.keys(models)) {
      const explanation = step.explanations[modelId];
      assert.ok(explanation, `${modelId}/${scenarioId}/${index} must have an explanation`);
      assert.ok((explanation.match(/[.!?](?:\s|$)/g) || []).length <= 2, `${modelId}/${scenarioId}/${index} must use no more than two sentences`);
      if (index > 0) assert.notEqual(explanation, scenario.steps[index - 1].explanations[modelId], `${modelId}/${scenarioId} adjacent explanations must be distinct`);
    }
  }
}

assert.match(html, /id="change-flow"/, 'workspace must use one Change flow control');
assert.match(html, /id="run-mode-select"/, 'workspace must use one run-mode control');
assert.match(html, /id="step-list"/, 'workspace must include the consolidated step navigator');
assert.match(html, /class="landing-lenses"/, 'landing page must introduce the claim, authority and settlement questions');
assert.match(html, /id="landing-context-title"/, 'landing page must explain the tokenized-deposit research context');
assert.match(html, /id="landing-conclusion-title"/, 'landing page must provide a decision-oriented conclusion');
assert.match(html, /id="landing-scenarios"[\s\S]*?hidden/, 'scenario choice must follow architecture choice on the landing page');
assert.match(html, /function chooseLandingModel\(/, 'landing model selection must reveal scenario navigation');
assert.match(html, /function startScenario\(modelId, scenarioId\)/, 'workspace must open only after both landing choices are known');
assert.match(html, /id="back-to-overview"/, 'workspace must provide a visible route back to the research overview');
assert.match(html, /function showOverview\(/, 'return navigation must restore the landing report');
assert.match(html, /id="failure-summary"/, 'selected failure modes must receive a contextual scenario panel');
assert.doesNotMatch(html, /id="run-indicator"/, 'failure context must replace the former small status tag');
assert.match(html, /<div class="stage-topline">[\s\S]*?<div class="stage-controls" aria-label="Step controls">/, 'playback controls must stay in the stage header');
assert.match(html, /grid-template-columns: 86px 72px 144px/, 'playback controls must retain fixed desktop slots');
assert.doesNotMatch(html, /class="step-controls"/, 'playback controls must not move with inspector copy');
assert.match(html, /className = "journey-token-layer"/, 'moving objects must use one persistent journey layer');
assert.match(html, /function journeyTokenPlan\(/, 'moving objects must preserve their position between steps');
assert.match(html, /item\.label\.length > 4/, 'long moving-object labels must receive a wider marker');
assert.doesNotMatch(html, /\.journey-arrow\.is-moving::before/, 'moving objects must not be recreated as connector pseudo-elements');
assert.match(html, /<section class="scenario-details"/, 'scenario details must always be visible');
assert.doesNotMatch(html, /<details class="scenario-details"/, 'scenario details must not require disclosure interaction');
assert.doesNotMatch(html, /id="change-model"|id="change-scenario"|id="reset"|id="failure-options"/, 'superseded controls must be removed');

for (const failure of Object.values(failures)) {
  assert.ok(failure.summary, `${failure.name} must provide general failure context`);
  assert.ok((failure.summary.match(/[.!?](?:\s|$)/g) || []).length <= 1, `${failure.name} context must remain concise`);
  for (const modelId of Object.keys(models)) {
    const effect = failure.effects[modelId];
    assert.ok(effect, `${failure.name} must explain every model`);
    assert.ok((effect.match(/[.!?](?:\s|$)/g) || []).length <= 2, `${failure.name}/${modelId} must use no more than two sentences`);
  }
}

console.log('Interactive demo content and navigation checks passed');
