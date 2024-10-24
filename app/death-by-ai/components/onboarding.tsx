import { Button } from "@/components/ui/button";
import React from "react";

interface OnboardingProps {
  onReady: () => void;
}

export default function Onboarding({ onReady }: OnboardingProps) {
  return (
    <div className="flex flex-col items-center leading-relaxed space-y-4 text-center">
      <h1 className="text-xl font-semibold">
        The H<span className=" italic font-bold underline">AI</span>st
      </h1>
      <p>
        MAC X CISSA need you to help us pull off a heist. You will be presented
        with scenarios generated by an AI, and its up to you to find a way to
        progress.
      </p>

      <p>Can you outsmart the AI and help us pull off the heist?</p>

      <Button
        onClick={onReady}
        className="font-bold bg-[#FEE22E] text-gray-700"
      >
        I'm ready!
      </Button>
    </div>
  );
}
