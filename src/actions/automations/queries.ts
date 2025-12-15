// src/actions/automations/queries.ts
'use server'

import { client } from '@/lib/prisma'

/* ---------------- CREATE ---------------- */

export const createAutomation = async (clerkId: string) => {
  try {
    return await client.automation.create({
      data: {
        user: {
          connect: { clerkId },
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
