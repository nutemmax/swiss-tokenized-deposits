# High-priority implementation log — 24 August 2026

This log records the implementation of the high-priority items in [`PLAN.md`](../../../PLAN.md). It is a change record, not legal, tax, accounting or supervisory advice.

## Outcome

The core research narrative now distinguishes a proposed Swiss bank pilot from confirmed market activity, establishes current payment and project baselines, and makes the legal, accounting and operational evidence needed for a first pilot explicit. The interactive demo now keeps customer claims, token representations, institutional settlement and workflow/legal status separate—including when a control fails.

## Documentation and source changes

| Plan item | Implemented change | Primary locations |
| --- | --- | --- |
| H1 — Pilot narrative | Added a proposed first-pilot decision record: CBS-authoritative controlled mirror, named scope, authority, settlement and out-of-scope limits. | [`00-executive-summary.md`](../../00-executive-summary.md) |
| H2 — Swiss landscape | Added the current SIC instant-payment baseline and separated confirmed Swiss initiatives from a bank’s own proposed deposit-token design. | [`00-executive-summary.md`](../../00-executive-summary.md), [`02-retail-and-wholesale-tokenized-deposit-use-cases.md`](../../02-retail-and-wholesale-tokenized-deposit-use-cases.md), [`08-project-agora-and-cross-border-tokenized-deposits.md`](../../08-project-agora-and-cross-border-tokenized-deposits.md) |
| H3 — Agora status | Corrected the May 2026 report’s seven original central banks versus the current eight-bank project page; added the July 2026 controlled real-value test and labelled its limits. | [`08-project-agora-and-cross-border-tokenized-deposits.md`](../../08-project-agora-and-cross-border-tokenized-deposits.md), [`10-tokenized-deposit-sources-and-regulatory-watch.md`](../../10-tokenized-deposit-sources-and-regulatory-watch.md) |
| H4 — SIC baseline | Corrected the implication that Swiss payments lack 24/7 availability and made SIC instant payments the benchmark a proposal must improve upon. | [`00-executive-summary.md`](../../00-executive-summary.md), [`02-retail-and-wholesale-tokenized-deposit-use-cases.md`](../../02-retail-and-wholesale-tokenized-deposit-use-cases.md), [`10-tokenized-deposit-sources-and-regulatory-watch.md`](../../10-tokenized-deposit-sources-and-regulatory-watch.md) |
| H5 — Legal traceability | Added a material-claim evidence matrix covering bank/customer terms, banking-law scope, depositor protection, DLT classification, AML, outsourcing, privacy/banking secrecy and finality. | [`03-swiss-laws-and-finma-rules-for-tokenized-deposits.md`](../../03-swiss-laws-and-finma-rules-for-tokenized-deposits.md) |
| H6 — Accounting, prudential and protection boundary | Clearly labelled all journal entries as illustrative; narrowed the Basel treatment statement; added the product-specific mapping required before a protection claim is made. | [`04-tokenized-deposit-accounting-prudential-treatment-and-customer-protection.md`](../../04-tokenized-deposit-accounting-prudential-treatment-and-customer-protection.md) |
| H7 — Source freshness | Set the research cut-off to 24 August 2026, added a dated source-change log and claim-to-source mapping, and preserved local SBA report copies alongside canonical links. | [`10-tokenized-deposit-sources-and-regulatory-watch.md`](../../10-tokenized-deposit-sources-and-regulatory-watch.md), [`sources/README.md`](../../sources/README.md), [`sources/sba/`](../../sources/sba/) |

### New or refreshed primary sources

- [BIS Project Agora](https://www.bis.org/about/bisih/topics/fmis/agora.htm) — current project participants and July 2026 controlled test.
- [BIS Project Agora report, May 2026](https://www.bis.org/publ/othp99.htm) — original proof-of-concept scope and findings.
- [SNB: SIC and instant payments, 18 May 2026](https://www.snb.ch/en/publications/communication/press-releases-restricted/pre_20260518) — Swiss instant-payment baseline.
- [SNB: SIC System and Disclosure Report, 18 May 2026](../../sources/snb/sic-system-disclosure-2026.html) ([canonical publication](https://www.snb.ch/en/publications/sicsystem-disclosure/sicsystem-disclosure-all/sicsystem_disclosure_2025)) — archived current SIC governance and operations disclosure.
- [SNB: Project Helvetia extended to June 2028](https://www.snb.ch/en/publications/communication/press-releases-restricted/pre_20241212) and [BX Digital production RTGS connection](https://www.six-group.com/en/newsroom/media-releases/2025/20250212-bx-digital-snb.html) — wholesale settlement context.
- [Swiss Bankers Association: Deposit Token white paper](https://www.swissbanking.ch/_Resources/Persistent/a/4/0/7/a407b667e90f5e99d35deeb159e5c2ca8c00247d/SBA_Deposit_Token_White_Paper.pdf) and [2025 PoC results](https://www.swissbanking.ch/_Resources/Persistent/9/5/3/5/9535c61191a65c82b89ad501b8f57a86230cc86c/Deposit%20Token%20Proof%20of%20Concept.pdf) — Swiss sector terminology and the PoC’s off-chain balance movement.

The full source register, including checked dates and permanent local copies where available, is in [`10-tokenized-deposit-sources-and-regulatory-watch.md`](../../10-tokenized-deposit-sources-and-regulatory-watch.md).

## Demo changes

| Plan item | Implemented change | Effect on the viewer |
| --- | --- | --- |
| H8 — Failure integrity | A failure stays active at and after its trigger; a shared completion gate prevents later simulated steps from taking effect. | A blocked flow cannot be displayed as a completed settlement or legal outcome. |
| H8 — SIC failure | Interbank SIC failure leaves both SNB sight balances unchanged and creates no Luca claim. | The demo no longer implies that an unavailable SIC leg has settled. |
| H8 — Receiving-bank rejection | After a final SIC leg, the state becomes `Bank B suspense / repair`; Luca remains at CHF 0 and no Bank B customer claim is created. | Shows the real operational distinction between settlement completion and customer-credit acceptance. |
| H8 — DLT/key failure | Mint and bridge flows retain their reservation/source lock but create no token, wrapped token or destination value. | Prevents phantom value in failed flows. |
| H9 — Representation and authority | An instruction ledger shows instruction value rather than token supply; stablecoin backing is visibly illustrative and separate from a reserve/guarantee assertion. | Keeps product types and legal claims distinct. |
| H9 — Settlement explanation | Status ribbon now reports workflow, ledger, accounting, settlement, legal effect and reconciliation separately; model-specific interbank descriptions distinguish instruction, native and issuer-claim paths. | Makes the conditions for a completed customer transfer legible. |
| H9 — Cross-border/institutional flows | PvP displays both CHF and EUR legs; wholesale CBDC displays the Bank A/Bank B institutional positions; stablecoin netting does not mutate SIC balances. | Removes conflation of customer money, issuer claims and central-bank money. |
| H10 — Verification and usability | Added deterministic snapshot tests, source-register pointers in the demo specification, and a narrow-screen layout that removes the previous desktop-only horizontal overflow. | The demo is testable and usable on a narrow display without concealing the state model. |

## Verification performed

Run from the repository root:

```sh
node --check demo/deprecated/v1/app.js
node --check tests/demo-snapshot.test.js
node tests/demo-snapshot.test.js
```

Result: `demo snapshot checks passed`.

The test exercises SIC failure, receiving-bank rejection, DLT mint failure, bridge failure, instruction mint terminology, redemption sequencing, stablecoin netting and wholesale-CBDC movement. It also iterates every model, scenario, normal step and applicable failure trigger, asserting non-negative state, instruction/no-supply separation, displayed token-supply conservation where applicable, blocked workflow persistence, and absence of simulated legal finality after a failure. The live demo was also checked in a browser for the default flow, SIC failure, receiving-bank rejection, keyboard-addressable controls and a 390 px viewport. The narrow layout has no horizontal overflow.

## Important limits retained deliberately

- The demo is a deterministic educational simulation. It does not calculate legal finality, accounting entries, regulatory capital, liquidity, sanctions outcomes or reserve sufficiency for a real product.
- `SIC final`, `Product terms apply`, and `Subject to terms / rulebook` describe the stage reached in the illustrative model. A bank must map its actual contracts, payment-system rules, accounting policy and control evidence before treating an event as legally final.
- The SBC/SBA material is a sector research and proof-of-concept reference, not proof that a particular Swiss bank has launched a tokenized deposit.

## Follow-on work

The remaining medium and low items—including the formal source-validation pipeline, appendices reorganisation, exact legal quotations and expanded test coverage—remain prioritised in [`PLAN.md`](../../../PLAN.md). They were intentionally not folded into this high-priority implementation pass.
