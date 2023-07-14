
import _keys from '../../data/KEYS.json'
import styles from './HangmanKeyboard.module.css'

type HangmanKeyboardProp = {
    wordToGuess: string,
    guessedWord: string[],
    onKeyClick: (key: string) => void
}

const HangmanKeyboard = (props : HangmanKeyboardProp) => {
    const letterClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        props.onKeyClick((e.target as any).value)
    }

    return <div className={styles.wrapper}>
        {_keys.map((key, index) => <button onClick={letterClickHandler} value={key} className={`${styles.key} ${props.guessedWord.includes(key) && props.wordToGuess.includes(key) ? styles.active : ""}`} disabled={props.guessedWord.includes(key) && !props.wordToGuess.includes(key)} key={index}>{key}</button>)}
    </div>
}

export default HangmanKeyboard;