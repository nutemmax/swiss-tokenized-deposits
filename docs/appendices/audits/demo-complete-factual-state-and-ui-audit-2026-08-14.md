# Complete Demo Factual, State, and UI Audit — 14 August 2026

**Scope:** `demo/index.html`, `demo/app.js`, `demo/styles.css`, `demo/demo-spec.json`, the presenter script, and the demo-to-research claim map  
**Research cut-off:** 14 August 2026  
**Status:** independent audit of the current implementation; not a legal opinion, accounting policy, FINMA position, or production approval  
**Supersedes for current demo work:** `demo-factual-audit-2026-08-14.md`; the archived detailed audit remains historical evidence

## 1. Audit conclusion

The demo is a useful conceptual explainer, and its newly added step text materially improves its educational value. It is not yet factually safe to present as a coherent end-to-end simulation.

The central problem is not the introductory taxonomy. The central problem is that the rendered balances and actors do not always follow the words on the screen. In particular, failed actions can still apply the successful mutation before the UI adds a `Blocked` label. Several successful paths also defer a burn, transfer, credit, or posting until the generic final step even though an earlier step says that the action has already occurred.

The demo should therefore continue to be described as an illustrative prototype. Before external use, correct the P0 and P1 findings below, then rerun the same matrix.

### Result summary

| Result | Count | Meaning |
|---|---:|---|
| P0 | 3 | A failed action visibly produces the state that the failure says did not occur. |
| P1 | 17 | Material factual, lifecycle, authority, or finality inconsistency. |
| P2 | 17 | Important qualification, risk coverage, presenter, or usability gap. |
| P3 | 5 | Editorial or lower-severity accessibility issue. |

The counts group repeated instances under one root finding. For example, the SIC-failure finding covers every affected product and both the interbank and netting scenarios rather than assigning a separate number to each duplicated state mutation.

## 2. Method and coverage

This audit was performed from the current files, independently of the previous conclusions. The earlier audit was consulted only after the current behavior had been enumerated. An older issue was retained only when the current implementation reproduced it.

### State coverage

- Four product models:
  - payment instruction;
  - CBS-authoritative mirrored deposit;
  - native on-chain deposit;
  - non-bank stablecoin.
- Ten scenarios:
  - convert/mint;
  - redeem/burn;
  - same-bank transfer;
  - Swiss interbank transfer;
  - gross versus net settlement;
  - correspondent plus FX;
  - cross-border payment-versus-payment;
  - wholesale CBDC;
  - bridge/wrapped token;
  - mismatch and recovery.
- Seven steps per scenario.
- **280 model × scenario × step states** exercised in the rendered browser.
- **153 enabled model × scenario × failure combinations** exercised to their trigger and then stepped once more to confirm that the path stopped.
- **306 failure observations** captured: one at the trigger and one after the blocked repeat.
- **586 recorded rendered-state observations** in total, excluding the intermediate screens traversed to reach each failure trigger.

### UI and control coverage

- model and scenario selection;
- advanced-flow selection;
- manual step, reset, play/pause, and speed;
- risk selection and reset;
- actor inspection by pointer and keyboard;
- final-state replay;
- browser console warnings and errors;
- desktop layout at 1440 × 1000;
- minimum desktop layout at 1000 × 800;
- narrow layout at 390 × 844;
- reduced-motion rule inspection;
- accessible names, selected-state semantics, tab behavior, and focus structure.

The JavaScript syntax check passed. The browser produced no console warnings or errors during the audit. Autoplay, reset, enabled-risk stopping, and keyboard activation of an actor worked.

### Failure coverage matrix

The table records the controls enabled by the current code, not the controls that ought to be enabled.

| Scenario | Enabled failures | Model-specific exception | Enabled combinations |
|---|---|---|---:|
| Convert/mint | AML, DLT, mismatch, key/contract | None | 16 |
| Redeem/burn | AML, DLT, mismatch, key/contract | None | 16 |
| Same bank | AML, DLT, mismatch, key/contract | None | 16 |
| Swiss interbank | AML, DLT, SIC, receiver, mismatch, key/contract | Stablecoin disables SIC and receiver | 22 |
| Gross versus net | SIC | Stablecoin disables SIC and therefore has no enabled failure | 3 |
| Correspondent + FX | AML, DLT, receiver, mismatch, key/contract | None | 20 |
| Cross-border PvP | AML, DLT, mismatch, key/contract | Receiver rejection is disabled | 16 |
| Wholesale CBDC | DLT, receiver, mismatch, key/contract | AML is disabled | 16 |
| Bridge/wrapped token | AML, DLT, mismatch, key/contract | None | 16 |
| Mismatch + recovery | DLT, mismatch, key/contract | None | 12 |
| **Total** |  |  | **153** |

## 3. Evidence standard

Findings use four labels:

- **Confirmed inconsistency:** the rendered state contradicts its explanation, another visible state, or an authoritative source.
- **Model-dependent assumption:** the behavior can be valid under one design, but the selected design is not disclosed.
- **Coverage or UI gap:** the demo may remain illustrative, but the omission impairs comprehension, control testing, or accessibility.
- **Confirmed sound:** the statement is supportable with its current qualification.

The active research chapters provide the product-specific interpretation. Current official sources were checked independently, including:

- [FINMA Guidance 06/2024 on stablecoins](https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/4dokumentation/finma-aufsichtsmitteilungen/20240726-finma-aufsichtsmitteilung-06-2024.pdf);
- the current [FINMA crypto-services index](https://www.finma.ch/en/documentation/dossier/dossier-fintech/auf-einen-blick-aufstellung-der-krypto-dienstleistungen/);
- [FINMA Guidance 04/2026 on AML risk analysis](https://www.finma.ch/en/news/2026/06/20260604-mm-am-04-26/);
- [FINMA Guidance 01/2026 on custody of cryptobased assets](https://www.finma.ch/en/news/2026/01/20260112-mm-am-01-26/), applied only by analogy where an own-liability token is not a third-party custody asset;
- the [SNB/SIX SIC System Disclosure published in September 2025](https://www.snb.ch/en/publications/sicsystem-disclosure/sicsystem-disclosure-all/sicsystem_disclosure_2024);
- the current [SNB Project Helvetia FAQ](https://www.snb.ch/en/services-events/digital-services/faq-overview/qas_helvetia);
- the [SBA Deposit Token proof-of-concept report](https://www.swissbanking.ch/_Resources/Persistent/7/9/e/a/79ea024daa9834c99fc299db5d5f69c4317525a2/20250916_Ergebnisbericht%20PoC%20Deposit%20Token_EN_FINAL.pdf);
- the [BIS Project Agorá page, updated 30 July 2026](https://www.bis.org/about/bisih/topics/fmis/agora.htm);
- the Basel Committee's current [foreign-exchange risk guidance](https://www.bis.org/basel_consolidated_guidelines/chapter/RMA/20.htm); and
- the current [FATF Recommendation 16 update](https://www.fatf-gafi.org/en/publications/Fatfrecommendations/update-Recommendation-16-payment-transparency-june-2025.html).

## 4. P0 findings — failed actions produce successful state

### F-01 — SIC failure still settles the SNB balances

**Type:** confirmed inconsistency  
**Where:** `demo/app.js`, interbank and netting mutations in `snapshot()`; failure overlay applied afterward

At the `SIC unavailable` trigger, the UI says that interbank central-bank money is not final, but the stage has already changed:

- Bank A's displayed SNB balance from CHF 1,000 to CHF 900;
- Bank B's displayed SNB balance from CHF 1,000 to CHF 1,100; and
- in mirrored/native interbank flows, the source token supply to zero.

The same defect appears in gross-versus-net: the CHF 40 net amount changes both SNB balances at the step at which SIC is declared unavailable.

The SNB states that a SIC payment is irrevocable and final when the debit is made to the settlement account. A simulated unavailable SIC leg cannot both lack finality and display the completed debit/credit ([SIC disclosure, pp. 5–6](https://www.snb.ch/public/asset/en/www-snb-ch/publications/sicsystem-disclosure/sicsystem-disclosure-all/sicsystem_disclosure_2024/publications0_en/sicsystem_disclosure_2024.en.pdf)).

**Required correction:** gate the SNB mutation and any source extinguishment on successful SIC evidence. Before that evidence, show the source claim as locked or reserved and both SNB balances unchanged.

### F-02 — Receiving-bank rejection still creates the recipient claim

**Type:** confirmed inconsistency  
**Where:** `snapshot()` interbank and CBDC branches

At the `Receiving bank rejection` trigger:

- mirrored interbank shows Luca with CHF 100, the holder as `Luca`, and the debtor as `Bank B`;
- instruction and native interbank likewise switch the holder/debtor before the failed acceptance is excluded;
- the CBDC comparison shows `Recipient` as holder and transfers the customer-facing token even though the receiving institution refused acceptance.

The accompanying risk text correctly says no recipient claim should be created. The balance state contradicts it.

**Required correction:** gate recipient credit, holder change, and Bank B debtor creation on successful acceptance. If the institutional settlement leg is already final, show a controlled due-to, suspense, or repair position; do not invent a customer claim and do not silently reverse the final external leg.

### F-03 — DLT or key failure still creates the object that failed

**Type:** confirmed inconsistency  
**Where:** mint and bridge mutations in `snapshot()`

At the failed token-action step:

- mirrored mint displays DLT supply of CHF 100 even though the DLT is unavailable;
- native mint displays an authoritative CHF 100 token even though the contract is paused;
- stablecoin mint can display issuer supply and reserve/guarantee of CHF 100 even though issuer-ledger action failed;
- bridge flows show `wrapped live` at the key/contract or DLT failure trigger.

**Required correction:** retain the pre-action state. A mint failure may leave a CBS or funding hold, but it creates no spendable token. A bridge-wrap failure may leave the source locked, but it creates no destination representation.

## 5. P1 findings — material factual and lifecycle inconsistencies

### F-04 — “Finality” collapses different legal and technical events

**Type:** confirmed wording and model gap  
**Where:** result ribbon, default status expression, final step labels

The single `FINALITY` field displays values such as `Final`, `Settlement pending`, `Both legs final`, `Redeemed`, and `Issuer-ledger final + accepted`. These are not one type of finality.

The active research distinguishes:

- workflow completion;
- technical ledger finality;
- accounting recognition;
- external settlement finality; and
- legal settlement finality.

The SIC-specific label can be precise because the system rule identifies its finality event. A generic token-ledger or workflow `Final` label cannot establish the legal effect of a deposit transfer. The SBA report likewise treats payment-instruction acceptance, account credit, SIC settlement, and insolvency finality as distinct matters (Appendix B, pp. 31–35).

**Required correction:** replace the single field with explicitly named statuses, or label it `Workflow status` and add separate ledger, accounting, and legal-settlement fields where the scenario needs them.

### F-05 — Internal flows display “Settlement pending” without a settlement rail

**Type:** confirmed inconsistency  
**Where:** default finality expression in `snapshot()`

At steps 5 and 6 of mint, redeem, and same-bank transfer, the UI displays `Settlement pending`. Those flows do not use SIC or another external settlement rail. The same-bank annotation simultaneously says `NO SIC`.

**Required correction:** use lifecycle-specific states, for example:

- mint: `recording pending` or `availability pending`;
- redeem: `burn evidence pending` or `release pending`;
- same bank: `internal posting pending`;
- netting: `net obligation settlement pending`;
- interbank: `SIC pending` or `SIC final` only when SIC is actually used.

### F-06 — Redeem/burn labels and balances describe different points in time

**Type:** confirmed inconsistency  
**Where:** redeem branch and step labels

For mirrored, native, and stablecoin models, the token remains live through `Burn`, `Evidence`, and `Released`; supply falls only at the final step. The ordinary balance is also released only at final, despite the earlier `Released` label.

The instruction model is more visibly reversed: it starts redemption with no instruction unit, creates CHF 100 of instruction supply at `Reserved`, keeps it through `Burn` and `Released`, then removes it at final.

**Required correction:** start redemption with the digital unit already present. Reduce or disable it at the successful burn/cancellation event, then release the ordinary balance or issuer payout after accepted evidence. If the implementation intentionally waits until a commit step, rename the earlier steps so they do not claim the event has happened.

### F-07 — Same-bank transfer labels precede the actual holder transfer

**Type:** confirmed inconsistency  
**Where:** same-bank branch

For mirrored, native, and stablecoin models, Alice remains the token holder through `Transfer`, `Internal post`, and `Accepted`. Luca receives the token only at `Final`. For the instruction model, Alice's debit and Luca's credit also occur only at `Final`, even though `Internal post` and `Accepted` are earlier steps.

**Required correction:** apply each state transition at the step that names it, or rename the steps to `transfer prepared`, `posting prepared`, and `acceptance pending` until the final commit applies them.

### F-08 — The payment-instruction debtor field obscures the existing deposit claim

**Type:** confirmed qualification gap  
**Where:** `MODELS.instruction.debtor`

The static debtor is `Bank A after acceptance`, including at the first requested step. Alice already has an underlying ordinary deposit claim against Bank A before the tokenized instruction is accepted. What may not yet exist is an independent claim of the instruction holder/payee against the paying agent.

The SBA report explains that issuance of a payment instruction does not normally create the paying agent's obligation to the payee until acceptance, subject to the applicable agreement and statutory exceptions (Appendix B, pp. 31–33).

**Required correction:** display both layers: `underlying deposit debtor: Bank A` and `instruction-holder claim: depends on acceptance and terms`.

### F-09 — The instruction model is represented as a CHF token supply

**Type:** confirmed semantic inconsistency  
**Where:** generic DLT object, mint/redeem/mismatch branches, DLT inspector

The payment-instruction model uses `DLT LEDGER — SUPPLY CHF 100` and the mismatch invariant `DLT = SUBLEDGER = GL`. This suggests that the instruction ticket is itself a CHF deposit-liability supply.

Under the SBA PoC, the on-chain Deposit Token was a payment instruction that triggered off-chain account transfers; the underlying accounts were deposits, while the instruction token itself was not treated as the deposit (report pp. 4 and 31–35).

**Required correction:** label the record `instruction units/status` and reconcile it to the payment journal and CBS posting. Reserve `deposit-token supply = customer token subledger = GL control` for the mirrored model.

### F-10 — Instruction-model recipient states do not post the ordinary payment

**Type:** confirmed inconsistency  
**Where:** PvP, CBDC, bridge, and parts of interbank

Examples:

- CBDC final says `Recipient` while Luca's visible balance remains CHF 0 in the instruction model.
- PvP final says `Both counterparties` and `Both legs final`, but Alice's ordinary CHF balance remains CHF 1,000 and Luca's visible instruction-model balance is CHF 0.
- Bridge final says `Destination wallet`, but neither Luca nor another destination balance receives value.
- At normal interbank acceptance, the holder/debtor can switch to Luca/Bank B one step before Luca's ordinary balance is credited.

**Required correction:** either post the ordinary account debit/credit at the selected execution/acceptance step and consume the instruction, or call the terminal event `instruction accepted` and leave customer payment finality visibly pending.

### F-11 — The mirrored interbank route is an unlabeled burn-settle-issue variant

**Type:** model-dependent assumption  
**Where:** mirrored interbank branch and route

The source token disappears at the SIC step and Bank B creates a new token at acceptance. This is a coherent liability-transformation design, but it is one alternative, not a universal FINMA rule or the only Swiss design.

The active lifecycle chapter documents three alternatives: burn/settle/issue; coordinated pending/shared instruction; and continued circulation of the original issuer's claim. The SBA PoC used tokenized payment instructions and off-chain account transfers rather than proving a universal native deposit-token burn-and-issue rule.

**Required correction:** add `Illustrative burn-settle-issue variant` to the scenario and identify the cancellation/repair rule on each side of SIC finality.

### F-12 — Correspondent state does not implement the selected product model

**Type:** confirmed state gap  
**Where:** correspondent branch

The same ordinary-account mutation is used for instruction, mirrored, native, and stablecoin models. No model-specific token supply, mirror subaccount, issuer funding, redemption, or destination issuance is shown.

For a mirrored or native token, the screen never states whether the origin-bank claim continues, is redeemed, or is replaced by a foreign-bank claim. For a stablecoin, the final ribbon says `Foreign customer · issuer claim`, but Luca is credited with an ordinary balance and no issuer token. The debtor label and balance type therefore disagree.

**Required correction:** choose and name one corridor for each product:

- instruction → correspondent account payment → foreign ordinary-account credit;
- origin-bank token remains the origin-bank claim; or
- redeem/burn origin claim → correspondent/FX settlement → destination-bank claim;
- stablecoin direct issuer transfer; or
- stablecoin redemption/on-ramp funding a bank payment.

### F-13 — Native-DLT authority is overwritten in the internal state model

**Type:** confirmed model inconsistency, currently weakly exposed  
**Where:** correspondent, CBDC, and mismatch authority assignments

The native model declares the DLT master record, but these branches overwrite authority with `CBS + correspondent RTGS`, `Deposit ledger + wCBDC settlement`, or `CBS / GL + DLT` after repair. The main model panel and DLT inspector still say DLT master, so the conflicting field is not prominently rendered today; it remains an invalid state representation and a future UI hazard.

**Required correction:** preserve `DLT master holder record + CBS/GL reporting projection` and represent RTGS/wCBDC as a separate settlement authority.

### F-14 — PvP shows two currencies but maintains one supply and one customer path

**Type:** confirmed state gap  
**Where:** PvP branch, fund rendering, DLT/issuer inspector

The scene renders a CHF leg and a EUR leg, but the state has one `tokenSupply` field denominated and displayed as CHF. It does not track separate issuers, holders, locks, or finality evidence for the two currency legs.

The conceptual statement `both or neither` is sound. Basel guidance defines PvP as final transfer of one currency if and only if final transfer of the other occurs, while noting that PvP does not guarantee settlement and does not remove liquidity or replacement-cost risk.

**Required correction:** track CHF and EUR legs independently and show the issuer, authority, locked amount, recipient, and finality status for each. Keep the shared PvP decision separate from each leg's legal effect.

### F-15 — Wholesale-CBDC scenario claims settlement without moving the settlement asset

**Type:** confirmed state gap  
**Where:** CBDC branch and step labels

The UI labels the steps `wCBDC ready`, `Atomic settle`, `Reconciled`, and `Final`, but it does not debit one institution's wCBDC position or credit another's. The two displayed SNB balances remain unchanged. The wCBDC actor correctly calls itself a `Conceptual comparison`, which conflicts with the finality ribbon and lifecycle verbs.

The SNB confirms that Helvetia wCBDC is institutional central-bank money on the SIX Digital Asset Platform and that eligible holders must meet specific conditions. Helvetia is not a generic settlement feature automatically available to every token model.

**Required correction:** either implement two institutional wCBDC balances and their transfer evidence, or rename the scenario `wCBDC comparison` and remove the `Atomic settle`/finality claim.

### F-16 — Bridge terminal state contains neither a live wrapped unit nor a destination balance

**Type:** confirmed inconsistency  
**Where:** bridge branch and renderer

The scene shows one DLT object, not two independently inspectable ledgers. At final:

- `locked` is false;
- `wrapped` is false;
- the holder is `Destination wallet`;
- Luca remains CHF 0;
- token supply remains CHF 100; and
- finality is `Redeemed`.

It is therefore impossible to tell whether a wrapped unit remains live, the source asset was released, the source claim was burned, or a different destination claim was issued.

**Required correction:** track source and destination ledgers separately and select one terminal story: source remains locked while a wrapped unit circulates, or source is explicitly redeemed/extinguished and a defined destination claim is delivered.

### F-17 — Mismatch records are model-generic and the restored claim remains held

**Type:** confirmed inconsistency  
**Where:** mismatch branch and annotation

The annotation always says `DLT = SUBLEDGER = GL`, including for:

- instructions, which require instruction-status/CBS-journal reconciliation;
- native deposits, where DLT is the master and CBS/GL are projections;
- stablecoins, where issuer supply, reserve or guarantee records, and holder entitlements are relevant.

At the final restored step, reconciliation returns to `Matched` and finality to `Restored`, but the holder remains `Alice · held` even though the explanation says normal movement can resume.

**Required correction:** use model-specific record names and change the final holder state to `Alice · available` or equivalent.

### F-18 — Stablecoin issuer, reserve, and guarantee are conflated

**Type:** confirmed legal-structure inaccuracy  
**Where:** stablecoin model facts, issuer facility, debtor field, and inspector

The UI treats `reserve / guarantee` as one CHF amount and `issuer / guarantor` as one debtor. FINMA distinguishes them:

- the holder generally has a payment claim against the stablecoin issuer;
- a default guarantee is a separate bank undertaking triggered under its terms, including an individual claim on issuer bankruptcy under FINMA's minimum conditions;
- the guarantee does not provide the same protection as a banking licence or statutory deposit protection.

**Required correction:** show `issuer liability` separately from either `reserve assets` or `bank default guarantee`. If a guarantee is selected, show the guarantor as a contingent/default claim, not as an interchangeable primary debtor.

### F-19 — Stablecoin same-system transfer says Bank A remains debtor

**Type:** confirmed inconsistency  
**Where:** scenario header and same-bank annotation

The stablecoin model-specific paragraph correctly says the issuer remains debtor. The scenario header says value moves while Bank A remains debtor, and the scene chip says `NO SIC · BANK A LIABILITY UNCHANGED`. Bank A need not be the stablecoin debtor at all.

**Required correction:** make the header and chip model-aware: `issuer liability unchanged; holder changes; no SIC in this direct issuer-ledger transfer`.

### F-20 — Stablecoin netting displays SIC but disables SIC failure

**Type:** confirmed applicability contradiction  
**Where:** `usesSic`, stablecoin failure rule, and netting branch

The stablecoin netting screen:

- renders the SIC/SNB rail;
- changes Bank A and Bank B's SNB balances by the CHF 40 net amount;
- labels the holder and debtor as issuer-scheme obligations/participants; and
- disables `SIC unavailable`, leaving the scenario with no selectable failure.

**Required correction:** either make it an issuer-scheme netting example with no SIC balances, or disclose a separate bank-participant funding leg through SIC and enable the SIC failure for that conditional leg.

## 6. P2 findings — qualifications, risk coverage, and presenter alignment

### F-21 — Visible customer total combines legally different positions

The displayed customer amount sums ordinary deposits and token amounts for all non-instruction models. For a stablecoin, CHF 900 owed by Bank A plus CHF 100 owed by an issuer is shown as one CHF 1,000 balance. It is not one debtor exposure, one depositor-protection balance, or necessarily one accounting balance.

**Required correction:** display ordinary deposit and token/issuer claim separately. If a convenience total remains, label it `illustrative positions total — multiple claims/debtors`.

### F-22 — Generic bank and inspector labels remain scenario-inaccurate

Examples include:

- Bank A and Bank B buildings always say `commercial-bank liability`, including stablecoin direct-transfer scenes;
- Bank A's drawer says `Settlement processed` from step 5 in mint, redeem, and same-bank flows;
- Bank B's drawer can say `Accepted` in mint, redeem, or mismatch, where Bank B is dormant and no acceptance occurs;
- stablecoin CBS authority is corrected only for direct interbank, not for other stablecoin scenarios;
- netting initially selects Alice although the scenario concerns bank or scheme obligations.

**Required correction:** derive actor role and status from model and scenario, not only step number.

### F-23 — Reconciliation failure is enabled without a visible mismatch

Outside the dedicated mismatch scenario, selecting `Reconciliation mismatch` changes the ribbon and failure chip but does not show two disagreeing records. The values on screen can remain matched.

**Required correction:** inject a model-specific visible discrepancy in every enabled flow or disable this risk outside the dedicated mismatch scenario.

### F-24 — Failure applicability contradicts two scenario narratives

- AML/sanctions failure is disabled for wholesale CBDC even though its `Checked` step says customer, bank, wallet, and participant-eligibility checks run.
- Receiving-bank/counterparty rejection is disabled for PvP even though its `Accepted` step says both recipients accept their new currency claims.

**Required correction:** enable those failures at the modelled gates, or move the relevant checks/acceptance outside the shown scenario and say so.

### F-25 — The failure paragraph loses scenario/model context at the trigger

When a failure becomes active, the main explanatory paragraph reverts from the combined model-aware text to the generic scenario sentence. A separate risk box now supplies model-specific text, which is an improvement over the previous audit, but the reader must combine two areas to understand what failed and which record controls.

**Required correction:** keep the model-aware intended action and append the failure result: what did not occur, what remains locked, which claim survives, and whether the next action is release, return, replay, or repair.

### F-26 — Important current risk classes have no selectable representation

The six risk controls are useful but do not cover several dependencies visible in the demo:

- CBS/GL outage or posting failure;
- correspondent or FX-provider failure;
- wCBDC/platform participant ineligibility or settlement-asset shortage;
- bridge attestor/custodian insolvency or governance failure;
- privacy/data leakage;
- timeout, duplicate, idempotency, and ambiguous outcome;
- cyber/provider outage distinct from a DLT halt; and
- post-finality internal credit failure.

FINMA Guidance 01/2026 is directly about custody of third-party cryptobased assets and should not automatically be applied to the bank's own deposit liability. It nevertheless confirms why provider, foreign-insolvency, and retained-responsibility questions matter when the demo introduces custody or an external bridge. FINMA Guidance 04/2026 also reinforces that product, service, customer, and country risk must align with the institution's risk analysis.

**Required correction:** the demo need not simulate every risk, but it should disclose the omitted classes and add at least CBS/posting failure, timeout/ambiguous result, and post-SIC receiver-credit failure.

### F-27 — Cross-border “final” status is too absolute for a conceptual route

The correspondent path becomes `Foreign leg final` only after both currency legs, correspondent records, receiving credit, and reconciliation. This is a reasonable completion rule for the demo, but it does not identify each system's legal finality event or whether the origin-bank claim was redeemed or transformed.

**Required correction:** label this `end-to-end workflow complete` and show each leg's settlement/finality evidence separately if the demo wants to make a legal-finality claim.

### F-28 — Presenter opening applies a mirrored invariant to the default instruction model

The presenter script says the starting model keeps CBS/GL authoritative and that every token unit is backed by a corresponding token-enabled deposit liability. The demo opens on `Payment instruction`, not `Mirrored deposit`. An instruction ticket is not automatically a deposit-liability unit.

**Required correction:** instruct the presenter to select `Mirrored deposit` before stating the supply invariant, or give separate opening wording for the instruction model.

### F-29 — Presenter script refers to a conditional-payment flow that does not exist

The script instructs the presenter to show a lock/release condition and trigger expiry or failure. The current demo has no conditional-payment or escrow scenario. PvP and bridge locks are not a substitute for a customer conditional-payment flow.

**Required correction:** remove the segment until implemented, or add a clearly scoped conditional/escrow scenario.

### F-30 — Presenter describes an Agorá five-stage walkthrough that the UI does not implement

The script tells the presenter to show confirmation of payee, path discovery, validation, locking, and settlement. None of the current advanced scenarios uses those five named stages. The correspondent flow begins with `Requested` and `Checked`, then jumps to FX locking and currency legs.

The five-stage description itself remains supported by the May 2026 Agorá report. The problem is the claim that the current UI demonstrates it.

**Required correction:** either add an Agorá-specific flow or change the script to describe Agorá verbally as a comparison that is not rendered.

### F-31 — The demo-to-research claim map is not a visible-claim map

The map includes a FINMA/regulatory panel, journal entries, and roadmap/vendor claims that the current demo does not display. It does not identify the actual dynamic strings, scenario states, actor labels, or failure claims reviewed in this audit.

**Required correction:** make one row per visible concept or state family and include the model/scenario scope, exact qualification, and audit status.

### F-32 — The UI does not expose the research cut-off or source route

The page says `Illustrative presentation` but gives no research date and no link to the claim map or source register. A viewer who receives the HTML without the presenter script cannot tell which evidence version controls.

**Required correction:** add a compact footer or `About this demo` panel with the cut-off, illustrative status, and links to chapters 01, 06, 07, 08, and 10.

## 7. UI and accessibility findings

### U-01 — The page is not responsive below 980 px (P2)

`body { min-width: 980px; }` forces horizontal scrolling. At a 390 px viewport the document scroll width was 980 px, so 590 px of content lay outside the viewport. The model tabs, flow controls, header explanation, stage, and inspector were cut off rather than reorganized.

**Required correction:** add a responsive presentation mode. A narrow layout should stack the model selector, scenario controls, canvas, and explanation rather than shrink the full desktop stage.

### U-02 — Inspector and step content can be clipped at the supported minimum width (P2)

At 1000 × 800, the actor inspector had a 290 px client height and 313 px scroll height while `overflow: hidden`; the step explainer also exceeded its client height. The bottom content is therefore unreachable. The fixed 64% plus 42% flex allocation also competes for more than the drawer height before shrinking.

**Required correction:** allow internal scrolling or content-driven height, and do not hide overflow in an explanatory panel.

### U-03 — The product tablist does not implement tab keyboard behavior (P2)

The model controls use `role="tab"`, but:

- all four remain in the normal tab order;
- no roving `tabindex` is set;
- ArrowRight does not move or select the next tab; and
- there is no associated `tabpanel`/`aria-controls` relationship.

**Required correction:** implement the ARIA tabs pattern or use ordinary buttons with `aria-pressed`, which is simpler for this interface.

### U-04 — Core-flow selection is visual only (P2)

Core flow buttons receive an `is-selected` class but no `aria-pressed`, `aria-current`, or equivalent state. A screen-reader user hears five ordinary buttons without knowing which flow is active.

**Required correction:** expose the selected state programmatically.

### U-05 — Nested and irrelevant SVG controls complicate focus (P2)

Each bank is a focusable `role="button"` containing another focusable `role="button"` for its CBS/GL. Dormant Bank B and Luca objects remain focusable even in scenarios where they have no role. This creates nested interactive semantics and an unnecessarily long, contextually misleading focus sequence.

**Required correction:** use sibling hit targets, remove dormant objects from the tab order, and provide a consistent focus order outside or alongside the graphic.

### U-06 — Several explanatory labels are too small for the intended mixed audience (P3)

The UI uses 8–10 px text for issuer captions, context, risk copy, model labels, and rail subtitles. These sizes are difficult in presentation settings and become worse when the canvas scales.

**Required correction:** set a practical minimum for explanatory text and move dense details into the inspector instead of embedding them in the scaled SVG.

### U-07 — Keyboard shortcuts are undisclosed (P3)

Space, ArrowRight, and `R` control the simulation when focus is outside common form elements, but no help text announces the shortcuts. ArrowRight on an SVG actor also advances the flow because the actor is not an HTML button element.

**Required correction:** document shortcuts and scope them to the explorer or use explicit controls only.

### U-08 — Project spelling standard is inconsistent (P3)

The project documentation standard uses `tokenized`, but the introductory UI uses `Tokenisation`. This is editorial, not factual.

**Required correction:** use `tokenized/tokenization` consistently except in official titles or quoted source terminology.

### U-09 — The timeline exposes count but not step semantics (P3)

The seven visual bars are unlabeled spans. The separate live text announces the current name and count, but a nonvisual user cannot inspect completed, current, and remaining steps as a sequence.

**Required correction:** render an ordered list with an accessible current-step marker while retaining the compact visual bars.

### U-10 — Static fallback content differs from initialized content (P3)

Before JavaScript initializes, the HTML says `DEBTOR Bank A` and uses shorter model facts; initialization changes the debtor to `Bank A after acceptance` and replaces several texts. This is mainly a no-script and transient consistency issue.

**Required correction:** align the initial HTML with the first rendered state or include a clear no-script message.

## 8. Scenario-by-scenario assessment

| Scenario | Sound core idea | Current correction required |
|---|---|---|
| Convert/mint | Existing value is reserved/reclassified before controlled creation; no new wealth is created merely by tokenization. | Gate failed mint; separate instruction units from deposit-token supply; show stablecoin funding and protection structure. |
| Redeem/burn | The digital representation is disabled before conventional value is released. | Start with the unit present and align burn/evidence/release mutations with their named steps. |
| Same bank | Bank-issued liability is reallocated without SIC; issuer total remains unchanged. | Move the holder at the transfer/acceptance event and use issuer-specific wording for stablecoin. |
| Swiss interbank | Customer claims and SIC settlement money are separate. | Fix failed SIC/receiver state and label the burn-settle-issue variant. |
| Gross versus net | CHF 100 and CHF 60 produce CHF 160 gross activity and CHF 40 net obligation; netting is not default SIC RTGS behavior. | Resolve the stablecoin/SIC contradiction and identify the upstream netting rulebook. |
| Correspondent + FX | Cross-border payment adds FX, correspondents, domestic rails, and receiving acceptance. | Implement one model-specific claim transformation and avoid a generic foreign-bank debtor outcome. |
| Cross-border PvP | Both-or-neither reduces principal risk but does not remove other risks. | Track both currencies independently and add the missing acceptance failure. |
| Wholesale CBDC | Institutional central-bank money is distinct from the customer-facing claim. | Show an institutional asset transfer or relabel the flow as conceptual comparison. |
| Bridge/wrapped token | Source lock and destination representation add bridge/key/governance risk. | Render two ledgers and a coherent terminal claim; gate failed wrapping. |
| Mismatch + recovery | Pause, investigate, repair with evidence, and resume is the correct control pattern. | Use model-specific records, show real mismatches wherever enabled, and release the final held status. |

## 9. Model-by-model assessment

### Payment instruction

The distinction between the ordinary deposit and the tokenized instruction is well explained in the new text. The current state engine undermines that distinction by calling instruction units CHF token supply and by completing several advanced flows without the corresponding CBS debit/credit.

The final implementation must keep three events separate:

- Alice's existing Bank A deposit;
- the payee's rights under the payment instruction before and after acceptance; and
- the ordinary-account posting that executes the payment.

### Mirrored deposit

The basic CBS-authoritative model is coherent: one liability, a CBS/token subaccount, a controlled representation, and continuous reconciliation. It is the strongest current demo path. Its main defects are failure leakage, late successful mutations, and an unlabeled interbank liability-transformation choice.

### Native on-chain deposit

The model text correctly declares DLT authority and CBS/GL reporting synchronization. Advanced-flow state must preserve that authority, and repair must not imply that confirmed DLT history is simply edited. Use a compensating event, approved migration/fork, or reporting correction as appropriate to the product rulebook.

### Non-bank stablecoin

The direct interbank description is substantially improved: it correctly says SIC and a new Bank B deposit are not intrinsic to a direct issuer-ledger transfer. Remaining screens still reuse bank-deposit assumptions, aggregate positions across debtors, and merge reserve and guarantee structures.

## 10. Current-source conclusions

### FINMA

The current FINMA crypto-services index still lists Guidance 06/2024 as the principal recent stablecoin guidance. No general FINMA approval or bespoke rule for `tokenized deposits` was found. The demo correctly avoids claiming approval.

Guidance 06/2024 supports these conclusions:

- stablecoin holders generally have a payment claim against the issuer;
- AMLA is almost always applicable to the usual means-of-payment model;
- supervised issuers require identified holders and transfer restrictions under FINMA's stated practice; and
- a bank default guarantee is a distinct structure whose protection is not equivalent to a banking licence or statutory deposit protection.

The demo's `issuer or guarantor` and `reserve / guarantee` fields therefore need correction; the broader warning that stablecoin deposit protection is not automatic is sound.

### SIC and SNB

The September 2025 SIC disclosure confirms:

- SIC is a real-time gross settlement system;
- payments settle individually in central-bank money; and
- a payment is irrevocable and final when the settlement-account debit occurs.

The demo's no-failure SIC explanation is sound. Its SIC-failure state is not.

The current Helvetia FAQ confirms that:

- wCBDC is issued to eligible financial institutions;
- it represents SNB sight deposits in a technically different form in the pilot;
- the pilot supports integrated and synchronized settlement approaches;
- it runs until at least June 2028; and
- it is not a commitment to permanent wCBDC.

The demo's distinction between institutional wCBDC and the customer claim is sound. Its simulated `Atomic settle` lacks the balances needed to demonstrate that event.

### SBA Deposit Token PoC

The report supports the demo's instruction-model distinction: the PoC used on-chain tokenized payment instructions to trigger off-chain bank-account movements. It also supports the need to state acceptance, account credit, SIC settlement, and legal-finality rules separately.

It does not support treating an instruction ticket as a native deposit-token supply or presenting one burn-settle-issue sequence as the only interbank design.

### Project Agorá source update

The BIS page was updated on 30 July 2026 after the May report used as the local primary source. It now records:

- eight central banks and over 40 financial institutions;
- controlled real-value testing in July 2026;
- 28 institutions and central banks;
- 17 transaction scenarios; and
- total values of approximately CHF 800,000.

This update does not make Agorá a finished product and does not establish production throughput, resilience, live CBS/RTGS integration, or a final Swiss legal rulebook. The presenter's production limitations remain supportable.

The active source register should nevertheless add the 30 July update, and chapter 08 should reconcile its May-report statement of seven central banks with the current BIS page's eight. This is a source-maintenance observation; the current demo does not display a participant count.

## 11. Confirmed sound content to preserve

The following statements survived the full audit and should remain:

1. A bank deposit is a legal claim on a bank, not merely an app balance or token.
2. Token technology does not by itself identify the debtor, legal claim, or authoritative record.
3. A payment instruction, mirrored deposit, native deposit claim, and non-bank stablecoin can look similar while having different legal effects.
4. A CBS-authoritative mirror represents one liability in coordinated records, not two deposits.
5. A same-bank transfer of a bank-issued claim does not require SIC.
6. The retail/customer token does not enter the SNB; a separate interbank asset settles between eligible institutions.
7. SIC is central-bank-money settlement, and gross versus separately calculated net obligations must not be confused.
8. A direct stablecoin issuer-ledger transfer does not automatically create a Bank B deposit or require SIC.
9. PvP protects against one-sided principal settlement but does not remove liquidity, replacement-cost, legal, or operational risk.
10. Wholesale CBDC remains distinct from a retail customer's commercial-bank deposit.
11. Bridge/wrapped-token designs add key, contract, governance, and redemption dependencies.
12. A mismatch should pause minting and outbound movement and enter an evidence-based repair process.
13. Technical confirmation is not automatically legal settlement finality.
14. The numerical gross/net illustration is correct: CHF 100 plus CHF 60 is CHF 160 gross activity and a CHF 40 net obligation from Bank A to Bank B.
15. The fixed 1 CHF = 1 EUR rate is clearly labelled illustrative rather than market data.

## 12. Remediation order and retest gates

### Gate 1 — stop impossible failure states

Correct F-01 through F-03. Retest every enabled failure and assert that the failed mutation did not occur.

### Gate 2 — align successful actions with state

Correct F-04 through F-10. At each step, verify that labels, balances, holder, debtor, authority, and finality describe the same event.

### Gate 3 — make advanced scenarios explicit

Correct F-11 through F-20. Each route needs a declared claim-transformation and settlement model; no advanced flow should reuse a generic state merely because the animation path is similar.

### Gate 4 — reconcile risks and presenter material

Correct F-21 through F-32. The script and claim map must describe what the current UI actually demonstrates.

### Gate 5 — visual and accessibility refactor

Correct U-01 through U-10 after factual state is stable. Recheck at minimum:

- 1440 × 900 desktop;
- 1024 × 768 compact laptop/tablet landscape;
- 390 × 844 narrow/mobile;
- 200% browser zoom;
- keyboard-only operation;
- screen-reader selected-state and live-status output; and
- reduced motion.

### Completion criteria

The demo can be called factually aligned only when:

- every failure preserves the correct pre-failure or explicit suspense state;
- every named action is reflected at the same step in balances and claims;
- every debtor and authority label is model-specific;
- finality is qualified by layer;
- both legs of cross-border/PvP/bridge/wCBDC examples are independently visible;
- presenter and claim-map text matches the implemented flows;
- the full 280-state and 153-failure matrix passes again; and
- no critical explanatory content is clipped or inaccessible.

Until then, use the demo as a discussion aid with a presenter who states the selected assumptions, not as a self-contained legal or operational simulation.
