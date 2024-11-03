// components/rushhour/levels.ts
import { Car as CarType } from "@/app/types/Car";

export const levels: CarType[][] = [
  [
    // Level 1 configuration
    { id: 1, x: 0, y: 2, length: 2, orientation: "horizontal", isMain: true, color: "red-500", image: "/rush-hour/pinkcar-h.png" },
    { id: 2, x: 0, y: 4, length: 3, orientation: "horizontal", isMain: false, color: "blue-500", image: "/rush-hour/longcar-h.png" },
    { id: 3, x: 2, y: 1, length: 3, orientation: "vertical", isMain: false, color: "green-500", image: "/rush-hour/longcar-v.png" },
  ],
  [
    // Level 2 configuration
    { id: 1, x: 0, y: 2, length: 2, orientation: "horizontal", isMain: true, color: "red-500", image: "/rush-hour/pinkcar-h.png" },
    { id: 4, x: 3, y: 3, length: 2, orientation: "horizontal", isMain: false, color: "purple-500", image: "/rush-hour/policecar-h.png" },
    { id: 5, x: 4, y: 4, length: 2, orientation: "vertical", isMain: false, color: "pink-500", image: "/rush-hour/policecar-v.png" },
  ],
  [
    // Level 3 configuration
    { id: 1, x: 0, y: 2, length: 2, orientation: "horizontal", isMain: true, color: "red-500", image: "/rush-hour/pinkcar-h.png" },
    { id: 6, x: 5, y: 3, length: 3, orientation: "vertical", isMain: false, color: "yellow-500", image: "/rush-hour/longcar-v.png" },
  ],
];