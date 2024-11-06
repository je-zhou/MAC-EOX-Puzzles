"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import "./landing.css";

export default function LandingPage() {
  const router = useRouter();

  const [gameStatus, setGameStatus] = useState({
    rushHour: false,
    combinationNumber: false,
    haist: false,
  });

  // Save game status
  useEffect(() => {
    const savedStatus = JSON.parse(localStorage.getItem("gameStatus") || "{}");
    setGameStatus((prevStatus) => ({ ...prevStatus, ...savedStatus }));
  }, []);

  // Set new game status after game has been complete
  const handleGameCompletion = (gameName: string) => {
    const updatedStatus = { ...gameStatus, [gameName]: true };
    setGameStatus(updatedStatus);
    localStorage.setItem("gameStatus", JSON.stringify(updatedStatus));
  };

  // Check if all games have been complete
  useEffect(() => {
    if (Object.values(gameStatus).every((status) => status === true)) {
      router.push("/victory");
    }
  }, [gameStatus, router]);

  // List of all games
  const games = [
    {
      name: "H.AI.ST",
      description: "Can you mastermind the heist of the century?",
      imageUrl: "/haist/haist.webp",
      link: "/death-by-ai",
      isCompleted: gameStatus.haist,
      onComplete: () => handleGameCompletion("deathByAI"),
    },
    {
      name: "CODE BREAKER",
      description: "Crack the safe and steal your loot",
      imageUrl: "/safe-cracking/bank-vault.jpg",
      link: "/safe-cracking",
      isCompleted: gameStatus.combinationNumber,
      onComplete: () => handleGameCompletion("combinationNumber"),
    },
    {
      name: "HEIST GETAWAY",
      description: "Escape the cops to complete the heist",
      imageUrl: "/rush-hour/rush-hour.webp",
      link: "/rush-hour",
      isCompleted: gameStatus.rushHour,
      onComplete: () => handleGameCompletion("rushHour"),
    },
  ];

  return (
    // Carousel slider
    <div className="w-full max-w-5xl mx-auto pt-4">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1.5,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="w-full"
      >
        {games.map((game, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <GameTile {...game} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

interface GameTileInterface {
  name: string;
  description: string;
  imageUrl: string;
  link: string;
  isCompleted: boolean;
  onComplete: () => void;
}

function GameTile({
  name,
  description,
  imageUrl,
  link,
  isCompleted,
  onComplete,
}: GameTileInterface) {
  const TileContent = (
    <>
      {isCompleted && (
        <div className="absolute top-4 right-20 z-10 completed">Completed</div>
      )}
      <div
        className={`relative w-64 h-80 bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform transform`}
      >
        <Image
          src={imageUrl}
          alt={name}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-lg hover:opacity-100 transition-opacity"
        />
        {/* Dark overlay for completed games */}
        {isCompleted && (
          <div className="absolute inset-0 bg-black opacity-70 rounded-lg"></div>
        )}
      </div>
      <h1 className="text-2xl text-white title mt-4 patternakan game-title">
        {name}
      </h1>
      <p className="text-md text-white/90 leading-tight pb-10 font-quicksand px-8">
        {description}
      </p>
    </>
  );

  return isCompleted ? (
    <div className="w-full flex flex-col items-center text-center cursor-not-allowed">
      {TileContent}
    </div>
  ) : (
    <Link href={link} className="w-full flex flex-col items-center text-center">
      {TileContent}
    </Link>
  );
}
