/* main import */
import { useState, useEffect, useCallback } from "react";

/* component import */
import HangmanShape from "./HangmanShape.tsx";
import HangmanText from "./HangmanText.tsx";
import HangmanKeyboard from "./HangmanKeyboard.tsx";

/* other import */
import words from '../../store/WORDS.json'
import styles from './Hangman.module.css'

const getWord = () => {
    return words[Math.floor(Math.random() * words.length)]
}

const Hangman = () => {
    const [wordToGuess, setWordToGuess] = useState<string>(() => {
        return getWord()
    })
    const [guessedWord, setGuessedWord] = useState<string[]>([])

    const wrongWordGuessed = guessedWord.filter(letter => !wordToGuess.includes(letter))
    const isWinner = wordToGuess.split("").every(letter => guessedWord.includes(letter))
    const isLoser = wrongWordGuessed.length >= 6

    const addGuessedLetter = useCallback(
        (letter: string) => {
            if (guessedWord.includes(letter) || isLoser || isWinner) return

            setGuessedWord(prevState => [...prevState, letter])
        },
        [guessedWord, isWinner, isLoser]
    )

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key
            if (!key.match(/^[ا-ی]$/) || isWinner || isLoser) return

            e.preventDefault()
            addGuessedLetter(key)
        }

        document.addEventListener("keypress", handler)

        if ( isWinner || isLoser ) {
            window.scrollTo(0, 0)
        }

        return () => {
            document.removeEventListener("keypress", handler)
        }
    }, [guessedWord])

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key
            if (key !== "Enter") return

            e.preventDefault()
            resetClickHandler()
        }

        document.addEventListener("keypress", handler)

        return () => {
            document.removeEventListener("keypress", handler)
        }
    }, [])

    const helpClickHandler = () => {
        const helpLetter = wordToGuess[Math.floor(Math.random() * wordToGuess.length)]
        setGuessedWord(prevState => [...prevState, helpLetter])
    }

    const resetClickHandler = () => {
        setGuessedWord([])
        setWordToGuess("خانه")
        setWordToGuess(getWord())
    }

    return <section className={styles.section}>
        {isWinner || isLoser ? <h3 className={`${isWinner ? styles.winner : styles.loser}`}>{`${isWinner ? "تبریک شما برنده شدید!" : "متاسفانه شما باختید!"}`} برای شروع دوباره اینتر را فشار دهید</h3> : ""}
        <HangmanShape wrongWordLength={wrongWordGuessed.length}/>
        <HangmanText wordToGuess={wordToGuess} guessedWord={guessedWord} winner={isWinner} loser={isLoser} onHelpClick={helpClickHandler} onResetClick={resetClickHandler}/>
        <HangmanKeyboard wordToGuess={wordToGuess} guessedWord={guessedWord} onKeyClick={addGuessedLetter} />
    </section>
}

export default Hangman;