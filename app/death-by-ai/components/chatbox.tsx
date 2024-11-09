"use client";

import { FormEvent, useState } from "react";
import { DeathByAiQuestionState } from "./client";
import { Button } from "@/components/ui/button";
import TextStream from "./textStream";
import { CarouselItem } from "@/components/ui/carousel";
import Link from "next/link";
import { redirect } from "next/navigation";
interface ChatBoxProps {
  questionState: DeathByAiQuestionState;
  index: number;
  proceedScenario: (
    newScenario: string,
    history: string[],
    curScenarioNum: number,
    outcome: "success" | "failure"
  ) => void;
}

export default function ChatBox({
  questionState,
  index,
  proceedScenario,
}: ChatBoxProps) {
  const [isJudging, setIsJudging] = useState(false);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<{
    outcome: string;
    scenario: string;
  }>();

  if (questionState.scenario === undefined) return <CarouselItem />;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsJudging(true);

    try {
      const response = await fetch("/api/chat/judge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input,
          scenario: questionState.scenario,
          history: questionState.history,
          index,
        }),
      });

      const text = await response.json();
      const json = JSON.parse(text);

      setResponse(json);
      proceedScenario(
        json.scenario,
        [...questionState.history, json.scenario, input],
        index,
        json.outcome
      );
    } catch (e) {
      // TODO: Handle API traffic error.
    } finally {
      setIsJudging(false);
    }
  }

  const handleGameCompletion = () => {
    const savedStatus = JSON.parse(sessionStorage.getItem("gameStatus") || "{}");
    const updatedStatus = { ...savedStatus, haist: true };
    sessionStorage.setItem("gameStatus", JSON.stringify(updatedStatus));

    window.location.href = "/";
  };

  function FinalComponent() {
    if (isJudging) {
      return <div>Judging...</div>;
    }

    return (
      <Button className="" disabled={response != null}>
        Submit
      </Button>
    );
  }

  return (
    <CarouselItem>
      <div className="flex flex-col w-full space-between h-[calc(100vh-100px)] relative">
        <div className="flex-1 bg-white/90 rounded px-4 py-2 overflow-auto flex flex-col-reverse">
          <TextStream text={questionState.scenario ?? ""} />
        </div>

        {questionState.outcome === "failure" ? (
          <Button onClick={() => window.location.reload()} className="mt-4">
            Try another heist
          </Button>
        ) : index === 4 ? (
          <Button onClick={() => handleGameCompletion()} className="mt-4">
            Complete Heist
          </Button>
        ) : (
          <form
            onSubmit={onSubmit}
            className=" flex flex-col items-center justify-center bottom-0"
          >
            <div className="w-full flex justify-between items-center text-white">
              <h1 className="font-bold text-2xl pb-2 pt-4">Plan</h1>
              <p>{input.length} / 300</p>
            </div>

            <textarea
              className="w-full p-2 border border-gray-300 rounded h-40 mb-4"
              value={input}
              disabled={response !== undefined}
              placeholder="My fantastic, awesome, killer plan is to..."
              onChange={(v) => setInput(v.target.value)}
              maxLength={300} // Add maxLength attribute
            />
            <FinalComponent />
          </form>
        )}
      </div>
    </CarouselItem>
  );
}
