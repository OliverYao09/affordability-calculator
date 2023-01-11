import styles from './formFieldItem.module.css'

type Props = {
    title: string
    children: React.ReactNode
}

const FormFieldItem = ({ title, children }: Props) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>{title}</div>
            {children}
        </div>
    )
}

export default FormFieldItem