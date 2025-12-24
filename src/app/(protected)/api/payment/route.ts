import Razorpay from "razorpay"
import { NextResponse } from "next/server"
import {  getDbUser } from "@/actions/user"

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function GET() {
  const user = await getDbUser()
  if (!user) {
    return NextResponse.json({ status: 401 })
  }

  const subscription = await razorpay.subscriptions.create({
    plan_id: "plan_Rti90jm8UQ7iSu", // dashboard plan ID
    total_count: 999,
    customer_notify: 1,
    notes: {
      clerkId: user.clerkId, // 🔥 critical
    },
  })

  return NextResponse.json({
    status: 200,
    subscriptionId: subscription.id,
  })
}
