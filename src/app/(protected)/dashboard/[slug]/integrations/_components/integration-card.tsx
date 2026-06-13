"use client"
import { onOAuthInstagram } from "@/actions/integrations";
import { onUserInfo } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type Props = {
  title: string;
  description: string;
  icon: React.ReactNode;
  strategy: "INSTAGRAM" | "WHATSAPP";
};


const IntegrationCard = ({ title, description, icon, strategy }: Props) => {
  const onInstaOAuth = () => onOAuthInstagram(strategy)

  const { data } = useQuery({
    queryKey: ["user-profile"],
    queryFn: onUserInfo,
  })

  const integrated = data?.data?.integrations?.find(
    (integration) => integration.name === strategy
  )

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
        onClick={onInstaOAuth}
        disabled={integrated?.name === strategy}
         className="bg-gradient-to-br from-[#3352CC] to-[#1C2D70] text-white rounded-full text-lg">
        {integrated ? "Connected" : "Connect"}
      </Button>
    </div>
  );
};

export default IntegrationCard;
