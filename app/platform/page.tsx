import { redirect } from "next/navigation"

/* The Platform overview moved to /about. Anyone landing on /platform
   directly (bookmarks, external links) is shuttled to the new home. */
export default function PlatformIndex() {
  redirect("/about")
}
