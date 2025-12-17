"use client";

import { useQueryAutomation } from "@/hooks/user-queries";
import ActiveTrigger from "./active";
import Keywords from "./keywords";
import { Separator } from "@/components/ui/separator";
import ThenAction from "../then/then-action";
import TriggerButton from "../trigger-button";
import { useTriggers } from "@/hooks/use-automation";
import { AUTOMATION_TRIGGERS } from "@/constants/automations";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Loader from "../../loder";

type Props = {
  id: string;
};

const Trigger = ({ id }: Props) => {
  const {types,
    onSetTrigger,
    onSaveTrigger,
    isPending} = useTriggers(id);
  const { data } = useQueryAutomation(id);

  const automation = data?.data;
  const triggers = automation?.trigger ?? [];
  const keywords = automation?.keywords ?? [];

  /* =============================
     CASE 1: TRIGGERS ALREADY EXIST
     ============================= */
  if (automation && triggers.length > 0) {
    return (
      <div className="flex flex-col gap-y-6 items-center">
        {/* Existing triggers */}
        {triggers.map((trigger) => (
          <ActiveTrigger
            key={trigger.id}
            type={trigger.type}
            keywords={keywords}
          />
        ))}

        {/* OR separator (only if >1 trigger) */}
        {triggers.length > 1 && (
          <div className="relative w-6/12 mt-4 flex items-center">
            <Separator className="w-full border-muted" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-2 text-sm text-muted-foreground">
              or
            </span>
          </div>
        )}

        {/* Then action (only if no listener yet) */}
        {!automation.listener && <ThenAction id={id} />}
      </div>
    );
  }

  /* =============================
     CASE 2: NO TRIGGERS → ADD UI
     ============================= */
  return (
    <div className="w-full flex flex-col items-center">
      <TriggerButton label="Add Trigger">
        <div className="flex flex-col gap-y-2 ">
          {AUTOMATION_TRIGGERS.map((trigger) => {
            const isSelected = types.includes(trigger.type);

            return (
              <div
                key={trigger.id}
                onClick={() => onSetTrigger(trigger.type)}
                className={cn(
                  "rounded-xl flex cursor-pointer flex-col p-3 gap-y-2 transition duration-100",
                  "hover:opacity-80",
                  isSelected
                    ? "bg-gradient-to-br from-[#3352CC] to-[#1C2D70] text-white font-medium"
                    : "bg-background-80 text-white"
                )}
              >
                <div className="flex items-center gap-x-2">
                  {trigger.icon}
                  <p className="font-medium">{trigger.label}</p>
                </div>

                <p className="text-sm text-muted-foreground">
                  {trigger.description}
                </p>
              </div>
            );
          })}
          <Keywords id={id} />
          <Button
            type="button"
            onClick={onSaveTrigger}
            disabled={!types?.length || isPending}
            className="w-full bg-gradient-to-br from-[#3352CC] to-[#1C2D70] 
             font-medium text-white disabled:opacity-50"
          >
            <Loader state={isPending}>Create Trigger</Loader>
          </Button>
        </div>
      </TriggerButton>
    </div>
  );
};

export default Trigger;
