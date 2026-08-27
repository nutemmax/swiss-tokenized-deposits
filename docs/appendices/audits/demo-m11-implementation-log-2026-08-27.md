# Demo M11 implementation log — 27 August 2026

This release aligns the stakeholder demo, presenter script, claim map, specification, and automated state checks. It implements M11 in [`PLAN.md`](../../../PLAN.md).

## Changes

- Added **Conditional payment** as a primary scenario. It shows request, controls, funds lock, pending milestone, verification, release, and final record agreement.
- Replaced the generic correspondent/FX presentation with an explicit **Agorá five-stage payment**: confirmation of payee, path discovery, private validation, locking and delegation, and settlement.
- Added an in-scene five-stage workflow indicator and a conditional-milestone object using the demo's existing SVG/CSS system.
- Moved **Gross versus net** into the existing advanced-flow list so the recommended conditional-payment pilot remains directly accessible without adding another control row.
- Updated the presenter script, hidden demo specification, and claim map while keeping sources and research limitations out of the stakeholder-facing interface, as directed by the project owner.
- Recorded the project-owner decisions to remove M12 visible provenance and M13 extended failure coverage from active scope. Existing high-priority failure safeguards remain.

## Verification

- `node --check demo/deprecated/v1/app.js`
- `node --test tests/demo-snapshot.test.js`
- State assertions cover pre-condition locking, verified release, instruction/deposit distinction, supply conservation, the exact five Agorá stages, post-validation locking, and final receiving value.

The demo remains an illustrative, dependency-free hybrid presentation. The research chapters remain authoritative.
