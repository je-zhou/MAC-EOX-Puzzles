// components/rushhour/RushHourGame.tsx
"use client";
import React, { useState } from 'react';
import Grid from './grid';
import Car from './car';
import { Car as CarType } from '@/app/types/Car';

const initialCars: CarType[] = [
  { id: 1, x: 0, y: 2, length: 2, orientation: 'horizontal', isMain: true },
  { id: 2, x: 2, y: 0, length: 3, orientation: 'vertical', isMain: false },
  // Add more cars as needed
];

const RushHourGame: React.FC = () => {
  const [cars, setCars] = useState<CarType[]>(initialCars);

  const moveCar = (id: number, deltaX: number, deltaY: number) => {
    setCars((prevCars) => {
      const newCars = [...prevCars];
      const carIndex = newCars.findIndex((c) => c.id === id);
      const car = newCars[carIndex];

      let newX = car.x + deltaX;
      let newY = car.y + deltaY;

      // Ensure car stays within grid bounds
      if (car.orientation === 'horizontal') {
        newX = Math.max(0, Math.min(newX, 6 - car.length));
      } else {
        newY = Math.max(0, Math.min(newY, 6 - car.length));
      }

      // Check for collisions
      const collision = newCars.some((otherCar, idx) => {
        if (idx === carIndex) return false;
        return isCollision(
          { ...car, x: newX, y: newY },
          otherCar
        );
      });

      if (!collision) {
        car.x = newX;
        car.y = newY;
      }

      return newCars;
    });
  };

  const isCollision = (carA: CarType, carB: CarType) => {
    const positionsA = getOccupiedPositions(carA);
    const positionsB = getOccupiedPositions(carB);

    return positionsA.some((posA) =>
      positionsB.some((posB) => posA.x === posB.x && posA.y === posB.y)
    );
  };

  const getOccupiedPositions = (car: CarType) => {
    const positions = [];
    for (let i = 0; i < car.length; i++) {
      positions.push({
        x: car.orientation === 'horizontal' ? car.x + i : car.x,
        y: car.orientation === 'vertical' ? car.y + i : car.y,
      });
    }
    return positions;
  };

  return (
    <Grid>
      {cars.map((car) => (
        <Car key={car.id} car={car} moveCar={moveCar} />
      ))}
    </Grid>
  );
};

export default RushHourGame;
