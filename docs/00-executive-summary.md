# 00 — Tokenized deposits in a Swiss bank: expanded executive summary

**Research date:** 13 August 2026  
**Audience:** people who understand ordinary banking, but may not know blockchain, payment systems or Swiss banking regulation
**Status:** an accessible research summary, not legal advice, an accounting opinion or FINMA approval

## The short version

A customer deposit is already digital money. When a customer has CHF 1,000 in a Swiss bank account, the customer does not own a specific pile of francs. The customer has a legal claim against the bank: the bank owes the customer CHF 1,000 and promises to pay it when the customer makes a permitted withdrawal or payment. The bank records that obligation in its core banking system (CBS) and general ledger (GL).

A **tokenized deposit** adds a controlled digital representation or payment mechanism to that existing bank claim. A token is not automatically a new kind of money, a cryptocurrency, a security, or a deposit-insurance entitlement. Its legal meaning comes from the contract, the bank's records, the transfer rules and the applicable law. FINMA repeatedly applies substance over labels: a fixed-CHF, redeemable claim may be a deposit, while a token structured only as a payment instruction may be a different legal object. [FINMA Guidance 06/2024](https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/4dokumentation/finma-aufsichtsmitteilungen/20240726-finma-aufsichtsmitteilung-06-2024.pdf)

For a first Swiss-bank implementation, the safest design is:

1. Keep the CBS and GL as the bank's authoritative records of customers, legal balances, holds, interest, fees, accounting and reporting.
2. Use a permissioned token network as a controlled payment and programmability layer, not as an uncontrolled public bearer-asset system.
3. Allow token creation only after the CBS has reserved and booked the corresponding amount.
4. Allow redemption only after the token has been disabled or burned and the bank has evidence of the final state.
5. Reconcile the token ledger, the customer token subledger and the GL continuously.
6. Define legal debtor, finality, AML, deposit-protection, insolvency and recovery rules before selecting a blockchain or vendor.

This is commonly called a **CBS-authoritative mirrored model**. It gives the bank a useful programmable payment rail without silently making an untested blockchain ledger the legal source of customer balances.

## The ordinary banking concepts underneath the technology

### A deposit is a claim, not a stored pile of cash

When Alice deposits CHF 100 with Bank A, Bank A records a liability of CHF 100 to Alice. Alice owns the right to claim CHF 100 from Bank A, subject to the account terms and applicable law. Bank A may use its assets and liquidity for banking business; it does not put Alice's particular notes in a labelled box.

There are several kinds of money in this picture:

- **Cash:** notes and coins issued by the Swiss National Bank (SNB).
- **Central-bank money:** a bank's sight-deposit balance at the SNB. Banks use these balances to settle with one another in Swiss Interbank Clearing (SIC).
- **Commercial-bank money:** a customer's deposit claim against a commercial bank. A tokenized deposit is normally still this kind of bank liability unless its legal design says otherwise.

Central-bank money is not the same as a customer's deposit. In an interbank payment, the SNB balance moves between banks while one bank's customer liability is extinguished and another bank's customer liability may be created.

### The CBS and general ledger

The **core banking system (CBS)** is the bank's operational system for customer accounts, balances, payment instructions, holds, interest, fees and statements. The **general ledger (GL)** is the accounting record that aggregates those customer-level postings into the bank's financial statements and regulatory reporting.

The CBS should answer questions such as “How much does this verified customer have available?”, “Is the account frozen?”, and “Which customer is entitled to the balance?” The GL should answer “What liability does the bank owe in total, and where is it presented in the accounts?”

The token ledger is a third record. It can show wallet balances and transfer events, but in the recommended first model it must remain linked to, and constrained by, the CBS/GL. The same CHF 100 must not appear as both an ordinary spendable deposit and a tokenized balance.

### A token, wallet and ledger

A **token** is a digital record that follows rules for ownership, transfer, creation and destruction. A **wallet** is the software or custody arrangement that controls the cryptographic keys used to authorize token operations. A **ledger** is the record of who has what balance and which events changed it.

“Blockchain” or **distributed ledger technology (DLT)** describes a way of keeping and synchronizing such records. A **permissioned** network admits only approved institutions, wallets or operators. A public network may allow anyone to hold and transfer a token. A supervised Swiss bank normally has stronger identity, sanctions, privacy, recovery and operational-control requirements than an anonymous bearer network provides.

The cryptographic token record is not, by itself, proof that the holder has a bank deposit. The contract must say whether it is:

- an instruction telling a bank to make a payment;
- a controlled representation of a bank's liability; or
- the authoritative record of a native on-chain bank liability.

## The main product models

| Model | What the customer has | Where the legal balance is authoritative | Main strength | Main difficulty |
|---|---|---|---|---|
| Payment-instruction token | An instruction or claim to have a bank execute a payment | CBS and ordinary account | Smallest change; closest to the 2025 Swiss Bankers Association (SBA) proof of concept | A token holder may not yet have a direct deposit claim until the paying/receiving bank accepts the instruction |
| Mirrored tokenized deposit | A bank claim represented by a token plus a CBS subaccount | CBS/GL, reconciled to the token ledger | Retains banking controls while adding programmability | The contract must precisely define the token's legal effect and transfer moment |
| Native on-chain deposit | A claim whose authoritative balance is on the DLT | DLT integrated with CBS, GL and resolution systems | Most composable and potentially fastest | Finality, insolvency, correction, reporting, privacy, key recovery and depositor protection become much harder |
| Non-bank stablecoin backed or guaranteed by a bank | A claim on a separate issuer | Issuer's ledger and reserve/guarantee arrangements | Can distribute outside the bank's account system | Different licence, reserve, guarantee, AML, run-risk and deposit-protection analysis |

The SBA's 2025 Deposit Token PoC deliberately used a conservative form: deposits and mirror-account movements remained in bank systems, while the token acted as a payment instruction. The report is a valuable flow and control reference, but it does not settle the treatment of every native on-chain design. [SBA Deposit Token PoC report](https://www.swissbanking.ch/_Resources/Persistent/7/9/e/a/79ea024daa9834c99fc299db5d5f69c4317525a2/20250916_Ergebnisbericht%20PoC%20Deposit%20Token_EN_FINAL.pdf)

## Mirrored deposits explained from the beginning

“Mirrored” does not mean that the bank has two separate CHF 100 balances or that the customer receives CHF 200 of value. It means that the bank keeps a normal customer-liability record in the CBS and creates a linked **mirror account/subledger** for the tokenized portion.

Suppose Alice has CHF 1,000 in an ordinary account at Bank A and converts CHF 100:

1. The CBS checks identity, available balance, AML/sanctions status and any account restrictions.
2. The CBS moves CHF 100 from the ordinary-deposit category to a tokenized-deposit subcategory (or records an equivalent reserved mirror balance).
3. The GL still shows one CHF 1,000 total liability to Alice; it is merely classified as CHF 900 ordinary plus CHF 100 tokenized.
4. The token service mints exactly 100 CHF tokens to Alice's verified wallet.
5. Reconciliation confirms that token supply, mirror balances and the GL agree.

If Alice redeems the tokens, the sequence is reversed: the bank first disables or burns the 100 tokens, verifies the final burn evidence, then releases or reclassifies CHF 100 back to the ordinary deposit balance. If minting fails, no tokenized balance is made spendable. If burning fails, the ordinary balance remains locked or pending until the discrepancy is repaired.

The mirror account is therefore a control mechanism, not a second source of money. It supports wallet-level balances, pending transfers, freezes and event histories while the CBS remains the bank's authoritative customer and liability record.

## Transfers inside one bank

Assume Alice and Luca both bank with Bank A. Alice sends Luca CHF 25.

1. Bank A verifies that Alice's wallet is approved and that she has CHF 25 available.
2. The bank screens the transaction and places a reservation so Alice cannot spend the same CHF 25 twice.
3. The bank debits Alice's tokenized-deposit subledger by CHF 25 and credits Luca's by CHF 25.
4. The token ledger records the transfer, or records a burn-and-mint event if the contract uses that pattern.
5. The bank commits the customer-level posting and token event through one durable orchestration process.

Bank A's total liability does not change: it still owes CHF 25 more to one customer and CHF 25 less to the other. There is no reason to move money through SIC because both legal claims are against the same bank. The bank still needs AML, sanctions, limits, audit and failure handling. A DLT confirmation alone should not make the transfer spendable if the CBS posting has failed.

## The quoted cross-bank sentence, step by step

The sentence “A cross-bank transfer burns the sending bank's claim, settles the interbank amount in central-bank money (normally SIC/SNB sight deposits), and lets the receiving bank create its own customer claim” compresses several separate legal and accounting events. It describes the recommended **two-bank liability model**, not every possible token architecture.

Take a CHF 100 transfer from Alice at Bank A to Luca at Bank B:

### 1. Before the transfer

Bank A owes Alice CHF 100. That is Bank A's customer-deposit liability. Bank B owes Luca nothing for this payment yet. Alice's token is a representation or payment instrument linked to Bank A; it is not automatically a claim on Bank B.

### 2. Bank A locks and consumes Alice's value

Bank A verifies both customers and wallets, performs sanctions/AML checks, and reserves Alice's CHF 100. The token is then burned, invalidated or marked as consumed according to the scheme rules. Bank A reduces or extinguishes the corresponding liability to Alice. “Burns the sending bank's claim” means precisely this: Bank A cannot leave Alice's CHF 100 claim active and also treat the same CHF 100 as fully paid to Bank B.

“Burn” is a technical word here. It does not mean that CHF 100 of economic value is destroyed. It means that the Bank-A token representation is removed or made unusable, while the bank books the corresponding liability reduction or pending settlement entry. If the legal design burns before SIC settlement, the customer must receive a clearly defined interim claim (for example, a settlement payable); otherwise the design could leave the customer with neither a deposit claim nor a properly documented settlement claim during the gap.

If the scheme uses a payment-instruction token, the legal effect may instead be “Bank A accepts and executes Alice's instruction.” The contract must state the exact point at which Alice's claim is debited and whether any interim claim exists.

### 3. Bank A settles with Bank B

Bank A owes Bank B the interbank amount. The banks settle that obligation in central-bank money through SIC: Bank A's sight-deposit balance at the SNB decreases by CHF 100 and Bank B's increases by CHF 100. SIC is an RTGS system: the payment is individually irrevocable and final when the relevant settlement account is debited. [SNB SIC System Disclosure](https://www.snb.ch/public/asset/en/www-snb-ch/publications/sicsystem-disclosure/sicsystem-disclosure-all/sicsystem_disclosure_2023/publications0_en/sicsystem_disclosure_2023.en.pdf)

This is not a movement of Alice's retail token directly into the SNB. It is a separate interbank settlement step that gives Bank B the central-bank-money value needed to support the payment.

### 4. Bank B accepts and creates Luca's claim

After receiving the SIC settlement and passing its own controls, Bank B credits Luca's tokenized-deposit balance. Bank B now owes Luca CHF 100. Bank B may mint a Bank B token or credit a shared scheme token, depending on the legal design. The important point is that Bank B becomes debtor only when its rules and contract make it responsible for the new claim.

### 5. The final economic result

- Alice no longer has the CHF 100 claim on Bank A for this transfer.
- Luca now has a CHF 100 claim on Bank B.
- Bank A's SNB settlement balance is CHF 100 lower.
- Bank B's SNB settlement balance is CHF 100 higher.
- The two banks have not created CHF 200. One customer liability was extinguished, one was created, and central-bank settlement moved between the banks.

If a step fails, the transfer is not simply “half final.” The system should show a pending or repair state, keep funds locked, and use a documented return or compensating payment. The legal terms must state whether Bank A remains liable during the pending period, who bears a failed-settlement risk, and when customer-facing finality occurs.

## Transfers across countries

Cross-border transfers add another bank, currency, legal system, payment system and often a correspondent relationship. They are not just a larger version of a Swiss same-bank transfer.

### A Swiss customer pays a foreign customer

If Bank A issues a CHF token and the recipient banks with Foreign Bank C, the parties must decide whether:

- Foreign Bank C is an approved participant that accepts Bank A's token;
- Bank A redeems the token and pays through a correspondent/nostro account;
- the recipient receives a foreign-currency deposit after FX conversion; or
- a separate foreign-bank token is issued after settlement.

The Swiss leg may use SIC, but the foreign leg cannot normally be settled in SNB sight deposits. It may use the foreign central bank's payment system, a correspondent bank, a multi-currency settlement platform or a regulated scheme. FX pricing, cut-off/finality rules, capital and liquidity treatment, sanctions, data transfer, local licensing and insolvency law all need explicit treatment.

### A foreign customer pays a Swiss customer

The receiving Swiss bank must know whether it is receiving a foreign-bank liability, central-bank money, a regulated stablecoin or only a payment instruction. It should not automatically book an incoming foreign token as a CHF deposit. The foreign token may need to be redeemed, exchanged and settled before the Swiss bank creates a CHF customer claim.

### Wallets, bridges and interoperability

Connecting two token networks through a bridge can be atomic (both sides complete together) or sequential (one side completes before the other). Sequential bridges create an exposure during the gap; technical bugs, frozen contracts, validator compromise, duplicate messages and inconsistent identity rules can create losses or unbacked tokens. A first project should prefer direct regulated participants and ordinary settlement rails over an anonymous public-chain bridge.

FINMA's blockchain-payment guidance requires AML controls and, where information exchange is not otherwise compliant, tightly controlled transfers to or from external wallets of identified customers. [FINMA Guidance 02/2019](https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/4dokumentation/finma-aufsichtsmitteilungen/20190826-finma-aufsichtsmitteilung-02-2019.pdf)

## Why a bank might want tokenized deposits

- **Programmability:** a payment can be released when a verified delivery, collateral, invoice or other condition is met.
- **Faster processing:** controlled networks can exchange instructions and confirmations continuously, including outside traditional business hours.
- **Atomic or near-atomic workflows:** payment, delivery and settlement can be coordinated so that fewer parties carry an unsecured “waiting” exposure.
- **Lower reconciliation effort:** a shared event history can reduce manual matching between banks, custodians and payment operators.
- **New institutional services:** banks could support machine-to-machine payments, digital-asset settlement, collateral mobility and programmable corporate treasury.
- **Better traceability:** every event can carry customer, contract, wallet, payment and accounting references, provided privacy is protected.

These are potential benefits, not automatic outcomes. A token rail can also add a new system to reconcile and a new place for errors to occur.

## The principal risks in plain language

- **Run and liquidity risk:** a token can be transferred or redeemed very quickly, potentially 24/7. Many customers could withdraw or convert at once, including weekends when ordinary liquidity operations are less convenient.
- **Legal uncertainty:** the token holder, the bank debtor, finality point and insolvency treatment depend on the contract and system rules. A technical confirmation is not automatically a legally protected payment.
- **Identity and financial crime:** public addresses do not prove who controls a wallet. The bank needs customer identification, beneficial-owner records, sanctions screening, monitoring and transfer restrictions.
- **Operational fragility:** the CBS, DLT, SIC, AML engine, cloud provider and key-management system may fail independently. A durable process must handle partial completion without creating or destroying money.
- **Key loss or compromise:** losing a private key can block a legitimate customer; a compromised administrative key can mint, freeze or transfer value unlawfully. HSM/MPC, dual control and recovery procedures are essential.
- **Privacy and bank secrecy:** wallet histories may reveal customer relationships. The bank must minimize on-chain personal data and control who can see it.
- **Interoperability and FX:** cross-border or cross-network payments introduce bridge, currency, correspondent, sanctions and local-law risks.
- **Customer confusion:** customers may assume every token is a deposit, legal tender, cash equivalent or separately insured. Product disclosures must explain the actual claim and redemption route.
- **Third-party concentration:** DLT operators, node hosts, cloud providers, HSM vendors and smart-contract auditors may be material outsourced functions. FINMA's outsourcing and operational-risk requirements continue to apply.

## The Swiss regulatory points that matter most

1. **Classification:** FINMA looks at economic substance. A bank must document whether its product is a payment instruction, a bank liability, a security, a stablecoin or another arrangement.
2. **Banking and deposit rules:** public deposit-taking and the bank's own liabilities remain subject to Swiss banking law. A token label does not avoid licensing, accounting or prudential obligations.
3. **AML and Travel Rule:** blockchain does not reduce identification, beneficial-owner, sanctions or transaction-monitoring duties.
4. **Payment-system perimeter:** a multi-bank clearing and settlement arrangement may be a payment system under the Financial Market Infrastructure Act (FinMIA). A bank-operated system may have a different authorisation position from a non-bank or systemic operator; obtain a FINMA/SNB perimeter view.
5. **Finality and insolvency:** define irrevocability, settlement and acceptance events. Do not promise insolvency-proof finality from an internal DLT confirmation alone.
6. **Depositor protection:** eligible deposits are protected up to CHF 100,000 per customer and bank. This is measured by the underlying qualifying bank claim, not by the number of wallets or token contracts. [FINMA depositor protection](https://www.finma.ch/en/supervision/banks-and-securities-firms/depositor-protection/)
7. **Accounting and prudential reporting:** FINMA provides the bank accounting framework but no universal tokenized-deposit chart of accounts. Basel's cryptoasset framework treats qualifying own-issued tokenized bank claims as unsecured funding and requires liquidity treatment based on redemption terms and holder type; Swiss implementation must be mapped to current FINMA/SNB rules. [Basel Framework — tokenised traditional assets](https://www.bis.org/basel_framework/chapter/SCO/60.htm?inforce=20260101)
8. **Operational resilience and outsourcing:** critical data, incident management, business continuity, cyber controls, provider oversight and audit access must cover the entire CBS–DLT–SIC chain. [FINMA Circular 2023/1](https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/rundschreiben/finma-rs-2023-01-20221207.pdf)

## What the bank should decide before building

The project should produce one approved product/legal decision record containing:

- the exact legal nature of the token;
- the contractual debtor before, during and after each transfer;
- the authoritative ledger and the reconciliation invariant;
- the mint, burn, redemption and failure-state rules;
- the finality event for same-bank, interbank and cross-border payments;
- eligible customers, wallets, self-custody policy and Travel Rule data;
- freeze, recovery, key-management and smart-contract upgrade powers;
- depositor-protection aggregation and insolvency/resolution procedures;
- financial-statement, LCR, NSFR, leverage, capital, reserve and tax mappings;
- the FINMA/SNB perimeter and material-change correspondence; and
- the CBS, DLT, SIC, cloud and outsourcing responsibilities.

Only after these decisions should the bank choose a token standard, network, custody model or CBS vendor. A vendor's generic “digital asset” feature is not evidence that it can book, reconcile or resolve a regulated Swiss tokenized deposit.

## Sources for further reading

- [FINMA Guidance 06/2024 — stablecoins](https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/4dokumentation/finma-aufsichtsmitteilungen/20240726-finma-aufsichtsmitteilung-06-2024.pdf)
- [FINMA Guidance 02/2019 — payments on blockchain](https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/4dokumentation/finma-aufsichtsmitteilungen/20190826-finma-aufsichtsmitteilung-02-2019.pdf)
- [SBA Deposit Token PoC report (2025)](https://www.swissbanking.ch/_Resources/Persistent/7/9/e/a/79ea024daa9834c99fc299db5d5f69c4317525a2/20250916_Ergebnisbericht%20PoC%20Deposit%20Token_EN_FINAL.pdf)
- [SNB SIC system disclosure](https://www.snb.ch/public/asset/en/www-snb-ch/publications/sicsystem-disclosure/sicsystem-disclosure-all/sicsystem_disclosure_2023/publications0_en/sicsystem_disclosure_2023.en.pdf)
- [FINMA depositor protection](https://www.finma.ch/en/supervision/banks-and-securities-firms/depositor-protection/)
- [Basel Framework — cryptoasset standard](https://www.bis.org/basel_framework/chapter/SCO/60.htm?inforce=20260101)
- [BIS Project Agorá](https://www.bis.org/publ/othp110.htm)
- [FINMA Circular 2023/1 — operational risks and resilience](https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/rundschreiben/finma-rs-2023-01-20221207.pdf)
