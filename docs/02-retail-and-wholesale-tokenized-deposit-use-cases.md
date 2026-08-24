# Retail and Wholesale Tokenized-Deposit Use Cases

**Research cut-off:** 24 August 2026<br>
**Purpose:** identify problems where tokenized deposits add measurable value rather than novelty

## 1. Selection rule

A use case is promising when several parties need a shared state, conditional execution, or synchronized exchange that existing account APIs and payment rails handle poorly. Tokenization is not justified merely because a payment can be represented on a ledger.

Use cases should pass five tests:

1. **Claim clarity:** users understand which bank owes them money.
2. **Incremental benefit:** programmability or shared state removes a real delay, risk, or reconciliation cost.
3. **Control feasibility:** identity, sanctions, fraud, limits, recovery, and privacy can operate throughout the lifecycle.
4. **Settlement integrity:** interbank or cross-asset obligations have an explicit settlement and finality model.
5. **Operational viability:** the service can fail safely and be supported at expected scale.

A practical assessment begins with the current process rather than the proposed token. The bank should identify who experiences the delay or risk, which existing rail or API already addresses it, what shared or programmable state remains missing, and which party would carry the new operating complexity. A use case is credible only when the expected improvement can be compared with a baseline.

### Swiss baseline: test before tokenizing

For domestic account-to-account payments, the baseline includes SIC Instant Payments: a 24/7 service designed to complete successful payments in less than ten seconds. It is already available for receipt across institutions representing more than 95% of Swiss customer-payment volume ([SIX Instant Payments](https://www.six-group.com/en/products-services/banking-services/billing-and-payments/instant-payments.html)). A use case therefore needs an explicit answer to the following question before it enters a tokenized-deposit pilot:

> Which measurable customer, control, liquidity, reconciliation, or cross-asset outcome cannot be obtained as safely and cheaply with an ordinary CBS workflow, account API, card authorization, escrow arrangement, or SIC instant payment?

If the answer is only that the payment is faster, available 24/7, or recorded on a ledger, the use case should be rejected or implemented on the ordinary rail. Tokenization is an additional operating model, not a default replacement for Swiss payments infrastructure.

| Baseline to test | Use it instead when | Tokenization may remain justified when |
|---|---|---|
| CBS booking or standing order | One bank controls the balance, condition, and support process | Several independent parties need shared, auditable state |
| SIC Instant Payment | A simple account-to-account payment is the whole requirement | The payment must coordinate with a separate asset, conditional lock, or multi-party workflow |
| Card authorization or ordinary escrow | Existing dispute and release mechanisms provide the required protection | Parties need a new, objective, jointly governed release and audit process |
| Account API/open-banking workflow | The workflow can remain bank-private and message-based | Reconciliation copies, conditional commitments, or corridor coordination are the measured bottleneck |

### Where the value can come from

The token itself is rarely the benefit. Value normally comes from one or more operating improvements:

- **Shared state:** several institutions see the same workflow status instead of reconciling separate messages and spreadsheets.
- **Conditional execution:** funds can be reserved and released only when objective, agreed conditions are met.
- **Synchronized exchange:** cash, securities, or FX legs can commit under one coordinated decision, reducing principal risk.
- **Extended workflow availability:** a controlled ledger can accept, validate, or reserve instructions outside a particular market or system window, provided liquidity, settlement, support, and recovery are also available. It is not a claim that ordinary Swiss instant payments lack 24/7 availability.
- **Reusable digital money interface:** customers can connect a bank claim to approved applications without every application maintaining a separate stored-value balance.

These benefits must be measured against the cost of new keys, contracts, nodes, participant governance, privacy controls, and multi-system recovery. A technically elegant shared ledger can still have a negative business case.

## 2. Retail use cases

Retail customers normally care about the outcome rather than the ledger. They need to know whether payment is complete, who can return funds, what happens after fraud or device loss, and whether the balance remains a deposit at their bank. The strongest retail use cases make a conditional or multi-party process easier without transferring technical complexity to the customer.

| Use case | Problem | Tokenized-deposit role | Dependencies and constraints | Measure of value | Do not pursue when |
|---|---|---|---|---|---|
| Conditional merchant payment | Customer wants payment only when delivery or another event occurs | Lock funds and release or cancel under an agreed rule | Consumer terms, dispute process, trusted event source, fraud controls | Fewer disputes; faster release; lower escrow cost | A card authorization or account API already provides equivalent protection |
| Marketplace escrow | Platform intermediates between buyers and sellers | Shared, auditable reservation and split settlement | Seller onboarding, safeguarding model, refunds, platform liability | Shorter settlement; fewer manual reconciliations | Platform cannot support customer-service and reversal obligations |
| Programmable household payment | Recurring or rule-based payment needs granular conditions | Customer-approved limits and automated release | Clear mandate, revocation, accessibility, device recovery | Fewer failed payments; greater user control | Logic is entirely single-bank and simpler as a standing order |
| Cross-border remittance | Multiple intermediaries create delay and uncertain fees | Shared path, pre-validation, and coordinated settlement | FX provider, foreign-bank participation, sanctions, payment transparency | End-to-end time, rejection rate, disclosed total fee | Corridor lacks regulated participants or reliable settlement |
| Resilient bank payment | Customer needs continued access during partial channel outage | Controlled alternative interface and queued/limited transfer | Offline-risk limits, double-spend controls, recovery | Availability during defined incidents | Design merely moves the same single point of failure |

Retail design must preserve understandable statements, accessible recovery, transparent fees, complaint handling, and fraud investigation. A self-custody experience that makes key loss economically final would be a materially different product from an ordinary recoverable bank account.

### Worked retail journey: conditional merchant payment

Alice orders equipment from a participating merchant. Instead of paying immediately, she authorizes Bank A to reserve CHF 500 under a clear delivery condition. The merchant can see that the funds are reserved but cannot spend them. When the agreed delivery evidence arrives, the workflow requests release; if the deadline passes without valid evidence, the reservation expires and Alice's funds become available again.

The difficult part is not writing the release condition. The bank must decide who provides the delivery evidence, how disputes or returns are handled, when the payment becomes legally final, and what happens if the ledger releases value while the CBS update fails. If a card authorization and existing dispute process already provide equal or better protection, tokenization adds little.

The retail table therefore identifies candidates for investigation, not a presumption that each candidate should be built. The strongest fit is a process with an objective condition and costly multi-party reconciliation. The weakest fit is a familiar one-bank instruction that can be implemented safely with an ordinary standing order or account API.

## 3. Wholesale and corporate use cases

Wholesale users can operate richer mandates and technical integrations, but they also bring larger values, intraday liquidity, concentration, and legal-finality requirements. The business case often depends less on faster payment and more on eliminating coordination across treasury, asset, FX, and compliance processes.

| Use case | Problem | Tokenized-deposit role | Dependencies and constraints | Measure of value | Do not pursue when |
|---|---|---|---|---|---|
| Corporate treasury sweep | Balances across entities and banks are reconciled manually or late | Shared rules trigger transfers or reservations | Entity mandates, intraday liquidity, interbank reach | Lower idle liquidity; faster concentration | One-bank API can provide the same service |
| Securities delivery-versus-payment | Asset and cash legs settle on different infrastructures | Token deposit provides programmable cash leg | Venue/FMI analysis, asset-leg finality, participant rules | Reduced principal risk; shorter settlement | Cash leg is not legally final or token cannot be used on the venue |
| Trade and supply-chain payment | Documents, approvals, and payment are disconnected | Conditional payment against verified milestones | Reliable data source, document standards, dispute allocation | Lower processing time and exceptions | Inputs remain manual and untrusted |
| Multi-bank corporate payment | Corporate must coordinate accounts and limits across banks | Common instruction and synchronized bank-liability transfer | Issuer model, SIC settlement, network rulebook | Higher straight-through rate; lower reconciliation | Participants cannot agree on legal effect of shared state |
| Cross-border treasury and FX | Correspondent chain creates funding and timing risk | Path discovery, amount agreement, locking, and PvP workflow | Multiple currencies, reserve settlement, FX providers, AML | Reduced failed payments and settlement exposure | No credible liquidity provider or legal-finality model |
| Regulated digital-asset cash leg | Clients fund tokenized securities or other regulated digital assets through separate cash processes or non-bank instruments | Own-bank deposit supplies the approved cash leg or on/off-ramp | Venue connectivity, asset eligibility, custody, AML, settlement and FMI analysis | Faster funding; lower reconciliation; retained banking relationship | Venue cannot establish the legal effect or finality of the cash and asset legs |

The 2025 SBA deposit-token proof of concept is relevant Swiss industry evidence for tokenized bank money and multi-bank workflows, but its results do not constitute regulatory approval ([SBA report](https://www.swissbanking.ch/_Resources/Persistent/7/9/e/a/79ea024daa9834c99fc299db5d5f69c4317525a2/20250916_Ergebnisbericht%20PoC%20Deposit%20Token_EN_FINAL.pdf)).

### Worked wholesale journey: corporate conditional payment

A corporate treasury team at Bank A approves a CHF 5 million payment through its normal mandate and four-eyes process. The bank reserves the amount and exposes a verified readiness state to an approved workflow. Release occurs only when a specified asset, document, or counterparty condition is satisfied. The corporate receives one audit timeline linking its approval, the reservation, the condition, the token event, and the accounting result.

At wholesale values, speed is not the only objective. A shorter workflow can still be unattractive if it locks liquidity for longer, creates a concentration on one operator, or makes exception repair more expensive. The business case should therefore measure operational steps, funding effects, failed or delayed transactions, and the time required to establish a legally usable evidence trail.

The wholesale table is most persuasive where several independent parties currently maintain separate records and cannot safely coordinate the cash and non-cash legs. It is less persuasive where one bank controls the full workflow and can provide the same conditionality through an internal ledger and API.

### Benefits that need evidence

- **Liquidity:** shorter settlement may reduce exposure, but pre-funding or continuous availability can increase liquidity needs.
- **Operations:** shared state may reduce manual matching, but exception repair across several ledgers may be more complex.
- **Risk:** locking and PvP can reduce principal risk, but software, oracle, key, and operator risks remain.
- **Revenue:** a programmable deposit may support new services, but customers may not pay for functionality an account API already provides.
- **Reach:** interoperability can widen distribution, but each new participant and jurisdiction expands governance and compliance scope.

## 4. Bank value levers and economic constraints

Customer value and bank value are related but not identical. A product can improve a client workflow while failing to cover the bank's liquidity, support, compliance, and infrastructure costs. The business case should identify which mechanism produces the value rather than count every possible use case as revenue.

- **Revenue and franchise:** the bank may offer premium treasury, conditional-payment, escrow, DvP, FX, or settlement-evidence services. It may also retain commercial deposits by providing a regulated bank-money cash leg inside tokenized ecosystems. These benefits depend on client demand and credible pricing.
- **Operating efficiency:** shared status, one correlation identifier, pre-validation, deterministic expiry, and automated evidence can reduce bilateral enquiries and manual reconciliation. Savings should be measured after including node, key, monitoring, exception, and participant-governance costs.
- **Risk reduction:** locking, DvP, and PvP can shorten the interval in which one party has delivered while awaiting the counter-leg. They do not remove software, oracle, liquidity, replacement-cost, participant-default, or legal risk.
- **Balance-sheet and liquidity management:** granular available, reserved, pending, and frozen positions can improve visibility and limit enforcement. Tokenization does not itself create funding, HQLA, central-bank reserves, or more favorable LCR/NSFR treatment; faster mobility can instead increase stress outflow and intraday funding needs.

The bank should attribute every claimed benefit to a baseline, owner, measurement method, and time horizon. Benefits that depend on broad network adoption should be separated from those the first bank can realize in a closed pilot.

## 5. Retail and wholesale comparison

Retail and wholesale products can share contracts, reconciliation, and policy components, but they cannot share an undifferentiated control model. Retail design emphasizes comprehension and accessible recovery. Wholesale design emphasizes formal authority, liquidity, exposure, and rulebook-driven repair.

| Design question | Retail emphasis | Wholesale emphasis |
|---|---|---|
| Identity | Natural person, device, delegates, vulnerable customers | Legal entity, signatories, roles, four-eyes approval |
| Limits | Simple customer and fraud limits | Credit, liquidity, counterparty, corridor, and concentration limits |
| Recovery | Immediate support and wallet re-binding | Controlled operator recovery with segregation of duties |
| Privacy | Minimize exposure of personal and behavioral data | Protect positions, counterparties, prices, and business relationships |
| Exceptions | Refund, chargeback-like process, complaint handling | Rulebook-driven repair, liquidity release, claims, and dispute forum |
| Availability | Consumer service expectations and accessible fallback | Cut-off times, market windows, intraday liquidity, systemic dependencies |

Wholesale participants may be able to understand a technically complex workflow, but that does not make its failures less consequential. Conversely, retail values may be small while the number of customers, support cases, and privacy exposures is large. Pilot limits and operating procedures should reflect these different concentrations of risk.

## 6. Fit and anti-fit matrix

The matrix is a screening tool. A strong result in one row does not compensate for an undefined legal claim, settlement point, or recovery model. A single-bank use case can still be worthwhile, but it should not be forced onto shared infrastructure merely to demonstrate DLT.

| Signal | Strong fit | Weak fit |
|---|---|---|
| Parties | Several independent regulated parties need the same workflow state | One bank controls every relevant system |
| Conditions | Objective conditions can be represented and verified | Outcome depends on subjective or slow dispute resolution |
| Settlement | Cash and asset/FX legs can be coordinated | Settlement remains entirely manual or legally undefined |
| Reconciliation | Existing copies frequently diverge | A single database already provides authoritative state |
| Availability | Participants can operate and recover the shared infrastructure | Critical dependencies cannot meet required service levels |
| Economics | Measurable reduction in funding, delay, risk, or operations | Benefit is primarily marketing or technical experimentation |

The most reliable early candidates combine objective conditions, known participants, bounded value, and measurable reconciliation costs. Use cases dependent on subjective disputes, anonymous circulation, or unsettled cross-border legal questions should remain research items rather than first pilots.

## 7. Recommended pilot shortlist

### Retail pilot: controlled conditional merchant payment

This pilot tests whether programmable reservation improves a real customer and merchant process while preserving the recovery and support characteristics of a bank account. It does not attempt to prove public-wallet interoperability, anonymous use, or interbank settlement.

- Existing verified bank customers and selected merchants.
- Low CHF limits and no anonymous or uncontrolled secondary transfer.
- Bank-managed, recoverable wallets.
- One objective release condition and one expiry/refund path.
- Success measures:
  - authorization-to-settlement time;
  - comparison with a card authorization, ordinary escrow, and SIC/API baseline;
  - exception and refund rate;
  - reconciliation breaks;
  - customer comprehension and support contacts;
  - fraud and false-positive rate.

### Wholesale pilot: same-bank corporate conditional payment

This pilot isolates corporate authority, conditional execution, accounting, and audit replay before introducing another bank or settlement system. Its value is the ability to prove the shared control foundation with fewer external dependencies.

- Two or more corporate customers of the issuing bank.
- CBS-authoritative reservations and token movements.
- Role-based corporate approval and programmable release.
- No interbank settlement in the first technical stage.
- Success measures:
  - manual steps removed;
  - measurable improvement over an ordinary CBS/API conditional-payment workflow;
  - end-to-end processing time;
  - liquidity reserved and released correctly;
  - audit replay completeness;
  - recovery from each injected failure.

### Later extension: controlled interbank CHF payment

The interbank stage should proceed only when the same-bank lifecycle is deterministic. It tests a new question: how one bank's customer claim is replaced, coordinated, or allowed to continue when the recipient uses another bank.

- Add a second bank only after same-bank controls are proven.
- Use an explicit SIC settlement model and participant rulebook.
- Test all three interbank liability models before selecting one.

## What this means for the bank

The retail and wholesale pilots should prove different customer needs while sharing the same core controls and ledger invariants. Their business cases should be rejected if existing account and payment APIs deliver the same outcome with less legal and operational complexity.

Next: [03 - Swiss laws and FINMA rules for tokenized deposits](03-swiss-laws-and-finma-rules-for-tokenized-deposits.md).
