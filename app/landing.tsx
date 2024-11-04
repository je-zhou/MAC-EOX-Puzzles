import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  // TODO: I'm thinking we can have a main state that monitors the completion of all 4 games.
  // Implemented, but not thoroughly tested. Test more after the games are merged

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

  return (
    <div className="w-full space-y-4 px-6 py-4">
      <GameTile
        name="HAIST"
        description="Can you mastermind the heist of the century?"
        imageUrl="/haist/haist.webp"
        link="/death-by-ai"
        isCompleted={gameStatus.deathByAI}
        onComplete={() => handleGameCompletion("deathByAI")}
      />
      <GameTile
        name="Code Breaker"
        description="Crack the safe and steal your loot"
        imageUrl="/safe-cracking/bank-vault.jpg"
        link="/safe-cracking"
        isCompleted={gameStatus.combinationNumber}
        onComplete={() => handleGameCompletion("combinationNumber")}
      />
      <GameTile
        name="Rush Hour"
        description="Escape the cops to complete the heist"
        imageUrl="/rush-hour/rush-hour.webp"
        link="/rush-hour"
        isCompleted={gameStatus.rushHour}
        onComplete={() => handleGameCompletion("rushHour")}
      />
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
    <Link href={link} className="w-full flex">
      <div className="w-20 h-20">
        <Image
          src={imageUrl}
          alt={name}
          width={100}
          height={100}
          className="rounded-lg w-full h-full object-cover"
        />
      </div>
      <div className=" px-2 flex flex-col">
        <div className="flex items-center">
          <h1 className="text-lg text-white font-gta">{name}</h1>
          {isCompleted && (
            <span className="ml-2 bg-green-400 h-2 w-2 rounded-full"></span>
          )}
        </div>
        <h2 className="text-white/90 leading-tight">{description} </h2>
      </div>
    </Link>
  );
}
