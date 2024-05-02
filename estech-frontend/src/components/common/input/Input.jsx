import styles from './Input.module.css'

export function Input({value, onChange, type, placeholder,  multiple = false, required = true, ...props}) {
    return (
        <div className={styles.inputBox}>
            <input className={styles.input} type={type} multiple={multiple} required={required} value={value} onChange={onChange} {...props}/>
            <span className={styles.placeholder}>{placeholder}</span>
        </div>
    );
}