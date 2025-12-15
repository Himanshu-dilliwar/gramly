'use server'

import { onCurrentUser } from '../user'
import { getAutomations,createAutomation } from './queries'

export const createAutomations = async () => {
  try {
    const user = await onCurrentUser()

    if (!user?.id) {
      throw new Error('Unauthorized')
    }

    const automation = await createAutomation(user.id)

    return {
      success: true,
      data: automation,
    }
  } catch (error) {
    console.error('[CREATE_AUTOMATION_ERROR]', error)
    return {
      success: false,
      data: null,
    }
  }
}


export const getAllAutomations = async () => {
  try {
    const user = await onCurrentUser()

    if (!user?.id) {
      throw new Error('Unauthorized')
    }

    const automations = await getAutomations(user.id)

    return {
      success: true,
      data: automations, // ✅ ARRAY
    }
  } catch (error) {
    console.error('[GET_ALL_AUTOMATIONS_ERROR]', error)
    return {
      success: false,
      data: [],
    }
  }
}