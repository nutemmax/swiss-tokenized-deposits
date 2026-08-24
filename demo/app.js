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

const FLOW_STEP_ACTIONS = {
  mint: [
    'Alice asks to place CHF 100 into the selected digital form; no balance or claim has changed yet.',
    'Identity, sanctions, wallet and product checks run before the bank or issuer moves value.',
    'CHF 100 is reserved so it cannot be spent twice, while the existing claim remains pending.',
    'The authorized digital instruction or token is created only after the prerequisite control has succeeded.',
    'The new event is recorded with its banking or issuer record and a shared audit reference.',
    'Alice can use the digital representation once the required records agree and controls release it.',
    'Conversion is complete: one CHF 100 position is usable in its new form, not duplicated as extra money.'
  ],
  redeem: [
    'Alice asks to leave the digital form and receive ordinary account value or an issuer payout.',
    'Ownership, compliance, wallet and redemption checks run before the digital unit is disabled.',
    'CHF 100 is held against further transfer while redemption remains reversible and pending.',
    'The token is burned or the instruction is cancelled or consumed; this removes the representation, not CHF economically.',
    'The bank or issuer matches final burn or cancellation evidence before releasing conventional value.',
    'CHF 100 is released to the ordinary account or paid from the issuer arrangement after the evidence is accepted.',
    'Redemption is final: the digital unit is no longer spendable and the customer holds the released value instead.'
  ],
  same: [
    'Alice asks to transfer CHF 100 to Luca without changing the institution or scheme that owes the value.',
    'The sender, recipient, wallet, balance and compliance checks complete before value is reserved.',
    'CHF 100 is locked against a second payment while Alice remains the holder of the pending claim.',
    'The transfer event moves the digital holder record from Alice toward Luca under the selected product rules.',
    'The authoritative customer or issuer record posts the internal reallocation; no SIC central-bank payment is needed.',
    'Luca accepts and can see CHF 100, while the institution or issuer total liability remains unchanged.',
    'The same-system transfer is final after the holder records agree; no interbank settlement occurred.'
  ],
  interbank: [
    'Alice asks to send CHF 100 across institutions, so the design must distinguish the customer claim from settlement money.',
    'Both sides check identity, sanctions, account eligibility and the receiving arrangement before reserving value.',
    'CHF 100 is reserved at the sending side while Alice keeps the defined pending claim under the scheme rules.',
    'The sending representation is locked, consumed or extinguished as required before the receiving side can issue or accept value.',
    'The settlement stage is reached; the product determines whether SIC moves central-bank money or an issuer ledger transfers the same issuer claim.',
    'The receiving side accepts the transfer and records Luca’s claim without silently changing who the legal debtor is.',
    'The cross-institution flow is final only after the required settlement, acceptance and ledger evidence are all complete.'
  ],
  netting: [
    'The demo creates a CHF 100 obligation from Bank A and a CHF 60 obligation from Bank B.',
    'The two obligations are matched as separate payments before any offset is calculated.',
    'Gross settlement would move both payments individually, for CHF 160 of total settlement activity.',
    'A separate netting convention offsets the opposing obligations and calculates a CHF 40 balance from Bank A to Bank B.',
    'Only the CHF 40 net amount settles at the agreed later point; this is not presented as default SIC RTGS behavior.',
    'Both participants post the settled result to their customer, scheme and general-ledger records.',
    'The batch is final after the net settlement and participant postings agree with the original gross obligations.'
  ],
  correspondent: [
    'Alice requests a CHF 100 cross-border payment to a recipient who will receive the illustrative EUR equivalent.',
    'The banks and correspondents screen both parties, the corridor, purpose and funding before execution.',
    'The illustrative FX rate and the required CHF and EUR liquidity are locked; this is not live market data.',
    'The CHF leg moves through the Swiss bank or correspondent and its domestic settlement arrangement.',
    'The EUR correspondent funds the destination leg through the applicable foreign payment system.',
    'The foreign receiving institution accepts the payment and records the recipient’s usable value.',
    'The transfer is final only after both currency legs, correspondent records and receiving credit are reconciled.'
  ],
  pvp: [
    'The parties request an exchange of a CHF 100 leg for an illustrative EUR 100 leg.',
    'Both sides complete identity, sanctions, wallet, currency and settlement-eligibility checks.',
    'The CHF and EUR legs are locked simultaneously so neither party can spend the promised value elsewhere.',
    'The payment-versus-payment rule releases both legs together or releases neither leg.',
    'Each connected ledger or payment system must recognize the other leg’s finality before the exchange is conclusive.',
    'Both recipients accept their new currency claims under the relevant issuer or bank rules.',
    'Both legs are final; PvP reduces principal risk but still depends on enforceable rules and interoperable controls.'
  ],
  cbdc: [
    'The banks prepare a tokenized customer transfer with wholesale central-bank money as the comparison settlement asset.',
    'Customer, bank, wallet and participant-eligibility checks run before either commercial or central-bank value moves.',
    'Wholesale CBDC is made available to eligible institutions; Alice never becomes the holder of that central-bank asset.',
    'The customer-liability change is coordinated with the wholesale-CBDC movement between participating institutions.',
    'The customer ledger, bank general ledger and central-bank settlement evidence are reconciled.',
    'The receiving institution accepts the customer-facing claim after institutional settlement succeeds.',
    'The flow is final, while wholesale CBDC remains central-bank money and the customer-facing instrument remains legally separate.'
  ],
  bridge: [
    'Alice requests movement from the source ledger to a different network through a bridge.',
    'The bridge checks the wallet, source asset, destination network, contract version and transfer controls.',
    'CHF 100 is locked on the source ledger so it cannot remain freely spendable while a wrapped unit exists.',
    'A wrapped representation is created on the destination network against the locked source position.',
    'The bridge attests that lock and mint events correspond, adding its keys, code and governance as dependencies.',
    'The destination holder receives or redeems the wrapped unit under the destination and origin issuer rules.',
    'The cross-ledger movement is final only if lock, wrap, redemption and both ledgers remain consistent.'
  ],
  mismatch: [
    'The control process starts from records that should describe the same CHF 100 position.',
    'DLT supply, the customer subledger and the financial control record initially match.',
    'The demo introduces a CHF 10 difference, so the records no longer support one consistent balance.',
    'Minting and outbound movement stop; the customer claim is held rather than erased or silently changed.',
    'Operations compare event identifiers, postings, contract events and replay evidence to locate the break.',
    'Authorized staff repair or replay the missing event under dual control without inventing value.',
    'The three records match again and normal movement can resume with an auditable repair trail.'
  ]
};

const MODEL_FLOW_CONTEXT = {
  instruction: {
    mint: 'The CBS account remains authoritative, and creating the token creates a payment instruction rather than a second deposit balance.',
    redeem: 'This is cancellation or execution of an instruction; the ordinary CBS balance changes only when the bank posts the result.',
    same: 'Bank A remains the debtor, and its CBS debit and credit—not movement of the instruction alone—change Alice’s and Luca’s deposits.',
    interbank: 'The instruction does not itself become a Bank B deposit; ordinary settlement and Bank B acceptance are needed to create Luca’s claim.',
    netting: 'Instruction tokens may coordinate obligations, but the payment-system rulebook determines whether settlement is gross or net.',
    correspondent: 'The token coordinates data and authorization while correspondent accounts, FX and existing payment systems move the money.',
    pvp: 'The instructions coordinate both legs, but enforceable acceptance and settlement rules determine when the two payment claims arise.',
    cbdc: 'The instruction remains a commercial payment order while wholesale CBDC, if used, settles only between eligible institutions.',
    bridge: 'Wrapping a payment instruction does not turn it into a bank deposit, so the underlying bank acceptance rules still govern payment.',
    mismatch: 'The control compares instruction status with CBS postings rather than treating token supply as the bank’s deposit liability.'
  },
  mirrored: {
    mint: 'CBS and the general ledger remain authoritative, while the DLT token must exactly mirror the reserved token subaccount.',
    redeem: 'The token must be finally burned before CBS releases the mirror balance, and all three records must return to agreement.',
    same: 'Bank A remains the debtor; its CBS mirror subaccounts reallocate the liability and the DLT records the matching holder change.',
    interbank: 'Bank A’s claim is locked or extinguished, SIC funds Bank B in central-bank money, and Bank B then creates Luca’s separate claim.',
    netting: 'Customer tokens remain reconciled to each bank’s CBS while the banks may settle their resulting obligations gross or by an agreed net cycle.',
    correspondent: 'The mirrored deposit stays tied to its issuing bank until the correspondent and foreign-bank legs create the destination claim.',
    pvp: 'Each currency token mirrors a separate issuing-bank liability, and both CBS records must agree with the coordinated DLT release.',
    cbdc: 'Commercial-bank deposits remain CBS-recorded liabilities while wholesale CBDC provides the separate interbank settlement asset.',
    bridge: 'The source token still mirrors its CBS liability, while the bridge adds a wrapped record that must not create an unmatched second claim.',
    mismatch: 'DLT supply, customer token subledger and general-ledger control balance must match before minting or outbound movement resumes.'
  },
  native: {
    mint: 'The DLT creates the authoritative bank claim, and CBS and the general ledger must ingest the event for reporting and control.',
    redeem: 'Redemption extinguishes the authoritative on-chain claim before the bank creates an ordinary balance or makes a payout.',
    same: 'The DLT transfer changes the authoritative holder directly, while Bank A remains debtor and its reporting systems follow the event.',
    interbank: 'A simple address transfer cannot change the debtor from Bank A to Bank B; explicit claim transformation and settlement logic are required.',
    netting: 'On-chain bank claims can generate interbank obligations, but the agreed settlement rules—not block confirmation alone—determine net or gross finality.',
    correspondent: 'The authoritative token state must be coordinated with FX, correspondent and foreign-payment events that exist outside its ledger.',
    pvp: 'Both authoritative token ledgers must recognize the atomic rule, identity controls and each other’s legally effective finality.',
    cbdc: 'The commercial-bank claim is authoritative on its DLT, while wholesale CBDC is a distinct central-bank liability used by institutions.',
    bridge: 'The source DLT remains authoritative for the bank claim, and the wrapped token adds bridge and destination-ledger risk.',
    mismatch: 'Because DLT is the master holder record, a disagreement with CBS or reporting systems is a legal and operational incident, not routine bookkeeping noise.'
  },
  stablecoin: {
    mint: 'Funding creates a claim on the separate issuer or guarantee structure, whose ledger and reserve records—not Bank A’s CBS—govern the token.',
    redeem: 'The issuer extinguishes its token and pays from the reserve or guarantee arrangement; redemption is not an ordinary bank-deposit withdrawal.',
    same: 'The issuer remains the debtor when the coin moves between wallets, so the customers’ use of the same bank does not transform the legal claim.',
    interbank: 'The issuer remains the debtor after a direct wallet transfer; SIC and creation of a Bank B deposit are not intrinsic to this movement.',
    netting: 'Any netting concerns issuer-scheme or participant obligations, not an automatic offset of customer deposits at Bank A and Bank B.',
    correspondent: 'A stablecoin may serve as an intermediate corridor asset, but issuer redemption, FX and correspondent risks remain separate dependencies.',
    pvp: 'The two legs are claims on their token issuers or guarantee structures rather than automatically being deposits at the participating banks.',
    cbdc: 'The customer still holds an issuer claim, while wholesale CBDC—if present—settles only an institutional leg as central-bank money.',
    bridge: 'The wrapped unit remains dependent on the origin issuer and adds bridge custody, key and redemption risks on top.',
    mismatch: 'The issuer must reconcile token supply, reserve or guarantee records and customer entitlements; ordinary bank deposit protection is not automatic.'
  }
};

const STEP_EXPLANATIONS = Object.fromEntries(Object.entries(FLOW_STEP_ACTIONS).map(([scenario, steps]) => [scenario, steps.map((action) => Object.fromEntries(Object.keys(MODELS).map((model) => [model, `${action} ${MODEL_FLOW_CONTEXT[model][scenario]}`])))]));

const FAILURE_SCENARIOS = {
  aml: ['mint','redeem','same','interbank','correspondent','pvp','bridge'],
  dlt: ['mint','redeem','same','interbank','correspondent','pvp','cbdc','bridge','mismatch'],
  sic: ['interbank','netting'],
  receiver: ['interbank','correspondent','cbdc'],
  mismatch: ['mint','redeem','same','interbank','correspondent','pvp','cbdc','bridge','mismatch'],
  key: ['mint','redeem','same','interbank','correspondent','pvp','cbdc','bridge','mismatch']
};

const FAILURE_COPY = {
  aml: {
    instruction: 'Compliance rejected the instruction before payment; Alice’s CBS claim remains, nothing is final, and any temporary hold can be released after controlled review.',
    mirrored: 'Compliance rejected the transfer before final movement; the CBS-recorded claim remains held, nothing is final, and the bank can release the reservation after review.',
    native: 'Compliance stopped the on-chain action before final transfer; the last confirmed DLT holder remains, and movement can resume only after controlled clearance.',
    stablecoin: 'Compliance rejected the issuer-side action; the last accepted issuer claim remains, nothing is final, and the issuer must review or release the hold.'
  },
  dlt: {
    instruction: 'The DLT instruction cannot be recorded, so the CBS deposit remains authoritative and reserved until the bank safely retries or cancels.',
    mirrored: 'The DLT mint or transfer cannot complete; the CBS claim remains reserved, no token is final, and outbound movement stays paused until reconciliation.',
    native: 'The authoritative DLT is unavailable, so the last confirmed holder remains the legal record and no repair may proceed without controlled recovery evidence.',
    stablecoin: 'The issuer’s token ledger is unavailable; the last accepted issuer claim remains, no transfer is final, and issuance or redemption must pause.'
  },
  sic: {
    instruction: 'SIC cannot settle the bank-to-bank payment, so Alice’s payment remains pending, no central-bank finality exists, and the bank must retry or return it safely.',
    mirrored: 'SIC cannot move central-bank money, so Bank A’s claim remains in its defined pending state and Bank B must not create a final customer claim.',
    native: 'SIC cannot complete the separate settlement leg, so an on-chain confirmation cannot make the debtor change final and the transfer must remain held.',
    stablecoin: 'SIC is not used for this direct issuer-liability transfer.'
  },
  receiver: {
    instruction: 'The receiving institution refuses acceptance, so Luca has no new deposit claim and the pending payment requires an explicit return or controlled repair.',
    mirrored: 'Bank B refuses acceptance, so it must not mint Luca’s claim; the SIC proceeds and Bank A’s pending state require an explicit return or repair.',
    native: 'Bank B refuses the debtor transformation, so a DLT movement alone cannot create Luca’s Bank B claim and the scheme must execute its return rule.',
    stablecoin: 'The receiving institution declines the corridor or institutional credit, so the issuer claim is not made usable there and the scheme must return or repair the pending leg.'
  },
  mismatch: {
    instruction: 'Instruction status and the CBS posting disagree, so execution pauses, the customer’s deposit claim remains defined, and operations must reconcile the audit trail.',
    mirrored: 'DLT supply, token subledger and general-ledger control disagree, so value remains held and dual-control repair is required before movement resumes.',
    native: 'The DLT master record and bank reporting records disagree, so the last confirmed on-chain claim remains controlling while operations investigate and repair.',
    stablecoin: 'Issuer supply, reserve or guarantee records disagree, so transfers and redemptions pause until the issuer restores a provable match.'
  },
  key: {
    instruction: 'The instruction contract is paused, so the CBS claim remains in place and the bank must validate keys and audit evidence before retrying.',
    mirrored: 'The token contract is paused, so the CBS-recorded claim remains held and movement can resume only after key governance and reconciliation checks.',
    native: 'The authoritative contract is paused, so the last confirmed DLT holder remains and recovery requires the formally approved key and contract process.',
    stablecoin: 'The issuer contract is paused, so the existing issuer claim remains and minting, transfer or redemption must wait for controlled key recovery.'
  }
};

const state = { model: 'instruction', scenario: 'mint', step: 0, speed: 1, playing: false, failure: 'none', selectedActor: 'alice', timer: null };
const refs = {};
const $ = (id) => document.getElementById(id);
const money = (value, currency = 'CHF') => `${currency} ${Math.round(value).toLocaleString('en-CH')}`;
const esc = (value) => String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const at = (step) => state.step >= step;
const currentSteps = () => state.model === 'stablecoin' && state.scenario === 'interbank'
  ? ['Requested', 'Checked', 'Reserved', 'Issuer transfer', 'Issuer recorded', 'Recipient accepts', 'Final']
  : SCENARIOS[state.scenario].steps;
const finalStep = () => currentSteps().length - 1;
const failureApplicable = (failure, model = state.model, scenario = state.scenario) => {
  if (failure === 'none') return true;
  if (!FAILURE_SCENARIOS[failure]?.includes(scenario)) return false;
  if (model === 'stablecoin' && failure === 'sic') return false;
  if (model === 'stablecoin' && failure === 'receiver' && scenario === 'interbank') return false;
  return true;
};
const activeFailure = () => {
  const failure = FAILURES[state.failure];
  if (!failure || failure.trigger < 0 || !failureApplicable(state.failure)) return null;
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
    if (model === 'stablecoin') {
      s.aliceOrdinary = BASE - amount; s.aliceToken = at(5) ? 0 : amount; s.lucaToken = at(5) ? amount : 0; s.tokenSupply = amount; s.issuerReserve = amount;
      s.holder = at(5) ? 'Luca · issuer claim' : 'Alice · issuer claim / pending'; s.debtor = 'Stablecoin issuer'; s.authority = 'Issuer ledger + reserve / guarantee';
      s.finality = isFinal() ? 'Issuer-ledger final + accepted' : activeFailure() ? 'Blocked' : at(4) ? 'Issuer recorded / acceptance pending' : 'Pending';
    } else {
      if (model === 'instruction') { s.tokenSupply = at(3) && !isFinal() ? amount : 0; s.aliceOrdinary = isFinal() ? BASE - amount : BASE; s.lucaOrdinary = isFinal() ? amount : 0; }
      else { s.aliceOrdinary = BASE - amount; s.aliceToken = at(4) ? 0 : amount; s.lucaToken = at(5) ? amount : 0; s.tokenSupply = s.aliceToken + s.lucaToken; if (model === 'mirrored') { s.aliceMirror = s.aliceToken; s.lucaMirror = s.lucaToken; } }
      if (at(4)) { s.bankASnb = BASE - amount; s.bankBSnb = BASE + amount; }
      s.holder = at(5) ? 'Luca' : 'Alice / pending'; s.debtor = at(5) ? 'Bank B' : 'Bank A until acceptance';
      s.finality = isFinal() ? 'SIC final + accepted' : activeFailure() ? 'Blocked' : at(4) ? 'SIC final / acceptance pending' : 'Pending';
    }
  }

  if (scenario === 'netting') {
    s.grossA = amount; s.grossB = Math.round(amount * .6); s.net = s.grossA - s.grossB;
    if (at(4)) { s.bankASnb = BASE - s.net; s.bankBSnb = BASE + s.net; }
    s.holder = model === 'stablecoin' ? 'Issuer-scheme obligations' : 'Bank obligations'; s.debtor = model === 'stablecoin' ? 'Issuer-scheme participants' : 'Bank A and Bank B'; s.authority = 'Payment-system rules';
  }

  if (scenario === 'correspondent') { s.aliceOrdinary = at(5) ? BASE - amount : BASE; s.lucaOrdinary = isFinal() ? amount : 0; s.holder = isFinal() ? (model === 'stablecoin' ? 'Foreign customer · issuer claim' : 'Foreign customer') : 'Alice / pending'; s.debtor = model === 'stablecoin' ? 'Stablecoin issuer / corridor parties' : isFinal() ? 'Foreign bank' : 'Correspondent chain'; s.authority = model === 'stablecoin' ? 'Issuer ledger + corridor records' : 'CBS + correspondent RTGS'; s.finality = isFinal() ? 'Foreign leg final' : 'Cross-border pending'; }
  if (scenario === 'pvp') { s.aliceOrdinary = model === 'instruction' ? BASE : BASE - amount; s.aliceToken = at(5) ? 0 : amount; s.lucaToken = at(5) ? amount : 0; s.tokenSupply = amount; s.holder = at(2) && !at(5) ? 'Both legs locked' : at(5) ? 'Both counterparties' : 'Alice / counterparty'; s.debtor = model === 'stablecoin' ? 'Two token issuers' : 'Two issuing banks'; s.authority = 'Shared PvP rules'; s.finality = isFinal() ? 'Both legs final' : activeFailure() ? 'Neither leg final' : 'Both legs pending'; }
  if (scenario === 'cbdc') { s.aliceOrdinary = model === 'instruction' ? BASE : BASE - amount; s.aliceToken = at(5) ? 0 : amount; s.lucaToken = at(5) ? amount : 0; s.tokenSupply = amount; s.wcbdc = at(2) ? amount : 0; s.holder = at(5) ? 'Recipient' : model === 'stablecoin' ? 'Issuer claim' : 'Commercial-bank claim'; s.debtor = model === 'stablecoin' ? 'Stablecoin issuer; SNB for wCBDC' : 'Commercial banks; SNB for wCBDC'; s.authority = model === 'stablecoin' ? 'Issuer ledger + wCBDC settlement' : 'Deposit ledger + wCBDC settlement'; }
  if (scenario === 'bridge') { s.aliceOrdinary = model === 'instruction' ? BASE : BASE - amount; s.aliceToken = at(2) ? 0 : amount; s.tokenSupply = amount; s.locked = at(2) && !isFinal(); s.wrapped = at(3) && !isFinal(); s.holder = isFinal() ? 'Destination wallet' : s.locked ? 'Bridge escrow' : 'Alice'; s.debtor = 'Origin issuer / bridge rules'; s.authority = 'Two ledgers + bridge'; s.finality = isFinal() ? 'Redeemed' : activeFailure() ? 'Bridge paused' : 'Cross-ledger pending'; }
  if (scenario === 'mismatch') { s.aliceOrdinary = model === 'instruction' ? BASE : BASE - amount; s.aliceToken = amount; s.aliceMirror = amount; s.tokenSupply = at(2) && state.step < 6 ? amount + 10 : amount; s.holder = 'Alice · held'; s.debtor = model === 'stablecoin' ? 'Stablecoin issuer' : 'Bank A'; s.authority = model === 'stablecoin' ? at(3) && state.step < 6 ? 'Issuer records paused' : 'Issuer ledger + reserve records' : at(3) && state.step < 6 ? 'CBS / GL paused' : 'CBS / GL + DLT'; s.reconciliation = at(2) && state.step < 6 ? 'Mismatch' : 'Matched'; s.finality = state.step >= 6 ? 'Restored' : at(2) ? 'Blocked' : 'Pending'; }

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

function flowPoints() {
  const points = FLOW_POINTS[state.scenario];
  if (state.model !== 'stablecoin') return points;
  if (state.scenario === 'interbank') return [[145,110],[320,130],[405,230],[420,105],[420,105],[960,110],[960,110]];
  return points.map(([x, y]) => x === 618 && y === 182 ? [420,105] : [x, y]);
}

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
  const points = flowPoints();
  const from = points[state.step]; const to = points[state.step + 1];
  if (!to || (from[0] === to[0] && from[1] === to[1])) return '';
  return `<path class="route-active" d="${routePath(from, to)}"></path>`;
}

function fundPosition() { return flowPoints()[state.step]; }

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
  const usesSic = (state.scenario === 'interbank' && state.model !== 'stablecoin') || state.scenario === 'netting';
  const railFloor = usesSic ? '<rect x="0" y="440" width="1060" height="150" class="scene-floor"></rect>' : '';
  refs.stageBackground.innerHTML = `<rect width="1060" height="590" class="scene-bg"></rect><rect width="1060" height="440" class="scene-dot-field"></rect>${railFloor}`;
  refs.stageRoutes.innerHTML = routes();
  const authorityObject = state.model === 'stablecoin'
    ? issuerFacility(422, 70, s.tokenSupply, s.issuerReserve, at(3))
    : dlt(414, 82, s.tokenSupply, state.model === 'native' || at(3), state.model);
  refs.stageInfrastructure.innerHTML = `${usesSic ? settlementRail(s) : ''}${specialInfrastructure(s)}${authorityObject}`;
  const bankBDormant = ['mint','redeem','same','mismatch'].includes(state.scenario) || (state.model === 'stablecoin' && state.scenario === 'interbank');
  const lucaDormant = ['mint','redeem','netting','mismatch'].includes(state.scenario);
  const aliceDormant = state.scenario === 'netting';
  refs.stageActors.innerHTML = `${person(22, 155, 'Alice', money(visibleCustomerBalance(s.aliceOrdinary, s.aliceToken)), state.selectedActor === 'alice', 'left', aliceDormant)}${bank(220, 124, 'BANK A', money(s.bankASnb), state.selectedActor === 'banka', state.selectedActor === 'banka')}${bank(700, 124, 'BANK B', money(s.bankBSnb), s.holder.startsWith('Luca'), state.selectedActor === 'bankb', bankBDormant)}${person(912, 155, 'Luca', money(visibleCustomerBalance(s.lucaOrdinary, s.lucaToken)), state.selectedActor === 'luca', 'right', lucaDormant)}`;
  refs.stageFunds.innerHTML = fundMarkup();
  refs.stageAnnotations.innerHTML = annotation(s);
}

function actorData(s) {
  const directStablecoinTransfer = state.model === 'stablecoin' && state.scenario === 'interbank';
  const bankASummary = directStablecoinTransfer
    ? 'Bank A may provide Alice’s account or custody interface, but the stablecoin issuer—not Bank A—remains debtor for the transferred token.'
    : 'Bank A owes Alice under the original deposit relationship and initiates any interbank settlement leg.';
  const bankBSummary = directStablecoinTransfer
    ? 'Bank B may provide Luca’s wallet or custody interface, but receiving the stablecoin does not make Bank B the debtor.'
    : 'Bank B becomes Luca’s debtor only after the receiving side accepts and records the new claim.';
  const data = {
    alice: { title: 'Alice', summary: 'Alice is the initiating customer and the first holder of the claim.', rows: [['Visible balance', money(visibleCustomerBalance(s.aliceOrdinary, s.aliceToken))], ['Ordinary deposit', money(s.aliceOrdinary)], ['Token / instruction', s.aliceToken || s.tokenSupply ? money(s.aliceToken || s.tokenSupply) : 'None'], ['Current claim', s.holder.startsWith('Alice') ? 'Held by Alice' : 'Transferred / pending']] },
    luca: { title: 'Luca', summary: 'Luca is the receiving customer. His creditor relationship depends on acceptance and the product model.', rows: [['Visible balance', money(visibleCustomerBalance(s.lucaOrdinary, s.lucaToken))], ['Ordinary deposit', money(s.lucaOrdinary)], ['Token balance', s.lucaToken ? money(s.lucaToken) : 'None'], ['Status', s.holder.startsWith('Luca') ? 'Accepted holder' : 'Waiting']] },
    banka: { title: 'Bank A', summary: bankASummary, rows: [['Customer-liability role', directStablecoinTransfer ? 'Interface / custodian' : 'Original debtor'], ['SNB sight balance', money(s.bankASnb)], ['Authoritative record', directStablecoinTransfer ? 'Issuer ledger' : state.model === 'native' ? 'DLT + reporting sync' : 'CBS / GL'], ['State', activeFailure() ? 'Held / repairable' : at(4) ? 'Settlement processed' : 'Open']] },
    bankb: { title: 'Bank B', summary: bankBSummary, rows: [['Customer-liability role', directStablecoinTransfer ? 'Not token debtor' : s.holder.startsWith('Luca') ? 'New debtor' : 'Prospective debtor'], ['SNB sight balance', money(s.bankBSnb)], ['Acceptance', directStablecoinTransfer ? 'Issuer-ledger transfer' : at(5) ? 'Accepted' : 'Pending'], ['Customer claim', directStablecoinTransfer ? 'Claim on issuer' : s.lucaOrdinary + s.lucaToken ? money(s.lucaOrdinary + s.lucaToken) : 'None']] },
    cbsa: { title: 'Bank A · CBS / GL', summary: directStablecoinTransfer ? 'Bank A’s records may support custody or funding, but they are not the authoritative stablecoin-holder record.' : 'The core banking system maintains customer accounts; the GL records the bank’s financial position.', rows: [['Authority', directStablecoinTransfer ? 'Supporting record' : state.model === 'native' ? 'Reporting replica' : 'Authoritative'], ['Alice ordinary', money(s.aliceOrdinary)], ['Mirror subaccount', s.aliceMirror ? money(s.aliceMirror) : 'None'], ['Control', s.reconciliation]] },
    cbsb: { title: 'Bank B · CBS / GL', summary: directStablecoinTransfer ? 'Bank B may record custody or customer reporting, while the issuer ledger remains authoritative for the stablecoin.' : 'Bank B records Luca’s customer claim after its acceptance conditions are met.', rows: [['Authority', directStablecoinTransfer ? 'Supporting record' : state.model === 'native' ? 'Reporting replica' : 'Authoritative'], ['Luca ordinary', money(s.lucaOrdinary)], ['Mirror subaccount', s.lucaMirror ? money(s.lucaMirror) : 'None'], ['Acceptance', directStablecoinTransfer ? 'Not a new bank claim' : at(5) ? 'Accepted' : 'Pending']] },
    dlt: { title: 'DLT ledger', summary: state.model === 'native' ? 'The DLT is the authoritative holder record.' : 'The DLT is a controlled representation reconciled to banking records.', rows: [['Token supply', money(s.tokenSupply)], ['Authority', state.model === 'native' ? 'Master record' : 'Representation'], ['Access', 'Permissioned / allow-listed'], ['Reconciliation', s.reconciliation]] },
    issuer: { title: 'Stablecoin issuer', summary: 'The issuer—not the accepting bank—owes the stablecoin holder under the issuer terms.', rows: [['Token supply', money(s.tokenSupply)], ['Reserve / guarantee', money(s.issuerReserve)], ['Legal debtor', 'Issuer / guarantor'], ['Bank deposit protection', 'Not automatic']] },
    sic: { title: 'SIC / SNB rail', summary: 'This rail moves central-bank money between participating banks. Alice’s retail token does not enter the SNB.', rows: [['Settlement asset', 'SNB sight deposits'], ['Bank A balance', money(s.bankASnb)], ['Bank B balance', money(s.bankBSnb)], ['Finality', s.finality]] },
    bridge: { title: 'Cross-ledger bridge', summary: 'The bridge locks value on one ledger and authorizes a wrapped representation on another.', rows: [['Source state', s.locked ? 'Locked' : 'Available'], ['Wrapped state', s.wrapped ? money(AMOUNT) : 'None'], ['Additional dependency', 'Bridge keys / contract'], ['Finality', s.finality]] },
    pvp: { title: 'PvP mechanism', summary: 'Payment-versus-payment coordinates two currency legs so principal does not settle one-sided.', rows: [['CHF leg', money(AMOUNT)], ['EUR leg', money(AMOUNT, 'EUR')], ['Release rule', 'Both or neither'], ['Finality', s.finality]] },
    fx: { title: 'FX / correspondent', summary: 'Cross-border settlement adds conversion, correspondent balances and foreign payment-system rules.', rows: [['Illustrative rate', '1 CHF = 1 EUR'], ['Market data', 'No · illustrative'], ['Origin leg', 'CHF'], ['Destination leg', 'EUR']] },
    wcbdc: { title: 'Wholesale CBDC', summary: 'Wholesale CBDC is a central-bank liability used for institutional settlement—not a retail customer deposit.', rows: [['Issuer', 'Central bank'], ['Eligible holders', 'Participating institutions'], ['Customer claim', 'Still commercial-bank money'], ['Status', 'Conceptual comparison']] }
  };
  return data[state.selectedActor] || data.alice;
}

function renderDrawer(s) {
  const data = actorData(s);
  refs.drawerTitle.textContent = data.title;
  refs.drawerSummary.textContent = data.summary;
  refs.drawerDetails.innerHTML = data.rows.map(([key, value]) => `<div><dt>${esc(key)}</dt><dd>${esc(value)}</dd></div>`).join('');
}

function syncFailureOptions() {
  if (!failureApplicable(state.failure)) state.failure = 'none';
  Array.from(refs.failureSelect.options).forEach((option) => {
    const applicable = failureApplicable(option.value);
    option.disabled = !applicable;
    option.textContent = `${FAILURES[option.value].label}${applicable ? '' : ' · Not used in this flow'}`;
  });
  refs.failureSelect.value = state.failure;
  refs.riskNote.textContent = state.failure === 'none'
    ? 'Failure paths are simulated and deterministic. Unused risks are disabled for this flow.'
    : `${FAILURES[state.failure].label}: advance until the affected control stops the flow.`;
}

function renderStepExplanation() {
  const steps = currentSteps();
  const failure = activeFailure();
  refs.stepPosition.textContent = `CURRENT STEP · ${state.step + 1} / ${steps.length}`;
  refs.stepExplainerTitle.textContent = steps[state.step].toUpperCase();
  refs.stepContext.textContent = `${MODELS[state.model].label} · ${SCENARIOS[state.scenario].label}`;
  refs.stepExplanation.textContent = failure ? FLOW_STEP_ACTIONS[state.scenario][state.step] : STEP_EXPLANATIONS[state.scenario][state.step][state.model];
  refs.stepRisk.hidden = state.failure === 'none';
  if (state.failure === 'none') return;
  const armed = !failure;
  refs.stepRisk.classList.toggle('is-armed', armed);
  refs.stepRiskTitle.textContent = armed ? `⚠ Risk armed · ${FAILURES[state.failure].label} · ${steps[FAILURES[state.failure].trigger]}` : `⚠ ${FAILURES[state.failure].label}`;
  refs.stepRiskCopy.textContent = armed
    ? ''
    : FAILURE_COPY[state.failure][state.model];
}

function validateExplanationMatrix() {
  Object.entries(SCENARIOS).forEach(([scenario, config]) => {
    if (STEP_EXPLANATIONS[scenario]?.length !== config.steps.length) throw new Error(`Missing step explanations for ${scenario}`);
    STEP_EXPLANATIONS[scenario].forEach((entry, index) => Object.keys(MODELS).forEach((model) => {
      const copy = entry[model];
      if (!copy) throw new Error(`Missing explanation for ${scenario}/${index}/${model}`);
      if ((copy.match(/[.!?](?:\s|$)/g) || []).length > 3) throw new Error(`Explanation exceeds three sentences for ${scenario}/${index}/${model}`);
    }));
  });
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
  refs.scenarioDescription.textContent = state.model === 'stablecoin' && state.scenario === 'interbank'
    ? 'Transfer the issuer’s claim between wallets; SIC and a new Bank B deposit are not intrinsic to the movement.'
    : SCENARIOS[state.scenario].description;
}

function updateTimeline() {
  const steps = currentSteps();
  refs.timelineTrack.innerHTML = steps.map((_, index) => `<span class="timeline-step ${index < state.step ? 'is-complete' : ''} ${index === state.step ? 'is-current' : ''}"></span>`).join('');
  refs.stepLabel.textContent = steps[state.step]; refs.stepCount.textContent = `${state.step + 1} / ${steps.length}`;
}

function render() {
  syncFailureOptions();
  const s = snapshot();
  updateModelFacts(); updateFlowControls(); renderScene(s); renderDrawer(s); updateTimeline(); renderStepExplanation();
  refs.statusHolder.textContent = s.holder; refs.statusDebtor.textContent = s.debtor; refs.statusFinality.textContent = s.finality; refs.statusReconciliation.textContent = s.reconciliation;
  refs.statusFinality.classList.toggle('is-warning', s.finality === 'Blocked' || s.finality === 'Pending'); refs.statusReconciliation.classList.toggle('is-warning', s.reconciliation === 'Mismatch');
  refs.playButton.innerHTML = state.playing ? '<span aria-hidden="true">Ⅱ</span> Pause' : '<span aria-hidden="true">▶</span> Play';
  refs.stageStatus.textContent = activeFailure() ? FAILURES[state.failure].label : isFinal() ? 'Final state · illustrative' : 'Illustrative simulation';
  refs.stageSvg.setAttribute('aria-label', `${MODELS[state.model].label}; ${SCENARIOS[state.scenario].label}; ${currentSteps()[state.step]}. Claim: ${s.holder}. Debtor: ${s.debtor}.`);
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
  refs.applyFailureButton.addEventListener('click', () => { stop(); state.failure = failureApplicable(refs.failureSelect.value) ? refs.failureSelect.value : 'none'; state.step = 0; render(); });
  refs.stageSvg.addEventListener('click', (event) => { const actor = event.target.closest('[data-actor]'); if (actor) { state.selectedActor = actor.dataset.actor; render(); } });
  refs.stageSvg.addEventListener('keydown', (event) => { if ((event.key === 'Enter' || event.key === ' ') && event.target.closest('[data-actor]')) { event.preventDefault(); state.selectedActor = event.target.closest('[data-actor]').dataset.actor; render(); } });
  window.addEventListener('keydown', (event) => { if (event.target.matches('input,select,button,summary')) return; if (event.code === 'Space') { event.preventDefault(); play(); } if (event.code === 'ArrowRight') { event.preventDefault(); stop(); advance(); } if (event.key.toLowerCase() === 'r') reset(); });
}

function init() {
  ['stage-background','stage-routes','stage-infrastructure','stage-actors','stage-funds','stage-annotations','stage-svg','scenario-select','scenario-kicker','scenario-description','stage-status','speed-select','step-button','play-button','reset-button','timeline-track','step-label','step-count','step-position','step-explainer-title','step-context','step-explanation','step-risk','step-risk-title','step-risk-copy','status-holder','status-debtor','status-finality','status-reconciliation','fact-claim','fact-authority','fact-mechanism','fact-risk','drawer-title','drawer-summary','drawer-details','insight-debtor','insight-ledger','insight-failure','failure-select','apply-failure-button','risk-note'].forEach((id) => { refs[id.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = $(id); });
  validateExplanationMatrix();
  bind(); render();
}

document.addEventListener('DOMContentLoaded', init);
