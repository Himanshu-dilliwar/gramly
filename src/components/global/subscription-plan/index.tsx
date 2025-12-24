import { useQueryUser } from "@/hooks/user-queries"
import React from "react"

type Props = {
  children: React.ReactNode
  type: "PRO" | "FREE"
}

const SubscriptionPlans = ({ children, type }: Props) => {
  const { data, isLoading } = useQueryUser()
  console.log("PLAN:", data?.data?.subscription?.plan, "EXPECTED:", type)

  if (isLoading) return null

  const plan = data?.data?.subscription?.plan ?? "FREE"
  
  if (plan !== type) return null

  return <>{children}</>
}

export default SubscriptionPlans
