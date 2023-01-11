import { InputNumber, Select } from 'antd'
import { salaryAnnualOptions, numFormatter, numParser } from '../../constants'

export interface Value {
    input: number
    annual: number
}

interface Props {
    onChange: ((e: Value) => void) | undefined
    value: Value
}



const SalaryInput = ({ value, onChange }: Props) => {
    const changeSelect = (annual: number) => {
        const inputValue = value?.input
        onChange?.({ input: inputValue, annual })
    }

    const changeInput = (inputValue: number | string | null) => {
        onChange?.({ input: inputValue as number, annual: value.annual })
    }
    const selectAfter = (
        <Select value={value.annual} style={{ width: 120 }} onChange={changeSelect}>
            {salaryAnnualOptions.map(option => (
                <Select.Option value={option.value} key={option.value}>{option.label}</Select.Option>
            ))}
        </Select>
    );

    return (
        <InputNumber
            value={value.input}
            onChange={changeInput}
            style={{ width: '100%' }}
            formatter={numFormatter}
            parser={numParser}
            addonAfter={selectAfter}
        />
    )
}

export default SalaryInput