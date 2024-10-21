// pages/rushhour.tsx
import React from 'react';
import RushHourGame from '@/components/rush-hour/game';

const RushHourPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <RushHourGame />
    </div>
  );
};

export default RushHourPage;
