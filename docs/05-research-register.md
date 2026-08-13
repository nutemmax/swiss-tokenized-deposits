# Research register and evidence notes

**Cut-off:** 13 August 2026  
**Use:** source map for the project; verify the official German/French text and current reporting instructions before relying on a rule.

## Source hierarchy

1. Swiss statutes, ordinances and official FINMA/SNB documents are the primary legal and supervisory sources.
2. The SBA Deposit Token PoC is a high-value Swiss industry analysis and tested flow description, but it is not binding law or approval.
3. BIS material is an international prudential/monetary baseline, not automatically Swiss law.
4. Vendor pages prove only the capability the vendor actually documents; they do not prove installed-version support, control effectiveness or FINMA acceptance.

## Evidence ledger

| Source | Evidence used | Status/limitation |
|---|---|---|
| [FINMA Guidance 06/2024](https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/4dokumentation/finma-aufsichtsmitteilungen/20240726-finma-aufsichtsmitteilung-06-2024.pdf) | Substance-over-form classification, AML, holder identification, transfer restrictions, default guarantee | Stablecoin guidance; not a complete bank-issued token accounting opinion |
| [FINMA ICO supplement](https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/1bewilligung/fintech/wegleitung-stable-coins.pdf) | Fixed-CHF redemption and risk-allocation indicators; payment-system perimeter | Case-by-case guidance |
| [FINMA blockchain payments](https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/4dokumentation/finma-aufsichtsmitteilungen/20190826-finma-aufsichtsmitteilung-02-2019.pdf) | Travel Rule, wallet ownership and external-wallet controls | Technology-neutral supervisory expectation |
| [FINMA Circular 2023/1](https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/rundschreiben/finma-rs-2023-01-20221207.pdf) | ICT, cyber, critical data, BCP, RTO/RPO governance, incident reporting | Does not prescribe a token architecture |
| [FINMA Circular 2018/3](https://www.finma.ch/en/~/media/finma/dokumente/rundschreiben-archiv/2018/rs-18-03/rs-18-03-letzte-aenderung-20191031.pdf?sc_lang=en) | Significant outsourcing, audit rights, exit and cross-border risk | Apply to actual provider arrangements |
| [FINMA depositor protection](https://www.finma.ch/en/supervision/banks-and-securities-firms/depositor-protection/) | CHF 100,000 per client and bank; custody/deposit distinction | Product-specific legal claim still needs analysis |
| [FINMA 2025 crypto disclosure](https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/4dokumentation/finma-aufsichtsmitteilungen/20250905-finma-aufsichtsmitteilung-03-2025.pdf) | Custody cryptoasset disclosure distinction | Not own-issued deposit liability |
| [SBA PoC report](https://www.swissbanking.ch/_Resources/Persistent/7/9/e/a/79ea024daa9834c99fc299db5d5f69c4317525a2/20250916_Ergebnisbericht%20PoC%20Deposit%20Token_EN_FINAL.pdf) | Mirror accounts, mint/burn, SIC flow, payment-instruction legal model, open accounting work | Industry report; conclusions are expressly not binding |
| [SNB SIC disclosure](https://www.snb.ch/public/asset/en/www-snb-ch/publications/sicsystem-disclosure/sicsystem-disclosure-all/sicsystem_disclosure_2023/publications0_en/sicsystem_disclosure_2023.en.pdf) | RTGS finality on debit; central-bank-money settlement; 24/7 instant payments | Describes SIC, not a private DLT scheme |
| [SNB Helvetia](https://www.snb.ch/en/the-snb/mandates-goals/payment-transactions/projekt_helvetia) | Wholesale CBDC and DLT/RTGS-link settlement context | Wholesale SNB liability, not commercial-bank deposit |
| [BIS SCO60](https://www.bis.org/basel_framework/chapter/SCO/60.htm?inforce=20260101) | Tokenized bank-claim eligibility, own-issued unsecured funding, LCR/NSFR treatment | International Basel standard; map to Swiss implementation |
| [BIS Annual Report 2025](https://www.bis.org/publ/arpdf/ar2025e3.htm) | Burn/issue and central-bank-reserve settlement model; singleness of money | Conceptual/international analysis |
| [SIF consultation](https://www.sif.admin.ch/en/newnsb/x4TMWQ1SWofNoFx7XyHhY) | Pending stablecoin/payment-instrument legislative direction | Consultation proposal, not enacted law as of cut-off |

## Deliberate uncertainties

The following require written product-specific conclusions rather than assumptions:

- whether the token is a deposit claim, payment instruction, security or technical trigger;
- whether the scheme is a payment system/FMI and whether SNB oversight applies;
- the debtor and creditor at each transfer state;
- the statutory finality and insolvency treatment of the chosen design;
- whether native token balances qualify for depositor protection;
- the exact FINMA accounting and regulatory-reporting mapping;
- Swiss LCR/NSFR factors for the actual holder and redemption model;
- the material-change/approval perimeter;
- tax, stamp-duty, withholding and dormant-asset details; and
- the final 2027 Swiss liquidity-rule mapping.

## Research hygiene

Date-stamp every conclusion. Record the legal text version, language, paragraph/article, product assumption and open caveat. Where an English translation is unofficial, link the official Swiss source and use the translation only for working comprehension. Keep legal, accounting, prudential, operational and vendor conclusions in separate decision records.
