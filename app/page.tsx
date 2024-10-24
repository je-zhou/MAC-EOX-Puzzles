"use client";

import Image from 'next/image';
import React from 'react';
import LandingPage from './landing';

const Home: React.FC = () => {
  return (
    <div>

      {/* Header */}
      <header className="w-full bg-opacity-50 text-white text-center text-4xl font-bold">
        Puzzle Challenge
      </header>

      {/* Description */}
      <p className="text-white text-center mt-2 text-2xl font-gta2" style={{ lineHeight: '1' }}>
        Sample description lorem ipsum whatever womp womp
      </p>

      {/* Main content */}
      <div className="pt-4">
        <LandingPage/>
      </div>
    </div>
  );
};

export default Home;
