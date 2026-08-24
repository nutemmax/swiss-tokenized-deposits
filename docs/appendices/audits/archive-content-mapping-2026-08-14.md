# Archive-to-Active Research Mapping - 14 August 2026

**Scope:** every Markdown note in `docs/archive/2026-08-14/` compared with the active `docs/00`–`docs/10` collection<br>
**Purpose:** confirm that useful archived analysis has a canonical active home without recreating the former duplication<br>
**Status:** documentation audit; active chapters and current official sources control

## Method

Each archived note was reviewed section by section. Its content was classified as:

- already preserved in an active chapter;
- useful but missing, and therefore adapted into an active chapter;
- historical, demo-specific, duplicative, or insufficiently authoritative for the active collection;
- time-sensitive and requiring current-source validation before reuse.

Archived wording was not imported merely because it was detailed. Legal and regulatory assertions were checked against current official FINMA, Federal Council/Fedlex, SNB/SIX, BIS, Basel, FATF, or relevant industry sources. Design recommendations remain labelled as recommendations.

## Note-by-note disposition

### `01-swiss-tokenized-deposits-deep-dive.md`

The foundations, product taxonomy, legal claim, same-bank and interbank lifecycle, cross-border risks, accounting, prudential treatment, CBS authority, reconciliation, failure handling, and vendor-evidence principles were already distributed across active chapters 01 through 10.

Additional material preserved during this review:

- interbank gross settlement versus netting in active chapter 06;
- a four-model cross-border taxonomy in active chapter 06;
- bridge and wrapped-token claim and recovery risks in active chapter 06;
- CBS integration boundaries and durable outbox/inbox concepts in active chapter 05;
- a consolidated treasury scenario library in active chapter 04.

The named CBS vendor list was not carried into the research narrative. Public product pages do not establish capability in the bank's installed release, regulatory suitability, or tested recovery behavior. Active chapter 09 uses evidence-based vendor demonstrations instead.

Historical Project Jura references were not added to the core sequence. They remain useful provenance, but current Agorá and Helvetia material provides more directly applicable evidence for the active scope.

### `02-legal-regulatory-framework.md`

The legal perimeter, AML and payment-information treatment, FinMIA analysis, insolvency timing, debtor identity, depositor protection, data, outsourcing, material change, and cross-border overlays are mapped to active chapter 03, with operational controls in chapter 07.

Additional material preserved:

- the plain-language legal introduction and terminology at the beginning of chapter 03;
- explicit treatment of a foreign branch versus a separately incorporated subsidiary in chapter 03.

Older legal statements were not copied verbatim. Current status and citations in chapters 03 and 10 control.

### `03-booking-accounting-prudential.md`

The balance-sheet story, debit/credit explanation, chart-of-accounts approach, illustrative journals, representation-specific accounting, reconciliation, reporting, audit, depositor protection, prudential treatment, interest, fees, tax, and evidence pack are mapped to active chapter 04.

Additional material preserved:

- the treasury and balance-sheet scenario library in chapter 04, including weekend outflows, participant failure, operational dependencies, concentration, other-bank tokens, and resolution with pending payments.

No archived journal entry is presented as approved policy. Active chapter 04 continues to require policy-owner and auditor confirmation.

### `04-cbs-operations-and-vendor-assessment.md`

Architecture choices, components, data, invariants, transaction flows, failure semantics, keys, governance, reconciliation, vendor assessment, and implementation sequencing are mapped to active chapters 05, 06, 07, and 09.

Additional material preserved:

- explicit service integration operations, message versioning, durable outbox/inbox behavior, and prohibition on direct token-platform writes to GL tables in chapter 05;
- RTO, RPO, maximum pending age, safe degraded modes, and full-dependency resilience testing in chapter 07.

The archive's RTO/RPO language was retained as a method rather than a universal number. FINMA Circular 2023/1 does not prescribe one token-platform recovery target; the bank must derive objectives from its business-impact analysis.

### `05-research-register.md`

The source hierarchy, evidence ledger, deliberate uncertainties, and research-hygiene rules are fully mapped to active chapter 10 and the claim labels in `docs/README.md`.

No additional narrative was required. The active register is more current and records effective dates, statuses, review triggers, and owners.

### `06-demo-presenter-script.md`

The plain-language explanations of ordinary deposits, instruction tokens, mirrored deposits, native deposits, stablecoins, same-bank and interbank transfers, cross-border payments, wCBDC, reconciliation, and failure are mapped to active chapters 00, 01, 05, 06, 07, and the current presenter script.

Additional research material preserved:

- gross settlement and netting in chapter 06;
- bridge and wrapped-token dependencies in chapter 06.

Presentation directions remain in `docs/appendices/demo/presenter-script.md`; they were not duplicated in the main research.

### `07-demo-factual-audit-2026-08-14.md`

The audit's factual distinctions—customer versus bank actors, deposit versus stablecoin, CBS versus token authority, SIC as the interbank central-bank-money leg, model-specific failure behavior, and the separation of technical and legal finality—are represented across active chapters 01, 03, 05, 06, 07, and 08.

The detailed demo-code findings remain historical audit evidence and were not converted into product requirements. Documentation work does not alter the demo application. The consolidated active audit remains in `docs/appendices/audits/`.

The sound gross/netting and bridge explanations identified by this archive audit were added to chapter 06.

### `08-how-a-swiss-bank-can-leverage-mirrored-deposits.md`

The mirrored model, architecture, Agorá adaptation, domestic and cross-border operation, accounting, prudential treatment, legal perimeter, failure states, governance, roadmap, and KPIs are mapped across active chapters 02 through 09.

Additional material preserved:

- a bank-value section in chapter 02 covering revenue and franchise, operating efficiency, risk reduction, and balance-sheet or liquidity constraints;
- a regulated digital-asset cash-leg/on-off-ramp use case in chapter 02;
- the bridge and public-chain caution in chapter 06;
- the explicit comparison of Agorá, Helvetia, SIC, and the SBA PoC in chapter 08.

Statements suggesting favorable funding, HQLA, LCR, NSFR, or liquidity effects remain expressly qualified and subject to current Swiss implementation analysis.

### `08-mirrored-deposits-short-summary.md`

This note is a compressed version of the longer strategy paper. Its use cases, recommended sequence, and design limits are fully covered by active chapters 00, 02, and 09.

No separate content was added because doing so would duplicate the executive summary.

### `09-booking-legal-model-mint-transfer-burn-and-contract-topology.md`

The debtor/currency distinction, legal meaning of mint, transfer and burn, interbank alternatives, finality, issuer partitioning, Agorá authority model, contract fields, and sign-off questions are mapped to active chapters 03 through 06 and 09.

Additional material preserved:

- four contract-deployment alternatives in chapter 05:
  - per bank and currency;
  - shared multi-issuer with hard partitions;
  - undifferentiated CHF;
  - jurisdiction-specific deployment;
- the distinction between issuer and jurisdiction as separate control boundaries in chapter 05.

The active chapter continues to recommend issuer-and-currency partitioning for the first model without presenting it as a universal legal requirement.

### `99-legacy-starter-note.md`

The starter note's model, accounting, architecture, FINMA limitations, Swiss market evidence, open questions, work plan, and sources are mapped to the active sequence.

Additional material preserved and updated:

- chapter 01 now states that the 2025 SBA PoC used tokenized payment instructions to trigger off-chain bank-account transfers rather than placing the deposit claim itself on-chain;
- chapter 08 now places the SBA PoC alongside SIC, Project Helvetia, and Project Agorá and explains the different question each addresses;
- chapter 08 uses the SNB's current statement that Project Helvetia runs until at least June 2028.

The legacy vendor list and earlier regulatory-development wording were not reused. The active vendor method is capability-based, and current proposal statuses are maintained in chapter 10.

### `README.md`

The archive README is metadata marking the snapshot as superseded. It remains unchanged and correctly directs readers to the active collection.

## Current-source checks applied to reused material

- FINMA's current circular and crypto-services indexes were used to distinguish current, replaced, future-effective, and proposed material.
- FINMA Guidance 05/2026 on quantum computing was added to active chapters 03, 07, 09, and 10 because cryptographic inventory and crypto-agility are relevant to the platform and provider model.
- FINMA Circular 2026/1 on nature-related financial risks was recorded as screened but not tokenized-deposit-specific.
- The SBA 2025 results report was used for the payment-instruction and off-chain-settlement characterization.
- The SNB Project Helvetia FAQ was used for integrated wCBDC, the RTGS-link model, and the current duration through at least June 2028.
- The local May 2026 Project Agorá report remains the primary source for Agorá architecture, authority, workflow, privacy, and prototype limitations.

## Conclusion

Every substantive archived topic now has one of three documented outcomes:

1. it is preserved in a named active chapter;
2. it was adapted and added during this review; or
3. it remains in the archive because it is historical, demo-specific, duplicative, insufficiently authoritative, or outside the active scope.

The archive remains useful provenance, but it is not a second active publication.
