
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
    <div className="w-full space-y-4">
      <GameTile
        name="Rush hour"
        description=""
        imageUrl="/rush-hour/rush-hour.webp"
        link="/rush-hour"
        isCompleted={gameStatus.rushHour}
        onComplete={() => handleGameCompletion("rushHour")}
      />
      <GameTile
        name="Code Breaker"
        description=""
        imageUrl="/safe-cracking/bank-vault.jpg"
        link="/safe-cracking"
        isCompleted={gameStatus.combinationNumber}
        onComplete={() => handleGameCompletion("combinationNumber")}
      />
      <GameTile
        name="Death by AI"
        description=""
        imageUrl=""
        link="/death-by-ai"
        isCompleted={gameStatus.deathByAI}
        onComplete={() => handleGameCompletion("deathByAI")}
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
          className="rounded-lg bg-red-200 w-full h-full"
        />
      </div>
      <div className="p-4 flex items-center">
        <h1 className="text-xl text-white font-gta">{name}</h1>
        {isCompleted && <span className="ml-2 text-green-500">Completed</span>}
      </div>
    </Link>
  );
}