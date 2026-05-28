import { cn } from "@/lib/utils"

/* Standard vertical rhythm for content sections.
   `tight` for stacked sections that share a topic; `default` for
   primary sections; `loose` for hero-adjacent statements. */

export function Section({
  className,
  children,
  rhythm = "default",
  as: Tag = "section",
  id,
}: {
  className?: string
  children: React.ReactNode
  rhythm?: "tight" | "default" | "loose"
  as?: "section" | "div"
  id?: string
}) {
  return (
    <Tag
      id={id}
      className={cn(
        /* `overflow-clip` keeps the giant decorative blur halos that
           sit absolutely-positioned inside many sections (some are
           1020px wide) from leaking past the viewport on mobile and
           inflating the document width.

           `clip` rather than `hidden` so any `lg:sticky` descendants
           continue to chain up to the document scroll context;
           `clip` does not establish a scroll container. */
        "relative overflow-clip",
        rhythm === "tight" && "py-12 lg:py-16",
        rhythm === "default" && "py-20 lg:py-28",
        rhythm === "loose" && "py-24 lg:py-36",
        className,
      )}
    >
      {children}
    </Tag>
  )
}

/* Standard eyebrow → headline → kicker block, matched to the rest
   of the site's typography. Used by templates so every section
   reads with the same hierarchy. */
export function SectionHeader({
  eyebrow,
  title,
  titleAccent,
  kicker,
  align = "left",
}: {
  eyebrow?: string
  title: string
  titleAccent?: string
  kicker?: string
  align?: "left" | "center"
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "text-center mx-auto")}>
      {eyebrow && (
        <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-400/90">
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-3xl font-medium leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}{" "}
        {titleAccent && (
          <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text italic text-transparent">
            {titleAccent}
          </span>
        )}
      </h2>
      {kicker && (
        <p className="mt-5 text-base lg:text-lg text-zinc-400 leading-relaxed max-w-2xl">
          {kicker}
        </p>
      )}
    </div>
  )
}
