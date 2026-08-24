# Tokenized-Deposit Sources and Regulatory Watch

**Research cut-off:** 24 August 2026<br>
**Purpose:** maintain source provenance, regulatory freshness, and unresolved decisions

## 1. Source hierarchy

The research uses the most authoritative source available for each claim:

1. consolidated legislation and ordinances on Fedlex;
2. FINMA, Federal Council/SIF, SNB, SIX, and other competent Swiss authorities;
3. binding system and participant rules available to the bank;
4. Basel Committee, FATF, CPMI-IOSCO, OECD, and BIS primary publications;
5. industry proof-of-concept reports and vendor documentation;
6. legal, audit, and accounting opinions prepared for the exact product.

A higher-ranked source does not automatically answer a product-specific question. For example, the Banking Act may establish the framework while an external legal opinion is still needed to apply it to a particular token contract and insolvency flow.

### How to use the register

Readers should begin with the material claim, not with a keyword search for “token.” The register identifies the most authoritative source found, its legal or evidentiary status, the chapters that rely on it, and the event that requires another review. If a source establishes only a general framework, the corresponding claim remains an interpretation or open issue until applied to the exact product.

Maintainers should distinguish three outcomes when screening a new publication:

- **Applicable:** the source supports, changes, or challenges a claim in the active research.
- **Screened but not directly applicable:** the source is current and potentially adjacent, but the present product does not perform the activity it regulates or discuss the risk it addresses.
- **Not resolved:** the source was unavailable, unclear, only proposed, or insufficient for the product-specific conclusion; the question remains open.

This distinction supports completeness without importing every crypto, DLT, or bank rule into every chapter.

## 2. Regulatory evidence register

The register is the control record for Swiss legal and supervisory sources used in the research. Dates and statuses are recorded separately so that a source is not treated as current merely because it is recent or treated as obsolete merely because it is old.

| ID | Source | Type and status | Effective/publication date | Principal use | Checked | Next trigger |
|---|---|---|---|---|---|---|
| CH-BA | [FINMA legal basis for banks](https://www.finma.ch/en/documentation/legal-basis/laws-and-ordinances/banks/) and Fedlex BA/BO | Binding law; in force | Consolidated version on decision date | Deposit, licence, custody assets, insolvency, prudential framework | 2026-08-14 | Any BA/BO amendment or product-model change |
| CH-FMI | [FINMA legal basis for FMIs](https://www.finma.ch/en/documentation/legal-basis/laws-and-ordinances/financial-market-infrastructures/) | Binding law/ordinances; in force | Consolidated version on decision date | Payment system, DLT trading facility, finality, participant rules | 2026-08-14 | New operator or multilateral function |
| CH-AML | [FINMA AML legal basis](https://www.finma.ch/en/documentation/legal-basis/laws-and-ordinances/anti-money-laundering-act-%28amla%29/) | Binding law/ordinance; in force | Consolidated version on decision date | Customer, beneficial owner, monitoring, reporting | 2026-08-14 | 2026 AML changes and final AMLO-FINMA revision |
| FINMA-02-2019 | [Payments on the blockchain](https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/4dokumentation/finma-aufsichtsmitteilungen/20190826-finma-aufsichtsmitteilung-02-2019.pdf) | Supervisory guidance; still listed as current | 26 August 2019 | Originator/beneficiary information and blockchain payment practice | 2026-08-14 | FINMA crypto index or Travel Rule update |
| FINMA-18-03 | FINMA Circular 2018/3 Outsourcing | Supervisory practice; current; latest official version last amended 4 November 2020 | Entered into force 1 April 2018; amendments effective 1 January 2021 | Provider governance, access, audit, exit | 2026-08-14 | Circular amendment or replacement |
| FINMA-20-01 | [FINMA Circular 2020/1 Accounting - banks](https://www.finma.ch/en/news/2019/11/20191114-mm-rechnungslegung/) | Supervisory practice; current with FINMA Accounting Ordinance; official file updated 11 November 2020 | Entered into force 1 January 2020; FINMA's 2023 evaluation found no adjustment need for evaluated provisions | Recognition, presentation, disclosure | 2026-08-14 | Circular/accounting ordinance amendment |
| FINMA-23-01 | [Operational risks and resilience - banks](https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/rundschreiben/finma-rs-2023-01-20221207.pdf) | Supervisory practice; in force | Entered into force 1 January 2024 | Operational risk, critical data, resilience, ICT | 2026-08-14 | FINMA amendment or new implementation guidance |
| FINMA-25-01 | [Auditing - banks and securities firms](https://www.finma.ch/en/supervision/cross-sector-issues/auditing/auditing-of-banks/) | Supervisory practice; in force | 1 January 2025; supervisory-audit guidance updated 24 July 2026 | Regulatory audit strategy, reporting, and control evidence | 2026-08-14 | Audit circular, guide, template, or audit-point update |
| FINMA-16-07 | [Video and online identification](https://www.finma.ch/en/authorisation/fintech/) | Supervisory practice; current version last amended 6 May 2021 | Entered into force March 2016; current amendment 6 May 2021 | Remote retail and corporate onboarding | 2026-08-14 | Final result of the 2025/26 partial-revision consultation |
| FINMA-03-2024 | [Cyber-risk guidance](https://www.finma.ch/en/news/2024/06/20240607-mm-am-cyberrisiken/) | Supervisory guidance | 7 June 2024 | Outsourcing weaknesses, cyber reporting, exercises | 2026-08-14 | New FINMA cyber guidance |
| FINMA-06-2024 | [Stablecoin guidance](https://www.finma.ch/en/news/2024/07/20240726-m-am-06-24-stablecoins/) | Supervisory guidance | 26 July 2024 | Stablecoin/guarantee comparison, AML and sanctions risk | 2026-08-14 | New stablecoin law or FINMA practice |
| FINMA-03-2025 | [Cryptobased-asset disclosure](https://www.finma.ch/en/news/2025/09/20250905-meldung-am-kryptovermoegenswerte/) | Supervisory guidance | 5 September 2025 | Customer custody-asset disclosure; not own-liability accounting | 2026-08-14 | New disclosure line or accounting rule |
| FINMA-01-2026 | [Custody of cryptobased assets](https://www.finma.ch/en/news/2026/01/20260112-mm-am-01-26/) | Supervisory guidance | 12 January 2026 | Custody, providers, foreign insolvency, retained responsibility | 2026-08-14 | Product adds self/external custody or guidance changes |
| FINMA-04-2026 | [AML risk analysis supplement](https://www.finma.ch/en/news/2026/06/20260604-mm-am-04-26/) | Supervisory guidance | 4 June 2026 | Risk tolerance and product/country/customer alignment | 2026-08-14 | New FINMA AML review findings |
| FINMA-05-2026 | [Quantum computing](https://www.finma.ch/en/news/2026/07/20260709-mm-am-05-26/) | Supervisory guidance | 9 July 2026 | Cryptographic inventory, quantum-risk analysis, provider planning, migration roadmap, and crypto-agility | 2026-08-14 | New FINMA cyber/quantum guidance or material cryptographic architecture change |
| CH-AML-2026 | [Revised AMLA and Transparency Act](https://www.efd.admin.ch/en/newnsb/x3sKLxCJ6S3dQJtfvy0Tb) | Binding law; future effective | 1 October 2026 | Beneficial-owner transparency and implementation | 2026-08-14 | Entry into force and transition guidance |
| FINMA-AMLO-2026 | [AMLO-FINMA partial revision](https://www.finma.ch/en/news/2026/05/20260512-mm-anh-gwv-finma/) | Consultation; not final at cut-off | Consultation closed 9 June 2026 | Ownership/control, sanctions, correspondent accounts, subaccounts | 2026-08-14 | Final ordinance and effective date |
| FINMA-VID-2026 | [Circular 2016/7 partial revision](https://www.finma.ch/en/news/2025/12/20251216-mm-video-online-id/) | Consultation; not final at cut-off | Consultation closed 27 February 2026 | Proposed updates to digital onboarding | 2026-08-14 | Final circular and effective date |
| FINMA-RDO | [RDO-FINMA](https://www.finma.ch/en/news/2026/05/20260520-mm-rvv-finma/) | Binding ordinance; future effective | 1 January 2027 | Risk diversification and concentration | 2026-08-14 | Final Fedlex publication/implementation |
| FINMA-LIQ | [LiqO-FINMA](https://www.finma.ch/en/news/2026/07/20260707-mm-liqv-finma/) | Binding ordinance; future effective | 1 January 2027 | Liquidity risk, shortages, financial/liquidity planning | 2026-08-14 | Final Fedlex publication/implementation |
| FINMA-RM25 | [FINMA Risk Monitor 2025](https://www.finma.ch/en/news/2025/11/20251117-mm-risikomonitor/) | Supervisory context; not binding law | 17 November 2025 | Current risk emphasis | 2026-08-14 | Risk Monitor 2026 |
| FINMA-AR25 | [FINMA Annual Report 2025](https://www.finma.ch/en/news/2026/04/20260421-mm-jmk-2026/) | Supervisory context; not binding law | 21 April 2026 | Crypto-custody operational risk and DLT-market supervision priorities | 2026-08-14 | Annual Report 2026 |
| FINMA-BX25 | [First DLT trading-facility licence](https://www.finma.ch/en/news/2025/03/20250318-mm-dlt-handelssystem/) | Institution-specific licence and adjacent precedent | 18 March 2025 | DLT securities, smart-contract DvP, SIC connection, resilience expectations | 2026-08-14 | New facility, enforcement, or rule change |
| CH-CRYPTO-PROP | [Payment-instrument and crypto-institution proposal](https://www.sif.admin.ch/en/newnsb/x4TMWQ1SWofNoFx7XyHhY) | Consultation/proposal | Consultation closed 6 February 2026 | Future adjacent licence and consumer-protection regime | 2026-08-14 | Federal Council dispatch or abandonment |
| CH-CARF | [Swiss cryptoasset AEOI status](https://www.sif.admin.ch/en/framework-for-the-automatic-exchange-of-information-aeoi-on-crypto-assets) | Approved framework; implementation deferred | Not before 1 January 2027 | Conditional tax-reporting horizon | 2026-08-14 | Parliamentary partner-state decision and FTA guidance |

The register deliberately distinguishes publication age from current status. FINMA Guidance 02/2019 is old but still listed; the 2026 AMLO-FINMA text is new but remained a consultation at the cut-off. Both facts matter more than the year in the title.

### Screened adjacent material

The FINMA crypto-services index was also screened for ICO/token-classification guidance, staking, crypto funds and ETPs, exchanges, and investor warnings. They remain relevant if the product expands into those activities, but they are not treated as primary authority for a bank's own CHF deposit liability. Guidance 08/2023 on staking, for example, becomes relevant only if the bank adds staking or custody arrangements around third-party cryptoassets. This boundary prevents the research from importing rules merely because both products use DLT.

FINMA Circular 2026/1 on nature-related financial risks entered into force on 1 January 2026 and is current for its stated addressees. It was screened but does not provide tokenized-deposit classification, settlement, accounting, or custody rules. It may be relevant to the bank's broader risk-management framework, but it is not treated as a tokenized-deposit-specific authority ([FINMA Circular 2026/1](https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/rundschreiben/finma-rs-2026-01.pdf)).

Recording exclusions is useful because it shows that a current publication was considered and deliberately bounded. It also creates a trigger: if the product later adds an activity covered by an excluded source, the source is promoted into the active applicability analysis.

## 3. Payments, central-bank, and international sources

These sources describe settlement infrastructure, international standards, and prototype or industry evidence. They are authoritative for different questions and therefore cannot be substituted for one another.

| ID | Source | Status | Principal use | Checked |
|---|---|---|---|---|
| SNB-SIC-2025 | [SIC System Disclosure, 30 September 2025](https://www.snb.ch/en/publications/sicsystem-disclosure/sicsystem-disclosure-all/sicsystem_disclosure_2024) | Authoritative system disclosure | SIC governance, settlement, operations, PFMI context | 2026-08-14 |
| SNB-HELVETIA | [Project Helvetia FAQ](https://www.snb.ch/en/services-events/digital-services/faq-overview/qas_helvetia) | Central-bank experiment; active until at least June 2028 | Wholesale tokenized-asset settlement research | 2026-08-14 |
| BIS-AGORA-2026 | [Local Project Agorá report](sources/bis/project-agora-2026.pdf) | Prototype evidence | Two-layer architecture, workflow, privacy, legal and production gaps | 2026-08-14 |
| BCBS-SCO60 | [Basel SCO60](https://www.bis.org/basel_framework/chapter/SCO/60.htm?inforce=20260101) | International prudential standard; current from 1 January 2026 | Cryptoasset and cryptoliability prudential framework | 2026-08-14 |
| FATF-R16 | [FATF Recommendations](https://www.fatf-gafi.org/en/publications/Fatfrecommendations/Fatf-recommendations.html) | International standard, revised June 2025 | Payment transparency and AML/CFT baseline | 2026-08-14 |
| SIX-ISO | [SIX ISO 20022](https://www.six-group.com/en/products-services/banking-services/payment-standardization/standards/iso-20022.html) | Industry/system implementation material | Swiss payment messages and integration | 2026-08-14 |
| SBA-DT-2025 | [SBA Deposit Token PoC](https://www.swissbanking.ch/_Resources/Persistent/7/9/e/a/79ea024daa9834c99fc299db5d5f69c4317525a2/20250916_Ergebnisbericht%20PoC%20Deposit%20Token_EN_FINAL.pdf) | Industry proof of concept | Tokenized payment instructions, off-chain bank-account settlement, mirror-account mechanics, multi-bank flows, and control evidence | 2026-08-14 |
| SBA-DT-2023 | [SBA Deposit Token white paper](https://www.swissbanking.ch/_Resources/Persistent/9/4/1/1/941178de59b98030206fc15ac8c99012f65df30b/SBA_The_Deposit_Token_EN_2023.pdf) | Industry position | Product models and use-case context | 2026-08-14 |

These sources support different kinds of claims. SNB and SIX material explains existing settlement infrastructure; Basel and FATF set international standards that still require Swiss implementation analysis; BIS and SBA prototypes show possible designs but do not grant legal approval.

## 4. Claim-to-source map

The claim map connects the narrative chapters to evidence without pretending that one citation proves the entire product model. Each row identifies the primary source and the qualification that must remain beside the conclusion.

| Material claim | Primary evidence | Qualification |
|---|---|---|
| Tokenization does not itself determine legal classification | BA/BO, FinMIA framework, FINMA product-specific guidance | Exact terms and activity remain decisive |
| Blockchain payments require originator/beneficiary information in FINMA practice | FINMA Guidance 02/2019 | Apply to exact transfer/intermediary model and current AML law |
| Custody providers introduce operational and insolvency risks; bank responsibility can remain | FINMA Guidance 01/2026 | Do not equate third-party custody assets with own-bank deposit liabilities |
| AML risk tolerance must align with products, services, customers, and countries | FINMA Guidance 04/2026 | Institution-specific implementation required |
| RDO-FINMA and LiqO-FINMA replace named circulars in 2027 | FINMA 2026 final releases | Update policy on entry into force |
| Agorá uses a platform-authoritative model and five-stage workflow | BIS Project Agorá 2026, pp. 15, 25–28 | Prototype, not production rulebook or legal opinion |
| Technical atomicity is not identical to legal finality | Agorá legal analysis; FinMIA/system rules | Jurisdiction and rulebook determine effect |
| BX Digital is a real Swiss DLT-FMI/SIC precedent | FINMA licence release, 18 March 2025 | Adjacent DLT-securities case, not deposit-token approval |

For example, the statement that technical atomicity is not identical to legal finality is traced to Agorá's legal analysis and the applicable Swiss legal and system-rule framework. The Agorá report supports the prototype design observation; it does not decide Swiss insolvency or SIC finality. Chapter 06 therefore presents the technical concept as verified prototype evidence and leaves the Swiss product-specific legal point subject to rules and opinion.

## 5. Open-question register

The register converts uncertainty into assigned work. An open question remains visible until the named decision owner provides linked evidence or records a formal risk decision; technical delivery pressure is not evidence that the question has been resolved.

| ID | Question | Decision owner | Blocks |
|---|---|---|---|
| OQ-01 | Is the selected token a record, payment instruction, or legally constitutive deposit record? | Swiss counsel, product owner | Terms, accounting, architecture |
| OQ-02 | What event changes the creditor and creates legal finality in each flow? | Swiss counsel, payments, participants | Interbank pilot |
| OQ-03 | How are token-enabled balances reported and aggregated for depositor protection? | Counsel, finance, auditor | Retail pilot |
| OQ-04 | Which Basel SCO60 provisions apply under current Swiss ordinances to own liabilities, other-bank tokens, and services? | Prudential policy, auditor, FINMA | External pilot and reporting |
| OQ-05 | Does the proposed multi-bank operator enter the FinMIA perimeter? | Counsel, FINMA | Shared network |
| OQ-06 | Which wallet/key arrangements constitute custody or outsourcing, and how is insolvency segregation proven? | Counsel, security, FINMA | External custody |
| OQ-07 | Does CARF/AEOI cover the selected tokenized-deposit service and customers? | Tax, legal | Production reporting design |
| OQ-08 | What is the final AMLO-FINMA revision and implementation date? | Compliance regulatory watch | 2026/27 AML controls |

Open questions remain visible until answered by a named authority and linked evidence. They should not be converted into assumptions merely to keep the technical schedule moving.

## 6. Regulatory-watch procedure

Regulatory watch produces a versioned change record, not only a list of links. The regulatory-policy owner coordinates the review; legal, compliance, finance, treasury, tax, technology, and product owners assess impact in their domains. Each new or changed source receives an identifier, status, affected claim, owner, action, due date, and decision record.

### Monthly during design and pilot

- Check FINMA news, guidance, circulars, consultations, and bank/FMI legal-basis pages.
- Check Federal Council/SIF digital-finance, AML, sanctions, and tax-reporting updates.
- Check SNB/SIX SIC and Project Helvetia material.
- Record new items, status changes, and potentially affected claims.

### At every product or architecture change

Repeat perimeter analysis if the project changes:

- issuer or debtor;
- eligible holder or geography;
- external wallet or custody model;
- transferability;
- ledger authority;
- network operator or participant class;
- settlement rail or asset;
- yield, guarantee, reserve, or investment feature.

### Before every approval gate

1. Verify official URL and consolidated text.
2. Record publication, amendment, and effective dates.
3. Confirm whether the source is binding, supervisory practice, proposal, or evidence.
4. Re-check every material claim against its cited passage.
5. Resolve or explicitly accept open questions.
6. Obtain counsel/auditor/FINMA confirmation where the source does not answer the product-specific question.

### Supersession and change workflow

1. Compare the current official index and consolidated text with the registered version.
2. Check amendment, effective, transitional, and repeal dates and the stated addressees.
3. Determine whether the new text replaces, supplements, or leaves the earlier source in force.
4. Identify every chapter, table, diagram, control, and open question that relies on the affected claim.
5. Update the claim and status label; do not silently replace a citation when the conclusion changes.
6. Record review, approval, implementation date, and any temporary transition position.

A minimal change-log entry should contain:

| Field | Example content |
|---|---|
| Change ID | `RW-2026-008` |
| Source and prior version | Stable source ID, title, previous amendment/effective date |
| New status | In force, future effective, proposal, superseded, or screened out |
| Affected claims and chapters | Exact conclusions and control documents requiring review |
| Decision and owner | No change, wording update, control change, or external advice required |
| Evidence and date | Official URL or file, passages checked, reviewer, and approval date |

If an official English translation differs from an official-language text or is expressly non-binding, legal review should rely on the authoritative text. The English research may continue to use official translations for accessibility while recording that limitation.

## What this means for the bank

Regulatory freshness is a maintained control, not a one-time research exercise. The source register makes it possible to see which conclusions rely on current law, which rely on supervisory guidance, and which remain design hypotheses.

Return to the [documentation index](README.md).
