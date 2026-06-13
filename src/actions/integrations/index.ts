'use server'

import { client } from '@/lib/prisma';
import { redirect } from 'next/navigation'
import axios from 'axios';
import { onCurrentUser } from '../user';
import { getIntegration, createIntegration } from './queries';
import { generateTokens } from '@/lib/fetch';

export const onOAuthInstagram = async (
  strategy: 'INSTAGRAM' | 'WHATSAPP'
) => {
  if (strategy === 'INSTAGRAM') {
    redirect(process.env.INSTAGRAM_EMBEDDED_OAUTH_URL!)
  }
}

export const onIntegrate = async (code: string) => {
  const user = await onCurrentUser()

  try {
    const integration = await getIntegration(user.id)

    if (integration && integration.integrations.length === 0) {
      const token = await generateTokens(code)
      console.log(token)

      if (token) {
        const insta_id = await axios.get(
          `${process.env.INSTAGRAM_BASE_URL}/me?fields=user_id&access_token=${token.access_token}`
        )

        const today = new Date()
        const expire_date = today.setDate(today.getDate() + 60)
        const create = await createIntegration(
          user.id,
          token.access_token,
          new Date(expire_date),
          insta_id.data.user_id
        )
        return { status: 200, data: create }
      }
      return { status: 404, message: "Token not found" }
    }
    return { status: 400, message: "Integration already exists" }
  } catch (error) {
    console.error("onIntegrate error:", error)
    return { status: 500, message: "Internal server error" }
  }
}

export const addKeyword = async (
  automationId: string,
  word: string
) => {
  return await client.keyword.create({
    data: {
      word,
      automationId,
    },
  });
};
