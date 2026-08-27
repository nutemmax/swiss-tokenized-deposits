# Swiss Tokenized Deposits Research Modernization Plan

- **Plan date:** 24 August 2026
- **Audience:** Swiss banks assessing whether and how to adopt tokenized deposits
- **Initial delivery order:** documentation first, demo second
- **Current status:** high-priority implementation completed on 24 August 2026; medium-priority M1–M6, M9–M11, and M14 completed; M12 and M13 were removed from scope by the project owner on 27 August 2026; remaining medium- and low-priority work remains planned. See [`docs/appendices/audits/high-priority-implementation-log-2026-08-24.md`](docs/appendices/audits/high-priority-implementation-log-2026-08-24.md), [`docs/appendices/audits/decision-ready-documentation-log-2026-08-24.md`](docs/appendices/audits/decision-ready-documentation-log-2026-08-24.md), and [`docs/appendices/audits/demo-m11-implementation-log-2026-08-27.md`](docs/appendices/audits/demo-m11-implementation-log-2026-08-27.md).

## 1. Objective

Turn the repository into a coherent, current, source-traceable research package that can be presented to Swiss banks. The finished work should let a legal, compliance, finance, treasury, payments, technology, risk, and executive reader answer five questions without having to reconstruct the argument:

1. What is a tokenized deposit, and what is it not?
2. Which product and record-authority model is being proposed?
3. Why would a Swiss bank use it when SIC instant payments already exist?
4. What has been proven by Swiss and international initiatives, and what remains unresolved?
5. What legal, accounting, prudential, operational, and technical evidence is required before a pilot or production decision?

The documentation is the source of truth. The demo is an explanatory view of the documented models and must never contradict the documentation or simulate a successful state after a failed action.

## 2. Editorial and research principles

The work must not read as a series of patches. Before adding material, reorganize the surrounding chapter so that every section follows a deliberate narrative:

1. define the question;
2. explain the concept in plain language;
3. present authoritative facts and sources;
4. distinguish evidence from interpretation;
5. state the implication for a Swiss bank;
6. identify unresolved decisions and required evidence.

Apply these rules throughout the documentation:

- Give each concept one primary home and link to it elsewhere instead of repeating partial definitions.
- Keep the five-layer distinction between legal claim, representation, settlement asset, interface, and ledger.
- Keep payment instructions, mirrored deposits, native deposits, stablecoins, tokenized central-bank reserves, and wCBDC separate.
- Use `Verified fact`, `Interpretation`, `Design recommendation`, and `Open issue` consistently at claim level where the distinction matters.
- Put citations beside the claims they support, with exact article, paragraph, page, or section references where available.
- Prefer authoritative-language Swiss legal texts over translations for legal conclusions; use English translations for accessibility with the limitation stated.
- Record publication date, effective date, current status, date checked, affected claims, and next review trigger separately.
- Never treat a proof of concept, controlled real-value test, licence granted to another infrastructure, or industry proposal as regulatory approval for a bank's product.
- Separate workflow completion, technical ledger finality, accounting recognition, external settlement finality, and legal finality.
- Use diagrams and tables only when they materially shorten or clarify the explanation.
- End each chapter with concise implications for the bank, decisions still required, and the next logical chapter.

## 3. Delivery sequence

| Phase | Priority | Outcome | Exit condition |
|---|---|---|---|
| 0. Baseline and restructuring map | High | Record current chapter ownership, duplicated concepts, source dependencies, and demo claims | Every planned insertion has a logical destination before prose is changed |
| 1. Documentation currency and narrative | High | Bring Swiss developments, Agorá, SIC, and the proposed product model up to date | Chapters 00–10 read continuously and all time-sensitive claims are current to the new cutoff |
| 2. Documentation evidence and completeness | High/Medium | Strengthen legal, accounting, prudential, protection, governance, liquidity, and business-case evidence | Material claims are sourced or explicitly remain open issues |
| 3. Demo factual repair | High | Correct all P0 and P1 behavior and align every scenario with the documentation | No failed action produces successful state; all model invariants pass |
| 4. Demo clarity and coverage | Medium/Low | Correct P2/P3, accessibility, source display, and presenter flow | The demo can be used externally without verbal corrections |
| 5. Bank-presentation quality assurance | High | Independent content, source, scenario, and visual review | A reviewer can trace every material claim and reproduce every demo outcome |

## 4. High-priority work

### H1. Rebuild the executive narrative around a precise proposal

**Status:** implemented — 24 August 2026

**Primary files:** `docs/00-executive-summary.md`, `docs/01-tokenized-bank-deposits-foundations-and-product-types.md`, `docs/09-tokenized-deposit-implementation-roadmap-and-vendor-assessment.md`

**Work:**

- State explicitly that the recommended first pilot is a CBS-authoritative mirrored commercial-bank deposit unless the project owner selects another model.
- Define issuer, debtor, creditor, holder, authoritative record, settlement asset, eligible customer, transferability, redemption, interest, and deposit-protection hypothesis.
- State what is out of scope for the first pilot: native platform authority, unrestricted bearer transfer, retail CBDC, public stablecoin issuance, anonymous wallets, and cross-border production use unless later approved.
- Explain why the model is preferable for the first pilot and which evidence would justify moving to a native or shared-ledger authority model.
- Add a one-page decision record and a short list of executive decisions requested from a bank.

**Acceptance criteria:** a reader can describe the proposed product and its exclusions without consulting another chapter; the default demo model is either the proposed model or clearly labelled as a comparison.

### H2. Add a complete, current Swiss tokenized-money landscape

**Status:** implemented — 24 August 2026

**Primary files:** `docs/00-executive-summary.md`, `docs/02-retail-and-wholesale-tokenized-deposit-use-cases.md`, `docs/08-project-agora-and-cross-border-tokenized-deposits.md`, `docs/10-tokenized-deposit-sources-and-regulatory-watch.md`

**Work:**

- Replace the four-item initiative comparison with a logically ordered Swiss landscape covering SIC/SIC IP, the SBA 2023 proposal, the SBA 2025 PoC and continued 2026 work, UBS Digital Cash, UBS–Ant, Project Helvetia, BX Digital's RTGS link, SNB digital repos, Project Agorá, and the CHF stablecoin sandbox.
- For each initiative, identify the claim or settlement asset, authority model, participants, technology, legal status, live/prototype status, demonstrated use case, and what it does not prove.
- Add the seven Swiss private-sector Agorá participants: AMINA Bank, Banque Cantonale Vaudoise, Basler Kantonalbank, PostFinance, SIX Digital Exchange, Sygnum Bank, and UBS.
- State explicitly that no publicly announced production, multi-bank Swiss deposit-token scheme was identified as of the research cutoff.

**Key sources:** CH-PAY-01 through CH-PAY-13 and IND-01 through IND-09 in section 10.

**Acceptance criteria:** the executive summary and chapter 08 present the same current landscape; no initiative is described as more mature or legally conclusive than its source permits.

### H3. Update Project Agorá from the May report to the current project status

**Status:** implemented — 24 August 2026

**Primary files:** `docs/08-project-agora-and-cross-border-tokenized-deposits.md`, `docs/10-tokenized-deposit-sources-and-regulatory-watch.md`, relevant summaries and demo source notes

**Work:**

- Preserve the report-era fact that seven central banks participated in the May 2026 report, then state separately that Bank of Canada joined and the current count is eight.
- Add the July 2026 controlled real-value testing: 28 financial institutions and central banks, 17 scenarios, values of approximately CHF 9,000–125,000, and approximately CHF 800,000 total.
- Explain that real-value testing is stronger evidence than simulation but is not production deployment.
- Update the legal-finality discussion: the project concluded that settlement finality could be achieved across the original seven jurisdictions, while technical, operational, contractual, governance, resilience, and production work remains.
- Clarify the difference between balance-holding/direct ledger roles and the broader project roster, which also includes infrastructures, networks, and messaging providers.
- Preserve the platform-authoritative golden-source distinction and the five-stage workflow.

**Key sources:** INT-01 through INT-04 and the local PDF in LOC-01.

**Acceptance criteria:** all Agorá numbers include an as-of date and scope; report-era and current facts cannot be mistaken for one another.

### H4. Reframe the value proposition against the real Swiss payments baseline

**Status:** implemented — 24 August 2026

**Primary files:** `docs/00-executive-summary.md`, `docs/02-retail-and-wholesale-tokenized-deposit-use-cases.md`, `docs/06-tokenized-deposit-issuance-transfers-redemption-and-settlement.md`, `docs/08-project-agora-and-cross-border-tokenized-deposits.md`

**Work:**

- Explain that SIC5 already supports final account-to-account instant payments in under ten seconds, 24/7, and covers more than 95% of Swiss customer-payment volume through enabled institutions.
- Remove or qualify broad statements that conventional Swiss payments are not real-time or not available around the clock.
- Test every use case against a counterfactual: ordinary CBS automation, SIC instant payments, API/open-banking orchestration, escrow, or existing FMI functionality.
- Retain only tokenization benefits that require or materially benefit from programmable shared state, composability, atomic asset/cash workflows, multi-party coordination, cross-border path discovery, or a natively digital cash leg.
- Add explicit anti-fit criteria and a `use ordinary payments instead` outcome.

**Key sources:** CH-PAY-01, CH-PAY-02, CH-PAY-03, CH-PAY-04, and CH-PAY-05.

**Acceptance criteria:** no use case is justified by blockchain or tokenization alone; each shortlisted pilot has a measurable advantage over the non-tokenized baseline.

### H5. Upgrade legal claims to claim-level traceability

**Status:** implemented — 24 August 2026

**Primary files:** `docs/03-swiss-laws-and-finma-rules-for-tokenized-deposits.md`, `docs/06-tokenized-deposit-issuance-transfers-redemption-and-settlement.md`, `docs/10-tokenized-deposit-sources-and-regulatory-watch.md`

**Work:**

- Replace general landing-page support with exact Banking Act/Ordinance, FinMIA/FinMIO, AMLA/AMLO, FADP, bank-secrecy, insolvency, and system-rule passages where public.
- Build a legal claim matrix for each proposed flow: debtor, creditor, constitutive record, governing law, acceptance, transfer event, finality event, insolvency treatment, depositor-protection hypothesis, custody, outsourcing, privacy, and cross-border data transfer.
- Keep external decisions open where public law does not decide the product-specific result.
- Add required deliverables from Swiss counsel, participant banks, FINMA, the external auditor, and the relevant system operator.
- Preserve the distinction between binding law, supervisory practice, consultation, adjacent precedent, industry evidence, interpretation, and design recommendation.

**Key sources:** CH-REG-01 through CH-REG-25.

**Acceptance criteria:** every material legal conclusion has an exact source or an explicit open-issue ID; no prototype is cited as legal approval.

### H6. Make accounting, prudential, liquidity, and depositor-protection analysis decision-grade

**Status:** implemented — 24 August 2026

**Primary files:** `docs/04-tokenized-deposit-accounting-prudential-treatment-and-customer-protection.md`, `docs/06-tokenized-deposit-issuance-transfers-redemption-and-settlement.md`, `docs/10-tokenized-deposit-sources-and-regulatory-watch.md`

**Work:**

- Separate illustrative journals from approved accounting policy.
- Map the selected model to the FINMA Accounting Ordinance/Circular, applicable accounting framework, regulatory returns, Basel SCO60, Swiss capital/liquidity implementation, minimum reserves, LCR/NSFR, large exposures, and resolution reporting.
- Obtain an auditor-reviewed position on recognition, presentation, interest, fees, reconciliation, suspense/repair accounts, and interbank failure states.
- Establish whether and how token-enabled balances aggregate with ordinary balances for depositor protection; use exact Banking Act/Ordinance provisions and esisuisse material, then retain product-specific treatment as open until confirmed.
- Add 24/7 liquidity scenarios: SIC IP and RTGS availability, prefunding, caps, queues, weekends, intraday credit, mass redemption, and cross-currency fragmentation.

**Key sources:** CH-REG-03, CH-REG-07, CH-REG-16, CH-REG-17, CH-REG-18, CH-REG-24, CH-REG-25, INT-05, INT-06, and CH-PAY-08.

**Acceptance criteria:** tables clearly separate `illustrative treatment`, `authoritative requirement`, and `external confirmation required`.

### H7. Repair the source-freshness and provenance process

**Status:** implemented — 24 August 2026

**Primary files:** `docs/10-tokenized-deposit-sources-and-regulatory-watch.md`, `docs/sources/README.md`, all chapters with research-cutoff labels

**Work:**

- Set a new repository-wide research cutoff and make all chapters use it.
- Add the 18 May 2026 SIC disclosure and the 30 July 2026 Agorá update that were missed before the previous 14 August cutoff.
- Add stable local copies of decisive PDFs where licensing and repository policy permit, at minimum the SBA 2023 and 2025 reports and current SNB/SIC disclosures.
- Give every source a stable ID, authority class, publication/effective date, checked date, affected claims, exact passages, next trigger, and supersession relationship.
- Add a source-change log showing which claims were reviewed and whether wording, controls, or open questions changed.
- Record screened-but-not-applicable sources so completeness can be demonstrated without importing unrelated crypto rules.

**Acceptance criteria:** a newly published source cannot be marked checked without a recorded applicability decision and affected-claim review.

### H8. Fix all demo P0 failures before any other demo enhancement

**Status:** implemented — 24 August 2026

**Primary files:** `demo/deprecated/v1/app.js`, `demo/deprecated/v1/demo-spec.json`, demo audit and future tests

**Work:**

- Gate state mutation on successful completion evidence instead of computing success and overlaying a failure label afterward.
- For SIC unavailability, leave SNB balances unchanged and keep the source claim reserved or locked; do not extinguish it.
- For receiving-bank rejection, do not create a recipient claim or change holder/debtor. If external settlement is already final, show a due-to, suspense, or repair state.
- For DLT/key/contract failure, do not create the failed token, authoritative record, or wrapped destination object.
- Apply the same semantics to interbank, netting, mint, CBDC comparison, and bridge scenarios.

**Source of findings:** LOC-03 and the state transitions in `demo/deprecated/v1/app.js`.

**Acceptance criteria:** every failure snapshot preserves the last valid state plus an explicit reservation, suspense, or repair position; no failed action produces the object or balance movement that failed.

### H9. Fix all demo P1 model and lifecycle inconsistencies

**Status:** implemented — 24 August 2026

**Primary files:** `demo/deprecated/v1/app.js`, `demo/deprecated/v1/demo-spec.json`, `demo/index.html`, presenter script and claim map

**Work:**

- Replace the single generic finality field with separate workflow, ledger, accounting, external-settlement, and legal-finality statuses where relevant.
- Correct internal-flow status wording, token burn timing, same-bank holder timing, and receiving-bank acceptance timing.
- Stop treating a payment-instruction token as deposit supply or hiding the existing customer deposit.
- Show ordinary CBS/GL postings in advanced instruction flows.
- Label the mirrored interbank variant explicitly as burn–settle–issue when that is the modeled mechanism.
- Make correspondent, native, PvP, wCBDC, bridge, and stablecoin scenarios internally coherent rather than model-generic.
- Separate stablecoin issuer, reserve assets, bank guarantees, settlement system, and customer-facing bank roles.

**Source of findings:** LOC-03, especially findings F-04 through F-20.

**Acceptance criteria:** every scenario identifies the claim, debtor, holder, authority, settlement asset, and finality events at every step.

### H10. Add executable demo invariants and scenario acceptance tests

**Status:** implemented — 24 August 2026

**Primary files:** new test files in a clearly documented test location; `demo/deprecated/v1/demo-spec.json`; demo audit

**Work:**

- Test supply conservation, one-liability accounting, model-specific balance invariants, idempotency, successful-step gating, holder/debtor transitions, and failure recovery.
- Create a matrix covering each model × scenario × step × applicable failure.
- Assert that non-applicable failures are unavailable in the UI.
- Add explicit expected snapshots for P0 and P1 regression cases.
- Add a manual browser checklist for visual state, labels, focus order, responsive layout, and source links.

**Acceptance criteria:** the complete matrix passes automatically where behavior is deterministic, and every manual-only check has a recorded reviewer and result.

## 5. Medium-priority work

### M1. Make the SBA naming conflict prominent

**Status:** implemented — 24 August 2026

Explain early that the SBA's 2025 `Deposit Token` PoC used an on-chain payment instruction under Swiss contract law to trigger off-chain bank-account movements. Reserve `tokenized deposit` in the research for an actual representation of the commercial-bank liability, and label all SBA PoC diagrams accordingly.

### M2. Add monetary-system concepts missing from the foundations

**Status:** implemented — 24 August 2026

Add singleness of money, par convertibility, elasticity, integrity, fragmentation, settlement-anchor quality, and the relationship between commercial-bank money and central-bank money. Explain why interoperability is both technical and monetary—not merely an API or token-standard problem.

**Sources:** INT-07 through INT-11 and CH-PAY-05.

### M3. Add a quantitative business-case framework

**Status:** implemented — 24 August 2026

Define baseline and target measures for payment time, cut-off failures, investigations, repair rates, reconciliation effort, liquidity usage, collateral, fraud loss, operational staffing, integration cost, and duplicated infrastructure. Do not claim savings until a measured baseline and pilot result exist.

### M4. Expand scheme governance and operating-model analysis

**Status:** implemented — 24 August 2026

Cover operator/legal entity, participant eligibility, admission and suspension, rule changes, software upgrades, liability, loss allocation, default management, dispute resolution, data access, audit rights, participant exit, intellectual property, vendor concentration, and fee model.

### M5. Add a cross-border corridor matrix

**Status:** implemented — 24 August 2026

For each illustrative corridor, identify currency, issuer, debtor, jurisdiction, settlement asset, correspondent/FX provider, governing law, sanctions and Travel Rule duties, data-transfer basis, finality rule, insolvency forum, operating hours, and repair owner.

### M6. Strengthen privacy and bank-secrecy analysis

**Status:** implemented — 24 August 2026

Add exact FADP, ordinance, Banking Act article 47, outsourcing, foreign-access, metadata leakage, regulatory-access, data-retention, and deletion considerations. Compare transparent public-chain, permissioned application, privacy-group, and commitment-based designs.

### M7. Resolve tax-reporting boundaries more precisely

Map the selected product to Swiss AEOI/CARF status and the OECD definitions, including possible treatment of specified electronic-money products and ordinary bank-account reporting. Keep the conclusion open until confirmed by tax counsel and official Swiss guidance.

### M8. Add bounded international comparators

Add UK tokenized-sterling/RLN work, HKMA Ensemble, and ECB Pontes/Appia. Compare architecture, money form, settlement asset, authority, maturity, and proven result. State clearly that these are design comparators, not Swiss legal authority.

**Sources:** CMP-01 through CMP-05.

### M9. Convert the open-question register into a decision ledger

**Status:** implemented — 24 August 2026

Add status, owner, approver, required evidence, opened date, due date, dependencies, last review, decision, residual risk, and linked chapter/claim. Add questions for scheme governance, business case, privacy, cross-border corridors, SIC operating model, and demo model selection.

### M10. Add four cross-document visuals

**Status:** implemented — 24 August 2026

Create and reuse, rather than duplicate:

1. Swiss tokenized-money and settlement landscape;
2. claim → record → workflow → settlement asset → legal-finality timeline;
3. proven / demonstrated / proposed / unresolved matrix by initiative;
4. model-selection decision tree with an explicit `do not tokenize` branch.

### M11. Align the demo, presenter script, and claim map

**Status:** implemented — 27 August 2026

Add the actual Agorá five-stage workflow and the conditional-payment example promised by the presenter script. Ensure every visible factual claim appears in the claim map with source, qualification, demo location, and research cutoff.

### M12. Add visible demo provenance and limitations

**Status:** removed from demo scope by project owner — 27 August 2026

The stakeholder-facing demo remains visually focused and illustrative. Research provenance, assumptions, sources, and limitations remain in the documentation, demo specification, claim map, and presenter material rather than being added as visible interface controls.

### M13. Complete failure coverage

**Status:** removed from plan by project owner — 27 August 2026

No additional exhaustive failure catalogue is planned. The implemented high-priority failure invariants and regression checks remain part of the demo.

### M14. Preserve controlled-test versus production boundaries

**Status:** implemented — 24 August 2026

Use a consistent maturity vocabulary: concept, simulation, PoC, sandbox, controlled real-value test, pilot in production infrastructure, limited production service, and production scheme. Apply it to SBA, UBS, Helvetia, BX Digital, Agorá, and the stablecoin sandbox.

## 6. Low-priority work

### L1. Repair repository navigation and provenance gaps

- Remove or restore the root README references to absent `research/`, `src/`, and `tests/` paths.
- Restore the archived material referenced by `docs/archive/2026-08-14/` or remove the dead link and preserve its provenance another way.
- Ensure every appendix is reachable from `docs/README.md`.

### L2. Expand the local source library

Store decisive, stable PDF sources under a predictable authority/year structure, record file hashes where useful, and link the local artifact and canonical web location from the source register.

### L3. Standardize terminology and language

Use `tokenized deposit` in research prose, retain official source titles in their published spelling, and explain `tokenisation/tokenization` only as a source-language difference. Standardize CBS, GL, SIC, wCBDC, DLT, RTGS, PvP, and DvP abbreviations.

### L4. Improve demo accessibility and responsive behavior

Fix small text, clipped drawer content, sub-980-pixel layouts, tab semantics, nested SVG focus, timeline semantics, keyboard-help discoverability, selection cues, and no-script/fallback consistency.

### L5. Add a concise executive brief

Create a one-page presentation entry point containing the proposed model, business rationale, Swiss landscape, what has been proven, top unresolved issues, pilot boundary, principal risks, and requested decisions.

### L6. Add a maintained news and change log

Record publication date, review date, source ID, affected claims, decision, owner, and next action for each relevant development. A research cutoff without an auditable change log is insufficient.

## 7. Chapter-by-chapter restructuring map

| Chapter | Intended role after refactoring | Principal changes |
|---|---|---|
| `00-executive-summary.md` | Bank decision brief | Precise proposal, Swiss baseline, adoption rationale, proven/unproven evidence, top open decisions, staged recommendation |
| `01-...foundations-and-product-types.md` | Canonical concepts and taxonomy | Monetary-system concepts, SBA naming conflict, authority models, model-selection tree, glossary cleanup |
| `02-...use-cases.md` | Evidence-based use-case selection | SIC/API counterfactual, measurable value, anti-fit criteria, prioritized bank pilot cases |
| `03-...swiss-laws-and-finma-rules.md` | Swiss legal and supervisory analysis | Exact provisions, claim matrix, privacy/bank secrecy, status labels, external-opinion requirements |
| `04-...accounting-prudential...md` | Finance, treasury, protection, and resolution analysis | Authoritative-versus-illustrative treatment, auditor deliverables, esisuisse analysis, 24/7 liquidity |
| `05-...architecture-and-ledger-records.md` | Target architecture and authority boundaries | Selected-model architecture first, alternatives second, data/privacy boundaries, governance controls |
| `06-...issuance-transfers...md` | Canonical lifecycle and finality model | Model-specific flows, finality layers, failure/suspense states, cross-border corridor matrix |
| `07-...risks-controls...md` | Control, resilience, and recovery framework | Expanded failure taxonomy, operating model, 24/7 recovery, evidence and test ownership |
| `08-...project-agora...md` | Current initiative landscape and Agorá deep dive | Current Agorá status, Swiss participants, legal result, real-value testing, Swiss initiative comparison |
| `09-...roadmap-and-vendor...md` | Adoption roadmap and evidence gates | Product decision record, quantitative business case, governance, external approvals, stage gates |
| `10-...sources-and-regulatory-watch.md` | Authoritative source and decision control | Complete sources below, claim-level passages, change log, supersession, open-question ledger |

## 8. Documentation quality gates

Documentation is ready for bank presentation only when all of the following are true:

- [ ] One model and pilot boundary are explicitly proposed.
- [ ] Every chapter uses the same research cutoff and terminology.
- [ ] Every time-sensitive claim has been checked against the latest authoritative source.
- [ ] Every material legal/accounting/prudential claim is sourced or marked open.
- [ ] Industry and prototype evidence is never presented as regulatory approval.
- [ ] SIC instant payments are used as the Swiss baseline.
- [ ] Agorá report-era and current project facts are distinguished.
- [ ] The Swiss initiative landscape is complete and maturity-labelled.
- [ ] Every diagram agrees with the prose and accounting/settlement model.
- [ ] The executive summary can stand alone without oversimplifying unresolved issues.
- [ ] A legal, accounting, compliance, treasury, technology, and operations reviewer has signed off on their domain or recorded open objections.

## 9. Demo quality gates

The demo is ready for external use only when all of the following are true:

- [ ] All three P0 and all seventeen P1 audit findings are resolved and regression-tested.
- [ ] Failure states cannot display successful balance or claim creation.
- [ ] Claim, debtor, holder, authority, settlement asset, and finality are visible and correct at each step.
- [ ] Payment instructions are not displayed as deposit supply.
- [ ] Stablecoin, deposit, and wCBDC roles are not conflated.
- [ ] Each scenario exposes only applicable failures.
- [ ] The default model matches or clearly contrasts with the recommended pilot.
- [ ] Sources, cutoff, assumptions, and limitations are maintained in the research pack, demo specification, claim map, and presenter material without cluttering the stakeholder-facing interface.
- [ ] Presenter script, claim map, demo specification, code, and visible UI agree.
- [ ] Responsive, keyboard, focus, text-size, and screen-reader checks pass.

## 10. Complete source inventory for this plan

The identifiers below should be reused in the documentation source register and claim map. Inclusion means the source must be reviewed for the stated work; it does not mean every source applies to the final selected product.

### 10.1 Local repository evidence

| ID | Source | Planned use |
|---|---|---|
| LOC-01 | [`docs/sources/bis/project-agora-2026.pdf`](docs/sources/bis/project-agora-2026.pdf) | Agorá May 2026 architecture, workflow, privacy, legal analysis, limitations |
| LOC-02 | [`docs/appendices/audits/archive-content-mapping-2026-08-14.md`](docs/appendices/audits/archive-content-mapping-2026-08-14.md) | Prior-note provenance and archive reconciliation |
| LOC-03 | [`docs/appendices/audits/demo-complete-factual-state-and-ui-audit-2026-08-14.md`](docs/appendices/audits/demo-complete-factual-state-and-ui-audit-2026-08-14.md) | Complete P0–P3 factual and UI findings |
| LOC-04 | [`docs/appendices/audits/demo-factual-audit-2026-08-14.md`](docs/appendices/audits/demo-factual-audit-2026-08-14.md) | Earlier factual-audit evidence |
| LOC-05 | [`docs/appendices/demo/claim-map.md`](docs/appendices/demo/claim-map.md) | Demo claim traceability |
| LOC-06 | [`docs/appendices/demo/presenter-script.md`](docs/appendices/demo/presenter-script.md) | Presentation-flow requirements |

### 10.2 Swiss law, regulation, supervision, protection, and tax

| ID | Source | Status/use |
|---|---|---|
| CH-REG-01 | [Fedlex](https://www.fedlex.admin.ch/en/home) | Authoritative consolidated Swiss legislation; retrieve exact official-language provisions |
| CH-REG-02 | [FINMA legal basis for banks](https://www.finma.ch/en/documentation/legal-basis/laws-and-ordinances/banks/) | Banking Act, Banking Ordinance, insolvency and prudential framework |
| CH-REG-03 | [FINMA accounting rules for banks](https://www.finma.ch/en/news/2019/11/20191114-mm-rechnungslegung/) | FINMA Accounting Ordinance and Circular 2020/1 |
| CH-REG-04 | [FINMA legal basis for financial-market infrastructures](https://www.finma.ch/en/documentation/legal-basis/laws-and-ordinances/financial-market-infrastructures/) | FinMIA/FinMIO, payment-system and DLT-facility perimeter, finality |
| CH-REG-05 | [FINMA AML legal basis](https://www.finma.ch/en/documentation/legal-basis/laws-and-ordinances/anti-money-laundering-act-%28amla%29/) | AMLA, ordinances, due diligence and reporting |
| CH-REG-06 | [FINMA Guidance 02/2019: payments on the blockchain](https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/4dokumentation/finma-aufsichtsmitteilungen/20190826-finma-aufsichtsmitteilung-02-2019.pdf) | Originator/beneficiary information and blockchain-payment practice |
| CH-REG-07 | FINMA Circular 2018/3 Outsourcing, available through FINMA's circular register | Provider governance, access, audit, data location, and exit |
| CH-REG-08 | [FINMA Circular 2023/1: operational risks and resilience](https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/rundschreiben/finma-rs-2023-01-20221207.pdf) | Operational risk, critical data, ICT, resilience |
| CH-REG-09 | [FINMA supervisory auditing](https://www.finma.ch/en/supervision/cross-sector-issues/auditing/auditing-of-banks/) | Audit strategy, evidence, controls, and reporting |
| CH-REG-10 | [FINMA fintech/identification material](https://www.finma.ch/en/authorisation/fintech/) | Current online/video identification framework |
| CH-REG-11 | [FINMA consultation on Circular 2016/7](https://www.finma.ch/en/news/2025/12/20251216-mm-video-online-id/) | Proposed identification revision; not final at prior cutoff |
| CH-REG-12 | [FINMA cyber-risk guidance 03/2024](https://www.finma.ch/en/news/2024/06/20240607-mm-am-cyberrisiken/) | Cyber weaknesses, reporting, exercises, outsourcing |
| CH-REG-13 | [FINMA stablecoin guidance 06/2024](https://www.finma.ch/en/news/2024/07/20240726-m-am-06-24-stablecoins/) | Stablecoin classification, guarantees, AML, sanctions, comparison boundary |
| CH-REG-14 | [FINMA cryptobased-asset disclosure guidance 03/2025](https://www.finma.ch/en/news/2025/09/20250905-meldung-am-kryptovermoegenswerte/) | Customer custody disclosure; distinguish from own liabilities |
| CH-REG-15 | [FINMA crypto-services index](https://www.finma.ch/en/documentation/dossier/dossier-fintech/auf-einen-blick-aufstellung-der-krypto-dienstleistungen/) | Applicability screen for custody, staking, funds, exchanges, and adjacent services |
| CH-REG-16 | [FINMA custody guidance 01/2026](https://www.finma.ch/en/news/2026/01/20260112-mm-am-01-26/) | Custody, providers, foreign insolvency, retained bank responsibility |
| CH-REG-17 | [FINMA RDO-FINMA release](https://www.finma.ch/en/news/2026/05/20260520-mm-rvv-finma/) | Risk diversification from 1 January 2027 |
| CH-REG-18 | [FINMA LiqO-FINMA release](https://www.finma.ch/en/news/2026/07/20260707-mm-liqv-finma/) | Liquidity risk from 1 January 2027 |
| CH-REG-19 | [FINMA AML risk-analysis guidance 04/2026](https://www.finma.ch/en/news/2026/06/20260604-mm-am-04-26/) | Risk tolerance and product/customer/country alignment |
| CH-REG-20 | [FINMA quantum guidance 05/2026](https://www.finma.ch/en/news/2026/07/20260709-mm-am-05-26/) | Cryptographic inventory, migration, crypto-agility |
| CH-REG-21 | [FINMA AMLO-FINMA partial revision](https://www.finma.ch/en/news/2026/05/20260512-mm-anh-gwv-finma/) | Consultation status and future AML controls |
| CH-REG-22 | [Revised AMLA and Transparency Act](https://www.efd.admin.ch/en/newnsb/x3sKLxCJ6S3dQJtfvy0Tb) | Changes effective 1 October 2026 |
| CH-REG-23 | [Swiss payment-instrument and crypto-institution proposal](https://www.sif.admin.ch/en/newnsb/x4TMWQ1SWofNoFx7XyHhY) | Proposed adjacent licence and consumer-protection regime |
| CH-REG-24 | [FINMA depositor-protection overview](https://www.finma.ch/en/supervision/banks-and-securities-firms/depositor-protection/) and [esisuisse FAQ](https://www.esisuisse.ch/en/deposit-insurance/questions-and-answers-faq) | Protection, preference, aggregation, payout; product-specific treatment still requires confirmation |
| CH-REG-25 | [Swiss CARF/AEOI status](https://www.sif.admin.ch/en/framework-for-the-automatic-exchange-of-information-aeoi-on-crypto-assets) and [OECD CARF/CRS standard](https://www.oecd.org/en/publications/international-standards-for-automatic-exchange-of-information-in-tax-matters_896d79d1-en/full-report/component-6.html) | Swiss implementation status and product classification |
| CH-REG-26 | [FINMA Risk Monitor 2025](https://www.finma.ch/en/news/2025/11/20251117-mm-risikomonitor/) | Supervisory risk context |
| CH-REG-27 | [FINMA Annual Report 2025](https://www.finma.ch/en/news/2026/04/20260421-mm-jmk-2026/) | DLT-market and crypto-custody supervisory context |
| CH-REG-28 | [FINMA Circular 2026/1: nature-related financial risks](https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/rundschreiben/finma-rs-2026-01.pdf) | Screened adjacent source; not tokenized-deposit classification authority |

### 10.3 Swiss payments, central-bank, and market initiatives

| ID | Source | Planned use |
|---|---|---|
| CH-PAY-01 | [SNB SIC System and Disclosure Report, 18 May 2026](https://www.snb.ch/en/publications/sicsystem-disclosure/sicsystem-disclosure-all/sicsystem_disclosure_2025) | Current SIC governance, settlement, operations, and PFMI disclosure |
| CH-PAY-02 | [SIX Instant Payments](https://www.six-group.com/en/products-services/banking-services/billing-and-payments/instant-payments.html) | SIC5, under-ten-second settlement, 24/7 availability, coverage, 2026 rollout |
| CH-PAY-03 | [SIX Instant Payments Bridge](https://www.six-group.com/en/products-services/banking-services/billing-and-payments/instant-payments-bridge.html) | Technical access for payment solutions and retail-scheme baseline |
| CH-PAY-04 | [SNB–ECB instant-payment interlinking](https://www.snb.ch/en/publications/communication/press-releases/2025/pre_20250929_1) | Possible SIC IP–TIPS cross-currency baseline |
| CH-PAY-05 | [SNB Swiss Payments Vision](https://www.snb.ch/en/publications/communication/speeches/2023/ref_20230330_amrtmo) | Central-/commercial-bank money relationship, central-bank settlement, interoperability |
| CH-PAY-06 | [SNB Project Helvetia](https://www.snb.ch/en/the-snb/mandates-goals/payment-transactions/projekt_helvetia) | Current integrated wCBDC and synchronized RTGS-link work through at least June 2028 |
| CH-PAY-07 | [SNB Project Helvetia FAQ](https://www.snb.ch/en/services-events/digital-services/faq-overview/qas_helvetia) | Eligibility, purpose, non-commitment, operating details |
| CH-PAY-08 | [SNB digital-repo findings](https://www.snb.ch/en/publications/research/economic-notes/2025/economic_note_2025_14) | Feasibility, fragmentation, collateral-management, and standards limitations |
| CH-PAY-09 | [FINMA licence for BX Digital](https://www.finma.ch/en/news/2025/03/20250318-mm-dlt-handelssystem/) | Production-adjacent public-chain/SIC DvP precedent and control expectations |
| CH-PAY-10 | [SIX ISO 20022 Swiss Payment Standards](https://www.six-group.com/en/products-services/banking-services/payment-standardization/standards/iso-20022.html) | Current message and integration baseline |
| CH-PAY-11 | [UBS Digital Cash pilot](https://www.ubs.com/global/en/media/display-page-ndp/en-20241107-ubs-digital-cash.html) | Multi-currency corporate, cross-border, and intragroup payment evidence |
| CH-PAY-12 | [UBS–Ant International partnership](https://www.ubs.com/global/sc/media/display-page-ndp/en-20251117-ubs-digital-cash-global-treasury-management.html) | Tokenized deposits, treasury, liquidity, and real-time multi-currency work |
| CH-PAY-13 | [Joint CHF stablecoin sandbox](https://www.ubs.com/global/it/media/display-page-ndp/en-20260408-stablecoin.html) | Adjacent Swiss digital-money alternative and competitive comparison |

### 10.4 Swiss banking-industry sources

| ID | Source | Planned use |
|---|---|---|
| IND-01 | [SBA Deposit Token white paper, 2023](https://www.swissbanking.ch/_Resources/Persistent/9/4/1/1/941178de59b98030206fc15ac8c99012f65df30b/SBA_The_Deposit_Token_EN_2023.pdf) | Original Swiss industry models, use cases, and position |
| IND-02 | [SBA Deposit Token PoC results, 2025](https://www.swissbanking.ch/_Resources/Persistent/7/9/e/a/79ea024daa9834c99fc299db5d5f69c4317525a2/20250916_Ergebnisbericht%20PoC%20Deposit%20Token_EN_FINAL.pdf) | Payment-instruction model, mirror accounts, legal analysis, limitations, next phase |
| IND-03 | [SBA PoC announcement](https://www.swissbanking.ch/en/media-politics/press-releases/milestone-for-the-swiss-financial-center-deposit-token-proof-of-concept-successfully-completed) | Public result and participating banks |
| IND-04 | [SBA project-continuation update](https://www.swissbanking.ch/en/media-politics/news/insight-4-25-en-combining-the-advantages-of-blockchain-with-the-security-of-bank-deposits) | Board approval for continued work and broader participation discussions |
| IND-05 | [SBA 2026 strategic priorities](https://www.swissbanking.ch/en/about-us/association/strategic-priorities) | Current industry-policy priority for deposit tokens and stablecoins |
| IND-06 | [SBA digital assets and currencies overview](https://www.swissbanking.ch/en/topics/digitalisation-innovation-cyber-security/digital-assets-and-digital-currencies) | Current terminology and industry framing |
| IND-07 | [PostFinance–Swiss Stablecoin 2023 PoC](https://www.postfinance.ch/en/about-us/media/newsroom/partnership-with-swiss-stablecoin-ltd.html) | Earlier CHF digital-money experiment and cardossier use case |
| IND-08 | [PostFinance 2025 annual report](https://www.postfinance.ch/content/dam/pfch/doc/440_459/450_01_2025_en.pdf) | Current institutional innovation and prototype context |
| IND-09 | [Sygnum/SBA PoC announcement](https://www.sygnum.com/news/milestone-for-the-swiss-financial-center-deposit-token-proof-of-concept-successfully-completed/) | Participant description and cross-check of public PoC claims |

### 10.5 Project Agorá and international standards

| ID | Source | Planned use |
|---|---|---|
| INT-01 | [BIS Project Agorá report, May 2026](https://www.bis.org/publ/othp110.pdf) | Canonical report and participant roster; local copy is LOC-01 |
| INT-02 | [Current BIS Project Agorá page, updated 30 July 2026](https://www.bis.org/about/bisih/topics/fmis/agora.htm) | Eight central banks, real-value testing, current maturity |
| INT-03 | [BIS Agorá result announcement, 27 May 2026](https://www.bis.org/press/p260527.htm) | Report result, Bank of Canada addition, legal-finality conclusion, future work |
| INT-04 | [BIS Project Agorá FAQ](https://www.bis.org/innovation_hub/projects/agora_faq.pdf) | Project scope and definitions; reconcile any stale participant count |
| INT-05 | [Basel Framework SCO60](https://www.bis.org/basel_framework/chapter/SCO/60.htm?inforce=20260101) | Cryptoasset and cryptoliability prudential mapping |
| INT-06 | [Basel Committee tokenized-deposit/stablecoin discussion](https://www.bis.org/press/p240703.htm) | Issuer-side prudential context and policy work |
| INT-07 | [CPMI: Tokenisation in the context of money and other assets](https://www.bis.org/cpmi/publ/d225.htm) | Definitions, governance, FMI risk, central-bank considerations |
| INT-08 | [BIS Annual Economic Report 2023, Chapter III](https://www.bis.org/publ/arpdf/ar2023e3.htm) | Unified-ledger foundations |
| INT-09 | [BIS Annual Economic Report 2024, Chapter III](https://www.bis.org/publ/arpdf/ar2024e3.htm) | Tokenized monetary-system blueprint and Agorá context |
| INT-10 | [BIS Annual Economic Report 2025, Chapter III](https://www.bis.org/publ/arpdf/ar2025e3.htm) | Singleness, elasticity, integrity, tokenized commercial-bank money |
| INT-11 | [BIS Annual Economic Report 2026, Chapter III](https://www.bis.org/publ/arpdf/ar2026e3.htm) | Current macro-financial, stablecoin, tokenized-deposit, and central-bank analysis |
| INT-12 | [FATF Recommendations](https://www.fatf-gafi.org/en/publications/Fatfrecommendations/Fatf-recommendations.html) | AML/CFT baseline |
| INT-13 | [FATF Recommendation 16 update](https://www.fatf-gafi.org/en/publications/Fatfrecommendations/update-Recommendation-16-payment-transparency-june-2025.html) | Payment transparency and Travel Rule changes |
| INT-14 | [Basel foreign-exchange settlement-risk guidance](https://www.bis.org/basel_consolidated_guidelines/chapter/RMA/20.htm) | PvP, principal risk, and FX settlement controls |

### 10.6 International design comparators

| ID | Source | Planned use |
|---|---|---|
| CMP-01 | [UK Finance regulated-liability-network experimentation](https://www.ukfinance.org.uk/news-and-insight/press-release/uk-finance-announces-successful-outcome-regulated-liability-network) | Shared-ledger and regulated-liability comparison |
| CMP-02 | [UK Finance live tokenized-sterling pilot](https://www.ukfinance.org.uk/news-and-insight/press-release/uk-finance-announces-live-pilot-phase-deliver-tokenised-sterling) | Live-pilot use cases and tokenization-as-a-service comparison |
| CMP-03 | [HKMA Project Ensemble briefing, May 2026](https://www.hkma.gov.hk/media/eng/doc/about-the-hkma/legislative-council-issues/20260504e1.pdf) | Tokenized deposits, real-value activity, and tokenized central-bank-money roadmap |
| CMP-04 | [ECB Pontes and Appia update, May 2026](https://www.ecb.europa.eu/press/intro/news/html/ecb.mipnews20260527.en.html) | European short- and long-term DLT settlement plans |
| CMP-05 | [ECB Appia contact group, August 2026](https://www.ecb.europa.eu/press/intro/news/html/ecb.mipnews260819.en.html) | Current stakeholder participation and design work |

## 11. Recommended first implementation batch

Do not begin with isolated paragraph insertions. The first batch should be reviewed and merged as one coherent documentation release:

1. Set the new research cutoff and update the source register.
2. Rebuild chapter 08 as the current Swiss landscape plus Agorá deep dive.
3. Refactor chapters 00–02 so the proposed product, terminology, SIC baseline, and use-case test are consistent.
4. Update the affected Agorá, SIC, Helvetia, SBA, UBS, BX Digital, and stablecoin claims across chapters 03–09.
5. Strengthen the legal/accounting status labels and link unresolved conclusions to the decision ledger.
6. Reread chapters 00–10 sequentially and remove duplication, discontinuities, and contradictions.
7. Only after the documentation stabilizes, implement H8–H10 in the demo and validate every scenario against the updated chapters.

The first delivery should therefore be a documentation release; the second should be a demo-correctness release. Presentation polish follows factual correctness, evidence, and narrative coherence.
