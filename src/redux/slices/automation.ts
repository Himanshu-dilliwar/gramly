
import { duplicateValidation } from "@/lib/utils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type TriggerType = "COMMENT" | "DM" | "STORY"


type TriggerState = {
  type?: string
  keyword?: string
  types: string[]
  keywords: string[]
}

type InitialStateTriggerProps = {
  trigger: TriggerState
}

const InitialState: InitialStateTriggerProps = {
  trigger: {
    type: undefined,
    keyword: undefined,
    types: [],
    keywords: [],
  },
}

export const AUTOMATION = createSlice({
  name: "automation",
  initialState: InitialState,
  reducers: {
    TRIGGER: (
      state,
      action: PayloadAction<{ trigger: { type: string } }>
    ) => {
      state.trigger.types = duplicateValidation(
        state.trigger.types,
        action.payload.trigger.type
      )
    },
  },
})

export const {TRIGGER} =AUTOMATION.actions
export default AUTOMATION.reducer