import type { Value as SalaryInputValue } from './components/SalaryInput'

export const salaryOptions = [
    { label: 'Just Me', value: 0 },
    { label: `I'm buying with someone`, value: 1 }
]

export const salaryAnnualOptions = [
    { label: 'per month', value: 12 },
    { label: 'per week', value: 52 },
    { label: 'per year', value: 1 }
]

export const yesOrNoOpions = [
    {
        label: 'Yes',
        value: 1
    },
    {
        label: 'No',
        value: 0
    }
]

export const salaryInputValue: SalaryInputValue = {
    input: 0,
    annual: 12
}

export const numFormatter = (value: any) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
export const numParser = (value: any) => value!.replace(/\$\s?|(,*)/g, '')