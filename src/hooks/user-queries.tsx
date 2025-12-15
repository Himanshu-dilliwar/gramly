import { getAllAutomations } from '@/actions/automations'
import { useQuery } from '@tanstack/react-query'

export const useQueryAutomations = () => {
  return useQuery({
    queryKey: ['user-automations'],
    queryFn: getAllAutomations,
    staleTime: 60_000, // optional but recommended
  })
}
