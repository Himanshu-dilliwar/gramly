import { Home, Users, Activity, Rocket, Settings } from "lucide-react";
import { Page } from "./page";

type FieldProps = {
label: string
id: string
count?: number;
page: Page;
}

type SideBarProps = {
icon: React.ReactNode
} & FieldProps

export const SIDEBAR_MENU: SideBarProps[] = [
  {
    id: crypto.randomUUID(),
    page: "home",
    label: "Home",
    icon: <Home size={20} />,
  },
  {
    id: crypto.randomUUID(),
    label: "Contacts",
    page: "contacts",
    icon: <Users size={20} />,
    count: 4, // visible on right side
  },
  {
    id: crypto.randomUUID(),
    label: "Automations",
    page: "automations",
    icon: <Activity size={20} />,
  },
  {
    id: crypto.randomUUID(),
    label: "Integrations",
     page: "integrations",
    icon: <Rocket size={20} />,
  },
  {
    id: crypto.randomUUID(),
    label: "Settings",
     page: "settings",
    icon: <Settings size={20} />,
  },
];