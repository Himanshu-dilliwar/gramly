import crypto from "crypto"
import { NextResponse } from "next/server"
import { updateSubscription } from "@/actions/user/queries"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get("x-razorpay-signature")!

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(body)
    .digest("hex")

  if (expectedSignature !== signature) {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  const event = JSON.parse(body)

  if (event.event === "subscription.activated") {
    const sub = event.payload.subscription.entity

    await updateSubscription(sub.notes.clerkId, {
      razorpaySubId: sub.id,
      plan: "PRO",
      status: "ACTIVE",
    })
  }

  if (event.event === "subscription.cancelled") {
    const sub = event.payload.subscription.entity

    await updateSubscription(sub.notes.clerkId, {
      razorpaySubId: sub.id,
      plan: "FREE",
      status: "CANCELLED",
    })
  }

  return NextResponse.json({ success: true })
}
