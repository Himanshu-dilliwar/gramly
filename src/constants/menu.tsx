import { Home, Users, Activity, Rocket, Settings } from "lucide-react";

type FieldProps = {
label: string
id: string
count?: number;
}

type SideBarProps = {
icon: React.ReactNode
} & FieldProps

export const SIDEBAR_MENU: SideBarProps[] = [
  {
    id: crypto.randomUUID(),
    label: "Home",
    icon: <Home size={20} />,
  },
  {
    id: crypto.randomUUID(),
    label: "Contacts",
    icon: <Users size={20} />,
    count: 4, // visible on right side
  },
  {
    id: crypto.randomUUID(),
    label: "Automations",
    icon: <Activity size={20} />,
  },
  {
    id: crypto.randomUUID(),
    label: "Integrations",
    icon: <Rocket size={20} />,
  },
  {
    id: crypto.randomUUID(),
    label: "Settings",
    icon: <Settings size={20} />,
  },
];