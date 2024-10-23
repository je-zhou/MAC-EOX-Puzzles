import React from "react";
import ChatBox from "./components/chatbox";
import DeathByAiClient from "./components/client";

export default function DeathByAi() {
  return (
    <div className="w-full flex items-center justify-center">
      <DeathByAiClient></DeathByAiClient>
    </div>
  );
}
