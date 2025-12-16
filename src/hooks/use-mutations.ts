'use client'

import {
  useMutation,
  useMutationState,
  useQueryClient,
  type MutationKey,
} from '@tanstack/react-query'
import { toast } from 'sonner'

/* ---------------- MUTATION WRAPPER ---------------- */

export function useMutationData<TVariables, TResponse extends { status?: number }>(
  mutationKey: MutationKey,
  mutationFn: (variables: TVariables) => Promise<TResponse>,
  queryKey?: string,
  onSuccess?: () => void
) {
  const client = useQueryClient()

  const { mutate, isPending } = useMutation<TResponse, Error, TVariables>({
    mutationKey,
    mutationFn,
    onSuccess: (data) => {
      onSuccess?.()

      toast.success(
        data?.status === 200 || data?.status === 201
          ? 'Success'
          : 'Something went wrong'
      )
    },
    onSettled: async () => {
      if (queryKey) {
        await client.invalidateQueries({ queryKey: [queryKey] })
      }
    },
  })

  return { mutate, isPending }
}

/* ---------------- MUTATION STATE READER ---------------- */

export function useMutationDataState<TVariables>(
  mutationKey: MutationKey
) {
  const mutations = useMutationState({
    filters: { mutationKey, status: "pending" },
    select: (mutation) => ({
      variables: mutation.state.variables as TVariables | undefined,
      status: mutation.state.status,
    }),
  })

  const latest = mutations.at(-1)

  return {
    latestVariable: latest?.variables,
    status: latest?.status,
  }
}
