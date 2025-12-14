"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Loader from "@/components/global/loder";
import { Repeat } from "lucide-react";

type Props = {
    id:string
};

const ActivateAutomationButton = ({id}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleActivate = async () => {
    setIsLoading(true);

    // WIP: call activate automation API
    await new Promise((res) => setTimeout(res, 1500));

    setIsLoading(false);
  };

  return (
    <Button
      onClick={handleActivate}
      disabled={isLoading}
      className="px-6 py-2 bg-gradient-to-br from-[#3352CC] to-[#1C2D70] 
                 text-white rounded-full font-medium hover:opacity-80 
                 transition flex items-center gap-x-2"
    >
      <Loader state={isLoading}>
        <>
          <Repeat/>
          <span>Activate</span>
        </>
      </Loader>
    </Button>
  );
};

export default ActivateAutomationButton;
