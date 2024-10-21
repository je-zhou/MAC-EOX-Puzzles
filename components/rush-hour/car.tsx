// components/rushhour/Car.tsx

import React from 'react';
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

  const bind = useDrag(
    ({ movement: [mx, my], last }) => {
      const deltaX = orientation === 'horizontal' ? Math.round(mx / cellSize) : 0;
      const deltaY = orientation === 'vertical' ? Math.round(my / cellSize) : 0;

      if (last) {
        moveCar(car.id, deltaX, deltaY);
      }
    },
    { axis: orientation === 'horizontal' ? 'x' : 'y' }
  );

  // Use conditional class names
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
