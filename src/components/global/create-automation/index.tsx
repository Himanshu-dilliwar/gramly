"use client";

import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";
import Loader from "../loder";
import { useCreateAutomation } from "@/hooks/use-automation";

const CreateAutomation = () => {
  const { mutate, isPending } = useCreateAutomation();

  return (
    <Button
  className="lg:px-10 py-6 bg-gradient-to-br from-[#3352CC] to-[#1C2D70] hover:opacity-80 text-white font-medium rounded-full"
  onClick={() =>
        mutate({
  name: 'Untitled',
  keywords: ['getstarted', 'yes'],
})
      }
>
  <Loader state={isPending}>
    <Activity />
    <p className="lg:inline hidden">Create an Automation</p>
  </Loader>
</Button>

  );
};

export default CreateAutomation;
