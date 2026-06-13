'use server'

import { client } from '@/lib/prisma';
import { redirect } from 'next/navigation'

export const onOAuthInstagram = async (
  strategy: 'INSTAGRAM' | 'WHATSAPP'
) => {
  if (strategy === 'INSTAGRAM') {
    redirect(process.env.INSTAGRAM_EMBEDDED_OAUTH_URL!)
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
