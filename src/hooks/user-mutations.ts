'use client'

import { useMutation, useMutationState, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { MutationKey } from '@tanstack/react-query'

/* ---------------- MUTATION WRAPPER ---------------- */

export const useMutationData = (
  mutationKey: MutationKey,
  mutationFn: () => Promise<any>,
  queryKey?: string,
  onSuccess?: () => void
) => {
  const client = useQueryClient()

  const { mutate, isPending } = useMutation({
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

export const useMutationDataState = (mutationKey: MutationKey) => {
  return useMutationState({
    filters: { mutationKey },
    select: (mutation) => ({
      variables: mutation.state.variables,
      status: mutation.state.status,
    }),
  })
}
