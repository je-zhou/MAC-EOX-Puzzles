"use client";

import React, { useState, useEffect } from 'react';

const SafeCrackingPage = () => {
  const [correctCombination, setCorrectCombination] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [clues, setClues] = useState<string[]>([]);
  const [guess, setGuess] = useState<string[]>(['', '', '']);
  const [result, setResult] = useState('');
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    newGame();
  }, []);

  const generateRandomCombination = (): number[] => {
    return Array.from({ length: 3 }, () => Math.floor(Math.random() * 10));
  };

  const generateClues = (combination: number[]): string[] => {
    const newClues: string[] = [];
    for (let i = 0; i < 5; i++) {
      let guessClue = generateRandomCombination();
      let correctDigits = 0;
      let correctPositions = 0;

      for (let j = 0; j < 3; j++) {
        if (guessClue[j] === combination[j]) {
          correctPositions++;
        } else if (combination.includes(guessClue[j])) {
          correctDigits++;
        }
      }

      let clueText = `${guessClue.join('')}: `;
      if (correctPositions === 0 && correctDigits === 0) {
        clueText += 'No number correct';
      } else {
        if (correctDigits > 0) {
          clueText += `${correctDigits} digit${correctDigits > 1 ? 's' : ''} correct but in the wrong place`;
          if (correctPositions > 0) clueText += ' and ';
        }
        if (correctPositions > 0) {
          clueText += `${correctPositions} digit${correctPositions > 1 ? 's' : ''} correct and in the right place`;
        }
      }
      newClues.push(clueText);
    }
    return newClues;
  };

  const newGame = () => {
    const newCombination = generateRandomCombination();
    setCorrectCombination(newCombination);
    setAttempts(0);
    setClues(generateClues(newCombination));
    setGuess(['', '', '']);
    setResult('');
    setGameOver(false); // Reset game over status for a new game
  };

  const handleInputChange = (index: number, value: string) => {
    if (gameOver) return; // Prevent input if game is over
    const newGuess = [...guess];
    newGuess[index] = value;
    setGuess(newGuess);
  };

  const checkCombination = () => {
    if (gameOver) return; // Prevent further attempts if the game is over

    const guessNumbers = guess.map((num) => parseInt(num));
    if (guessNumbers.some(isNaN)) {
      setResult('Please enter valid numbers.');
      return;
    }

    setAttempts(attempts + 1);

    let correctDigits = 0;
    let correctPositions = 0;

    for (let i = 0; i < 3; i++) {
      if (guessNumbers[i] === correctCombination[i]) {
        correctPositions++;
      } else if (correctCombination.includes(guessNumbers[i])) {
        correctDigits++;
      }
    }

    if (correctPositions === 3) {
      setResult('Congratulations! You cracked the safe!');
      setGameOver(true); // End the game if they succeed
    } else {
      setResult(
        `${correctDigits} digit(s) correct but in the wrong place, ${correctPositions} digit(s) correct and in the right place.`
      );

      if (attempts + 1 >= 5) {
        setResult('Game Over! You failed to crack the safe in 5 attempts.');
        setGameOver(true); // End the game if the player reaches 5 attempts
      }
    }
  };

  return (
    <div className="game-container">
      <h1 className="text-2xl font-bold mb-4">Crack the Safe</h1>
      <div className="clues space-y-2">
        {clues.map((clue, index) => (
          <div key={index} className="clue">
            {clue}
          </div>
        ))}
      </div>
      <div className="input-container flex space-x-2 my-4">
        {guess.map((digit, index) => (
          <input
            key={index}
            type="number"
            min="0"
            max="9"
            value={digit}
            onChange={(e) => handleInputChange(index, e.target.value)}
            className="w-12 h-12 text-center border border-gray-300 rounded"
            disabled={gameOver} // Disable input if the game is over
          />
        ))}
      </div>
      <div className="space-x-4">
        <button
          onClick={checkCombination}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={gameOver} // Disable the button if the game is over
        >
          Try Combination
        </button>
        <button
          onClick={newGame}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          New Game
        </button>
      </div>
      <div className="result mt-4 font-bold">{result}</div>
      <div className="attempts mt-2">Attempts: {attempts}</div>
    </div>
  );
};

export default SafeCrackingPage;
