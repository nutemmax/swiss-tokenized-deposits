# Project Agorá and Cross-Border Tokenized Deposits

**Research cut-off:** 24 August 2026<br>
**Primary source:** BIS Innovation Hub, *Project Agorá: A shared programmable platform for wholesale cross-border payments*, May 2026 ([local report](sources/bis/project-agora-2026.pdf))

## 1. Why Agorá matters

Project Agorá is the most relevant large-scale public-private experiment in this research because its May 2026 PoC report combines tokenized commercial-bank deposits with tokenized central-bank reserves in cross-border workflows and its later phase reached controlled real-value testing. The report records seven original central-bank participants, including the SNB, and more than 40 private-sector institutions ([report, page 6](sources/bis/project-agora-2026.pdf#page=6)).

It should be used as evidence about architecture and workflow feasibility, not as proof that a Swiss bank's production legal, prudential, or operating model is settled. The report deliberately separates prototype findings from future governance, legal, integration, performance, and resilience work.

### Current project status: report facts and later evidence

The report is a May 2026 snapshot, not the latest project status. Bank of Canada joined after the report, bringing the current central-bank count to eight ([BIS, 27 May 2026](https://www.bis.org/press/p260527.htm)). In July 2026, 28 financial institutions and central banks completed 17 controlled real-value scenarios across selected currencies, with values of approximately CHF 9,000–125,000 and approximately CHF 800,000 in aggregate ([BIS Project Agorá, updated 30 July 2026](https://www.bis.org/about/bisih/topics/fmis/agora.htm)).

This is stronger evidence than functional simulation: real value moved under a controlled test framework that included operational, technical, governance, and legal dimensions. It is still not a production service, production rulebook, or generic legal approval for a Swiss bank. Testing continues, and the project still requires production work on resilience, performance, operational integration, governance, and participant arrangements.

## 2. Two-layer architecture

Agorá uses two connected ledger layers:

- a **unifying ledger** holding tokenized commercial-bank deposits and the common payment workflow;
- **jurisdictional ledgers** holding tokenized central-bank reserves for eligible institutions in each currency area.

```mermaid
flowchart TB
    subgraph UL["Unifying ledger"]
        TDA["Bank A tokenized deposits"]
        TDB["Bank B tokenized deposits"]
        COORD["Payment coordinator and payment-leg contracts"]
    end
    subgraph J1["Jurisdictional ledger - currency A"]
        RA["Tokenized central-bank reserves"]
    end
    subgraph J2["Jurisdictional ledger - currency B"]
        RB["Tokenized central-bank reserves"]
    end
    MWA["Participant A middleware"] --> UL
    MWA --> J1
    MWB["Participant B middleware"] --> UL
    MWB --> J2
    COORD <--> J1
    COORD <--> J2
```

The ledgers expose common smart-contract interfaces, while participant-operated middleware performs institution-specific checks and consumes ledger events. The architecture therefore does not put the whole payment process or all customer information into one global contract.

## 3. Authority model: the critical difference

Agorá's report-era PoC treats balances and transactions recorded on its platform as the authoritative “golden source” for tokenized deposits. Participants reconcile their internal systems to the platform ([report, page 15](sources/bis/project-agora-2026.pdf#page=15)).

That is materially different from the CBS-authoritative recommendation in this research:

| Question | Agorá report-era PoC | Recommended first Swiss-bank pilot |
|---|---|---|
| Authoritative tokenized balance | Project Agorá platform | Bank CBS/customer subledger |
| Internal books | Reconciled to platform | Authorize and control token representation |
| Shared workflow | Central design element | Added only where multiple parties need shared state |
| Production rulebook | Future work | Required before external participant pilot |
| Migration significance | Prototype architecture choice | Moving authority to DLT is a separate product and regulatory decision |

The difference does not mean one architecture is universally better. It means controls, legal terms, accounting recognition, error correction, and resolution cannot be copied between them without redesign.

## 4. Participants and assets

The design restricts direct balance-holding roles to central banks and commercial banks. That is not the same as the full project roster: the design also contemplates initiation service providers and indirect participants, and the project includes infrastructure, messaging, and payment-network participants. Tokenized commercial-bank deposits are held for wholesale/corporate or financial-institution activity rather than individual retail users ([report, page 61](sources/bis/project-agora-2026.pdf#page=61)).

The report identifies seven Swiss private-sector participants: AMINA Bank, Banque Cantonale Vaudoise, Basler Kantonalbank, PostFinance, SIX Digital Exchange, Sygnum Bank, and UBS ([BIS participant list](https://www.bis.org/publ/othp110.pdf)). Their participation is evidence of engagement in the project; it is not evidence that each has launched a production tokenized-deposit service.

The report treats tokenized deposits as ordinary commercial-bank deposits represented on the platform, with the legal relationship grounded in issuer account records and agreements. This supports the core proposition that token technology does not itself create a new kind of issuer.

## 5. Five-stage payment workflow

Agorá structures payments into five stages ([report, pages 25 and 28](sources/bis/project-agora-2026.pdf#page=25)):

1. **Confirmation of payee:** the creditor institution verifies beneficiary information before the payment proceeds.
2. **Path discovery:** participants identify a viable route, potentially including intermediary banks and FX providers.
3. **Validation:** each institution performs its own compliance, operational, amount, and readiness checks.
4. **Locking and delegation:** required balances are reserved and narrowly scoped settlement authority is delegated.
5. **Settlement:** payment-leg contracts execute after all required conditions are satisfied.

```mermaid
flowchart LR
    C["1. Confirm payee"] --> P["2. Discover path"]
    P --> V["3. Validate amounts, compliance, readiness"]
    V --> L["4. Lock balances and delegate"]
    L --> S["5. Coordinated settlement"]
    C -. failure .-> X["Terminate"]
    P -. no path .-> X
    V -. reject/timeout .-> X
    L -. pre-commit failure .-> U["Release locks"]
```

This sequencing is valuable because expensive locking occurs only after identity, path, amount, and readiness checks. It also makes failures explicit rather than leaving each bank to infer the state of other participants.

## 6. Smart-contract and middleware layers

Agorá separates shared coordination logic from participant-private execution. The table shows why not every check or commercial decision belongs in a common smart contract even when all participants rely on the resulting workflow.

| Layer | Function | Information placement |
|---|---|---|
| Asset contracts | Issue, redeem, transfer, lock, and delegate tokenized deposits/reserves | Minimal asset state and commitments |
| Payment coordinator | Authoritative workflow state, deadlines, participant readiness, outcome | Shared workflow status |
| Payment-leg contracts | Execute scoped settlement legs | Leg state and settlement events |
| Reference contracts | Participants, assets, currencies, and configuration | Shared reference data |
| Participant middleware | Confirmation of payee, pathfinding, compliance, pricing, amount calculation, readiness | Institution-private data and logic |

The coordinator enforces sequencing but does not itself perform each bank's customer or compliance checks. It consumes endorsed outcomes. This separation is directly reusable: a bank should not disclose raw KYC files or sanctions reasoning merely to prove that a check passed.

## 7. Privacy architecture

Agorá combines two mechanisms:

- **Noto** uses an issuer-backed/notary, commitment-based UTXO-style model for token-level privacy ([report, pages 40–41](sources/bis/project-agora-2026.pdf#page=40)).
- **Pente** provides privacy-group-scoped workflow execution and ephemeral EVM mechanics for participant-specific coordination ([report, pages 40 and 42](sources/bis/project-agora-2026.pdf#page=42)).

The design shows that shared verification does not require all participants to see every customer, path, amount calculation, or compliance input. It does not remove the need for lawful information exchange, regulatory access, data governance, or analysis of metadata leakage.

## 8. Atomic settlement and legal finality

In the prototype, “atomic” means the coordinated workflow reaches a complete settlement outcome or terminates according to its rules. It does not necessarily mean every ledger is updated at the same physical instant.

The legal analysis contemplates giving an atomic settlement trigger on the unifying ledger legal significance through jurisdiction-specific rulebooks, while actual ledger updates may occur asynchronously ([report, pages 70–71](sources/bis/project-agora-2026.pdf#page=70)). The subsequent BIS result states that legal settlement finality was found achievable across the original seven jurisdictions ([BIS, 27 May 2026](https://www.bis.org/press/p260527.htm)).

That result should be read precisely: it supports the feasibility of a legally supported rulebook mechanism for the project architecture. It does not mean that technical consensus alone creates finality, that every future participant has a complete legal opinion, or that a Swiss bank can reuse the conclusion without its own terms, rulebook, settlement rail, and insolvency analysis.

## 9. Demonstrated use cases

The report illustrates:

- an urgent financial-services payment between Mexico and the United States;
- a same-day Swiss-Korean corporate payment using path discovery and a vehicle currency;
- cross-border GBP/JPY liquidity balancing with payment-versus-payment.

These examples show how confirmation of payee, path discovery, private validation, amount agreement, locking, and coordinated settlement can reduce sequential hand-offs. They do not establish production cost savings or legal availability in every corridor.

## 10. What the prototype did not establish

The report expressly identifies production work still needed, including performance and scalability benchmarking ([report, page 90](sources/bis/project-agora-2026.pdf#page=90)) and governance/rulebook design ([report, page 91](sources/bis/project-agora-2026.pdf#page=91)). It did not establish:

- production cybersecurity posture;
- operational resilience, failover, or disaster recovery;
- throughput and latency under real load;
- liquidity optimization;
- live integration with production CBS and RTGS systems;
- production monitoring and support;
- final operating governance and liability allocation;
- definitive legal opinions for every implementation detail.

Those limitations matter because the hardest bank risks often arise outside the happy-path smart contract: operating a key service, repairing an externally final payment, maintaining 24/7 support, or resolving a participant insolvency.

## 11. Adopt, adapt, or do not infer

The prototype offers patterns at different levels of maturity. The following classification distinguishes ideas that can be reused directly as research patterns, ideas that require adaptation to the Swiss CBS-authoritative pilot, and conclusions the prototype does not support.

| Pattern | Decision | Swiss-bank interpretation |
|---|---|---|
| Five-stage workflow | Adopt | Strong model for pre-validation, readiness, locking, and commit/cancel |
| Participant middleware | Adopt | Keep institution-specific compliance and pricing private |
| Minimal shared data | Adopt | Use attestations and opaque references, subject to regulatory access |
| Asset/workflow/reference contract separation | Adopt | Supports clear responsibilities and upgrades |
| Platform as golden source | Adapt later | First prove CBS-authoritative model; migrate only with legal/accounting approval |
| Jurisdictional reserve ledgers | Adapt | Begin with current SIC integration; study tokenized reserves as infrastructure evolves |
| Privacy mechanisms | Evaluate | Reuse principles; select technology after threat, legal, and support assessment |
| Atomicity claim | Qualify | Describe workflow, ledger, accounting, and legal finality separately |
| Production readiness | Do not infer | Prototype success is not evidence of scale, resilience, governance, or regulatory approval |

The table is a bridge, not a procurement decision. Agorá offers strong design patterns, but the Swiss pilot should preserve the bank's chosen authority model and use existing settlement infrastructure until the legal and operational case for deeper integration is proven.

## 12. Swiss tokenized-money and settlement landscape

These initiatives are related but answer different questions. Treating them as one Swiss tokenized-money model would obscure which asset, ledger, participant, and settlement mechanism each one tests.

```mermaid
flowchart TB
    CHF["Swiss CHF money and settlement landscape"]
    CHF --> BASE["Production payment and market infrastructure"]
    CHF --> DEP["Commercial-bank payment and deposit experiments"]
    CHF --> CB["Central-bank settlement experiments"]
    CHF --> ADJ["Adjacent private-money model"]

    BASE --> SIC["SIC and SIC Instant Payments - Production"]
    BASE --> BX["BX Digital securities infrastructure and SIC link - Production for approved scope"]
    DEP --> SBA["SBA Deposit Token - PoC: on-chain instruction, off-chain deposits"]
    DEP --> UBS["UBS Digital Cash - Pilot"]
    DEP --> AGO["Project Agora - Controlled real-value test"]
    CB --> HEL["Project Helvetia - Pilot in production infrastructure"]
    CB --> REPO["SNB digital repos - PoC / experiment"]
    ADJ --> STB["CHF stablecoin work - Sandbox"]
```

The diagram groups initiatives by the money, instruction, or settlement function they evidence. Placement on a production infrastructure branch applies only to the approved infrastructure scope; it does not upgrade every instrument tested on that infrastructure to production.

| Initiative or infrastructure | Maturity at cut-off | Principal question | Money or instruction involved | What it does not establish |
|---|---|---|---|---|
| SIC / SIC Instant Payments | **Production** | How eligible participants settle CHF obligations and provide instant account-to-account payments | Sight deposits at the SNB; current payment-system messages and rules | It does not issue or operate the customer's tokenized deposit |
| Project Helvetia | **Pilot in production infrastructure** | How tokenized assets can settle in central-bank money through integrated wCBDC or a synchronized RTGS link | Wholesale CBDC on the SIX Digital Asset Platform or traditional central-bank money through SIC | It is not a retail CBDC or a commitment to permanent wCBDC |
| BX Digital | **Production for its approved DLT-securities scope** | How DLT securities infrastructure connects to SIC RTGS settlement | Tokenized securities and central-bank-money settlement | It is not a tokenized-deposit approval or multi-bank deposit-token scheme |
| Project Agorá | **Controlled real-value test** | How multiple currencies and jurisdictions can coordinate wholesale cross-border payments on programmable ledgers | Platform-authoritative tokenized commercial-bank deposits and tokenized central-bank reserves | Testing demonstrates feasibility, not production resilience, live Swiss-bank integration, or a final Swiss legal rulebook |
| SBA Deposit Token | **Concept** (2023); **PoC** (2025) | Whether on-chain payment instructions can trigger off-chain bank-account payments and programmable escrow-like workflows | On-chain payment instructions linked to off-chain deposits and mirror-account movements | It did not make the instruction token an authoritative on-chain deposit claim |
| UBS Digital Cash / UBS–Ant | **Pilot** / **concept collaboration** | Multi-currency corporate payment and treasury/liquidity flows on a blockchain-based platform | UBS payment platform and tokenized-deposit exploration | It is not a public Swiss multi-bank deposit-token scheme ([UBS Digital Cash](https://www.ubs.com/global/en/media/display-page-ndp/en-20241107-ubs-digital-cash.html), [UBS–Ant](https://www.ubs.com/global/sc/media/display-page-ndp/en-20251117-ubs-digital-cash-global-treasury-management.html)) |
| SNB digital repos | **PoC / experiment** | Whether DLT repos and central-bank-money settlement are feasible and where fragmentation remains | Repo collateral and wCBDC settlement | It does not establish general production readiness or eliminate collateral fragmentation |
| CHF stablecoin work | **Sandbox** | Selected use cases for a CHF stablecoin in a controlled live environment | A separate issuer/reserve or guarantee structure | It is not automatically a commercial-bank deposit claim ([joint announcement](https://www.ubs.com/global/it/media/display-page-ndp/en-20260408-stablecoin.html)) |

The SNB currently describes Helvetia as covering both integrated settlement with wCBDC and synchronized settlement through an RTGS link, with the project running until at least June 2028. It also states that the pilot is not a commitment to introduce wCBDC permanently. BX Digital uses the RTGS-link approach with the SIC system in a production environment for its DLT-securities infrastructure; that is useful settlement evidence but not a deposit-token approval ([SNB Project Helvetia](https://www.snb.ch/en/the-snb/mandates-goals/payment-transactions/projekt_helvetia), [FINMA BX Digital licence](https://www.finma.ch/en/news/2025/03/20250318-mm-dlt-handelssystem/)).

For the proposed bank pilot, SIC is the existing settlement baseline, the SBA PoC is the closest Swiss evidence for tokenized payment instructions and lightweight CBS interaction, Helvetia informs the central-bank-money settlement leg for tokenized assets, and Agorá supplies the most developed cross-border programmable-workflow pattern. None of them removes the need to choose the bank's own claim and record-authority model.

As of the research cut-off, this review identified no publicly announced **production multi-bank Swiss tokenized-deposit scheme**. That negative finding should be rechecked at each research refresh; it is not proof that no private or unpublished initiative exists.

## What this means for the bank

Agorá supports the feasibility of coordinated cross-border workflows and privacy-preserving shared state. Its most reusable result is the separation of private institutional decisions from deterministic shared orchestration. Its most important warning is that architecture, legal finality, and production operations must be developed together.

Next: [09 - Tokenized-deposit implementation roadmap and vendor assessment](09-tokenized-deposit-implementation-roadmap-and-vendor-assessment.md).
