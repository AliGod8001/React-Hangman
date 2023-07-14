/* main import */
import {useEffect, useState, useContext} from "react";

/* data import */
import { ThemeContext } from "../../store/theme-context";

/* component imports */
import MainButton from "../ui/button/MainButton";
import ThemeToggler from "../ui/theme-toggler/ThemeToggler";

/* other imports */
import styles from "./HangmanText.module.css"

const HangmanText = ({
    wordToGuess,
    guessedWord,
    winner,
    loser,
    onHelpClick,
    onResetClick
} : {
    wordToGuess: string,
    guessedWord: string[],
    winner: boolean,
    loser: boolean,
    onHelpClick: () => void,
    onResetClick: () => void
}) => {
    const [isHelpUsed, setIsHelpUsed] = useState<boolean>(false)
    const themeCtx = useContext(ThemeContext)

    useEffect(() => {
        if ( guessedWord.length === 0) {
            setIsHelpUsed(false)
        }
    }, [guessedWord])

    const helpClickHandler = () => {
        if ( isHelpUsed ) return

        setIsHelpUsed(true)
        onHelpClick()
    }

    return <div className={styles.wrapper}>
        {wordToGuess.split("").map((word, index) => <div key={index} className={styles.key}>
            <span className={`${winner ? styles.winner : ""}`} style={{visibility: `${guessedWord.includes(word) || loser ? "visible" : "hidden"}`, color: `${loser ? guessedWord.includes(word) ? themeCtx.theme === "light" ? "#545050" : "#ffffff" : "#ff001c" : ""}`}}>{word}</span>
            </div>
        )}
        <ThemeToggler />
        <MainButton type="primary" disabled={isHelpUsed} onClick={helpClickHandler} className={styles.button}>کمک</MainButton>
        <MainButton type="secondary" onClick={onResetClick} className={styles.button}>دوباره</MainButton>
    </div>
}

export default HangmanText;