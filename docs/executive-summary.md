# Tokenized deposits in a Swiss bank — executive summary

**Research date:** 13 August 2026  
**Audience:** readers who know banking only at a high level

## The idea in one paragraph

A tokenized deposit is a normal bank deposit represented, or used through, a digital token. The customer still has a claim on a bank; the token is an additional way to move or program that claim. The safest first design is therefore not to make a blockchain the bank's legal ledger. The bank should keep its core banking system (CBS) and general ledger as the official records, use a permissioned token network as a controlled payment layer, and reconcile the two continuously.

## The recommended first model

1. The customer has a verified bank account and a verified wallet.
2. The bank reserves and reclassifies CHF 100 in the CBS from an ordinary deposit to a tokenized-deposit subaccount.
3. Only then does the bank mint CHF 100 of tokens.
4. A same-bank transfer debits one customer's token liability and credits another's. Total bank liabilities do not change.
5. A cross-bank transfer burns the sending bank's claim, settles the interbank amount in central-bank money (normally SIC/SNB sight deposits), and lets the receiving bank create its own customer claim.
6. Burning a token and releasing an ordinary deposit balance is the reverse of minting.

The Swiss Bankers Association's 2025 proof of concept used an even more conservative version: the token represented a payment instruction while the actual deposits and mirror accounts stayed off-chain in bank systems. That is useful for a pilot, but it does not prove that every kind of native on-chain token would be insured or booked as a deposit.

## What FINMA and Swiss sources make clear

- Substance matters more than the word “token.” A fixed-CHF redeemable claim can be a deposit; another design may be a payment instruction, security, stablecoin or collective-investment arrangement.
- AML rules still apply. The bank must know the customer and beneficial owner, control wallets and restrict transfers where it cannot identify holders. Anonymous bearer circulation is a poor fit for a supervised Swiss bank.
- A blockchain confirmation is not automatically legal finality. For interbank payments, the conservative final point is settlement in SIC plus the receiving bank's acceptance.
- CHF 100,000 depositor protection is measured per eligible customer and bank, not per wallet. A token is not a second insurance allowance.
- There is no FINMA-approved standard chart of accounts or universal tokenized-deposit journal entry. The bank must obtain a written legal and accounting position from Swiss counsel, its auditor and FINMA.

## The main risks

- **Run and liquidity risk:** tokens can move 24/7 and at high speed. Treasury must model rapid redemptions, weekend flows and intraday settlement peaks.
- **Operational risk:** CBS, DLT, SIC, AML and key-management systems can fail independently. A durable transaction state machine and safe repair process are essential.
- **Identity and privacy:** wallet addresses can be personal data and may expose bank secrecy concerns. Allow-listed wallets and a controlled network are easier to govern.
- **Legal uncertainty:** debtor, finality, insolvency and deposit-protection outcomes depend on the contract and system rules.
- **Third-party risk:** a cloud node, DLT operator, HSM provider or CBS integrator may be a material outsourced function under FINMA rules.

## What the project should decide next

Create a product/legal decision record that states whether the token is (a) a payment instruction, (b) a mirrored bank liability, or (c) a native on-chain bank liability. Then document the exact debtor after each transfer, the legal finality event, the wallet policy, the deposit-protection mapping and the accounting treatment. Only after that should the bank select a token standard or CBS vendor.

## Sources

- [FINMA Guidance 06/2024 — Stablecoins](https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/4dokumentation/finma-aufsichtsmitteilungen/20240726-finma-aufsichtsmitteilung-06-2024.pdf)
- [FINMA Guidance 02/2019 — payments on blockchain](https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/4dokumentation/finma-aufsichtsmitteilungen/20190826-finma-aufsichtsmitteilung-02-2019.pdf)
- [SBA Deposit Token PoC report (2025)](https://www.swissbanking.ch/_Resources/Persistent/7/9/e/a/79ea024daa9834c99fc299db5d5f69c4317525a2/20250916_Ergebnisbericht%20PoC%20Deposit%20Token_EN_FINAL.pdf)
- [FINMA depositor protection](https://www.finma.ch/en/supervision/banks-and-securities-firms/depositor-protection/)
- [SNB SIC System Disclosure](https://www.snb.ch/public/asset/en/www-snb-ch/publications/sicsystem-disclosure/sicsystem-disclosure-all/sicsystem_disclosure_2023/publications0_en/sicsystem_disclosure_2023.en.pdf)
