# Tokenized-deposit simulator content and visual audit

**Audit started:** 7 September 2026  
**Final review:** 11 September 2026  
**Artifact:** [`demo/index.html`](../../../demo/index.html)  
**Decision log:** [`.audit/demo-scenario-audit-2026-09-07.tsv`](../../../.audit/demo-scenario-audit-2026-09-07.tsv)  
**Supersedes:** [`demo-scenario-content-and-visual-audit-2026-09-03.md`](demo-scenario-content-and-visual-audit-2026-09-03.md)

## 1. Executive conclusion

The refactored simulator now passes both the exhaustive semantic gate and the rendered-browser verification defined for this audit. The audit covered all 44 model × scenario combinations, all 300 resolved model × scenario × step narratives, all 173 applicable model × scenario × failure combinations, and 1,471 directly reachable normal or failure-selected step states.

Fourteen issue groups were accepted: nine high severity and five medium severity. No critical or low-severity findings remain. The main corrections separate payment instructions from money, stablecoin issuer claims from bank deposits and SIC, wholesale CBDC from customer assets, and Agorá’s platform-authoritative tested architecture from adaptations. Failure handling now uses exact scenario rules rather than generic trigger and target fallbacks. Mismatch recovery follows the authoritative record for each model, including visibly reversed repair arrows for native-ledger and stablecoin cases.

One missing behavior was added: an expired or failed condition now stops each conditional-payment variant at the verification step and exposes the release, extension, or dispute outcomes. Other candidate scenarios are explicitly deferred where the repository supports a production control requirement but not a sufficiently specific, educational transaction flow.

This remains an explanatory simulator. A “Verified” verdict means the teaching statement agrees with the cited evidence at the stated level. It does not mean that the design is approved, deployed, production-ready, legally final, or appropriate for a particular bank.

## 2. Exact audited counts

The counts come from the active simulator data through `auditInventory`; they are not copied from an earlier report.

| Measure | Count | Derivation |
|---|---:|---|
| Money models | 4 | Active `models` keys |
| Scenarios | 11 | Active `scenarios` keys |
| Model × scenario combinations | 44 | 4 × 11 |
| Base scenario steps | 75 | Ten seven-step scenarios plus one five-step Agorá scenario |
| Resolved model × scenario × step descriptions | 300 | 4 × 75 |
| Failure modes | 7 | Active `failures` keys |
| Applicable model × scenario × failure combinations | 173 | Explicit `failureRules`, filtered by model applicability |
| Normal directly addressable step states | 300 | Every resolved model × scenario × step |
| Failure-selected directly addressable step states | 1,171 | Each applicable failure multiplied by the step count of its scenario |
| Total directly reachable simulator states | 1,471 | 300 + 1,171 |

The total treats a selected failure mode at every directly navigable step as a reachable state, including armed states before its trigger and blocked states at or after its trigger.

## 3. Audit method

1. Read the repository instructions, active research chapters, local source library, historical audits, claim map, and archived presenter script.
2. Inspected the clean baseline, current diff, refactored `demo/index.html`, and both active tests before editing.
3. Mapped the active domain data: models, scenarios, variants, steps, explanations, scene layouts, visual roles, movements, failure rules, authority consequences, and runtime state selection.
4. Compared each resolved combination to the evidence hierarchy in section 4.
5. Classified each combination as verified, corrected, comparison, boundary test, inapplicable, added, or open.
6. Replaced generic failure inference with explicit scenario rules and a machine-readable inventory.
7. Added semantic assertions for high-risk claims and exhaustive structural resolution without using field presence or word count as a proxy for correctness.
8. Exercised all 300 normal states in the rendered browser and manually reviewed the high-risk flows and every distinct failure type at its trigger.
9. Reviewed desktop and 390 × 844 layouts, keyboard focus, accessible names, node labels, movement direction, clipping, overflow, failure-marker visibility, and browser console output.
10. Ran final diff, documentation, and adversarial reviews before closure.

## 4. Source hierarchy

The audit applied this order:

1. primary legislation, ordinances, official system rules, and binding participant rules;
2. SNB, FINMA, BIS, SIX, and official infrastructure publications;
3. official Project Agorá and Swiss Bankers Association reports;
4. the repository’s cited analysis;
5. explicitly labelled architectural comparisons, conceptual flows, and assumptions.

The simulator labels proof-of-concept, pilot, sandbox, and controlled-test evidence at the supported maturity. It does not convert those labels into production evidence.

### Evidence register

| ID | Source | Page or section | Evidence class | Claim supported |
|---|---|---|---|---|
| E01 | [`docs/01-tokenized-bank-deposits-foundations-and-product-types.md`](../../01-tokenized-bank-deposits-foundations-and-product-types.md) | §§2, 4 and 8 | Repository synthesis grounded in cited primary sources | Debtor, claim, holder and record-of-authority boundaries for the four models |
| E02 | [SBA Deposit Token PoC results](../../sources/sba/deposit-token-poc-results-2025.pdf) and [canonical publication](https://www.swissbanking.ch/_Resources/Persistent/7/9/e/a/79ea024daa9834c99fc299db5d5f69c4317525a2/20250916_Ergebnisbericht%20PoC%20Deposit%20Token_EN_FINAL.pdf) | pp. 3, 5 and 32–35 | Industry proof of concept | The demonstrated on-chain object was a payment instruction; deposits and account movements remained off-chain |
| E03 | [`docs/05-tokenized-deposit-system-architecture-and-ledger-records.md`](../../05-tokenized-deposit-system-architecture-and-ledger-records.md) | §§2, 8 and 9 | Repository architecture synthesis | The authoritative record controls correction; supporting records must not silently replace it |
| E04 | [`docs/06-tokenized-deposit-issuance-transfers-redemption-and-settlement.md`](../../06-tokenized-deposit-issuance-transfers-redemption-and-settlement.md) | §§1–9 | Repository synthesis grounded in system and institutional sources | Issuance, redemption, same-bank, interbank, netting, PvP, finality and idempotent recovery semantics |
| E05 | [SNB SIC System and Disclosure Report](../../sources/snb/sic-system-disclosure-2026.html) and [canonical publication](https://www.snb.ch/en/publications/sicsystem-disclosure/sicsystem-disclosure-all/sicsystem_disclosure_2025) | Payment and settlement descriptions | Official production-system disclosure | SIC settles eligible institutional obligations in central-bank money; it is not a generic label for any transfer |
| E06 | [SIX Instant Payments](https://www.six-group.com/en/products-services/banking-services/billing-and-payments/instant-payments.html) | Service description | Official infrastructure publication | Existing Swiss domestic account-to-account baseline |
| E07 | [`docs/07-tokenized-deposit-risks-controls-and-operational-resilience.md`](../../07-tokenized-deposit-risks-controls-and-operational-resilience.md) | §§2, 5 and 7–10 | Repository control synthesis grounded in FINMA material | Exact failure state, retry prohibition, evidence, ownership, containment and recovery requirements |
| E08 | [FINMA Guidance 06/2024 on stablecoins](https://www.finma.ch/en/news/2024/07/20240726-m-am-06-24-stablecoins/) | Stablecoin issuer, guarantee, AML and sanctions discussion | Official supervisory guidance | A stablecoin can be a separate issuer claim with distinct backing, guarantee and redemption arrangements |
| E09 | [Project Agorá report](../../sources/bis/project-agora-2026.pdf) and [canonical report](https://www.bis.org/publ/othp110.pdf) | p. 15 | Official BIS proof-of-concept report | Platform balances and transactions are the authoritative or “golden source” record in the tested design |
| E10 | Project Agorá report | pp. 21–25 | Official BIS proof-of-concept report | Confirmation of payee, path discovery, participant validation, locking/delegation and settlement |
| E11 | Project Agorá report | p. 15 and scope limitations | Official BIS proof-of-concept report | FX integration, production-grade scale, latency, cyber controls and liquidity optimisation were outside prototype scope |
| E12 | Project Agorá report | pp. 70–71 | Official BIS proof-of-concept report and legal analysis | An atomic technical trigger can coexist with asynchronous ledger updates; legal finality depends on applicable rules |
| E13 | Project Agorá report | pp. 90–91 | Official BIS proof-of-concept report | Performance, resilience, governance and production work remained future requirements |
| E14 | [Current Project Agorá page](https://www.bis.org/about/bisih/topics/fmis/agora.htm) | Status update, 30 July 2026 | Official BIS controlled-test update | Controlled real-value testing is later evidence but still not production deployment |
| E15 | [SNB Project Helvetia](https://www.snb.ch/en/the-snb/mandates-goals/payment-transactions/projekt_helvetia) | Current project description | Official central-bank pilot publication | wCBDC is institutional central-bank money; integrated and RTGS-link approaches are distinct; the pilot is not a permanent issuance commitment |
| E16 | [`docs/02-retail-and-wholesale-tokenized-deposit-use-cases.md`](../../02-retail-and-wholesale-tokenized-deposit-use-cases.md) | Worked conditional-payment journey, §§2 and 6 | Repository scenario synthesis | A failed or expired condition releases the reservation rather than authorising payment |
| E17 | [`docs/03-swiss-laws-and-finma-rules-for-tokenized-deposits.md`](../../03-swiss-laws-and-finma-rules-for-tokenized-deposits.md) | §§3–8 | Repository legal analysis linked to current official sources | Product-specific legal effect, finality, depositor protection and recovery remain bank decisions requiring applicable rules and advice |
| E18 | [`docs/04-tokenized-deposit-accounting-prudential-treatment-and-customer-protection.md`](../../04-tokenized-deposit-accounting-prudential-treatment-and-customer-protection.md) | §§2–5 and 8–10 | Repository accounting and protection analysis | Recognition points, reconciliations and customer outcomes must remain distinct from technical events |
| E19 | [`docs/08-project-agora-and-cross-border-tokenized-deposits.md`](../../08-project-agora-and-cross-border-tokenized-deposits.md) | §§2–10 and 12 | Repository synthesis of E09–E15 | Agorá authority, privacy, maturity, atomicity/finality and Swiss settlement comparisons |
| E20 | [`docs/10-tokenized-deposit-sources-and-regulatory-watch.md`](../../10-tokenized-deposit-sources-and-regulatory-watch.md) | §§1–4 | Repository provenance register | Source status, maturity, canonical URLs and unresolved decision boundaries |

## 5. Complete model definitions

| Model | Debtor and holder | Claim | Authoritative record | Supporting records | Settlement mechanism | Classification |
|---|---|---|---|---|---|---|
| Payment instruction | The bank owes the ordinary deposit to its account customer | Ordinary bank deposit; the digital object is only a request | Core-account record | Instruction status, reservation, payment message and audit evidence | Accepted bank posting and any separately applicable institutional rail | Verified boundary, supported by E01–E02 |
| CBS-authoritative mirrored deposit | The commercial bank owes the deposit to the customer in its liability record | Bank deposit with synchronized DLT representation | CBS liability record | DLT mirror, customer subledger, GL control and accepted events | Deterministically coordinated CBS/DLT events plus any institutional rail | Architectural model, supported by E01, E03–E04 |
| Native or platform-authoritative deposit | The commercial bank remains debtor; the customer recorded on DLT is holder | On-chain commercial-bank deposit claim | DLT/platform holder record | Bank accounting, reporting, control and recovery records | Authoritative platform event plus any separate institutional leg | Architectural model; closest Agorá tested architecture, E01, E03, E09 |
| Non-bank stablecoin | The separate issuer owes the holder recorded on its ledger | Claim on that issuer, not automatically on a bank | Issuer ledger or token contract | Reserve, guarantee, redemption, entitlement and accounting records | Issuer-ledger transfer or redemption; bank/wCBDC funding is separate | Comparator, supported by E01 and E08 |

## 6. Complete scenario inventory

| ID | Visible base family | Category | Steps | Direct normal states | Failure combinations | Failure-selected states | Evidence treatment |
|---|---|---:|---:|---:|---:|---:|---|
| `mint` | Convert / mint | Lifecycle | 7 | 28 | 16 | 112 | Verified lifecycle; instruction variant is a boundary-safe creation flow |
| `redeem` | Redeem / burn | Lifecycle | 7 | 28 | 16 | 112 | Verified lifecycle; instruction variant cancels or consumes a request |
| `same` | Same-bank transfer | Domestic | 7 | 28 | 16 | 112 | Verified same-debtor teaching flow |
| `interbank` | Swiss interbank | Domestic | 7 | 28 | 22 | 154 | Verified bank flow; stablecoin variant is a same-issuer comparison |
| `conditional` | Conditional payment | Domestic | 7 | 28 | 20 | 140 | Verified conceptual flow; failed/expired condition added |
| `netting` | Gross versus net | Domestic | 7 | 28 | 3 | 21 | Verified settlement distinction; stablecoin version is issuer-scheme comparison |
| `correspondent` | Agorá five-stage payment | Cross-border | 5 | 20 | 20 | 100 | Native is closest tested architecture; three variants are labelled comparisons/adaptation |
| `pvp` | Cross-border PvP | Cross-border | 7 | 28 | 16 | 112 | Conceptual comparison; technical coordination is not a universal legal-finality claim |
| `cbdc` | Wholesale CBDC | Infrastructure & controls | 7 | 28 | 16 | 112 | Settlement-infrastructure comparison; stablecoin claim remains separate |
| `bridge` | Bridge / wrapped token | Infrastructure & controls | 7 | 28 | 16 | 112 | Conceptual comparison; instruction version is a boundary test |
| `mismatch` | Mismatch + recovery | Infrastructure & controls | 7 | 28 | 12 | 84 | Authority-specific control and recovery scenario |
| **Total** |  |  | **75** | **300** | **173** | **1,171** |  |

## 7. Model × scenario verdict matrix

| Scenario | Payment instruction | Mirrored deposit | Native/platform-authoritative deposit | Non-bank stablecoin |
|---|---|---|---|---|
| Convert / mint | **Corrected:** Create payment instruction | **Verified** | **Verified** | **Verified** |
| Redeem / burn | **Corrected:** Cancel or complete instruction | **Verified** | **Verified** | **Verified** |
| Same-bank transfer | **Verified** | **Verified** | **Verified** | **Verified conceptual same-issuer flow** |
| Swiss interbank | **Verified** | **Verified** | **Verified with explicit scheme choice** | **Reframed as comparison:** same-issuer transfer, no SIC |
| Conditional payment | **Corrected:** expired/failed branch added | **Corrected:** expired/failed branch added | **Corrected:** expired/failed branch added | **Corrected:** expired/failed branch added |
| Gross versus net | **Corrected:** queue direction | **Corrected:** queue direction | **Corrected:** queue direction | **Reframed as comparison:** issuer scheme, no SIC |
| Agorá five-stage | **Reframed as workflow comparison** | **Reframed as architectural adaptation** | **Corrected:** closest tested architecture | **Reframed as product-boundary comparison** |
| Cross-border PvP | **Verified conceptual comparison** | **Verified conceptual comparison** | **Verified conceptual comparison** | **Verified conceptual comparison** |
| Wholesale CBDC | **Verified settlement comparison** | **Verified settlement comparison** | **Verified settlement comparison** | **Corrected conceptual comparison:** issuer claim separated from wCBDC |
| Bridge / wrapped token | **Reframed as boundary test** | **Verified conceptual comparison** | **Verified conceptual comparison** | **Verified conceptual comparison** |
| Mismatch + recovery | **Corrected:** core account controls | **Corrected:** CBS repairs mirror | **Corrected:** DLT repairs support copy | **Corrected:** issuer ledger repairs backing records |

No model × scenario pair was removed. Combinations without direct institutional support remain only where they have legitimate comparative value and are visibly labelled as a comparison, conceptual teaching flow, adaptation, or boundary test.

## 8. Failure-coverage matrix

Cell values are the number of applicable model combinations. “3” means payment instruction, mirrored deposit and native deposit; stablecoin is excluded.

| Scenario | AML | DLT/platform | SIC | Receiver | Reconciliation | Key/contract | Condition | Total |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Convert / mint | 4 | 4 | 0 | 0 | 4 | 4 | 0 | 16 |
| Redeem / burn | 4 | 4 | 0 | 0 | 4 | 4 | 0 | 16 |
| Same-bank transfer | 4 | 4 | 0 | 0 | 4 | 4 | 0 | 16 |
| Swiss interbank | 4 | 4 | 3 | 3 | 4 | 4 | 0 | 22 |
| Conditional payment | 4 | 4 | 0 | 0 | 4 | 4 | 4 | 20 |
| Gross versus net | 0 | 0 | 3 | 0 | 0 | 0 | 0 | 3 |
| Agorá five-stage | 4 | 4 | 0 | 4 | 4 | 4 | 0 | 20 |
| Cross-border PvP | 4 | 4 | 0 | 0 | 4 | 4 | 0 | 16 |
| Wholesale CBDC | 0 | 4 | 0 | 4 | 4 | 4 | 0 | 16 |
| Bridge / wrapped token | 4 | 4 | 0 | 0 | 4 | 4 | 0 | 16 |
| Mismatch + recovery | 0 | 4 | 0 | 0 | 4 | 4 | 0 | 12 |
| **Total** | **32** | **40** | **6** | **11** | **40** | **40** | **4** | **173** |

Each applicable failure resolves: exact trigger, exact target, pre-failure state, records already changed, authoritative last-valid state, prohibited retry, recovery evidence, owner, and possible outcomes. The visible blocked explanation combines a scenario-specific failure sentence with a model-specific authority sentence.

## 9. Exact failure trigger and target table

Step numbers below are the one-based numbers shown to users. All rows apply to all four models unless the Models column narrows them.

| Scenario | Failure | Trigger step | Exact target | Models |
|---|---|---:|---|---|
| Convert / mint | AML / sanctions | 2 — Checked | Bank or issuer | All |
| Convert / mint | DLT / platform unavailable | 4 — Instruction recorded / Digital object created | Authorized ledger | Instruction / other models |
| Convert / mint | Reconciliation mismatch | 5 — Records aligned | Authorized ledger | All |
| Convert / mint | Key / contract pause | 4 — Instruction recorded / Digital object created | Authorized ledger | Instruction / other models |
| Redeem / burn | AML / sanctions | 2 — Checked | Bank or issuer | All |
| Redeem / burn | DLT / platform unavailable | 4 — Instruction resolved / Representation removed | Authorized ledger | Instruction / other models |
| Redeem / burn | Reconciliation mismatch | 5 — Evidence matched | Authorized ledger | All |
| Redeem / burn | Key / contract pause | 4 — Instruction resolved / Representation removed | Authorized ledger | Instruction / other models |
| Same-bank transfer | AML / sanctions | 2 — Checked | Bank or issuer | All |
| Same-bank transfer | DLT / platform unavailable | 4 — Holder changed | Internal/authoritative record | All |
| Same-bank transfer | Reconciliation mismatch | 5 — Internal records posted | Internal/authoritative record | All |
| Same-bank transfer | Key / contract pause | 4 — Holder changed | Internal/authoritative record | All |
| Swiss interbank | AML / sanctions | 2 — Bank A checks / Issuer checks | Bank A or stablecoin issuer | Bank models / stablecoin |
| Swiss interbank | DLT / platform unavailable | 4 — Sending record prepared / Transfer prepared | Bank A; issuer ledger for stablecoin | Bank models / stablecoin |
| Swiss interbank | SIC unavailable | 5 — Institutional settlement | SIC / SNB | Instruction, mirrored, native |
| Swiss interbank | Receiving institution rejects | 6 — Receiving acceptance | Bank B | Instruction, mirrored, native |
| Swiss interbank | Reconciliation mismatch | 7 — Complete | Settlement evidence or issuer ledger | All |
| Swiss interbank | Key / contract pause | 4 — Sending record prepared / Transfer prepared | Bank A; issuer ledger for stablecoin | Bank models / stablecoin |
| Conditional payment | AML / sanctions | 2 — Checks completed | Bank or issuer | All |
| Conditional payment | Condition expires or fails | 5 — Condition verified | Condition | All |
| Conditional payment | DLT / platform unavailable | 6 — Payment released | Condition workflow | All |
| Conditional payment | Reconciliation mismatch | 7 — Complete | Condition workflow | All |
| Conditional payment | Key / contract pause | 6 — Payment released | Condition workflow | All |
| Gross versus net | SIC unavailable | 5 — Net amount settled | SIC / settlement | Instruction, mirrored, native |
| Agorá five-stage | Receiving institution rejects | 1 — Confirm payee | Receiving institution’s confirmation of Luca | All |
| Agorá five-stage | AML / sanctions | 3 — Validate | Validation | All |
| Agorá five-stage | DLT / platform unavailable | 4 — Lock and delegate | Lock/delegation component | All |
| Agorá five-stage | Key / contract pause | 4 — Lock and delegate | Lock/delegation component | All |
| Agorá five-stage | Reconciliation mismatch | 5 — Settle | Coordinated settlement | All |
| Cross-border PvP | AML / sanctions | 2 — Parties checked | Participating institution | All |
| Cross-border PvP | DLT / platform unavailable | 5 — Both legs settle | PvP coordinator | All |
| Cross-border PvP | Key / contract pause | 5 — Both legs settle | PvP coordinator | All |
| Cross-border PvP | Reconciliation mismatch | 7 — Complete | PvP coordinator | All |
| Wholesale CBDC | DLT / platform unavailable | 4 — Institutional leg settled | wCBDC rail | All |
| Wholesale CBDC | Reconciliation mismatch | 5 — Records reconciled | wCBDC rail | All |
| Wholesale CBDC | Receiving institution rejects | 6 — Customer leg posted | Bank B; issuer/receiving service for stablecoin | All |
| Wholesale CBDC | Key / contract pause | 4 — Institutional leg settled | wCBDC rail | All |
| Bridge / wrapped token | AML / sanctions | 2 — Source checked | Bridge | All |
| Bridge / wrapped token | DLT / platform unavailable | 5 — Wrapped reference created / Representation created | Destination ledger | Instruction / other models |
| Bridge / wrapped token | Reconciliation mismatch | 7 — Complete | Bridge | All |
| Bridge / wrapped token | Key / contract pause | 5 — Wrapped reference created / Representation created | Destination ledger | Instruction / other models |
| Mismatch + recovery | Reconciliation mismatch | 3 — Mismatch detected | Reconciliation control | All |
| Mismatch + recovery | DLT / platform unavailable | 6 — Records repaired | Model-specific ledger record | All |
| Mismatch + recovery | Key / contract pause | 6 — Records repaired | Model-specific ledger record | All |

## 10. Missing-scenario assessment

| Candidate | Decision | Reason and evidence |
|---|---|---|
| Expired or failed condition | **Missing and added** | E16 describes expiry returning reserved funds. It is a distinct branch at condition verification and applies to all four models. |
| Refund or reversal | **Explicitly deferred** | Refunds depend on whether the original leg was merely reserved, posted, or legally final. Current failure outcomes name release, return, or repair without pretending one universal reversal flow. E04 and E17 require product rules first. |
| Duplicate request / idempotent replay | **Explicitly deferred as a standalone scenario** | E04 requires unique identifiers and no blind retry. The instruction flow and every failure policy encode the constraint; a visible scenario needs a concrete message and settlement protocol. |
| Uncertain timeout outcome | **Covered as failure-state semantics; standalone flow deferred** | DLT and SIC failures prohibit resubmission until outcome evidence is proven. A new scenario would duplicate those states without a selected scheme. |
| Partial or one-sided cross-border settlement | **Covered by PvP reconciliation containment; standalone flow deferred** | The simulator states that one or both technical updates may exist and blocks completion. Legal remediation remains corridor-specific under E12 and E17. |
| Liquidity shortfall | **Open scenario candidate** | Material under E04 and E07, but the current simulator has no approved liquidity source, queue discipline, cut-off or unwind rule. Adding one now would invent operations. |
| Insolvency or issuer failure | **Explicitly deferred** | This is a resolution and customer-protection process, not a single transaction exception. E08, E17 and E18 require issuer-specific legal and protection analysis. |
| Bridge proof failure | **Covered** | Destination-ledger unavailability and reconciliation mismatch cover missing/invalid proof, lock containment and non-blind recovery. |
| Wallet or key recovery | **Open scenario candidate** | Key/contract pause covers transaction authority, but device or entitlement recovery needs a custody model and identity procedure not selected by the demo. |
| Privacy or data-sharing failure | **Explicitly deferred** | Agorá validation describes private endorsements, but a failure flow needs exact data fields, roles and jurisdiction. Generic “privacy failed” wording would be misleading. |
| Participant exit or contract upgrade | **Partly covered; standalone flow deferred** | Contract pause prohibits bypass and requires governance evidence. Exit/upgrade requires selected portability, migration and rulebook terms. |
| Authority-specific reconciliation repair | **Already present and corrected** | Mismatch layouts and repair arrows now change with the selected authoritative record under E03. |

## 11. Visual and icon findings

| Area | Original ambiguity | Implemented correction | Rendered result |
|---|---|---|---|
| Operations | Scan-like visual suggested biometric screening | Workflow plus controlled-refresh visual | Investigation and repair role is distinct |
| Bank/control record | Generic receipt-like visual | Bank-record visual distinct from the ledger database | Authority/supporting copy remains visually separable |
| Reconciliation | Normal state looked permanently incident-like | Compare arrows plus confirmation badge | Warning appears only after a selected failure triggers |
| Ledger record | Reused architecture glyph | Database/ledger role | Distinct from bank record and wallet |
| Wallets | Reused selected money-model icon | Wallet-card role; source/destination variants | Wallets no longer imply an architecture |
| Stablecoin issuer | Ordinary bank landmark | Separate issuer visual | Non-bank issuer is not presented as a bank |
| PvP parties | CHF/EUR token glyphs | Alice and Luca human characters | Parties remain recognizable people |
| wCBDC flow | People could appear to hold wCBDC | Alice and Luca remain people; eligible banks and wCBDC are separate nodes | Customer claims and institutional asset remain distinct |
| Bridge | Repeated generic glyphs | Alice, core/source record, bridge, destination ledger and destination wallet use distinct roles | Trust boundaries are visually legible |
| Netting | Bank B arrow skipped the queue | Both CHF 100 and CHF 60 move to the queue before net calculation | Written and animated direction agree |
| Native/stablecoin mismatch repair | Text repaired support records, but highlighted arrows still pointed toward DLT | Two explicit leftward hops from authoritative ledger through reconciliation to supporting records | Text, arrows and moving markers agree |
| Failures | Generic marker fallback could land on unrelated nodes | Exact target in each scenario rule; no fallback | One marker appears only at/after the trigger on the resolved node |
| Accessible naming | Generic node names hid authority | Model-specific title and note plus scenario/step `aria-label` | Screen-reader label names model, scenario, step and explanation |

## 12. Complete inconsistency and correction register

| ID | Severity | Affected combinations | Original wording or behavior | Why inaccurate or misleading | Source | Resolution | Verification |
|---|---|---|---|---|---|---|---|
| F01 | High | Instruction × mint/redeem | Generic “convert/mint,” “redeem/burn,” token and representation fields | Creating, cancelling or consuming an instruction does not create or extinguish money | E01–E02 | Resolved names, actors, actions, objects, results and all 14 step explanations rewritten | Semantic assertions plus rendered instruction mint |
| F02 | High | Instruction × bridge | Said CHF value was locked and wrapped | A wrapped instruction reference is not the authoritative deposit claim | E01–E04 | Reframed as boundary test; core account and destination reference labels added | Semantic gate and rendered bridge flow |
| F03 | High | Stablecoin × interbank | Bank A/Bank B/SIC structure remained visible | Same-issuer holder transfer is not automatically interbank settlement | E05, E08 | Reframed as same-issuer transfer; issuer, ledger, receiving service and all steps resolved | Semantic gate and rendered stablecoin transfer |
| F04 | High | Stablecoin × netting/wCBDC | SIC/bank copy could turn issuer claim into bank or central-bank money | Customer issuer claim and institutional settlement asset are distinct | E05, E08, E15 | Issuer-scheme netting excludes SIC; wCBDC flow uses eligible settlement banks and preserves issuer claim | Semantic gate and desktop/mobile rendered checks |
| F05 | High | All Agorá variants | Generic flow made all models look like Agorá’s tested money architecture | The tested platform treated platform balances as authoritative | E09–E10 | Only native is “Closest tested architecture”; others are comparison/adaptation/boundary labels | All four rendered variants |
| F06 | High | All Agorá variants | “FX liquidity” and `FX` movement implied integrated execution; atomic coordination could imply legal finality | FX integration was out of scope and legal effect depends on rules | E11–E14 | Path copy states no integrated FX service; movement renamed `SETTLE`; native intro separates technical coordination from finality | Semantic gate and all four rendered variants |
| F07 | High | All failures | Generic trigger map, clamping and target fallback | Could place a receiving rejection on settlement, mismatch on SIC, or contract pause on a person | E03, E07 | Explicit scenario rules with exact trigger/target and full recovery metadata | 173-combination gate and seven rendered trigger checks |
| F08 | High | All mismatch variants | Universal “bank expected / ledger observed” labels and one-way repair | Authority reverses for native and stablecoin models | E01, E03 | Four layouts and four recovery directions encoded | Semantic gate, all four rendered variants and arrow screenshots |
| F09 | Medium | All × netting | CHF 60 arrow went from Bank B directly to settlement | Net could be calculated before both obligations entered the queue | E04–E05 | Bank B movement corrected to queue | Exact movement assertion and rendered flow |
| F10 | Medium | Mismatch, PvP, wCBDC, stablecoin issuer, wallets and bridge | Reused or semantically ambiguous icons | Different entities and people became visually indistinguishable | E01, E03, E08, E15 | Entity-specific role visuals; Alice and Luca kept human | Desktop and 390 px browser review |
| F11 | Medium | All × conditional | Only successful condition path existed | E16 explicitly describes expiry and reservation release | E16 | Added condition failure at step 5 with retry, evidence, owner and outcomes | Four semantic cases and rendered trigger |
| F12 | Medium | PvP and wCBDC categories | Infrastructure scenarios were grouped as or confused with cross-border scope | PvP is cross-border; wCBDC settlement infrastructure is not inherently cross-border | E04, E15 | PvP kept Cross-border; wCBDC moved to Infrastructure & controls | Semantic assertion and rendered labels |
| F13 | Medium | All × Agorá receiving rejection | Marker was on “Luca” without naming the receiving-institution action | Could imply the person failed rather than payee confirmation | E10 | Node note and failure target label name receiving-institution confirmation while Luca remains human | Rendered failure summary and target check |
| F14 | High | Historical audit and regression control | Older audit said all corrections passed while the refactor had reintroduced semantic defects and only structural checks guarded them | Field presence does not prove meaning or visual direction | Current diff and prior audit | New inventory and semantic gate intentionally assert every high-risk boundary; old audit marked superseded | Current tests and browser matrix |

Finding totals: **0 critical, 9 high, 5 medium, 0 low**.

## 13. Implemented corrections

Every accepted finding in section 12 is implemented in `demo/index.html` and guarded by `tests/interactive-demo.test.js`. The implementation adds no parallel data file: runtime rendering, validation, inventory and tests resolve the same in-page model, scenario, scene and failure rules.

The landing-page layout, structure, styling, section order, interaction design and responsive behavior were not changed. Simulator-specific copy, data, visuals, labels and interactions were corrected under the user’s explicit authorization.

## 14. Unresolved questions and assumptions

| ID | Classification | Question or assumption | Required evidence or owner |
|---|---|---|---|
| O01 | Open legal question | Which event changes the creditor and creates legal finality for each production product? | Product terms, scheme rules and Swiss/corridor legal opinion |
| O02 | Open operational question | Which liquidity source, queue, cut-off and unwind rule should a liquidity-shortfall scenario use? | Treasury and payments operating model |
| O03 | Open custody question | How should device, wallet and key recovery preserve entitlement without silently transferring the claim? | Custody model, identity controls and legal terms |
| O04 | Open resolution question | How do insolvency, issuer failure, participant exit and contract migration affect customer claims? | Resolution, guarantee, depositor-protection and portability analysis |
| O05 | Assumption | Stablecoin netting and wCBDC variants are educational comparisons, not assertions about a named issuer scheme | Keep visible comparison label until an approved scheme rulebook exists |
| O06 | Assumption | Agorá’s current controlled real-value test remains non-production evidence | Recheck BIS status before external presentation |

## 15. Limitations

- The simulator is prose-driven. It does not calculate balances, liquidity, accounting entries, reserve sufficiency, capital, sanctions decisions, or legal finality.
- A resolved normal or failure state demonstrates internal consistency of the teaching artifact, not operational feasibility.
- Browser verification used the repository’s dependency-free local page; no separate automated accessibility engine is installed. The audit therefore used semantic DOM inspection, keyboard-focus checks, accessible names, responsive measurements, screenshots and console checks.
- The browser pass exhaustively rendered 300 normal step states. Failure rendering was manually inspected for each of the seven distinct failure types at its exact trigger; the 173-combination semantic gate verifies all remaining applicability, trigger, target and consequence data.
- No external legal opinion, bank participant rules, SIC participant documentation, accounting-policy approval, or named issuer rulebook was available to resolve O01–O04.

## 16. Automated verification results

| Check | Scope | Result |
|---|---|---|
| `tests/interactive-demo.test.js` | 44 resolved scenarios, 300 steps, 173 failures, 1,471 reachable states, all high-risk semantic assertions | Passed |
| `tests/demo-snapshot.test.js` | Intentionally supported archived v1 state-engine regression coverage | Passed |
| In-page `validateDemoData()` | Taxonomy, references, resolved scenes, exact failure targets/triggers and recovery fields | Passed at page load |
| JavaScript execution through Node test harness | Active inline script parsing and data initialization | Passed |
| `git diff --check` | Whitespace and patch integrity | Passed |

## 17. Rendered-browser verification results

| Browser check | Result |
|---|---|
| Landing page at desktop and 390 × 844 | Passed; frozen design retained; no horizontal overflow |
| All 300 normal model × scenario × step states | Passed; visible explanation, accessible journey label and node labels resolved; no normal-state failure marker leakage |
| One normal flow per model | Passed |
| Four mismatch authority variants | Passed; record labels and repair direction change by model |
| Instruction × mint and instruction × bridge | Passed; no money-mint/burn or wrapped-claim implication |
| Stablecoin × interbank, netting and wCBDC | Passed; no inappropriate SIC option; issuer claim remains distinct |
| Four Agorá variants | Passed; three labelled comparison/adaptation; native labelled closest; no integrated FX claim |
| PvP | Passed; Alice and Luca are human characters and movement legs are distinguishable |
| Seven failure types at their exact trigger | Passed; one exact marker, scenario-specific sentence, model authority sentence and live-region announcement |
| Narrow simulator layout | Passed; vertical node layout, horizontal step navigator, controls and inspector remain usable; no document or journey overflow |
| Keyboard focus | Passed; visible 2 px red outline with 3 px offset on the run-mode control |
| Browser console | Passed; no warnings or errors after final high-risk flow check |

## 18. Historical-audit status

The 3 September audit is retained as historical evidence but is superseded. Its counts of six failures and 169 applicable combinations describe the earlier structure, and its verification claims did not prevent the refactor from reintroducing generic triggers, generic mismatch semantics and several visual/content regressions. This audit’s derived inventory and semantic assertions are the active gate.

## 19. Files changed

- [`demo/index.html`](../../../demo/index.html) — simulator domain data, resolved scenario copy, failure rules, authority layouts, visuals, movements, accessible labels and inventory.
- [`tests/interactive-demo.test.js`](../../../tests/interactive-demo.test.js) — exhaustive semantic and reachability gate.
- [`demo-scenario-content-and-visual-audit-2026-09-03.md`](demo-scenario-content-and-visual-audit-2026-09-03.md) — superseded notice only.
- [`docs/appendices/README.md`](../README.md) — active audit pointer.
- [`.audit/demo-scenario-audit-2026-09-07.tsv`](../../../.audit/demo-scenario-audit-2026-09-07.tsv) — append-only decision trail.
- This report.
