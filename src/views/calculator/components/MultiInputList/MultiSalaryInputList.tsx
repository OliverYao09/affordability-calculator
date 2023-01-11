
import SalaryInput, { Value as ValueType } from "../SalaryInput"
import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import styles from './multiInputList.module.css'

interface Props {
    onChange: ((list: ValueType[]) => void)
    list: ValueType[]
    label: string
}

const MultiSalartInputList = ({ list, label, onChange }: Props) => {

    const changeInput = (value: ValueType, index: number) => {
        const result = [...list]

        result[index] = value
        onChange(result)
    }

    const addInput = () => {
        const defaultValue: ValueType = {
            input: 0,
            annual: 12
        }
        onChange([...list, defaultValue])
    }

    const deleteInput = (index: number) => {
        const result = [...list]

        result.splice(index, 1)
        onChange(result)
    }

    return (
        <div className={styles.wrapper}>
            {
                list.map((item, index) => (
                    <div key={index} className={styles.itemWrapper}>
                        <div className={styles.label}>{`${label} # ${index}`}</div>
                        <div className={styles.inputRow} >
                            <div className={styles.inputWrapper}>
                                <SalaryInput value={item} onChange={(value) => changeInput(value, index)} />
                            </div>
                            {
                                list.length > 1 && (
                                    <Button style={{ width: '40px', textAlign: 'center' }} onClick={() => deleteInput(index)}>
                                        <DeleteOutlined />
                                    </Button>
                                )
                            }
                        </div>
                    </div>
                ))
            }
            <Button onClick={addInput}>Add {label}</Button>
        </div>
    )
}

export default MultiSalartInputList