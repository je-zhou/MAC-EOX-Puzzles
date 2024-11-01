"use client";

import React from "react";
import LandingPage from "./landing";

const Home: React.FC = () => {
  return (
    <div>
      {/* Header */}
      <header className="w-full bg-opacity-50 text-white text-center text-3xl font-bold font-pattanakarn">
        The Heist
      </header>

      {/* Description */}
      <div className="flex flex-col text-white/80 mt-2 text-center pt-2 space-y-2">
        <p className="">Welcome to the MAC x CISSA EOX Heist!</p>
        <p>Complete the challenges below to earn your star.</p>
      </div>

      {/* Main content */}
      <div className="pt-8">
        <LandingPage />
      </div>
    </div>
  );
};

export default Home;
