# Swiss Tokenized Deposits

Research and prototype repository for a Swiss bank model of tokenized deposits, including FINMA framing, double-entry booking, core banking system (CBS) integration, settlement, controls and implementation questions.

## Repository status

The research has been reorganized into a sequential, source-backed documentation collection. The next work focuses on aligning the interactive demo with the research before improving its visual design.

## Start here

1. Open the [documentation reading guide](docs/README.md).
2. Start with the [beginner summary](docs/00-executive-summary.md).
3. Read the sequential research chapters from [foundations](docs/01-tokenized-bank-deposits-foundations-and-product-types.md) through the [source and regulatory watch](docs/10-tokenized-deposit-sources-and-regulatory-watch.md).

## Interactive demo

Open [the tokenized-deposit explainer](demo/index.html) locally in a browser. It is a dependency-free HTML/CSS/JavaScript simulation with model switching, animated mint/burn and transfer flows, SIC/FX/PvP comparisons, reconciliation, netting and failure states. The [presenter script](docs/appendices/demo/presenter-script.md) provides a research-aligned walkthrough.

### Next demo work

The demo should be improved in two stages:

1. **Correctness and research alignment**
   - Work through the [complete demo factual, state, and UI audit](docs/appendices/audits/demo-complete-factual-state-and-ui-audit-2026-08-14.md).
   - Use the [demo-to-research claim map](docs/appendices/demo/claim-map.md) to check terminology, authority, balances, settlement states, and qualifications.
   - Treat the active research chapters as authoritative when demo wording or behavior differs.
2. **Visual refactor**
   - Begin after the factual and state corrections are complete.
   - Preserve the corrected lifecycle, actors, balances, and failure behavior while improving layout, navigation, hierarchy, and presentation.

The visual demo is an explanatory simulation. It should not be presented as an approved legal model, accounting policy, FINMA position, or production architecture.

## Repository structure

```text
docs/       Research notes and source-backed analysis
research/   Working papers and extracted source material
demo/       Dependency-free interactive explainer
src/        Prototype integration or accounting logic
tests/      Executable checks for prototype logic
```

## Working principles

- Treat the CBS/general ledger as authoritative for the first implementation.
- Keep token supply, customer subledger and GL control balances continuously reconciled.
- Separate legal conclusions, accounting policy and technical design decisions.
- Do not treat a vendor's generic “digital asset” capability as evidence of tokenized-deposit support.
- Separate workflow, ledger, accounting and legal finality.
- Treat archived notes as provenance, not current guidance.
