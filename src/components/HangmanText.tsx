/* main import */
import {useEffect, useState} from "react";

import styles from "./HangmanText.module.css"

type HangmanTextProp = {
    wordToGuess: string,
    guessedWord: string[],
    winner: boolean,
    loser: boolean,
    onHelpClick: () => void,
    onResetClick: () => void
}

const HangmanText = (props: HangmanTextProp) => {
    const [isHelpUsed, setIsHelpUsed] = useState<boolean>(false)

    useEffect(() => {
        if ( props.guessedWord.length === 0) {
            setIsHelpUsed(false)
        }
    }, [props.guessedWord])

    const helpClickHandler = () => {
        if ( isHelpUsed ) return

        setIsHelpUsed(true)
        props.onHelpClick()
    }

    return <div className={styles.wrapper}>
        {props.wordToGuess.split("").map((word, index) => <div key={index} className={styles.key}>
            <span className={`${props.winner ? styles.winner : ""}`} style={{visibility: `${props.guessedWord.includes(word) || props.loser ? "visible" : "hidden"}`, color: `${props.loser ? props.guessedWord.includes(word) ? "#121212" : "crimson" : ""}`}}>{word}</span>
            </div>
        )}
        <button onClick={helpClickHandler} className={styles.help} disabled={isHelpUsed}>کمک</button>
        <button onClick={props.onResetClick} className={styles.reset}>دوباره</button>
    </div>
}

export default HangmanText;