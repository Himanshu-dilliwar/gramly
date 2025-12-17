"use server";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { createUser, findUser } from "./queries";
import { refreshToken } from "@/lib/fetch";
import { updateIntegration } from "../integrations/queries";

/* ---------------- CURRENT USER ---------------- */
import { client } from "@/lib/prisma"
import { User } from "@prisma/client"

export const getDbUser = async (): Promise<User> => {
  const clerkUser = await getClerkUser()

  const dbUser = await client.user.findUnique({
    where: {
      clerkId: clerkUser.id,
    },
  })

  if (!dbUser) {
    throw new Error("User not found in database")
  }

  return dbUser
}

//clerk user
export const getClerkUser = async () => {
  const user = await currentUser()
  if (!user) redirect("/sign-in")
  return user
}

/* ---------------- ONBOARD USER ---------------- */

export const onBoardUser = async () => {
  const clerkUser = await getClerkUser();

  try {
    /* ---------- FIND USER ---------- */
    let user = await findUser(clerkUser.id);

    /* ---------- CREATE USER IF NOT FOUND ---------- */
    if (!user) {
      const created = await createUser({
        clerkId: clerkUser.id,
        firstname: clerkUser.firstName,
        lastname: clerkUser.lastName,
        email: clerkUser.emailAddresses[0].emailAddress,
      });

      return {
        status: 201,
        data: {
          id: created.id,
          firstname: created.firstname,
          lastname: created.lastname,
        },
      };
    }

    /* ---------- HANDLE INTEGRATIONS ---------- */
    if (user.integrations.length > 0) {
      const integration = user.integrations[0];

      if (integration.token && integration.expiresAt) {
        const now = Date.now();
        const expiresAt = integration.expiresAt.getTime();
        const daysLeft = Math.floor((expiresAt - now) / (1000 * 60 * 60 * 24));

        // Refresh token if close to expiry
        if (daysLeft <= 5 && daysLeft > 0) {
          const refreshed = await refreshToken(integration.token);

          await updateIntegration(
            integration.id,
            refreshed.accessToken,
            refreshed.expiresAt
          );
        }

        // Token expired
        if (daysLeft <= 0) {
          console.log("❌ Integration token expired");
          // optional: disconnect integration or re-auth
        }
      }
    }

    /* ---------- RETURN EXISTING USER ---------- */
    return {
      status: 200,
      data: {
        id: user.id, // 👈 REQUIRED
        firstname: user.firstname,
        lastname: user.lastname,
      },
    };
  } catch (error) {
    console.error("onBoardUser error:", error);
    return {
      status: 500,
    };
  }
};

export const onUserInfo = async() => {
  const user = await getClerkUser()
  try {
    const profile = await findUser(user.id)
    if (profile) return {status:200, data:profile}

    return {status:404}
  } catch (error) {
    return{status:500}
  }
}

