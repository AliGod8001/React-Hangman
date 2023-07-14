/* main import */
import { useState, useEffect, useCallback } from "react";

/* component import */
import Wrapper from "../layout/Wrapper.tsx";
import HangmanShape from "../hangman/HangmanShape.tsx";
import HangmanText from "../hangman/HangmanText.tsx";
import HangmanKeyboard from "../hangman/HangmanKeyboard.tsx";

/* other import */
import _words from '../../data/WORDS.json'
import styles from './Index.module.css'

const getWord = () => {
    return _words[Math.floor(Math.random() * _words.length)]
}

const Index = () => {
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
        const remainLetters = wordToGuess.split("").filter(letter => !guessedWord.includes(letter))
        const helpLetter = remainLetters[Math.floor(Math.random() * remainLetters.length)]
        setGuessedWord(prevState => [...prevState, helpLetter])
    }

    const resetClickHandler = () => {
        setGuessedWord([])
        setWordToGuess("خانه")
        setWordToGuess(getWord())
    }

    return <Wrapper>
        <>
            {isWinner || isLoser ? <h3 className={`${isWinner ? styles.winner : styles.loser}`}>{`${isWinner ? "تبریک شما برنده شدید!" : "متاسفانه شما باختید!"}`} برای شروع دوباره اینتر را فشار دهید</h3> : ""}
        </>
        <HangmanShape wrongWordLength={wrongWordGuessed.length}/>
        <HangmanText wordToGuess={wordToGuess} guessedWord={guessedWord} winner={isWinner} loser={isLoser} onHelpClick={helpClickHandler} onResetClick={resetClickHandler}/>
        <HangmanKeyboard wordToGuess={wordToGuess} guessedWord={guessedWord} onKeyClick={addGuessedLetter} />
    </Wrapper>
}

export default Index;