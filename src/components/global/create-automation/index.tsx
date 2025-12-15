"use client";

import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";
import Loader from "../loder";
import { useCreateAutomation } from "@/hooks/user-mutations";

const CreateAutomation = () => {
  const { mutate, isPending } = useCreateAutomation();

  return (
    <Button
      onClick={() => mutate()}
      disabled={isPending}
      className="lg:px-10 py-6 bg-gradient-to-br from-[#3352CC] to-[#1C2D70] text-white rounded-full"
    >
      <Loader state={isPending}>
        <Activity />
        <span className="lg:inline hidden ml-2">
          Create an Automation
        </span>
      </Loader>
    </Button>
  );
};

export default CreateAutomation;
