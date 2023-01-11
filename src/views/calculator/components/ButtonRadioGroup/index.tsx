import styles from './buttonRadioGroup.module.css'
import { Radio } from 'antd'
import type { RadioChangeEvent } from 'antd'

interface OptionItem {
    label: string
    value: number
}


interface Props {
    onChange: ((e: number) => void)
    value: number
    options: OptionItem[]
}

const ButtonRadioGroup = ({ value, options, onChange }: Props) => {
    const changeRadio = (e: RadioChangeEvent) => {
        const result = e.target.value
        onChange(result)
    }

    return (
        <Radio.Group value={value} onChange={changeRadio} className={styles.radioWrapper} optionType="button" buttonStyle="solid">
            {options.map(option => (
                <Radio.Button value={option.value} className={styles.radioItem} key={option.value}>{option.label}</Radio.Button>
            ))}
        </Radio.Group>
    )
}

export default ButtonRadioGroup