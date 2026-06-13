'use server'

import { client } from '@/lib/prisma'

export const updateIntegration = async (
  id: string,
  token: string,
  expiresAt: Date
) => {
  return client.integration.update({
    where: { id },
    data: {
      token,
      expiresAt,
    },
  })
}

export const getIntegration = async (clerkId: string) => {
  return await client.user.findUnique({
    where: {
      clerkId,
    },
    select: {
      integrations: {
        select: {
          id: true,
          token: true,
          expiresAt: true,
          name: true,
        },
      },
    },
  })
}

export const createIntegration = async (
  clerkId: string,
  token: string,
  expire: Date,
  igId?: string
) => {
  return await client.user.update({
    where: {
      clerkId,
    },
    data: {
      integrations: {
        create: {
          token,
          expiresAt: expire,
          instagramId: igId,
        },
      },
      
    },
    select:{
        firstname: true,
        lastname: true,
      }
  })
}
