import { getStateOptions } from './formQuestion';

export const formJson = {
	formName: 'Loan JSON (Page 1)',
	steppers: [
		[
			{
				question: 'What are you looking for?',
				type: 'Radio',
				description: 'Get started by letting us know a little bit about what you need',
				fieldName: 'typeOfLoan',
				options: [
					{ value: 'homeLoan', label: 'Home Loans' },
					{ value: 'Lap', label: 'Loan Against Property' },
					{ value: 'plotLoan', label: 'Plot & Construction Loans' },
					{ value: 'personalLoan', label: 'Personal Loans' },
					{ value: 'businessLoan', label: 'Business loans' },
					{ value: 'professionalLoan', label: 'Professional Loans' }
				]
			},
			{
				question: 'Please choose any one.',
				description: 'The maximum tenure for LAP is 15 years, and for DOD, it is 10 years.',
				type: 'Radio',
				fieldName: 'lapType',
				options: [
					{
						value: 'LapNew',
						label: 'New loan'
					},
					{
						value: 'lapDOD',
						label: 'Drop-line Overdraft (DOD)'
					}
				],
				condition: {
					rightOperand: 'typeOfLoan',
					operator: 'include',
					leftOperand: ['Lap']
				}
			},
			{
				question: 'What type of loan are you planning?',
				description: 'The maximum tenure for LAP is 15 years, and for DOD, it is 10 years.',
				type: 'Radio',
				fieldName: 'plotLoanActivity',
				options: [
					{
						value: 'plotNew',
						label: 'New loan'
					},
					{
						value: 'btOnly',
						label: 'balance transfer'
					}
				],
				condition: {
					rightOperand: 'typeOfLoan',
					operator: 'include',
					leftOperand: ['plotLoan']
				}
			},

			{
				question: 'State Name',
				description: 'Enter state name',
				type: 'select',
				fieldName: 'stateName',
				errorMessage: 'Please select a state',
				placeholder: 'Select State',
				options: getStateOptions(),
				condition: {
					rightOperand: 'loanName',
					operator: '==',
					leftOperand: 'newLoan'
				}
			},
			{
				question: 'What type of loan are you planning?',
				description: 'It will help us to identify your requirements, specifically',
				type: 'Radio',
				fieldName: 'loanName',
				options: [
					{
						value: 'newLoan',
						label: 'New Loan'
					},
					{
						value: 'btWithTopUp',
						label: 'Balance Transfer With Top-up'
					},
					{
						value: 'btOnly',
						label: 'Balance Transfer Only',

						condition: {
							rightOperand: {
								rightOperand: 'lapType',
								operator: '==',
								leftOperand: 'LapNew'
							},
							operator: 'OR',
							leftOperand: {
								rightOperand: 'typeOfLoan',
								operator: '==',
								leftOperand: 'homeLoan'
							}
						}
					},
					{
						value: 'topUp',
						label: 'Top-up Only',

						condition: {
							rightOperand: {
								rightOperand: 'typeOfLoan',
								operator: '==',
								leftOperand: 'homeLoan'
							},
							operator: 'OR',
							leftOperand: {
								rightOperand: 'lapType',
								operator: '==',
								leftOperand: 'LapNew'
							}
						}
					}
				],
				condition: {
					rightOperand: 'typeOfLoan',
					operator: 'include',
					leftOperand: ['homeLoan', 'Lap']
				}
			}
		],
		[],
		[],
		[],
		[],
		[],
		[]
	]
};
