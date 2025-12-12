"use client";
import Logo from "@/components/logo";
import { PAGE_BREAD_CRUMBS } from "@/constants/page";
import { usePaths } from "@/hooks/user-navbar";
import { HelpCircle, Menu } from "lucide-react";
import React from "react";
import Items from "../sidebar/items";
import { Separator } from "@/components/ui/separator";
import ClerkAuthState from "../clerk-auth-state";
import SubscriptionPlans from "../subscription-plan";
import UpgradeCard from "../sidebar/Upgrade";
import Sheet from "../sheet";

type Props = {
  slug: string;
};

const Navbar = ({ slug }: Props) => {
  const { page } = usePaths();
  const curerntPage = PAGE_BREAD_CRUMBS.includes(page) || page == slug;
  return (
    curerntPage && (
      <div className="flex felx-col">
        <div>
          <span>
            <Sheet
              trigger={<Menu/>}
              side={"left"}
              className="lg:hidden"
            >
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
                        <SubscriptionPlans>
                          <div className="flex-1 flex flex-col justify-end">
                              <UpgradeCard/>
              
                          </div>
                        </SubscriptionPlans>
                        
                      </div>
                    </div>
            </Sheet>
          </span>
        </div>
      </div>
    )
  );
};

export default Navbar;
