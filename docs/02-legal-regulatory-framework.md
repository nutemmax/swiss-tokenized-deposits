# 02 — Swiss legal and regulatory framework

**Research date:** 13 August 2026  
**Scope:** A Swiss bank considering CHF or foreign-currency tokenized deposits, beginning with a controlled pilot and potentially connecting to other banks and countries.
**Status:** Research and design working paper, not a legal opinion. Swiss official texts and a written conclusion from the bank’s counsel, auditor and FINMA prevail over this note.

## 1. The basic idea in plain language

A bank deposit is a legal promise: the bank owes the customer money and the customer can demand repayment under the account contract. A token is only a way of representing or moving something. It may represent the deposit itself, an instruction to move a deposit, or an unrelated claim on another issuer. Those are different legal products even if all are called “deposit tokens”.

The first legal test is therefore not which blockchain is used, but what the token holder can claim, against whom and at what point. That classification drives the Banking Act, anti-money-laundering, payment-system, insolvency, depositor-protection, accounting and liquidity analysis.

Useful terms:

- **Account-based claim:** the bank’s records identify a customer and the balance. Transfer normally changes the bank’s records or creates a new claim after settlement.
- **Bearer-style token:** possession of a private key appears to control the asset. Anonymous or uncontrolled bearer transfer is generally unsuitable for a supervised Swiss bank unless a compliant identity and transfer-control model exists.
- **Mirror account:** a CBS subaccount that mirrors a token balance. It is not necessarily the legal deposit; it can be a control record used to keep a conventional deposit and an on-chain representation synchronized.
- **Mint and burn:** creation and destruction of token units. In a bank model, minting must be backed by a corresponding customer liability or accepted payment instruction; burning must remove or settle that unit.
- **Settlement:** completion of the payment leg that moves value between banks, usually by debiting one bank’s account and crediting another bank’s account. **Finality** is the legal point after which the payment cannot be revoked under the applicable rules.
- **CBS:** the core banking system that normally stores the contractual customer account, postings, holds, interest and regulatory records.
- **DLT:** a distributed ledger technology; it is a technical record, not a legal category by itself.

## 2. Swiss regulatory perimeter

### 2.1 Banking law and the deposit-taking perimeter

The Swiss Banking Act (BA) and Banking Ordinance (BO) regulate banks, public deposits, capital, liquidity, organisation and insolvency. Publicly taking repayable funds is normally a banking activity, subject to statutory exceptions. The bank’s own tokenized deposit liability remains a bank liability even where the token is recorded on a permissioned ledger.

FINMA’s stablecoin guidance explains that a holder generally has a payment claim against the issuer. Depending on the contractual structure and who bears the investment risk, that claim may be a deposit under the BA or a collective-investment claim. This guidance concerns stablecoin structures; it does not automatically classify every bank-issued token. The bank should obtain a product-specific classification before launch.

Apply these practical classification tests:

1. Is the issuer a Swiss bank, a Swiss fintech-license holder, an overseas entity, or a consortium?
2. Is the holder’s claim against the bank unconditional and redeemable at par in the stated currency?
3. Does the holder take investment or asset-pool risk, or only the bank’s credit risk?
4. Can an unauthorised person receive or transfer the token?
5. Is the token a payment instruction rather than the deposit claim itself?
6. What happens if the bank fails before a pending transfer is accepted?

### 2.2 AMLA, AMLO-FINMA and the Travel Rule

The Anti-Money Laundering Act (AMLA), the Anti-Money Laundering Ordinance (AMLO) and the AMLO-FINMA rules apply to banks and other financial intermediaries. Tokenization does not lower customer-identification, beneficial-owner, transaction-monitoring, sanctions or record-keeping duties.

FINMA Guidance 02/2019 applies Swiss payment-information/Travel-Rule requirements technology-neutrally. A supervised institution must transmit required originator and beneficiary information and must be able to associate a transfer with a customer and wallet. Where the technical system cannot exchange the required information, FINMA’s guidance limits external-wallet transfers to controlled circumstances, including verification that the wallet belongs to an identified customer and that the customer has power of disposal.

For a pilot, use a permissioned network and an allow-list:

- link each wallet to one legal customer, beneficial owner, account and risk rating;
- verify wallet control on onboarding and whenever the wallet changes;
- screen sender, receiver, intermediaries and sanctions exposure before release;
- run transaction monitoring on amount, velocity, structuring, geography and typology;
- retain originator/beneficiary data with the transaction correlation ID;
- define reject, freeze, return, recall and law-enforcement hold procedures; and
- test privacy and Swiss bank-secrecy controls before sharing ledger data with nodes or vendors.

An open, anonymous, freely transferable token is a different and substantially higher-risk proposition. It should not be treated as the default extension of an identified customer deposit product.

### 2.3 Payment systems and FinMIA

The Financial Market Infrastructure Act (FinMIA) defines a payment system as an entity or system that clears and settles payment obligations on the basis of uniform rules and procedures (FinMIA Art. 81). Article 4(2) provides that a payment system needs FINMA authorisation only when this is necessary for its proper functioning or the protection of participants and investors, and when it is not operated by a bank. A bank-operated internal rail may therefore not need a separate FMI licence, but this is not a general exemption from banking, AML, operational-risk or supervisory requirements.

The perimeter changes when the arrangement is:

- a multi-bank network with uniform rules and an independent operator;
- systemically important or relied upon by many institutions;
- operated by a non-bank;
- used to settle securities or tokenized financial instruments; or
- marketed as a public payment infrastructure.

In those cases, seek a written FINMA/SNB perimeter view. A payment-system classification is not the same as a DLT trading facility, central counterparty or DLT trading facility licence. The product’s actual functions, participants and risk concentration determine the analysis.

### 2.4 Finality and insolvency protection

The rulebook must distinguish four events:

1. the customer’s instruction;
2. the point at which the instruction becomes irrevocable or funds are reserved;
3. settlement of the interbank cash leg; and
4. acceptance and crediting by the receiving bank.

FinMIO payment-system rules require the system to specify the point after which an order is irrevocable and the time of settlement. FinMIA system-protection provisions can make eligible payment or transfer orders enforceable against third parties in insolvency, but this protection depends on an authorised system and compliance with its rules. A private DLT transaction hash or a high number of block confirmations does not by itself create statutory finality.

For the recommended bank-controlled model:

- same-bank transfers become final when both customer liability postings and the controlled token event are committed under the product rules;
- cross-bank transfers become cash-final when SIC (or the agreed settlement system) has irrevocably debited the sending bank and credited the receiving bank, followed by the receiving bank’s acceptance/credit;
- a “pending” token must not be represented as spendable at the receiving bank before the stated acceptance condition; and
- customer terms must disclose what happens if the sending bank fails after debiting but before settlement, or if the receiving bank rejects the payment.

### 2.5 Who owes the money after a transfer?

This is the most important difference between models.

**Same bank:** Bank A remains the debtor before and after the transfer. The bank reallocates its liability from the payer’s account to the payee’s account.

**Native two-bank token model:** Bank A’s customer claim is extinguished or reduced; an interbank settlement asset moves; Bank B creates its own customer liability only when the agreed acceptance/credit condition is met. The customer should not be told that Bank A’s claim simply “travels” to Bank B unless the contracts actually create that result.

**Payment-instruction model:** The token is an instruction to the paying/receiving agents. The underlying deposit remains in the CBS until the contractual debit and credit occur. The SBA 2025 PoC analysed the token using Swiss Code of Obligations Articles 466ff. Under that model, the token is not automatically a deposit or an independent bearer claim.

**Third-party stablecoin:** The holder’s claim is against the stablecoin issuer or guarantee structure, not automatically against a customer’s bank. A bank accepting it must analyse counterparty, settlement, custody, AML and liquidity risk.

These alternatives must be reflected consistently in the customer terms, accounting, statements, resolution plan and prudential treatment.

## 3. Depositor protection and resolution

FINMA explains that eligible deposits up to CHF 100,000 per customer and authorised institution receive statutory privilege/protection. Custody assets are a separate concept and are not deposits. The bank must be able to identify the customer, aggregate balances and produce the depositor list required for an insolvency or depositor-protection event.

Do not grant CHF 100,000 per wallet. Aggregate conventional and eligible tokenized balances for the same customer and bank. A token that is only a payment instruction may leave the underlying deposit protected in the ordinary way; a native token claim requires a written legal and accounting conclusion. The resolution playbook should:

- freeze minting and outbound transfer while preserving evidence;
- map wallet → token account → CBS account → legal customer/beneficial owner;
- calculate protected balances and accrued interest;
- distinguish deposits from custody assets and pending payment instructions;
- redeem, convert or pay out balances under the applicable insolvency process; and
- preserve a non-blockchain creditor record in case nodes, keys or the token contract are unavailable.

The token design should be tested against bank resolution, not only normal operations. In particular, determine whether a receiving-bank token claim exists if the sending bank enters resolution between debit and SIC settlement.

## 4. Swiss data, outsourcing and operational rules

FINMA Circular 2023/1 requires governance for ICT strategy, change management, ICT operations, incident handling, cyber risk, critical data, business continuity and external dependencies. It applies to banks and similar supervised institutions. Critical data must remain confidential, integral and available. The bank remains responsible even when the ledger, wallet service, cloud, HSM, node operation or monitoring is outsourced.

FINMA Circular 2018/3 treats an outsourced function as material when failure could materially affect compliance with financial-market law. The bank needs an inventory of material outsourced functions, audit and access rights, data-location and sub-outsourcing controls, exit/portability arrangements, business-continuity measures and a resolution-relevant view of dependencies.

The design must also address the Federal Act on Data Protection (FADP), bank secrecy, cross-border data transfer, retention, correction and deletion. “Immutable” ledger history does not remove a bank’s duty to keep personal data proportionate and secure. Prefer pseudonymous on-chain identifiers with the customer mapping in the bank’s controlled system; avoid putting unnecessary personal data on a shared ledger.

## 5. Material change and supervisory engagement

There is no public blanket rule that every tokenized-deposit product requires a new banking licence. A tokenized deposit can nevertheless be a material change to the bank’s business because it changes customer terms, AML controls, liquidity profile, operational dependencies, outsourcing, settlement and resolution mechanics.

Before a pilot, provide FINMA with a concise product memorandum containing:

- legal classification and governing law;
- issuer/debtor/claim map for every flow;
- token contract and wallet-control rules;
- finality, rejection, return and insolvency treatment;
- accounting and prudential mapping;
- LCR/NSFR and 24/7 liquidity stress tests;
- AML, Travel Rule and sanctions operating model;
- node, cloud, HSM and smart-contract outsourcing map;
- incident, recovery and resolution procedures; and
- limits, eligible customers, currencies and pilot exit criteria.

Do not rely on “pilot” as a regulatory exemption. A limited pilot may reduce scale but does not eliminate licensing, AML, operational or conduct obligations.

## 6. Cross-border issuance and transfers

Cross-border activity creates a second jurisdictional perimeter in addition to Swiss law. The bank must identify the customer location, beneficiary location, token issuer, operator, node locations, settlement bank, governing law and where the service is marketed. A Swiss bank should assume that accepting or marketing a token abroad can trigger local licensing, financial-promotion, AML, payment-services, sanctions, data and consumer-protection rules.

The main models are:

### 6.1 Correspondent or bank-to-bank transfer

The cleanest cross-border design is an identified interbank payment. Bank A debits its customer, settles the currency leg through the agreed correspondent/RTGS arrangement and Bank B credits its customer. The token layer is an instruction or synchronized representation. The banks should not assume that a CHF token can be directly redeemed into EUR or USD without a foreign-exchange transaction, a receiving-bank claim and a clear settlement system.

### 6.2 Foreign bank joins a shared permissioned network

Each bank remains issuer of its own customer liabilities. A common protocol coordinates burn, settlement and mint/credit. The rulebook must define currency, FX rate, cut-off/24-7 operation, sanctions, data sharing, participant default, legal finality, message standards, dispute resolution and which jurisdiction governs each leg.

### 6.3 Foreign wallet or public-chain transfer

This adds wallet custody, Travel Rule, sanctions, smart-contract, consumer-protection and local payment-token obligations. The bank should require a verified counterparty, a permitted jurisdiction and a defined redemption route. Public-chain transferability is not a substitute for a legal claim or finality rule.

### 6.4 Regulatory overlays to check

- **EU/EEA:** MiCA may apply to an e-money token or asset-referenced token issued or offered in the EU; PSD2/PSD3 and the Payment Services Regulation may apply to payment services; DORA applies to in-scope EU financial entities and ICT providers. A Swiss bank without an EU establishment still needs local advice before offering or marketing to EU persons.
- **United Kingdom:** the Financial Services and Markets Act framework, FCA payment/e-money rules and future stablecoin regime may apply to issuance, custody or marketing. Verify the law in force at launch.
- **United States:** money-transmitter, state licensing, sanctions, AML and securities/commodities analysis can apply; tokenized bank deposits are not automatically exempt.
- **Other jurisdictions:** require a country-by-country matrix. Do not infer permission from the fact that a counterparty’s bank can access the network.

For every country, record the legal opinion, permitted customer types, local agent/correspondent, data-transfer basis, sanctions screen, consumer disclosure, tax and exit process. Start with Swiss domestic transfers and add countries only after a documented perimeter decision.

## 7. Product choices and their legal consequences

| Model | What the token is | Main debtor | Main Swiss questions |
|---|---|---|---|
| CBS mirror / payment instruction | A controlled instruction or representation of a conventional account movement | Existing bank(s) after contractual debit/credit | CO payment-instruction law, AML, finality and operational controls |
| Native bank token | A direct on-chain bank claim redeemable at par | Issuing bank; receiving bank may issue a new claim | BA/BO deposit treatment, depositor protection, prudential and insolvency analysis |
| Shared interbank token | A protocol that burns one bank’s unit and creates another’s | Each issuing bank for its own unit | FinMIA payment-system perimeter, participant default, settlement finality |
| Tokenized security | A ledger-based security or structured instrument | Issuer under security terms | DLT Act, securities, custody, trading/settlement and prospectus rules |
| Non-bank stablecoin | Claim against issuer or guarantee structure | Stablecoin issuer/guarantor | Banking exception, AML, payments, reserve/guarantee and local licensing |

The bank should document which model is being built before choosing a smart-contract standard. A common failure is to use a “token” implementation intended for a bearer asset while writing customer terms that assume an account-based deposit.

## 8. Primary sources and limits

- [FINMA Guidance 06/2024 — Stablecoins](https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/4dokumentation/finma-aufsichtsmitteilungen/20240726-finma-aufsichtsmitteilung-06-2024.pdf)
- [FINMA Guidance 02/2019 — blockchain payments](https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/4dokumentation/finma-aufsichtsmitteilungen/20190826-finma-aufsichtsmitteilung-02-2019.pdf)
- [FINMA Circular 2023/1 — operational risks](https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/rundschreiben/finma-rs-2023-01-20221207.pdf)
- [FINMA Circular 2018/3 — outsourcing](https://www.finma.ch/en/~/media/finma/dokumente/rundschreiben-archiv/2018/rs-18-03/rs-18-03-letzte-aenderung-20191031.pdf?sc_lang=en)
- [FINMA depositor protection](https://www.finma.ch/en/supervision/banks-and-securities-firms/depositor-protection/)
- [FINMA banking legal basis](https://www.finma.ch/en/documentation/legal-basis/laws-and-ordinances/banks/)
- [FINMA anti-money-laundering legal basis](https://www.finma.ch/en/documentation/legal-basis/laws-and-ordinances/anti-money-laundering-act-%28amla%29/)
- [FinMIA payment-system provisions](https://ch.odat.ch/en/cc/958.1-20240201-en.html)
- [FinMIO finality provisions](https://lex.weblaw.ch/lex.php?lex_id=19745&norm_id=958.11&source=SR&use_lang=en)
- [SBA Deposit Token PoC (2025)](https://www.swissbanking.ch/_Resources/Persistent/7/9/e/a/79ea024daa9834c99fc299db5d5f69c4317525a2/20250916_Ergebnisbericht%20PoC%20Deposit%20Token_EN_FINAL.pdf)
- [FATF virtual-asset and VASP guidance](https://www.fatf-gafi.org/en/publications/Fatfrecommendations/Guidance-rba-virtual-assets-2021.html)
- [Swiss Federal Council stablecoin consultation](https://www.sif.admin.ch/en/newnsb/x4TMWQ1SWofNoFx7XyHhY)

The current legislative consultation is policy development, not enacted law. The bank should refresh this note before launch and obtain current country-specific legal opinions.
