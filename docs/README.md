# Swiss Tokenized Deposits Research

This collection explains how a FINMA-supervised Swiss bank could issue and operate tokenized deposits for retail and wholesale customers. It is written to be read in order, but each chapter can also stand alone.

**Research cut-off:** 24 August 2026
**Primary perspective:** a Swiss bank issuing CHF-denominated deposits
**Status:** research and design analysis, not legal, accounting, audit, or tax advice

## Reading order

1. [Beginner summary](00-executive-summary.md)
2. [Foundations and product types](01-tokenized-bank-deposits-foundations-and-product-types.md)
3. [Retail and wholesale use cases](02-retail-and-wholesale-tokenized-deposit-use-cases.md)
4. [Swiss laws and FINMA rules](03-swiss-laws-and-finma-rules-for-tokenized-deposits.md)
5. [Accounting, prudential treatment, and customer protection](04-tokenized-deposit-accounting-prudential-treatment-and-customer-protection.md)
6. [System architecture and ledger records](05-tokenized-deposit-system-architecture-and-ledger-records.md)
7. [Issuance, transfers, redemption, and settlement](06-tokenized-deposit-issuance-transfers-redemption-and-settlement.md)
8. [Risks, controls, and operational resilience](07-tokenized-deposit-risks-controls-and-operational-resilience.md)
9. [Project Agorá and cross-border deposits](08-project-agora-and-cross-border-tokenized-deposits.md)
10. [Implementation roadmap and vendor assessment](09-tokenized-deposit-implementation-roadmap-and-vendor-assessment.md)
11. [Sources and regulatory watch](10-tokenized-deposit-sources-and-regulatory-watch.md)

## How to use this collection

The sequence is designed for progressive reading. Chapters 00 and 01 establish the mental model; chapters 02 to 04 examine the business, legal, and financial consequences; chapters 05 to 07 describe the operating system and its controls; and chapters 08 to 10 cover external evidence, delivery, and continuing regulatory maintenance.

Readers who do not need the full sequence can use a shorter path:

- **Executive or beginner:** 00, 01, 02, and the conclusion of 09.
- **Legal, compliance, finance, or audit:** 01, 03, 04, 07, and 10.
- **Architecture, operations, or engineering:** 01, 04, 05, 06, and 07.
- **Strategy and delivery:** 00, 02, 08, and 09.

Most substantive sections follow the same pattern: introduce the question, explain the concept, present structured detail, interpret the table or diagram, and state the consequence for the bank. A table is therefore a compact comparison rather than a substitute for the surrounding analysis.

## How claims are labelled

The labels separate evidence from judgment. They should be read with the source status and any qualification beside the claim; a cited source can support a verified fact without proving the bank's proposed design.

| Label | Meaning |
|---|---|
| **Verified fact** | Supported by a cited primary or authoritative source. |
| **Interpretation** | A reasoned reading of the sources; the source does not state the conclusion verbatim. |
| **Design recommendation** | A proposed implementation choice, not a legal requirement. |
| **Open issue** | Requires confirmation from FINMA, Swiss counsel, the external auditor, the SNB, SIX, or a vendor. |

Regulatory sources are also classified as **in force**, **future effective**, **consultation/proposal**, **supervisory guidance**, or **industry/prototype evidence**. An old publication is not assumed to be obsolete: for example, FINMA Guidance 02/2019 remains listed in FINMA's current crypto-services index.

## Editorial conventions

- “Tokenized deposit” means a deposit claim on a commercial bank represented or operated through token or DLT technology. It does not automatically mean a stablecoin, security, custody asset, or central-bank liability.
- Each subject has one canonical chapter. Other chapters link to it rather than repeat it.
- Tables are used for comparisons and controls, but important tables are introduced and followed by prose explaining why the distinctions matter, their limits, and their practical consequences. Mermaid diagrams show architectures, flows, and states.
- Worked examples use recurring actors such as Alice, Bob, Bank A, Bank B, and a corporate treasury team. They illustrate the model; they are not approved product terms or accounting policy.
- Illustrative accounting entries and legal classifications are clearly marked as requiring professional approval.

## Supporting material

- [Demo presenter material](appendices/demo/)
- [Factual audits](appendices/audits/)
- [Primary source files](sources/)
- [Superseded notes archived on 14 August 2026](archive/2026-08-14/)
