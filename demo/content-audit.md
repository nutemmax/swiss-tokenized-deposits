# Interactive demo content and visual audit

**Reviewed:** 27 August 2026  
**Artifact:** `demo/index.html`  
**Factual baseline:** `demo/deprecated/v1/app.js`, `demo/deprecated/v1/demo-spec.json`, and `tests/demo-snapshot.test.js`

## Result

- Normal scenario states reviewed: **300** explanations across **75** steps and **44** model/scenario combinations.
- Applicable failure states reviewed: **169** model/scenario/failure combinations.
- Copy result: **Pass** — every step names the actor, action, affected object and resulting state in one or two sentences.
- Structural scene result: **Pass** — every step references visible scene actors and every applicable failure resolves to a visible affected component.
- Navigation result: **Pass by source and automated checks** — one Change flow control, one run-mode selector, one step navigator, and one set of playback controls.
- Landing journey: **Pass** — topic introduction precedes a two-step architecture and scenario choice; no recommended scenario opens automatically.
- Playback control position: **Pass** — Previous, Play/Pause and Next/Restart occupy fixed stage-header slots independent of changing labels or explanation length.
- Report navigation: **Pass** — the workspace provides a return to the landing report, restores the selected architecture and scenario library, and stops active playback.
- Failure context: **Pass** — every selectable failure provides a two-sentence header explanation naming its general effect, scenario-specific component and trigger stage; triggered-step copy remains model-specific.
- Rendered-browser review: **Pending stakeholder refresh** because automated control of local `file://` pages is unavailable in this environment.

## Manual explanation review

The review checked each resolved model explanation for:

1. a specific actor;
2. a concrete action;
3. the money, claim, record, instruction or condition affected;
4. the state produced by the step;
5. a clear distinction from the preceding and following step;
6. no generic model paragraph appended to every step;
7. no more than two sentences;
8. neutral language suitable for guided presentation.

## Landing report source map

| Landing theme | Research basis |
|---|---|
| Deposit claim before technology | `docs/00-executive-summary.md`; `docs/01-tokenized-bank-deposits-foundations-and-product-types.md` |
| Swiss baseline and non-token alternative | `docs/02-retail-and-wholesale-tokenized-deposit-use-cases.md` |
| Claim, authority, settlement and finality | `docs/03-swiss-laws-and-finma-rules-for-tokenized-deposits.md`; `docs/06-tokenized-deposit-issuance-transfers-redemption-and-settlement.md` |
| Reconciliation, privacy and recovery | `docs/05-tokenized-deposit-system-architecture-and-ledger-records.md`; `docs/07-tokenized-deposit-risks-controls-and-operational-resilience.md` |
| First-pilot posture and adoption gates | `docs/09-tokenized-deposit-implementation-roadmap-and-vendor-assessment.md` |

| Scenario | Payment instruction | Mirrored deposit | Native on-chain | Non-bank stablecoin |
|---|---:|---:|---:|---:|
| Convert / mint | 7/7 copy · scene mapped | 7/7 copy · scene mapped | 7/7 copy · scene mapped | 7/7 copy · scene mapped |
| Redeem / burn | 7/7 copy · scene mapped | 7/7 copy · scene mapped | 7/7 copy · scene mapped | 7/7 copy · scene mapped |
| Same-bank transfer | 7/7 copy · scene mapped | 7/7 copy · scene mapped | 7/7 copy · scene mapped | 7/7 copy · scene mapped |
| Swiss interbank | 7/7 copy · scene mapped | 7/7 copy · scene mapped | 7/7 copy · scene mapped | 7/7 copy · scene mapped |
| Conditional payment | 7/7 copy · scene mapped | 7/7 copy · scene mapped | 7/7 copy · scene mapped | 7/7 copy · scene mapped |
| Gross versus net | 7/7 copy · scene mapped | 7/7 copy · scene mapped | 7/7 copy · scene mapped | 7/7 copy · scene mapped |
| Agorá five-stage payment | 5/5 copy · scene mapped | 5/5 copy · scene mapped | 5/5 copy · scene mapped | 5/5 copy · scene mapped |
| Cross-border PvP | 7/7 copy · scene mapped | 7/7 copy · scene mapped | 7/7 copy · scene mapped | 7/7 copy · scene mapped |
| Wholesale CBDC | 7/7 copy · scene mapped | 7/7 copy · scene mapped | 7/7 copy · scene mapped | 7/7 copy · scene mapped |
| Bridge / wrapped token | 7/7 copy · scene mapped | 7/7 copy · scene mapped | 7/7 copy · scene mapped | 7/7 copy · scene mapped |
| Mismatch + recovery | 7/7 copy · scene mapped | 7/7 copy · scene mapped | 7/7 copy · scene mapped | 7/7 copy · scene mapped |

## Failure coverage

Each cell lists the failure explanations and visual targets reviewed for that model/scenario combination.

| Scenario | Payment instruction | Mirrored deposit | Native on-chain | Non-bank stablecoin |
|---|---|---|---|---|
| Convert / mint | AML, DLT, Reconciliation, Key/contract | AML, DLT, Reconciliation, Key/contract | AML, DLT, Reconciliation, Key/contract | AML, DLT, Reconciliation, Key/contract |
| Redeem / burn | AML, DLT, Reconciliation, Key/contract | AML, DLT, Reconciliation, Key/contract | AML, DLT, Reconciliation, Key/contract | AML, DLT, Reconciliation, Key/contract |
| Same-bank transfer | AML, DLT, Reconciliation, Key/contract | AML, DLT, Reconciliation, Key/contract | AML, DLT, Reconciliation, Key/contract | AML, DLT, Reconciliation, Key/contract |
| Swiss interbank | AML, DLT, SIC, Receiver, Reconciliation, Key/contract | AML, DLT, SIC, Receiver, Reconciliation, Key/contract | AML, DLT, SIC, Receiver, Reconciliation, Key/contract | AML, DLT, Reconciliation, Key/contract |
| Conditional payment | AML, DLT, Reconciliation, Key/contract | AML, DLT, Reconciliation, Key/contract | AML, DLT, Reconciliation, Key/contract | AML, DLT, Reconciliation, Key/contract |
| Gross versus net | SIC | SIC | SIC | None |
| Agorá five-stage payment | AML, DLT, Receiver, Reconciliation, Key/contract | AML, DLT, Receiver, Reconciliation, Key/contract | AML, DLT, Receiver, Reconciliation, Key/contract | AML, DLT, Receiver, Reconciliation, Key/contract |
| Cross-border PvP | AML, DLT, Reconciliation, Key/contract | AML, DLT, Reconciliation, Key/contract | AML, DLT, Reconciliation, Key/contract | AML, DLT, Reconciliation, Key/contract |
| Wholesale CBDC | DLT, Receiver, Reconciliation, Key/contract | DLT, Receiver, Reconciliation, Key/contract | DLT, Receiver, Reconciliation, Key/contract | DLT, Receiver, Reconciliation, Key/contract |
| Bridge / wrapped token | AML, DLT, Reconciliation, Key/contract | AML, DLT, Reconciliation, Key/contract | AML, DLT, Reconciliation, Key/contract | AML, DLT, Reconciliation, Key/contract |
| Mismatch + recovery | DLT, Reconciliation, Key/contract | DLT, Reconciliation, Key/contract | DLT, Reconciliation, Key/contract | DLT, Reconciliation, Key/contract |

## Scenario topology review

| Scenario | Visible path |
|---|---|
| Convert / mint | Alice → Bank / issuer → Authorized ledger → Alice’s wallet |
| Redeem / burn | Alice’s wallet → Bank / issuer → Authorized ledger → Account / payout |
| Same-bank transfer | Alice → Bank A / issuer → Internal record → Luca |
| Swiss interbank | Alice → Bank A → SIC / SNB → Bank B → Luca |
| Conditional payment | Alice → Bank / issuer → Condition → Luca |
| Gross versus net | Bank A → Payment queue → Netting cycle → SIC / settlement → Bank B |
| Agorá five-stage payment | Payee → Route → Validation → Lock and delegate → Settlement |
| Cross-border PvP | CHF party → CHF institution → PvP coordinator → EUR institution → EUR party |
| Wholesale CBDC | Alice’s claim → Bank A → Wholesale CBDC → Bank B → Luca’s claim |
| Bridge / wrapped token | Source wallet → Source ledger → Bridge → Destination ledger → Destination wallet |
| Mismatch + recovery | Operations → Bank record → Reconciliation → Ledger record |

## Automated acceptance checks

- Exactly 4 models, 11 scenarios, 75 steps, 300 resolved normal explanations and 169 applicable failure combinations.
- Five Agorá stages; seven steps for every other scenario.
- Required step fields and model explanations are non-empty.
- Scene focus and movement directives reference nodes present in the selected scenario.
- Every applicable failure has model-specific copy and a visible scene target.
- Adjacent explanations within a scenario are distinct.
- Each explanation contains no more than two sentences.
- Superseded Change model, Change scenario, Reset and separate failure controls are absent.
- Scenario details remain visible without a disclosure interaction.
- Every scenario introduction identifies the participating actors, the action being examined and the operational context in at least 25 words.
