# Swiss Tokenized Deposits

Research and prototype repository for a Swiss bank model of tokenized deposits, including FINMA framing, double-entry booking, core banking system (CBS) integration, settlement, controls and implementation questions.

## Repository status

Research-first. The initial goal is to agree the legal and accounting model before building production code.

## Start here

1. Read the [executive summary](docs/00-executive-summary.md).
2. Read the [Swiss tokenized-deposits deep dive](docs/01-swiss-tokenized-deposits-deep-dive.md).
3. Use the focused [legal/regulatory](docs/02-legal-regulatory-framework.md), [booking/accounting/prudential](docs/03-booking-accounting-prudential.md), and [CBS/operations](docs/04-cbs-operations-and-vendor-assessment.md) notes.
4. Follow [the project plan](PLAN.md) and maintain the [research register](docs/05-research-register.md).

## Interactive demo

Open [the tokenized-deposit explainer](demo/index.html) locally in a browser. It is a dependency-free HTML/CSS/JavaScript simulation with model switching, animated mint/burn and transfer flows, SIC/FX/PvP comparisons, reconciliation, netting and failure states. The [presenter script](docs/06-demo-presenter-script.md) provides a suggested walkthrough.

## Initial structure

```text
docs/       Research notes and source-backed analysis
research/   Working papers and extracted source material
demo/       Dependency-free interactive explainer
src/        Prototype integration or accounting logic, added later
tests/      Small executable checks for prototype logic
```

## Working principles

- Treat the CBS/general ledger as authoritative for the first implementation.
- Keep token supply, customer subledger and GL control balances continuously reconciled.
- Separate legal conclusions, accounting policy and technical design decisions.
- Do not treat a vendor's generic “digital asset” capability as evidence of tokenized-deposit support.
