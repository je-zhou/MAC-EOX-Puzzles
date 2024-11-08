import React, { useState, useEffect } from "react";
import { Lock } from "lucide-react";

interface SafeCrackingUIProps {
  clues: string[];
  guess: string[];
  result: string;
  attempts: number;
  handleInputChange: (index: number, value: string) => void;
  checkCombination: () => void;
  newGame: () => void;
  isCompleted: boolean;
}

const SafeCrackingUI: React.FC<SafeCrackingUIProps> = ({
  clues,
  guess,
  result,
  attempts,
  handleInputChange,
  checkCombination,
  newGame,
}) => {
  const [dragging, setDragging] = useState<number | null>(null);
  const [startY, setStartY] = useState<number | null>(null);

  useEffect(() => {
    const handleTouchMove = (event: TouchEvent) => {
      if (dragging !== null && startY !== null) {
        event.preventDefault();
        const deltaY = event.touches[0].clientY - startY;

        if (Math.abs(deltaY) > 20) {
          let newValue = parseInt(guess[dragging]) || 0;
          newValue += deltaY < 0 ? -1 : 1;

          if (newValue > 9) newValue = 0;
          if (newValue < 0) newValue = 9;

          handleInputChange(dragging, newValue.toString());
          setStartY(event.touches[0].clientY);
        }
      }
    };

    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [dragging, startY, guess, handleInputChange]);

  const handleMouseDown = (index: number, event: React.MouseEvent) => {
    setDragging(index);
    setStartY(event.clientY);
  };

  const handleTouchStart = (index: number, event: React.TouchEvent) => {
    event.preventDefault();
    setDragging(index);
    setStartY(event.touches[0].clientY);
  };

  const handleMouseUp = () => {
    setDragging(null);
    setStartY(null);
  };

  const handleTouchEnd = () => {
    setDragging(null);
    setStartY(null);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (dragging !== null && startY !== null) {
      const deltaY = event.clientY - startY;

      if (Math.abs(deltaY) > 20) {
        let newValue = parseInt(guess[dragging]) || 0;
        newValue += deltaY < 0 ? -1 : 1;

        if (newValue > 9) newValue = 0;
        if (newValue < 0) newValue = 9;

        handleInputChange(dragging, newValue.toString());
        setStartY(event.clientY);
      }
    }
  };

  const renderDigit = (index: number) => {
    const digit = parseInt(guess[index]) || 0;
    const previousDigit = (digit + 1) % 10;
    const nextDigit = (digit - 1 + 10) % 10;

    return (
      <div className="flex flex-col items-center bg-gray-600 bg-opacity-80 rounded-lg p-2 shadow-inner w-12">
        <div className="text-2xl font-bold text-gray-300">
          {previousDigit}
        </div>
        <div className="text-4xl font-bold text-white">
          {digit}
        </div>
        <div className="text-2xl font-bold text-gray-300">
          {nextDigit}
        </div>
      </div>
    );
  };

  return (
    <div
      className="h-auto flex items-start justify-center"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleTouchEnd}
    >
      <div className="bg-gray-800 bg-opacity-90 rounded-lg shadow-2xl p-8 max-w-lg w-full">
        <h1 className="text-center text-4xl font-black text-white title glowing-text">
          Safe Cracker
        </h1>

        <div className="mb-6">
          <h2 className="text-center mt-2 mb-2 text-lg text-gray-200 font-semibold">Guess the combination using the following clues</h2>
          <div className="sticky-note p-4 pb-1 bg-gray-700 bg-opacity-70 text-gray-800 rounded-lg">
            {clues.map((clue, index) => (
              <p key={index} className="handwriting mb-2">
                {clue}
              </p>
            ))}
          </div>
        </div>

        <div className="mb-2">
          <div className="flex justify-center">
            {guess.map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer select-none mx-6"
                onMouseDown={(e) => handleMouseDown(index, e)}
                onTouchStart={(e) => handleTouchStart(index, e)}
              >
                {renderDigit(index)}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4 text-center">
          <p className="mt-2 mb-2 text-lg text-gray-200 font-semibold text-red-400">{result}</p>
          <p className="mt-2 mb-2 text-gray-200">Attempts: {attempts}</p>
        </div>

        <div className="flex justify-between">
          <button
            onClick={checkCombination}
            className="w-1/2 bg-blue-600 hover:bg-blue-800 text-white font-medium py-2 px-3 rounded-lg mr-2 shadow-lg text-base font-semibold"
          >
            Try Combo
          </button>
          <button
            onClick={newGame}
            className="w-1/2 bg-green-600 hover:bg-green-800 text-white font-medium py-2 px-3 rounded-lg shadow-lg text-base font-semibold"
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default SafeCrackingUI;
