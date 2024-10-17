"use client";

import React, { useState } from "react";
import Onboarding from "./onboarding";

enum DeathByAiQuestionStatus {
  NotStarted,
  Passed,
  Failed,
}

interface DeathByAiGameState {
  onboarding: boolean;
  question1: DeathByAiQuestionStatus;
  question2: DeathByAiQuestionStatus;
  question3: DeathByAiQuestionStatus;
  question4: DeathByAiQuestionStatus;
  question5: DeathByAiQuestionStatus;
}

export default function DeathByAiClient() {
  const [gameState, setGameState] = useState<DeathByAiGameState>({
    onboarding: true,
    question1: DeathByAiQuestionStatus.NotStarted,
    question2: DeathByAiQuestionStatus.NotStarted,
    question3: DeathByAiQuestionStatus.NotStarted,
    question4: DeathByAiQuestionStatus.NotStarted,
    question5: DeathByAiQuestionStatus.NotStarted,
  });

  const [currentQuestion, setCurrentQuestion] = useState(1);

  function onUserReady() {
    setGameState({
      ...gameState,
      onboarding: false,
    });
  }

  return (
    <div className="max-w-xl w-full max-h-full border rounded-xl shadow-xl bg-white p-4 space-y-4 flex flex-col items-center leading-relaxed">
      {gameState.onboarding ? <Onboarding onReady={onUserReady} /> : null}
      {currentQuestion === 1 ? (
        <div>
          <h1>Question 1</h1>
          <p>Scenario 1</p>
          <button onClick={() => setCurrentQuestion(2)}>Next</button>
        </div>
      ) : null}
    </div>
  );
}
