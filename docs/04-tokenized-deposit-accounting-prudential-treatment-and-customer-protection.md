# Tokenized-Deposit Accounting, Prudential Treatment, and Customer Protection

**Research cut-off:** 24 August 2026<br>
**Status:** policy analysis; all entries and regulatory mappings require auditor and policy-owner approval

## 1. Economic starting point

In the recommended mirrored model, tokenization does not create a second liability. It changes the operating representation of an existing deposit or moves an amount between ordinary and token-enabled customer subaccounts under the same bank liability.

The control objective is:

`eligible token liability in the CBS = customer token subledger total = valid token supply`

Any suspense, reservation, interbank payable, or settlement account must be reconciled separately and must not be used to conceal a break in this invariant.

### Worked balance-sheet story

The examples in this chapter use one simple lifecycle. Alice begins with CHF 1,000 in an ordinary deposit at Bank A. She converts CHF 200 to token-enabled form, pays Bob CHF 50 at the same bank, and later redeems CHF 25. The bank still owes its customers the same aggregate amount unless a fee, interest entry, external payment, or other economic event changes it.

After conversion, Bank A owes Alice CHF 800 in ordinary form and CHF 200 in token-enabled form. After the same-bank payment, it owes Alice CHF 150 and Bob CHF 50 in token-enabled form. After Alice redeems CHF 25, it owes her CHF 825 in ordinary form and CHF 125 in token-enabled form. No bank asset moved in these three steps, and no additional CHF was created; only the classification and creditor attribution changed.

### How to read the accounting

These are the bank's books, not the customer's personal accounting. A customer deposit is a liability: increasing what the bank owes is a credit and reducing it is a debit. An SNB sight deposit is an asset: an increase is a debit and a reduction is a credit. This is why a same-bank payment can debit one customer liability and credit another without moving any bank asset.

Mint and burn are technical events. They cause a journal entry only when the approved accounting policy says the bank's recognized liability or its internal classification changes. A reservation may remain a customer-subledger status until the legal recognition point rather than becoming a separate statutory GL position.

The tables use “debit” and “credit” from Bank A's perspective. Debiting Alice's deposit liability reduces what Bank A owes Alice; crediting Bob's deposit liability increases what it owes Bob. By contrast, debiting Bank A's SNB sight-deposit asset increases that asset. This bank perspective is why the entries may look reversed to a customer reading a personal account statement.

### Suggested account structure

The bank can use product tags and control accounts while preserving statutory reporting categories.

- **Assets:** SNB/SIC settlement balances, correspondent balances, due-from positions, collateral, and tightly aged repair receivables.
- **Liabilities:** ordinary customer deposits, token-enabled customer deposits, due-to settlement positions, accrued interest, and controlled unallocated funds.
- **Control records:** token supply by issuer/currency/version, wallet-to-customer mapping, available/reserved/pending/frozen state, settlement references, and contract/event evidence.

Creating a management subcategory called “token liability” does not mean a new liability exists. It must roll up to the correct customer-deposit or other statutory line according to the approved classification.

## 2. Recognition points

A transaction passes through several technical and operational moments. Treating the first successful API call or ledger event as “the booking” would obscure what the bank has actually recognized. The following table separates those moments so accounting policy can select the authoritative one and specify how pending states appear to customers and operators.

| Event | Authorization | Token state | Accounting recognition | Legal effect |
|---|---|---|---|---|
| Mint request | Customer instruction and controls accepted | Not yet minted | Reservation or subaccount transfer, according to approved policy | Deposit remains claim on bank |
| Mint completion | Orchestrator proves preconditions | Units created | Confirm token-enabled subaccount/control position | Terms define holder evidence |
| Transfer pending | Limits and compliance pass | Funds locked | Reservation only unless policy defines another point | No final creditor change yet |
| Transfer committed | Required ledger events complete | Ownership state changes | Customer subledger transfer or interbank entry | Defined by contract and settlement rules |
| Redemption | Valid units controlled and burn authorized | Units burned | Move from token-enabled to ordinary available balance | Deposit continues in ordinary form |
| Failed workflow | Failure or timeout | No change or released lock | Reverse reservation/suspense only | Original rights preserved unless law requires otherwise |

The bank must choose and document these points. Technical confirmation alone is not an accounting policy.

## 3. Illustrative journal entries

The entries below show logic, not approved account names.

The first group covers internal changes within Bank A. They demonstrate the main control point: a technical mint, transfer, or burn should never cause the same economic amount to appear twice in total customer liabilities.

### Same bank: ordinary deposit to token-enabled deposit

| Debit | Credit | Amount | Comment |
|---|---|---:|---|
| Customer ordinary-deposit liability | Customer token-enabled deposit liability | CHF X | Reclassification within total customer deposits; no new total liability |

Mint occurs only after the booking or reservation required by policy succeeds. A mint failure must leave the ordinary deposit usable or restore it deterministically.

### Same bank: transfer from Customer A to Customer B

| Debit | Credit | Amount | Comment |
|---|---|---:|---|
| Token-enabled deposit liability - A | Token-enabled deposit liability - B | CHF X | Total bank liability unchanged |

### Redemption

| Debit | Credit | Amount | Comment |
|---|---|---:|---|
| Customer token-enabled deposit liability | Customer ordinary-deposit liability | CHF X | Burn and accounting entry follow one controlled workflow |

### Fee

| Debit | Credit | Amount | Comment |
|---|---|---:|---|
| Customer deposit liability | Fee income or fee receivable settlement account | CHF F | Apply tax and revenue-recognition policy separately |

These same-bank entries should reconcile to the worked example. Converting CHF 200 is a reclassification; transferring CHF 50 changes which customer is the creditor; redeeming CHF 25 returns that amount to Alice's ordinary available balance. A separately charged fee is different because it can reduce the amount owed to the customer and recognize income under the bank's normal policy.

The second group illustrates one interbank model. It assumes that the recipient becomes a depositor of Bank B and that central-bank money settles the corresponding obligation between the two banks. Different legal models produce different books.

### Interbank burn-settle-issue: sending bank

| Debit | Credit | Amount | Comment |
|---|---|---:|---|
| Customer deposit liability | Due to settlement / SIC payable | CHF X | Customer claim is reduced at the approved recognition point |
| Due to settlement / SIC payable | SNB sight-deposit asset | CHF X | Central-bank money settlement |

### Interbank burn-settle-issue: receiving bank

| Debit | Credit | Amount | Comment |
|---|---|---:|---|
| SNB sight-deposit asset | Customer deposit liability | CHF X | Receiving bank creates its own liability after settlement evidence |

Other interbank legal models require different entries. If Bank A's token remains a claim on Bank A while held by Bank B's customer, Bank B may instead recognize custody, agency, receivable, or other positions depending on the contracts and control of the asset. This is an open accounting and legal issue, not a choice for engineering alone.

Suppose Alice sends CHF 40 to a Bank B customer using burn-settle-issue. Bank A reduces its liability to Alice at the approved point and transfers CHF 40 of its SNB asset. Bank B receives CHF 40 of central-bank money and creates a CHF 40 deposit liability to its customer. The payment changes both banks' balance sheets; it is not the same event as moving CHF 40 between two customers of Bank A.

### Accounting depends on the representation

- **Payment-instruction token:** the ordinary deposit remains the liability until the accepted instruction produces the approved posting. Minting an instruction should not create a second customer liability.
- **Mirrored tokenized deposit:** the bank records one customer liability, often with an internal ordinary/token-enabled split, and treats token state as a controlled subledger representation.
- **Platform-authoritative deposit:** platform events may be the primary customer subledger, so the policy must explain how they drive GL recognition, statements, correction, and cut-off.
- **Tokenized security or custody asset:** the bank may be custodian rather than debtor. Deposit accounting and protection cannot be copied to that asset.
- **Other-bank token:** the holder has exposure to another issuer or arrangement. The bank must assess asset recognition, custody, counterparty, valuation, liquidity, and large-exposure treatment.

## 4. Error and failure accounting

Failures must preserve the economic truth even when systems complete in different orders. A **reversal** removes an entry that policy permits the bank to undo. A **release** makes reserved value available again because no recognized transfer occurred. A **compensating entry** records a new correction linked to the original event. It does not erase a completed or legally final transaction.

| Situation | Expected treatment principle |
|---|---|
| Duplicate message | Idempotency key returns the original outcome; no second posting or mint |
| Booking succeeds, mint fails | Reverse or release the booking using the approved compensating path |
| Token locks, settlement fails | Release lock; do not create receiver liability |
| Settlement succeeds, receiver issuance fails | Place amount in a controlled due-to/customer suspense state and escalate; never silently reverse legally final settlement |
| Ledger and CBS disagree | Freeze affected movement, preserve evidence, reconcile to the legally authoritative record, and use approved correction entries |
| Fraud or invalid instruction discovered later | Follow legal reversal/recovery process; do not rewrite immutable history as if the event never occurred |

The decisive question is whether any external or legally effective leg has already completed. Before that boundary, the bank may be able to cancel and restore the original available balance. After it, the bank may need a suspense or due-to position, a customer claim, and controlled repair rather than a technical rollback. Operations must be able to identify this boundary from evidence, not from an ambiguous “failed” status.

## 5. Reconciliation, reporting, and audit evidence

The bank should be able to demonstrate three control equations.

```text
valid token supply by issuer, currency, and contract version
  = token customer subledger total
  = token-enabled deposit GL control balance
```

```text
available + reserved + pending + frozen
  = total controlled token position for each customer
```

```text
customer instruction
  <-> policy decision
  <-> CBS reservation and journal
  <-> token event
  <-> SIC or external settlement reference
  <-> receiving-bank acceptance
```

A mismatch should stop new issuance and affected outbound transfers, preserve inbound value, and open a controlled incident. Correction uses an approved compensating entry linked to the original event; immutable history is not rewritten to hide the error.

Financial reporting should follow the underlying legal and accounting substance. Material disclosures may need to explain redemption, transfer restrictions, technology and key dependencies, concentration, outsourcing, and reconciliation. FINMA Guidance 03/2025 concerns disclosure of cryptobased assets treated as customer custody assets; it does not create the accounting line for a bank's own tokenized deposit liability ([FINMA, 5 September 2025](https://www.finma.ch/en/news/2025/09/20250905-meldung-am-kryptovermoegenswerte/)).

An auditor should be able to replay:

`instruction -> identity/policy decision -> CBS/GL -> token event -> settlement -> customer statement`

Evidence includes actors, approvals, timestamps, before/after balances, contract and policy versions, idempotency keys, reason codes, external messages, and every correction.

## 6. Prudential analysis

Tokenization can leave the underlying deposit economics unchanged while changing transfer speed, customer behavior, operational exposure, and the bank's holdings of other issuers' instruments. Prudential analysis must therefore examine both the legal balance-sheet item and the new risks introduced by the activity.

| Topic | Working view | Required confirmation |
|---|---|---|
| Capital | Own-bank deposit liability does not become an asset exposure merely because it is tokenized; technology and other-party exposures may create capital consequences | Swiss mapping under CAO and FINMA implementing ordinances |
| Leverage | Balance-sheet positions remain in the leverage exposure measure according to their accounting treatment | Auditor and regulatory reporting owner |
| LCR/NSFR | Outflow behavior may differ by customer type, transferability, redemption speed, and stress behavior | Product-specific classification and behavioral evidence |
| Minimum reserves | Deposit classification and reporting drive reserve treatment, not the token label | SNB reporting and policy confirmation |
| Large exposures | Other-bank token holdings or network exposures may create counterparty concentrations | RDO-FINMA transition and exposure aggregation |
| Operational risk | DLT, keys, smart contracts, third parties, and complex reconciliation expand operational scenarios | FINMA Circular 2023/1 and internal capital/risk assessment |
| Disclosure | Own liabilities and customer custody assets must not be conflated | FINMA Accounting Ordinance, Circular 2020/1, auditor view |

The Basel [SCO60 cryptoasset framework](https://www.bis.org/basel_framework/chapter/SCO/60.htm?inforce=20260101) is current from 1 January 2026 and expressly includes tokenized claims on banks in parts of its liquidity framework. Its classification and disclosure provisions must be mapped to current Swiss implementation rather than copied directly into a Swiss policy.

FINMA issued a set of implementing ordinances for the final Basel III reforms effective from 1 January 2025. The bank should use the current ordinances listed on FINMA's [banking legal-basis page](https://www.finma.ch/en/documentation/legal-basis/laws-and-ordinances/banks/), not only older circular references.

### Minimum reserves and central-bank money

Tokenization does not make customer funds central-bank money or automatically remove them from minimum-reserve and statistical reporting. Balances need attributes for currency, maturity, withdrawal rights, and customer type. SNB sight deposits used by banks in SIC are the central-bank settlement asset; the customer's token remains a private claim on the issuing bank.

### LCR and stress outflows

A tokenized sight deposit may have the same contractual maturity as an ordinary sight deposit while moving faster, around the clock, or automatically. Treasury should model:

- rapid mint-to-transfer-to-redeem cycles;
- weekend and out-of-hours peaks;
- programmatic mass payments;
- concentration by platform or wallet provider;
- sanctions holds and false-positive releases;
- rail, node, key-service, or CBS outages during stressed redemption.

Basel SCO60 includes liquidity treatment for qualifying tokenized claims on regulated banks, but holder classification, earliest redemption, and the conditions for treatment matter. The international standard must be mapped to Swiss LiqO/LiqO-FINMA rules and reporting with FINMA and the auditor.

### NSFR, capital, leverage, and large exposures

NSFR treatment follows stable-funding characteristics and effective maturity, not the use of DLT. A product that can be redeemed immediately should not be assumed to provide stable retail funding merely because historical ordinary-account balances were stable.

Issuing the liability does not itself create a new risk-weighted asset, but the funded assets retain their normal treatment and the activity adds operational, cyber, fraud, and settlement risk. Holdings of another bank's token can create credit, liquidity, leverage, and concentration questions. A bank-issued token is not an SNB reserve asset merely because it normally redeems at par.

### Intraday and 24/7 liquidity

Twenty-four-hour token availability does not create twenty-four-hour unlimited liquidity. The operating model must cover pre-funding, queues, collateral, cut-offs, correspondent availability, and repair when the token workflow is open but a settlement or treasury service is not.

Three scenarios illustrate why legal classification alone is insufficient:

- **Rapid retail outflow:** customers can move tokenized sight deposits continuously during stress. The contractual liability may be familiar, but faster behavior can change operational liquidity assumptions, concentration monitoring, and contingency-funding needs.
- **Open token rail, closed settlement dependency:** a token instruction arrives while the necessary interbank or FX service is unavailable. The product must queue, reject, or limit the instruction without promising settlement the bank cannot fund or complete.
- **Other-bank token holding:** Bank A holds or safeguards a transferable token owed by Bank B. Unlike Bank A's own liability, this can create another-bank credit, custody, liquidity, valuation, and concentration questions.

These scenarios should be quantified using the intended holders, limits, operating hours, redemption terms, and settlement model. Historical behavior of ordinary deposits is evidence, but it is not automatically a safe assumption for a more transferable or programmable product.

## 7. 2027 transition items

The instruments in this section were finalized at the research cut-off but were not yet effective. The bank should continue to apply the requirements in force during 2026, while updating classifications, reports, limits, and policies in time for the 2027 effective date. Future-effective rules are implementation requirements for the stated date, not current law applied retroactively.

| Change | Effective date | Project impact |
|---|---|---|
| FINMA Ordinance on Risk Diversification (RDO-FINMA) | 1 January 2027 | Replaces Circulars 2013/7 and 2019/1; update counterparty and concentration mapping |
| FINMA Ordinance on Liquidity (LiqO-FINMA) | 1 January 2027 | Replaces Circular 2015/2; includes technical provisions on liquidity shortages and planning |

Sources: [FINMA RDO-FINMA release](https://www.finma.ch/en/news/2026/05/20260520-mm-rvv-finma/) and [FINMA LiqO-FINMA release](https://www.finma.ch/en/news/2026/07/20260707-mm-liqv-finma/).

The transition review should identify which references to the replaced circulars remain in treasury policies, risk systems, exposure calculations, vendor requirements, control testing, and the tokenized-deposit approval pack. It should also determine whether pilot limits or liquidity assumptions need to be retested under the new ordinances.

## 8. Customer and depositor protection

Swiss depositor protection depends on the legally recognized deposit, customer, bank, account aggregation, and statutory eligibility. A token interface should neither imply extra protection nor accidentally obscure an eligible claim. FINMA explains the statutory framework and limits on its [depositor-protection page](https://www.finma.ch/en/supervision/banks-and-securities-firms/depositor-protection/).

| Question | Retail emphasis | Wholesale/corporate emphasis |
|---|---|---|
| Eligibility | Explain whether and how token-enabled balances aggregate with other deposits | Check entity and balance eligibility and exclusions |
| Statements | Show issuer, available/locked balance, fees, and transaction status plainly | Provide legal entity, account, participant, and settlement references |
| Access failure | Recover wallet/device access without changing entitlement | Controlled credential and signatory recovery |
| Fraud/error | Investigation, complaint, and refund/recovery pathway | Rulebook process, claims, evidence, and cut-offs |
| Insolvency | Make claim and protection position understandable | Address counterparty, custody, set-off, and resolution effects |

Wallet and token counts do not create additional protection limits. The bank needs one customer identity that aggregates ordinary and token-enabled deposits and can produce the statutory depositor position at the legal cut-off. Pending instructions and custody assets must be shown separately rather than silently included in or excluded from that total.

Using the worked example, Alice's CHF 825 ordinary balance and CHF 125 token-enabled balance remain claims against the same bank and must be considered together when the bank determines her eligible position. If a corporate customer holds a token issued by another bank through Bank A's interface, that position cannot be assumed to be a protected deposit at Bank A. The legal debtor and holder eligibility must be established first.

## 9. Interest, fees, tax, and reporting horizon

Interest, negative interest, fees, value dates, and statements should follow the underlying deposit terms unless the product deliberately changes them. Interest accrual normally increases the bank's liability; it does not require minting until policy decides how the additional amount becomes available in token form.

Dormant-account, death, incapacity, and unclaimed-asset processes continue to apply to the customer relationship. A wallet should not bypass them or cause the bank to lose the mapping to the legal customer.

Tax treatment depends on the service and relationships, not simply use of DLT. CARF/AEOI applicability must be assessed if the bank provides covered cryptoasset services. Switzerland's cryptoasset AEOI cannot be implemented before 1 January 2027 at the earliest, and the crypto provisions do not apply in 2026 ([SIF status, 18 May 2026](https://www.sif.admin.ch/en/framework-for-the-automatic-exchange-of-information-aeoi-on-crypto-assets)). Do not state that every tokenized deposit is automatically a reportable cryptoasset.

## 10. Treasury and balance-sheet scenario library

Static classification should be tested against the situations in which balances and liquidity behave differently from the normal path. At minimum, the treasury, finance, risk, and operations teams should model:

- full and partial same-day redemption;
- 24/7, weekend, and programmatic payment spikes;
- repeated conversion between ordinary and token-enabled balances;
- same-bank, interbank, and cross-border changes in payment velocity;
- SIC, correspondent, CBS, DLT, HSM, AML, sanctions, cloud, and telecommunications outages;
- receiving-bank rejection or participant default before and after an external settlement leg;
- a sanctions freeze or legal hold after funds are reserved;
- contract upgrade, fork, key compromise, or emergency pause;
- concentration by customer, wallet provider, issuer, currency, contract version, and corridor;
- delayed redemption, loss of par, or insolvency affecting an other-bank token held or safeguarded by the bank;
- recovery or resolution while customer payments remain pending.

Each scenario should record the customer claim, accounting entries, available and reserved balances, settlement asset, liquidity and collateral effect, LCR/NSFR assumptions, counterparty exposure, operational state, communications, and recovery owner. A tokenized deposit can retain ordinary legal economics while moving faster or creating more concentrated operational dependencies than the bank's historical deposit data captures.

## 11. Accounting policy evidence pack

Before pilot approval, produce a coherent evidence pack rather than isolated journal examples. The documents should use the same product version, event names, recognition points, and failure states:

- product and legal classification memo;
- event-to-journal matrix;
- chart-of-accounts mapping;
- recognition and reversal rules;
- financial and regulatory reporting mapping;
- LCR/NSFR and minimum-reserve assessment;
- depositor-protection aggregation treatment;
- month-end and incident reconciliation procedures;
- external-auditor conclusions and unresolved qualifications.

The pack should allow an independent reviewer to begin with a customer instruction and reproduce the resulting liability, token supply, settlement evidence, regulatory classification, and customer statement. Any unresolved difference between those views is a pilot blocker or an explicitly accepted limitation with a named owner.

## What this means for the bank

The safest accounting design prevents double counting: one deposit liability, one approved recognition point, and one traceable relationship among the CBS, GL, settlement evidence, and token supply. Prudential treatment must follow the legal and accounting substance, with explicit transition planning for 2027 rules.

Next: [05 - Tokenized-deposit system architecture and ledger records](05-tokenized-deposit-system-architecture-and-ledger-records.md).
