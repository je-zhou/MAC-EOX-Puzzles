import { Button } from "@/components/ui/button";
import React from "react";

interface OnboardingProps {
  onReady: () => void;
}

export default function Onboarding({ onReady }: OnboardingProps) {
  return (
    <div className="flex flex-col items-center leading-relaxed space-y-4">
      <h1 className="text-xl font-semibold">Death by AI</h1>
      <p>
        Welcome to Death by AI. You will be presented with 5 scenarios and you
        have 100 seconds to try figure out a way to get yourself out of each
        one.
      </p>

      <p>
        Your idea will be assessed by an AI, who will determine if your idea is
        successful or not.
      </p>

      <p>Survive all 5 scenarios to win yourself a free drink!</p>

      <Button
        onClick={onReady}
        className="font-bold bg-[#FEE22E] text-gray-700"
      >
        I'm ready!
      </Button>
    </div>
  );
}
