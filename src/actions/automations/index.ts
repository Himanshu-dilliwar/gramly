'use server'

import { CreateAutomationPayload } from '@/types/automation'
import { getClerkUser, getDbUser} from '../user'
import { getAutomations,createAutomation, findAutomation, addListener, addTrigger, addKeyword, addPost, updateAutomation} from './queries'
import { client } from '@/lib/prisma'
import { findUser } from '../user/queries'

export const createAutomations = async (payload:CreateAutomationPayload) => {
  try {
    const user = await getClerkUser()

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
    const user = await getClerkUser()

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
  try {
    const user = await getDbUser()

    const automation = await findAutomation(id, user.id)

    if (!automation) {
      return {
        success: false,
        status: 404,
        data: null,
      }
    }

    return {
      success: true,
      status: 200,
      data: automation,
    }
  } catch (error) {

    return {
      success: false,
      status: 500,
      data: null,
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
  const user = await getClerkUser()

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

export const saveListener = async (
  automationId: string,
  listener: "SMARTAI" | "MESSAGE",
  prompt: string,
  reply?: string
) => {
  await getClerkUser()

  try {
    const created = await addListener(
      automationId,
      listener,
      prompt,
      reply
    )

    if(created)return {
      success: true,
      data: created,
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      data: null,
    }
  }
}


type TriggerType = "COMMENT" | "DM"
export const saveTrigger = async (
  automationId: string,
  triggers: TriggerType[]
) => {
  try {
    await getClerkUser()

    await addTrigger(automationId, triggers)

    return {
      success: true,
      status: 200,
      message: "Trigger saved",
    }
  } catch (error) {
    console.error(error)

    return {
      success: false,
      status: 500,
      message: "Oops! Something went wrong",
    }
  }
}

export const saveKeyword = async (
  automationId: string,
  keyword: string
) => {
  try {
    await getClerkUser()

    if (!keyword.trim()) {
      return {
        success: false,
        status: 400,
        message: "Keyword cannot be empty",
      }
    }

    await addKeyword(automationId, keyword.trim())

    return {
      success: true,
      status: 200,
      message: "Keyword added successfully",
    }
  } catch (error) {
    console.error(error)

    return {
      success: false,
      status: 500,
      message: "Oops! Something went wrong",
    }
  }
}

// actions/delete-keyword.ts
export const deleteKeyword = async (keywordId: string) => {
  try {
    await getClerkUser()

    await client.keyword.delete({
      where: {
        id: keywordId,
      },
    })

    return {
      success: true,
      status: 200,
      message: "Keyword deleted",
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      status: 500,
      message: "Failed to delete keyword",
    }
  }
}


export const getProfilePosts = async () => {
  const user = await getClerkUser()

  try {
    const profile = await findUser(user.id)

    const posts = await fetch(
      `${process.env.INSTAGRAM_BASE_URL}/me/media?fields=id,caption,media_url,media_type,timestamp&limit=10&access_token=${profile?.integrations[0].token}`
    )

    const parsed = await posts.json()

    if (parsed) {
      return {
        status: 200,
        data: parsed,
      }
    }

    console.log("🔴 Error in getting posts")
    return { status: 404 }
  } catch (error) {
    console.log("🔴 server side Error in getting posts", error)
    return { status: 500 }
  }
}

type SavePostsPayload = {
  automationId: string
  posts: {
    postid: string
    caption?: string
    media: string
    mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  }[]
}
export const savePosts = async ({
  automationId,
  posts,
}: SavePostsPayload) => {
  const user = await getDbUser()
  try {
    const created = await addPost(automationId, user.id, posts) // ✅ await

    if (!created) {
      return {
        status: 404,
        data: "Automation not found",
      }
    }

    return {
      status: 200,
      data: "Posts attached",
    }
  } catch (error) {
    console.error("savePosts error:", error)

    return {
      status: 500,
      data: "Oops! something went wrong",
    }
  }
}

export const activateAutomation = async (
  id: string,
  state: boolean
) => {
  await getClerkUser()
  try {
    const update = await updateAutomation(id,{active:state})

    if (update) {
      return {
        success: true,
        status: 200,
        data: `Automation ${state? "activated" : "disabled"}`,
      }
    }
    return{
      success: false,
      status: 400,
      message: "automation not found"}
  } catch (error) {
    console.error(error)

    return {
      success: false,
      status: 500,
      message: "Oops! Something went wrong",
    }
  }
}