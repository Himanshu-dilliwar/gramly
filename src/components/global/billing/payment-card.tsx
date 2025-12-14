import React from "react";
import { cn } from "@/lib/utils";
import { PLANS } from "@/constants/page";
import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";

type Props = {
  label: "PRO" | "FREE";
  current: "PRO" | "FREE";
  landing?: boolean;
};

const PaymentCard = ({ label, current, landing = false }: Props) => {
  const PLAN_INDEX = {
    FREE: 0,
    PRO: 2,
  } as const;

  const isCurrent = label === current;
  const isPro = label === "PRO";
  const plan = PLANS[PLAN_INDEX[label]];

  return (
    <div
      className={cn(
        "p-[2px] rounded-xl overflow-hidden",
        isCurrent
          ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          : "bg-inactive"
      )}
    >
      <div className="bg-[#0f0f0f] rounded-xl p-5 h-full flex flex-col gap-y-3">
        {/* TITLE */}
        <h2 className="text-2xl font-semibold">
          {landing
            ? isPro
              ? "Premium Plan"
              : "Standard Plan"
            : isCurrent
            ? "Your Current Plan"
            : current === "PRO"
            ? "Downgrade"
            : "Upgrade"}
        </h2>

        {/* DESCRIPTION */}
        <p className="text-text-secondary text-sm mb-2">
          This is what your plan covers for automations and AI features
        </p>

        {/* PLAN NAME */}
        {isPro ? (
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-3xl font-bold">
            Smart AI
          </span>
        ) : (
          <p className="font-bold text-text-secondary">Standard</p>
        )}

        {/* PRICE */}
        <p className="text-xl">
          <b>{isPro ? plan.monthly : "Free"}</b>
          {isPro && (
            <span className="text-sm text-text-secondary"> / month</span>
          )}
        </p>

        {/* FEATURES */}
        {plan.features.map((feature) => (
          <div key={feature} className="mt-2 flex items-center gap-2">
            <CircleCheck className="text-indigo-500 w-4 h-4" />
            <span className="text-muted-foreground">{feature}</span>
          </div>
        ))}

        {/* BUTTON */}
        {landing ? (
          <Button
            className={cn(
              "rounded-full mt-5",
              isPro
                ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
                : "bg-background/80 text-white hover:bg-background"
            )}
          >
            Get Started
          </Button>
        ) : (
          <Button
            disabled={isCurrent}
            className={cn(
              "rounded-full mt-5",
              isCurrent
                ? "bg-background/80 text-muted-foreground cursor-not-allowed"
                : "bg-background/80 text-white hover:bg-background"
            )}
          >
            {isCurrent
              ? "Active"
              : current === "PRO"
              ? "Downgrade"
              : "Upgrade"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PaymentCard;
