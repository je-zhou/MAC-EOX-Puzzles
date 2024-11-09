// components/rushhour/Car.tsx

import React, { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import { useDrag } from "@use-gesture/react";
import { Car as CarType } from "@/app/types/Car";
import Image from "next/image";

interface CarProps {
  car: CarType;
  moveCar: (id: number, deltaX: number, deltaY: number) => void;
}

const Car: React.FC<CarProps> = ({ car, moveCar }) => {
  const { x, y, length, orientation, isMain, image } = car;

  const cellSize = 35;

  const width = orientation === "horizontal" ? length * cellSize : cellSize;
  const height = orientation === "vertical" ? length * cellSize : cellSize;

  const left = x * cellSize;
  const top = y * cellSize;

  const [offset, setOffset] = useState(0);

  const bind = useDrag(
    ({ delta: [dx, dy], last, movement: [mx, my], memo = 0 }) => {
      const delta = orientation === "horizontal" ? dx : dy;
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
          orientation === "horizontal" ? gridMovement : 0,
          orientation === "vertical" ? gridMovement : 0
        );
      }

      if (last) {
        return undefined; // Reset memo on last event
      }

      return newMemo; // Persist memo between events
    },
    { axis: orientation === "horizontal" ? "x" : "y" }
  );
  const carClasses = `absolute ${image}`;

  return (
    <animated.div
      {...bind()}
      className={carClasses}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        left: `${left + (orientation === "horizontal" ? offset : 0)}px`,
        top: `${top + (orientation === "vertical" ? offset : 0)}px`,
        touchAction: "none",
        userSelect: "none", // Prevent selection
        WebkitUserSelect: "none",
        WebkitTouchCallout: "none", // Disable iOS long-press menu
      }}
      onContextMenu={(e) => e.preventDefault()} // Prevent context menu
    >
      <Image
        src={image}
        alt={`Car ${car.id}`}
        fill
        style={{
          objectFit: "contain",
          userSelect: "none", // Standard CSS property
          WebkitUserSelect: "none", // For Safari
          WebkitTouchCallout: "none", // Disables long-press context menu on iOS
        }}
        draggable={false}
      />
    </animated.div>
  );
};

export default Car;
