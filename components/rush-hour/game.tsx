// components/rushhour/RushHourGame.tsx

"use client";
import React, { useState } from 'react';
import Grid from './Grid';
import Car from './Car';
import { Car as CarType } from '@/app/types/Car';

const initialCars: CarType[] = [
  // Main car (placed on the 2nd row)
  {
    id: 1,
    x: 1,
    y: 2, // 2nd row (index starts at 0)
    length: 2,
    orientation: 'horizontal',
    isMain: true,
  },
  // Other cars
  {
    id: 2,
    x: 0,
    y: 0,
    length: 3,
    orientation: 'vertical',
    isMain: false,
  },
  {
    id: 3,
    x: 4,
    y: 1,
    length: 2,
    orientation: 'vertical',
    isMain: false,
  },
  // Add more cars as needed
];

const RushHourGame: React.FC = () => {
  const [cars, setCars] = useState<CarType[]>(initialCars);
  const [gameWon, setGameWon] = useState(false);

  const moveCar = (id: number, deltaX: number, deltaY: number) => {
    setCars((prevCars) => {
      const newCars = prevCars.map((car) => {
        if (car.id !== id) return car;

        let newX = car.x + deltaX;
        let newY = car.y + deltaY;

        // Ensure car stays within grid bounds
        if (car.orientation === 'horizontal') {
          newX = Math.max(0, Math.min(newX, 6 - car.length));
        } else {
          newY = Math.max(0, Math.min(newY, 6 - car.length));
        }

        // Check for collisions
        const collision = prevCars.some((otherCar) => {
          if (otherCar.id === id) return false;
          return isCollision(
            { ...car, x: newX, y: newY },
            otherCar
          );
        });

        if (!collision) {
          const updatedCar = { ...car, x: newX, y: newY };

          // **Check for winning condition**
          if (
            updatedCar.isMain &&
            updatedCar.orientation === 'horizontal' &&
            updatedCar.x + updatedCar.length === 6 // Car has reached the right edge
          ) {
            // The main car has reached the exit
            setGameWon(true);
          }

          return updatedCar;
        } else {
          return car; // No movement due to collision
        }
      });

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
    <div className="relative">
      <Grid>
        {cars.map((car) => (
          <Car key={car.id} car={car} moveCar={moveCar} />
        ))}
      </Grid>
      {gameWon && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <h2 className="text-2xl font-bold">Congratulations! You Win!</h2>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => {
                // Reset the game or navigate to another page
                setGameWon(false);
                setCars(initialCars);
              }}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RushHourGame;
