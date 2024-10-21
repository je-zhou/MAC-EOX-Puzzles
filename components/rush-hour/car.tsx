// components/rushhour/Car.tsx
import React from 'react';
import { animated, useSpring } from 'react-spring';
import { useDrag } from '@use-gesture/react';
import { Car as CarType } from '@/app/types/Car';

interface CarProps {
  car: CarType;
  moveCar: (id: number, deltaX: number, deltaY: number) => void;
}

const Car: React.FC<CarProps> = ({ car, moveCar }) => {
  const { x, y, length, orientation, isMain } = car;

  const width = orientation === 'horizontal' ? length * 60 : 60;
  const height = orientation === 'vertical' ? length * 60 : 60;

  const left = x * 60;
  const top = y * 60;

  const bind = useDrag(
    ({ movement: [mx, my], last }) => {
      const deltaX = orientation === 'horizontal' ? Math.round(mx / 60) : 0;
      const deltaY = orientation === 'vertical' ? Math.round(my / 60) : 0;

      if (last) {
        moveCar(car.id, deltaX, deltaY);
      }
    },
    { axis: orientation === 'horizontal' ? 'x' : 'y' }
  );

  return (
    <animated.div
      {...bind()}
      className={`absolute bg-${isMain ? 'red' : 'blue'}-500`}
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
