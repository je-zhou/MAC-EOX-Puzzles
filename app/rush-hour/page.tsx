// pages/rushhour.tsx
import React from 'react';
import RushHourGame from '@/components/rush-hour/Game';

const RushHourPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
    <div className="flex flex-col items-center justify-center p-8 bg-gray-900 max-w-xl rounded-2xl">
      {/* Title and Description */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-white">Rush Hour Puzzle Game</h1>
        <p className="mt-4 text-sm text-gray-200 font-mono font-medium">
          Help the red car escape the traffic jam! Move the cars blocking its path to clear the way.
        </p>
      </div>

      {/* Game Component */}
      <RushHourGame />
    </div>
    </div>
  );
};

export default RushHourPage;
