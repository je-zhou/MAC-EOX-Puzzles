"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import "./landing.css";

export default function LandingPage() {
  const router = useRouter();
  
  const [gameStatus, setGameStatus] = useState({
    rushHour: false,
    combinationNumber: false,
    deathByAI: false,
  });

  useEffect(() => {
    const savedStatus = JSON.parse(localStorage.getItem("gameStatus") || "{}");
    setGameStatus((prevStatus) => ({ ...prevStatus, ...savedStatus }));
  }, []);

  const handleGameCompletion = (gameName: string) => {
    const updatedStatus = { ...gameStatus, [gameName]: true };
    setGameStatus(updatedStatus);
    localStorage.setItem("gameStatus", JSON.stringify(updatedStatus));
  };

  useEffect(() => {
    if (Object.values(gameStatus).every((status) => status === true)) {
      router.push("/victory");
    }
  }, [gameStatus, router]);

  const games = [
    {
      name: "H.AI.ST",
      description: "Can you mastermind the heist of the century?",
      imageUrl: "/haist/haist.webp",
      link: "/death-by-ai",
      isCompleted: gameStatus.deathByAI,
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
    <div className="w-full max-w-5xl mx-auto py-10">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        loop={true}  // Enable infinite looping
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
  return (
    <Link href={link} className="w-full flex flex-col items-center text-center">
      <div className="relative w-64 h-80 bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
        <Image
          src={imageUrl}
          alt={name}
          fill 
          style={{ objectFit: "cover" }}
          className="rounded-lg opacity-90 hover:opacity-100 transition-opacity"
        />
      </div>
      <h1 className="text-lg text-white title mt-4 patternakan glowing-text">{name}</h1>
      <p className="text-sm text-white/90 leading-tight pb-10 font-quicksand">{description}</p>
      {isCompleted && (
        <span className="mt-2 bg-green-400 h-2 w-2 rounded-full"></span>
      )}
    </Link>
  );
}
