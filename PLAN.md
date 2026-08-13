# Project plan

## Objective

Define and validate a Swiss-bank tokenized-deposit model that can be implemented safely with existing core banking, payment and compliance infrastructure.

## Phase 1 — Define the product

- Choose the legal model: payment-instruction token, CBS-authoritative mirrored deposit, or native on-chain deposit.
- Identify the debtor, creditor, issuer, holder and receiving bank for every flow.
- Define redemption, transfer restrictions, settlement finality, insolvency and deposit-protection treatment.
- Produce a one-page product/legal decision record.

## Phase 2 — Regulatory and accounting position

- Map the model to the Swiss Banking Act/Ordinance, AMLA/AMLO-FINMA, FinMIA, FINMA accounting rules, operational resilience, outsourcing, data protection, bank secrecy and resolution requirements.
- Obtain an accounting position paper covering chart of accounts, journal entries, reporting lines, interest, fees and deposit-protection aggregation.
- Discuss the proposed model with Swiss counsel, the external auditor and FINMA before production design.

## Phase 3 — CBS and settlement design

- Inventory the installed CBS capabilities: reservations, token subaccounts, real-time posting, event APIs, ISO 20022/SIC integration, reconciliation and recovery.
- Define the orchestration state machine for mint, burn, same-bank transfer, cross-bank transfer and conditional DvP.
- Define the token contract roles, wallet lifecycle, key management, pause/recovery controls and audit trail.
- Write the three-way reconciliation rules: DLT, customer subledger and GL/SIC.

## Phase 4 — Prototype

- Build only a same-bank mint, transfer and burn flow first.
- Add cross-bank settlement through SIC using test accounts or a simulator.
- Add AML/sanctions gates and failure-state handling.
- Add small executable checks for supply conservation, idempotency and failed-step recovery.

## Phase 5 — Risk and operational testing

- Test CBS outage, DLT outage, SIC unavailability, duplicate messages, sanctions hits, lost keys, compromised keys, chain upgrade and mass redemption.
- Test insolvency/resolution procedures and customer statements.
- Test audit replay from customer instruction through CBS, SIC and DLT records.
- Document recovery-time and recovery-point objectives.

## Phase 6 — Pilot decision

- Review legal, accounting, compliance, treasury, security and operational evidence.
- Decide whether to remain with a CBS-authoritative model or move toward a native on-chain ledger.
- Define pilot scope, participating customers/banks, limits, governance and go/no-go criteria.

## Immediate next actions

1. Create the legal/product decision record using the conclusions and open items in the [deep dive](docs/01-swiss-tokenized-deposits-deep-dive.md).
2. Turn the templates in the [booking/accounting note](docs/03-booking-accounting-prudential.md) into an auditor-reviewed accounting-policy paper.
3. Ask the CBS vendor for evidence against the capability checklist in the [CBS/operations note](docs/04-cbs-operations-and-vendor-assessment.md).
4. Send the legal terms, flow diagrams and control model to Swiss counsel, the external auditor and FINMA for preliminary feedback.
5. Build a small same-bank mint/burn simulation only after steps 1–4.
