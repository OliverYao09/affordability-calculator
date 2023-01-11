import { useState } from 'react'
import { salaryInputValue } from './constants'

const sum = (arr: number[]) => {
    var total = 0;
    for (let i = arr.length - 1; i >= 0; i--) {
        total += arr[i];
    }
    return total;
}

function useCalculator() {
    const [hasOtherApplication, toggleApplication] = useState(0)
    const [salary, setSalary] = useState({ ...salaryInputValue })
    const [otherSalary, setOtherSalary] = useState({ ...salaryInputValue })
    const [hasAnotherIncome, toggleAnotherIncomeStatus] = useState(0)
    const [anotherIncomes, setAnotherIncomes] = useState([{ ...salaryInputValue }])
    const [hasLoans, toggleLoansStatus] = useState(0)
    const [loans, setLoans] = useState([0])
    const [hasCredits, toggleCreditsStatus] = useState(0)
    const [credits, setCredits] = useState([0])

    const [deposit, setDeposit] = useState(0)

    const changeApplication = (value: number) => {
        if (value === 0) {
            setOtherSalary({ ...salaryInputValue })
        }
        toggleApplication(value)
    }

    const changeAnotherIncomeStatus = (value: number) => {
        if (value === 0) {
            setAnotherIncomes([{ ...salaryInputValue }])
        }
        toggleAnotherIncomeStatus(value)
    }

    const changeLoansStatus = (value: number) => {
        if (value === 0) {
            setLoans([0])
        }
        toggleLoansStatus(value)
    }

    const changeCreditsStatus = (value: number) => {
        if (value === 0) {
            setCredits([0])
        }
        toggleCreditsStatus(value)
    }

    const getTotalIncome = () => {
        const selfSalary = salary.input * salary.annual
        const otherSalaryCount = otherSalary.input * otherSalary.annual
        const otherIncomeList = anotherIncomes.map(item => item.input * item.annual)

        const total = sum(otherIncomeList) + selfSalary + otherSalaryCount
        return total
    }

    const getTotalLiabilities = () => {
        const totalLoans = sum(loans)
        const totalCredits = sum(credits)

        return totalCredits + totalLoans
    }



    return {
        hasOtherApplication,
        salary,
        otherSalary,
        hasAnotherIncome,
        anotherIncomes,
        hasLoans,
        loans,
        hasCredits,
        credits,
        deposit,
        getTotalIncome,
        getTotalLiabilities,
        changeApplication,
        setSalary,
        setOtherSalary,
        changeAnotherIncomeStatus,
        setAnotherIncomes,
        changeLoansStatus,
        setLoans,
        changeCreditsStatus,
        setCredits,
        setDeposit
    }
}

export default useCalculator