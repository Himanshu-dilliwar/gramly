import PlaneBlue from "@/icons/plainBlue.svg"
import InstagramBlue from "@/icons/instagramBlue.svg"
import { BotMessageSquare } from "lucide-react"
import { ReactNode } from "react"

export type AutomationListenerProps = {
  id: string
  label: string
  description: string
  icon: ReactNode
  type: "SMARTAI" | "MESSAGE"
}
export const AUTOMATION_LISTENERS: AutomationListenerProps[] = [
  {
    id: "message",
    label: "Send the user a message",
    icon: <PlaneBlue />,
    description: "Enter the message that you want to send the user.",
    type: "MESSAGE",
  },
  {
    id: "smartAi",
    label: "Let Smart AI take over",
    icon: <BotMessageSquare size={18}/>,
    description:
      "Tell AI about your project. (Upgrade to use this feature)",
    type: "SMARTAI",
  },
]


export type AutomationsTriggerProps = {
  id: string
  label: string
  icon: ReactNode
  description: string
  type: "COMMENT" | "DM"
}

export const AUTOMATION_TRIGGERS: AutomationsTriggerProps[] = [
  {
    id: "comment",
    label: "User comments on my post",
    icon: <InstagramBlue />,
    description: "Select if you want to automate comments on your post",
    type: "COMMENT",
  },
  {
    id: "dm",
    label: "Replies to my DMs",
    icon: <PlaneBlue/>,
    description: "Select if you want to automate DMs on your profile",
    type: "DM",
  },
]
