"use client";

import { useState } from "react";
import Link from "next/link";
import CustomCard from "@/components/CustomCard"; // Your custom card component with fixed dimensions (190x254 outer, 180x244 inner)
import { Divider } from "@heroui/divider"; // HeroUI Divider
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // shadcn-ui radio group components
import { RippleButton } from "@/components/magicui/ripple-button";
import { ShimmerButton } from "@/components/magicui/shimmer-button";

// Define a type for a step
type Step = {
  label: string;
  positive: number | string;
  negative: number | string;
};

// Define the algorithm steps with proper typing
const steps: Record<number, Step> = {
  1: { label: "HBsAg", positive: 2, negative: 4 },
  2: { label: "IgM anti-HBc", positive: 3, negative: "Chronic HBV carrier" },
  3: { label: "IgG anti-HBc", positive: "Acute flare of chronic HBV", negative: "Acute HBV: early phase" },
  4: { label: "IgM anti-HBc", positive: "Acute HBV: window phase", negative: 5 },
  5: { label: "IgG anti-HBc", positive: 6, negative: 7 },
  6: { label: "Anti-HBe", positive: "Acute HBV: recovery phase", negative: "Immune due to natural HBV infection" },
  7: { label: "Anti-HBs", positive: "Vaccinated", negative: "Susceptible (consider vaccination)" },
};

export default function HBVInterpreterPage() {
  // State variables
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");
  const [outcome, setOutcome] = useState<string | null>(null);
  const [history, setHistory] = useState<Array<{ step: number; answer: string }>>([]);

  // Get data for the current step
  const currentStepData = steps[currentStep];

  // Handler for the Next button (or Reset when outcome is reached)
  const handleNext = () => {
    if (!selectedOption) return; // Guard: button is disabled if no option selected

    // Record the current answer
    setHistory((prev) => [...prev, { step: currentStep, answer: selectedOption }]);

    // Determine next branch based on selected answer
    const branch = currentStepData[selectedOption.toLowerCase() as "positive" | "negative"];
    if (typeof branch === "number") {
      setCurrentStep(branch);
      setSelectedOption("");
    } else {
      setOutcome(branch);
    }
  };

  // Handler for the Back button (within the card)
  const handleBack = () => {
    if (history.length === 0) return;
    const lastEntry = history[history.length - 1];
    if (outcome) {
      setOutcome(null);
      setCurrentStep(lastEntry.step);
      setSelectedOption(lastEntry.answer);
      setHistory(history.slice(0, history.length - 1));
    } else {
      setSelectedOption("");
      setCurrentStep(lastEntry.step);
      setHistory(history.slice(0, history.length - 1));
    }
  };

  // Handler for Reset (when outcome is reached)
  const handleReset = () => {
    setCurrentStep(1);
    setSelectedOption("");
    setOutcome(null);
    setHistory([]);
  };

  const isFirstStep = history.length === 0 && !outcome;
  const isOutcome = outcome !== null;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative">
      {/* Top-left Back button to go back to the algorithms page */}
      <div className="absolute top-4 left-4">
        <Link href="/algorithms">
          <ShimmerButton className="shadow-2xl">
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
              Back
            </span>
          </ShimmerButton>
        </Link>
      </div>

      {/* Centered Custom Card */}
      <CustomCard>
        {/* Wrap content in an inner container with extra padding and full height */}
        <div className="flex flex-col h-full justify-between px-3 py-3">
          {/* Top Section: Header, Divider, and Body */}
          <div className="space-y-2">
            {/* Card Header */}
            <div>
              <h1 className="text-xl font-bold">HBV Serology Interpreter</h1>
            </div>
            <Divider className="my-2" />
            {/* Card Body */}
            <div>
              {isOutcome ? (
                // Outcome: display final result in larger bold font
                <p className="text-2xl font-bold">{outcome}</p>
              ) : (
                <>
                  {/* Current step label */}
                  <p className="font-bold">{currentStepData.label}</p>
                  {/* Radio Group with explicit labels */}
                  <RadioGroup value={selectedOption} onValueChange={(value: string) => setSelectedOption(value)}>
                    <div className="flex flex-col space-y-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Positive" id="radio-positive" />
                        <label htmlFor="radio-positive" className="text-white">Positive</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Negative" id="radio-negative" />
                        <label htmlFor="radio-negative" className="text-white">Negative</label>
                      </div>
                    </div>
                  </RadioGroup>
                </>
              )}
            </div>
          </div>

          {/* Bottom Section: Navigation Buttons */}
          <div className="flex justify-between mt-3">
            <RippleButton rippleColor="#ADD8E6" onClick={handleBack} disabled={isFirstStep}>
              <span className="font-bold">Back</span>
            </RippleButton>
            {isOutcome ? (
              <RippleButton rippleColor="#ADD8E6" onClick={handleReset}>
                <span className="font-bold">Reset</span>
              </RippleButton>
            ) : (
              <RippleButton rippleColor="#ADD8E6" onClick={handleNext} disabled={!selectedOption}>
                <span className="font-bold">Next</span>
              </RippleButton>
            )}
          </div>
        </div>
      </CustomCard>
    </div>
  );
}
