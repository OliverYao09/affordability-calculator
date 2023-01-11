import styles from './resultCard.module.css'
import { Typography } from 'antd'

const { Text } = Typography;

const formatNumber = (value: number | undefined) => {
    if (value === undefined) {
        return ''
    }
    return (value + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export type Summary = {
    borrowing?: number
    property?: number
    totalIncome?: number
    totalLiabilities?: number

}
const ResultCard = ({ borrowing, property, totalIncome, totalLiabilities }: Summary) => {

    return (
        <div className={styles.wrapper}>
            <div>
                <div className={styles.resultTitle}>Here's what you can borrow ?</div>
                <Text strong>$ {formatNumber(borrowing)}</Text>
            </div>
            <div>
                <div className={styles.resultTitle}>What value property you can purcase ?</div>
                <Text strong>$ {formatNumber(property)}</Text>
            </div>
            <div>
                <div className={styles.resultTitle}>Total Income</div>
                <Text strong>$ {formatNumber(totalIncome)}</Text>
            </div>
            <div>
                <div className={styles.resultTitle}>Total liabilities</div>
                <Text strong>$ {formatNumber(totalLiabilities)}</Text>
            </div>
        </div>
    )
}

export default ResultCard