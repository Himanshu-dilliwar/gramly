// import { usePathname } from "next/navigation"

// export const usePaths = ()=> {
//     const pathname = usePathname()
//     const path = pathname.split("/")
//     let page= path[path.length -1]
//     return {page, pathname}
// }
// src/hooks/user-navbar.ts
import { usePathname } from "next/navigation";
import { PAGE_BREAD_CRUMBS, Page } from "@/constants/page";

export const usePaths = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  /**
   * segments example:
   * /dashboard/slug            → ["dashboard", "slug"]
   * /dashboard/slug/contacts   → ["dashboard", "slug", "contacts"]
   */

  const page: Page =
    segments.length === 2
      ? "home"
      : PAGE_BREAD_CRUMBS.includes(segments[2] as Page)
      ? (segments[2] as Page)
      : "home";

  return { page, pathname };
};
