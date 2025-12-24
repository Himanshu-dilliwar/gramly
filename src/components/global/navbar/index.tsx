"use client";

import Logo from "@/components/logo";
import { usePaths } from "@/hooks/user-navbar";
import { HelpCircle, Menu } from "lucide-react";
import React from "react";
import Items from "../sidebar/items";
import { Separator } from "@/components/ui/separator";
import ClerkAuthState from "../clerk-auth-state";
import SubscriptionPlans from "../subscription-plan";
import UpgradeCard from "../sidebar/Upgrade";
import Sheet from "../sheet";
import CreateAutomation from "../create-automation";
import Search from "./search";
import { Notification } from "./notification";
import MainBreadCrumb from "../bread-crumb/main-bread-crumb";

type Props = {
  slug: string;
};

const InfoBar = ({ slug }: Props) => {
  const { page } = usePaths();

  return (
    <div className="flex flex-col">
      {/* TOP BAR */}
      <div className="flex gap-x-3 lg:gap-x-5 justify-end">
        {/* MOBILE MENU */}
        <span className="lg:hidden flex items-center flex-1 gap-x-2">
          <Sheet trigger={<Menu />} side="left" className="lg:hidden">
            <div className="flex flex-col gap-y-5 w-full h-full p-3 bg-bgDark bg-opacity-90 backdrop-blur-3xl">
              <div className="flex items-center p-5 justify-center">
                <Logo />
              </div>

              <Items page={page} slug={slug} />

              <Separator className="bg-[#5C5C5F]" />

              <div className="px-3 flex flex-col gap-y-5 flex-1">
                <div className="flex gap-x-2 items-center">
                  <ClerkAuthState />
                  <p className="text-[#9B9CA0]">Profile</p>
                </div>

                <div className="flex gap-x-3 items-center">
                  <HelpCircle size={20} className="text-[#9B9CA0]" />
                  <p className="text-[#9B9CA0]">Help</p>
                </div>

                <SubscriptionPlans type="FREE">
                  
                  <UpgradeCard />
                
                </SubscriptionPlans>
              </div>
            </div>
          </Sheet>
        </span>

        <Search />
        <CreateAutomation />
        <Notification />
      </div>

      {/* BREADCRUMB */}
      <MainBreadCrumb page={page} slug={slug} />
    </div>
  );
};

export default InfoBar;
