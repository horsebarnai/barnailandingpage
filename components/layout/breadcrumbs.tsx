import Link from "next/link"
import { ChevronRight } from "lucide-react"

export type Crumb = { name: string; href?: string }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500"
    >
      {items.map((item, i) => {
        const last = i === items.length - 1
        return (
          <span key={i} className="flex items-center gap-1.5">
            {item.href && !last ? (
              <Link
                href={item.href}
                className="hover:text-emerald-400 transition-colors"
              >
                {item.name}
              </Link>
            ) : (
              <span className={last ? "text-zinc-300" : ""}>{item.name}</span>
            )}
            {!last && (
              <ChevronRight
                className="h-3 w-3 text-zinc-700"
                aria-hidden="true"
              />
            )}
          </span>
        )
      })}
    </nav>
  )
}
