"use client";

import { createAutomations } from "@/actions/automations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";

export const useCreateAutomation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const params = useParams(); // gives slug

  return useMutation({
    mutationFn: createAutomations,

    onSuccess: (res) => {
      // 1️⃣ Refresh automation list
      queryClient.invalidateQueries({
        queryKey: ["user-automations"],
      });

      // 2️⃣ Redirect to new automation page
      if (res?.success && res.data?.id) {
        router.push(
          `/dashboard/${params.slug}/${res.data.id}`
        );
      }
    },
  });
};
