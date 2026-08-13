# Booking, accounting, deposit protection and prudential treatment

**Research date:** 13 August 2026  
**Scope:** CHF tokenized deposits at a Swiss bank. English translations of Swiss legislation are for convenience; German/French official texts and written auditor/FINMA positions prevail.

## Accounting principle

Tokenization changes the representation and payment rail, not the bank's balance-sheet economics by itself. If the customer has a legally binding, par-redeemable claim on the bank, the liability should normally remain in the customer-deposit category. If the token is only a payment instruction, the ordinary deposit liability remains unchanged and token events are controlled payment/memo events.

FINMA Accounting Ordinance and Circular 2020/1 provide recognition, presentation and disclosure rules but no tokenized-deposit chart of accounts. Keep a separate internal product subcategory and control account so that token liabilities can be reported, reconciled, stress-tested and aggregated without inventing a new statutory balance-sheet line.

## Recommended ledger layers

### General ledger

- customer deposits — conventional;
- customer deposits — tokenized (management subcategory mapped to the applicable statutory line);
- SNB sight deposits and SIC settlement balances;
- due-to/due-from-bank and settlement-pending accounts;
- fee income, interest expense and tax payable; and
- controlled suspense/repair accounts with ageing and approval.

### Customer/token subledger

Store customer and beneficial-owner ID, account ID, wallet, contract/version, issuer bank, available/reserved/frozen/pending amounts, finality status, customer limits, transaction correlation ID and the GL journal reference. Wallets must roll up to one depositor ID for protection and reporting.

## Double-entry templates

The following are design templates, not prescribed FINMA entries.

| Event | Debit | Credit | Accounting meaning |
|---|---|---|---|
| New CHF funding | SNB sight deposit/cash | Tokenized customer-deposit liability | New bank funding |
| Existing deposit converted | Conventional deposit liability | Tokenized deposit liability/mirror | Pure liability reclassification |
| Token redeemed to ordinary account | Tokenized deposit liability | Conventional deposit liability | Reverse reclassification |
| Token redeemed for external cash | Tokenized deposit liability | Cash/SNB payable | Liability paid out |
| Same-bank transfer | Payer token liability | Payee token liability | Reallocates customer creditors |
| Bank A cross-bank sender leg | Payer token liability | Due-to-SIC/settlement payable | Extinguishes Bank A customer claim while cash settles |
| Bank B cross-bank receiver leg | SNB/SIC settlement asset | Recipient token liability | Creates Bank B customer claim |
| Deposit interest | Interest expense | Accrued token liability | Same economics as ordinary deposit interest |
| Fee debited from balance | Customer token liability | Fee income (and tax payable if required) | Customer-funded fee |
| Failed pending leg | Suspense/repair account | Reversal of temporary payable or liability | Controlled compensating entry; never silent editing |

If a token is only a payment instruction, do not create a second deposit liability for the token. Post the underlying deposit/mirror movement and retain the DLT transaction as an auditable settlement event.

## Balance and reconciliation controls

Enforce continuously:

`valid token supply by issuer = token subledger balance = tokenized-deposit GL control balance`

For each customer:

`available + reserved + frozen + pending = tokenized customer balance`

Also reconcile contract version, wallet allow-list, DLT finality, CBS event ID, ISO 20022/SIC reference, and depositor identity. A mismatch blocks new minting and outbound transfers; operations preserve inbound funds, investigate from the event log, repair under dual control and obtain independent sign-off before restart.

## Financial statements and disclosures

Use the statutory customer-deposit category for a legal deposit claim unless the auditor and FINMA approve another treatment. Disclose the accounting policy and material token-specific risks, including legal structure, redemption, transfer restrictions, technology dependency, liquidity speed, concentration, operational incidents and reconciliation controls. Do not put own-issued deposit liabilities in a client-custody cryptoasset line. FINMA's 2025 cryptobased-asset disclosure guidance concerns custody assets and does not establish a tokenized-deposit line.

For IFRS reporters, IAS 32 treats a cash deposit as the depositor's financial asset and bank's contractual financial liability; IFRS 9 generally points to amortised cost for an ordinary par-redeemable deposit. The contract, not the token format, controls classification.

## Deposit protection and resolution

Eligible deposits are privileged/protected up to CHF 100,000 per customer and bank. Banking Ordinance rules aggregate balances, include accrued interest and require the contracting party to be identifiable in bank ledgers. The bank must be able to produce a depositor list and protected amount within the statutory timetable. The implementation should therefore maintain a continuously exportable mapping:

`wallet → token account → CBS account → legal customer/beneficial owner → all eligible deposits at the bank`

Do not grant CHF 100,000 per wallet. Do not net overdrafts or unbooked bank fees against the privilege unless the applicable rule permits it. In resolution, freeze token transfers, calculate protected balances, convert/redeem balances and provide an ordinary payout path.

## Minimum reserves, LCR, NSFR and capital

Tokenized sight deposits remain relevant to SNB minimum reserves. Tag them by currency, maturity and cancellability; tokenization must not become a way to avoid reserve requirements.

Swiss LCR requires HQLA for stressed net cash outflows over 30 days; NSFR requires stable funding over one year; the Liquidity Ordinance also requires intraday-liquidity management. Token rails can accelerate outflows and settlement, so model them separately even where the accounting liability is ordinary.

Basel SCO60 provides the international prudential baseline for tokenized bank claims. A qualifying tokenized claim must carry the same legal rights as the traditional claim, redeem at par and be supported by the bank's creditworthiness/asset-liability profile. Own-issued token liabilities are unsecured funding. LCR outflows and NSFR available-stable-funding treatment follow the earliest contractual redemption and holder category. The bank must not assume the most favourable stable-retail-deposit rate; an unidentifiable holder is generally treated as unsecured wholesale funding. Ask FINMA to map this Basel treatment to Swiss reporting forms and the product's actual holder model.

The token liability itself normally does not create a new credit RWA, but assets funded by it still attract their normal capital and leverage treatment. Holding another bank's token requires a separate cryptoasset, credit, large-exposure and liquidity analysis; it is not automatically cash or a central-bank claim. Operational, cyber, key and settlement failures must feed operational-risk and capital assessments.

## Treasury and product economics

Stress at least:

- instantaneous full or partial redemption;
- 24/7 and weekend payment peaks;
- same-bank versus interbank velocity;
- contract halt, chain outage and SIC outage;
- AML/sanctions rejection after funds are reserved;
- bridge/return timing and stuck transactions;
- concentration by customer, wallet and bank; and
- mass conversion between conventional and tokenized balances.

Interest, negative interest, fees and statements should reuse ordinary deposit rules. Keep one tax identity across account types for withholding tax, CRS/AEOI and dormant-asset processing. Principal transfer is not automatically interest; obtain Swiss tax advice for stamp duty, VAT, security-like features and product-specific withholding treatment.

## Transition note for 2027

FINMA announced a new FINMA Liquidity Ordinance effective 1 January 2027, with limited content changes and migration of some information/planning requirements into the Federal Council Liquidity Ordinance. Documents using the 2025 Liquidity Ordinance/Circular references should be date-stamped and refreshed for the 2027 regime.

## Sources

- [FINMA Accounting Ordinance](https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/ex-post-evaluation/20230103-rechnungslegung/rechnungslegungsverordnung_finma_20191031.pdf?hash=1F133ED5B13CDD4A99923F683D00C0D0&sc_lang=en)
- [FINMA Accounting Circular 2020/1 overview](https://www.finma.ch/en/documentation/archiv/rundschreiben/archiv-2020/)
- [Swiss Banking Act convenience translation](https://assets.kpmg.com/content/dam/kpmgsites/ch/pdf/ch-banking-act-en.pdf)
- [Swiss Banking Ordinance convenience translation](https://assets.kpmg.com/content/dam/kpmgsites/ch/pdf/ordinance-on-banks-and-savings-banks-en.pdf)
- [FINMA depositor protection](https://www.finma.ch/en/supervision/banks-and-securities-firms/depositor-protection/)
- [esisuisse depositor-list specification](https://www.esisuisse.ch/media/files/CWTG214W/20240212-Entwurf_Spezifikation_Einlegerliste-V200-EN.pdf)
- [Swiss Liquidity Ordinance](https://ch.odat.ch/en/cc/952.06-20250101-en.html)
- [Basel SCO60 cryptoasset exposures](https://www.bis.org/basel_framework/chapter/SCO/60.htm?inforce=20260101)
- [FINMA 2026 liquidity-ordinance announcement](https://www.finma.ch/news/2026/07/20260707-mm-liqv-finma/)
- [IFRS IAS 32](https://www.ifrs.org/content/dam/ifrs/publications/pdf-standards/english/2021/issued/part-a/ias-32-financial-instruments-presentation.pdf?bypass=on)
- [SBA Deposit Token PoC report](https://www.swissbanking.ch/_Resources/Persistent/7/9/e/a/79ea024daa9834c99fc299db5d5f69c4317525a2/20250916_Ergebnisbericht%20PoC%20Deposit%20Token_EN_FINAL.pdf)
