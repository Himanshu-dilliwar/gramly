"use client";
import Logo from "@/components/logo";
import { usePaths } from "@/hooks/user-navbar";
import React from "react";
import Items from "./items";
import { Separator } from "@/components/ui/separator";
import ClerkAuthState from "@/components/global/clerk-auth-state";

import { HelpCircle } from "lucide-react";
import SubscriptionPlans from "@/components/global/subscription-plan";
import UpgradeCard from "./Upgrade";

type Props = {
  slug: string;
};

const Sidebar = ({ slug }: Props) => {
  const { page } = usePaths();
  return (
    <div className="hidden lg:block w-[250px] border-2 border-[#545454] fixed left-0 bottom-0 top-0 m-3 rounded-3xl overflow-hidden bg-gradient-to-b from-[#768BDD] via-[#171717] to-[#768BDD]">
  <div className="flex flex-col gap-y-5 w-full h-full p-3 bg-bgDark bg-opacity-90 backdrop-filter backdrop-blur-3xl">
    <div className="flex gap-x-2 items-center p-5 justify-center">
          <Logo />
        </div>
        <div className="flex flex-col py-3">
          <Items page={page} slug={slug} />
        </div>
        <div>
          <Separator orientation="horizontal" className="bg-[#5C5C5F]" />

        </div>
        <div className="px-3 flex flex-col gap-y-5 flex-1">
          {/* Profile */}
          <div className="flex gap-x-2 items-center">
            <ClerkAuthState/>
            <p className="text-[#9B9CA0]">Profile</p>
          </div>

          {/* Help */}
          <div className="flex gap-x-3 items-center">
            <HelpCircle size={20} className="text-[#9B9CA0]" />
            <p className="text-[#9B9CA0]">Help</p>
          </div>

          {/*subscription plan */}
          <SubscriptionPlans type="FREE">
            <div className="flex-1 flex flex-col justify-end">
                <UpgradeCard/>

            </div>
          </SubscriptionPlans>
          
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
