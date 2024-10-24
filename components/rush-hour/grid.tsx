// components/rushhour/Grid.tsx

import React from "react";

interface GridProps {
  children: React.ReactNode;
}

const Grid: React.FC<GridProps> = ({ children }) => {
  // Generate grid cells
  const cellSize = 35;
  const rows = 6;

  const cells = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < rows; x++) {
      cells.push(
        <div
          key={`${x}-${y}`}
          className="border border-gray-700 box-border"
          style={{ width: `${cellSize}`, height: `${cellSize}` }}
        ></div>
      );
    }
  }

  return (
    <div className="relative" style={{ width: `${cellSize*rows}`, height: `${cellSize*rows}` }}>
      <div
        className="relative grid grid-cols-6 grid-rows-6 border-4 border-black-800"
        style={{
          width: `${cellSize*rows}`,
          height: `${cellSize*rows}`,
          gridTemplateColumns: `repeat(6, ${cellSize}px)`,
          gridTemplateRows: `repeat(6, ${cellSize}px)`,
          border: "1px solid gray",
        }}
      >
        {cells}
        {children}
      </div>

      {/* EXIT Label */}
      <div
        className="absolute flex items-center justify-center transform"
        style={{
          left: `${cellSize*rows + 10}px`, // Position to the right of the grid
          top: `${cellSize*2}px`, // Align with the exit cell (2 * 60px)
          width: `${cellSize}px`,
          height: `${cellSize}px`,
        }}
      >
        <span className="text-lg font-medium text-white">EXIT</span>
      </div>
    </div>
  );
};

export default Grid;
