import { duplicateValidation } from "@/lib/utils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type TriggerType = "COMMENT" | "DM"

export type InitialStateTriggerProps = {
  trigger: {
    type?: TriggerType
    types: TriggerType[]
    keywords: string[]
  }
}

const InitialState: InitialStateTriggerProps = {
  trigger: {
    type: undefined,
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
      action: PayloadAction<{ trigger: { type: TriggerType } }>
    ) => {
      state.trigger.types = duplicateValidation(
        state.trigger.types,
        action.payload.trigger.type
      )
    },
  },
})

export const { TRIGGER } = AUTOMATION.actions
export default AUTOMATION.reducer


