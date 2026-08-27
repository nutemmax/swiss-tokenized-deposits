# Decision-ready documentation implementation log — 24 August 2026

This log records the implementation of medium-priority items M1–M6, M9–M10, and M14 in [`PLAN.md`](../../../PLAN.md). The work is research and design analysis, not legal, accounting, audit, tax, or regulatory advice.

## Scope completed

| Work package | Changes | Canonical chapter |
|---|---|---|
| Core terminology | Elevated the SBA Deposit Token PoC boundary: an on-chain payment instruction triggered off-chain deposit and mirror-account movements; the token was not the authoritative deposit record. | [`01`](../../01-tokenized-bank-deposits-foundations-and-product-types.md) |
| Monetary-system concepts | Added singleness, par convertibility, integrity, elasticity, fragmentation, and settlement-anchor quality with a product test for each. | [`01`](../../01-tokenized-bank-deposits-foundations-and-product-types.md) |
| Maturity vocabulary | Defined and applied concept, PoC, sandbox, controlled real-value test, pilot, and production, with scope qualifiers. | [`README`](../../README.md), [`00`](../../00-executive-summary.md), [`08`](../../08-project-agora-and-cross-border-tokenized-deposits.md), [`10`](../../10-tokenized-deposit-sources-and-regulatory-watch.md) |
| Quantitative business case | Added comparable baseline/pilot measures, complete cost boundaries, transparent formulas, data ownership, uncertainty ranges, and a stop decision. | [`09`](../../09-tokenized-deposit-implementation-roadmap-and-vendor-assessment.md) |
| Scheme governance | Added operator/legal form, governing body, participation, liability, software change, default, operations, data, assurance, commercial and exit decisions. | [`09`](../../09-tokenized-deposit-implementation-roadmap-and-vendor-assessment.md) |
| Decision ledger | Replaced the short open-question list with assigned decision status, owner/approver, evidence, blockers, scope, conditions, residual risk and review triggers. | [`10`](../../10-tokenized-deposit-sources-and-regulatory-watch.md), delivery use in [`09`](../../09-tokenized-deposit-implementation-roadmap-and-vendor-assessment.md) |
| Privacy and bank secrecy | Added FADP/DPO, Banking Act article 47, foreign access, outsourcing, metadata, retention, regulatory access and technology-pattern analysis. | [`03`](../../03-swiss-laws-and-finma-rules-for-tokenized-deposits.md), architecture link in [`05`](../../05-tokenized-deposit-system-architecture-and-ledger-records.md) |
| Cross-border corridor | Added a decision matrix for claims, currencies, settlement, FX/liquidity, AML/payment transparency, data, finality, operating hours, repair, tax and reporting. | [`06`](../../06-tokenized-deposit-issuance-transfers-redemption-and-settlement.md) |

## Four canonical visuals

| Visual | Location | Format and purpose |
|---|---|---|
| Swiss tokenized-money landscape | [`08`, section 12](../../08-project-agora-and-cross-border-tokenized-deposits.md#12-swiss-tokenized-money-and-settlement-landscape) | Mermaid topology separating production infrastructure, deposit/payment experiments, central-bank settlement experiments and the adjacent stablecoin model |
| Claim → record → workflow → settlement → finality | [`06`, section 8](../../06-tokenized-deposit-issuance-transfers-redemption-and-settlement.md#8-four-kinds-of-finality) | Mermaid dependency timeline for the recommended interbank burn-settle-issue model |
| Proven / demonstrated / proposed / unresolved | [`00`](../../00-executive-summary.md#what-the-evidence-permits-the-bank-to-say) | Executive evidence-boundary table |
| Model-selection decision tree | [`01`, section 7](../../01-tokenized-bank-deposits-foundations-and-product-types.md#7-model-selection-decision-tree) | Mermaid tree with payment-instruction, mirrored, platform-authoritative, separate-product and `use ordinary payments instead` outcomes |

The visuals are maintained in Markdown/Mermaid so they remain editable beside the claims and sources they explain. They are canonical in the chapters above and linked elsewhere rather than duplicated.

## Sources added or newly applied

- Swiss Bankers Association, *Deposit Token Proof of Concept – Results Report* (2025), especially pp. 3, 5 and 32–35: local copy [`sources/sba/deposit-token-poc-results-2025.pdf`](../../sources/sba/deposit-token-poc-results-2025.pdf) and canonical link in chapter 10.
- [BIS Annual Economic Report 2026, Chapter III](https://www.bis.org/publ/arpdf/ar2026e3.htm): monetary-system properties and settlement-anchor analysis.
- [CPMI, *Tokenisation in the context of money and other assets*](https://www.bis.org/cpmi/publ/d225.htm): tokenisation concepts, governance and risk-management boundary.
- [CPMI, *Linking fast payment systems across borders: governance and oversight*](https://www.bis.org/cpmi/publ/d223.htm): legal setup, ownership, operating structure, governing body and oversight.
- [Federal Act on Data Protection, SR 235.1](https://www.fedlex.admin.ch/eli/cc/2022/491/en) and [Data Protection Ordinance, SR 235.11](https://www.fedlex.admin.ch/eli/cc/2022/568/en): Swiss data-protection framework.
- [Banking Act, SR 952.0, art. 47](https://www.fedlex.admin.ch/eli/cc/51/117_121_129/de#art_47): bank-secrecy analysis.
- [FINMA Circular 2018/3 Outsourcing](https://www.finma.ch/en/~/media/finma/dokumente/rundschreiben-archiv/2018/rs-18-03/finma-rs-2018-03---20170921.pdf): foreign outsourcing, audit/inspection and Swiss recovery/resolution information.
- [FATF Recommendations](https://www.fatf-gafi.org/en/publications/Fatfrecommendations/Fatf-recommendations.html): cross-border payment-transparency baseline.

All active source IDs, status, purpose, checked date, claim mapping and change decisions are maintained in [`10-tokenized-deposit-sources-and-regulatory-watch.md`](../../10-tokenized-deposit-sources-and-regulatory-watch.md).

## Deliberate boundaries

- The maturity label applies only to the publicly evidenced scope. A pilot on production infrastructure is not a production tokenized-deposit product.
- The business-case framework contains no invented savings, adoption, loss, or liquidity numbers. Those remain pilot measurements.
- The corridor matrix is a required approval template. Its CHF/EUR example is illustrative and does not approve a corridor or provider.
- Privacy and bank-secrecy conclusions remain tied to the selected entities, fields, roles, locations, contracts and technical access; product-specific Swiss counsel approval is still required.
- International CPMI, BIS and FATF materials provide design or standard-setting context and do not replace Swiss law, FINMA analysis, system rules or foreign-jurisdiction advice.
