
import { InputNumber, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons';
import styles from './multiInputList.module.css'
import { numFormatter, numParser } from '../../constants'

type InputValue = number | string | null
interface Props {
    onChange: ((list: number[]) => void)
    list: InputValue[]
    label: string
}

const MultiInputList = ({ list, label, onChange }: Props) => {

    const changeInput = (value: InputValue, index: number) => {
        const result = [...list]

        result[index] = value


        onChange(result.map(item => +(item || 0)))
    }

    const addInput = () => {
        const result = [...list, 0]
        onChange(result.map(item => +(item || 0)))
    }

    const deleteInput = (index: number) => {
        const result = [...list]

        result.splice(index, 1)
        onChange(result.map(item => +(item || 0)))
    }

    return (
        <div className={styles.wrapper}>
            {
                list.map((item, index) => (
                    <div key={index} className={styles.itemWrapper}>
                        <div className={styles.label}>{`${label} # ${index}`}</div>
                        <div className={styles.inputRow} >
                            <div className={styles.inputWrapper}>
                                <InputNumber
                                    value={item}
                                    onChange={value => changeInput(value, index)}
                                    style={{ width: '100%' }}
                                    formatter={numFormatter}
                                    parser={numParser}
                                />
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

export default MultiInputList