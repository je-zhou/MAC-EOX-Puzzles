// pages/rushhour.tsx
import React from "react";
import { Quicksand } from "next/font/google";
import { RushHourGame } from "@/components/rush-hour/game";

const quicksand = Quicksand({
  weight: ["400", "700"], // Specify the font weights
  subsets: ["latin"], // Specify the language subsets
});

const RushHourPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center px-6 py-4 space-y-8">
      <div className="flex flex-col items-center justify-center p-8 bg-gray-950 max-w-xl rounded-2xl">
        {/* Title and Description */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black text-white title glowing-text">
            RUSH HOUR
          </h1>
          <p
            className={`mt-4 text-sm text-gray-200 font-semibold ${quicksand.className}`}
          >
            Escape the police after the heist! Move patrol cars to make your
            getaway!
          </p>
        </div>

        {/* Game Component */}
        <RushHourGame />
      </div>
    </div>
  );
};

export default RushHourPage;
