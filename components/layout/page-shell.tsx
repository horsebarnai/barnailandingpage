import { SiteHeader } from "@/components/nav/site-header"
import { SiteFooter } from "@/components/site-footer"

/* Standard page wrapper — every non-home route uses this so header,
   footer, and overall body chrome stay consistent. */

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
