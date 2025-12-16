'use server'

import { CreateAutomationPayload } from '@/types/automation'
import { onCurrentUser } from '../user'
import { getAutomations,createAutomation, findAutomation } from './queries'
import { client } from '@/lib/prisma'

export const createAutomations = async (payload:CreateAutomationPayload) => {
  try {
    const user = await onCurrentUser()

    if (!user?.id) {
      throw new Error('Unauthorized')
    }

    const automation = await createAutomation(user.id,payload)

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

export const getAutomationInfo = async (id: string) => {
  const user = await onCurrentUser()

  try {
    const automation = await findAutomation(id, user.id)

    if (!automation) {
      return {
        success: false,
        data: null,
        status: 404,
      }
    }

    return {
      success: true,
      data: automation,
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      data: null,
      status: 500,
    }
  }
}

type UpdateAutomationPayload = {
  name?: string
  active?: boolean
  automation?: string
}

export const updateAutomationName = async (
  automationId: string,
  data: UpdateAutomationPayload
) => {
  const user = await onCurrentUser()

  try {
    const updatedAutomation = await client.automation.update({
      where: {
        id: automationId,
        userId: user.id, // 🔐 security check
      },
      data: {
        ...(data.name && { name: data.name }),
        ...(typeof data.active === "boolean" && { active: data.active }),
      },
    })

    return {
      success: true,
      data: updatedAutomation,
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      data: null,
    }
  }
}