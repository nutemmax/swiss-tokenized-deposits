const BASE_BALANCE = 1000;

// The stage uses a deliberately small set of shared card geometries. Keeping
// these dimensions in one place prevents the SVG route lines from drifting
// when a product model changes the content of a card.
const CARD_SIZE = {
  alice: { w: 150, h: 164 },
  bank: { w: 208, h: 164 },
  ledger: { w: 208, h: 164 },
  luca: { w: 194, h: 164 },
  middle: { w: 210, h: 132 }
};

const MODEL_META = {
  instruction: {
    label: 'Payment-instruction token',
    claim: 'Payment instruction / ordinary account',
    authority: 'CBS + ordinary account',
    mechanism: 'Bank accepts instruction, then posts payment',
    risk: 'Who owes the holder before acceptance?',
    debtor: 'Bank A after acceptance',
    insightClaim: 'The token can be a request for payment before it becomes a direct deposit claim.',
    insightLedger: 'The ordinary account and CBS remain authoritative; the token records the instruction.',
    insightFailure: 'The bank can reject or hold the instruction before acceptance, with no silent balance change.'
  },
  mirrored: {
    label: 'Mirrored tokenized deposit',
    claim: 'Bank claim + linked token balance',
    authority: 'CBS / GL, reconciled to DLT',
    mechanism: 'Reclassify, mint, transfer, burn',
    risk: 'Keeping three records synchronized',
    debtor: 'Issuing bank',
    insightClaim: 'The customer still has a bank claim; the mirror keeps token funds from being spent twice.',
    insightLedger: 'CBS/GL is authoritative, while token supply, subledger and GL must match.',
    insightFailure: 'A mismatch pauses minting and outbound transfers until the records are repaired.'
  },
  native: {
    label: 'Native on-chain deposit',
    claim: 'Direct on-chain bank claim',
    authority: 'DLT master, integrated with CBS / GL',
    mechanism: 'DLT transfer changes recorded holder',
    risk: 'Finality, recovery and resolution',
    debtor: 'Issuing bank',
    insightClaim: 'The token ledger itself records the customer claim and its holder.',
    insightLedger: 'DLT is the master record; CBS and GL must reliably ingest and report its events.',
    insightFailure: 'A chain halt, key loss or contract error can become a legal and operational incident.'
  },
  stablecoin: {
    label: 'Non-bank stablecoin',
    claim: 'Claim on separate issuer / guarantee',
    authority: 'Issuer ledger + reserve / guarantee',
    mechanism: 'Issuer mints, transfers and redeems',
    risk: 'Issuer, reserve and redemption risk',
    debtor: 'Stablecoin issuer or guarantor',
    insightClaim: 'The holder claims against the stablecoin issuer or guarantee structure, not automatically a bank.',
    insightLedger: 'The issuer ledger and reserve/guarantee records are separate from a bank customer account.',
    insightFailure: 'A bank accepting the token must still assess issuer, redemption, AML and counterparty risk.'
  }
};

const SCENARIO_META = {
  mint: {
    label: 'Convert / mint',
    description: 'Move an ordinary bank balance into the selected representation.',
    steps: ['Requested', 'Checked', 'Reserved', 'Token action', 'Settlement', 'Accepted', 'Final']
  },
  redeem: {
    label: 'Redeem / burn',
    description: 'Disable or burn the representation, then return ordinary bank value.',
    steps: ['Requested', 'Checked', 'Reserved', 'Token action', 'Settlement', 'Accepted', 'Final']
  },
  same: {
    label: 'Same-bank transfer',
    description: 'Reallocate a claim between Alice and Luca without moving SNB settlement money.',
    steps: ['Requested', 'Checked', 'Reserved', 'Token action', 'Internal post', 'Accepted', 'Final']
  },
  interbank: {
    label: 'Swiss interbank transfer',
    description: 'Show the customer claim, SIC/SNB settlement leg and receiving-bank claim separately.',
    steps: ['Requested', 'Checked', 'Reserved', 'Token action', 'SIC settlement', 'Accepted', 'Final']
  },
  netting: {
    label: 'Gross settlement vs netting',
    description: 'Compare two gross obligations with a later batch/net settlement alternative.',
    steps: ['Requested', 'Matched', 'Gross', 'Net', 'Settlement', 'Accepted', 'Final']
  },
  correspondent: {
    label: 'Cross-border correspondent + FX',
    description: 'Follow a CHF payment through settlement, illustrative FX and a foreign correspondent.',
    steps: ['Requested', 'Checked', 'FX locked', 'CHF leg', 'EUR leg', 'Accepted', 'Final']
  },
  pvp: {
    label: 'Cross-border PvP',
    description: 'Lock CHF and EUR legs together so neither side settles alone.',
    steps: ['Requested', 'Checked', 'Both locked', 'Atomic settle', 'Finality', 'Accepted', 'Final']
  },
  cbdc: {
    label: 'Wholesale-CBDC comparison',
    description: 'Place commercial-bank claims beside a tokenized central-bank settlement asset.',
    steps: ['Requested', 'Checked', 'wCBDC issued', 'Atomic settle', 'Reconciled', 'Accepted', 'Final']
  },
  bridge: {
    label: 'Bridge / wrapped token',
    description: 'Show the extra trust and redemption dependency introduced by a bridge.',
    steps: ['Requested', 'Checked', 'Source locked', 'Wrapped', 'Bridge confirms', 'Redeemed', 'Final']
  },
  mismatch: {
    label: 'Reconciliation mismatch + recovery',
    description: 'Pause movement, investigate the three records and restore a matched state.',
    steps: ['Requested', 'Matched', 'Mismatch', 'Halted', 'Investigate', 'Repair', 'Restored']
  }
};

const FAILURE_META = {
  none: { label: 'No failure', trigger: -1, headline: '', recovery: '' },
  aml: { label: 'AML / sanctions rejection', trigger: 1, headline: 'Compliance rejects the instruction before value moves.', recovery: 'Keep the customer balance unchanged, preserve the decision and do not mint.' },
  dlt: { label: 'DLT unavailable', trigger: 3, headline: 'The token action cannot complete, so the CBS reservation remains pending.', recovery: 'Hold the reservation, retry idempotently or release it under the repair runbook.' },
  sic: { label: 'SIC unavailable', trigger: 4, headline: 'The interbank cash leg is not final.', recovery: 'Keep the sender amount locked and do not display a receiving-bank claim.' },
  receiver: { label: 'Receiving bank rejects', trigger: 5, headline: 'Bank B declines before acceptance.', recovery: 'Return or repair the settlement leg; do not silently recreate Alice’s balance.' },
  mismatch: { label: 'Reconciliation mismatch', trigger: 2, headline: 'DLT supply, customer subledger and GL no longer agree.', recovery: 'Pause mint/outbound movement, replay events and repair under dual control.' },
  key: { label: 'Key or contract pause', trigger: 3, headline: 'The administrator pauses token movement after a key or contract alert.', recovery: 'Revoke the role, preserve evidence and resume only after approved recovery.' }
};

const state = {
  model: 'instruction',
  scenario: 'mint',
  amount: 100,
  speed: 1,
  stepIndex: 0,
  playing: false,
  failureMode: 'none',
  previousFund: { x: 118, y: 130 },
  timer: null
};

const refs = {};

function get(id) {
  return document.getElementById(id);
}

function money(value, currency = 'CHF') {
  return `${currency} ${Math.round(value).toLocaleString('en-CH')}`;
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[character]));
}

function activeFailure() {
  const meta = FAILURE_META[state.failureMode];
  if (!meta || meta.trigger < 0) return null;
  if (state.scenario === 'mismatch' && state.stepIndex >= 2 && state.stepIndex < 6) return meta;
  if (state.stepIndex >= meta.trigger && state.stepIndex < 6) return meta;
  return null;
}

function isAtLeast(step) {
  return state.stepIndex >= step;
}

function isFinal() {
  return state.stepIndex >= SCENARIO_META[state.scenario].steps.length - 1 && !activeFailure();
}

function modelFacts() {
  const meta = MODEL_META[state.model];
  refs.factClaim.textContent = meta.claim;
  refs.factAuthority.textContent = meta.authority;
  refs.factMechanism.textContent = meta.mechanism;
  refs.factRisk.textContent = meta.risk;
  refs.insightDebtor.textContent = meta.insightClaim;
  refs.insightLedger.textContent = meta.insightLedger;
  refs.insightFailure.textContent = meta.insightFailure;
  document.querySelectorAll('.model-tab').forEach((tab) => {
    const selected = tab.dataset.model === state.model;
    tab.classList.toggle('is-selected', selected);
    tab.setAttribute('aria-selected', String(selected));
  });
}

function scenarioSteps() {
  return SCENARIO_META[state.scenario].steps;
}

function failureAtOrBefore(step) {
  const meta = FAILURE_META[state.failureMode];
  if (!meta || meta.trigger < 0) return false;
  return state.scenario === 'mismatch' ? step >= 2 : step >= meta.trigger;
}

function derivedState() {
  const step = state.stepIndex;
  const model = state.model;
  const scenario = state.scenario;
  const amount = state.amount;
  const checked = isAtLeast(1);
  const reserved = isAtLeast(2);
  const tokenAction = isAtLeast(3);
  const settlement = isAtLeast(4);
  const accepted = isAtLeast(5);
  const final = isFinal();
  const failure = activeFailure();
  const snapshot = {
    amount,
    base: BASE_BALANCE,
    aliceOrdinary: BASE_BALANCE,
    aliceAvailable: BASE_BALANCE,
    aliceMirror: 0,
    aliceToken: 0,
    lucaOrdinary: 0,
    lucaMirror: 0,
    lucaToken: 0,
    bankAgl: BASE_BALANCE,
    bankBgl: BASE_BALANCE,
    bankASnb: BASE_BALANCE,
    bankBSnb: BASE_BALANCE,
    issuerSupply: 0,
    issuerReserve: 0,
    instruction: 0,
    authority: MODEL_META[model].authority,
    claimHolder: 'Alice',
    debtor: MODEL_META[model].debtor,
    finality: final ? 'Final' : failure ? 'Blocked' : settlement ? 'SIC final / pending acceptance' : 'Pending',
    reconciliation: failure && (state.failureMode === 'mismatch' || state.scenario === 'mismatch') ? 'Mismatch' : 'Matched',
    failed: Boolean(failure),
    failure
  };

  if (scenario === 'mint') {
    if (model === 'instruction') {
      snapshot.instruction = tokenAction ? amount : 0;
      snapshot.claimHolder = tokenAction ? 'Alice · instruction' : 'Alice';
      snapshot.finality = final ? 'Accepted' : snapshot.finality;
    } else if (model === 'mirrored') {
      snapshot.aliceOrdinary = tokenAction ? BASE_BALANCE - amount : BASE_BALANCE;
      snapshot.aliceAvailable = reserved ? BASE_BALANCE - amount : BASE_BALANCE;
      snapshot.aliceMirror = tokenAction ? amount : 0;
      snapshot.aliceToken = tokenAction ? amount : 0;
    } else if (model === 'native') {
      snapshot.aliceToken = tokenAction ? amount : 0;
      snapshot.bankAgl = final ? BASE_BALANCE : BASE_BALANCE - (tokenAction ? amount : 0);
      snapshot.authority = 'DLT master / CBS sync';
    } else {
      snapshot.aliceOrdinary = BASE_BALANCE;
      snapshot.issuerSupply = tokenAction ? amount : 0;
      snapshot.issuerReserve = tokenAction ? amount : 0;
      snapshot.claimHolder = tokenAction ? 'Alice · issuer claim' : 'Alice';
    }
  }

  if (scenario === 'redeem') {
    if (model === 'instruction') {
      snapshot.instruction = reserved && !final ? amount : 0;
      snapshot.aliceOrdinary = final ? BASE_BALANCE : BASE_BALANCE;
      snapshot.claimHolder = 'Alice · instruction';
      snapshot.finality = final ? 'Accepted' : snapshot.finality;
    } else if (model === 'mirrored') {
      snapshot.aliceOrdinary = final ? BASE_BALANCE : BASE_BALANCE - amount;
      snapshot.aliceAvailable = final ? BASE_BALANCE : BASE_BALANCE - amount;
      snapshot.aliceMirror = final ? 0 : amount;
      snapshot.aliceToken = final ? 0 : amount;
    } else if (model === 'native') {
      snapshot.aliceToken = final ? 0 : amount;
      snapshot.bankAgl = final ? BASE_BALANCE : BASE_BALANCE - amount;
      snapshot.authority = 'DLT master / CBS sync';
    } else {
      snapshot.issuerSupply = final ? 0 : amount;
      snapshot.issuerReserve = final ? 0 : amount;
      snapshot.claimHolder = 'Alice · issuer claim';
    }
  }

  if (scenario === 'same') {
    if (model === 'instruction') {
      snapshot.instruction = tokenAction && !final ? amount : 0;
      snapshot.aliceOrdinary = final ? BASE_BALANCE - amount : BASE_BALANCE;
      snapshot.lucaOrdinary = final ? amount : 0;
      snapshot.claimHolder = final ? 'Luca' : 'Alice';
      snapshot.debtor = final ? 'Bank A' : 'Bank A after acceptance';
    } else if (model === 'mirrored') {
      snapshot.aliceMirror = final ? 0 : amount;
      snapshot.aliceToken = final ? 0 : amount;
      snapshot.lucaMirror = final ? amount : 0;
      snapshot.lucaToken = final ? amount : 0;
      snapshot.claimHolder = final ? 'Luca' : 'Alice';
    } else if (model === 'native') {
      snapshot.aliceToken = final ? 0 : amount;
      snapshot.lucaToken = final ? amount : 0;
      snapshot.authority = 'DLT master';
      snapshot.claimHolder = final ? 'Luca' : 'Alice';
    } else {
      snapshot.issuerSupply = amount;
      snapshot.claimHolder = final ? 'Luca · issuer claim' : 'Alice · issuer claim';
      snapshot.instruction = final ? 0 : amount;
    }
  }

  if (scenario === 'interbank') {
    if (model === 'instruction') {
      snapshot.instruction = tokenAction && !final ? amount : 0;
      snapshot.aliceOrdinary = final ? BASE_BALANCE - amount : BASE_BALANCE;
      snapshot.lucaOrdinary = final ? amount : 0;
      snapshot.claimHolder = final ? 'Luca' : 'Alice';
      snapshot.debtor = final ? 'Bank B after acceptance' : 'Bank A until settlement';
    } else if (model === 'mirrored' || model === 'native') {
      snapshot.aliceToken = settlement ? 0 : amount;
      snapshot.aliceMirror = settlement && model === 'mirrored' ? 0 : amount;
      snapshot.lucaToken = accepted ? amount : 0;
      snapshot.lucaMirror = accepted && model === 'mirrored' ? amount : 0;
      snapshot.bankASnb = settlement ? BASE_BALANCE - amount : BASE_BALANCE;
      snapshot.bankBSnb = settlement ? BASE_BALANCE + amount : BASE_BALANCE;
      snapshot.claimHolder = accepted ? 'Luca' : 'Alice / pending';
      snapshot.debtor = accepted ? 'Bank B' : 'Bank A until SIC finality';
      snapshot.authority = model === 'native' ? 'DLT + SIC finality' : 'CBS / GL + DLT';
    } else {
      snapshot.issuerSupply = amount;
      snapshot.issuerReserve = amount;
      snapshot.bankASnb = settlement ? BASE_BALANCE - amount : BASE_BALANCE;
      snapshot.bankBSnb = settlement ? BASE_BALANCE + amount : BASE_BALANCE;
      snapshot.claimHolder = accepted ? 'Luca · issuer claim' : 'Alice · issuer claim';
      snapshot.debtor = 'Stablecoin issuer';
    }
  }

  if (scenario === 'netting') {
    const reverse = Math.round(amount * .6);
    snapshot.gross = amount + reverse;
    snapshot.reverse = reverse;
    snapshot.net = amount - reverse;
    snapshot.bankASnb = settlement ? BASE_BALANCE - snapshot.net : BASE_BALANCE;
    snapshot.bankBSnb = settlement ? BASE_BALANCE + snapshot.net : BASE_BALANCE;
    snapshot.claimHolder = final ? 'Two bank ledgers' : 'A ↔ B obligations';
    snapshot.debtor = settlement ? 'Settlement system' : 'Both banks';
    snapshot.authority = 'Payment-system rules';
    snapshot.reconciliation = failure ? 'Mismatch' : final ? 'Matched' : 'Pending';
  }

  if (scenario === 'correspondent') {
    snapshot.fx = amount;
    snapshot.foreign = amount;
    snapshot.aliceOrdinary = accepted ? BASE_BALANCE - amount : BASE_BALANCE;
    snapshot.lucaOrdinary = final ? amount : 0;
    snapshot.claimHolder = final ? 'Foreign customer' : 'Alice / pending';
    snapshot.debtor = final ? 'Foreign bank' : 'Bank A / correspondent chain';
    snapshot.authority = 'CBS + correspondent / RTGS';
    snapshot.finality = final ? 'Foreign RTGS final' : failure ? 'Blocked' : 'Cross-border pending';
  }

  if (scenario === 'pvp') {
    snapshot.pvp = true;
    snapshot.aliceToken = accepted ? 0 : amount;
    snapshot.lucaToken = accepted ? amount : 0;
    snapshot.claimHolder = final ? 'Both counterparties' : isAtLeast(2) ? 'Both locked' : 'Alice / Luca';
    snapshot.debtor = 'Two issuing banks';
    snapshot.authority = 'Shared settlement / PvP';
    snapshot.finality = final ? 'Both legs final' : failure ? 'Neither leg final' : 'Both legs locked';
  }

  if (scenario === 'cbdc') {
    snapshot.cbdc = isAtLeast(2) ? amount : 0;
    snapshot.aliceToken = final ? 0 : amount;
    snapshot.lucaToken = final ? amount : 0;
    snapshot.claimHolder = final ? 'Recipient + central bank settlement' : 'Commercial-bank claims';
    snapshot.debtor = final ? 'Commercial banks / SNB settlement' : 'Commercial bank';
    snapshot.authority = isAtLeast(3) ? 'DLT + wCBDC settlement' : 'CBS / GL';
    snapshot.finality = final ? 'wCBDC / settlement final' : failure ? 'Blocked' : 'Pending';
  }

  if (scenario === 'bridge') {
    snapshot.bridgeLocked = isAtLeast(2) && !final;
    snapshot.wrapped = isAtLeast(3) && !final;
    snapshot.issuerSupply = amount;
    snapshot.claimHolder = final ? 'Destination wallet' : snapshot.bridgeLocked ? 'Bridge escrow' : 'Alice';
    snapshot.debtor = 'Origin issuer / bridge rules';
    snapshot.authority = 'Two ledgers + bridge';
    snapshot.finality = final ? 'Destination redeemed' : failure ? 'Bridge paused' : 'Cross-ledger pending';
  }

  if (scenario === 'mismatch') {
    snapshot.aliceMirror = amount;
    snapshot.aliceToken = amount;
    snapshot.reconciliation = state.stepIndex >= 2 && state.stepIndex < 6 ? 'Mismatch' : state.stepIndex >= 6 ? 'Matched' : 'Matched';
    snapshot.authority = state.stepIndex >= 3 && state.stepIndex < 6 ? 'CBS / GL paused' : 'CBS / GL + DLT';
    snapshot.finality = state.stepIndex >= 6 ? 'Restored' : state.stepIndex >= 2 ? 'Blocked' : 'Pending';
    snapshot.claimHolder = state.stepIndex >= 6 ? 'Alice' : 'Alice · held';
    snapshot.debtor = 'Bank A';
  }

  if (failure && state.scenario !== 'mismatch') {
    snapshot.finality = 'Blocked';
    snapshot.claimHolder = snapshot.claimHolder.includes('pending') ? snapshot.claimHolder : `${snapshot.claimHolder} · held`;
    snapshot.reconciliation = state.failureMode === 'mismatch' ? 'Mismatch' : 'Matched';
  }

  return snapshot;
}

function nodeCard({ x, y, w = 200, h = 126, tag, title, subtitle, lines = [], tone = '' }) {
  const lineMarkup = lines.slice(0, 4).map((line, index) => {
    const yPos = 66 + index * 15;
    return `<text class="svg-label" x="16" y="${yPos}" font-size="11"><tspan font-weight="700">${esc(line.label)}</tspan><tspan x="${w - 16}" text-anchor="end" class="${line.red ? 'svg-red' : 'svg-label'}" font-weight="800">${esc(line.value)}</tspan></text>`;
  }).join('');
  return `<g transform="translate(${x} ${y})" class="stage-card">
    <rect class="svg-node ${tone}" width="${w}" height="${h}" rx="12"></rect>
    <text class="svg-red" x="16" y="22" font-size="10" font-weight="800" letter-spacing="1">${esc(tag)}</text>
    ${iconGlyph(`${tag} ${title}`, w - 28, 28)}
    <text class="svg-label" x="16" y="43" font-size="16" font-weight="800">${esc(title)}</text>
    <text class="svg-muted" x="16" y="57" font-size="10">${esc(subtitle)}</text>
    ${lineMarkup}
  </g>`;
}

function connection(x1, y1, x2, y2, className = 'svg-connection') {
  return `<line class="${className}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"></line>`;
}

function routeConnection(path, className = 'svg-connection') {
  return `<path class="${className}" d="${path}"></path>`;
}

function iconGlyph(tag, x, y) {
  const normalized = tag.toLowerCase();
  let path = '<path d="M-7 0h14M0-7v14"></path>';
  if (normalized.includes('customer')) path = '<path d="M-5 6c1-5 9-5 10 0M0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>';
  if (normalized.includes('bank')) path = '<path d="m-9-2 9-5 9 5M-7 0v7M0 0v7M7 0v7M-10 9h20"></path>';
  if (normalized.includes('dlt') || normalized.includes('issuer')) path = '<path d="M0-9 8-4v8L0 9l-8-5v-8Z M0-9v18M-8-4 0 1l8-5"></path>';
  if (normalized.includes('advanced')) path = '<path d="M-8 3h16M-5-2h10M-2-7h4M-7 7h14"></path>';
  if (normalized.includes('bridge')) path = '<path d="M-9 7h18M-8-2c4-7 12-7 16 0M-5-1v8M0-5v12M5-1v8"></path>';
  return `<g class="svg-icon" transform="translate(${x} ${y})"><circle r="14"></circle><g>${path}</g></g>`;
}

function pill(x, y, label, tone = 'black') {
  const width = Math.max(76, label.length * 6.5 + 24);
  return `<g class="svg-pill svg-pill--${tone}" transform="translate(${x} ${y})"><rect width="${width}" height="24" rx="12"></rect><text x="${width / 2}" y="16" text-anchor="middle" class="svg-caption-text" font-size="10" font-weight="800">${esc(label)}</text></g>`;
}

function captionBox(x, y, width, title, detail, tone = 'black') {
  return `<g class="svg-caption-group svg-caption-group--${tone}" transform="translate(${x} ${y})"><rect class="svg-caption-box" width="${width}" height="52" rx="10"></rect><text class="svg-caption-text" x="14" y="20" font-size="11" font-weight="800">${esc(title)}</text><text class="svg-caption-text" x="14" y="37" font-size="10" opacity=".82">${esc(detail)}</text></g>`;
}

function railChip(x, y, width, title, detail, tone = 'black') {
  const accent = tone === 'red' ? 'svg-rail--red' : '';
  return `<g class="svg-rail ${accent}" transform="translate(${x} ${y})">
    <rect width="${width}" height="62" rx="13"></rect>
    <circle class="svg-rail-dot" cx="19" cy="20" r="5"></circle>
    <text class="svg-label" x="34" y="24" font-size="11" font-weight="800">${esc(title)}</text>
    <text class="svg-muted" x="16" y="44" font-size="10">${esc(detail)}</text>
  </g>`;
}

function getLayout(scenario) {
  return {
    alice: [24, 86],
    bankA: [240, 72],
    dlt: [500, 72],
    sic: [535, 294],
    bankB: [760, 72],
    luca: [1020, 86],
    middle: [535, 294],
    middleLabel: scenario === 'cbdc' ? 'wCBDC / SNB' : scenario === 'bridge' ? 'Bridge' : scenario === 'pvp' ? 'PvP settlement' : 'FX / correspondent'
  };
}

function renderGrid() {
  const scenario = state.scenario;
  const advancedRailScenario = ['correspondent', 'pvp', 'cbdc', 'bridge'].includes(scenario);
  const lowerRails = advancedRailScenario
    ? `${railChip(28, 300, 290, 'ORIGIN · CHF', 'source ledger / bank claim')}${railChip(960, 300, 290, 'DESTINATION · EUR', 'foreign ledger / redemption')}`
    : scenario === 'interbank' || scenario === 'netting'
    ? `${railChip(28, 300, 290, 'BANK A · SNB SIGHT', 'central-bank money · debit')}${railChip(344, 300, 290, scenario === 'netting' ? 'RTGS / BATCH RULES' : 'SIC · FINAL SETTLEMENT', scenario === 'netting' ? 'gross or net convention' : 'settlement asset', 'red')}${railChip(660, 300, 290, 'BANK B · SNB SIGHT', 'central-bank money · credit')}${railChip(976, 300, 290, 'RECEIVING ACCEPTANCE', 'new customer claim')}`
    : scenario === 'mint' || scenario === 'redeem' || scenario === 'same'
      ? `${railChip(28, 300, 290, 'CBS RESERVATION', 'ordinary balance / subaccount')}${railChip(344, 300, 290, state.model === 'native' ? 'DLT EVENT LOG' : 'TOKEN CONTROL', state.model === 'native' ? 'master record' : 'supply · mirror · GL', 'red')}${railChip(660, 300, 290, 'RECONCILIATION', 'matched before release')}${railChip(976, 300, 290, 'CUSTOMER VIEW', 'wallet status / finality')}`
      : `${railChip(28, 300, 290, 'CHF LEG', 'origin ledger')}${railChip(344, 300, 290, scenario === 'pvp' ? 'LOCKED LEGS' : scenario === 'bridge' ? 'BRIDGE ESCROW' : 'FX / CORRESPONDENT', scenario === 'pvp' ? 'both or neither' : scenario === 'bridge' ? 'additional dependency' : 'illustrative 1:1 rate', 'red')}${railChip(660, 300, 290, 'EUR / DESTINATION', 'foreign ledger / RTGS')}${railChip(976, 300, 290, 'FINALITY CHECK', 'technical ≠ legal')}`;
  refs.stageGrid.innerHTML = `<rect class="svg-stage-band" x="0" y="0" width="1280" height="274" rx="0"></rect><rect class="svg-stage-band svg-stage-band--lower" x="0" y="274" width="1280" height="226" rx="0"></rect><path class="svg-stage-divider" d="M0 274 H1280"></path><text class="svg-lane-label" x="24" y="34" font-size="10" letter-spacing="1.3">CUSTOMER / BANK CLAIMS</text><text class="svg-lane-label" x="24" y="288" font-size="10" letter-spacing="1.3">SETTLEMENT / CONTROL RAILS</text><path class="svg-control-track" d="M28 389 H1250"></path><circle class="svg-control-dot" cx="28" cy="389" r="4"></circle><circle class="svg-control-dot" cx="1250" cy="389" r="4"></circle>${lowerRails}`;
}

function renderActors(snapshot) {
  const layout = getLayout(state.scenario);
  const amount = state.amount;
  const model = state.model;
  const scenario = state.scenario;
  const tokenLine = model === 'instruction'
    ? { label: 'instruction', value: snapshot.instruction ? money(snapshot.instruction) : '—', red: Boolean(snapshot.instruction) }
    : { label: 'token', value: snapshot.aliceToken ? money(snapshot.aliceToken) : '—', red: Boolean(snapshot.aliceToken) };
  const aliceLines = [
    { label: 'ordinary', value: money(snapshot.aliceOrdinary) },
    { label: model === 'mirrored' ? 'mirror' : model === 'stablecoin' ? 'bank deposit' : 'wallet', value: model === 'mirrored' ? (snapshot.aliceMirror ? money(snapshot.aliceMirror) : '—') : tokenLine.value, red: model !== 'mirrored' && Boolean(snapshot.aliceToken || snapshot.instruction) },
    tokenLine
  ];
  const bankALines = [
    { label: 'GL control', value: money(snapshot.bankAgl) },
    { label: 'SNB sight', value: money(snapshot.bankASnb), red: scenario === 'interbank' || scenario === 'netting' },
    { label: 'claim status', value: snapshot.failed ? 'held' : snapshot.claimHolder.startsWith('Alice') ? 'Alice' : 'settled' }
  ];
  const bankBLines = [
    { label: 'GL control', value: money(snapshot.bankBgl) },
    { label: 'SNB sight', value: money(snapshot.bankBSnb), red: scenario === 'interbank' || scenario === 'netting' },
    { label: 'claim status', value: snapshot.claimHolder.startsWith('Luca') ? 'Luca' : 'waiting' }
  ];
  const lucaLines = [
    { label: 'ordinary', value: money(snapshot.lucaOrdinary) },
    { label: model === 'mirrored' ? 'mirror' : model === 'stablecoin' ? 'issuer token' : 'wallet', value: model === 'mirrored' ? (snapshot.lucaMirror ? money(snapshot.lucaMirror) : '—') : snapshot.lucaToken ? money(snapshot.lucaToken) : '—', red: Boolean(snapshot.lucaToken || snapshot.lucaMirror) },
    { label: 'status', value: snapshot.claimHolder.startsWith('Luca') ? 'accepted' : 'waiting' }
  ];
  let markup = '';
  markup += nodeCard({ x: layout.alice[0], y: layout.alice[1], w: CARD_SIZE.alice.w, h: CARD_SIZE.alice.h, tag: 'CUSTOMER', title: 'Alice', subtitle: 'verified wallet', lines: aliceLines, tone: snapshot.claimHolder.startsWith('Alice') ? 'svg-node--active' : '' });
  markup += nodeCard({ x: layout.bankA[0], y: layout.bankA[1], w: CARD_SIZE.bank.w, h: CARD_SIZE.bank.h, tag: 'BANK A', title: 'CBS + GL', subtitle: model === 'native' ? 'reporting / sync' : 'authoritative bank record', lines: bankALines, tone: snapshot.failed ? 'svg-node--warning' : 'svg-node--active' });
  markup += nodeCard({ x: layout.dlt[0], y: layout.dlt[1], w: CARD_SIZE.ledger.w, h: CARD_SIZE.ledger.h, tag: model === 'stablecoin' ? 'ISSUER LEDGER' : 'DLT', title: model === 'stablecoin' ? 'Issuer + reserve' : 'Token ledger', subtitle: model === 'native' ? 'authoritative master' : model === 'instruction' ? 'instruction record' : 'reconciled representation', lines: model === 'stablecoin' ? [{ label: 'supply', value: snapshot.issuerSupply ? money(snapshot.issuerSupply) : '—', red: Boolean(snapshot.issuerSupply) }, { label: 'reserve', value: snapshot.issuerReserve ? money(snapshot.issuerReserve) : '—' }, { label: 'claim', value: 'issuer' }] : [{ label: model === 'instruction' ? 'tickets' : 'supply', value: model === 'instruction' ? (snapshot.instruction ? money(snapshot.instruction) : '—') : (snapshot.aliceToken || snapshot.lucaToken ? money((snapshot.aliceToken || 0) + (snapshot.lucaToken || 0)) : '—'), red: Boolean(snapshot.aliceToken || snapshot.lucaToken || snapshot.instruction) }, { label: 'authority', value: model === 'native' ? 'DLT' : 'CBS' }, { label: 'version', value: 'v1 · allow-listed' }], tone: model === 'native' ? 'svg-node--active' : '' });
  if (state.scenario !== 'mint' && state.scenario !== 'redeem' && state.scenario !== 'same' && state.scenario !== 'interbank' && state.scenario !== 'netting') {
    const middleTitle = state.scenario === 'cbdc' ? 'Wholesale CBDC' : state.scenario === 'bridge' ? 'Bridge' : state.scenario === 'pvp' ? 'PvP / FX' : 'FX / RTGS';
    const middleLines = state.scenario === 'cbdc' ? [{ label: 'settlement', value: snapshot.cbdc ? money(snapshot.cbdc) : '—', red: Boolean(snapshot.cbdc) }, { label: 'issuer', value: 'SNB / pilot' }, { label: 'customer claim', value: 'separate' }] : state.scenario === 'bridge' ? [{ label: 'locked', value: snapshot.bridgeLocked ? money(amount) : '—', red: snapshot.bridgeLocked }, { label: 'wrapped', value: snapshot.wrapped ? money(amount) : '—', red: snapshot.wrapped }, { label: 'dependency', value: 'bridge key' }] : state.scenario === 'pvp' ? [{ label: 'CHF leg', value: isAtLeast(2) ? money(amount) : '—', red: isAtLeast(2) }, { label: 'EUR leg', value: isAtLeast(2) ? money(amount) : '—', red: isAtLeast(2) }, { label: 'rule', value: 'both or neither' }] : [{ label: 'CHF leg', value: isAtLeast(3) ? money(amount) : '—', red: isAtLeast(3) }, { label: 'EUR leg', value: isAtLeast(4) ? money(amount) : '—', red: isAtLeast(4) }, { label: 'FX rate', value: '1 CHF = 1 EUR' }];
    markup += nodeCard({ x: layout.middle[0], y: layout.middle[1], w: CARD_SIZE.middle.w, h: CARD_SIZE.middle.h, tag: 'ADVANCED LEG', title: middleTitle, subtitle: 'illustrative path', lines: middleLines, tone: snapshot.failed ? 'svg-node--warning' : '' });
  }
  markup += nodeCard({ x: layout.bankB[0], y: layout.bankB[1], w: CARD_SIZE.bank.w, h: CARD_SIZE.bank.h, tag: 'BANK B', title: 'CBS + GL', subtitle: 'receiving bank record', lines: bankBLines, tone: snapshot.claimHolder.startsWith('Luca') ? 'svg-node--active' : '' });
  markup += nodeCard({ x: layout.luca[0], y: layout.luca[1], w: CARD_SIZE.luca.w, h: CARD_SIZE.luca.h, tag: 'CUSTOMER', title: 'Luca', subtitle: 'recipient', lines: lucaLines, tone: snapshot.claimHolder.startsWith('Luca') ? 'svg-node--active' : '' });
  refs.stageActors.innerHTML = markup;
}

function renderConnections(snapshot) {
  const layout = getLayout(state.scenario);
  const a = layout.alice;
  const ba = layout.bankA;
  const d = layout.dlt;
  const bb = layout.bankB;
  const l = layout.luca;
  let markup = '';
  const link = (x1, y1, x2, y2, cls = 'svg-connection') => { markup += connection(x1, y1, x2, y2, cls); };
  const pathLink = (path, cls = 'svg-connection') => { markup += routeConnection(path, cls); };
  const aliceRight = a[0] + CARD_SIZE.alice.w;
  const bankARight = ba[0] + CARD_SIZE.bank.w;
  const dltRight = d[0] + CARD_SIZE.ledger.w;
  const bankBRight = bb[0] + CARD_SIZE.bank.w;
  const cardMidY = ba[1] + 82;
  const lowerY = 274;
  const sicCenterX = layout.sic[0] + 105;
  if (state.scenario === 'mint' || state.scenario === 'redeem') {
    link(aliceRight, cardMidY, ba[0], cardMidY, 'svg-connection--red');
    link(bankARight, cardMidY, d[0], cardMidY, state.model === 'instruction' ? 'svg-connection svg-connection--dashed' : 'svg-connection--red');
    link(d[0] + CARD_SIZE.ledger.w / 2, d[1] + CARD_SIZE.ledger.h, a[0] + CARD_SIZE.alice.w / 2, a[1] + CARD_SIZE.alice.h, state.scenario === 'redeem' ? 'svg-connection--red' : 'svg-connection svg-connection--dashed');
  } else if (state.scenario === 'same') {
    link(aliceRight, cardMidY, ba[0], cardMidY, 'svg-connection--red');
    link(bankARight, cardMidY, d[0], cardMidY, 'svg-connection--red');
    pathLink(`M ${dltRight - 6} ${d[1] + CARD_SIZE.ledger.h} C 690 ${lowerY + 20}, 780 ${lowerY + 20}, ${l[0] + 8} ${l[1] + CARD_SIZE.luca.h}`, 'svg-connection--red');
  } else if (state.scenario === 'interbank') {
    link(aliceRight, cardMidY, ba[0], cardMidY, 'svg-connection--red');
    link(ba[0] + CARD_SIZE.bank.w / 2, ba[1] + CARD_SIZE.bank.h, sicCenterX, layout.sic[1], 'svg-connection--red');
    link(sicCenterX, layout.sic[1], bb[0] + CARD_SIZE.bank.w / 2, bb[1] + CARD_SIZE.bank.h, 'svg-connection--red');
    link(bankBRight, cardMidY, l[0], cardMidY, 'svg-connection--red');
    link(bankARight, ba[1] + 43, d[0], d[1] + 43, 'svg-connection svg-connection--dashed');
    link(dltRight, d[1] + 43, bb[0], bb[1] + 43, 'svg-connection svg-connection--dashed');
  } else if (state.scenario === 'netting') {
    link(bankARight, ba[1] + 64, bb[0], bb[1] + 64, 'svg-connection--red');
    link(bb[0], bb[1] + 112, bankARight, ba[1] + 112, 'svg-connection svg-connection--dashed');
    link(ba[0] + CARD_SIZE.bank.w / 2, ba[1] + CARD_SIZE.bank.h, sicCenterX, layout.sic[1], 'svg-connection--red');
    link(sicCenterX, layout.sic[1], bb[0] + CARD_SIZE.bank.w / 2, bb[1] + CARD_SIZE.bank.h, 'svg-connection--red');
  } else {
    const m = layout.middle;
    link(aliceRight, cardMidY, ba[0], cardMidY, 'svg-connection--red');
    pathLink(`M ${bankARight - 8} ${ba[1] + CARD_SIZE.bank.h} C ${bankARight + 12} ${lowerY + 18}, ${m[0] - 18} ${lowerY + 18}, ${m[0] + 12} ${m[1]}`, 'svg-connection--red');
    pathLink(`M ${m[0] + CARD_SIZE.middle.w - 12} ${m[1]} C ${m[0] + CARD_SIZE.middle.w + 22} ${lowerY + 18}, ${bb[0] - 18} ${lowerY + 18}, ${bb[0] + 8} ${bb[1] + CARD_SIZE.bank.h}`, 'svg-connection--red');
    link(bankBRight, cardMidY, l[0], cardMidY, 'svg-connection--red');
    link(ba[0] + CARD_SIZE.bank.w / 2, ba[1] + CARD_SIZE.bank.h, sicCenterX, layout.sic[1], 'svg-connection svg-connection--dashed');
    link(sicCenterX, layout.sic[1], bb[0] + CARD_SIZE.bank.w / 2, bb[1] + CARD_SIZE.bank.h, 'svg-connection svg-connection--dashed');
  }
  refs.stageConnections.innerHTML = markup;
}

function renderOverlay(snapshot) {
  let markup = '';
  const scenario = state.scenario;
  const failure = activeFailure();
  if (scenario === 'mint' || scenario === 'redeem') {
    const detail = state.model === 'instruction' ? 'instruction linked to ordinary account' : state.model === 'native' ? 'DLT is the master balance' : state.model === 'stablecoin' ? 'separate issuer / reserve' : 'token supply = mirror = GL';
    markup += captionBox(790, 420, 270, snapshot.reconciliation === 'Mismatch' ? 'RECONCILIATION HALTED' : 'BALANCE CHECK', detail, snapshot.reconciliation === 'Mismatch' ? 'red' : 'black');
  }
  if (scenario === 'same') {
    markup += captionBox(390, 420, 320, 'SAME BANK', 'Bank A total liability unchanged · no SIC movement', 'black');
  }
  if (scenario === 'interbank') {
    markup += captionBox(390, 420, 320, 'SIC / SNB', `${money(snapshot.bankASnb)} → ${money(snapshot.bankBSnb)}`, snapshot.finality === 'Blocked' ? 'red' : 'black');
  }
  if (scenario === 'netting') {
    markup += captionBox(370, 420, 360, 'SETTLEMENT COMPARISON', `gross ${money(snapshot.gross)} · net ${money(snapshot.net)}`, 'black');
    markup += pill(820, 420, 'RTGS = gross', 'black');
    markup += pill(820, 452, 'batch = net', 'red');
  }
  if (scenario === 'correspondent') {
    markup += captionBox(370, 434, 360, 'ILLUSTRATIVE FX', '1 CHF = 1 EUR · not market data', 'black');
  }
  if (scenario === 'pvp') {
    markup += captionBox(370, 434, 360, snapshot.failed ? 'PVP STOPPED' : 'PAYMENT-VERSUS-PAYMENT', snapshot.failed ? 'one leg fails → neither completes' : 'both legs settle or neither settles', snapshot.failed ? 'red' : 'black');
  }
  if (scenario === 'cbdc') {
    markup += captionBox(370, 434, 360, 'SETTLEMENT ASSET', 'wCBDC is a central-bank liability', 'black');
  }
  if (scenario === 'bridge') {
    markup += captionBox(370, 434, 360, snapshot.failed ? 'BRIDGE PAUSED' : 'EXTRA TRUST DEPENDENCY', snapshot.failed ? 'key / contract controls stop movement' : 'lock → wrap → redeem', snapshot.failed ? 'red' : 'black');
  }
  if (scenario === 'mismatch') {
    const label = state.stepIndex >= 6 ? 'RESTORED' : state.stepIndex >= 2 ? 'MISMATCH → HALT' : 'THREE RECORDS';
    const detail = state.stepIndex >= 6 ? 'DLT = subledger = GL' : state.stepIndex >= 2 ? 'pause mint / outbound · replay · repair' : 'DLT supply · subledger · GL';
    markup += captionBox(370, 420, 360, label, detail, state.stepIndex >= 2 && state.stepIndex < 6 ? 'red' : 'black');
  }
  if (failure) {
    markup += captionBox(20, 420, 330, failure.label.toUpperCase(), failure.recovery, 'red');
  }
  refs.stageOverlay.innerHTML = markup;
}

function fundPosition() {
  const scenario = state.scenario;
  const step = state.stepIndex;
  const A = [205, 168];
  const BA = [470, 154];
  const D = [730, 154];
  const BB = [995, 154];
  const L = [1115, 168];
  const RAIL = ['correspondent', 'pvp', 'cbdc', 'bridge'].includes(scenario) ? [640, 270] : [640, 330];
  if (scenario === 'mint') return [A, BA, D, D, RAIL, A, A][step];
  if (scenario === 'redeem') return [A, D, RAIL, BA, BA, A, A][step];
  if (scenario === 'same') return [A, BA, D, D, L, L, L][step];
  if (scenario === 'interbank') return [A, BA, RAIL, D, RAIL, BB, L][step];
  if (scenario === 'netting') return [BA, BB, BA, RAIL, RAIL, BB, BB][step];
  if (scenario === 'correspondent') return [A, BA, RAIL, RAIL, BB, L, L][step];
  if (scenario === 'pvp') return [A, BA, RAIL, D, BB, L, L][step];
  if (scenario === 'cbdc') return [A, BA, D, RAIL, RAIL, L, L][step];
  if (scenario === 'bridge') return [A, BA, D, RAIL, RAIL, BB, L][step];
  return [A, BA, D, D, D, D, A][step];
}

function updateMovingFund() {
  const next = fundPosition();
  const [x, y] = next;
  refs.movingFund.style.transform = `translate(${x}px, ${y}px)`;
  refs.movingFund.querySelector('.fund-amount').textContent = money(state.amount);
  refs.movingFund.classList.toggle('fund-pulse', state.playing || state.stepIndex > 0);
  state.previousFund = { x, y };
  if (state.scenario === 'pvp') {
    refs.movingFundB.hidden = false;
    const pvpPositions = [[1115, 168], [995, 154], [640, 270], [730, 154], [470, 154], [205, 168], [205, 168]];
    const [bx, by] = pvpPositions[state.stepIndex];
    refs.movingFundB.style.transform = `translate(${bx}px, ${by}px)`;
    refs.movingFundB.querySelector('.fund-amount').textContent = money(state.amount, 'EUR');
  } else {
    refs.movingFundB.hidden = true;
  }
}

function renderTimeline() {
  const steps = scenarioSteps();
  refs.timelineTrack.innerHTML = steps.map((label, index) => `<span class="timeline-step ${index < state.stepIndex ? 'is-complete' : ''} ${index === state.stepIndex ? 'is-current' : ''}" aria-label="${esc(label)}"></span>`).join('');
  refs.stepLabel.textContent = steps[state.stepIndex];
  refs.stepCount.textContent = `${Math.min(state.stepIndex + 1, steps.length)} / ${steps.length}`;
}

function updateStatus(snapshot) {
  refs.statusHolder.textContent = snapshot.claimHolder;
  refs.statusDebtor.textContent = snapshot.debtor;
  refs.statusAuthority.textContent = snapshot.authority;
  refs.statusFinality.textContent = snapshot.finality;
  refs.statusReconciliation.textContent = snapshot.reconciliation;
  refs.statusFinality.classList.toggle('is-warning', snapshot.finality === 'Blocked' || snapshot.finality === 'Pending');
  refs.statusReconciliation.classList.toggle('is-warning', snapshot.reconciliation === 'Mismatch');
  refs.stageStatus.textContent = snapshot.failed ? snapshot.failure.label : isFinal() ? 'Final state · illustrative' : 'Illustrative simulation';
}

function updateCaption(snapshot) {
  const model = MODEL_META[state.model];
  const scenario = state.scenario;
  let caption = model.insightClaim;
  if (scenario === 'mint') caption = state.model === 'instruction' ? 'The red ticket is an instruction. The ordinary CBS account remains the balance record.' : state.model === 'mirrored' ? 'CBS reserves and reclassifies first; only then does the token ledger mint.' : state.model === 'native' ? 'The DLT creates the authoritative token claim; CBS and GL synchronise around it.' : 'The issuer creates a token claim backed by its own reserve or guarantee structure.';
  if (scenario === 'redeem') caption = 'Burn removes the token representation; it does not destroy CHF economically. The bank releases value after final evidence.';
  if (scenario === 'same') caption = state.model === 'instruction' ? 'Acceptance causes an ordinary Bank A account payment.' : 'Alice’s claim decreases and Luca’s claim increases; Bank A’s total liability is unchanged.';
  if (scenario === 'interbank') caption = 'Bank A and Bank B are separate debtors. SIC moves central-bank money; Bank B creates its own customer claim after acceptance.';
  if (scenario === 'netting') caption = 'Netting reduces the amount settled later; it is a settlement convention, not the same thing as SIC RTGS finality.';
  if (scenario === 'correspondent') caption = 'Tokenisation can coordinate the message, but the cross-border payment still needs FX, correspondents and a foreign settlement system.';
  if (scenario === 'pvp') caption = 'Payment-versus-payment means the CHF and EUR legs settle together or neither completes.';
  if (scenario === 'cbdc') caption = 'Wholesale CBDC is central-bank money for eligible institutions; a commercial-bank deposit token remains a bank liability.';
  if (scenario === 'bridge') caption = 'A bridge adds a lock, wrapped representation and redemption dependency between ledgers.';
  if (scenario === 'mismatch') caption = 'A safe design pauses movement when DLT supply, the customer subledger and the GL disagree.';
  if (snapshot.failed) caption = `${snapshot.failure.headline} ${snapshot.failure.recovery}`;
  refs.stageCaption.textContent = caption;
  refs.scenarioDescription.textContent = SCENARIO_META[scenario].description;
  refs.stageSvg.setAttribute('aria-label', `${MODEL_META[state.model].label}, ${SCENARIO_META[scenario].label}, step ${SCENARIO_META[scenario].steps[state.stepIndex]}. ${caption}`);
}

function render() {
  const snapshot = derivedState();
  modelFacts();
  renderGrid();
  renderConnections(snapshot);
  renderActors(snapshot);
  renderOverlay(snapshot);
  renderTimeline();
  updateStatus(snapshot);
  updateCaption(snapshot);
  refs.amountOutput.textContent = money(state.amount);
  refs.playButton.textContent = state.playing ? 'Pause' : 'Play';
  refs.failureSelect.value = state.failureMode;
  updateMovingFund();
}

function stopPlayback() {
  state.playing = false;
  if (state.timer) window.clearTimeout(state.timer);
  state.timer = null;
}

function advance() {
  const last = scenarioSteps().length - 1;
  if (activeFailure() || state.stepIndex >= last) {
    stopPlayback();
    render();
    return;
  }
  state.stepIndex += 1;
  render();
  if (state.playing) scheduleNext();
}

function scheduleNext() {
  if (!state.playing) return;
  state.timer = window.setTimeout(advance, 1050 / state.speed);
}

function togglePlayback() {
  if (state.playing) {
    stopPlayback();
    render();
    return;
  }
  if (isFinal() || activeFailure()) state.stepIndex = 0;
  state.playing = true;
  render();
  scheduleNext();
}

function reset() {
  stopPlayback();
  state.stepIndex = 0;
  render();
}

function bindEvents() {
  document.querySelectorAll('.model-tab').forEach((tab) => tab.addEventListener('click', () => {
    stopPlayback();
    state.model = tab.dataset.model;
    state.stepIndex = 0;
    render();
  }));
  refs.scenarioSelect.addEventListener('change', (event) => {
    stopPlayback();
    state.scenario = event.target.value;
    state.stepIndex = 0;
    render();
  });
  refs.amountRange.addEventListener('input', (event) => {
    state.amount = Number(event.target.value);
    render();
  });
  refs.speedSelect.addEventListener('change', (event) => {
    state.speed = Number(event.target.value);
    if (state.playing) { if (state.timer) window.clearTimeout(state.timer); scheduleNext(); }
  });
  refs.stepButton.addEventListener('click', () => { stopPlayback(); advance(); });
  refs.playButton.addEventListener('click', togglePlayback);
  refs.resetButton.addEventListener('click', reset);
  refs.applyFailureButton.addEventListener('click', () => {
    stopPlayback();
    state.failureMode = refs.failureSelect.value;
    state.stepIndex = 0;
    refs.riskNote.textContent = state.failureMode === 'none' ? 'Failure paths are simulated and deterministic. They do not represent a legal conclusion.' : `${FAILURE_META[state.failureMode].label}: step forward until the failure point, then inspect the safe recovery state.`;
    render();
  });
  window.addEventListener('keydown', (event) => {
    if (event.target.matches('input, select, button')) return;
    if (event.code === 'Space') { event.preventDefault(); togglePlayback(); }
    if (event.code === 'ArrowRight') { event.preventDefault(); stopPlayback(); advance(); }
    if (event.key.toLowerCase() === 'r') reset();
  });
}

function init() {
  refs.stageGrid = get('stage-grid');
  refs.stageConnections = get('stage-connections');
  refs.stageActors = get('stage-actors');
  refs.stageOverlay = get('stage-overlay');
  refs.stageSvg = get('stage-svg');
  refs.movingFund = get('moving-fund');
  refs.movingFundB = get('moving-fund-b');
  refs.stageCaption = get('stage-caption');
  refs.stageStatus = get('stage-status');
  refs.scenarioDescription = get('scenario-description');
  refs.timelineTrack = get('timeline-track');
  refs.stepLabel = get('step-label');
  refs.stepCount = get('step-count');
  refs.amountRange = get('amount-range');
  refs.amountOutput = get('amount-output');
  refs.speedSelect = get('speed-select');
  refs.scenarioSelect = get('scenario-select');
  refs.stepButton = get('step-button');
  refs.playButton = get('play-button');
  refs.resetButton = get('reset-button');
  refs.failureSelect = get('failure-select');
  refs.applyFailureButton = get('apply-failure-button');
  refs.riskNote = get('risk-note');
  refs.factClaim = get('fact-claim');
  refs.factAuthority = get('fact-authority');
  refs.factMechanism = get('fact-mechanism');
  refs.factRisk = get('fact-risk');
  refs.statusHolder = get('status-holder');
  refs.statusDebtor = get('status-debtor');
  refs.statusAuthority = get('status-authority');
  refs.statusFinality = get('status-finality');
  refs.statusReconciliation = get('status-reconciliation');
  refs.insightDebtor = get('insight-debtor');
  refs.insightLedger = get('insight-ledger');
  refs.insightFailure = get('insight-failure');
  bindEvents();
  render();
}

document.addEventListener('DOMContentLoaded', init);
