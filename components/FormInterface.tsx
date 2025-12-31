import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Check, Triangle, Sparkles } from 'lucide-react';

interface FormInterfaceProps {
  onSubmit: (data: any) => void;
}

const FormInterface = ({ onSubmit }: FormInterfaceProps) => {
  const [step, setStep] = useState(0);
  // Using Record<string, string> to allow dynamic keys for loans, credit cards, and BNPL
  const [formData, setFormData] = useState<Record<string, string>>({
    name: '',
    phone: '',
    email: '',
    occupation: '',
    income: '',
    hasMonthlyNeeds: '',
    monthlyNeedsCount: '',
    cibilScore: '',
    hasFD: '',
    fdBank: '',
    fdAmount: '',
    fdInterest: '',
    fdTenure: '',
    hasRD: '',
    rdBank: '',
    rdAmount: '',
    rdTenure: '',
    hasSavings: '',
    savingsAmount: '',
    physicalAssets: '',
    hasLoans: '',
    activeLoansCount: '',
    hasCreditCards: '',
    activeCreditCardsCount: '',
    hasBNPL: '',
    activeBNPLCount: ''
  });
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const savingsInputRef = useRef<HTMLInputElement>(null);
  const partialPaymentRef = useRef<HTMLInputElement>(null);

  // Focus input automatically when moving to a new input step
  useEffect(() => {
    if (step > 0 && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    setError('');
  }, [step]);

  // Focus savings amount input when it appears
  useEffect(() => {
    if (formData.hasSavings === 'Yes' && savingsInputRef.current) {
        savingsInputRef.current.focus();
    }
  }, [formData.hasSavings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (val.length <= 10) {
        setFormData({ ...formData, phone: val });
        setError('');
    }
  };

  // Generic handler for fields needing Indian currency formatting
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/,/g, '').replace(/\D/g, '');
    const fieldName = e.target.name;
    
    if (!raw) {
        setFormData(prev => ({ ...prev, [fieldName]: '' }));
        setError('');
        return;
    }
    const formatted = new Intl.NumberFormat('en-IN').format(parseInt(raw));
    setFormData(prev => ({ ...prev, [fieldName]: formatted }));
    setError('');
  };

  const handleSelection = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  // Helper to determine CIBIL status for the visualizer
  const getCibilStatus = (val: string) => {
    const score = parseInt(val.replace(/\D/g, ''));
    if (isNaN(score)) return { label: 'Enter Score', color: 'bg-slate-200', text: 'text-slate-400', width: '0%' };
    
    // Calculate relative percentage for the pointer (300 to 900 range)
    // 300 is 0%, 900 is 100%. Total range = 600.
    let percentage = Math.max(0, Math.min(100, ((score - 300) / 600) * 100));

    if (score < 300) return { label: 'Invalid', color: 'bg-slate-200', text: 'text-slate-400', width: '0%' };
    if (score <= 580) return { label: 'Very Poor', color: 'bg-neo-red', text: 'text-neo-red', width: `${percentage}%` };
    if (score <= 640) return { label: 'Poor', color: 'bg-neo-orange', text: 'text-neo-orange', width: `${percentage}%` };
    if (score <= 720) return { label: 'Fair', color: 'bg-neo-yellow', text: 'text-yellow-600', width: `${percentage}%` };
    if (score <= 780) return { label: 'Good', color: 'bg-[#88D66C]', text: 'text-[#88D66C]', width: `${percentage}%` }; // Light Green
    if (score <= 900) return { label: 'Excellent', color: 'bg-neo-mint', text: 'text-neo-mint', width: `${percentage}%` };
    
    return { label: 'Invalid', color: 'bg-slate-200', text: 'text-slate-400', width: '100%' };
  };

  // Dynamic Question List construction
  const getQuestions = () => {
    const baseQuestions = [
        {
          id: 'name',
          label: 'Identity',
          question: 'What should we call you?',
          subtext: 'Your first name is enough.',
          inputName: 'name',
          type: 'text',
          placeholder: 'Type here...'
        },
        {
          id: 'phone',
          label: 'Contact',
          question: 'Your phone number',
          subtext: 'For your Minus plan delivery only.',
          inputName: 'phone',
          type: 'tel',
          placeholder: '98765 43210' 
        },
        {
          id: 'email',
          label: 'Digital',
          question: 'Your email address',
          subtext: 'Supports Gmail, Yahoo, Outlook, etc.',
          inputName: 'email',
          type: 'email',
          placeholder: 'name@example.com'
        },
        {
          id: 'occupation',
          label: 'Profile',
          question: 'Which best describes you right now?',
          subtext: 'Please select your current work or life situation.',
          inputName: 'occupation',
          type: 'select',
          options: [
            "Salaried employee",
            "Student",
            "Freelancer / Consultant",
            "Business owner",
            "Homemaker",
            "Retired"
          ]
        },
        {
          id: 'income',
          label: 'Financials',
          question: 'What is your monthly income? (₹)',
          subtext: 'Type your answer here...',
          inputName: 'income',
          type: 'text',
          placeholder: 'e.g. 50,000'
        }
    ];

    // New Question: Monthly Needs / Obligations
    baseQuestions.push({
        id: 'needs_check',
        label: 'Obligations',
        question: 'Do you have any fixed monthly financial requirements?',
        subtext: 'These are mandatory expenses that must be paid on time. Minus will always protect these first. If an expense is optional, do not include it here.',
        inputName: 'hasMonthlyNeeds',
        type: 'select',
        options: ["Yes", "No"]
    });

    if (formData.hasMonthlyNeeds === 'Yes') {
        baseQuestions.push({
            id: 'needs_count',
            label: 'Obligation Count',
            question: 'How many separate monthly requirements do you have?',
            subtext: 'Enter the number of separate obligations.',
            inputName: 'monthlyNeedsCount',
            type: 'number',
            placeholder: 'e.g. 1'
        });

        const needsCount = parseInt(formData.monthlyNeedsCount || '0');
        if (needsCount > 0) {
            for (let i = 1; i <= needsCount; i++) {
                baseQuestions.push(
                    {
                        id: `need_${i}_amount`,
                        label: `Requirement ${i} Value`,
                        question: `How much amount do you need per month for Requirement ${i}? (₹)`,
                        subtext: 'The fixed monthly outflow.',
                        inputName: `need_${i}_amount`,
                        type: 'text',
                        placeholder: 'e.g. 5,000'
                    },
                    {
                        id: `need_${i}_tenure`,
                        label: `Requirement ${i} Duration`,
                        question: `For how long will Requirement ${i} continue? (Months)`,
                        subtext: 'Duration of this obligation.',
                        inputName: `need_${i}_tenure`,
                        type: 'number',
                        placeholder: 'e.g. 12'
                    }
                );
            }
        }
    }

    // Continue with existing flow
    baseQuestions.push({
        id: 'fd_check',
        label: 'Assets',
        question: 'Do you currently have a Fixed Deposit (FD)?',
        subtext: 'This helps us find hidden yield opportunities.',
        inputName: 'hasFD',
        type: 'select',
        options: ["Yes", "No"]
    });

    if (formData.hasFD === 'Yes') {
        baseQuestions.push(
            {
                id: 'fd_bank',
                label: 'Asset Details',
                question: 'Which institution holds your FD?',
                subtext: 'Name of the bank or platform.',
                inputName: 'fdBank',
                type: 'text',
                placeholder: 'e.g. HDFC, SBI, Groww'
            },
            {
                id: 'fd_amount',
                label: 'Asset Value',
                question: 'What is the total amount invested? (₹)',
                subtext: 'The principal amount currently locked.',
                inputName: 'fdAmount',
                type: 'text',
                placeholder: 'e.g. 1,00,000'
            },
            {
                id: 'fd_interest',
                label: 'Yield',
                question: 'How much monthly interest does it earn? (₹)',
                subtext: 'Estimate the monthly accumulation.',
                inputName: 'fdInterest',
                type: 'text',
                placeholder: 'e.g. 500'
            },
            {
                id: 'fd_tenure',
                label: 'Timeline',
                question: 'What is the remaining tenure until maturity? (Years)',
                subtext: 'Time left before the deposit unlocks.',
                inputName: 'fdTenure',
                type: 'number',
                placeholder: 'e.g. 1'
            }
        );
    }

    // Recurring Deposit Question
    baseQuestions.push({
        id: 'rd_check',
        label: 'Assets',
        question: 'Do you currently have a Recurring Deposit (RD)?',
        subtext: 'Regular savings that might be better utilized.',
        inputName: 'hasRD',
        type: 'select',
        options: ["Yes", "No"]
    });

    if (formData.hasRD === 'Yes') {
        baseQuestions.push(
            {
                id: 'rd_bank',
                label: 'Asset Details',
                question: 'Which institution holds your RD?',
                subtext: 'Name of the bank or platform.',
                inputName: 'rdBank',
                type: 'text',
                placeholder: 'e.g. ICICI, Post Office'
            },
            {
                id: 'rd_amount',
                label: 'Cashflow',
                question: 'What is your monthly installment amount? (₹)',
                subtext: 'The fixed amount deposited each month.',
                inputName: 'rdAmount',
                type: 'text',
                placeholder: 'e.g. 5,000'
            },
            {
                id: 'rd_tenure',
                label: 'Timeline',
                question: 'What is the remaining tenure until maturity? (Months)',
                subtext: 'Time left before the deposit unlocks.',
                inputName: 'rdTenure',
                type: 'number',
                placeholder: 'e.g. 12'
            }
        );
    }

    // Savings Question (Logic handled inline in render)
    baseQuestions.push({
        id: 'savings_check',
        label: 'Liquidity',
        question: 'Do you maintain an idle balance in a Savings Account?',
        subtext: 'Liquid funds typically earning 3-4% interest.',
        inputName: 'hasSavings',
        type: 'select',
        options: ["Yes", "No"]
    });

    // Physical Assets (New Question)
    baseQuestions.push({
        id: 'physical_assets',
        label: 'Solvency',
        question: 'Declare any Non-Liquid Assets.',
        subtext: 'e.g. Gold Bullion, Real Estate, Land. (Optional)',
        inputName: 'physicalAssets',
        type: 'textarea',
        placeholder: 'e.g. 200g Gold, Plot in City X...'
    });

    // Liabilities Question
    baseQuestions.push({
        id: 'loans_check',
        label: 'Liabilities',
        question: 'Do you currently have any active loans?',
        subtext: 'Personal Loans, Car Loans, or Mortgages (Exclude Credit Cards).',
        inputName: 'hasLoans',
        type: 'select',
        options: ["Yes", "No"]
    });

    if (formData.hasLoans === 'Yes') {
         baseQuestions.push({
            id: 'loans_count',
            label: 'Liability Details',
            question: 'How many active loans do you have?',
            subtext: 'Enter the total count (Exclude Credit Cards).',
            inputName: 'activeLoansCount',
            type: 'number',
            placeholder: 'e.g. 2'
        });

        const loanCount = parseInt(formData.activeLoansCount || '0');
        if (loanCount > 0) {
            for (let i = 1; i <= loanCount; i++) {
                baseQuestions.push(
                    {
                        id: `loan_${i}_type`,
                        label: `Loan ${i} Type`,
                        question: `What type of loan is Loan ${i}?`,
                        subtext: 'Select the category that fits best.',
                        inputName: `loan_${i}_type`,
                        type: 'select',
                        options: ["Personal Loan", "Education Loan", "Home Loan", "Vehicle Loan", "Gold Loan", "Business Loan"]
                    },
                    {
                        id: `loan_${i}_bank`,
                        label: `Loan ${i} Lender`,
                        question: `Who is your bank or lender for Loan ${i}?`,
                        subtext: 'e.g. HDFC, SBI, Bajaj Finserv',
                        inputName: `loan_${i}_bank`,
                        type: 'text',
                        placeholder: 'Bank/Lender Name'
                    },
                    {
                        id: `loan_${i}_amount`,
                        label: `Loan ${i} Balance`,
                        question: `What is the outstanding amount for Loan ${i}? (₹)`,
                        subtext: 'The principal amount left to pay.',
                        inputName: `loan_${i}_amount`,
                        type: 'text',
                        placeholder: 'e.g. 5,00,000'
                    },
                    {
                        id: `loan_${i}_rate`,
                        label: `Loan ${i} Cost`,
                        question: `What is the interest rate for Loan ${i}? (%)`,
                        subtext: 'Annual interest rate.',
                        inputName: `loan_${i}_rate`,
                        type: 'number',
                        placeholder: 'e.g. 12'
                    },
                    {
                        id: `loan_${i}_emi`,
                        label: `Loan ${i} Outflow`,
                        question: `What is the EMI amount for Loan ${i}? (₹)`,
                        subtext: 'Your monthly payment.',
                        inputName: `loan_${i}_emi`,
                        type: 'text',
                        placeholder: 'e.g. 15,000'
                    },
                    {
                        id: `loan_${i}_tenure`,
                        label: `Loan ${i} Timeline`,
                        question: `Remaining tenure for Loan ${i} (months)`,
                        subtext: 'Months left to be debt-free on this loan.',
                        inputName: `loan_${i}_tenure`,
                        type: 'number',
                        placeholder: 'e.g. 36'
                    }
                );
            }
        }
    }

    // Credit Cards Question
    baseQuestions.push({
        id: 'cc_check',
        label: 'Credit Facilities',
        question: 'Do you currently use any credit cards?',
        subtext: 'Select \'Yes\' even if you clear the bill monthly.',
        inputName: 'hasCreditCards',
        type: 'select',
        options: ["Yes", "No"]
    });

    if (formData.hasCreditCards === 'Yes') {
        baseQuestions.push({
            id: 'cc_count',
            label: 'Credit Details',
            question: 'How many credit cards do you use?',
            subtext: 'Enter the number of active cards.',
            inputName: 'activeCreditCardsCount',
            type: 'number',
            placeholder: 'e.g. 2'
        });

        const ccCount = parseInt(formData.activeCreditCardsCount || '0');
        if (ccCount > 0) {
            for (let i = 1; i <= ccCount; i++) {
                baseQuestions.push(
                    {
                        id: `cc_${i}_limit`,
                        label: `Card ${i} Limit`,
                        question: `What is the total limit on Card ${i}? (₹)`,
                        subtext: 'The maximum amount you can spend.',
                        inputName: `cc_${i}_limit`,
                        type: 'text',
                        placeholder: 'e.g. 1,00,000'
                    },
                    {
                        id: `cc_${i}_fee`,
                        label: `Card ${i} Cost`,
                        question: `What is the annual fee for Card ${i}? (₹)`,
                        subtext: 'Enter 0 if it is a lifetime free card.',
                        inputName: `cc_${i}_fee`,
                        type: 'text',
                        placeholder: 'e.g. 1,000'
                    },
                    {
                        id: `cc_${i}_outstanding`,
                        label: `Card ${i} Balance`,
                        question: `How much do you currently owe on Card ${i}? (₹)`,
                        subtext: 'The unbilled + billed amount used.',
                        inputName: `cc_${i}_outstanding`,
                        type: 'text',
                        placeholder: 'e.g. 15,000'
                    },
                    {
                        id: `cc_${i}_payment_type`,
                        label: `Card ${i} Behavior`,
                        question: `How do you usually pay the bill for Card ${i}?`,
                        subtext: 'Be honest. This helps us calculate risk.',
                        inputName: `cc_${i}_payment_type`,
                        type: 'select',
                        options: ["Full Amount", "Minimum Due", "Partial Amount"]
                    }
                );
                
                // Conditional: Ask for amount if 'Partial Amount' is selected
                if (formData[`cc_${i}_payment_type`] === "Partial Amount") {
                    baseQuestions.push({
                        id: `cc_${i}_payment_partial`,
                        label: `Card ${i} Payment`,
                        question: `How much do you typically pay for Card ${i}? (₹)`,
                        subtext: 'The average amount you pay monthly.',
                        inputName: `cc_${i}_payment_partial`,
                        type: 'text',
                        placeholder: 'e.g. 5,000'
                    });
                }

                baseQuestions.push(
                    {
                        id: `cc_${i}_bill_date`,
                        label: `Card ${i} Cycle`,
                        question: `On which day is the bill generated for Card ${i}?`,
                        subtext: 'Enter the day of the month (e.g., 15).',
                        inputName: `cc_${i}_bill_date`,
                        type: 'number',
                        placeholder: '1-31'
                    },
                    {
                        id: `cc_${i}_due_date`,
                        label: `Card ${i} Deadline`,
                        question: `On which day is the payment due for Card ${i}?`,
                        subtext: 'Enter the day of the month (e.g., 5).',
                        inputName: `cc_${i}_due_date`,
                        type: 'number',
                        placeholder: '1-31'
                    }
                );
            }
        }
    }

    // BNPL Question (New)
    baseQuestions.push({
        id: 'bnpl_check',
        label: 'Micro-Credit',
        question: 'Do you have any active Buy Now, Pay Later (BNPL) plans or ongoing EMIs?',
        subtext: 'e.g. Amazon Pay Later, Flipkart Pay Later, ZestMoney, etc.',
        inputName: 'hasBNPL',
        type: 'select',
        options: ["Yes", "No"]
    });

    if (formData.hasBNPL === 'Yes') {
        baseQuestions.push({
            id: 'bnpl_count',
            label: 'Micro-Credit Details',
            question: 'How many active BNPL/EMI plans do you have?',
            subtext: 'Enter the total number of active plans.',
            inputName: 'activeBNPLCount',
            type: 'number',
            placeholder: 'e.g. 2'
        });

        const bnplCount = parseInt(formData.activeBNPLCount || '0');
        if (bnplCount > 0) {
            for (let i = 1; i <= bnplCount; i++) {
                baseQuestions.push(
                    {
                        id: `bnpl_${i}_provider`,
                        label: `Plan ${i} Provider`,
                        question: `Who is the provider for Plan ${i}?`,
                        subtext: 'e.g. Amazon Pay Later, Flipkart, Zest, Bajaj Finserv, etc.',
                        inputName: `bnpl_${i}_provider`,
                        type: 'text',
                        placeholder: 'Provider Name'
                    },
                    {
                        id: `bnpl_${i}_amount`,
                        label: `Plan ${i} Balance`,
                        question: `What is the total outstanding amount for Plan ${i}? (₹)`,
                        subtext: 'The total amount left to be paid.',
                        inputName: `bnpl_${i}_amount`,
                        type: 'text',
                        placeholder: 'e.g. 15,000'
                    },
                    {
                        id: `bnpl_${i}_emi`,
                        label: `Plan ${i} Outflow`,
                        question: `What is the monthly EMI for Plan ${i}? (₹)`,
                        subtext: 'Amount deducted every month.',
                        inputName: `bnpl_${i}_emi`,
                        type: 'text',
                        placeholder: 'e.g. 2,500'
                    },
                    {
                        id: `bnpl_${i}_tenure`,
                        label: `Plan ${i} Timeline`,
                        question: `How many months are left for Plan ${i}?`,
                        subtext: 'Remaining tenure.',
                        inputName: `bnpl_${i}_tenure`,
                        type: 'number',
                        placeholder: 'e.g. 6'
                    }
                );
            }
        }
    }

    // CIBIL Score - Moved to End
    baseQuestions.push({
        id: 'cibil_score',
        label: 'Credit Health',
        question: 'What is your current CIBIL Score?',
        subtext: 'Range is usually 300 to 900. (Optional)',
        inputName: 'cibilScore',
        type: 'number',
        placeholder: 'e.g. 750'
    });

    return baseQuestions;
  };

  const inputQuestions = getQuestions();

  const handleSubmit = () => {
      // Build Monthly Obligations Array
      const monthlyRequirements = [];
      const needsCount = parseInt(formData.monthlyNeedsCount || '0');
      if (formData.hasMonthlyNeeds === 'Yes' && needsCount > 0) {
          for (let i = 1; i <= needsCount; i++) {
              monthlyRequirements.push({
                  amount: parseInt(formData[`need_${i}_amount`]?.replace(/,/g, '') || '0'),
                  tenure: parseInt(formData[`need_${i}_tenure`] || '0')
              });
          }
      }

      // Build Loans Array
      const loans = [];
      const loanCount = parseInt(formData.activeLoansCount || '0');
      if (formData.hasLoans === 'Yes' && loanCount > 0) {
          for (let i = 1; i <= loanCount; i++) {
              loans.push({
                  type: formData[`loan_${i}_type`],
                  bank: formData[`loan_${i}_bank`],
                  outstanding: parseInt(formData[`loan_${i}_amount`]?.replace(/,/g, '') || '0'),
                  rate: parseFloat(formData[`loan_${i}_rate`] || '0'),
                  emi: parseInt(formData[`loan_${i}_emi`]?.replace(/,/g, '') || '0'),
                  tenure: parseInt(formData[`loan_${i}_tenure`] || '0')
              });
          }
      }

      // Build Credit Cards Array
      const creditCards = [];
      const ccCount = parseInt(formData.activeCreditCardsCount || '0');
      if (formData.hasCreditCards === 'Yes' && ccCount > 0) {
          for (let i = 1; i <= ccCount; i++) {
              creditCards.push({
                  limit: parseInt(formData[`cc_${i}_limit`]?.replace(/,/g, '') || '0'),
                  fee: parseInt(formData[`cc_${i}_fee`]?.replace(/,/g, '') || '0'),
                  outstanding: parseInt(formData[`cc_${i}_outstanding`]?.replace(/,/g, '') || '0'),
                  paymentType: formData[`cc_${i}_payment_type`],
                  paymentPartial: parseInt(formData[`cc_${i}_payment_partial`]?.replace(/,/g, '') || '0'),
                  billDate: parseInt(formData[`cc_${i}_bill_date`] || '0'),
                  dueDate: parseInt(formData[`cc_${i}_due_date`] || '0')
              });
          }
      }

      // Build BNPL Array
      const bnplPlans = [];
      const bnplCount = parseInt(formData.activeBNPLCount || '0');
      if (formData.hasBNPL === 'Yes' && bnplCount > 0) {
          for (let i = 1; i <= bnplCount; i++) {
              bnplPlans.push({
                  provider: formData[`bnpl_${i}_provider`],
                  outstanding: parseInt(formData[`bnpl_${i}_amount`]?.replace(/,/g, '') || '0'),
                  emi: parseInt(formData[`bnpl_${i}_emi`]?.replace(/,/g, '') || '0'),
                  tenure: parseInt(formData[`bnpl_${i}_tenure`] || '0')
              });
          }
      }

      // Clean up currency fields to raw numbers for submission
      const cleanData = {
          ...formData,
          phone: `+91${formData.phone}`,
          income: parseInt(formData.income.replace(/,/g, '') || '0'),
          cibilScore: parseInt(formData.cibilScore || '0'),
          fdAmount: parseInt(formData.fdAmount.replace(/,/g, '') || '0'),
          fdInterest: parseInt(formData.fdInterest.replace(/,/g, '') || '0'),
          fdTenure: parseFloat(formData.fdTenure || '0'),
          rdAmount: parseInt(formData.rdAmount.replace(/,/g, '') || '0'),
          rdTenure: parseInt(formData.rdTenure || '0'),
          savingsAmount: parseInt(formData.savingsAmount.replace(/,/g, '') || '0'),
          activeLoansCount: parseInt(formData.activeLoansCount || '0'),
          activeCreditCardsCount: parseInt(formData.activeCreditCardsCount || '0'),
          activeBNPLCount: parseInt(formData.activeBNPLCount || '0'),
          monthlyNeedsCount: parseInt(formData.monthlyNeedsCount || '0'),
          monthlyRequirements: monthlyRequirements,
          loans: loans,
          creditCards: creditCards,
          bnplPlans: bnplPlans
      };
      onSubmit(cleanData);
  };

  const handleNext = () => {
    // Current input question index
    const qIndex = step - 1;

    // Validation
    if (step > 0 && step <= inputQuestions.length) {
        const currentQ = inputQuestions[qIndex];
        const val = formData[currentQ.inputName];
        
        // Basic requirement check - Skip for physicalAssets and cibilScore (Optional)
        if (currentQ.inputName !== 'physicalAssets' && currentQ.inputName !== 'cibilScore') {
            if (!val || (typeof val === 'string' && !val.trim())) {
                setError('This field is required.');
                return;
            }
        }
        
        // Specific validations
        if (currentQ.id === 'phone' && val.length < 10) {
            setError('Please enter a valid 10-digit number.');
            return;
        }
        
        if (currentQ.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
            if (!emailRegex.test(val)) {
                setError('Please enter a valid email address.');
                return;
            }
        }

        // Numeric checks including dynamic loan, credit card, and BNPL fields
        const isNumericField = ['income', 'needs_count', 'fd_amount', 'fd_interest', 'fd_tenure', 'rd_amount', 'rd_tenure', 'loans_count', 'cc_count', 'bnpl_count'].includes(currentQ.id) 
            || currentQ.id.match(/loan_\d+_(amount|rate|emi|tenure)/)
            || currentQ.id.match(/cc_\d+_(limit|fee|outstanding|payment_partial|bill_date|due_date)/)
            || currentQ.id.match(/bnpl_\d+_(amount|emi|tenure)/)
            || currentQ.id.match(/need_\d+_(amount|tenure)/);

        if (isNumericField) {
            const num = parseFloat(val.toString().replace(/,/g, ''));
            if (isNaN(num)) {
                 setError('Please enter a valid number.');
                 return;
            }
            if (currentQ.id !== 'fd_interest' && !currentQ.id.includes('fee') && num <= 0) {
                 setError('Value must be greater than zero.');
                 return;
            }
            if ((currentQ.id.includes('bill_date') || currentQ.id.includes('due_date')) && (num < 1 || num > 31)) {
                setError('Please enter a valid day (1-31).');
                return;
            }
        }
        
        // CIBIL Range Validation (Only if provided)
        if (currentQ.inputName === 'cibilScore') {
             if (val && val.trim()) {
                 const score = parseInt(val || '0');
                 if (score < 300 || score > 900) {
                     setError('Score must be between 300 and 900.');
                     return;
                 }
             }
        }

        // Special check for Inline Savings Amount
        if (currentQ.inputName === 'hasSavings' && formData.hasSavings === 'Yes') {
             const amt = parseInt(formData.savingsAmount.replace(/,/g, '') || '0');
             if (amt <= 0) {
                 setError('Please enter the available balance.');
                 if (savingsInputRef.current) savingsInputRef.current.focus();
                 return;
             }
        }
    }

    setStep(step + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // For textarea, Enter adds new line, so we don't auto-submit. 
    // For other inputs, Enter goes to next.
    if (e.key === 'Enter') {
        const qIndex = step - 1;
        // If we are on questions
        if (step <= inputQuestions.length) {
             const currentQ = inputQuestions[qIndex];
             if (currentQ && currentQ.type !== 'textarea') {
                 handleNext();
             }
        }
    }
  };

  // --------------------------------------------------------
  // RENDER HELPERS
  // --------------------------------------------------------

  // INTRO SLIDE
  if (step === 0) {
      return (
        <div className="w-full max-w-3xl mx-auto h-[70vh] flex items-center justify-center p-4">
            <div className="w-full bg-white border-4 border-black shadow-[12px_12px_0px_0px_#00E699] relative flex flex-col min-h-[450px] items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500">
                {/* Decorative Corners */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t-4 border-l-4 border-black"></div>
                <div className="absolute top-3 right-3 w-3 h-3 border-t-4 border-r-4 border-black"></div>
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b-4 border-l-4 border-black"></div>
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b-4 border-r-4 border-black"></div>

                <div className="mb-8">
                    <div className="inline-block border-4 border-black p-4 bg-neo-yellow shadow-[4px_4px_0px_0px_black] transform rotate-[-2deg] mb-4">
                        <h1 className="text-4xl md:text-6xl font-black font-heading uppercase tracking-tighter text-black">
                            Minus.
                        </h1>
                    </div>
                    <p className="text-lg md:text-2xl font-mono font-bold text-slate-800 tracking-tight">
                        Subtract Debt. Add Life.
                    </p>
                </div>

                <button 
                    onClick={() => setStep(1)}
                    className="group relative inline-flex items-center gap-3 bg-black text-white px-8 py-4 text-lg font-bold font-heading uppercase tracking-widest border-4 border-black hover:bg-white hover:text-black transition-all shadow-[6px_6px_0px_0px_#00E699] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_0px_#00E699]"
                >
                    Start <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>
      );
  }

  // END SCREEN
  if (step > inputQuestions.length) {
      return (
        <div className="w-full max-w-3xl mx-auto h-[70vh] flex items-center justify-center p-4">
            <div className="w-full bg-white border-4 border-black shadow-[12px_12px_0px_0px_#00E699] relative flex flex-col min-h-[450px] items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500">
                {/* Decorative Corners */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t-4 border-l-4 border-black"></div>
                <div className="absolute top-3 right-3 w-3 h-3 border-t-4 border-r-4 border-black"></div>
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b-4 border-l-4 border-black"></div>
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b-4 border-r-4 border-black"></div>

                <div className="mb-8 flex flex-col items-center">
                    <div className="inline-block border-2 border-black px-4 py-2 bg-neo-mint shadow-[4px_4px_0px_0px_black] mb-6 rounded-full">
                        <div className="flex items-center gap-2 font-mono font-bold text-xs uppercase tracking-widest text-black">
                             <Sparkles className="w-4 h-4" /> Clarity in progress.
                        </div>
                    </div>

                    <h2 className="text-2xl md:text-4xl font-black font-heading uppercase tracking-tight text-black leading-tight mb-6 max-w-xl">
                        Most people work hard for money. <br/>
                        <span className="text-slate-500">Very few organize it correctly.</span>
                    </h2>

                    <p className="text-sm md:text-lg font-mono font-bold text-slate-700 tracking-tight max-w-lg mb-8 leading-relaxed">
                        You’ve taken the first step toward financial structure —
                        not by earning more, but by using your money better.
                        <br/><br/>
                        <span className="bg-neo-yellow px-1 border border-black text-black">Minus is now mapping your safest exit from debt.</span>
                    </p>
                </div>

                <button 
                    onClick={handleSubmit}
                    className="group relative inline-flex items-center gap-3 bg-black text-white px-8 py-4 text-lg font-bold font-heading uppercase tracking-widest border-4 border-black hover:bg-white hover:text-black transition-all shadow-[6px_6px_0px_0px_#00E699] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_0px_#00E699]"
                >
                    Let us Minus. <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>
      );
  }

  // COMPACT INPUT SLIDES
  const qIndex = step - 1;
  const currentQ = inputQuestions[qIndex];
  
  // Guard clause to prevent crash if questions shrink while at end
  if (!currentQ) {
      return (
         <div className="flex items-center justify-center h-[70vh]">
             <button onClick={handleNext} className="bg-black text-white px-6 py-3 font-bold">Complete Submission</button>
         </div>
      );
  }

  // Updated check: using fdAmount, fdInterest, rdAmount (camelCase) to match inputName properties
  const isCurrencyField = ['income', 'monthlyNeedsAmount', 'fdAmount', 'fdInterest', 'rdAmount'].includes(currentQ.inputName)
      || currentQ.inputName.match(/loan_\d+_(amount|emi)/)
      || currentQ.inputName.match(/cc_\d+_(limit|fee|outstanding|payment_partial)/)
      || currentQ.inputName.match(/bnpl_\d+_(amount|emi)/)
      || currentQ.inputName.match(/need_\d+_(amount)/);

  // Helper for rendering the CIBIL Gauge
  const renderCibilGauge = () => {
    const status = getCibilStatus(formData.cibilScore || '0');
    return (
        <div className="w-full flex flex-col gap-6 animate-in fade-in duration-500">
            {/* The Gauge Bars */}
            <div className="w-full flex gap-1 h-3 mt-4">
                <div className="flex-1 bg-neo-red h-full border-y border-l border-black"></div>
                <div className="flex-1 bg-neo-orange h-full border-y border-l border-black"></div>
                <div className="flex-1 bg-neo-yellow h-full border-y border-l border-black"></div>
                <div className="flex-1 bg-[#88D66C] h-full border-y border-l border-black"></div>
                <div className="flex-1 bg-neo-mint h-full border border-black"></div>
            </div>

            {/* Moving Indicator */}
            <div className="relative w-full h-8 -mt-7 mb-2">
                <div 
                    className="absolute top-0 transition-all duration-500 ease-out flex flex-col items-center"
                    style={{ left: status.width, transform: 'translateX(-50%)' }}
                >
                     <Triangle className="w-4 h-4 fill-black text-black rotate-180" />
                </div>
            </div>

            {/* Text Status */}
            <div className={`text-center font-heading font-black text-2xl uppercase tracking-wider ${status.text}`}>
                {status.label}
            </div>

            {/* Input Field */}
            <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type="number"
                name={currentQ.inputName}
                value={formData[currentQ.inputName] || ''}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={currentQ.placeholder}
                autoComplete="off"
                className="w-full bg-neutral-50 border-2 border-black p-4 text-lg font-mono font-bold text-black placeholder:text-slate-300 focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_0px_#00E699] transition-all text-center"
            />
            
            <div className="flex justify-between text-[10px] font-mono font-bold text-slate-400 uppercase">
                <span>300 (Low)</span>
                <span>900 (High)</span>
            </div>
        </div>
    );
  };

  return (
    <div className="w-full max-w-lg mx-auto h-[70vh] flex items-center justify-center p-4">
       {/* Compact Card Container */}
       <div className="w-full bg-white border-4 border-black shadow-[10px_10px_0px_0px_black] relative flex flex-col min-h-[400px] animate-in slide-in-from-right-8 duration-300">
          
          {/* Simple Header with Counter */}
          <div className="p-6 pb-0 flex justify-between items-center">
             <div className="bg-neo-yellow border-2 border-black px-3 py-1 font-mono text-xs font-bold uppercase shadow-[2px_2px_0px_0px_black]">
                Step {step} / {inputQuestions.length}
             </div>
             <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                {currentQ.label}
             </div>
          </div>

          {/* Question Content */}
          <div className="flex-grow px-8 py-6 flex flex-col justify-center">
             <h2 className="text-3xl font-black font-heading uppercase text-black mb-3 leading-none">
                 {currentQ.question}
             </h2>
             <p className="font-mono text-xs md:text-sm font-bold text-slate-500 mb-8">
                 {currentQ.subtext}
             </p>

             <div className="relative group">
                 {currentQ.id === 'phone' ? (
                     <div key={currentQ.inputName} className="flex w-full group-focus-within:shadow-[4px_4px_0px_0px_#00E699] transition-all">
                        <div className="bg-neutral-200 border-2 border-r-0 border-black p-4 text-lg font-mono font-bold text-slate-600 flex items-center select-none min-w-[3.5rem] justify-center">
                            +91
                        </div>
                        <input
                             ref={inputRef as React.RefObject<HTMLInputElement>}
                             type="tel"
                             name={currentQ.inputName}
                             value={formData[currentQ.inputName] || ''}
                             onChange={handlePhoneChange}
                             onKeyDown={handleKeyDown}
                             placeholder={currentQ.placeholder}
                             autoComplete="off"
                             className="w-full bg-neutral-50 border-2 border-black p-4 text-lg font-mono font-bold text-black placeholder:text-slate-300 focus:outline-none focus:bg-white"
                         />
                     </div>
                 ) : currentQ.id === 'cibil_score' ? (
                     renderCibilGauge()
                 ) : currentQ.type === 'select' ? (
                     <div key={currentQ.inputName} className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {currentQ.options?.map((opt) => (
                            <button
                                key={opt}
                                onClick={() => handleSelection(currentQ.inputName, opt)}
                                className={`text-left p-4 border-2 border-black font-bold font-mono text-xs md:text-sm uppercase transition-all flex items-center justify-between group/btn text-black
                                ${formData[currentQ.inputName] === opt
                                    ? 'bg-neo-yellow shadow-[4px_4px_0px_0px_black] translate-x-[-2px] translate-y-[-2px]'
                                    : 'bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[4px_4px_0px_0px_black] hover:bg-neutral-50'
                                }
                                `}
                            >
                                <span>{opt}</span>
                                {formData[currentQ.inputName] === opt && <Check className="w-4 h-4 text-black"/>}
                            </button>
                            ))}
                        </div>

                        {/* INLINE FIELD FOR SAVINGS AMOUNT */}
                        {currentQ.inputName === 'hasSavings' && formData.hasSavings === 'Yes' && (
                             <div className="mt-2 animate-in slide-in-from-top-2 fade-in duration-300">
                                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                                    How much is currently idle? (₹)
                                </label>
                                <input
                                    ref={savingsInputRef}
                                    type="text"
                                    name="savingsAmount"
                                    value={formData.savingsAmount || ''}
                                    onChange={handleCurrencyChange}
                                    onKeyDown={handleKeyDown}
                                    placeholder="e.g. 25,000"
                                    autoComplete="off"
                                    className="w-full bg-white border-2 border-black p-4 text-lg font-mono font-bold text-black placeholder:text-slate-300 focus:outline-none focus:shadow-[4px_4px_0px_0px_#00E699] transition-all"
                                />
                             </div>
                        )}
                     </div>
                 ) : currentQ.type === 'textarea' ? (
                     <textarea
                         key={currentQ.inputName}
                         ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                         name={currentQ.inputName}
                         value={formData[currentQ.inputName] || ''}
                         onChange={handleChange}
                         onKeyDown={handleKeyDown}
                         placeholder={currentQ.placeholder}
                         className="w-full h-32 bg-neutral-50 border-2 border-black p-4 text-lg font-mono font-bold text-black placeholder:text-slate-300 focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_0px_#00E699] transition-all resize-none"
                     />
                 ) : (
                     <input
                         key={currentQ.inputName}
                         ref={inputRef as React.RefObject<HTMLInputElement>}
                         type={currentQ.type}
                         name={currentQ.inputName}
                         value={formData[currentQ.inputName] || ''}
                         onChange={isCurrencyField ? handleCurrencyChange : handleChange}
                         onKeyDown={handleKeyDown}
                         placeholder={currentQ.placeholder}
                         autoComplete="off"
                         className="w-full bg-neutral-50 border-2 border-black p-4 text-lg font-mono font-bold text-black placeholder:text-slate-300 focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_0px_#00E699] transition-all"
                     />
                 )}
                 
                 {error && (
                    <div className="absolute -bottom-6 left-0 text-neo-red text-[10px] font-bold uppercase animate-pulse">
                        * {error}
                    </div>
                 )}
             </div>
          </div>

          {/* Compact Footer */}
          <div className="p-6 pt-0 flex justify-between items-center gap-4">
              <button 
                onClick={() => setStep(step - 1)}
                className="p-3 border-2 border-transparent hover:border-black hover:bg-neutral-100 transition-all text-slate-400 hover:text-black"
              >
                 <ArrowLeft className="w-5 h-5" />
              </button>

              <button 
                 onClick={handleNext}
                 className="flex-grow bg-black text-white border-2 border-black py-3 px-6 font-heading font-bold uppercase tracking-wider text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:bg-neo-mint hover:text-black hover:shadow-[4px_4px_0px_0px_black] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2"
              >
                 {step === inputQuestions.length 
                    ? ((currentQ.inputName === 'physicalAssets' && !formData.physicalAssets) || (currentQ.inputName === 'cibilScore' && !formData.cibilScore) ? 'Skip' : 'Next')
                    : 'Next'
                 }
                 {step !== inputQuestions.length && <ArrowRight className="w-5 h-5" />}
                 {step === inputQuestions.length && <Check className="w-5 h-5" />}
              </button>
          </div>

       </div>
    </div>
  );
};

export default FormInterface;