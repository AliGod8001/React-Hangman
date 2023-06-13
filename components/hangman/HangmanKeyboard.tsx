const KEYS = [
    "پ",
    "چ",
    "ج",
    "ح",
    "خ",
    "ه",
    "ع",
    "غ",
    "ف",
    "ق",
    "ث",
    "ص",
    "ض",
    "گ",
    "ک",
    "م",
    "ن",
    "ت",
    "ا",
    "ل",
    "ب",
    "ی",
    "س",
    "ش",
    "و",
    "ئ",
    "د",
    "ذ",
    "ر",
    "ز",
    "ط",
    "ظ",
    "ژ",
]

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
        {KEYS.map((key, index) => <button onClick={letterClickHandler} value={key} className={`${styles.key} ${props.guessedWord.includes(key) && props.wordToGuess.includes(key) ? styles.active : ""}`} disabled={props.guessedWord.includes(key) && !props.wordToGuess.includes(key)} key={index}>{key}</button>)}
    </div>
}

export default HangmanKeyboard;