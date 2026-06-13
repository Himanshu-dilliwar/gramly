import { client } from "@/lib/prisma";

export const matchKeyword = async (text: string) => {
  return await client.keyword.findFirst({
    where: {
      word: {
        equals: text,
        mode: "insensitive",
      },
    },
  });
};



export const getKeywordAutomation = async (
  automationId: string,
  isDM: boolean
) => {
  return await client.automation.findUnique({
    where: {
      id: automationId,
    },
    include: {
      listener: true,
      trigger: {
        where: {
          type: isDM ? "DM" : "COMMENT",
        },
      },
      user:{
        select: {
            subscription:{
                select:{
                    plan: true
                }
            },
            integrations: {
                select:{
                    token: true,
                }
            }
        }
    },
    }
  });
};

export const trackResponses = async (
  automationId: string,
  type: 'COMMENT' | 'DM'
) => {
  try {
    if (type === 'COMMENT') {
      return await client.listener.update({
        where: { automationId },
        data: {
          commentCount: {
            increment: 1,
          },
        },
      });
    }

    if (type === 'DM') {
      return await client.listener.update({
        where: { automationId },
        data: {
          dmCount: {
            increment: 1,
          },
        },
      });
    }

    return null;
  } catch (error) {
    console.error("Error tracking responses:", error);
    throw error;
  }
};