# Swiss tokenized deposits: legal, booking, prudential and CBS deep dive

**Research date:** 13 August 2026  
**Scope:** a FINMA-authorised Swiss bank considering CHF-denominated tokenized deposits for identified customers and participating banks.  
**Status:** research and design basis; not a legal opinion, accounting opinion, FINMA approval or production runbook.

## Executive design position

The lowest-risk first production model is a **CBS-authoritative mirrored tokenized deposit**. The bank's contractual customer account and general ledger remain the legal, regulatory and operational source of truth. A permissioned token network records a tightly controlled representation and supplies programmability. Minting is possible only after a CBS reservation and accounting posting; burning is required before a conventional balance is released. Every token event carries a bank, customer, wallet, contract-version and correlation identifier.

This is distinct from the Swiss Bankers Association (SBA) 2025 proof of concept. The PoC used a token as a reusable payment instruction and kept the underlying deposit and mirror-account movements off-chain. It is an excellent reference for flows and controls, but it does not settle the legal or accounting treatment of a native token that itself is the bank liability.

## Product models and the decision that comes first

| Model | What the customer legally owns | Official record | Main advantage | Main unresolved risk |
|---|---|---|---|---|
| Payment-instruction token | A payment instruction; the bank-account claim stays off-chain | CBS | Smallest change and closest to SBA PoC | Token may have no deposit claim before bank acceptance; benefit is mainly orchestration |
| Mirrored tokenized deposit | A claim on the issuing bank, represented by a controlled token and CBS liability | CBS/GL, reconciled token subledger | Preserves banking and resolution controls | Contract must define whether token is claim, instruction or trigger |
| Native on-chain deposit | A claim whose authoritative balance is on the DLT | DLT with regulatory/CBS integration | Maximum composability | Finality, insolvency, corrections, reporting, privacy and recovery become materially harder |
| Non-bank stablecoin backed or guaranteed by a bank | Claim on a separate issuer | Issuer ledger | Different business model and distribution | Banking licence, default guarantee, AML, reserve and deposit-insurance distinctions |

FINMA applies substance over form. A fixed-CHF, par-redeemable claim tends toward a deposit; a payment-instruction structure can avoid making the token itself a deposit; a ledger-based security invokes a different Swiss legal regime. Product documents must choose one structure explicitly and must not use “tokenized deposit” as a substitute for that analysis.

## Legal and regulatory framework

### Classification, issuer and creditor

FINMA Guidance 06/2024 says holders of stablecoins generally have a payment claim against the issuer. Depending on who bears the risk of underlying assets, that claim is usually a deposit or a collective-investment claim; AMLA normally applies. FINMA's 2019 ICO supplement similarly treats a fixed one-token/one-franc redemption claim as an indicator of a deposit, while emphasising case-by-case analysis.

For a native bank-liability design, the bank is the debtor from issuance until redemption or a legally effective interbank liability transformation. For a payment instruction, the SBA's civil-law analysis is different: under CO Articles 466ff the token is a tripartite instruction, the paying agent's obligation arises on acceptance, and unconditional acceptance creates an independent payee claim. It is not an assignment of the payer's bank claim. Consequently, a cross-bank flow must not silently treat Bank A's liability as Bank B's liability. The system must record when Bank A's claim is extinguished, when SIC settles, and when Bank B accepts and creates its own claim.

### Transfer finality and insolvency timing

“On-chain confirmed” is a technical state, not a complete legal conclusion. The scheme rulebook should define:

- the point at which a customer instruction cannot be revoked;
- the point at which the payer's CBS balance is debited or irrevocably reserved;
- the point at which an interbank payment is final in SIC; and
- the point at which the receiving bank accepts and credits the recipient.

For the conservative model, a same-bank transfer is final only after the CBS debit/credit and token event are both committed. A cross-bank transfer is final only after SIC settlement in central-bank money and receiving-bank acceptance. SNB's SIC System Disclosure states that RTGS payments are individually irrevocable and final when the settlement account is debited; SIC Instant Payments are immediate and final around the clock. FINMA/Fedlex system-protection rules apply only where the relevant payment system and rules satisfy the statutory conditions. A private DLT confirmation alone should not be represented to customers as insolvency-proof finality.

### Wallets, AML and transfer restrictions

FINMA's blockchain-payment guidance requires the Swiss Travel Rule information and does not relax AML. Until a compliant information exchange exists, supervised institutions may send to or receive from an external wallet only under tightly controlled conditions, including proof that the wallet belongs to the identified customer. For stablecoin issuance by supervised institutions, FINMA expects every holder to be adequately identified by the issuer or a supervised intermediary and expects contractual and technological transfer restrictions.

The pilot should therefore use allow-listed wallets, continuous customer-to-wallet linkage, beneficial-owner records, sanctions screening and transaction monitoring. Self-custody is not categorically impossible, but a bearer token that can circulate among unidentified holders is inconsistent with the supervisory risk identified by FINMA. Wallet addresses should be treated as potentially personal data and bank-secrecy-sensitive information.

### Freezes, reversals and administrative powers

The bank needs contractual and technical powers to block minting, outbound transfers, redemption and wallet access for sanctions, AML, court orders, insolvency, security incidents and operational mismatches. These powers require documented authority, due process and customer disclosures. A legally final payment should not be “edited” on-chain. A mistaken or fraudulent transfer should instead use a scheme-approved compensating payment, recovery request or freeze of unspent value, with dual control and an audit trail. Emergency pause, key rotation and upgrade powers must be limited, time-bound where possible and tested.

### Payment-system and FMI perimeter

FinMIA defines a payment system as an entity or system that clears and settles payment obligations under uniform rules and procedures. FinMIA Article 4(2) generally makes a separate FINMA authorisation unnecessary where the payment system is operated by a bank, but the exemption is not a blanket exemption from supervision. A consortium operator, non-bank scheme company, systemically important arrangement or DLT trading/settlement venue may trigger additional FINMA and/or SNB analysis. FINMA's stablecoin guidance indicates that a significant payment system may require an FMIA licence.

The bank should send a preliminary enquiry to FINMA and, for a multi-bank or systemic scheme, seek a joint FINMA/SNB perimeter discussion. The submission should include legal terms, flow diagrams, operator and participant roles, settlement asset, finality rule, wallet policy, AML controls, liquidity model, outsourcing, resolution and accounting.

### Material change and outsourcing

There is no public rule saying that every bank token product automatically needs a new licence. FINMA expects changes to licence-relevant facts and assesses material changes case by case. A DLT payment rail can be material because it changes business model, ICT dependencies, AML exposure, liquidity speed and operational risk. Treat it as potentially material and obtain written preliminary feedback before production.

FINMA Circular 2018/3 applies where a provider performs a significant outsourced function. The bank remains responsible, must keep an inventory and risk analysis (including subcontractors and concentration), and must preserve audit and FINMA access, security, cross-border and orderly-exit rights. This should cover the DLT operator, cloud nodes, HSM/MPC provider, CBS integrator, smart-contract auditor and settlement gateway.

### Insolvency, resolution and deposit protection

Eligible deposits at an authorised Swiss bank are privileged/protected up to CHF 100,000 per customer and bank. Banking Ordinance rules require balances to be attributable to the depositor in the bank's records and require infrastructure capable of producing the depositor list quickly. Several wallets belonging to one customer do not create several CHF 100,000 allowances; conventional and tokenized eligible deposits must be aggregated.

This protection belongs to the qualifying bank-account claim, not automatically to a token label. In the SBA payment-instruction model, the underlying off-chain deposits remain ordinary bank deposits; a token held before the paying bank accepts it may not itself give the holder a protected deposit claim. Custody segregation rules for customer-held cryptobased assets are a different legal category and should not be confused with a bank's own deposit liability.

The resolution design must be able to freeze token movement, export a customer/wallet-to-CBS mapping, calculate protected balances, convert or redeem balances to ordinary payout rails and produce evidence within the statutory depositor-list and payout processes. The DLT must never be the only place where the legal creditor identity exists.

## Booking and accounting model

### Chart of accounts and accounting policy

FINMA Accounting Ordinance and Circular 2020/1 provide the Swiss bank recognition and disclosure framework; they do not prescribe a tokenized-deposit chart. A legally binding, par-redeemable own-bank claim should normally map to the “amounts due in respect of customer deposits” balance-sheet category, with a management subcategory for tokenized deposits and a product/wallet subledger. A payment-instruction token leaves the ordinary deposit liability in place; token movements are controlled payment or memo events.

Do not place a bank's own deposit liability in a client-custody cryptoasset line. FINMA's 2025 cryptobased-asset disclosure guidance concerns custody assets and does not create a tokenized-deposit line. The bank should document its policy, obtain auditor agreement and confirm regulatory-reporting mapping with FINMA.

### Double-entry model — mirrored bank liability

Assume the token is a CHF claim on the same bank, redeemable at par, and the CBS remains authoritative.

| Event | Debit | Credit |
|---|---|---|
| New funding | SNB sight deposit / cash / settlement asset | Customer tokenized-deposit liability |
| Convert conventional deposit | Conventional customer-deposit liability | Tokenized-deposit liability / mirror account |
| Redeem token | Tokenized-deposit liability | Conventional customer deposit or cash payable |
| Same-bank transfer | Payer token liability | Payee token liability |
| Bank A cross-bank leg | Payer token liability | Due-to-SIC / settlement payable or SNB settlement movement |
| Bank B cross-bank leg | SNB/SIC settlement asset | Recipient token liability |
| Interest | Interest expense | Accrued tokenized-deposit liability |
| Fee taken from balance | Customer token liability | Fee income (plus tax payable where applicable) |

The exact account names depend on the bank's chart and settlement timing. Pending DLT states should not create a second deposit liability. Use suspense/clearing accounts only for controlled, time-limited settlement states with deterministic reversal or repair.

### Prudential and treasury treatment

The token does not remove ordinary bank liabilities from minimum reserves, liquidity, capital or leverage calculations. A CHF sight tokenized deposit should be classified by currency, maturity, cancellability, holder and legal claim for SNB minimum-reserve, LCR, NSFR, leverage and regulatory reporting.

The Basel Framework's cryptoasset standard says a qualifying tokenized bank claim must have the same legal rights as the traditional claim, be redeemable at par and be supported by the bank's creditworthiness/asset-liability profile. Own-issued token liabilities are unsecured funding. For LCR/NSFR, use the earliest contractual redemption date and the holder's counterparty type. Even where the holder is identified, Basel says an issuer must not automatically use the most favourable “stable retail deposit” treatment; an unidentified holder is generally treated as unsecured wholesale funding. Swiss implementation must be mapped to the current Liquidity Ordinance/FINMA rules, and the FINMA LiqV-FINMA transition effective 1 January 2027 must be monitored.

Treasury should stress 24/7 redemptions, instant interbank flows, weekend and holiday peaks, mass conversion between conventional and token balances, chain or SIC outages, settlement queues and concentration by holder/wallet. Faster movement is an operational and liquidity characteristic, not proof that the liability is a high-quality liquid asset.

Interest, fees, dormant assets and tax follow the underlying deposit contract and Swiss tax rules. Keep one customer identity across ordinary and token accounts for statements, CRS/AEOI, withholding-tax records, accrued interest and dormant-asset handling. Obtain a Swiss tax ruling where token features could make the instrument security-like or alter fee/stamp-duty treatment.

## CBS, settlement and operating architecture

### Authority model

The CBS contract account and GL are authoritative for legal balance, customer identity, interest, fees, holds, depositor protection and reporting. The token ledger is a controlled representation and event log. A future native model would require a new legal, accounting and resolution approval; it should not be reached by quietly moving authority into a smart contract.

### Durable transaction state machine

Use a durable, idempotent orchestration record:

`REQUESTED → FUNDS_RESERVED → AML_APPROVED → DLT_PENDING → SIC_SETTLED → RECEIVER_ACCEPTED → FINAL`

Failure states are explicit: `REJECTED`, `EXPIRED`, `REPAIR_REQUIRED`, `RETURNED`, `REVERSED` and `FROZEN`. Each transition has an owner, timestamp, authorization, retry policy, compensating entry and customer-visible status. No balance is spendable solely because a DLT transaction has confirmations.

### Three-way reconciliation

Continuously reconcile:

1. valid token supply by issuer, contract and version;
2. customer token/mirror subledger (available, reserved, frozen and pending); and
3. GL control balance plus SNB/SIC settlement records.

Also check customer identity aggregation, duplicate correlation IDs, wallet allow-list, contract role, chain finality and message completeness. On a mismatch, automatically stop minting and outbound transfers, preserve inbound funds, alert operations/risk, replay from the event log under dual control and restart only after two-person approval and evidence capture.

### Failure handling

- **Mint:** reserve and post first; if DLT mint fails, release the reservation or move to repair; never mint against stale available balance.
- **Burn:** disable or burn first; release the conventional balance only after final burn evidence; otherwise keep the customer in pending status.
- **Same-bank transfer:** commit CBS debit/credit and token event through one orchestrated finality process; compensate explicitly if one side fails.
- **Cross-bank transfer:** hold sender funds, screen both sides, settle SIC, credit receiving-bank mirror, then finalize token state. Rejects use an explicit return/compensating payment.
- **Chain fork/reorg or contract halt:** stop affected operations, use a finality threshold, compare authoritative CBS state, and reconcile before restart.
- **Key compromise/loss:** revoke the role, pause relevant wallets, rotate keys, investigate, and use a documented recovery wallet and legal authorization.

### Governance and key control

Separate platform administration, bank authority, bank operator, deployer, AML approver and recovery roles. Use HSM or MPC, four-eyes approval, offline recovery material, least privilege, rotation, tamper-evident logs, timelocked upgrades, storage-migration checks and a tested pause procedure. Smart-contract immutability must not prevent lawful freezes, resolution or correction; administrative power must not become an unbounded unilateral reversal right.

### Resilience and audit

FINMA Circular 2023/1 requires critical-function tolerances, dependency inventories, severe-but-plausible testing, incident management, access monitoring, BCP/DRP and provider coordination. FINMA does not prescribe one universal RTO/RPO number. Set targets through a business-impact analysis; authoritative balances and events should have no data loss, and service recovery must match the bank's disruption tolerance. Test CBS outage, DLT outage, SIC unavailability, AML dependency failure, duplicate/replay, mass redemption, provider loss, key compromise, upgrade and resolution.

Auditors should be able to reproduce one payment from customer instruction through KYC/AML decision, CBS reservation and GL journal, ISO 20022 message, SIC reference and timestamp, DLT transaction hash/block/finality, receiving-bank acceptance and customer statement. Store immutable correlation IDs and exportable evidence; retain independent reconciliation and contract-audit results.

## Core-banking system assessment

The relevant capability is not “blockchain support.” It is the ability to provide atomic reservations, customer-linked token subaccounts, real-time events, ISO 20022/SIC integration, idempotent posting, statements, controls, reconciliation and rebuild. Official vendor material shows integration capabilities but is not evidence of FINMA compliance or native deposit-token support.

- Avaloq publishes API catalogue, adapters and data streaming.
- Temenos publishes deposit/account/payment APIs and event interfaces, and has public tokenized-deposit/CBDC proofs of concept; those are vendor demonstrations, not Swiss production evidence.
- Finstar publishes Swiss OpenAPI and a digital-asset platform; tokenized-deposit capability must be demonstrated in the bank's installed version.
- Finnova and ERI OLYMPIC have integration/message capabilities; public material does not establish native deposit-token support.
- Mambu is an API-first international alternative, not a Swiss regulatory conclusion.

The RFP should require a live demonstration of mint, burn, same-bank and cross-bank flows, failed-step repair, ISO 20022, three-way reconciliation, event replay, 24/7 failover, key governance, contract upgrade/fork recovery, depositor-list export and FINMA outsourcing clauses.

## Coverage of the original design questions

| Topic | Covered conclusion |
|---|---|
| Legal form | Choose payment instruction, mirrored claim or native claim explicitly; substance over form |
| Debtor after transfer | Bank A remains liable until extinguishment; Bank B becomes liable only on its acceptance/issuance |
| Finality | Define CBS, SIC and receiving-bank events; DLT confirmation alone is insufficient |
| Self-custody | Possible only with continuous identity/ownership and transfer controls; permissioned wallets preferred |
| Freeze/reversal | Contractual, AML/legal and dual-control pause/recovery; no silent edits to final payments |
| FinMIA perimeter | Bank-operated exemption may apply, but multi-bank/systemic schemes require FINMA/SNB assessment |
| Insolvency/protection | Map token/wallet to CBS depositor; CHF100k is per customer/bank, not per wallet |
| FINMA approval | No blanket rule; treat as potentially material and seek preliminary review |
| Financial-statement line | Normally customer-deposit liability for a legal deposit; payment-instruction token remains a payment event |
| GL presentation | Separate management subcategory mapped to statutory customer-deposit line unless written policy says otherwise |
| Other-bank tokens | Apply legal-claim, credit, large-exposure, liquidity and Basel cryptoasset analysis; do not assume cash |
| 24/7 liquidity | Stress redemptions and intraday peaks; classify LCR/NSFR by redemption and holder |
| Interest/fees/tax/dormancy | Follow underlying account contract and Swiss tax/reporting rules with unified customer identity |
| CHF100k aggregation | Aggregate eligible conventional and tokenized balances by verified customer and bank |
| Authoritative ledger | CBS/GL for initial model; DLT is reconciled representation |
| Continuous posting | Required for safe mint/transfer; batch-only cores need a controlled real-time subledger |
| Failure entries | Explicit state machine, suspense/repair and compensating entries; never silent edits |
| Forks/upgrades/keys/errors | Permissioned roles, HSM/MPC, pause, timelock, recovery and tested migration |
| Mismatch | Stop mint/outbound, preserve funds, alert, replay and dual-control repair |
| RTO/RPO | Set by FINMA-aligned business-impact analysis; authoritative balances target zero data loss |
| Admin authority | Separated roles, four-eyes, least privilege and logged emergency controls |
| Auditor traceability | Correlation ID across customer, CBS/GL, AML, ISO/SIC, DLT and finality evidence |

## Source register

- [FINMA Guidance 06/2024 — Stablecoins](https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/4dokumentation/finma-aufsichtsmitteilungen/20240726-finma-aufsichtsmitteilung-06-2024.pdf)
- [FINMA Guidance 02/2019 — blockchain payments](https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/4dokumentation/finma-aufsichtsmitteilungen/20190826-finma-aufsichtsmitteilung-02-2019.pdf)
- [FINMA Circular 2023/1 — operational risks](https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/rundschreiben/finma-rs-2023-01-20221207.pdf)
- [FINMA Circular 2018/3 — outsourcing](https://www.finma.ch/en/~/media/finma/dokumente/rundschreiben-archiv/2018/rs-18-03/rs-18-03-letzte-aenderung-20191031.pdf?sc_lang=en)
- [FINMA depositor protection](https://www.finma.ch/en/supervision/banks-and-securities-firms/depositor-protection/)
- [FINMA bank legal basis](https://www.finma.ch/en/documentation/legal-basis/laws-and-ordinances/banks/)
- [SBA Deposit Token PoC report (2025)](https://www.swissbanking.ch/_Resources/Persistent/7/9/e/a/79ea024daa9834c99fc299db5d5f69c4317525a2/20250916_Ergebnisbericht%20PoC%20Deposit%20Token_EN_FINAL.pdf)
- [SBA Deposit Token white paper (2023)](https://www.swissbanking.ch/_Resources/Persistent/9/4/1/1/941178de59b98030206fc15ac8c99012f65df30b/SBA_The_Deposit_Token_EN_2023.pdf)
- [SNB SIC System Disclosure](https://www.snb.ch/public/asset/en/www-snb-ch/publications/sicsystem-disclosure/sicsystem-disclosure-all/sicsystem_disclosure_2023/publications0_en/sicsystem_disclosure_2023.en.pdf)
- [SIX ISO 20022 standards](https://www.six-group.com/en/products-services/banking-services/payment-standardization/standards/iso-20022.html)
- [BIS Basel cryptoasset standard, SCO60](https://www.bis.org/basel_framework/chapter/SCO/60.htm?inforce=20260101)
- [BIS Annual Economic Report 2025, Chapter III](https://www.bis.org/publ/arpdf/ar2025e3.htm)
- [SIF stablecoin consultation](https://www.sif.admin.ch/en/newnsb/x4TMWQ1SWofNoFx7XyHhY)
