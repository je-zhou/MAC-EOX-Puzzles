"use client";

import React, { useState } from "react";
import Onboarding from "./onboarding";
import ChatBox from "./chatbox";
import { heistScenarios } from "../heists";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
} from "@/components/ui/carousel";

export interface DeathByAiQuestionState {
  history: string[];
  scenario?: string;
  outcome: "success" | "failure";
}

interface DeathByAiGameState {
  1: DeathByAiQuestionState;
  2: DeathByAiQuestionState;
  3: DeathByAiQuestionState;
  4: DeathByAiQuestionState;
}

export default function DeathByAiClient() {
  const [emblaApi, setApi] = React.useState<CarouselApi>();

  const [gameState, setGameState] = useState<DeathByAiGameState>({
    1: {
      history: [],
      scenario:
        heistScenarios[Math.floor(Math.random() * heistScenarios.length)],
      outcome: "success",
    },
    2: { history: [], outcome: "failure" },
    3: { history: [], outcome: "failure" },
    4: { history: [], outcome: "failure" },
  });

  const [currentQuestion, setCurrentQuestion] = useState(-1);

  function onUserReady() {
    setCurrentQuestion(0);
  }

  function proceedScenario(
    newScenario: string,
    history: string[],
    curScenarioNum: number,
    outcome: "success" | "failure"
  ) {
    if (curScenarioNum == 1) {
      setGameState({
        ...gameState,
        2: {
          history,
          outcome,
          scenario: newScenario,
        },
      });
    } else if (curScenarioNum == 2) {
      setGameState({
        ...gameState,
        3: {
          history,
          outcome,
          scenario: newScenario,
        },
      });
    } else if (curScenarioNum == 3) {
      setGameState({
        ...gameState,
        4: {
          history,
          outcome,
          scenario: newScenario,
        },
      });
    }

    emblaApi?.scrollNext();
  }

  return (
    <div>
      {currentQuestion == -1 ? (
        <Onboarding onReady={onUserReady} />
      ) : (
        <Carousel setApi={(api) => setApi(api)}>
          <CarouselContent>
            <ChatBox
              questionState={gameState[1]}
              index={1}
              proceedScenario={proceedScenario}
            />
            <ChatBox
              questionState={gameState[2]}
              index={2}
              proceedScenario={proceedScenario}
            />
            <ChatBox
              questionState={gameState[3]}
              index={3}
              proceedScenario={proceedScenario}
            />
            <ChatBox
              questionState={gameState[4]}
              index={4}
              proceedScenario={proceedScenario}
            />
          </CarouselContent>
        </Carousel>
      )}
    </div>
  );
}
