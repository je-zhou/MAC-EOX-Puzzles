// components/rushhour/Car.tsx

import React, { useState } from 'react';
import { animated } from 'react-spring';
import { useDrag } from '@use-gesture/react';
import { Car as CarType } from '@/app/types/Car';

interface CarProps {
  car: CarType;
  moveCar: (id: number, deltaX: number, deltaY: number) => void;
}

const Car: React.FC<CarProps> = ({ car, moveCar }) => {
  const { x, y, length, orientation, isMain } = car;

  const cellSize = 60;

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

  const carClasses = `absolute ${isMain ? 'bg-red-500' : 'bg-blue-500'}`;

  return (
    <animated.div
      {...bind()}
      className={carClasses}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        left: `${left}px`,
        top: `${top}px`,
        touchAction: 'none',
      }}
    ></animated.div>
  );
};

export default Car;
