import { useEffect, useState } from 'react'
import { Col, Row, Typography, InputNumber } from 'antd'
import FormFieldItem from './components/FormFieldItem'
import ButtonRadioGroup from './components/ButtonRadioGroup'
import SalaryInput from './components/SalaryInput'
import MultiInputList from './components/MultiInputList'
import MultiSalartInputList from './components/MultiInputList/MultiSalaryInputList'
import ResultCard, { Summary } from './components/ResultCard'
import { salaryOptions, yesOrNoOpions, numFormatter, numParser } from './constants'
import { SendOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Alert } from 'antd';
import useCalculator from './useCalculator'
import axios, { AxiosResponse } from 'axios'

import styles from './calculator.module.css'
const { Title } = Typography;

const Calculator = () => {
    const calculatorService = useCalculator()
    const totalIncome = calculatorService.getTotalIncome()
    const totalLiabilities = calculatorService.getTotalLiabilities()
    const deposit = calculatorService.deposit

    const [summary, setSummary] = useState<Summary>({})

    // Leaving comments for this challenge,
    // (I won't do comments like this in the real codebase but only for this challenge ;P)

    /* Note: There are two ways to call the API in this challenge,
    // 1: Call the API everytime when the value of totalIncome or totalLiabilities or deposit changed.
    // Pros: The user can see the result of the money they can borrow in realtime.
    // Cons: Calling the API too many time so it will cause a lot of load on the API.(We can optimise the performance in multiple way in the future.)

    // IMPORTANT: Due to the API doesn't accept inital value of 0, so you need to provide a value for 
    "Income, Loans and Deposit" so the API will be called and return final reuslt on the screen.
    
    2: Only call the API when user complete the form and click "Do Calculation"" button below
    // Pros: API can relax until it's been call.
    // Cons: User can't see final result in realtime. 
    */
    // Two ways are provided below so feel free to use the one you like.

    
    // function handleCalculationAPI(){
    useEffect(() => {
        const data = {
            total_income: totalIncome,
            total_liabilities: totalLiabilities,
            deposit
        }
        axios({
            method: 'POST',
            url: `https://test-api-self.vercel.app/calculate`,
            data
        }).then((res: AxiosResponse) => {
            return res.data
        }).then((data) => {
            const { borrowing, property } = data.result
            setSummary({ borrowing, property })

        }).catch((err: any) => {
            console.log('err: ', err)
        })
    },[totalIncome,totalLiabilities,deposit])
    // Delete the useEffect dependencies if you want to call the handleCalculationAPI function

    return (
        <div className={styles.wrapper}>
            <Title level={4}>Affordability Calculator</Title>
            <Row>
                <Col flex="1">
                    <div className={styles.formBox}>
                        <FormFieldItem title="How many of you are buying the property?">
                            <ButtonRadioGroup value={calculatorService.hasOtherApplication} onChange={calculatorService.changeApplication} options={salaryOptions} />
                        </FormFieldItem>
                        <FormFieldItem title="What's your base salary/wages? (before tax)">
                            <SalaryInput value={calculatorService.salary} onChange={calculatorService.setSalary} />
                        </FormFieldItem>
                        {
                            calculatorService.hasOtherApplication ?
                                <FormFieldItem title="What's the second application's salary/wages? (before tax)">
                                    <SalaryInput value={calculatorService.otherSalary} onChange={calculatorService.setOtherSalary} />
                                </FormFieldItem> : undefined
                        }

                        <FormFieldItem title="Do you have another source of income?">
                            <ButtonRadioGroup value={calculatorService.hasAnotherIncome} onChange={calculatorService.changeAnotherIncomeStatus} options={yesOrNoOpions} />
                            {
                                calculatorService.hasAnotherIncome
                                    ? <MultiSalartInputList list={calculatorService.anotherIncomes} label="income" onChange={calculatorService.setAnotherIncomes} />
                                    : undefined
                            }
                        </FormFieldItem>

                        <FormFieldItem title="Do you have any loans?">
                            <ButtonRadioGroup value={calculatorService.hasLoans} onChange={calculatorService.changeLoansStatus} options={yesOrNoOpions} />
                            {
                                calculatorService.hasLoans
                                    ? <MultiInputList list={calculatorService.loans} label="loans" onChange={calculatorService.setLoans} />
                                    : undefined
                            }
                        </FormFieldItem>

                        <FormFieldItem title="Do you have any credit cards?">
                            <ButtonRadioGroup value={calculatorService.hasCredits} onChange={calculatorService.changeCreditsStatus} options={yesOrNoOpions} />
                            {
                                calculatorService.hasCredits
                                    ? <MultiInputList list={calculatorService.credits} label="credit" onChange={calculatorService.setCredits} />
                                    : undefined
                            }
                        </FormFieldItem>
                        <FormFieldItem title="How much deposit do you have?">
                            <InputNumber
                                value={calculatorService.deposit}
                                style={{ width: '100%' }}
                                formatter={numFormatter}
                                parser={numParser}
                                onChange={calculatorService.setDeposit as any}
                            />
                        </FormFieldItem>
                    </div>
                </Col>
                <Col flex="0 1 300px">
                    <div style={{marginLeft: 20, marginBottom: 10}}>
                        <Alert
                            message="Note:"
                            description={`Please provide a value for Income, Loans, and Deposit to get the final result.
                            The value can't be 0`}
                            type={totalIncome && totalLiabilities && deposit !== 0 ? "info" : "warning"} 
                            showIcon
                        />
                    </div>
                    <ResultCard
                        borrowing={summary.borrowing || 0}
                        property={summary.property || 0}
                        totalIncome={totalIncome}
                        totalLiabilities={totalLiabilities}
                    />
                    {/* <div style={{margin: 20}}>
                        <Button type="primary" onClick={handleCalculationAPI}  icon={<SendOutlined />} size="large">
                            Do Calculation
                        </Button>
                    </div> */}
                </Col>
            </Row>
        </div>
    );
}

export default Calculator
