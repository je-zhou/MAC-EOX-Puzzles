"use client";

import React, { useState, useEffect } from 'react';
import SafeCrackingUI from './SafeCrackingUI'; // Adjust this path based on your structure

const SafeCrackingGame = () => {
  const [correctCombination, setCorrectCombination] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [clues, setClues] = useState<string[]>([]);
  const [guess, setGuess] = useState<string[]>(['0', '0', '0']); // Initialize to 0 0 0
  const [result, setResult] = useState('');

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
        clueText += "No number correct";
      } else {
        if (correctDigits > 0) {
          clueText += `${correctDigits} digit${correctDigits > 1 ? 's' : ''} correct but in the wrong place`;
          if (correctPositions > 0) clueText += " and ";
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
    setGuess(['0', '0', '0']); // Reset guess to 0 0 0
    setResult('');
  };

  const handleInputChange = (index: number, value: string) => {
    const newGuess = [...guess];
    newGuess[index] = value;
    setGuess(newGuess);
  };

  const checkCombination = () => {
    setAttempts(attempts + 1);
    const guessNumbers = guess.map(num => parseInt(num));

    if (guessNumbers.some(isNaN)) {
      setResult("Please enter valid numbers.");
      return;
    }

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
      setResult("Congratulations! You cracked the safe!");
    } else {
      setResult(`${correctDigits} digit(s) correct but in the wrong place, ${correctPositions} digit(s) correct and in the right place.`);
    }
  };

  return (
    <SafeCrackingUI
      clues={clues}
      guess={guess}
      result={result}
      attempts={attempts}
      handleInputChange={handleInputChange}
      checkCombination={checkCombination}
      newGame={newGame}
    />
  );
};

export default SafeCrackingGame;
