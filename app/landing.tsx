import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { link } from "fs";

export default function LandingPage() {
  // TODO: I'm thinking we can have a main state that monitors the completion of all 4 games.
  // e.g. once someone has completed game 1, we can like navigate them back to the landing page
  // but show them that game 1 is completed.

  return (
    <div className="w-full space-y-4">
      <GameTile
        name="Rush hour"
        description=""
        imageUrl=""
        link=""
        isCompleted={false}
      />
      <GameTile
        name="Combination number thing like those tiktoks"
        description=""
        imageUrl=""
        link=""
        isCompleted={false}
      />
      <GameTile
        name="Death by AI"
        description=""
        imageUrl=""
        link="/death-by-ai"
        isCompleted={false}
      />
      <GameTile
        name="Jason"
        description=""
        imageUrl=""
        link=""
        isCompleted={false}
      />
      <GameTile
        name="Farm merge valley type puzzle"
        description=""
        imageUrl=""
        link=""
        isCompleted={false}
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
}

function GameTile({
  name,
  description,
  imageUrl,
  link,
  isCompleted,
}: GameTileInterface) {
  return (
    <Link href={link} className="w-full flex">
      <div className="w-20 h-20">
        <Image
          src={imageUrl}
          alt={name}
          className="rounded-lg bg-red-200 w-full h-full"
        />
      </div>
      <div className="p-2">
        <h1>{name}</h1>
      </div>
    </Link>
  );
}
