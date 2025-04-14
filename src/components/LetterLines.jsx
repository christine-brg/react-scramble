import styles from "../css/LetterLines.module.css"

function LetterLines({targetWord, selectedLetters}) {
    return (
        <div className={styles.container}>
            {targetWord.split('').map((_, i) => (
                <span key={i}>{selectedLetters[i] || '_'}</span>
            ))}
        </div>
    );
}

export default LetterLines;