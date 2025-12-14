import AutomatationList from "@/components/global/automation-lists";
import CreateAutomation from "@/components/global/create-automation";
import { Check } from "lucide-react";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
      {/* LEFT: Automations List */}
      <div className="lg:col-span-4"><AutomatationList/></div>

      {/* RIGHT: Summary Card */}
      <div className="lg:col-span-2">
        <div className="flex flex-col rounded-xl bg-background/80 gap-y-6 p-5 border border-inactive overflow-hidden">
          <div>
            <h2 className="text-xl font-semibold">Automations</h2>
            <p className="text-text-secondary">
              Your live automations will show here.
            </p>
          </div>

          <div className="flex flex-col gap-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-start justify-between">
                <div className="flex flex-col">
                  <h3 className="font-medium">
                    Direct traffic towards website
                  </h3>
                  <p className="text-text-secondary text-sm">
                    October 5th 2024
                  </p>
                </div>

                <Check className="text-green-500 w-5 h-5" />
              </div>
            ))}
          </div>
          <CreateAutomation/>
        </div>
      </div>
    </div>
  );
};

export default Page;
