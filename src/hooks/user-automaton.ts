import { createAutomations } from "@/actions/automations"
import { useMutationData } from "./user-mutations"

export const useCreateAutomation = () => {
  const { mutate, isPending } = useMutationData(
    ['create-automation'],
    () => createAutomations(),
    'user-automations'
  )

  return { mutate, isPending }
}
