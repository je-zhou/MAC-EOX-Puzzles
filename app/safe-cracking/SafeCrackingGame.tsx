"use client";

import React, { useState, useEffect } from "react";
import SafeCrackingUI from "./SafeCrackingUI";
import { useRouter } from "next/navigation";

const SafeCrackingGame = () => {
  const router = useRouter();
  const [correctCombination, setCorrectCombination] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [clues, setClues] = useState<string[]>([]);
  const [guess, setGuess] = useState<string[]>(["0", "0", "0"]);
  const [result, setResult] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    newGame();
  }, []);

  // Handle game completion
  useEffect(() => {
    if (isCompleted) {
      // Update sessionStorage directly
      try {
        const savedStatus = JSON.parse(sessionStorage.getItem("gameStatus") || "{}");
        const updatedStatus = { ...savedStatus, combinationNumber: true };
        sessionStorage.setItem("gameStatus", JSON.stringify(updatedStatus));
        
        // Redirect to landing page after a short delay
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } catch (error) {
        console.error("Error saving game status:", error);
      }
    }
  }, [isCompleted, router]);

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

      let clueText = `${guessClue.join("")}: `;
      if (correctPositions === 0 && correctDigits === 0) {
        clueText += "0 correct";
      } else {
        if (correctDigits > 0) {
          clueText += `${correctDigits} digit${
            correctDigits > 1 ? "s" : ""
          } misplaced`;
          if (correctPositions > 0) clueText += " and ";
        }
        if (correctPositions > 0) {
          clueText += `${correctPositions} digit${
            correctPositions > 1 ? "s" : ""
          } in place`;
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
    setGuess(["0", "0", "0"]);
    setResult("");
    setIsCompleted(false);
  };

  const handleInputChange = (index: number, value: string) => {
    const newGuess = [...guess];
    newGuess[index] = value;
    setGuess(newGuess);
  };

  const checkCombination = () => {
    setAttempts(attempts + 1);
    const guessNumbers = guess.map((num) => parseInt(num));

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
      setResult("You cracked the safe!");
      setIsCompleted(true); // Set completion state when the game is won
    } else {
      let resultText = ``;

      if (correctPositions === 0 && correctDigits === 0) {
        resultText += "0 correct";
      } else {
        if (correctDigits > 0) {
          resultText += `${correctDigits} digit${
            correctDigits > 1 ? "s" : ""
          } misplaced`;
          if (correctPositions > 0) resultText += " ";
        }
        if (correctPositions > 0) {
          resultText += `${correctPositions} digit${
            correctPositions > 1 ? "s" : ""
          } in place`;
        }
      }

      setResult(resultText);
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
      isCompleted={isCompleted}
    />
  );
};

export default SafeCrackingGame;