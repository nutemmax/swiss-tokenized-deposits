# Simulator scenario, failure and visual audit

> **Superseded for the refactored simulator:** use the [7 September 2026 content and visual audit](demo-scenario-content-and-visual-audit-2026-09-07.md). This report is retained as historical evidence; its six-failure, 169-combination counts and structural verification did not describe the later refactored implementation.

**Reviewed:** 3 September 2026  
**Artifact:** `demo/index.html`  
**Scope:** 4 money models, 11 scenarios, 75 normal steps, 300 resolved step explanations and 169 applicable model/scenario/failure combinations

## Conclusion

The simulator is structurally complete, but the previous audit overstated what its automated checks proved. This review found nine semantic or visual issue groups. All nine are corrected in the demo. Every model/scenario pair remains available, but comparisons that do not match the cited initiative’s actual money model are now explicitly labelled as comparisons, patterns or boundary tests.

The demo remains an educational explorer. It does not calculate balances or prove legal finality. Its descriptions distinguish verified source facts from architectural adaptations and conceptual comparisons.

## Evidence used

| Evidence ID | Authority and use in this audit |
|---|---|
| DOC-01 | `docs/01-tokenized-bank-deposits-foundations-and-product-types.md` for debtor, claim and payment-instruction boundaries |
| DOC-05 | `docs/05-tokenized-deposit-system-architecture-and-ledger-records.md` for CBS-authoritative, platform-authoritative and reconciliation rules |
| DOC-06 | `docs/06-tokenized-deposit-issuance-transfers-redemption-and-settlement.md` for issuance, redemption, same-bank, interbank, netting, PvP, wCBDC and bridge flows |
| DOC-07 | `docs/07-tokenized-deposit-risks-controls-and-operational-resilience.md` for AML, ledger, key, receiving-party and reconciliation failures |
| DOC-08 | `docs/08-project-agora-and-cross-border-tokenized-deposits.md` for the Agorá architecture and five-stage flow |
| SRC-BIS-AGORA | `docs/sources/bis/project-agora-2026.pdf`, especially report pages 10, 20–23 and 65–66, for platform authority, five stages, scope limits, asynchronous updates and legal-finality limits |
| SRC-SBA-DT | `docs/sources/sba/deposit-token-poc-results-2025.pdf`, pages 3, 5 and 32–35, for the on-chain payment-instruction and off-chain deposit boundary |
| SRC-SNB-SIC | `docs/sources/snb/sic-system-disclosure-2026.html` for SIC central-bank-money settlement and operational context |
| REGISTRY | `docs/10-tokenized-deposit-sources-and-regulatory-watch.md` for source status, maturity and approved claim map |

## Findings and corrections

| ID | Affected combinations | Finding | Correction |
|---|---|---|---|
| C01 | Payment instruction × mint and redeem | “Mint” and “burn” could imply creation or extinction of money. An instruction is a request; the core account remains authoritative. | Renamed the resolved flows to “Create payment instruction” and “Cancel or complete instruction”; clarified reservation, consumption and core-account posting. |
| C02 | Payment instruction, mirrored deposit and stablecoin × Agorá | The original shared copy made every model look like the money model tested by Agorá. | Labelled these three as pattern comparisons. Only native/platform-authoritative uses the direct Agorá framing. |
| C03 | All models × Agorá | Path discovery said integrated “FX liquidity” was part of the prototype. The BIS report says FX integration was out of scope. | States that the prototype determined cross-currency amounts but did not integrate an FX execution service. |
| C04 | Stablecoin × Swiss interbank and netting | Bank A/Bank B and SIC language implied transfer of commercial-bank liabilities. A same-issuer stablecoin is a separate issuer claim. | Recast the flow as issuer-ledger holder transfer and issuer-scheme netting; removed SIC finality from the stablecoin versions. |
| C05 | Stablecoin × wholesale CBDC | Shared copy could make wCBDC look like the customer token. Wholesale central-bank money is available only to eligible institutions. | Separates Luca’s issuer claim from the wCBDC funding leg between eligible settlement institutions. |
| C06 | Payment instruction × bridge | Shared bridge copy said CHF value was locked and wrapped, which could misstate the object as the deposit claim. | Recast as a boundary test. Only the instruction reference is wrapped; no claim moves until Bank A posts the payment. |
| C07 | All models × mismatch; all 169 failures | The mismatch diagram assumed that the bank record was always expected and the ledger always observed. Failure timing and targets were selected from generic fallback lists. | Added authority-specific record labels and exact scenario-specific trigger, target and failure description rules for every applicable combination. |
| C08 | Netting step 2 | The text said both obligations entered the queue, but the Bank B arrow went directly to settlement. | Corrected the Bank B movement to the payment queue. |
| C09 | Mismatch, PvP, wCBDC, stablecoin issuer and wallet graphics | Operations looked like biometric scanning; bank and ledger records both looked like receipts; PvP parties used money-model glyphs; people were titled as claims; the stablecoin issuer looked like a bank. | Operations now uses repair tools, the bank record uses an open-book/bank mark, reconciliation uses comparison/confirmation, the ledger uses a database/confirmation mark, Alice and Luca remain human, wallets and issuers have distinct visuals, and wCBDC people are labelled as people. |

## Normal-flow coverage

Every cell below covers the scenario introduction and each resolved step explanation for that model. “Verified” means the shared flow agrees with the cited documentation. “Corrected” identifies the implemented finding above.

| Scenario | Payment instruction | Mirrored deposit | Native on-chain | Non-bank stablecoin |
|---|---|---|---|---|
| Convert / mint | Corrected C01 | Verified | Verified | Verified |
| Redeem / burn | Corrected C01 | Verified | Verified | Verified |
| Same-bank transfer | Verified | Verified | Verified | Verified |
| Swiss interbank | Verified | Verified | Verified | Corrected C04 |
| Conditional payment | Verified | Verified | Verified | Verified |
| Gross versus net | Verified | Verified | Verified | Corrected C04 |
| Agorá five-stage payment | Corrected C02–C03 | Corrected C02–C03 | Corrected C03 | Corrected C02–C03 |
| Cross-border PvP | Verified; visual C09 | Verified; visual C09 | Verified; visual C09 | Verified; visual C09 |
| Wholesale CBDC | Verified; visual C09 | Verified; visual C09 | Verified; visual C09 | Corrected C05 and C09 |
| Bridge / wrapped token | Corrected C06 | Verified | Verified | Verified |
| Mismatch + recovery | Corrected C07–C09 | Corrected C07–C09 | Corrected C07–C09 | Corrected C07–C09 |

## Failure coverage

The count is 169 combinations: AML 32, DLT 40, SIC 6, receiving institution 11, reconciliation 40, and key/contract 40. The same scenario rule applies across the four models, followed by a model-specific authority and last-valid-state consequence. Stablecoin excludes SIC in both scenarios and receiving-bank rejection in the same-issuer transfer.

| Failure | Scenario and exact trigger step | Exact visual target | Models |
|---|---|---|---|
| AML / sanctions | Mint 2; redeem 2 | Issuer | All four |
| AML / sanctions | Same-bank 2; interbank 2; conditional 2; PvP 2 | Bank or issuer check | All four, with stablecoin issuer semantics |
| AML / sanctions | Agorá 3 | Validation | All four; non-native variants are comparisons |
| AML / sanctions | Bridge 2 | Bridge | All four |
| DLT unavailable | Mint 4; redeem 4; same-bank 4 | Authorized ledger | All four |
| DLT unavailable | Interbank 4 | Settlement or coordination component | All four |
| DLT unavailable | Conditional 6 | Condition | All four |
| DLT unavailable | Agorá 4 | Lock and delegate | All four |
| DLT unavailable | PvP 5 | PvP coordinator | All four |
| DLT unavailable | wCBDC 4 | Wholesale-CBDC ledger | All four |
| DLT unavailable | Bridge 5 | Destination ledger | All four |
| DLT unavailable | Mismatch 6 | Compared ledger record | All four |
| SIC unavailable | Interbank 5; netting 5 | SIC / settlement | Instruction, mirrored and native only |
| Receiving institution rejects | Interbank 6; wCBDC 6 | Bank B | All four except stablecoin interbank |
| Receiving institution rejects | Agorá 1 | Payee confirmation | All four |
| Reconciliation mismatch | Mint 5; redeem 5; same-bank 5 | Relevant ledger record | All four |
| Reconciliation mismatch | Interbank 7 | Settlement evidence | All four |
| Reconciliation mismatch | Conditional 7 | Condition and release record | All four |
| Reconciliation mismatch | Agorá 5 | Coordinated settlement | All four |
| Reconciliation mismatch | PvP 7 | PvP result | All four |
| Reconciliation mismatch | wCBDC 5 | Wholesale-CBDC evidence | All four |
| Reconciliation mismatch | Bridge 7 | Bridge evidence | All four |
| Reconciliation mismatch | Mismatch 3 | Reconciliation control | All four |
| Key / contract pause | Same trigger and target as the DLT rows above | Required key or contract at that point | All four |

## Authority-specific mismatch labels

| Model | Bank-side/control record | Ledger-side record |
|---|---|---|
| Payment instruction | Core-account record, authoritative deposit position | Instruction record, digital payment request |
| Mirrored deposit | CBS liability record, authoritative deposit position | DLT token mirror, synchronized representation |
| Native on-chain | Bank control record, accounting and reporting copy | DLT holder record, authoritative claim position |
| Non-bank stablecoin | Backing records, reserve and guarantee support | Issuer token ledger, authoritative issuer claim |

## Verification criteria

The semantic gate checks all 44 model/scenario combinations, all 300 resolved explanations and all 169 failure combinations. It rejects missing scenario-specific failure rules, out-of-range triggers, invisible targets, short scenario descriptions and the corrected high-risk wording regressions.

Visual verification covers the landing page, one ordinary flow, mismatch under all four authority models, the stablecoin interbank and wCBDC comparisons, PvP parties, and representative failure markers at desktop and narrow widths.

## Limitations

- The current simulator is prose-driven. The “current record” is a documented step result, not a calculated financial state.
- Agorá variants outside the platform-authoritative model are comparisons, not claims about the tested Agorá architecture.
- Stablecoin netting and wCBDC combinations are conceptual architecture comparisons. Their legal effect depends on the issuer, settlement-bank and scheme rulebooks.
- Technical atomicity does not itself establish legal finality. Applicable law, account terms and system rules remain controlling.
