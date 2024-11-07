"use client";

import React from "react";
import LandingPage from "./landing";
import "./landing.css";

const Home: React.FC = () => {
  return (
    <div className="">
      {/* Header */}
      <header className="w-full bg-opacity-50 text-white text-center text-4xl font-bold font-pattanakarn title pt-4 glowing-text">
        THE HEIST
      </header>

      {/* Description */}
      <div className="flex flex-col text-white/80 mt-2 text-center pt-2 space-y-2 px-4">
        <p className="description">Complete the challenges to earn 2 stars</p>
      </div>

      {/* Main content */}
      <div className="">
        <LandingPage />
      </div>
    </div>
  );
};

export default Home;
