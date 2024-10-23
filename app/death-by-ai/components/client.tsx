"use client";

import React, { useState } from "react";
import Onboarding from "./onboarding";
import { cn } from "@/lib/utils";
import ChatBox from "./chatbox";
import { Message } from "ai";

export interface DeathByAiQuestionState {
  initialMessages: Message[];
  scenario?: string;
  playerResponse?: string;
}

interface DeathByAiGameState {
  onboarding: boolean;
  question1: DeathByAiQuestionState;
  question2: DeathByAiQuestionState;
  question3: DeathByAiQuestionState;
}

export default function DeathByAiClient() {
  const [gameState, setGameState] = useState<DeathByAiGameState>({
    onboarding: true,
    question1: {
      initialMessages: [
        {
          id: "sys1",
          role: "system",
          content:
            "You are an AI game maker who will generate Miami themed heist scenarios for our players.",
        },
        {
          id: "sys2",
          role: "system",
          content:
            "You will create a series of scenarios that will challenge the player to think creatively to progress the scenario.",
        },
        {
          id: "sys3",
          role: "system",
          content:
            "It will be up to your discretion to decide if the player has successfully completed a scenario. Don't give multiple choice answers.",
        },
        {
          id: "sys4",
          role: "system",
          content: "In your response just provide the scenario",
        },
      ],
    },
    question2: { initialMessages: [] },
    question3: { initialMessages: [] },
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);

  function onUserReady() {
    setGameState({
      ...gameState,
      onboarding: false,
    });

    setCurrentQuestion(1);
  }

  return (
    <div className="relative max-w-xl w-full max-h-full flex flex-col items-center leading-relaxed">
      {/* Onboarding */}
      {/* <div
        className={cn(
          "absolute transition",
          currentQuestion == 0 ? "opacity-100 z-50" : "opacity-0 -z-50"
        )}
      >
        <Onboarding onReady={onUserReady} />
      </div>

      {/* Question
      <div
        className={cn(
          "absolute transition",
          currentQuestion == 1 ? "opacity-100" : "opacity-0"
        )}
      >
        {currentQuestion == 1 && (
          <ChatBox initialMessages={gameState.question1}></ChatBox>
        )}
      </div> 
      */}

      {currentQuestion == 0 && <Onboarding onReady={onUserReady} />}
      {currentQuestion == 1 && (
        <ChatBox questionState={gameState.question1}></ChatBox>
      )}
    </div>
  );
}
