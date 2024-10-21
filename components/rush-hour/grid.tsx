// components/rushhour/Grid.tsx
import React from 'react';

interface GridProps {
  children: React.ReactNode;
}

const Grid: React.FC<GridProps> = ({ children }) => {
  // Generate grid cells
  const cells = [];
  for (let y = 0; y < 6; y++) {
    for (let x = 0; x < 6; x++) {
      cells.push(
        <div
          key={`${x}-${y}`}
          className="border border-gray-400 box-border"
          style={{ width: '60px', height: '60px' }}
        ></div>
      );
    }
  }

  return (
    <div
      className="relative grid grid-cols-6 grid-rows-6"
      style={{ width: '360px', height: '360px', border: '4px solid gray' }}
    >
      {cells}
      {children}
    </div>
  );
};

export default Grid;
