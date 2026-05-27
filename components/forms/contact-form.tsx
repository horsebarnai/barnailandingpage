"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { ArrowRight, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { contactSchema, type ContactPayload } from "@/lib/contact-schema"

/* ============================================================
 * Shared ContactForm — single source of truth for the contact
 * form so the home hero and the /contact page can't drift apart.
 *
 * Variants:
 *   - "panel" (default): full-width card with internal heading.
 *     Use on /contact where it stands on its own.
 *   - "embed": no card chrome, designed to sit inside a parent
 *     card (e.g. the home hero's right pane).
 * ============================================================ */

const MESSAGE_MAX = 200

export function ContactForm({
  variant = "panel",
  heading,
  kicker,
  ctaLabel = "Send Message",
}: {
  variant?: "panel" | "embed"
  heading?: string
  kicker?: string
  ctaLabel?: string
}) {
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ContactPayload>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", company_website: "" },
  })

  const messageValue = watch("message") ?? ""
  const remaining = MESSAGE_MAX - messageValue.length
  const nearLimit = remaining <= 20
  const atLimit = remaining <= 0

  const onSubmit = handleSubmit(async (values) => {
    setSubmitting(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      toast.success("Thanks — we'll be in touch.", {
        description: "Your message reached the Barn AI team.",
      })
      reset()
    } catch {
      toast.error("Couldn't send your message.", {
        description: "Please try again, or email om@horsebarn.ai directly.",
      })
    } finally {
      setSubmitting(false)
    }
  })

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn(
        "relative",
        variant === "panel" &&
          "rounded-2xl border border-zinc-800/70 bg-zinc-950/60 backdrop-blur-md p-7 lg:p-10 shadow-[0_0_80px_-20px_rgba(16,185,129,0.25)]",
      )}
    >
      {(heading || kicker) && (
        <div className="mb-6">
          {heading && (
            <h2 className="font-display text-2xl lg:text-3xl font-medium leading-tight tracking-tight text-white">
              {heading}
            </h2>
          )}
          {kicker && <p className="mt-2 text-sm text-zinc-500">{kicker}</p>}
        </div>
      )}

      {/* Honeypot — offscreen but in-DOM; bots fill it, humans don't see it. */}
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
      >
        <label htmlFor={`${variant}-company_website`}>Company website</label>
        <input
          id={`${variant}-company_website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("company_website")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`${variant}-name`} className="text-zinc-300">
            Name
          </Label>
          <Input
            id={`${variant}-name`}
            autoComplete="name"
            placeholder="Jane Doe"
            aria-invalid={!!errors.name}
            className="bg-zinc-900/70 border-zinc-800 text-white placeholder:text-zinc-600 h-11"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-xs text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${variant}-email`} className="text-zinc-300">
            Email
          </Label>
          <Input
            id={`${variant}-email`}
            type="email"
            autoComplete="email"
            placeholder="you@stable.com"
            aria-invalid={!!errors.email}
            className="bg-zinc-900/70 border-zinc-800 text-white placeholder:text-zinc-600 h-11"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-400">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2 mt-4">
        <div className="flex items-baseline justify-between">
          <Label htmlFor={`${variant}-message`} className="text-zinc-300">
            Message
          </Label>
          <span
            className={cn(
              "font-mono text-[11px] tabular-nums transition-colors",
              atLimit
                ? "text-red-400"
                : nearLimit
                  ? "text-amber-400"
                  : "text-zinc-600",
            )}
            aria-live="polite"
          >
            {messageValue.length} / {MESSAGE_MAX}
          </span>
        </div>
        <Textarea
          id={`${variant}-message`}
          rows={variant === "embed" ? 4 : 5}
          maxLength={MESSAGE_MAX}
          placeholder="Tell us about your operation and what you're looking to solve."
          aria-invalid={!!errors.message}
          className="bg-zinc-900/70 border-zinc-800 text-white placeholder:text-zinc-600 min-h-28"
          {...register("message")}
        />
        {errors.message && (
          <p className="text-xs text-red-400">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={submitting}
        className="mt-6 w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-5 text-base rounded-full shadow-[0_0_30px_rgba(74,222,128,0.4)] hover:shadow-[0_0_50px_rgba(74,222,128,0.6)] transition-all duration-300 group disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <Loader2 className="mr-2 w-5 h-5 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            {ctaLabel}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </Button>

      <p className="mt-4 text-center text-xs text-zinc-500">
        We&apos;ll never share your information.
      </p>
    </form>
  )
}
