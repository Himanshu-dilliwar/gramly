import { redirect } from "next/navigation"
import { getClerkUser } from "@/actions/user"

const PaymentPage = async () => {
  const user = await getClerkUser()

  if (!user) {
    redirect("/login")
  }

  // 🔥 Subscription will be activated by webhook
  // We only show a waiting screen
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">Processing Payment</h1>
      <p className="text-gray-500">
        Please wait while we confirm your subscription.
      </p>
    </div>
  )
}

export default PaymentPage
