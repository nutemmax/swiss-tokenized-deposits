# 06 — Presenter script for the interactive demo

Use the demo in short chapters. The on-screen text is intentionally brief; this script carries the explanation.

## 1. Open with the ordinary deposit

Start with **Payment instruction** and **Convert / mint**. Say:

> A normal bank deposit is already digital. The customer has a claim on the bank; there is no labelled pile of cash sitting in the account. The question is what the new token represents and which record remains authoritative.

Move the amount slider to CHF 100 and press **Step forward** through the first two states.

## 2. Payment-instruction token

Say:

> In this model, the token is closer to a payment ticket. It tells the bank to execute a payment. Before the bank accepts it, the holder does not automatically have a direct deposit claim against the bank. The ordinary account and CBS remain the important records.

Run the scenario to **Final**, then switch to **Mirrored tokenized deposit**.

## 3. Mirrored deposit

Say:

> “Mirrored” does not mean two deposits. The bank reclassifies or reserves CHF 100 in a token subaccount, then mints exactly CHF 100 of tokens. The mirror is a control record linked to the CBS. The invariant is token supply equals the token subledger equals the GL control balance.

Use **Convert / mint**, then **Redeem / burn**. Point out that burning removes the token representation; it does not destroy CHF economically.

## 4. Same-bank transfer

Select **Same-bank transfer** and run it.

Say:

> Alice and Luca both have claims against Bank A. Bank A does not need to move money through SIC. It reduces Alice’s claim and increases Luca’s claim. The bank’s total customer liability is unchanged; only the creditor allocation changes.

## 5. Swiss interbank transfer

Select **Swiss interbank transfer** and run it slowly.

Say:

> Now the banks are separate legal debtors. Alice’s Bank A claim does not simply travel to Bank B. Bank A reserves or extinguishes its claim according to the legal model. SIC moves central-bank money from Bank A’s SNB sight deposit to Bank B’s. Bank B then accepts the payment and creates its own customer claim for Luca.

Pause at **SIC settlement** and point out:

> The red retail token does not enter the SNB. The SNB movement is a separate interbank settlement leg.

## 6. Gross settlement and netting

Select **Gross settlement vs netting**.

Say:

> Netting is a settlement convention. If Bank A owes Bank B CHF 100 and Bank B owes Bank A CHF 60, the gross obligations are CHF 160 but a batch arrangement may settle only the CHF 40 net amount. That is different from SIC RTGS, where eligible payments settle individually and finally.

## 7. Native on-chain deposit

Switch to **Native on-chain** and rerun **Same-bank transfer**.

Say:

> In the native model, the DLT is the authoritative balance record. That can make programmability more direct, but it also makes recovery, legal finality, depositor lists, corrections, contract upgrades and resolution harder. CBS and GL are now downstream or synchronised systems rather than the only master record.

## 8. Non-bank stablecoin

Switch to **Non-bank stablecoin** and run **Convert / mint**.

Say:

> This is a different product. The holder’s claim is against a separate issuer or guarantee structure. A bank accepting the stablecoin does not automatically become the debtor. The reserve, guarantee, redemption and issuer insolvency need their own analysis.

## 9. Cross-border correspondent flow

Select **Cross-border correspondent + FX** and run it.

Say:

> Cross-border payments add another currency, legal system, payment system and often a correspondent bank. Tokenization may improve coordination and data quality, but it does not remove FX, sanctions, liquidity, local licensing or foreign settlement requirements. The rate shown here is illustrative only.

## 10. Cross-border PvP

Select **Cross-border PvP** and run it.

Say:

> Payment-versus-payment means the CHF and EUR legs settle together or neither completes. This can reduce principal risk, but only if the two systems recognise each other’s identity, finality, legal and operational rules.

Use the failure menu to inject a receiving-bank rejection or SIC/settlement failure and show that one leg does not quietly complete.

## 11. wCBDC and bridge comparison

Select **Wholesale-CBDC comparison**.

Say:

> Wholesale CBDC is a central-bank liability available to eligible institutions. It can be used as a settlement asset, but it is not the same as a commercial-bank customer deposit.

Select **Bridge / wrapped token**.

Say:

> A bridge adds another trust dependency. One token is locked, a wrapped representation is created elsewhere, and redemption depends on the bridge. Key compromise, reserve mismatch or contract failure can stop the path.

## 12. Reconciliation and failure

Select **Reconciliation mismatch + recovery** and step through the failure.

Say:

> A safe bank design compares three records: DLT supply, the customer token subledger and the GL control account. If they disagree, the bank pauses minting and outbound movement, investigates, replays the events and repairs under dual control. It does not silently edit the history.

Use the advanced failure menu to show AML rejection, DLT unavailability, SIC unavailability, key pause and mismatch. Emphasise that these are simulated operating states, not legal conclusions.

## Closing message

> The central design question is not “which blockchain should we use?” It is “what does the token represent, who owes the holder, which ledger is authoritative, and what happens when a transfer or system fails?” For a first Swiss-bank implementation, a permissioned CBS-authoritative mirrored model is the clearest starting point because it adds programmability while preserving the bank’s existing accounting, identity, liquidity and resolution controls.
