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
      <div className="flex flex-col items-center bg-gray-200 rounded-lg p-4 shadow-inner">
        <div className="number-display text-2xl font-bold text-gray-400">
          {previousDigit}
        </div>
        <div className="number-display text-4xl font-bold text-gray-800">
          {digit}
        </div>
        <div className="number-display text-2xl font-bold text-gray-400">
          {nextDigit}
        </div>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 py-8 px-4"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleTouchEnd}
    >
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center">
          <Lock className="mr-2" /> Crack the Safe
        </h1>

        {/* Safe Image Positioned Below the Title */}
        <div className="flex justify-center mb-6">
          <img
            src="/safe-background.png"
            alt="Safe"
            className="w-48 h-48 object-contain"
          />
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Clues</h2>
          <div className="sticky-note p-4">
            {clues.map((clue, index) => (
              <p key={index} className="handwriting mb-2">
                {clue}
              </p>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Your Guess
          </h2>
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

        <div className="mb-6 text-center">
          <p className="text-lg font-semibold text-red-600">{result}</p>
          <p className="text-gray-600 mt-2">Attempts: {attempts}</p>
        </div>

        <div className="flex justify-between">
          <button
            onClick={checkCombination}
            className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg mr-2 shadow-lg"
          >
            Try Combination
          </button>
          <button
            onClick={newGame}
            className="w-1/2 bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg"
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default SafeCrackingUI;
