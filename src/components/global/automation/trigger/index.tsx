"use client"

import { useQueryAutomation } from "@/hooks/user-queries"
import ActiveTrigger from "./active"

type Props = {
  id: string
}

const Trigger = ({ id }: Props) => {
  const { data } = useQueryAutomation(id)

  // No automation or no triggers
  if (!data?.data || data.data.trigger.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col gap-y-6 items-center">
      {data.data.trigger.map((trigger) => (
        <ActiveTrigger
          key={trigger.id}
          type={trigger.type}
          keywords={data.data.keywords}
        />
      ))}
    </div>
  )
}

export default Trigger
