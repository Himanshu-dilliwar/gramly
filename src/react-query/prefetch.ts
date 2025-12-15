import { getAllAutomations } from "@/actions/automations";
import { onUserInfo } from "@/actions/user";
import {
  QueryClient,
  QueryFunction,
  QueryKey,
} from "@tanstack/react-query";

/* ---------- GENERIC PREFETCH ---------- */
const prefetch = async <TData>(
  client: QueryClient,
  action: QueryFunction<TData>,
  key: QueryKey
) => {
  return client.prefetchQuery({
    queryKey: key,
    queryFn: action,
    staleTime: 60_000, // 1 min
  });
};

/* ---------- USER PROFILE ---------- */
export const prefetchUserProfile = async (client: QueryClient) => {
  return prefetch(client, onUserInfo, ["user-profile"]);
};

/* ---------- USER AUTOMATIONS ---------- */
export const prefetchUserAutomations = async (client: QueryClient) => {
  return prefetch(client, getAllAutomations, ["user-automations"]);
};
