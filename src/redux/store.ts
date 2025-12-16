"use client"

import { configureStore } from "@reduxjs/toolkit"
import automationReducer from "@/redux/slices/automation"
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux"

export const store = configureStore({
  reducer: {
    automation: automationReducer, // ✅ clean state key
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector

export const useAppDispatch = () => useDispatch<AppDispatch>()
