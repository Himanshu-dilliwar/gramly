"use client"
import { useQueryUser } from "@/hooks/user-queries";
import PaymentCard from "./payment-card";

const Billing = () => {
  const { data } = useQueryUser();

  const currentPlan = data?.data?.subscription?.plan ?? "FREE";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <PaymentCard
        label="FREE"
        current={currentPlan}
      />

      <PaymentCard
        label="PRO"
        current={currentPlan}
      />
    </div>
  );
};

export default Billing;
