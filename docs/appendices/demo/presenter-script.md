# Archived v1 Tokenized-Deposit Demo Presenter Script

**Research alignment date:** 27 August 2026
**Use with:** [`demo/deprecated/v1/index.html`](../../../demo/deprecated/v1/index.html)
**Status:** presentation aid; the active research chapters control if the demo wording differs

## Opening

“This demo shows how a Swiss bank could represent an existing customer deposit on a controlled token ledger. The token is not automatically a stablecoin, security, or central-bank currency. It remains important to ask which bank owes the money and which record is authoritative.”

Point to the ordinary account, token balance, and bank ledger views.

“Our starting model keeps the core banking system and general ledger authoritative. The token ledger supplies programmability and shared workflow. Every token unit must be backed by one corresponding token-enabled deposit liability in the bank's books.”

## Mint

1. Select a verified customer and enter a small CHF amount.
2. Explain that the customer is converting an existing available balance, not receiving newly created wealth.
3. Run the mint flow.

Say:

“The bank first checks identity, authority, AML and sanctions conditions, limits, and available balance. The CBS then reserves or reclassifies the deposit. Only after that succeeds may the issuer's controlled service mint the token representation.”

After completion, point to the reconciliation view.

“The ordinary available amount falls, the token-enabled liability rises, and token supply rises by the same amount. Total bank liabilities do not double.”

## Same-bank transfer

Run a transfer between two customers of the same bank.

“The economic event is a change in which customer owns part of the bank's liability. The bank's total deposit liability does not change. The token event and CBS customer transfer must be coordinated and traceable under one transaction identifier.”

If the demo animates the token before the CBS, explain that animation order is illustrative. The production recognition point requires approved legal and accounting design.

## Conditional payment

Select **Conditional payment**. Step through request, checks, funds lock, condition pending, condition verified, release, and final agreement.

“Programmability is useful when two parties need shared assurance that funds are reserved and will release only under an agreed condition. It is not useful merely because an ordinary standing order could be redrawn as a smart contract.”

If useful, arm a supported failure before replaying the flow.

“Before the commit boundary, the safe result is cancellation and release. After an external settlement leg becomes final, the safe result may instead be controlled repair. Generic retries are not sufficient.”

## Interbank transfer

Select the interbank scenario.

“Bank A and Bank B issue different liabilities even though both are denominated in CHF. A transfer therefore needs an explicit model.”

Explain the alternatives:

- burn or reduce Bank A's liability, settle in central-bank money through SIC, then create Bank B's liability;
- coordinate a shared pending instruction and commit decision;
- allow the Bank A claim to continue circulating to the recipient.

“The demo may emphasize burn-settle-issue because it is easy to explain, but it is one design option rather than a universal FINMA requirement.”

## Cross-border and Project Agorá

Choose **Agorá five-stage payment** under **More flows**. Step through confirmation of payee, path discovery, private validation, locking and delegation, and settlement.

“This five-stage structure follows the useful pattern demonstrated by Project Agorá. Each bank keeps sensitive compliance, customer, path, and pricing logic in its own middleware. The shared workflow receives endorsed outcomes and coordinates settlement.”

Add the key qualification:

“Agorá's report-era PoC treated its platform as the authoritative record for tokenized deposits, and its later phase reached controlled real-value testing. This demo's recommended starting model keeps the CBS authoritative. Neither Agorá phase proved production throughput, resilience, live CBS/RTGS integration, or a final legal rulebook.”

## Reconciliation and failures

Show the reconciliation panel and inject at least one failure.

“The safety condition is not that every component is always online. It is that failures cannot create hidden value, lose a valid customer claim, bypass controls, or leave a transaction without an owner.”

Point out:

- token supply;
- customer token subledger;
- GL control position;
- locked and pending amounts;
- settlement evidence;
- incident or repair state.

## Closing

“The bank should decide the claim, books, settlement point, and recovery model before choosing a blockchain vendor. A credible pilot is narrow, limited, reversible where legally possible, and continuously reconciled.”

Direct follow-up questions to the [research index](../../README.md) and [implementation roadmap](../../09-tokenized-deposit-implementation-roadmap-and-vendor-assessment.md).
