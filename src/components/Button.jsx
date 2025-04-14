import styles from "../css/Button.module.css";

function Button({ letter, onClick, disabled }) {
    return (
        <button onClick={onClick} className={styles.button} disabled={disabled}>
            {letter}
        </button>
    )
}

export default Button;