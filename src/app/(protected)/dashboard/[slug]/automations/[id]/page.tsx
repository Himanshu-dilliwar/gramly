
import { getAutomationInfo } from "@/actions/automations";
import ThenNode from "@/components/global/automation/then/node";
import Trigger from "@/components/global/automation/trigger";
import AutomationBreadCrumb from "@/components/global/bread-crumb/automations";
import { prefetchUserAutomation } from "@/react-query/prefetch";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { CircleAlert } from "lucide-react";

type Props = {
  params: { id: string };
};

export async function generateMetadata({params}:Props){
  const info = await getAutomationInfo(params.id)
   return {
    title: info?.data?.name
  }
}

const Page = async ({ params }: Props) => {
  const query = new QueryClient()
  await prefetchUserAutomation(query,params.id)

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="flex flex-col items-center gap-y-20">
        <AutomationBreadCrumb id={params.id} />

        <div className="w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3">
          <div className="flex items-center gap-x-2">
            <CircleAlert />
            <p className="text-sm text-text-secondary">
              When...
            </p>
          </div>
          <Trigger id={params.id} />
        </div>
        <ThenNode id={params.id}/>
      </div>
      </HydrationBoundary>
  
);

};

export default Page;
