// src/actions/automations/queries.ts
'use server'

import { client } from '@/lib/prisma'
import { CreateAutomationPayload } from '@/types/automation'

/* ---------------- CREATE ---------------- */

export const createAutomation = async (clerkId: string, payload:CreateAutomationPayload) => {
  try {
    return await client.automation.create({
      data: {
        name: payload.name,
        user: {
          connect: { clerkId },
        },
        keywords: {
            createMany: {
            data: payload.keywords.map(word => ({ word })),
            },
        },
      },
    })
  } catch (error) {
    console.error('[CREATE_AUTOMATION_ERROR]', error)
    throw new Error('Failed to create automation')
  }
}

/* ---------------- GET ALL ---------------- */

export const getAutomations = async (clerkId: string) => {
  try {
    const automations = await client.automation.findMany({
      where: {
        user: {
          clerkId,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        keywords: true,
        listener: true,
      },
    })

    return automations
  } catch (error) {
    console.error('[GET_AUTOMATIONS_ERROR]', error)
    throw new Error('Failed to fetch automations')
  }
}


export const findAutomation = async (
  id: string,
  userId: string
) => {
  return await client.automation.findFirst({
    where: {
      id,
      userId,
    },
    include: {
      keywords: true,
      trigger: true,
      posts: true,
      listener: true,
      user: {
        select: {
          subscription: true,
          integrations: true,
        },
      },
    },
  })
}

type UpdateAutomationInput = {
  name?: string
  active?: boolean
}

export const updateAutomation = async (
  id: string,
  update: UpdateAutomationInput
) => {
  return await client.automation.update({
    where: { id },
    data: {
      ...(update.name && { name: update.name }),
      ...(typeof update.active === "boolean" && { active: update.active }),
    },
  })
}
