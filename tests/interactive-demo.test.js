const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const demoPath = path.join(__dirname, '..', 'demo', 'index.html');
const html = fs.readFileSync(demoPath, 'utf8');
let source = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert.ok(source, 'demo script must exist');
source = source.slice(source.indexOf('"use strict";'));
const marker = 'function renderModelCards() {';
source = source.slice(0, source.indexOf(marker))
  .concat('\nglobalThis.__demoData = { models, modelGroups, scenarios, sceneLayouts, failures, validationStats, scenarioGroupsFor };');

const sandbox = {
  document: {
    querySelector: () => null,
    createElement: () => ({ className: '', setAttribute: () => {} })
  }
};
vm.runInNewContext(source, sandbox, { filename: demoPath });
const { models, modelGroups, scenarios, sceneLayouts, failures, validationStats, scenarioGroupsFor } = sandbox.__demoData;
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
  failureCombinationCount: 169
});

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
assert.match(html, /Mirrored deposit · Conditional payment · 7 steps · Normal and failure runs/, 'hero must show compact run metadata');
assert.match(html, /id="open-featured-flow"[\s\S]*?Open mirrored conditional payment/, 'hero must expose the featured walkthrough action');
assert.match(html, /openFeaturedFlow\.addEventListener\("click", \(\) => startScenario\("mirrored", "conditional"\)\)/, 'featured action must open the mirrored conditional flow directly');
assert.match(html, /href="#landing-models"/, 'hero must link to model and scenario selection');
assert.match(html, /--red: #E60000;/, 'the landing page must use the requested red accent');
assert.match(html, /<section class="landing-orientation"[\s\S]*?The deposit stays a bank liability. Its operating record changes./, 'the landing page must explain tokenized deposits before the simulator');
assert.match(html, /class="claim-map"[\s\S]*?Claim[\s\S]*?Representation[\s\S]*?Authority[\s\S]*?Settlement[\s\S]*?Control/, 'the claim map must separate the core bank design questions');
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
  assert.match(html, new RegExp(`<strong>${name}</strong>[\\s\\S]*?<span>${status}</span>`), `${name} must retain its status`);
}
assert.match(html, /reference-sigil/, 'Swiss reference points must have visible in-page identifiers');
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
