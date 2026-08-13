# 03 — Booking, accounting, deposit protection and prudential treatment

**Research date:** 13 August 2026  
**Scope:** How a Swiss bank can record, reconcile, report and manage tokenized-deposit balances.
**Status:** Design guidance, not a FINMA-approved chart of accounts or an auditor’s conclusion.

## 1. Start with the balance-sheet story

The bank’s balance sheet has two sides:

- an **asset** side (cash, SNB sight deposits, loans and investments); and
- a **liability/equity** side (customer deposits, interbank funding, debt and capital).

When a customer converts CHF 100 from an ordinary account into a tokenized balance, the bank has usually not received CHF 100 of new funding. It has changed the way the same customer liability is represented or made transferable. A token is not automatically a new asset, new liability or new capital instrument.

The accounting outcome follows the legal contract:

1. **Mirror/payment-instruction model:** the ordinary customer deposit remains the liability; the token and mirror account are controlled subledger records. Mint and burn may be memo/reclassification events.
2. **Native bank-token model:** the token is a direct, par-redeemable claim on the issuing bank. The liability is normally presented in the customer-deposit category (or another statutory category only with a documented accounting conclusion).
3. **Tokenized security or fund unit:** the bank may have custody or an investment obligation rather than a deposit. Client assets and the bank’s own liabilities must not be mixed.
4. **Other-bank token:** the receiving bank may hold an asset/claim on the issuing bank or a settlement participant. It is not central-bank money merely because it is on a ledger.

FINMA’s Accounting Ordinance and Circular 2020/1 provide the Swiss recognition, presentation and disclosure framework. They do not create a “tokenized deposit” line. The bank should use a separate internal product subcategory mapped to the applicable statutory line and obtain auditor/FINMA confirmation for the final mapping.

## 2. Concepts needed to understand the booking model

- **Legal ledger:** the record that proves the bank’s contractual debt to each customer. In the initial design this is the CBS customer account and GL, not an ungoverned DLT wallet.
- **Subledger:** detailed customer/wallet/event records that aggregate to the GL control account.
- **Mirror account:** a CBS account in the customer’s name that mirrors the token balance. The customer may not transact with it directly; the token service does so through controlled APIs.
- **Available balance:** amount that can be spent or redeemed now.
- **Reserved balance:** locked for a transaction but not yet final; it cannot be spent twice.
- **Pending balance:** held while another system, bank or participant completes its leg.
- **Frozen balance:** blocked under AML, sanctions, legal hold, insolvency or operational controls.
- **GL control account:** the aggregate accounting balance that must equal the eligible customer subledger total.
- **Mint/burn:** token-level creation/destruction; it does not automatically mean a new accounting transaction.
- **SIC/SNB sight deposit:** a commercial bank’s claim on the Swiss National Bank used for settlement; it is central-bank money for the participant, not a customer deposit token.

### How to read the journal tables

In double-entry accounting, every event has a debit and a credit of the same amount. “Debit” and “credit” do not mean “good” and “bad”; their effect depends on the account type. A customer deposit is a liability of the bank, so increasing what the bank owes is a credit and reducing what it owes is a debit. An SNB sight deposit is an asset of the bank, so increasing it is a debit and reducing it is a credit. This is why a same-bank payment debits the payer’s deposit liability and credits the payee’s liability without moving an asset.

The tables below show the bank’s books, not the customer’s personal accounting. A reservation or pending status may be only a subledger control until the legal/accounting recognition point is reached; the finance function and auditor must approve the exact timing.

## 3. Recommended chart-of-accounts design

Create internal product tags and control accounts while reporting them under the statutory categories:

### Assets

- SNB sight deposits and SIC settlement balance by currency;
- cash and correspondent balances;
- amounts due from Bank B pending interbank settlement;
- collateral or margin, where applicable; and
- operational suspense/repair accounts with strict ageing.

### Liabilities

- ordinary customer deposits;
- tokenized customer deposits or mirror liabilities (management subcategory);
- tokenized balances reserved or pending, still linked to the same legal creditor;
- amounts due to Bank B or a settlement system;
- accrued interest and fee payables; and
- controlled unallocated-funds accounts for failed/returned payments.

### Memorandum and control records

- token supply by issuer, contract version and currency;
- wallet-to-customer and beneficial-owner mapping;
- frozen, restricted, expired and pending units;
- settlement and transaction references;
- customer protection and liquidity tags; and
- DLT transaction hash, block/finality evidence and contract version.

The “token liability” control account should never be allowed to drift from the customer subledger. If a token is only an instruction, do not add a second liability simply because a unit was minted.

## 4. Double-entry templates

These entries are templates for a controlled CHF design. A reservation or pending state is often a subledger/control status rather than a new statutory GL posting; the exact debit/credit timing for a cross-bank leg depends on the legal contract, settlement rules and accounting policy. The bank’s finance function and auditor must approve account names, value dates, recognition timing and statutory mappings.

| Event | Debit | Credit | Explanation |
|---|---|---|---|
| Customer funds a new token balance from external cash | SNB sight deposit/cash | Customer deposit — tokenized | New bank funding and new customer liability |
| Existing deposit converted to token form | Customer deposit — ordinary | Customer deposit — tokenized | Reclassification; total liabilities unchanged |
| Token redeemed to ordinary account | Customer deposit — tokenized | Customer deposit — ordinary | Reverse reclassification |
| Token redeemed for external CHF payment | Customer deposit — tokenized | SNB/SIC payable or cash | Liability is discharged when payment is final/accepted under terms |
| Same-bank transfer | Payer token liability | Payee token liability | Bank remains debtor; customer creditors are reallocated |
| Sender reserve for cross-bank payment | Payer token liability (or available-to-reserved subledger) | Interbank payable/suspense | Makes funds unavailable while settlement is pending |
| Bank A’s final sending leg | Payer token liability | Due to settlement system/Bank B | Bank A’s customer liability is reduced/extinguished; cash leg is due |
| Bank B receives final settlement | SNB/SIC settlement asset | Due to Bank A/settlement system | Bank B receives central-bank money or settlement credit |
| Bank B accepts and credits customer | Interbank settlement asset/clearing | Customer deposit — tokenized | Bank B creates its own customer claim |
| Deposit interest accrual | Interest expense | Accrued tokenized-deposit liability | Same economics as ordinary deposit interest |
| Interest payment | Accrued interest liability | Customer tokenized balance or SNB payable | Customer balance increases or is paid externally |
| Fee debited from token balance | Customer tokenized liability | Fee income (and tax payable if applicable) | Fee terms and value date must be explicit |
| AML/sanctions freeze | No balance change | No balance change | Status/availability changes; record reason and authority |
| Failed mint after CBS reservation | Suspense/reserved balance | Release/reversal account | Compensating entry and release only after controlled diagnosis |
| Failed interbank transfer returned | Return receivable/suspense | SNB/SIC payable | Restore sender only when return is final and matched |
| Operational error correction | Correcting debit/credit | Correcting credit/debit | Never edit historical entries; use approved compensating journals |

### Important debtor point

For a same-bank payment, the bank’s total liability does not disappear; only the creditor changes. For a two-bank native model, Bank A reduces its own liability and Bank B creates a separate liability after settlement and acceptance. The cross-bank journal is therefore not “transfer the same deposit liability from Bank A to Bank B”; it is a coordinated liability reduction, central-bank-money settlement and new liability creation.

## 5. Accounting by token representation

### 5.1 Conventional deposit plus token instruction

The customer’s ordinary deposit remains the legal and accounting liability. Minting records an instruction and may debit a mirror account so the token cannot be spent twice. Burn reverses the instruction. A DLT event hash is evidence, not a separate financial asset. This is the SBA 2025 PoC direction and is the lowest-disruption pilot model.

### 5.2 Direct tokenized bank liability

The bank records a customer liability from issuance/redemption and tracks the token as a controlled subledger. Customer statements must state that the claim is against the issuing bank, the redemption process and any transfer restrictions. The statutory statement line depends on the final classification and auditor view.

### 5.3 Tokenized security/custody asset

If the customer owns a tokenized bond, fund unit or other security, the bank may be custodian rather than debtor. Client assets can be segregated in insolvency under the relevant DLT/custody provisions, but they are not customer deposits. Do not use the deposit-protection and LCR treatment in this note for that product.

### 5.4 Other-bank token held by the bank

Treat the token as an exposure to the issuing bank or settlement arrangement until legal, accounting and prudential analysis confirms another treatment. Model counterparty default, redemption delay, haircut, large-exposure limits, liquidity value, custody/control and operational dependence. It is not cash merely because it is redeemable at par in normal conditions.

## 6. Reconciliation and control equations

At all times, the bank should be able to demonstrate:

```text
valid token supply by issuer/currency/contract
  = token subledger customer balances
  = tokenized-deposit GL control balance
```

For each customer:

```text
available + reserved + pending + frozen
  = total controlled customer token balance
```

For the settlement chain:

```text
customer event ID
  ↔ CBS reservation and journal
  ↔ ISO 20022/SIC message and settlement reference
  ↔ DLT transaction hash/finality
  ↔ receiving-bank acceptance
```

Run three-way reconciliation across DLT supply, customer/CBS subledger and GL/SIC. A mismatch blocks new minting and outbound transfers, preserves inbound funds, opens an incident, replays the event log and uses a dual-controlled compensating entry. A reconciliation process must be able to rebuild the customer balance without trusting a single smart contract or node.

## 7. Financial statements and audit evidence

### Swiss reporting

Use the statutory customer-deposit category for an ordinary par-redeemable bank claim unless a documented conclusion says otherwise. Disclose material token-specific matters: legal form, issuer and debtor, redemption and transfer restrictions, technology and key dependence, liquidity speed, concentration, operational incidents, outsourced providers and reconciliation controls. Explain any material difference between the customer statement and on-chain representation.

FINMA’s cryptobased-asset disclosure guidance addresses custody cryptobased assets and supervisory disclosure. It does not create a special balance-sheet line for a bank’s own tokenized deposit liability. A bank’s own liability should not be placed in a client-custody cryptoasset line merely because DLT is used.

### IFRS and Swiss GAAP considerations

For an IFRS reporter, IAS 32 normally presents the customer’s cash deposit as a financial asset and the bank’s contractual obligation as a financial liability. IFRS 9 measurement and expected-credit-loss conclusions depend on the contract and business model. A par-redeemable sight deposit is not automatically a cryptoasset under IFRS. The legal terms, not the token label, control classification.

Swiss GAAP FER and FINMA reporting have their own presentation and disclosure rules. Obtain a written accounting position before the pilot; do not assume IFRS and FINMA supervisory reporting line up automatically.

### Audit trail

Auditors should be able to trace:

`instruction → KYC/AML decision → CBS reservation → GL journal → payment message → SIC reference/time → DLT hash/finality → receiving acceptance → customer statement`

Store actor, role, approvals, timestamps, before/after balances, contract version, retry/idempotency key, reason code and compensating entries. Preserve the off-chain customer and journal records even when DLT history is immutable.

## 8. Depositor protection, statutory reporting and resolution

FINMA states that eligible deposits are protected/privileged up to CHF 100,000 per customer and authorised institution. Aggregate ordinary and tokenized eligible balances for one customer; wallet count and token count do not create additional protection. Include eligible accrued interest according to the applicable rules. Keep one customer/protection identity across account, wallet and custody systems.

Maintain an exportable mapping:

`wallet → token account → mirror/CBS account → legal customer → beneficial owner → all eligible deposits → protected amount`

At resolution, freeze mint and outbound transfers, distinguish protected deposits from custody assets and pending instructions, calculate balances at the legal cut-off, and provide conversion/redemption or cash payout. A blockchain is an input to the depositor list, not the only depositor list.

## 9. Capital, liquidity and prudential treatment

### 9.1 Minimum reserves and central-bank money

Tokenized sight deposits remain relevant to SNB minimum-reserve treatment because tokenization does not change the underlying deposit relationship. Tag balances by currency, maturity, withdrawal rights and customer type. Do not assume a token format avoids reserve or reporting requirements.

SIC settlement balances and SNB sight deposits are central-bank money for participant banks. A customer token is a private bank claim, even if the interbank leg settles through SIC.

### 9.2 LCR

The Liquidity Coverage Ratio covers stressed net cash outflows over 30 days. Tokenized deposits can create faster, more concentrated and more operationally continuous outflows. Model ordinary customer behaviour plus a token-specific acceleration scenario: 24/7 redemption, weekend peaks, automatic programmatic payments, instant bank-to-bank transfers, sanctions holds and a rail outage.

The Basel cryptoasset framework (SCO60) treats a qualifying tokenized claim on a regulated bank as unsecured funding when it is legally binding, redeemable at par and supported by the bank’s creditworthiness/ALM. LCR outflow treatment follows the earliest contractual redemption and holder/counterparty classification. If the holder cannot be identified at all times, the framework points to unsecured wholesale treatment rather than a favourable stable-retail assumption. This international Basel rule must be mapped to the Swiss Liquidity Ordinance and reporting forms with FINMA.

### 9.3 NSFR

The Net Stable Funding Ratio looks at stable funding over a one-year horizon. A callable or instantly redeemable token liability generally receives treatment based on its earliest effective maturity and counterparty type, not on the fact that it is recorded on a blockchain. The treasury model should not classify the whole token base as stable retail funding without evidence of holder identity, withdrawal rights and behavioural stability.

### 9.4 Capital, leverage and large exposures

Issuing a tokenized deposit normally does not create a separate credit-risk-weighted asset; the assets funded by the deposit retain their normal capital treatment. Operational, cyber, fraud, key-management and settlement risks can still affect operational-risk capital, stress testing and governance.

Holding another bank’s token may create a claim/exposure to that bank, including large-exposure, credit-risk, market-risk, liquidity and custody questions. A token issued by a bank is not automatically a reserve asset or a claim on the SNB. Get a prudential classification before treasury treats it as cash-like.

### 9.5 Intraday and 24/7 liquidity

SIC RTGS settles individual payments finally in central-bank money; SIC Instant Payments provide immediate/final 24/7 retail settlement for eligible flows. A token rail connected to either system must manage pre-funding, queues, intraday limits, collateral and cut-offs. 24/7 capability does not mean 24/7 access to unlimited liquidity. The bank should stress weekend funding, collateral calls, failed settlements, return delays and mass redemptions. SNB’s Payment System Support Facility is a future liquidity-support mechanism for eligible participants; it is not a product guarantee or replacement for treasury controls.

## 10. Interest, fees, tax and dormant balances

Tokenization should preserve ordinary contractual rules for interest, negative interest, fees, value dates and statements unless the product terms deliberately differ. Post accruals in the same legal currency and keep fee and tax identities linked to the customer.

The tax answer depends on the underlying transaction and customer. A principal payment is not automatically interest; exchange, custody, issuance, security-like or cross-border features may create additional Swiss or foreign tax questions. Obtain tax advice on withholding tax, stamp duties, VAT, income/wealth tax, CRS/AEOI and transfer-pricing effects before launch. Dormant-account and unclaimed-asset processes should apply to the underlying customer relationship; a wallet must not bypass dormancy controls.

## 11. Treasury and scenario library

At minimum, test:

- full and partial same-day redemption;
- 24/7 and weekend payment spikes;
- conversion between ordinary and tokenized balances;
- same-bank versus interbank and cross-border velocity;
- SIC, correspondent, DLT, HSM, AML and cloud outages;
- participant/default or receiving-bank rejection;
- sanctions or legal hold after funds are reserved;
- smart-contract upgrade, fork or key compromise;
- customer, wallet, currency and participant concentration;
- other-bank token depeg, delayed redemption or insolvency; and
- bank resolution while payments are pending.

Record both accounting impact and liquidity impact. A token can be economically a normal deposit but operationally capable of moving faster than the bank’s historical deposit data suggests.

## 12. Implementation decision record

Before production, the bank should obtain signed decisions from Legal, Finance, Treasury, Risk, AML, Operations, IT security, the auditor and the board committee covering:

1. token legal classification;
2. statutory GL line and subledger control;
3. deposit-protection aggregation;
4. LCR/NSFR and reserve mapping;
5. interbank debtor/creditor timing;
6. cross-border currencies and jurisdictions;
7. accounting for pending and failed states;
8. reconciliation tolerances and halt rules;
9. tax/dormancy treatment; and
10. evidence required for FINMA engagement and audit.

## Sources

- [FINMA Accounting Ordinance](https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/ex-post-evaluation/20230103-rechnungslegung/rechnungslegungsverordnung_finma_20191031.pdf?hash=1F133ED5B13CDD4A99923F683D00C0D0&sc_lang=en)
- [FINMA Accounting Circular 2020/1 archive](https://www.finma.ch/en/documentation/archiv/rundschreiben/archiv-2020/)
- [FINMA depositor protection](https://www.finma.ch/en/supervision/banks-and-securities-firms/depositor-protection/)
- [Swiss Liquidity Ordinance convenience text](https://ch.odat.ch/en/cc/952.06-20250101-en.html)
- [Basel SCO60 tokenized claims](https://www.bis.org/basel_framework/chapter/SCO/60.htm?inforce=20260101)
- [SNB SIC System Disclosure](https://www.snb.ch/public/publication/en/www-snb-ch/publications/sicsystem-disclosure/sicsystem-disclosure-all/sicsystem_disclosure_2024/0_en/sicsystem_disclosure_2024.en.pdf)
- [SNB Payment System Support Facility](https://www.snb.ch/en/the-snb/mandates-goals/monetary-policy/implementation/payment-system-support-facility)
- [SBA Deposit Token PoC (2025)](https://www.swissbanking.ch/_Resources/Persistent/7/9/e/a/79ea024daa9834c99fc299db5d5f69c4317525a2/20250916_Ergebnisbericht%20PoC%20Deposit%20Token_EN_FINAL.pdf)
- [FINMA 2025 cryptobased-asset disclosure guidance](https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/4dokumentation/finma-aufsichtsmitteilungen/20250905-finma-aufsichtsmitteilung-03-2025.pdf)
- [IFRS IAS 32](https://www.ifrs.org/content/dam/ifrs/publications/pdf-standards/english/2021/issued/part-a/ias-32-financial-instruments-presentation.pdf?bypass=on)

The 2027 Swiss liquidity framework should be checked again before launch; transition and reporting rules may move between FINMA and Federal Council ordinances.
