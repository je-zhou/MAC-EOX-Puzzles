// components/rushhour/Car.tsx

import React, { useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { useDrag } from '@use-gesture/react';
import { Car as CarType } from '@/app/types/Car';

interface CarProps {
  car: CarType;
  moveCar: (id: number, deltaX: number, deltaY: number) => void;
}

const Car: React.FC<CarProps> = ({ car, moveCar }) => {
  const { x, y, length, orientation, isMain, color } = car;

  const cellSize = 35;

  const width = orientation === 'horizontal' ? length * cellSize : cellSize;
  const height = orientation === 'vertical' ? length * cellSize : cellSize;
  
  const left = x * cellSize;
  const top = y * cellSize;

  const [offset, setOffset] = useState(0);

  const bind = useDrag(
    ({ delta: [dx, dy], last, movement: [mx, my], memo = 0 }) => {
      const delta = orientation === 'horizontal' ? dx : dy;
      const move = delta / cellSize;

      // Accumulate the movement
      const accumulated = memo + move;

      // Calculate how many grid cells to move
      const gridMovement = Math.trunc(accumulated);

      // Update the memo
      const newMemo = accumulated - gridMovement;

      if (gridMovement !== 0) {
        // Move the car by gridMovement cells
        moveCar(
          car.id,
          orientation === 'horizontal' ? gridMovement : 0,
          orientation === 'vertical' ? gridMovement : 0
        );
      }

      if (last) {
        return undefined; // Reset memo on last event
      }

      return newMemo; // Persist memo between events
    },
    { axis: orientation === 'horizontal' ? 'x' : 'y' }
  );

  // **Map of color names to Tailwind CSS classes**
  const colorClassMap: { [key: string]: string } = {
    'red-500': 'bg-red-500',
    'blue-500': 'bg-blue-500',
    'green-500': 'bg-green-500',
    'yellow-500': 'bg-yellow-500',
    'purple-500': 'bg-purple-500',
    'pink-500': 'bg-pink-500',
    'orange-500': 'bg-orange-500',
    // Add more colors as needed
  };

  // **Get the class name for the car's color**
  const colorClass = colorClassMap[color] || 'bg-gray-500'; // Default to gray if color not found

  const carClasses = `absolute ${colorClass} rounded-xl`;


  return (
    <animated.div
      {...bind()}
      className={carClasses}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        left: `${left + (orientation === 'horizontal' ? offset : 0)}px`,
        top: `${top + (orientation === 'vertical' ? offset : 0)}px`,
        touchAction: 'none',
      }}
    ></animated.div>
  );
};

export default Car;
