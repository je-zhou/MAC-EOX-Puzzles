// components/rushhour/levels.ts
import { Car as CarType } from "@/app/types/Car";

export const levels: CarType[][] = [
  [
    // Level 1 configuration
    { id: 1, x: 1, y: 2, length: 2, orientation: "horizontal", isMain: true, image: "/rush-hour/pinkcar-h.png" },
    { id: 2, x: 0, y: 1, length: 3, orientation: "vertical", isMain: false, image: "/rush-hour/longcar-v.png" },
    { id: 3, x: 5, y: 0, length: 3, orientation: "vertical", isMain: false, image: "/rush-hour/longcar-v.png" },
    { id: 4, x: 3, y: 1, length: 3, orientation: "vertical", isMain: false, image: "/rush-hour/longcar-v.png" },
    { id: 5, x: 2, y: 5, length: 3, orientation: "horizontal", isMain: false, image: "/rush-hour/longcar-h.png" },
    { id: 6, x: 0, y: 0, length: 2, orientation: "horizontal", isMain: false, image: "/rush-hour/policecar-h.png" },
    { id: 7, x: 4, y: 4, length: 2, orientation: "horizontal", isMain: false, image: "/rush-hour/policecar-h.png" },
    { id: 8, x: 0, y: 4, length: 2, orientation: "vertical", isMain: false, image: "/rush-hour/policecar-v.png" },
  ],
  [
    // Level 2 configuration
    { id: 1, x: 1, y: 2, length: 2, orientation: "horizontal", isMain: true,  image: "/rush-hour/pinkcar-h.png" },
    { id: 2, x: 3, y: 2, length: 3, orientation: "vertical", isMain: false, image: "/rush-hour/longcar-v.png" },
    { id: 3, x: 5, y: 3, length: 3, orientation: "vertical", isMain: false, image: "/rush-hour/longcar-v.png" },
    { id: 4, x: 1, y: 3, length: 2, orientation: "horizontal", isMain: false, image: "/rush-hour/policecar-h.png" },
    { id: 5, x: 2, y: 5, length: 2, orientation: "horizontal", isMain: false, image: "/rush-hour/policecar-h.png" },
    { id: 6, x: 1, y: 4, length: 2, orientation: "vertical", isMain: false, image: "/rush-hour/policecar-v.png" },
  ],
  [
    // Level 3 configuration
    { id: 1, x: 0, y: 2, length: 2, orientation: "horizontal", isMain: true, image: "/rush-hour/pinkcar-h.png" },
    { id: 2, x: 5, y: 0, length: 3, orientation: "vertical", isMain: false, image: "/rush-hour/longcar-v.png" },
    { id: 3, x: 3, y: 4, length: 3, orientation: "horizontal", isMain: false, image: "/rush-hour/longcar-h.png" },
    { id: 4, x: 3, y: 5, length: 3, orientation: "horizontal", isMain: false, image: "/rush-hour/longcar-h.png" },
    { id: 5, x: 0, y: 3, length: 2, orientation: "horizontal", isMain: false, image: "/rush-hour/taxi-h.png" },
    { id: 6, x: 0, y: 4, length: 2, orientation: "horizontal", isMain: false, image: "/rush-hour/redcar-h.png" },
    { id: 7, x: 0, y: 5, length: 2, orientation: "horizontal", isMain: false, image: "/rush-hour/policecar-h.png" },
    { id: 8, x: 3, y: 0, length: 2, orientation: "horizontal", isMain: false, image: "/rush-hour/redcar-h.png" },
    { id: 9, x: 2, y: 1, length: 2, orientation: "horizontal", isMain: false, image: "/rush-hour/taxi-h.png" },
    { id: 10, x: 4, y: 3, length: 2, orientation: "horizontal", isMain: false, image: "/rush-hour/policecar-h.png" },
    { id: 11, x: 4, y: 1, length: 2, orientation: "vertical", isMain: false, image: "/rush-hour/policecar-v.png" },
    { id: 12, x: 2, y: 2, length: 2, orientation: "vertical", isMain: false, image: "/rush-hour/policecar-v.png" },
    { id: 13, x: 3, y: 2, length: 2, orientation: "vertical", isMain: false, image: "/rush-hour/redcar-v.png" },
    { id: 14, x: 2, y: 4, length: 2, orientation: "vertical", isMain: false, image: "/rush-hour/taxi-v.png" },
  ],
];
