"use client"
import { createAutomations, saveListener, updateAutomationName } from "@/actions/automations"
import { useMutationData } from "./use-mutations"
import { CreateAutomationPayload } from "@/types/automation"
import { useEffect, useRef, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { z } from "zod"
import { useZodForm } from "./useZodForm"
import { saveKeyword } from "@/actions/automations"

import { useDispatch } from "react-redux"
import { useAppSelector } from "@/redux/store"
import { TRIGGER } from "@/redux/slices/automation"
import { saveTrigger } from "@/actions/automations"


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


const promptSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  reply: z.string().optional(),
})
export const useListener = (id: string) => {
  const queryClient = useQueryClient()

  const [listener, setListener] = useState<
    "SMARTAI" | "MESSAGE" | null
  >(null)

  const mutation = useMutation({
    mutationKey: ["create-listener", id],
    mutationFn: (data: z.infer<typeof promptSchema>) => {
      if (!listener) {
        throw new Error("Listener type not selected")
      }

      return saveListener(id, listener, data.prompt, data.reply)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["automation-info", id],
      })
    },
  })

  const {
    register,
    onFormSubmit,
    errors,
    reset,
    watch,
  } = useZodForm(promptSchema, mutation.mutate)

  const onSetListener = (
    type: "SMARTAI" | "MESSAGE" | null
  ) => setListener(type)

  return {
    listener,
    onSetListener,
    register,
    onFormSubmit,
    errors,
    reset,
    watch,
    isPending: mutation.isPending,
  }
}



type TriggerType = "COMMENT" | "DM"
export type InitialStateTriggerProps = {
  trigger: {
    type?: TriggerType
    types: TriggerType[]
    keywords: string[]
  }
}
export const useTriggers = (id: string) => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  
  const types =useAppSelector((state) => state.automation.trigger.types) ?? []


  const onSetTrigger = (type: TriggerType) => {
    dispatch(
  TRIGGER({
    trigger: { type },
  })
)

  }

  const mutation = useMutation({
    mutationKey: ["add-trigger", id],
    mutationFn: (types: TriggerType[]) =>
      saveTrigger(id, types),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["automation-info", id],
      })
    },
  })

  const onSaveTrigger = () => {
    if (types.length === 0) return
    mutation.mutate(types)
  }

  return {
    types,
    onSetTrigger,
    onSaveTrigger,
    isPending: mutation.isPending,
  }
}



export const useKeywords = (id: string) => {
  const queryClient = useQueryClient()
  const [keyword, setKeyword] = useState("")

  const mutation = useMutation({
    mutationKey: ["add-keyword", id],
    mutationFn: (keyword: string) =>
      saveKeyword(id, keyword),
    onSuccess: () => {
      setKeyword("")
      queryClient.invalidateQueries({
        queryKey: ["automation-info", id],
      })
    },
  })

  const onValueChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setKeyword(e.target.value)
  }

  const onKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault()

      if (!keyword.trim()) return

      mutation.mutate(keyword.trim())
    }
  }

  return {
    keyword,
    onValueChange,
    onKeyPress,
    isPending: mutation.isPending,
  }
}