import { Button } from "@/components/ui/button";
import React from "react";

interface OnboardingProps {
  onReady: () => void;
}

export default function Onboarding({ onReady }: OnboardingProps) {
  return (
    <div className="flex flex-col items-center leading-relaxed space-y-4 text-center text-white">
      <h1 className="text-xl font-semibold">
        The H<span className=" italic font-bold underline">AI</span>st
      </h1>
      <p>
        MAC X CISSA need your help to pull off this heist. Once you're presented
        with your mission, it will be up to you to decide what to do next.
      </p>

      <p>Do you have what it takes to pull off the heist?</p>

      <Button
        onClick={onReady}
        className="font-bold bg-[#FEE22E] text-gray-700"
      >
        I'm ready!
      </Button>
    </div>
  );
}
