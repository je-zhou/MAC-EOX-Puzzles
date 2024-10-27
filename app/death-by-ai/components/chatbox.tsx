"use client";

import { useChat } from "ai/react";
import { FormEvent, useEffect, useState } from "react";
import { DeathByAiQuestionState } from "./client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ChatBoxProps {
  questionState: DeathByAiQuestionState;
  resetHeist: () => void;
}

export default function ChatBox({ questionState, resetHeist }: ChatBoxProps) {
  const [isJudging, setIsJudging] = useState(false);
  const [response, setResponse] = useState<
    | {
        outcome: "success" | "failure";
        scenario: "string";
      }
    | undefined
  >();

  const { input, handleInputChange, messages, append } = useChat({
    initialMessages: questionState.initialMessages,
    onFinish(message) {
      questionState.scenario = message.content;
    },
  });

  useEffect(() => {
    if (!questionState.scenario) {
      append({
        role: "user",
        content: "Give me the scenario",
      });
    }
  }, []);

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
          messages: messages.map((m) => {
            return { role: m.role, content: m.content };
          }),
        }),
      });

      const text = await response.json();
      const json = JSON.parse(text);
      setResponse(json);
    } catch (e) {
    } finally {
      setIsJudging(false);
    }
  }

  function FinalComponent() {
    if (isJudging) {
      return <div>Judging...</div>;
    }

    if (response) {
      const pass = response.outcome === "success";

      return (
        <div>
          <h1 className="font-bold text-2xl py-4">Result</h1>
          <div className="flex flex-col items-center space-y-4 leading-loose">
            <p>{response.scenario}</p>
            {pass ? (
              <Link href={"/"}>
                <Button>Continue the Heist</Button>
              </Link>
            ) : (
              <Button onClick={resetHeist}>Find another heist</Button>
            )}
          </div>
        </div>
      );
    }

    return <Button>Submit</Button>;
  }

  return (
    <div className="flex flex-col w-full max-w-2xl">
      <h1 className="font-bold text-2xl pb-4">Mission</h1>
      {messages
        .filter((m) => m.role == "assistant")
        .map((m) => (
          <div key={m.id} className=" whitespace-pre-wrap leading-loose">
            {m.content}
          </div>
        ))}

      <h1 className="font-bold text-2xl py-4">Plan</h1>

      <form
        onSubmit={onSubmit}
        className=" flex flex-col items-center justify-center"
      >
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          value={input}
          disabled={response !== undefined}
          placeholder="My fantastic, awesome, killer plan is to..."
          onChange={handleInputChange}
          maxLength={300} // Add maxLength attribute
        />
        <div className="w-full flex justify-between pb-4">
          <p>{input.length} / 300</p>
        </div>
        <FinalComponent />
      </form>
    </div>
  );
}
