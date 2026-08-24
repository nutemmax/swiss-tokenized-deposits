# Demo Factual Audit - 14 August 2026

> **Superseded for current demo work:** use the [complete factual, state, and UI audit](demo-complete-factual-state-and-ui-audit-2026-08-14.md). This shorter audit is retained for provenance.

**Scope:** claims and flows in the interactive demo and presenter material
**Canonical evidence:** active chapters 00–10
**Historical workpaper:** `research/07-demo-factual-audit-2026-08-14.md`

## Audit conclusion

The demo is suitable as an explanatory prototype if the presenter preserves the qualifications below. It must not be presented as an approved legal model, accounting policy, FINMA position, or production architecture.

The earlier audit identified factual, attribution, and framing issues. The active research resolves them by separating the bank liability, token record, settlement asset, authoritative ledger, and different forms of finality.

## Findings and resolution

| Finding | Resolution in active documentation | Status |
|---|---|---|
| SNB described as issuing Swiss coins | Executive summary now distinguishes SNB banknotes from Confederation-issued coins distributed through the SNB | Resolved in docs; verify demo label |
| Tokenized deposit conflated with stablecoin | Foundations chapter defines separate product categories | Resolved in docs; presenter must qualify |
| FINMA stablecoin guidance used as broad token/FMI authority | Legal chapter limits Guidance 06/2024 to relevant stablecoin/guarantee comparison | Resolved |
| FINMA Guidance 03/2025 treated as own-liability accounting authority | Accounting chapter limits it to customer cryptobased custody-asset disclosure context | Resolved |
| Burn-settle-issue shown as the only interbank model | Lifecycle chapter documents three alternatives | Resolved in docs; demo must call it an example |
| Ledger confirmation described as settlement finality | Lifecycle chapter separates workflow, ledger, accounting, and legal finality | Resolved in docs; verify UI labels |
| Agorá implied to use a CBS-authoritative mirror | Agorá chapter states platform is the prototype's golden source | Resolved |
| Prototype evidence implied production readiness | Agorá chapter lists untested production areas | Resolved |
| Wallet/key possession implied legal ownership | Foundations and architecture chapters distinguish entitlement and signing control | Resolved |
| Journal entries appear definitive | Accounting chapter labels all entries illustrative pending approval | Resolved |
| DLT trading facility precedent implied deposit-token approval | Legal chapter describes BX Digital as an adjacent securities/FMI precedent | Resolved |
| Project Helvetia timing stale | Source register records current SNB status through at least June 2028 | Resolved |

## Presenter controls

Before each demonstration:

- use the current [presenter script](../demo/presenter-script.md);
- confirm UI text does not contradict the active claim map;
- state the research cut-off;
- identify simulated data and systems;
- avoid words such as “approved,” “guaranteed,” “instant finality,” or “fully backed” unless the exact meaning is explained;
- direct legal and accounting questions to the active chapters and their open issues.

## Remaining verification

The documentation refactor does not modify demo code. Before external use, compare every visible label and tooltip in `demo/` against the [claim map](../demo/claim-map.md), then record any code changes in a new dated audit.
