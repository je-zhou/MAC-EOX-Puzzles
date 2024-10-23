"use client";

import { Message, useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import { DeathByAiQuestionState } from "./client";

interface ChatBoxProps {
  questionState: DeathByAiQuestionState;
}

export default function ChatBox({ questionState }: ChatBoxProps) {
  const { messages, input, append, handleInputChange, handleSubmit } = useChat({
    initialMessages: questionState.initialMessages,
    onFinish(message, options) {
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

  return (
    <div className="flex flex-col w-full max-w-2xl">
      {messages
        .filter((m) => m.role == "assistant")
        .map((m) => (
          <div key={m.id} className=" whitespace-pre-wrap">
            {m.content}
          </div>
        ))}

      <form onSubmit={handleSubmit} className="mt-8">
        <textarea
          className="w-full p-2 mb-8 border border-gray-300 rounded"
          value={input}
          placeholder="My fantastic, awesome, killer plan is to..."
          onChange={handleInputChange}
          maxLength={100} // Add maxLength attribute
        />
      </form>
      <div className="w-full flex justify-between">
        <p>{input.length} / 200</p>
      </div>
    </div>
  );
}
