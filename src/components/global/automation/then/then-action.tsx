import { useListener } from "@/hooks/use-automation"
import TriggerButton from "../trigger-button"
import { AUTOMATION_LISTENERS } from "@/constants/automations"
import SubscriptionPlans from "../../subscription-plan"
import { Textarea } from "@/components/ui/textarea"
import Loader from "../../loder"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type Props = {
  id: string
}

const ThenAction = ({ id }: Props) => {
  const {
    listener,
    onSetListener,
    register,
    onFormSubmit,
    isPending,
  } = useListener(id)

  return (
    <TriggerButton label="Then...">
      {/* LISTENER OPTIONS */}
      <div className="flex flex-col gap-y-3">
        {AUTOMATION_LISTENERS.map((item) => {
          const card = (
            <div
              key={item.id}
              onClick={() =>
                onSetListener(listener === item.type ? null : item.type)
              }
              className={cn(
                listener === item.type
                  ? "bg-gradient-to-br from-[#3352CC] to-[#1C2D70] text-white"
                  : "bg-background-80",
                "p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100"
              )}
            >
              <div className="flex gap-x-2 items-center">
                {item.icon}
                <p className="font-medium">{item.label}</p>
              </div>

              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          )

          // 🔐 PRO gated
          if (item.type === "SMARTAI") {
            return (
              <SubscriptionPlans key={item.id} type="PRO">
                {card}
              </SubscriptionPlans>
            )
          }

          return card
        })}
      </div>

      {/* FORM (only when selected) */}
      {listener && (
        <form onSubmit={onFormSubmit} className="flex flex-col gap-y-2 mt-4">
          <Textarea
            placeholder={
              listener === "SMARTAI"
                ? "Add a prompt that your Smart AI can use..."
                : "Add a message you want to send to your customers"
            }
            {...register("prompt")}
            className="bg-background-80 outline-none border-none ring-0 focus:ring-0"
          />

          <Input
            {...register("reply")}
            placeholder="Add a reply for comments (Optional)"
            className="bg-background-80 outline-none border-none ring-0 focus:ring-0"
          />

          <Button
            type="submit"
            className="bg-gradient-to-br w-full from-[#3352CC] to-[#1C2D70] font-medium text-white"
            disabled={isPending}
          >
            <Loader state={isPending}>Add listener</Loader>
          </Button>
        </form>
      )}
    </TriggerButton>
  )
}

export default ThenAction
