"use client"
import { createAutomations, updateAutomationName } from "@/actions/automations"
import { useMutationData } from "./use-mutations"
import { CreateAutomationPayload } from "@/types/automation"
import { useEffect, useRef, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const useCreateAutomation = () => {
  const { mutate, isPending } = useMutationData<CreateAutomationPayload, any>(
    ['create-automation'],
    (payload) => createAutomations(payload),
    'user-automations'
  )

  return { mutate, isPending }
}



export const useEditAutomation = (automationId: string) => {
  const [edit, setEdit] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const queryClient = useQueryClient()

  const enableEdit = () => setEdit(true)
  const disableEdit = () => setEdit(false)

  const { mutate, isPending } = useMutation({
    mutationKey: ["update-automation", automationId],
    mutationFn: (data: { name?: string; active?: boolean }) =>
      updateAutomationName(automationId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["automation-info", automationId],
      })
      disableEdit()
    },
  })

  useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const input = inputRef.current
    if (!input) return

    // ✅ If click is inside input → do nothing
    if (input.contains(event.target as Node)) return

    // ✅ If input is empty → revert edit
    if (input.value.trim() === "") {
      disableEdit()
      return
    }

    // ✅ Save on outside click
    mutate({ name: input.value })
  }

  document.addEventListener("mousedown", handleClickOutside)

  return () => {
    document.removeEventListener("mousedown", handleClickOutside)
  }
}, [mutate, disableEdit])


  return {
    edit,
    enableEdit,
    disableEdit,
    inputRef,
    mutate,
    isPending,
  }
}