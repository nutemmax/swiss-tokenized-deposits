# Swiss Tokenized Deposits

Research and prototype repository for a Swiss bank model of tokenized deposits, including FINMA framing, double-entry booking, core banking system (CBS) integration, settlement, controls and implementation questions.

## Repository status

The research is organized as a sequential, source-backed documentation collection. The main interactive demo now uses the approved guided architecture-and-scenario workspace; the previous implementation is retained as archived v1.

## Start here

1. Open the [documentation reading guide](docs/README.md).
2. Start with the [beginner summary](docs/00-executive-summary.md).
3. Read the sequential research chapters from [foundations](docs/01-tokenized-bank-deposits-foundations-and-product-types.md) through the [source and regulatory watch](docs/10-tokenized-deposit-sources-and-regulatory-watch.md).

## Interactive demo

Open [the tokenized-deposit explorer](demo/index.html) locally in a browser. It is a dependency-free guided presentation that introduces the Swiss landscape, compares four money architectures, and walks through lifecycle, domestic, cross-border, infrastructure and failure scenarios step by step.

The previous illustrated demo is preserved as [archived v1](demo/deprecated/v1/index.html), together with its original styles, simulation engine and specification. Its [presenter script](docs/appendices/demo/presenter-script.md) remains available for the archived version.

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
