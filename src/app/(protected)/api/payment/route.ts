import Razorpay from "razorpay"
import { NextResponse } from "next/server"
import {  getDbUser } from "@/actions/user"

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function GET() {
  try {
    const user = await getDbUser()
    if (!user) {
      return NextResponse.json({ status: 401, error: "Unauthorized" })
    }

    const planId = process.env.RAZORPAY_PLAN_ID
    if (!planId) {
      return NextResponse.json({
        status: 400,
        error: "Razorpay Plan ID not configured in .env (RAZORPAY_PLAN_ID)"
      })
    }

    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
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
  } catch (error: any) {
    console.error("Razorpay subscription creation error:", error)
    return NextResponse.json({
      status: 500,
      error: error.message || "Internal server error during subscription creation",
    })
  }
}
