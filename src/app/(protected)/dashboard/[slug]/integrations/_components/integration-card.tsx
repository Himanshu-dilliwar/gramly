import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  title: string;
  description: string;
  icon: React.ReactNode;
  strategy: "INSTAGRAM" | "CRM" | "WhatsApp";
};

const IntegrationCard = ({ title, description, icon, strategy }: Props) => {
  // WIP: wire up fetching data and get the integrations from the db

  return (
    <div className="border-2 border-[#3352CC] rounded-2xl gap-x-5 p-5 flex items-center justify-between">
      {/* Icon */}
      <div className="shrink-0">{icon}</div>

      {/* Content */}
      <div className="flex flex-col gap-y-1">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-[#9D9D9D] text-base w-full md:w-10/12 xl:w-8/12 2xl:w-6/12">
          {description}
        </p>
      </div>
      <Button
        // onClick={!isConnected ? onInstaAuth : undefined}
        // disabled={isConnected}
         className="bg-gradient-to-br from-[#3352CC] to-[#1C2D70] text-white rounded-full text-lg">
        {/* {isConnected ? "Connected" : "Connect"} */}
        Connect
      </Button>
    </div>
  );
};

export default IntegrationCard;
