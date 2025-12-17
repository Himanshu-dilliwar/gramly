"use client"

import { ZodTypeAny } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { UseMutateFunction } from "@tanstack/react-query"

export const useZodForm = (
  schema: ZodTypeAny,
  mutate: UseMutateFunction<any, any, any>,
  defaultValues?: Record<string, any>
) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    // 🔥 THE FIX (single, safe cast)
    resolver: zodResolver(schema as any),
    defaultValues,
  })

  const onFormSubmit = handleSubmit((values) => {
    mutate(values)
    reset()
  })

  return {
    register,
    onFormSubmit,
    errors,
    watch,
    reset,
  }
}
