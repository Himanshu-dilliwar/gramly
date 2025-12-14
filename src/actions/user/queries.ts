import { client } from "@/lib/prisma";

export const findUser = async (clerkId: string) => {
  return await client.user.findUnique({
    where: { clerkId },
    include: {
      subscription: true,
      integrations: {
        select: {
          id: true,
          token: true,
          expiresAt: true,
          name: true,
        },
      },
    },
  });
};

type CreateUserProps = {
  clerkId: string
  firstname?: string | null
  lastname?: string | null
  email: string
}

export const createUser = async ({
  clerkId,
  firstname,
  lastname,
  email,
}: CreateUserProps) => {
  return client.user.create({
    data: {
      clerkId,
      firstname,
      lastname,
      email,
      subscription: {
        create: {},
      },
    },
    select: {
      id: true,
      firstname: true,
      lastname: true,
    },
  })
}