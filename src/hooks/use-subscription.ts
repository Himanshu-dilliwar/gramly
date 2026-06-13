"use client"

import axios from "axios"
import { useState } from "react"

const useSubscription = () => {
  const [isProcessing, setIsProcessing] = useState(false)

  const onSubscribe = async () => {
    try {
      setIsProcessing(true)

      // 1️⃣ Create Razorpay subscription
      const res = await axios.get("/api/payment")

      if (res.data.status !== 200) {
        throw new Error(res.data.error || "Failed to create subscription")
      }

      // 2️⃣ Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        subscription_id: res.data.subscriptionId,
        name: "Gramly",
        description: "PRO Subscription",

        // ✅ NO DB LOGIC HERE
        handler: function () {
          // Payment confirmation handled by webhook
          window.location.href = "/dashboard"
        },
      }

      const razorpay = new (window as any).Razorpay(options)
      razorpay.open()
    } catch (error: any) {
      console.error("Subscription error:", error)
      const errorMsg = error.response?.data?.error || error.message || "Payment failed. Please try again."
      alert(`Payment failed: ${errorMsg}`)
    } finally {
      setIsProcessing(false)
    }
  }

  return { onSubscribe, isProcessing }
}

export default useSubscription
