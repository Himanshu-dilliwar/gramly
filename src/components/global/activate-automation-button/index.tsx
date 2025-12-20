"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Loader from "@/components/global/loder";
import { Repeat } from "lucide-react";
import { useQueryAutomation } from "@/hooks/user-queries";
import { useMutationData } from "@/hooks/use-mutations";
import { activateAutomation } from "@/actions/automations";

type Props = {
  id: string;
};

const ActivateAutomationButton = ({ id }: Props) => {
  const { data } = useQueryAutomation(id);

  const { mutate, isPending } = useMutationData<
    { state: boolean },
    { status: number }
  >(
    ["activate-automation", id],
    (payload) => activateAutomation(id, payload.state),
    "automation-info"
  );

  const isActive = Boolean(data?.data?.active);

  return (
    <Button
      onClick={() => mutate({ state: !isActive })}
      disabled={isPending || !data?.data}
      className="px-6 py-2 bg-gradient-to-br from-[#3352CC] to-[#1C2D70]
                 text-white rounded-full font-medium hover:opacity-80
                 transition flex items-center gap-x-2"
    >
      <Loader state={isPending}>
        <>
          <Repeat className={isPending ? "animate-spin" : ""} />
          {isActive ? "Disable" : "Activate"}
        </>
      </Loader>
    </Button>
  );
};

export default ActivateAutomationButton;
