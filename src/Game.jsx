import React, {useState, useEffect} from 'react';
import words from './constants/words.js';
import Button from "./components/Button.jsx";
import LetterLines from "./components/LetterLines.jsx";
import Emoji from "./components/Emoji.jsx";
import styles from "./css/Game.module.css";

const shuffleWord = (word) => word.split('').sort(() => 0.5 - Math.random());
const getRandomWordIndex = () => Math.floor(Math.random() * words.length);

function Game() {
    const [wordIndex, setWordIndex] = useState(getRandomWordIndex());
    const [targetWord, setTargetWord] = useState('');
    const [shuffledLetters, setShuffledLetters] = useState([]);
    const [selectedLetters, setSelectedLetters] = useState([]);
    const [attempts, setAttempts] = useState(0);
    const [status, setStatus] = useState('playing');
    const [disabledIndices, setDisabledIndices] = useState([]);

    useEffect(() => {
        const word = words[wordIndex];
        setTargetWord(word);
        setShuffledLetters(shuffleWord(word));
        setSelectedLetters([]);
        setStatus('playing');
        setAttempts(0);
        setDisabledIndices([]);
    }, [wordIndex]);

    function selectLetter(letter, index) {
        if (status !== 'playing' || selectedLetters.length >= targetWord.length || disabledIndices.includes(index)) return;
        const updated = [...selectedLetters, letter];
        setSelectedLetters(updated);
        setDisabledIndices([...disabledIndices, index]);

        if (updated.length === targetWord.length) {
            if (updated.join('') === targetWord) {
                setStatus('win');
            } else {
                const nextAttempts = attempts + 1;
                if (nextAttempts >= 3) {
                    setStatus('lose');
                }
                setAttempts(nextAttempts);
                setSelectedLetters([]);
                setDisabledIndices([]);
            }
        }
    }

    function resetGame() {
        setWordIndex(getRandomWordIndex());
    }

    return (
        <>
            <main className={styles.main}>
                <h1>Unscramble the word</h1>

                <Emoji attempts={attempts} status={status}/>

                <LetterLines targetWord={targetWord} selectedLetters={selectedLetters}/>

                <div className={styles.buttonContainer}>
                    {shuffledLetters.map((letter, index) => (
                        <Button
                            key={index}
                            letter={letter}
                            onClick={() => selectLetter(letter, index)}
                            disabled={disabledIndices.includes(index)}
                        />
                    ))}
                </div>

                {status !== 'playing' && (
                    <div className={styles.messageContainer}>
                        <h2 className={styles.message}>
                            {status === 'win' ? '🎉 YOU WIN!' : '❌ YOU LOSE'}
                        </h2>
                        <p className={styles.word}>
                            {status === 'win'
                                ? `The word was indeed: ${targetWord}`
                                : `The word was: ${targetWord}`}
                        </p>
                        <div className={styles.reset}>
                            <Button letter="Restart" onClick={resetGame}/>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}

export default Game;
