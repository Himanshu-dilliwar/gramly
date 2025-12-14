import React from "react";
import { Instagram, Database, MessageCircle, } from "lucide-react";

export type IntegrationStrategy = "INSTAGRAM" | "WhatsApp" | "CRM";

type IntegrationCard = {
  title: string;
  description: string;
  icon: React.ReactNode;
  strategy: IntegrationStrategy;
};

export const INTEGRATION_CARDS: IntegrationCard[] = [
  {
    title: "Connect Instagram",
    description:
      "Lorem ipsum dolor sit amet consectetur. Mauris scelerisque tincidunt ultrices.",
    icon: <Instagram className="text-[#E1306C]" size={28} />,
    strategy: "INSTAGRAM",
  },
  {
    title: "Connect WhatsApp",
    description:
      "Lorem ipsum dolor sit amet consectetur. Mauris scelerisque tincidunt ultrices.",
    icon: <MessageCircle className="text-[#00A1E0]" size={28} />,
    strategy: "WhatsApp",
  },
  // {
  //   title: "Connect Salesforece",
  //   description:
  //     "Lorem ipsum dolor sit amet consectetur. Mauris scelerisque tincidunt ultrices.",
  //   icon: <Database className="text-[#00A1E0]" size={28} />,
  //   strategy: "CRM",
  // }
];
