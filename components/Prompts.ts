
// --- SYSTEM INSTRUCTION (THE BRAIN) ---
export const MINUS_RULEBOOK = `
SYSTEM NOTE:
You are powered by Google Gemini, but all decisions, logic, and outputs must strictly follow the MINUS Rulebook.
If any default behavior conflicts with the Rulebook, the Rulebook overrides everything.

Think of it like this:
Rulebook = Constitution
Gemini = Calculator
You are just informing the calculator which machine it’s running on. Nothing else changes.

🔐 SYSTEM PROMPT — MINUS RULEBOOK v2.0
You are MINUS AI, a conservative financial optimization assistant for Indian households.

STRICT RULES (DO NOT VIOLATE):
- Do NOT recommend stocks, mutual funds, crypto, trading, or investments.
- Do NOT suggest taking new loans or refinancing.
- Do NOT increase risk in any form.
- Do NOT promise profits or guaranteed returns.
- Do NOT use complex financial jargon.

CORE OBJECTIVE:
Your only goal is to reduce debt duration and interest using existing user money by optimizing timing, cashflow, and behavior.

ALLOWED TOOLS:
- Salary cashflow optimization
- Fixed Deposit principal and interest usage
- Early loan principal payments
- EMI restructuring (timing-based, not amount-based)
- Credit card discipline
- Behavioral rules and spending control

LOGIC RULES:
- Loan interest is calculated daily; early principal payments reduce future interest.
- Prioritize compulsory outflows first.
- Prefer earlier principal reduction over long-term savings during loan period.
- Maintain lifestyle stability; avoid stress-inducing changes.
- Always preserve emergency liquidity.

12. REFERENCE PRECEDENTS (CASE LAW - STRICT ADHERENCE)
You are provided with a "Case Ledger" of successful optimizations. 
CRITICAL INSTRUCTION: You MUST compare the user's data against these specific patterns. If the user's situation approximates a Case File, you MUST adopt that Case's strategy as the foundation of your plan. 
Do not invent a new strategy if a reference case applies.

CASE #001: The Education Loan Arbitrage
- Pattern: User has Education Loan (10%+) AND Low-Yield Fixed Deposit (FD).
- Strategy: Use FD Interest to pay Loan Principal monthly. Keep FD Principal intact (or use partial) to stop interest leakage. 
- Key Action: "Yield Rotation".

CASE #002: The Negative Spread (Credit Cards)
- Pattern: User has Credit Card Debt (30%+) AND Fixed Deposit/Savings.
- Strategy: Immediate liquidation of Asset to clear Liability. Holding 6% Asset while paying 36% Debt is mathematically illegal in Minus.
- Key Action: "Negative Spread Destruction".

CASE #003: The "Real India" (No Assets)
- Pattern: Salary Income, No Savings, Personal/Bike Loan.
- Strategy: Identify small monthly surplus (even ₹2000) and pay to Principal on the 28th of the month.
- Key Action: "The 28th Rule" (Timing Strike).

CASE #004: The Emotional Spender
- Pattern: High Credit Card Utilization, Recurring Debt, "Impulsive".
- Strategy: 90-Day Freeze Protocol. Physical lock of cards.
- Key Action: "Minus Shield" (Liquidity Check before swipe).

CASE #005: Survival Mode
- Pattern: Medical/Emergency Expense, No Buffer.
- Strategy: Pause all debt optimization. Compress budget to bare essentials. Redirect all flow to survival.
- Key Action: "Stability First".

OUTPUT FORMAT (MANDATORY):
Respond ONLY in the following sections, in simple English. Use Markdown formatting (bolding, lists) to make it readable.

# 1. Headline Summary
(A clear, encouraging title for the plan)

# 2. Big Outcome Snapshot
(Provide a comparison in a list or small table: Current Duration vs Optimized Duration, Time Saved, Interest Saved. Mark this as "Approximate".)

# 3. What Changed
(Explain in simple bullet points what structural changes were made. End with "No lifestyle sacrifice was required." if true.)

# 4. Monthly Action Plan
(A checklist of actions the user must take every month. Use checkboxes or bullets.)

# 5. Money Flow
(Describe how money moves now. e.g. Salary -> EMI. Keep it simple.)

# 6. MINUS Guard™ Rules
(Behavioral rules to follow, e.g. credit card usage limits.)

# 7. Why This Works
(Brief explanation of the math/logic, e.g. daily interest calculation.)

# 8. Final Note
(A closing reassurance that this is about freedom, not getting rich.)

TONE:
- Calm
- Conservative
- Supportive
- Clear
- Non-judgmental

Remember:
MINUS gives clarity, not profit.
MINUS removes debt, not lifestyle.
MINUS reorganizes money, not risk.
`;

// --- USER PROMPT TEMPLATE ---
export const GENERATE_USER_PROMPT = (userDataJSON: string) => `
Below is the financial data submitted by the user.
Analyze this data strictly according to the MINUS RULEBOOK v2.0.
CHECK THE REFERENCE PRECEDENTS (CASE LAW) FIRST. If the user fits a case pattern, apply that specific logic.

User Data:
${userDataJSON}
`;

export const PUBLIC_PRINCIPLES = `
# THE PRINCIPLES OF MINUS
**Version 1.0 | A Framework for Financial Resilience**

Minus is governed by a strict set of ethical and mathematical principles. These guidelines ensure that every optimization plan is safe, risk-free, and focused entirely on the well-being of the Indian household.

### 1. THE STABILITY-FIRST DOCTRINE
The primary goal of Minus is to reduce debt without compromising the household’s immediate survival. We believe that a plan that causes lifestyle suffering is a plan destined to fail.
- **Emergency Buffers:** We never suggest using 100% of your liquidity. A core safety net must always remain untouched.
- **Pause Clause:** If a household’s income is interrupted, the optimization plan is designed to be paused immediately to preserve cash for essentials.

### 2. THE ZERO-RISK MANDATE
Minus operates in a "risk-free" zone. We do not look for external growth; we look for internal efficiency.
- **No Investments:** We never recommend stocks, mutual funds, or any market-linked products.
- **No New Debt:** We never suggest taking a new loan to pay off an old one. We only reorganize the money you already have.

### 3. THE "INFLOW" REQUIREMENT
Minus is a Money-Rotation Engine, not a Money-Creation Engine.
- Optimization is mathematically only safe when there is a stable monthly inflow (Salary, Business Income, or Asset Yield).
- For those without current income, our principle is to prioritize income generation over debt restructuring to prevent further financial fragility.

### 4. THE POWER OF TIMING (THE 28TH RULE)
Banking interest in India is typically calculated on a daily reducing balance. Minus focuses on the "Millimeter Windows" of the banking cycle.
- By timing principal payments just before the bank's interest-posting date, we minimize the amount on which interest is charged for the next cycle.
- We optimize Strategy, not just Amount.

### 5. THE NEGATIVE SPREAD ELIMINATION
It is a core principle of Minus that holding low-yield assets (earning 3–6%) while paying high-interest debt (costing 12–42%) is a form of "Wealth Leakage." We identify these spreads and suggest rebalancing them to stop the leak.

### 6. MINUS SHIELD™ (BEHAVIORAL DISCIPLINE)
Financial freedom is a behavioral challenge, not just a mathematical one.
- We promote the "Bank-First" spending rule: A credit instrument should only be used if the equivalent cash is already available in the bank.
- We advocate for credit as a transaction tool, never as a source of long-term funding.

### 7. RESPONSIBLE AI & PRIVACY
Minus is built on the principles of Stateless AI and Privacy-by-Design.
- **No Memory:** The AI does not "learn" from your personal data or store it across sessions.
- **Rule-Based:** Every output is generated by a fixed, prompt-driven system that applies these predefined principles.
- **Transparency:** We provide clarity and mapping. All final financial decisions remain with the human in control.

---
**FOUNDER’S PROMISE**
"Minus was born from a family victory. We don't make you rich; we make you stable. We don't predict the future; we optimize your present. Subtract Debt. Add Life."
— *Saketh Nemalikonda, Founder & CEO*
`;

export const LEDGER_CASES = [
  {
    id: "#001",
    title: "The Education Loan Arbitrage",
    desc: "Optimizing a 15-year education loan using existing FD yields.",
    content: `
# Case File #001: The Education Loan Arbitrage

### 1. The Diagnosis (Before Minus)
**Status:** Financially disciplined but structurally inefficient.

| Component | Status | Details |
| :--- | :--- | :--- |
| **Liability** | Education Loan | ₹2,99,724 @ **10.15%** |
| **Tenure** | ~15 Years | 179 Months remaining |
| **Monthly Outflow** | ₹4,722 (EMI) | Paid from Salary |
| **Asset** | Fixed Deposit | ₹25 Lakhs @ ~6% |
| **Asset Usage** | Consumption | Interest used for Hostel Fees |

**The Friction:**
A low-yield asset (FD) was running parallel to a high-cost liability. The family was paying interest daily for 15 years while holding the capital to stop it.

---

### 2. The Minus Optimization
**Strategy:** Yield Rotation & Timing Strikes.

**Step 1: Liquidity Structuring**
Withdrew ₹2 Lakhs from the main FD into a "Liquid Lock-free FD" to automate hostel fee payments without stress.

**Step 2: Yield Redirection**
The interest from the remaining ₹23 Lakhs (~₹10,000/month) was **redirected strictly to the Loan Principal**.

**Step 3: The 28th Rule**
Principal payments were timed **2-3 days before the interest posting date**, killing interest accrual before it could compound.

**Step 4: Salary Preservation**
The original salary EMI (₹4,722) continued. This acted as a "velocity booster."

---

### 3. The Result (After Minus)

| Metric | Before | After |
| :--- | :--- | :--- |
| **Tenure** | 15 Years | **~2.5 Years** |
| **Total Paid** | ~₹8 Lakhs | **~₹3.3 Lakhs** |
| **Interest Wasted** | ~₹5 Lakhs | **~₹30k Only** |
| **Lifestyle Change** | None | **None** |
| **Risk Taken** | None | **None** |

> **Conclusion:**
> Minus didn didn’t add a single rupee to the income. It simply moved the money correctly. The loan died in 30 months instead of 180.
`
  },
  {
    id: "#002",
    title: 'The Credit Card "Negative Spread" Audit',
    desc: 'Asset-holding but leaking wealth to high-interest debt.',
    content: `
# Case File #002: The Credit Card "Negative Spread" Audit

### 1. The Diagnosis (Before Minus)
**Status:** Asset-holding but leaking wealth to high-interest debt.

| Component | Status | Details |
| :--- | :--- | :--- |
| **Liability** | Credit Card | ₹1,35,000 @ **39% APR** |
| **Outflow** | Minimum Due | ~₹6,750 (Mostly Interest) |
| **Asset** | Fixed Deposit | ₹2,20,000 @ **6.7%** |

**The Friction:**
The user was losing 32.3% annually (39% cost - 6.7% gain) on every rupee. The FD was effectively being "eaten" by the credit card.

---

### 2. The Minus Optimization
**Strategy:** Liquidity Rotation.

**Step 1: Immediate Destruction**
Deployed ₹1,35,000 from FD to instantly zero out the Credit Card.

**Step 2: Safety Net Preservation**
Retained ₹1,20,000 (FD + Cash) as an untouchable medical/emergency buffer.

**Step 3: Behavioral Lock**
Activated **Minus Shield™**: Swipe only if Bank Balance ≥ Purchase Amount.

---

### 3. The Result (After Minus)

| Metric | Before | After |
| :--- | :--- | :--- |
| **CC Interest Leak** | ₹4,400/mo | **₹0** |
| **Annual Saving** | -- | **₹52,800** |
| **CIBIL Status** | Stagnant/Risky | **Rising (750+)** |
    `
  },
  {
    id: "#003",
    title: 'The "Real India" (No-Asset) Optimization',
    desc: 'Middle-class living salary-to-salary with no savings.',
    content: `
# Case File #003: The "Real India" (No-Asset) Optimization

### 1. The Diagnosis (Before Minus)
**Status:** Middle-class living salary-to-salary with no savings.

| Component | Status | Details |
| :--- | :--- | :--- |
| **Monthly Inflow** | Salary | ₹32,000 |
| **Liability** | Bike Loan | ₹5,200 (EMI) |
| **Inefficiency** | RD | ₹2,000 (Yield < Loan Interest) |

**The Friction:**
The family was building an RD at 6% while paying ~14% on a bike loan. The "Lazy Plan" allowed interest to compound over 5 years.

---

### 2. The Minus Optimization
**Strategy:** Time & Discipline Optimization.

**Step 1: Capital Reallocation**
Stopped the ₹2,000 RD.

**Step 2: Surplus Identification**
Identified ₹3,800 unassigned salary surplus.

**Step 3: The 28th Rule Strike**
Created a monthly ₹5,800 "Principal Strike" timed for the **28th of every month**.

---

### 3. The Result (After Minus)

| Metric | Before | After |
| :--- | :--- | :--- |
| **Tenure** | 5 Years | **~2.5 Years** |
| **Interest Cost** | ₹18,000 | **₹7,000** |
| **Life Gained** | -- | **30 Months EMI-Free** |
    `
  },
  {
    id: "#004",
    title: 'The Emotional Spender Protocol',
    desc: 'High-utilization user trapped in emotional spending cycles.',
    content: `
# Case File #004: The Emotional Spender Protocol

### 1. The Diagnosis (Before Minus)
**Status:** High-utilization user trapped in emotional spending cycles.

| Component | Status | Details |
| :--- | :--- | :--- |
| **Liability** | Credit Card | ₹38,000 (Maxed out) |
| **Behavior** | Relapse | Clears debt, then maxes out again |
| **APR** | 42% | Severe interest leakage |

**The Friction:**
Mathematical solutions were failing because of behavioral triggers. The user treated the credit limit as "extra income."

---

### 2. The Minus Optimization
**Strategy:** Behavioral Lock & The "Freeze" Protocol.

**Step 1: The Freeze**
Physical/Digital freeze of the card for 90 days.

**Step 2: Aggressive Allocation**
Allocated ₹15,000/mo from salary + FD interest.

**Step 3: Minus Guard™**
Implemented the Minus Guard™ (Only swipe if Bank Balance ≥ Purchase).

---

### 3. The Result (After Minus)

| Metric | Before | After |
| :--- | :--- | :--- |
| **Debt Status** | Permanent/Rolling | **Cleared in 60 Days** |
| **Behavior** | Impulsive | **Disciplined (Score-Focused)** |
| **Peace of Mind** | Low | **High (Structure Installed)** |
    `
  },
  {
    id: "#005",
    title: 'The Medical Crisis (Survival Mode)',
    desc: 'Zero-savings household hit by an emergency.',
    content: `
# Case File #005: The Medical Crisis (Survival Mode)

### 1. The Diagnosis (Before Minus)
**Status:** Zero-savings household hit by an emergency.

| Component | Status | Details |
| :--- | :--- | :--- |
| **Emergency** | Medical Bill | ₹20,000 (No Insurance) |
| **Monthly Surplus** | ₹12,200 | Post-EMI/Rent |
| **Threat** | Instant Loan | Avoiding 24-36% predatory credit apps |

**The Friction:**
The household was 48 hours away from a high-interest debt trap due to a lack of an emergency buffer.

---

### 2. The Minus Optimization
**Strategy:** Budget Compression (Survival Mode).

**Step 1: Surplus Redirection**
Redirected 100% of the ₹12,200 surplus to the bill.

**Step 2: Radical Compression**
Compressed "Food + Travel" budget from ₹14k to ₹7k for **one month**.

**Step 3: Liquidity Event**
Total liquidity gathered in 35 days: ₹19,200.

---

### 3. The Result (After Minus)

| Metric | Before | After |
| :--- | :--- | :--- |
| **New Debt** | ₹20,000 @ 24% | **₹0 (Self-Funded)** |
| **Time to Resolve** | 12-24 Months | **35 Days** |
| **Economic Gain** | Debt Trap | **Resilience Built** |
    `
  },
  {
    id: "#006",
    title: 'The Student CIBIL Foundation',
    desc: 'Entry-level spender with no credit history.',
    content: `
# Case File #006: The Student CIBIL Foundation

### 1. The Diagnosis (Before Minus)
**Status:** Entry-level spender with no credit history.

| Component | Status | Details |
| :--- | :--- | :--- |
| **Inflow** | Pocket Money | ₹6,000 |
| **Target** | Credit Score | 750+ (For future eligibility) |
| **Risk** | Low Inflow | High risk of overspending ₹100-200 |

---

### 2. The Minus Optimization
**Strategy:** Minus Shield™ Activation.

**Rule: Minus Shield™**
Every transaction (e.g., ₹100 Biryani) is only allowed if **Bank Balance ≥ ₹100**.

**Action: History Building**
Card used strictly for utility payments to build 24-month history.

---

### 3. The Result (After Minus)

| Metric | Before | After |
| :--- | :--- | :--- |
| **CIBIL Score** | 0 / No History | **750+ (Prime Category)** |
| **Interest Paid** | High Risk | **₹0 (Full Repayment)** |
    `
  }
];

export const MINUS_TERMS = `
# MINUS — TERMS AND CONDITIONS
**Version 1.0 | Effective Date: December 28, 2025**

These Terms and Conditions (T&C) are drafted as a professional legal-safety framework for Minus. They are designed to protect the company, the founder, and the AI system from liability while establishing a clear "Guidance-Only" relationship with the user.

### 1. NATURE OF SERVICE
Minus (the "Platform") is a prompt-driven financial clarity and debt-optimization engine.
**Guidance, Not Advice:** Minus provides mathematical mapping and structural reorganizations of existing cashflows. It does not provide regulated financial, investment, tax, or legal advice.
**No Professional Relationship:** Use of the platform does not create a fiduciary or advisor-client relationship. Minus is not a SEBI-registered Investment Advisor (RIA) or a Chartered Accountant.

### 2. FINANCIAL PRODUCT DISCLAIMER
**No Lending:** Minus is not a lender, a bank, or a Non-Banking Financial Company (NBFC). We do not issue loans, credit cards, or any credit products.
**No Investments:** Minus explicitly forbids the recommendation of market-linked investments (stocks, mutual funds, crypto, etc.). Any decision to invest remains outside the scope of Minus.
**Third-Party Products:** Any credit card or loan mentioned (e.g., FD-backed cards) is a third-party product issued solely by a regulated bank. Decisions regarding these products are between the user and the bank.

### 3. USER RESPONSIBILITY & EXECUTION
**Final Decision:** All financial actions—including principal prepayments, stopping RDs, or clearing card balances—are taken at the sole discretion and risk of the user.
**No Automated Execution:** Minus does not have access to user bank accounts and cannot execute transactions. The user is responsible for manual execution of the optimized plan.
**Accuracy of Data:** The precision of a "Minus Map" depends entirely on the accuracy of the data provided by the user. Minus is not responsible for errors resulting from incorrect user input.

### 4. MINUS SHIELD™ & BEHAVIORAL TOOLS
**Discipline Helper:** The Minus Shield™ and other behavioral protocols are discipline-building frameworks. They do not guarantee a specific credit score outcome, loan approval, or future financial behavior.
**Credit Scores:** Credit score (CIBIL) improvements are governed by external bureaus based on the user's actual repayment history. Minus provides the strategy, but the outcome depends on the user’s consistency.

### 5. LIMITATION OF LIABILITY
To the maximum extent permitted by law, Minus, its founders, and its affiliates shall not be liable for:
- Financial Losses: Any loss arising from the user's financial decisions or the failure to follow the plan.
- Banking Consequences: Late fees, penalties, interest rate hikes, or account closures initiated by the user's bank.
- Systemic Risks: Changes in RBI regulations, bank policies, or national economic shifts that render a strategy less effective.
- NPA/Default: Minus is not responsible for any future loan default or damage caused by the user’s personal financial behavior.

### 6. DATA PRIVACY & AI PROTOCOL
**Stateless Processing:** Minus uses a prompt-driven AI system that operates on a session-only basis.
**No Storage:** User-provided data (Income, Debt, Expenses) is not stored, not sold, and not used to train AI models.
**Anonymity:** Users are encouraged not to share sensitive Personal Identifiable Information (PII) such as bank account numbers or passwords.

### 7. STABILITY & PAUSE CLAUSE
**Survival Priority:** The user acknowledges that Minus optimizes for debt-reduction but prioritizes household stability. If a user’s income is interrupted or an emergency occurs, the user must pause the optimization plan immediately to preserve cash for essentials.

### 8. GOVERNING LAW
These terms are governed by the laws of India. Any disputes arising from the use of Minus shall be subject to the exclusive jurisdiction of the courts in [Your City/Hyderabad].

---

### THE "ARMOR" SUMMARY (For User Confirmation)
- Minus provides Clarity, not cash.
- The Math is ours; the Decision is yours.
- We Subtract debt; we do not Add risk.
- You remain 100% Responsible for your borrowings and repayments.

**"By clicking 'Analyze' or using the Minus Engine, you agree to these Terms and Conditions."**
`;
