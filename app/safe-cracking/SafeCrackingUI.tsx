import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

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
          newValue += deltaY > 0 ? -1 : 1;

          if (newValue > 9) newValue = 0;
          if (newValue < 0) newValue = 9;

          handleInputChange(dragging, newValue.toString());
          setStartY(event.touches[0].clientY);
        }
      }
    };

    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
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
        newValue += deltaY > 0 ? -1 : 1;

        if (newValue > 9) newValue = 0;
        if (newValue < 0) newValue = 9;

        handleInputChange(dragging, newValue.toString());
        setStartY(event.clientY);
      }
    }
  };

  const renderDigit = (index: number) => {
    const digit = parseInt(guess[index]) || 0;
    const previousDigit = (digit - 1 + 10) % 10;
    const nextDigit = (digit + 1) % 10;

    return (
      <motion.div 
        className="flex flex-col items-center bg-gray-200 rounded-lg p-4 shadow-inner"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div className="number-display text-2xl font-bold text-gray-400" animate={{ y: dragging === index ? 10 : 0 }}>
          {previousDigit}
        </motion.div>
        <motion.div className="number-display text-4xl font-bold text-gray-800" animate={{ y: dragging === index ? 10 : 0 }}>
          {digit}
        </motion.div>
        <motion.div className="number-display text-2xl font-bold text-gray-400" animate={{ y: dragging === index ? 10 : 0 }}>
          {nextDigit}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 py-8 px-4"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div 
        className="bg-white rounded-lg shadow-2xl p-8 max-w-lg w-full"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center">
          <Lock className="mr-2" /> Crack the Safe
        </h1>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Clues</h2>
          <motion.ul className="space-y-2" initial="hidden" animate="visible" variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}>
            {clues.map((clue, index) => (
              <motion.li
                key={index}
                className="bg-gray-100 p-3 rounded-lg text-gray-700 border border-gray-300 shadow"
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                {clue}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Guess</h2>
          <div className="flex space-x-4 justify-center">
            {guess.map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer select-none"
                onMouseDown={(e) => handleMouseDown(index, e)}
                onTouchStart={(e) => handleTouchStart(index, e)}
              >
                {renderDigit(index)}
              </div>
            ))}
          </div>
        </div>

        <motion.div 
          className="mb-6 text-center"
          animate={{ scale: result ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <p className="text-lg font-semibold text-red-600">{result}</p>
          <p className="text-gray-600 mt-2">Attempts: {attempts}</p>
        </motion.div>

        <div className="flex justify-between">
          <motion.button
            onClick={checkCombination}
            className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg mr-2 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Combination
          </motion.button>
          <motion.button
            onClick={newGame}
            className="w-1/2 bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            New Game
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default SafeCrackingUI;