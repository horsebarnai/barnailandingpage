"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import type { MegaMenu as MegaMenuType } from "@/lib/site-content/nav"
import { cn } from "@/lib/utils"

/* The mega menu adapts to its group count: 2 groups → 2 columns,
   3 groups → 3 columns, 4 groups → 2x2 / 4 columns. Groups can
   optionally have sub-items; when they don't, the group itself is
   rendered as a single card (used by the value-pillar Solutions
   menu so we don't expose specific agents in nav). */

const COLS_BY_COUNT: Record<number, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
}

export function MegaMenu({ menu }: { menu: MegaMenuType }) {
  const cols = COLS_BY_COUNT[menu.groups.length] ?? "md:grid-cols-3"
  const hasItems = menu.groups.some((g) => g.items.length > 0)

  return (
    <div className="border-b border-white/5 bg-black/85 backdrop-blur-xl shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className={cn("grid grid-cols-1 gap-x-6 gap-y-6", cols)}>
          {menu.groups.map((group) =>
            group.items.length > 0 ? (
              <ItemsGroup key={group.title} group={group} />
            ) : (
              <PillarCard key={group.title} group={group} />
            ),
          )}
        </div>

        {/* Footer rule — overview link + CTA. We only show the
            "view all" link when we have sub-items the user might
            want to expand into; otherwise the pillars themselves
            are the destinations. */}
        <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
          {hasItems ? (
            <Link
              href={menu.href}
              className="group inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              <span>View {menu.trigger.toLowerCase()} overview</span>
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          ) : (
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-600">
              {menu.trigger} · Outcomes, not features
            </span>
          )}
          <Link
            href="/book-a-demo"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-300 transition-all hover:border-emerald-400/70 hover:bg-emerald-500/[0.12]"
          >
            Book a Demo
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ─── Variant A: group with sub-items (used by Platform menu) ── */

function ItemsGroup({
  group,
}: {
  group: MegaMenuType["groups"][number]
}) {
  return (
    <div className="min-w-0">
      <Link
        href={group.href}
        className="group inline-flex items-baseline gap-2 mb-4"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400/80 transition-colors group-hover:text-emerald-300">
          {group.title}
        </span>
        <ArrowUpRight
          className="h-3 w-3 text-emerald-500/50 transition-all group-hover:text-emerald-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </Link>

      <p className="text-[13px] leading-relaxed text-zinc-500 mb-5 max-w-[18rem]">
        {group.description}
      </p>

      <ul className="space-y-1">
        {group.items.map((item) => (
          <li key={item.href + item.name}>
            <Link
              href={item.href}
              className="group block rounded-lg px-3 py-2.5 -mx-3 transition-colors hover:bg-white/[0.03]"
            >
              <div className="text-sm font-medium text-zinc-100 group-hover:text-white transition-colors">
                {item.name}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ─── Variant B: value-pillar card (used by Solutions menu) ──── */

function PillarCard({
  group,
}: {
  group: MegaMenuType["groups"][number]
}) {
  return (
    <Link
      href={group.href}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-zinc-800/70 bg-zinc-950/40 p-5 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/40 hover:bg-zinc-950/80"
    >
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/[0.04] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex h-full flex-col">
        <div className="mb-3 flex items-start justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400/80 transition-colors group-hover:text-emerald-300">
            Pillar
          </span>
          <ArrowUpRight
            className="h-3.5 w-3.5 text-zinc-600 transition-all group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </div>
        <h3 className="text-[15px] font-semibold leading-snug text-white group-hover:text-emerald-100 transition-colors">
          {group.title}
        </h3>
        <p className="mt-2 text-[12.5px] leading-relaxed text-zinc-500 flex-grow">
          {group.description}
        </p>
      </div>
    </Link>
  )
}
