'use client';

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Tag,
  MessageSquare,
  Bolt,
} from "lucide-react"; // Lucide icons

const steps = [
  {
    number: "01",
    title: "Set keywords",
    stepTitle: "Define the words that trigger automation",
    description:
      "Choose keywords your audience uses when they message you. Gramly learns these patterns and prepares to respond the moment someone sends them your way.",
    Icon: Tag,
    buttonText: "Configure",
    nextText: "Next",
  },
  {
    number: "02",
    title: "Craft responses",
    stepTitle: "Build messages that match your brand voice",
    description:
      "Write default responses or let AI generate them for you. Either way, your messages stay authentic and on brand while reaching people instantly.",
    Icon: MessageSquare,
    buttonText: "Customize",
    nextText: "Next",
  },
  {
    number: "03",
    title: "Watch it work",
    stepTitle: "Sit back as automation handles your engagement",
    description:
      "Gramly takes over from here. Every keyword match triggers a response, every comment gets engagement, and every conversation becomes a potential lead without your constant attention.",
    Icon: Bolt,
    buttonText: "Monitor",
    nextText: "Done",
  },
];

export default function StepsSection() {
  return (
    <div className="flex flex-col items-center w-full">
      {steps.map((step) => {
        const IconComponent = step.Icon;

        return (
          <section
            key={step.number}
            className="w-full bg-white border-t border-black"
          >
            <div className="w-full max-w-[1440px] mx-auto px-10 md:px-20 py-0">
              <div className="w-full max-w-[1280px] mx-auto">
                <div className="flex flex-col gap-6 md:gap-12 items-center w-full">
                  
                  {/* Step Header */}
                  <div className="flex items-center w-full py-2 md:py-4 bg-white">
                    <span className="text-base md:text-lg font-semibold text-black">
                      {step.number}
                    </span>
                    <span className="ml-3 md:ml-6 text-base md:text-lg font-semibold text-black">
                      {step.title}
                    </span>
                  </div>

                  {/* Step Content */}
                  <div className="flex flex-col lg:flex-row items-center w-full gap-8 lg:gap-12 mb-14 md:mb-28">

                    {/* Text */}
                    <div className="flex flex-col w-full lg:w-1/2 lg:pr-8">
                      <span className="text-sm md:text-base font-semibold text-black mb-2">
                        Step
                      </span>

                      <div className="flex flex-col gap-3 md:gap-6 max-w-[88%] mb-4">
                        <h2 className="text-2xl md:text-4xl font-bold text-black">
                          {step.stepTitle}
                        </h2>
                        <p className="text-base md:text-lg text-black">
                          {step.description}
                        </p>
                      </div>

                      <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-8">
                        <Button
                          variant="outline"
                          className="w-full md:w-auto border-black text-black bg-transparent px-6 py-3 text-sm md:text-base"
                        >
                          {step.buttonText}
                        </Button>

                        <div className="flex items-center w-full md:w-auto px-3 md:px-6">
                          <span className="text-sm md:text-base text-black">
                            {step.nextText}
                          </span>
                          <span className="ml-2 md:ml-3 text-black">→</span>
                        </div>
                      </div>
                    </div>

                    {/* Icon instead of Image */}
                    <div className="w-full lg:w-1/2 flex justify-center items-center">
                      <IconComponent
                        size={180}
                        strokeWidth={1.5}
                        className="text-black opacity-90"
                      />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
