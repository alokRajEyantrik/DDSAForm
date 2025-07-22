import { getStateOptions } from "../formQuestion";

export const formJson = {
  formName: "Loan JSON",
  steppers: [
    [
      {
        id: "q1_loan_type",
        question: "What are you looking for?",
        type: "Radio",
        description:
          "Get started by letting us know a little bit about what you need",
        fieldName: "typeOfLoan",
        uiGroup: "loanStep1",
        options: [
          {
            value: "homeLoan",
            label: "Home Loans",
            setFields: {
              typeOfROI: "(HL/Construction/Plot+Construction/Plot)",
            },
          },
          {
            value: "lap",
            label: "Loan Against Property",
            setFields: {
              typeOfROI: "LAP",
            },
          },
          {
            value: "plotLoan",
            label: "Plot & Construction Loans",
            setFields: {
              typeOfROI: "(HL/Construction/Plot+Construction/Plot)",
            },
          },
          {
            value: "personalLoan",
            label: "Personal Loans",
            setFields: {
              typeOfROI: "Personal Loan",
            },
          },
          {
            value: "businessLoan",
            label: "Business loans",
            setFields: {
              typeOfROI: "Business Loan",
            },
          },
          {
            value: "professionalLoan",
            label: "Professional Loans",
            setFields: {
              typeOfROI: "Professional Loan",
            },
          },
        ],
      },
      {
        id: "q2_lap_type",
        question: "Please choose any one.",
        description:
          "The maximum tenure for LAP is 15 years, and for DOD, it is 10 years.",
        type: "Radio",
        fieldName: "lapType",
        uiGroup: "loanStep1",
        options: [
          { value: "lapNew", label: "New loan" },
          { value: "lapDOD", label: "Drop-line Overdraft (DOD)" },
        ],
        showWhen: {
          "==": [{ var: "typeOfLoan" }, "lap"],
        },
      },
      {
        id: "q3_plot_activity",
        question: "What type of loan are you planning?",
        description:
          "It will help us to identify your requirements, specifically.",
        type: "Radio",
        fieldName: "plotLoanActivity",
        uiGroup: "loanStep1",
        options: [
          { value: "plotNew", label: "New loan" },
          { value: "btOnly", label: "Balance transfer" },
        ],
        showWhen: {
          "==": [{ var: "typeOfLoan" }, "plotLoan"],
        },
      },
      {
        id: "q4_plot_subcategory",
        question: "Please select any one sub-category under Plot Loan.",
        description:
          "Selecting the correct sub-category for plot loans is essential to avoid confusion in documentation, approval processes, and getting the best interest rates.",
        type: "Radio",
        fieldName: "plotLoanName",
        uiGroup: "loanStep1",
        options: [
          { value: "plotOnly", label: "Plot Loan Only" },
          { value: "plotWithConstruction", label: "Plot & Construction Loan" },
          { value: "plotEquity", label: "Plot & Equity Loan" },
          { value: "plotConstructionOnly", label: "Construction Loan Only" },
        ],
        showWhen: {
          and: [
            { "==": [{ var: "typeOfLoan" }, "plotLoan"] },
            { "==": [{ var: "plotLoanActivity" }, "plotNew"] },
          ],
        },
      },
      {
        id: "q5_unsecured_form",
        question:
          "Select the form in which you want to avail this unsecured loan.",
        description: `This helps us identify the most suitable loan structure for you. For details, check our <a href="/lap/dropline-overdraft"> Drop-line Overdraft (DOD)</a> Page.`,
        type: "Radio",
        fieldName: "loanSubType",
        uiGroup: "loanStep1",
        options: [
          {
            value: "personalNew",
            label: "Personal Loan",
            showWhen: {
              "==": [{ var: "typeOfLoan" }, "personalLoan"],
            },
          },
          {
            value: "personalDOD",
            label: "Drop-line Overdraft (DOD)",
            showWhen: {
              "==": [{ var: "typeOfLoan" }, "personalLoan"],
            },
          },
          {
            value: "businessNew",
            label: "Business Loan",
            showWhen: {
              "==": [{ var: "typeOfLoan" }, "businessLoan"],
            },
          },
          {
            value: "businessDOD",
            label: "Drop-line Overdraft (DOD)",
            showWhen: {
              "==": [{ var: "typeOfLoan" }, "businessLoan"],
            },
          },
          {
            value: "professionalNew",
            label: "Professional Loan",
            showWhen: {
              "==": [{ var: "typeOfLoan" }, "professionalLoan"],
            },
          },
          {
            value: "professionalDOD",
            label: "Drop-line Overdraft (DOD)",
            showWhen: {
              "==": [{ var: "typeOfLoan" }, "professionalLoan"],
            },
          },
        ],
        showWhen: {
          in: [
            { var: "typeOfLoan" },
            ["personalLoan", "businessLoan", "professionalLoan"],
          ],
        },
      },
      {
        id: "q6_existing_obligation",
        question: "Do you have any existing obligations?",
        description:
          "This includes all types of loans and credit limits you may have, such as personal loans, home loans, car loans, credit card loans (excluding monthly dues), gold loans, consumer durable loans, DODs, CCs, ODs, and any other ongoing liabilities.",
        type: "Radio",
        fieldName: "existingObligation",
        uiGroup: "loanStep1",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
        showWhen: {
          and: [
            {
              in: [
                { var: "typeOfLoan" },
                ["personalLoan", "businessLoan", "professionalLoan"],
              ],
            },
            {
              in: [
                { var: "loanSubType" },
                [
                  "personalNew",
                  "personalDOD",
                  "businessNew",
                  "businessDOD",
                  "professionalNew",
                  "professionalDOD",
                ],
              ],
            },
          ],
        },
      },
      {
        id: "q7_proceed_with",
        question: "How you'd like to proceed with your loan?",
        description:
          "Tell us if you’re applying for a fresh loan or want to consolidate your current loans.",
        type: "Radio",
        fieldName: "proceedWith",
        uiGroup: "loanStep1",
        options: [
          {
            value: "startWithNew",
            label: "Start Fresh with New Loan",
          },
          {
            value: "debtConsolidationWithExtraFunds",
            label: "Debt Consolidation with Extra Funds",
          },
        ],
        showWhen: {
          and: [
            {
              in: [
                { var: "typeOfLoan" },
                ["personalLoan", "businessLoan", "professionalLoan"],
              ],
            },
            { "==": [{ var: "existingObligation" }, "yes"] },

            {
              in: [
                { var: "loanSubType" },
                ["personalNew", "businessNew", "professionalNew"],
              ],
            },
          ],
        },
      },
      {
        id: "q8_home_lap_loan_plan",
        question: "What type of loan are you planning?",
        description:
          "It will help us to identify your requirements, specifically",
        type: "Radio",
        fieldName: "homeOrLapLoanPlan",
        uiGroup: "loanStep1",
        options: [
          { value: "newLoan", label: "New Loan" },
          { value: "btWithTopUp", label: "Balance Transfer With Top-up" },
          {
            value: "btOnly",
            label: "Balance Transfer Only",
            showWhen: {
              or: [
                {
                  "==": [{ var: "typeOfLoan" }, "homeLoan"],
                },
                {
                  and: [
                    { "==": [{ var: "typeOfLoan" }, "lap"] },
                    { "==": [{ var: "lapType" }, "lapNew"] },
                  ],
                },
              ],
            },
          },
          {
            value: "topUp",
            label: "Top-up Only",
            showWhen: {
              or: [
                {
                  "==": [{ var: "typeOfLoan" }, "homeLoan"],
                },
                {
                  and: [
                    { "==": [{ var: "typeOfLoan" }, "lap"] },
                    { "==": [{ var: "lapType" }, "lapNew"] },
                  ],
                },
              ],
            },
          },
        ],
        showWhen: {
          in: [{ var: "typeOfLoan" }, ["homeLoan", "lap"]],
        },
      },
      {
        id: "q9_next_button",
        type: "button",
        fieldName: "proceedButton",
        question: "Next",
        uiGroup: "loanStep1",
        variant: "primary", // or "outline" etc., depending on your button styling
        showWhen: {
          and: [
            {
              in: [
                { var: "typeOfLoan" },
                [
                  "homeLoan",
                  "lap",
                  "plotLoan",
                  "personalLoan",
                  "businessLoan",
                  "professionalLoan",
                ],
              ],
            },
            {
              or: [
                // For LAP
                {
                  and: [
                    { "==": [{ var: "typeOfLoan" }, "lap"] },
                    { "==": [{ var: "lapType" }, "lapNew"] },
                    {
                      in: [
                        { var: "homeOrLapLoanPlan" },
                        ["newLoan", "btWithTopUp", "btOnly", "topUp"],
                      ],
                    },
                  ],
                },
                // For Home Loan
                {
                  and: [
                    { "==": [{ var: "typeOfLoan" }, "homeLoan"] },
                    {
                      in: [
                        { var: "homeOrLapLoanPlan" },
                        ["newLoan", "btWithTopUp", "btOnly", "topUp"],
                      ],
                    },
                  ],
                },
                // For Plot Loan
                {
                  and: [
                    { "==": [{ var: "typeOfLoan" }, "plotLoan"] },
                    { "==": [{ var: "plotLoanActivity" }, "plotNew"] },
                    {
                      in: [
                        { var: "plotLoanName" },
                        [
                          "plotOnly",
                          "plotWithConstruction",
                          "plotEquity",
                          "plotConstructionOnly",
                        ],
                      ],
                    },
                  ],
                },
                // For Unsecured Loans
                {
                  and: [
                    {
                      in: [
                        { var: "typeOfLoan" },
                        ["personalLoan", "businessLoan", "professionalLoan"],
                      ],
                    },
                    {
                      in: [
                        { var: "loanSubType" },
                        [
                          "personalNew",
                          "personalDOD",
                          "businessNew",
                          "businessDOD",
                          "professionalNew",
                          "professionalDOD",
                        ],
                      ],
                    },
                    {
                      or: [
                        { "==": [{ var: "existingObligation" }, "no"] },
                        {
                          and: [
                            { "==": [{ var: "existingObligation" }, "yes"] },
                            {
                              in: [
                                { var: "proceedWith" },
                                [
                                  "startWithNew",
                                  "debtConsolidationWithExtraFunds",
                                ],
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    ],

    [
      {
        id: "q2_lap_type",
        question: "If payslips are available for last 6 months ?",
        type: "Radio",
        fieldName: "paySlip",
        uiGroup: "loanStep2",
        options: [
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ],
        showWhen: {
          "==": [{ var: "typeOfLoan" }, "personalLoan"],
        },
        validation: {
          required: true,
          errorMessage: "Please select whether you have a payslip.",
        },
      },
      {
        id: "q2_lap_type",
        question: "If latest Form-16 is available ?",

        type: "Radio",
        fieldName: "form16",
        uiGroup: "loanStep2",
        options: [
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ],
        showWhen: {
          and: [
            {
              "==": [{ var: "typeOfLoan" }, "personalLoan"],
            },
            {
              "==": [{ var: "paySlip" }, "Yes"],
            },
          ],
        },
      },
      {
        id: "q2_lap_type",
        question: "If applicant or any of the co-applicants is NRI?",

        type: "Radio",
        fieldName: "NRI",
        uiGroup: "loanStep2",
        options: [
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ],
        showWhen: {
          and: [
            {
              "==": [{ var: "typeOfLoan" }, "personalLoan"],
            },
            {
              "==": [{ var: "form16" }, "Yes"],
            },
          ],
        },
      },
    ],
    [
     {
        id: "q2_lap_type",
        question: "Location for residence verification ?",
        description:"Where would you like to process your loan application from? Select the location that’s most convenient for you, ensuring smooth coordination with the bank for residence and office verifications, and completing loan formalities without disrupting your schedule.",
        type: "select",
        fieldName: "residenceState",
        uiGroup: "loanStep3",
        options: getStateOptions() ,
        showWhen: {
          "==": [{ var: "typeOfLoan" }, "personalLoan"],
        }
      }, 
      {
        id: "q2_lap_type",
        question: "City Name",
        type: "select",
        fieldName: "residenceCity",
        uiGroup: "loanStep3",
        options: getStateOptions() ,
        showWhen: {
         and: [
      { "==": [{ var: "typeOfLoan" }, "personalLoan"] },
      { "!!": [{ var: "residenceState" }] } // show only when state is selected
    ]
        }
      }, 
      
    ],
    
  ],
};