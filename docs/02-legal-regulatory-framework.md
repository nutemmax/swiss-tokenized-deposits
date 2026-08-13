# Swiss legal and regulatory framework for tokenized deposits

**Research date:** 13 August 2026  
**Purpose:** self-contained legal/regulatory working paper for a Swiss bank. This is not a legal opinion.

## Regulatory thesis

Swiss authorities apply technology-neutral, substance-over-form analysis. A token does not become a deposit, security or payment instrument because of its label. The contractual claim, redemption promise, risk allocation, holder identity, transfer mechanism and settlement system determine the perimeter.

## Classification map

### Bank deposit claim

A fixed CHF redemption claim against a bank, payable at par, is economically close to an ordinary deposit. The underlying liability should be analysed under the Banking Act/Ordinance, AMLA/AMLO-FINMA, depositor-protection rules, accounting rules and liquidity regulation. A tokenized presentation does not remove minimum-reserve, reporting or resolution obligations.

### Payment-instruction token

The SBA 2025 PoC analysed the token under Swiss Code of Obligations Articles 466ff as a tripartite payment instruction. The token coordinates identified parties and triggers off-chain debit/credit; it does not itself transfer the bank-account claim. The paying agent's duty arises on acceptance, and an unconditional acceptance creates an independent payee claim. This model is legally and operationally different from a bearer token that is itself the bank's liability.

### Ledger-based security or technical trigger

A token can instead be structured as a ledger-based security or as a technical trigger for a conventional payment. That choice brings different civil-law, securities, custody, settlement and insolvency analysis. Do not mix the accounting and finality assumptions from one model with the token mechanics of another.

### Non-bank stablecoin

FINMA Guidance 06/2024 explains that stablecoin holders generally have a payment claim on the issuer. Depending on risk allocation, the claim can be a deposit or collective-investment claim. A third-party stablecoin issuer may rely on the Banking Ordinance default-guarantee exception, but that is not the same as a bank issuing its own deposit liability and does not create statutory depositor protection.

## AML, identity and wallet controls

FINMA's 2019 blockchain-payment guidance applies the Travel Rule technology-neutrally. The supervised institution must transmit required originator/beneficiary information and must not use blockchain as an AML shortcut. Until compliant information exchange exists, external-wallet transfers are limited to controlled circumstances, including proof that the wallet belongs to the institution's identified customer.

FINMA's stablecoin guidance expects supervised issuers to identify all holders, either directly or through supervised intermediaries, and to impose contractual and technical transfer restrictions. Recommended pilot controls are:

- wallet allow-list tied to a stable customer and beneficial-owner identifier;
- proof of wallet control and controlled wallet lifecycle;
- sanctions, AML and transaction-monitoring decisions before and after transfer;
- limits by customer, wallet, counterparty and velocity;
- a rulebook for freezes, recalls, rejected transfers and legal holds; and
- privacy and bank-secrecy controls for addresses and transaction metadata.

Open, anonymous, bearer-style circulation should be treated as a separate and much higher-risk product, not as the default bank pilot.

## Payment-system perimeter

FinMIA Article 81 defines a payment system as an entity or system that clears and settles payment obligations using uniform rules and procedures. Article 4(2) generally limits separate FINMA authorisation to cases where authorisation is necessary for proper functioning/protection and the system is not operated by a bank. This is a statutory perimeter rule, not a promise that a bank-operated system is unregulated.

A single-bank internal rail may fall outside a separate FMI licence. A multi-bank network, independent operator, systemically important system or arrangement with securities settlement features requires early FINMA/SNB assessment. A private DLT confirmation also does not automatically obtain statutory insolvency protection; the system's legal status and rules matter.

## Finality and debtor analysis

The scheme rulebook should define four separate moments: instruction, irrevocable debit/reservation, interbank cash settlement and receiving-bank acceptance. For a same-bank transfer, finality should require both CBS liabilities to be posted and the token event to be final. For a cross-bank transfer, use SIC settlement in central-bank money as the cash-finality point and require recipient-bank acceptance before presenting the token balance as spendable.

Under the SBA payment-instruction model, the sending bank does not simply become replaced by the receiving bank. Bank A's liability is extinguished through the agreed off-chain process; Bank B creates a separate claim when it accepts and credits. This must be explicit in terms, statements and insolvency procedures.

## Insolvency, resolution and protection

FINMA states that eligible deposits are protected up to CHF 100,000 per customer at an authorised institution. Banking Ordinance rules require a depositor to be identifiable in bank records and require an infrastructure capable of producing the protected-depositor list. The bank must aggregate ordinary and tokenized eligible balances for the same customer and bank. Wallet count is irrelevant to the limit.

In the SBA PoC, the ordinary off-chain bank deposits retain their ordinary treatment; the payment-instruction token is not automatically a deposit. A native token claim needs a separate written conclusion. Client-held cryptobased assets in custody may be segregated in bankruptcy under the DLT framework; that is not the legal treatment of the bank's own deposit liability.

The resolution runbook must freeze token movement, map wallets to legal depositors, calculate protected balances, convert or redeem balances, and produce the evidence required for payout and depositor protection. A blockchain cannot be the only creditor record.

## Material changes and supervisory engagement

FINMA has no public blanket rule that every tokenized-deposit product needs a new licence. It does assess licence-relevant changes, and a new DLT payment rail can be material because it changes ICT, AML, liquidity, outsourcing, customer and operational risk. Submit a preliminary enquiry with:

- product terms and legal classification;
- party/debtor map for each flow;
- token and wallet controls;
- finality and insolvency rules;
- accounting and regulatory mapping;
- liquidity and redemption stress tests;
- operator, node, HSM and cloud outsourcing;
- incident, recovery and resolution procedures; and
- pilot limits and governance.

## Current legislative development

The Federal Council's 2025–2026 stablecoin consultation proposed payment-instrument institutions, a stable crypto-based payment instrument and a crypto-institution category. The consultation ended on 6 February 2026 and the fact sheet indicated a dispatch in the second half of 2026 at the earliest. As of the research date, no official enacted outcome was located. Treat it as pending policy, not current law and not a substitute for the Banking Act analysis.

## Primary sources

- [FINMA Guidance 06/2024 — Stablecoins](https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/4dokumentation/finma-aufsichtsmitteilungen/20240726-finma-aufsichtsmitteilung-06-2024.pdf)
- [FINMA Supplement to ICO Guidelines (2019)](https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/1bewilligung/fintech/wegleitung-stable-coins.pdf)
- [FINMA Guidance 02/2019 — blockchain payments](https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/4dokumentation/finma-aufsichtsmitteilungen/20190826-finma-aufsichtsmitteilung-02-2019.pdf)
- [FINMA Circular 2023/1 — operational risks](https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/rundschreiben/finma-rs-2023-01-20221207.pdf)
- [FINMA Circular 2018/3 — outsourcing](https://www.finma.ch/en/~/media/finma/dokumente/rundschreiben-archiv/2018/rs-18-03/rs-18-03-letzte-aenderung-20191031.pdf?sc_lang=en)
- [FINMA depositor protection](https://www.finma.ch/en/supervision/banks-and-securities-firms/depositor-protection/)
- [FinMIA source text and payment-system provisions](https://ch.odat.ch/en/cc/958.1-20240201-en.html)
- [FinMIO payment-system finality provisions](https://lex.weblaw.ch/lex.php?lex_id=19745&norm_id=958.11&source=SR&use_lang=en)
- [SBA Deposit Token PoC report (2025)](https://www.swissbanking.ch/_Resources/Persistent/7/9/e/a/79ea024daa9834c99fc299db5d5f69c4317525a2/20250916_Ergebnisbericht%20PoC%20Deposit%20Token_EN_FINAL.pdf)
- [SIF stablecoin consultation](https://www.sif.admin.ch/en/newnsb/x4TMWQ1SWofNoFx7XyHhY)
