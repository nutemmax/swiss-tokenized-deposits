const BASE = 1000;
const AMOUNT = 100;

const MODELS = {
  instruction: {
    label: 'Payment instruction', claim: 'Instruction plus the ordinary bank account', authority: 'CBS and ordinary account', mechanism: 'Bank accepts the instruction, then posts the payment', risk: 'The holder may not have a direct deposit claim before acceptance', debtor: 'Bank A after acceptance', tokenForm: 'ticket',
    insightClaim: 'The token may be an instruction before it becomes a direct deposit claim.', insightLedger: 'The ordinary account and CBS remain authoritative; the token records the instruction.', insightFailure: 'The bank can reject or hold the instruction before acceptance without silently changing the account.'
  },
  mirrored: {
    label: 'Mirrored deposit', claim: 'Bank deposit represented by a token and linked subaccount', authority: 'CBS and GL, reconciled to DLT', mechanism: 'Reserve, reclassify, mint, transfer and burn', risk: 'The token supply, customer subledger and GL must remain synchronized', debtor: 'Issuing bank', tokenForm: 'coin',
    insightClaim: 'The holder keeps a claim on the issuing bank; the token is a controlled representation.', insightLedger: 'CBS and GL are authoritative while the token ledger mirrors the controlled balance.', insightFailure: 'A mismatch must pause minting and outbound transfers until controlled repair.'
  },
  native: {
    label: 'Native on-chain', claim: 'Direct on-chain claim on the issuing bank', authority: 'DLT master record, integrated with CBS and GL', mechanism: 'The DLT transfer changes the recorded holder directly', risk: 'Finality, recovery, correction, reporting and resolution become harder', debtor: 'Issuing bank', tokenForm: 'coin',
    insightClaim: 'The token ledger itself records the holder of the bank claim.', insightLedger: 'DLT is authoritative; CBS and GL must reliably ingest and report its events.', insightFailure: 'A chain halt or contract problem can become both a legal and operational incident.'
  },
  stablecoin: {
    label: 'Non-bank stablecoin', claim: 'Claim on a separate issuer or guarantee structure', authority: 'Issuer ledger plus reserve or guarantee', mechanism: 'Issuer mints, transfers and redeems', risk: 'Issuer, reserve, guarantee and redemption risk', debtor: 'Stablecoin issuer or guarantor', tokenForm: 'issuer',
    insightClaim: 'The holder claims against the issuer or guarantee structure, not automatically a bank.', insightLedger: 'The issuer ledger and reserve records are separate from bank customer accounts.', insightFailure: 'The accepting bank must assess issuer, redemption, AML and counterparty risk.'
  }
};

const SCENARIOS = {
  mint: { label: 'Convert / mint', description: 'Move an ordinary bank balance into the selected representation.', steps: ['Requested', 'Checked', 'Reserved', 'Token action', 'Recorded', 'Available', 'Final'] },
  redeem: { label: 'Redeem / burn', description: 'Disable the token representation before ordinary bank value is released.', steps: ['Requested', 'Checked', 'Reserved', 'Burn', 'Evidence', 'Released', 'Final'] },
  same: { label: 'Same-bank transfer', description: 'Move value from Alice to Luca while Bank A remains the debtor.', steps: ['Requested', 'Checked', 'Reserved', 'Transfer', 'Internal post', 'Accepted', 'Final'] },
  interbank: { label: 'Swiss interbank', description: 'Separate Bank A’s claim, SIC settlement money and Bank B’s new claim.', steps: ['Requested', 'Checked', 'Reserved', 'Token action', 'SIC final', 'Bank B accepts', 'Final'] },
  netting: { label: 'Gross versus net', description: 'Compare two gross obligations with a later net-settlement convention.', steps: ['Requested', 'Matched', 'Gross', 'Offset', 'Net settles', 'Accepted', 'Final'] },
  correspondent: { label: 'Correspondent + FX', description: 'Follow CHF through a correspondent, illustrative FX and foreign settlement.', steps: ['Requested', 'Checked', 'FX locked', 'CHF leg', 'EUR leg', 'Accepted', 'Final'] },
  pvp: { label: 'Cross-border PvP', description: 'Lock the CHF and EUR legs so both settle together or neither completes.', steps: ['Requested', 'Checked', 'Both locked', 'Atomic release', 'Finality', 'Accepted', 'Final'] },
  cbdc: { label: 'Wholesale CBDC', description: 'Compare commercial-bank deposits with a central-bank settlement token.', steps: ['Requested', 'Checked', 'wCBDC ready', 'Atomic settle', 'Reconciled', 'Accepted', 'Final'] },
  bridge: { label: 'Bridge / wrapped token', description: 'Lock value on one ledger and create a wrapped representation on another.', steps: ['Requested', 'Checked', 'Source locked', 'Wrapped', 'Bridge confirms', 'Redeemed', 'Final'] },
  mismatch: { label: 'Mismatch + recovery', description: 'Pause movement when DLT, subledger and GL disagree, then repair safely.', steps: ['Requested', 'Matched', 'Mismatch', 'Halted', 'Investigate', 'Repair', 'Restored'] }
};

const FAILURES = {
  none: { trigger: -1, label: 'No failure', text: '' },
  aml: { trigger: 1, label: 'AML / sanctions rejection', text: 'Compliance rejects the request before value moves.' },
  dlt: { trigger: 3, label: 'DLT unavailable', text: 'The token action cannot complete; the reservation remains pending.' },
  sic: { trigger: 4, label: 'SIC unavailable', text: 'Interbank central-bank money is not final.' },
  receiver: { trigger: 5, label: 'Receiving bank rejection', text: 'Bank B declines before creating Luca’s claim.' },
  mismatch: { trigger: 2, label: 'Reconciliation mismatch', text: 'Token supply, subledger and GL do not agree.' },
  key: { trigger: 3, label: 'Key / contract pause', text: 'An administrator pauses token movement after a control alert.' }
};

const state = { model: 'instruction', scenario: 'mint', step: 0, speed: 1, playing: false, failure: 'none', selectedActor: 'alice', timer: null };
const refs = {};
const $ = (id) => document.getElementById(id);
const money = (value, currency = 'CHF') => `${currency} ${Math.round(value).toLocaleString('en-CH')}`;
const esc = (value) => String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const at = (step) => state.step >= step;
const finalStep = () => SCENARIOS[state.scenario].steps.length - 1;
const activeFailure = () => {
  const failure = FAILURES[state.failure];
  if (!failure || failure.trigger < 0) return null;
  return state.step >= failure.trigger && state.step < finalStep() ? failure : null;
};
const isFinal = () => state.step >= finalStep() && !activeFailure();

function snapshot() {
  const amount = AMOUNT;
  const model = state.model;
  const scenario = state.scenario;
  const s = {
    aliceOrdinary: BASE, aliceToken: 0, aliceMirror: 0, lucaOrdinary: 0, lucaToken: 0, lucaMirror: 0,
    bankASnb: BASE, bankBSnb: BASE, tokenSupply: 0, issuerReserve: 0,
    holder: 'Alice', debtor: MODELS[model].debtor, authority: MODELS[model].authority,
    finality: isFinal() ? 'Final' : activeFailure() ? 'Blocked' : at(4) ? 'Settlement pending' : 'Pending', reconciliation: 'Matched'
  };

  if (scenario === 'mint') {
    if (model === 'instruction') s.tokenSupply = at(3) ? amount : 0;
    if (model === 'mirrored') { s.aliceOrdinary = at(3) ? BASE - amount : BASE; s.aliceMirror = at(3) ? amount : 0; s.aliceToken = at(3) ? amount : 0; s.tokenSupply = s.aliceToken; }
    if (model === 'native') { s.aliceOrdinary = at(3) ? BASE - amount : BASE; s.aliceToken = at(3) ? amount : 0; s.tokenSupply = s.aliceToken; s.authority = 'DLT master record'; }
    if (model === 'stablecoin') { s.aliceOrdinary = at(3) ? BASE - amount : BASE; s.aliceToken = at(3) ? amount : 0; s.tokenSupply = s.aliceToken; s.issuerReserve = s.tokenSupply; s.holder = at(3) ? 'Alice · issuer claim' : 'Alice'; }
  }

  if (scenario === 'redeem') {
    if (model === 'instruction') s.tokenSupply = at(2) && !isFinal() ? amount : 0;
    if (model === 'mirrored') { s.aliceOrdinary = isFinal() ? BASE : BASE - amount; s.aliceMirror = isFinal() ? 0 : amount; s.aliceToken = s.aliceMirror; s.tokenSupply = s.aliceToken; }
    if (model === 'native') { s.aliceOrdinary = isFinal() ? BASE : BASE - amount; s.aliceToken = isFinal() ? 0 : amount; s.tokenSupply = s.aliceToken; s.authority = 'DLT master record'; }
    if (model === 'stablecoin') { s.aliceOrdinary = isFinal() ? BASE : BASE - amount; s.aliceToken = isFinal() ? 0 : amount; s.tokenSupply = s.aliceToken; s.issuerReserve = s.tokenSupply; }
  }

  if (scenario === 'same') {
    if (model === 'instruction') { s.tokenSupply = at(3) && !isFinal() ? amount : 0; s.aliceOrdinary = isFinal() ? BASE - amount : BASE; s.lucaOrdinary = isFinal() ? amount : 0; }
    else { s.aliceOrdinary = BASE - amount; s.aliceToken = isFinal() ? 0 : amount; s.lucaToken = isFinal() ? amount : 0; s.tokenSupply = amount; if (model === 'mirrored') { s.aliceMirror = s.aliceToken; s.lucaMirror = s.lucaToken; } if (model === 'stablecoin') s.issuerReserve = amount; }
    s.holder = isFinal() ? (model === 'stablecoin' ? 'Luca · issuer claim' : 'Luca') : 'Alice';
  }

  if (scenario === 'interbank') {
    if (model === 'instruction') { s.tokenSupply = at(3) && !isFinal() ? amount : 0; s.aliceOrdinary = isFinal() ? BASE - amount : BASE; s.lucaOrdinary = isFinal() ? amount : 0; }
    else { s.aliceOrdinary = BASE - amount; s.aliceToken = at(4) ? 0 : amount; s.lucaToken = at(5) ? amount : 0; s.tokenSupply = s.aliceToken + s.lucaToken; if (model === 'mirrored') { s.aliceMirror = s.aliceToken; s.lucaMirror = s.lucaToken; } if (model === 'stablecoin') s.issuerReserve = amount; }
    if (at(4)) { s.bankASnb = BASE - amount; s.bankBSnb = BASE + amount; }
    s.holder = at(5) ? (model === 'stablecoin' ? 'Luca · issuer claim' : 'Luca') : 'Alice / pending';
    s.debtor = model === 'stablecoin' ? 'Stablecoin issuer' : at(5) ? 'Bank B' : 'Bank A until acceptance';
    s.finality = isFinal() ? 'SIC final + accepted' : activeFailure() ? 'Blocked' : at(4) ? 'SIC final / acceptance pending' : 'Pending';
  }

  if (scenario === 'netting') {
    s.grossA = amount; s.grossB = Math.round(amount * .6); s.net = s.grossA - s.grossB;
    if (at(4)) { s.bankASnb = BASE - s.net; s.bankBSnb = BASE + s.net; }
    s.holder = 'Bank obligations'; s.debtor = 'Bank A and Bank B'; s.authority = 'Payment-system rules';
  }

  if (scenario === 'correspondent') { s.aliceOrdinary = at(5) ? BASE - amount : BASE; s.lucaOrdinary = isFinal() ? amount : 0; s.holder = isFinal() ? 'Foreign customer' : 'Alice / pending'; s.debtor = isFinal() ? 'Foreign bank' : 'Correspondent chain'; s.authority = 'CBS + correspondent RTGS'; s.finality = isFinal() ? 'Foreign RTGS final' : 'Cross-border pending'; }
  if (scenario === 'pvp') { s.aliceOrdinary = model === 'instruction' ? BASE : BASE - amount; s.aliceToken = at(5) ? 0 : amount; s.lucaToken = at(5) ? amount : 0; s.tokenSupply = amount; s.holder = at(2) && !at(5) ? 'Both legs locked' : at(5) ? 'Both counterparties' : 'Alice / counterparty'; s.debtor = 'Two issuing banks'; s.authority = 'Shared PvP rules'; s.finality = isFinal() ? 'Both legs final' : activeFailure() ? 'Neither leg final' : 'Both legs pending'; }
  if (scenario === 'cbdc') { s.aliceOrdinary = model === 'instruction' ? BASE : BASE - amount; s.aliceToken = at(5) ? 0 : amount; s.lucaToken = at(5) ? amount : 0; s.tokenSupply = amount; s.wcbdc = at(2) ? amount : 0; s.holder = at(5) ? 'Recipient' : 'Commercial-bank claim'; s.debtor = 'Commercial banks'; s.authority = 'Deposit ledger + wCBDC settlement'; }
  if (scenario === 'bridge') { s.aliceOrdinary = model === 'instruction' ? BASE : BASE - amount; s.aliceToken = at(2) ? 0 : amount; s.tokenSupply = amount; s.locked = at(2) && !isFinal(); s.wrapped = at(3) && !isFinal(); s.holder = isFinal() ? 'Destination wallet' : s.locked ? 'Bridge escrow' : 'Alice'; s.debtor = 'Origin issuer / bridge rules'; s.authority = 'Two ledgers + bridge'; s.finality = isFinal() ? 'Redeemed' : activeFailure() ? 'Bridge paused' : 'Cross-ledger pending'; }
  if (scenario === 'mismatch') { s.aliceOrdinary = model === 'instruction' ? BASE : BASE - amount; s.aliceToken = amount; s.aliceMirror = amount; s.tokenSupply = at(2) && state.step < 6 ? amount + 10 : amount; s.holder = 'Alice · held'; s.debtor = 'Bank A'; s.authority = at(3) && state.step < 6 ? 'CBS / GL paused' : 'CBS / GL + DLT'; s.reconciliation = at(2) && state.step < 6 ? 'Mismatch' : 'Matched'; s.finality = state.step >= 6 ? 'Restored' : at(2) ? 'Blocked' : 'Pending'; }

  if (model === 'stablecoin' && s.tokenSupply > 0 && s.issuerReserve === 0) s.issuerReserve = amount;

  if (activeFailure()) { s.finality = 'Blocked'; if (state.failure === 'mismatch') s.reconciliation = 'Mismatch'; }
  return s;
}

function visibleCustomerBalance(ordinary, token) {
  return ordinary + (state.model === 'instruction' ? 0 : token);
}

function person(x, y, name, amount, selected, side = 'left', dormant = false) {
  const accent = selected ? ' actor-selected' : '';
  const flip = side === 'right' ? 'scale(-1 1) translate(-110 0)' : '';
  const figure = name === 'Alice' ? `
      <path d="M28 40c0-48 58-48 58-2l-2 80-22-15V48c-13-3-22-12-29-24-1 14-3 27-5 38Z" fill="#171717"></path>
      <circle class="actor-accent" cx="55" cy="37" r="25" fill="#e1b394" stroke="#151515" stroke-width="2"></circle>
      <path d="M30 73c15-12 35-12 50 0l22 86H8Z" fill="#d52f3a" stroke="#151515" stroke-width="2"></path>
      <path d="M28 158 23 208M82 158l7 50" stroke="#151515" stroke-width="5"></path>
      <path d="M12 214h24M77 214h24" stroke="#151515" stroke-width="7" stroke-linecap="round"></path>` : `
      <circle class="actor-accent" cx="55" cy="37" r="27" fill="#e1b394" stroke="#151515" stroke-width="2"></circle>
      <path d="M29 37c0-38 57-41 56 0-13-4-22-11-30-20-5 11-14 18-26 20Z" fill="#171717"></path>
      <path d="M31 74c15-12 34-12 49 0l13 80-22 5-5 55H48l-6-55-25-5Z" fill="#fff" stroke="#151515" stroke-width="2"></path>
      <path d="M31 76 17 154h26l7-72" fill="#d52f3a"></path>
      <path d="M48 214h18M22 214h24" stroke="#151515" stroke-width="7" stroke-linecap="round"></path>`;
  return `<g class="actor-hit${accent}${dormant ? ' actor-dormant' : ''}" data-actor="${name.toLowerCase()}" role="button" tabindex="0" aria-label="Inspect ${name}" transform="translate(${x} ${y})">
    <g transform="${flip}" filter="url(#object-shadow)">
      <ellipse cx="55" cy="208" rx="42" ry="7" fill="#c8bfb8"></ellipse>
      ${figure}
      <rect x="72" y="94" width="21" height="37" rx="5" fill="#151515"></rect>
      <circle cx="82" cy="122" r="1.5" fill="#fff"></circle>
    </g>
    <text x="55" y="242" text-anchor="middle" class="actor-label">${name}</text>
    <text x="55" y="260" text-anchor="middle" class="actor-meta">customer · wallet</text>
    <text x="55" y="282" text-anchor="middle" class="actor-amount">${esc(amount)}</text>
  </g>`;
}

function bank(x, y, name, balance, active, selected, dormant = false) {
  const cls = active ? ' bank-active' : '';
  return `<g class="actor-hit${selected ? ' actor-selected' : ''}${dormant ? ' actor-dormant' : ''}" data-actor="${name === 'BANK A' ? 'banka' : 'bankb'}" role="button" tabindex="0" aria-label="Inspect ${name}" transform="translate(${x} ${y})" filter="url(#object-shadow)">
    <g class="${cls}">
      <path class="bank-roof" d="M0 64 100 6l100 58Z"></path>
      <rect class="bank-body actor-accent" x="14" y="64" width="172" height="138" rx="3"></rect>
      <rect class="bank-window" x="31" y="84" width="35" height="55"></rect><rect class="bank-window" x="82" y="84" width="35" height="55"></rect>
      <g class="actor-hit" data-actor="${name === 'BANK A' ? 'cbsa' : 'cbsb'}" role="button" tabindex="0" aria-label="Inspect ${name} CBS and GL">
        <rect class="bank-server" x="133" y="83" width="36" height="93" rx="5"></rect>
        <path class="bank-server-line" d="M141 98h20M141 114h20M141 130h20M141 146h20"></path>
        <circle cx="151" cy="163" r="4" fill="#d52f3a"></circle>
      </g>
      <path d="M77 202v-45h46v45" fill="#151515"></path>
    </g>
    <text x="100" y="229" text-anchor="middle" class="actor-label">${name}</text>
    <text x="100" y="247" text-anchor="middle" class="actor-meta">commercial-bank liability</text>
    <text x="100" y="268" text-anchor="middle" class="actor-amount">SNB ${esc(balance)}</text>
  </g>`;
}

function dlt(x, y, supply, active, model) {
  const label = 'DLT LEDGER';
  return `<g class="actor-hit ${active ? 'dlt-active' : ''}" data-actor="dlt" role="button" tabindex="0" aria-label="Inspect ${label}" transform="translate(${x} ${y})">
    <path class="dlt-line" d="M25 48 82 16l55 39-52 40Z M25 48l60 47M82 16l3 79M137 55l55 45M85 95l107 5"></path>
    <circle class="dlt-node actor-accent" cx="25" cy="48" r="16"></circle><circle class="dlt-node" cx="82" cy="16" r="16"></circle><circle class="dlt-node" cx="137" cy="55" r="16"></circle><circle class="dlt-node" cx="85" cy="95" r="16"></circle><circle class="dlt-node" cx="192" cy="100" r="16"></circle>
    <rect x="38" y="129" width="150" height="50" rx="5" fill="#fff" stroke="#151515" stroke-width="2"></rect>
    <text x="113" y="151" text-anchor="middle" class="infra-title">${label}</text>
    <text x="113" y="168" text-anchor="middle" class="actor-amount">SUPPLY · ${supply ? esc(money(supply)) : '—'}</text>
  </g>`;
}

function issuerFacility(x, y, supply, reserve, active) {
  return `<g class="actor-hit issuer-facility ${active ? 'issuer-active' : ''}" data-actor="issuer" role="button" tabindex="0" aria-label="Inspect stablecoin issuer and reserve" transform="translate(${x} ${y})" filter="url(#object-shadow)">
    <path class="issuer-roof actor-accent" d="M0 52 34 16h176l34 36Z"></path>
    <rect class="issuer-body" x="9" y="52" width="226" height="130" rx="4"></rect>
    <g transform="translate(28 75)">
      <circle class="issuer-vault" cx="49" cy="48" r="43"></circle>
      <circle class="issuer-vault-door" cx="49" cy="48" r="28"></circle>
      <path class="issuer-vault-spoke" d="M49 26v44M27 48h44M34 33l30 30M64 33 34 63"></path>
      <circle cx="49" cy="48" r="6" fill="#d52f3a"></circle>
      <text x="49" y="105" text-anchor="middle" class="issuer-caption">RESERVE / GUARANTEE</text>
    </g>
    <g transform="translate(133 74)">
      <rect class="issuer-screen" width="78" height="71" rx="5"></rect>
      <text x="39" y="21" text-anchor="middle" class="issuer-screen-label">ISSUER</text>
      <text x="39" y="38" text-anchor="middle" class="issuer-screen-label">LEDGER</text>
      <path d="M14 53h50" stroke="#d52f3a" stroke-width="5"></path>
      <circle cx="16" cy="53" r="5" fill="#fff"></circle>
      <text x="39" y="94" text-anchor="middle" class="issuer-caption">TOKEN SUPPLY</text>
    </g>
    <text x="122" y="211" text-anchor="middle" class="actor-label">STABLECOIN ISSUER</text>
    <text x="122" y="230" text-anchor="middle" class="actor-amount">RESERVE ${esc(money(reserve))}</text>
    <text x="122" y="249" text-anchor="middle" class="actor-meta">SUPPLY · ${supply ? esc(money(supply)) : '—'}</text>
  </g>`;
}

function settlementRail(s) {
  return `<g class="actor-hit" data-actor="sic" role="button" tabindex="0" aria-label="Inspect SIC and SNB settlement rail">
    <text x="40" y="473" class="rail-label">SIC / SNB SETTLEMENT RAIL</text><text x="40" y="493" class="rail-sub">central-bank money between banks · not the customer token</text>
    <path class="rail-track actor-accent" d="M245 530H815"></path>
    ${Array.from({ length: 12 }, (_, i) => `<path class="rail-sleeper" d="M${270 + i * 47} 517v26"></path>`).join('')}
    <g transform="translate(216 506)"><rect width="115" height="48" rx="4" fill="#fff"></rect><text x="57" y="20" text-anchor="middle" class="infra-title">BANK A</text><text x="57" y="37" text-anchor="middle" class="actor-amount">${esc(money(s.bankASnb))}</text></g>
    <g transform="translate(735 506)"><rect width="115" height="48" rx="4" fill="#fff"></rect><text x="57" y="20" text-anchor="middle" class="infra-title">BANK B</text><text x="57" y="37" text-anchor="middle" class="actor-amount">${esc(money(s.bankBSnb))}</text></g>
  </g>`;
}

function bridgeObject(s) {
  return `<g class="actor-hit" data-actor="bridge" role="button" tabindex="0" aria-label="Inspect bridge" transform="translate(405 322)">
    <path class="bridge-deck actor-accent" d="M0 74h250"></path><path class="bridge-cable" d="M20 74C65 4 185 4 230 74M42 48v26M74 22v52M108 9v65M142 9v65M176 22v52M208 48v26"></path>
    <rect x="-8" y="70" width="34" height="60" fill="#151515"></rect><rect x="224" y="70" width="34" height="60" fill="#151515"></rect>
    <text x="125" y="108" text-anchor="middle" class="rail-label">BRIDGE</text><text x="125" y="125" text-anchor="middle" class="rail-sub">${s.locked ? 'source locked' : 'lock'} · ${s.wrapped ? 'wrapped live' : 'wrap'} · redeem</text>
  </g>`;
}

function specialInfrastructure(s) {
  if (state.scenario === 'bridge') return bridgeObject(s);
  if (state.scenario === 'pvp') return `<g class="actor-hit" data-actor="pvp" role="button" tabindex="0" transform="translate(430 342)"><rect x="0" y="0" width="200" height="88" rx="9" fill="#fff" stroke="#151515" stroke-width="2"></rect><path d="M48 48h104" stroke="#d52f3a" stroke-width="8"></path><rect class="pvp-lock" x="81" y="19" width="38" height="42" rx="5"></rect><path d="M90 20v-9c0-18 20-18 20 0v9" fill="none" stroke="#151515" stroke-width="5"></path><text x="100" y="79" text-anchor="middle" class="infra-title">CHF ↔ EUR · BOTH OR NEITHER</text></g>`;
  if (state.scenario === 'correspondent') return `<g class="actor-hit" data-actor="fx" role="button" tabindex="0" transform="translate(426 344)"><circle cx="52" cy="43" r="40" fill="#151515"></circle><circle cx="145" cy="43" r="40" fill="#fff" stroke="#151515" stroke-width="2"></circle><text x="52" y="49" text-anchor="middle" class="rail-label">CHF</text><text x="145" y="49" text-anchor="middle" class="infra-title">EUR</text><path d="M90 33h20m-20 20h20" stroke="#d52f3a" stroke-width="5"></path><text x="98" y="104" text-anchor="middle" class="infra-title">ILLUSTRATIVE FX · 1 : 1</text></g>`;
  if (state.scenario === 'cbdc') return `<g class="actor-hit" data-actor="wcbdc" role="button" tabindex="0" transform="translate(433 337)"><circle cx="98" cy="58" r="55" fill="#d52f3a"></circle><path d="M68 65h60M76 45h44M84 25h28" stroke="#fff" stroke-width="6"></path><text x="98" y="130" text-anchor="middle" class="infra-title">WHOLESALE CBDC</text><text x="98" y="147" text-anchor="middle" class="infra-sub">central-bank settlement asset</text></g>`;
  return '';
}

const FLOW_POINTS = {
  mint: [[145,110],[320,130],[405,230],[618,182],[618,182],[145,110],[145,110]],
  redeem: [[145,110],[618,182],[618,182],[618,182],[405,230],[320,130],[145,110]],
  same: [[145,110],[320,130],[405,230],[618,182],[405,230],[960,110],[960,110]],
  interbank: [[145,110],[320,130],[405,230],[618,182],[590,530],[850,230],[960,110]],
  netting: [[320,130],[800,130],[330,530],[530,530],[790,530],[800,130],[800,130]],
  correspondent: [[145,110],[320,130],[478,387],[478,387],[571,387],[800,130],[960,110]],
  pvp: [[145,110],[320,130],[478,390],[530,390],[580,390],[800,130],[960,110]],
  cbdc: [[145,110],[320,130],[531,395],[531,395],[531,395],[800,130],[960,110]],
  bridge: [[145,110],[320,130],[430,396],[530,396],[640,396],[800,130],[960,110]],
  mismatch: [[145,110],[320,130],[618,182],[618,182],[618,182],[405,230],[145,110]]
};

function routePath(from, to) {
  const [x1, y1] = from; const [x2, y2] = to;
  if (y1 >= 280 && y2 <= 260 && x2 < 300) return `M${x1} ${y1}C${x1 + 35} 220,${x1 + 30} 75,${x1 - 35} 75H${x2 + 45}Q${x2} 75,${x2} ${y2}`;
  if (y1 >= 280 && y2 <= 260 && x2 > 700) return `M${x1} ${y1}C${x1 + 105} 410,690 260,690 130Q690 75,745 75H${x2 - 45}Q${x2} 75,${x2} ${y2}`;
  if (y1 >= 440 && y2 <= 260 && x2 > 700) return `M${x1} ${y1}C690 430,680 180,735 82H${x2 - 45}Q${x2} 82,${x2} ${y2}`;
  if (y1 <= 260 && y2 >= 440 && x1 < 500) return `M${x1} ${y1}C185 300,185 430,275 500Q330 ${y2},${x2} ${y2}`;
  if (y1 <= 260 && y2 >= 440 && x1 > 700) return `M${x1} ${y1}H735Q690 82,690 135V400Q690 ${y2},${x2} ${y2}`;
  if (y1 <= 260 && y2 >= 440) return `M${x1} ${y1}C${x1 + 15} 300,680 360,${x2} ${y2}`;
  const bend = Math.max(26, Math.abs(x2 - x1) * .25);
  return `M${x1} ${y1}C${x1 + (x2 >= x1 ? bend : -bend)} ${y1},${x2 - (x2 >= x1 ? bend : -bend)} ${y2},${x2} ${y2}`;
}

function routes() {
  const points = FLOW_POINTS[state.scenario];
  return points.slice(0, -1).map((point, index) => {
    if (point[0] === points[index + 1][0] && point[1] === points[index + 1][1]) return '';
    if (index > state.step) return '';
    const cls = index < state.step ? 'route-complete' : 'route-active';
    return `<path class="${cls}" d="${routePath(point, points[index + 1])}"></path>`;
  }).join('');
}

function fundPosition() { return FLOW_POINTS[state.scenario][state.step]; }

function fundMarkup() {
  const [x, y] = fundPosition();
  const form = MODELS[state.model].tokenForm;
  const shape = form === 'ticket'
    ? `<rect class="fund-shape" x="-55" y="-23" width="110" height="46" rx="5"></rect><rect x="-55" y="-23" width="27" height="46" rx="5" fill="#151515"></rect><path d="m-48 0 6 6 9-13" fill="none" stroke="#fff" stroke-width="3"></path><text x="13" y="4" text-anchor="middle">${esc(money(AMOUNT))}</text>`
    : form === 'issuer'
      ? `<circle class="fund-shape" r="30"></circle><circle r="20" fill="none" stroke="#fff" stroke-width="2"></circle><text x="0" y="4" text-anchor="middle">${esc(money(AMOUNT))}</text>`
      : `<path class="fund-shape" d="M0-34 30-17l-8 35L0 38l-22-20-8-35Z"></path><path d="M0-34 11-11 0 24-11-11Z" fill="#f06a72"></path><path d="m-30-17 19 6L0-34-22 18m52-35-19 6L0-34l22 52" fill="#a71824"></path><text x="0" y="8" text-anchor="middle">${esc(money(AMOUNT))}</text>`;
  let result = `<g class="fund-object fund-object--${form}" data-fund="chf" style="transform:translate(${x}px,${y}px)"><circle class="fund-halo" r="46"></circle>${shape}</g>`;
  if (state.scenario === 'pvp') { const reverse = [[960,110],[800,130],[580,390],[530,390],[478,390],[320,130],[145,110]][state.step]; result += `<g class="fund-object" data-fund="eur" style="transform:translate(${reverse[0]}px,${reverse[1]}px)"><circle class="fund-halo" r="42"></circle><circle class="fund-shape" r="30"></circle><text x="0" y="4" text-anchor="middle">${esc(money(AMOUNT, 'EUR'))}</text></g>`; }
  return result;
}

function annotation(s) {
  if (activeFailure()) return `<g class="scene-chip scene-chip--red" transform="translate(362 18)"><rect width="336" height="43" rx="5"></rect><text x="168" y="26" text-anchor="middle">${esc(activeFailure().label.toUpperCase())} · VALUE HELD</text></g>`;
  if (state.scenario === 'same') return `<g class="scene-chip" transform="translate(370 18)"><rect width="320" height="43" rx="5"></rect><text x="160" y="26" text-anchor="middle">NO SIC · BANK A LIABILITY UNCHANGED</text></g>`;
  if (state.scenario === 'netting') return `<g class="scene-chip" transform="translate(380 18)"><rect width="300" height="43" rx="5"></rect><text x="150" y="26" text-anchor="middle">GROSS ${esc(money(s.grossA + s.grossB))} · NET ${esc(money(s.net))}</text></g>`;
  if (state.scenario === 'mismatch') return `<g class="scene-chip ${s.reconciliation === 'Mismatch' ? 'scene-chip--red' : ''}" transform="translate(375 18)"><rect width="310" height="43" rx="5"></rect><text x="155" y="26" text-anchor="middle">${s.reconciliation === 'Mismatch' ? 'MISMATCH · PAUSE AND REPAIR' : 'DLT = SUBLEDGER = GL'}</text></g>`;
  return `<g class="scene-chip" transform="translate(408 18)"><rect width="244" height="43" rx="5"></rect><text x="122" y="26" text-anchor="middle">${esc(MODELS[state.model].label.toUpperCase())}</text></g>`;
}

function renderScene(s) {
  const railFloor = state.scenario === 'interbank' || state.scenario === 'netting' ? '<rect x="0" y="440" width="1060" height="150" class="scene-floor"></rect>' : '';
  refs.stageBackground.innerHTML = `<rect width="1060" height="590" class="scene-bg"></rect><rect width="1060" height="440" class="scene-dot-field"></rect>${railFloor}`;
  refs.stageRoutes.innerHTML = routes();
  const authorityObject = state.model === 'stablecoin'
    ? issuerFacility(422, 70, s.tokenSupply, s.issuerReserve, at(3))
    : dlt(414, 82, s.tokenSupply, state.model === 'native' || at(3), state.model);
  refs.stageInfrastructure.innerHTML = `${(state.scenario === 'interbank' || state.scenario === 'netting') ? settlementRail(s) : ''}${specialInfrastructure(s)}${authorityObject}`;
  const bankBDormant = ['mint','redeem','same','mismatch'].includes(state.scenario);
  const lucaDormant = ['mint','redeem','netting','mismatch'].includes(state.scenario);
  const aliceDormant = state.scenario === 'netting';
  refs.stageActors.innerHTML = `${person(22, 155, 'Alice', money(visibleCustomerBalance(s.aliceOrdinary, s.aliceToken)), state.selectedActor === 'alice', 'left', aliceDormant)}${bank(220, 124, 'BANK A', money(s.bankASnb), state.selectedActor === 'banka', state.selectedActor === 'banka')}${bank(700, 124, 'BANK B', money(s.bankBSnb), s.holder.startsWith('Luca'), state.selectedActor === 'bankb', bankBDormant)}${person(912, 155, 'Luca', money(visibleCustomerBalance(s.lucaOrdinary, s.lucaToken)), state.selectedActor === 'luca', 'right', lucaDormant)}`;
  refs.stageFunds.innerHTML = fundMarkup();
  refs.stageAnnotations.innerHTML = annotation(s);
}

function actorData(s) {
  const data = {
    alice: { title: 'Alice', mark: 'A', summary: 'Alice is the initiating customer and the first holder of the claim.', rows: [['Visible balance', money(visibleCustomerBalance(s.aliceOrdinary, s.aliceToken))], ['Ordinary deposit', money(s.aliceOrdinary)], ['Token / instruction', s.aliceToken || s.tokenSupply ? money(s.aliceToken || s.tokenSupply) : 'None'], ['Current claim', s.holder.startsWith('Alice') ? 'Held by Alice' : 'Transferred / pending']] },
    luca: { title: 'Luca', mark: 'L', summary: 'Luca is the receiving customer. His creditor relationship depends on acceptance and the product model.', rows: [['Visible balance', money(visibleCustomerBalance(s.lucaOrdinary, s.lucaToken))], ['Ordinary deposit', money(s.lucaOrdinary)], ['Token balance', s.lucaToken ? money(s.lucaToken) : 'None'], ['Status', s.holder.startsWith('Luca') ? 'Accepted holder' : 'Waiting']] },
    banka: { title: 'Bank A', mark: 'A', summary: 'Bank A owes Alice under the original deposit relationship and initiates any interbank settlement leg.', rows: [['Customer-liability role', 'Original debtor'], ['SNB sight balance', money(s.bankASnb)], ['Authoritative record', state.model === 'native' ? 'DLT + reporting sync' : 'CBS / GL'], ['State', activeFailure() ? 'Held / repairable' : at(4) ? 'Settlement processed' : 'Open']] },
    bankb: { title: 'Bank B', mark: 'B', summary: 'Bank B becomes Luca’s debtor only after the receiving side accepts and records the new claim.', rows: [['Customer-liability role', s.holder.startsWith('Luca') ? 'New debtor' : 'Prospective debtor'], ['SNB sight balance', money(s.bankBSnb)], ['Acceptance', at(5) ? 'Accepted' : 'Pending'], ['Customer claim', s.lucaOrdinary + s.lucaToken ? money(s.lucaOrdinary + s.lucaToken) : 'None']] },
    cbsa: { title: 'Bank A · CBS / GL', mark: '▤', summary: 'The core banking system maintains customer accounts; the GL records the bank’s financial position.', rows: [['Authority', state.model === 'native' ? 'Reporting replica' : 'Authoritative'], ['Alice ordinary', money(s.aliceOrdinary)], ['Mirror subaccount', s.aliceMirror ? money(s.aliceMirror) : 'None'], ['Control', s.reconciliation]] },
    cbsb: { title: 'Bank B · CBS / GL', mark: '▤', summary: 'Bank B records Luca’s customer claim after its acceptance conditions are met.', rows: [['Authority', state.model === 'native' ? 'Reporting replica' : 'Authoritative'], ['Luca ordinary', money(s.lucaOrdinary)], ['Mirror subaccount', s.lucaMirror ? money(s.lucaMirror) : 'None'], ['Acceptance', at(5) ? 'Accepted' : 'Pending']] },
    dlt: { title: 'DLT ledger', mark: '◇', summary: state.model === 'native' ? 'The DLT is the authoritative holder record.' : 'The DLT is a controlled representation reconciled to banking records.', rows: [['Token supply', money(s.tokenSupply)], ['Authority', state.model === 'native' ? 'Master record' : 'Representation'], ['Access', 'Permissioned / allow-listed'], ['Reconciliation', s.reconciliation]] },
    issuer: { title: 'Stablecoin issuer', mark: '◎', summary: 'The issuer—not the accepting bank—owes the stablecoin holder under the issuer terms.', rows: [['Token supply', money(s.tokenSupply)], ['Reserve / guarantee', money(s.issuerReserve)], ['Legal debtor', 'Issuer / guarantor'], ['Bank deposit protection', 'Not automatic']] },
    sic: { title: 'SIC / SNB rail', mark: '≋', summary: 'This rail moves central-bank money between participating banks. Alice’s retail token does not enter the SNB.', rows: [['Settlement asset', 'SNB sight deposits'], ['Bank A balance', money(s.bankASnb)], ['Bank B balance', money(s.bankBSnb)], ['Finality', s.finality]] },
    bridge: { title: 'Cross-ledger bridge', mark: '⌒', summary: 'The bridge locks value on one ledger and authorizes a wrapped representation on another.', rows: [['Source state', s.locked ? 'Locked' : 'Available'], ['Wrapped state', s.wrapped ? money(AMOUNT) : 'None'], ['Additional dependency', 'Bridge keys / contract'], ['Finality', s.finality]] },
    pvp: { title: 'PvP mechanism', mark: '⇄', summary: 'Payment-versus-payment coordinates two currency legs so principal does not settle one-sided.', rows: [['CHF leg', money(AMOUNT)], ['EUR leg', money(AMOUNT, 'EUR')], ['Release rule', 'Both or neither'], ['Finality', s.finality]] },
    fx: { title: 'FX / correspondent', mark: '↔', summary: 'Cross-border settlement adds conversion, correspondent balances and foreign payment-system rules.', rows: [['Illustrative rate', '1 CHF = 1 EUR'], ['Market data', 'No · illustrative'], ['Origin leg', 'CHF'], ['Destination leg', 'EUR']] },
    wcbdc: { title: 'Wholesale CBDC', mark: '◉', summary: 'Wholesale CBDC is a central-bank liability used for institutional settlement—not a retail customer deposit.', rows: [['Issuer', 'Central bank'], ['Eligible holders', 'Participating institutions'], ['Customer claim', 'Still commercial-bank money'], ['Status', 'Conceptual comparison']] }
  };
  return data[state.selectedActor] || data.alice;
}

function renderDrawer(s) {
  const data = actorData(s);
  refs.drawerTitle.textContent = data.title;
  refs.drawerSummary.textContent = data.summary;
  refs.drawerVisual.dataset.mark = data.mark;
  refs.drawerDetails.innerHTML = data.rows.map(([key, value]) => `<div><dt>${esc(key)}</dt><dd>${esc(value)}</dd></div>`).join('');
}

function updateModelFacts() {
  const model = MODELS[state.model];
  refs.factClaim.textContent = model.claim;
  refs.factAuthority.textContent = model.authority;
  refs.factMechanism.textContent = model.mechanism;
  refs.factRisk.textContent = model.risk;
  refs.insightDebtor.textContent = model.insightClaim;
  refs.insightLedger.textContent = model.insightLedger;
  refs.insightFailure.textContent = model.insightFailure;
  document.querySelectorAll('.model-tab').forEach((button) => { const on = button.dataset.model === state.model; button.classList.toggle('is-selected', on); button.setAttribute('aria-selected', String(on)); });
}

function updateFlowControls() {
  const core = ['mint','redeem','same','interbank','netting'];
  document.querySelectorAll('.flow-button').forEach((button) => button.classList.toggle('is-selected', button.dataset.scenario === state.scenario));
  refs.scenarioSelect.value = core.includes(state.scenario) ? '' : state.scenario;
  refs.scenarioKicker.textContent = SCENARIOS[state.scenario].label.toUpperCase();
  refs.scenarioDescription.textContent = SCENARIOS[state.scenario].description;
}

function updateTimeline() {
  const steps = SCENARIOS[state.scenario].steps;
  refs.timelineTrack.innerHTML = steps.map((_, index) => `<span class="timeline-step ${index < state.step ? 'is-complete' : ''} ${index === state.step ? 'is-current' : ''}"></span>`).join('');
  refs.stepLabel.textContent = steps[state.step]; refs.stepCount.textContent = `${state.step + 1} / ${steps.length}`;
}

function render() {
  const s = snapshot();
  updateModelFacts(); updateFlowControls(); renderScene(s); renderDrawer(s); updateTimeline();
  refs.statusHolder.textContent = s.holder; refs.statusDebtor.textContent = s.debtor; refs.statusFinality.textContent = s.finality; refs.statusReconciliation.textContent = s.reconciliation;
  refs.statusFinality.classList.toggle('is-warning', s.finality === 'Blocked' || s.finality === 'Pending'); refs.statusReconciliation.classList.toggle('is-warning', s.reconciliation === 'Mismatch');
  refs.playButton.innerHTML = state.playing ? '<span aria-hidden="true">Ⅱ</span> Pause' : '<span aria-hidden="true">▶</span> Play';
  refs.stageStatus.textContent = activeFailure() ? FAILURES[state.failure].label : isFinal() ? 'Final state · illustrative' : 'Illustrative simulation';
  refs.stageSvg.setAttribute('aria-label', `${MODELS[state.model].label}; ${SCENARIOS[state.scenario].label}; ${SCENARIOS[state.scenario].steps[state.step]}. Claim: ${s.holder}. Debtor: ${s.debtor}.`);
}

function stop() { state.playing = false; if (state.timer) clearTimeout(state.timer); state.timer = null; }
function schedule() { if (state.playing) state.timer = setTimeout(advance, 1000 / state.speed); }
function advance() { if (activeFailure() || state.step >= finalStep()) { stop(); render(); return; } state.step += 1; render(); schedule(); }
function reset() { stop(); state.step = 0; render(); }
function play() { if (state.playing) { stop(); render(); return; } if (isFinal() || activeFailure()) state.step = 0; state.playing = true; render(); schedule(); }
function chooseScenario(value) { stop(); state.scenario = value; state.step = 0; state.selectedActor = value === 'bridge' ? 'bridge' : value === 'pvp' ? 'pvp' : value === 'cbdc' ? 'wcbdc' : value === 'correspondent' ? 'fx' : 'alice'; render(); }

function bind() {
  document.querySelectorAll('.model-tab').forEach((button) => button.addEventListener('click', () => { stop(); state.model = button.dataset.model; state.step = 0; state.selectedActor = state.model === 'stablecoin' ? 'issuer' : 'alice'; render(); }));
  document.querySelectorAll('.flow-button').forEach((button) => button.addEventListener('click', () => chooseScenario(button.dataset.scenario)));
  refs.scenarioSelect.addEventListener('change', (event) => { if (event.target.value) chooseScenario(event.target.value); });
  refs.speedSelect.addEventListener('change', (event) => { state.speed = Number(event.target.value); if (state.playing) { clearTimeout(state.timer); schedule(); } });
  refs.stepButton.addEventListener('click', () => { stop(); advance(); }); refs.playButton.addEventListener('click', play); refs.resetButton.addEventListener('click', reset);
  refs.applyFailureButton.addEventListener('click', () => { stop(); state.failure = refs.failureSelect.value; state.step = 0; refs.riskNote.textContent = state.failure === 'none' ? 'Failure paths are simulated and deterministic. They do not represent a legal conclusion.' : `${FAILURES[state.failure].label}: advance until the affected control stops the flow.`; render(); });
  refs.stageSvg.addEventListener('click', (event) => { const actor = event.target.closest('[data-actor]'); if (actor) { state.selectedActor = actor.dataset.actor; render(); } });
  refs.stageSvg.addEventListener('keydown', (event) => { if ((event.key === 'Enter' || event.key === ' ') && event.target.closest('[data-actor]')) { event.preventDefault(); state.selectedActor = event.target.closest('[data-actor]').dataset.actor; render(); } });
  window.addEventListener('keydown', (event) => { if (event.target.matches('input,select,button,summary')) return; if (event.code === 'Space') { event.preventDefault(); play(); } if (event.code === 'ArrowRight') { event.preventDefault(); stop(); advance(); } if (event.key.toLowerCase() === 'r') reset(); });
}

function init() {
  ['stage-background','stage-routes','stage-infrastructure','stage-actors','stage-funds','stage-annotations','stage-svg','scenario-select','scenario-kicker','scenario-description','stage-status','speed-select','step-button','play-button','reset-button','timeline-track','step-label','step-count','status-holder','status-debtor','status-finality','status-reconciliation','fact-claim','fact-authority','fact-mechanism','fact-risk','drawer-title','drawer-visual','drawer-summary','drawer-details','insight-debtor','insight-ledger','insight-failure','failure-select','apply-failure-button','risk-note'].forEach((id) => { refs[id.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = $(id); });
  bind(); render();
}

document.addEventListener('DOMContentLoaded', init);
