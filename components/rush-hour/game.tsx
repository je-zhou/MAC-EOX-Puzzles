// components/rushhour/RushHourGame.tsx

"use client";
import React, { useEffect, useState } from "react";

import { Car as CarType } from "@/app/types/Car";
import { useRouter } from "next/navigation";
import Grid from "./grid";
import Car from "./car";
import { levels } from "./levels"; 
import GameModal from "./gameModal";
import GameCompleteModal from "./gameCompleteModal";


export const RushHourGame: React.FC = () => {
  const [gameWon, setGameWon] = useState(false);
  const [level, setLevel] = useState(0); 
  const [cars, setCars] = useState<CarType[]>(levels[level]);
  const [showLevelComplete, setShowLevelComplete] = useState(false);

  useEffect(() => {
    if (showLevelComplete) {
      // Hide the "Level Complete" popup after 2 seconds
      const timer = setTimeout(() => {
        setShowLevelComplete(false);
        // Move to the next level if it exists
        setLevel((prevLevel) => prevLevel + 1);
        setCars(levels[level + 1]);
      }, 2000); // Show popup for 2 seconds

      return () => clearTimeout(timer); // Cleanup on component unmount
    }
  }, [level, showLevelComplete]);

  const handleLevelCompletion = () => {
    if (level < levels.length - 1) {
      // Not the last level, show "Level Complete" popup
      setShowLevelComplete(true);
    } else {
      // Last level, directly set gameWon to true and trigger final screen
      setGameWon(true);
      handleGameCompletion();
    }
  };
  
  const handleGameCompletion = () => {
    const savedStatus = JSON.parse(localStorage.getItem('gameStatus') || '{}');
    const updatedStatus = { ...savedStatus, rushHour: true };
    localStorage.setItem('gameStatus', JSON.stringify(updatedStatus));
  };

  const moveCar = (id: number, deltaX: number, deltaY: number) => {
    if (showLevelComplete) return;

    setCars((prevCars) => {
      const newCars = prevCars.map((car) => {
        if (car.id !== id) return car;

        let newX = car.x + deltaX;
        let newY = car.y + deltaY;

        // Ensure car stays within grid bounds
        if (car.orientation === "horizontal") {
          newX = Math.max(0, Math.min(newX, 6 - car.length));
        } else {
          newY = Math.max(0, Math.min(newY, 6 - car.length));
        }

        // Check for collisions
        const collision = prevCars.some((otherCar) => {
          if (otherCar.id === id) return false;
          return isCollision({ ...car, x: newX, y: newY }, otherCar);
        });

        if (!collision) {
          const updatedCar = { ...car, x: newX, y: newY };

          // **Check for winning condition**
          if (
            updatedCar.isMain &&
            updatedCar.orientation === "horizontal" &&
            updatedCar.x + updatedCar.length === 6 // Car has reached the right edge
          ) {
            // The main car has reached the exit
            handleLevelCompletion();
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
        x: car.orientation === "horizontal" ? car.x + i : car.x,
        y: car.orientation === "vertical" ? car.y + i : car.y,
      });
    }
    return positions;
  };

  return (
    <div className="relative p-2 bg-gray-900 rounded-lg shadow-lg">
      {/* Game Grid */}
      <Grid>
        {cars.map((car) => (
          <Car key={car.id} car={car} moveCar={moveCar} />
        ))}
      </Grid>
      {/* Show "Level Complete" popup if `showLevelComplete` is true */}
      {showLevelComplete && (
        <GameModal message="LEVEL COMPLETE!"/>
      )}
      {gameWon && <GameCompleteModal message="GAME COMPLETE!" />}
    </div>
  );
};
