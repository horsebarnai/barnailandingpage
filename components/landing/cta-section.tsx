"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { contactSchema, type ContactPayload } from "@/lib/contact-schema"

export function CTASection() {
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

  const MESSAGE_MAX = 200
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
    <section
      id="contact"
      className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/20 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="relative max-w-2xl mx-auto text-center"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
          Ready to Transform{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
            Your Operation?
          </span>
        </h2>
        <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
          Be among the first breeding operations, syndicates, and bloodstock agents to run on Barn AI.
        </p>

        <form
          onSubmit={onSubmit}
          noValidate
          className="text-left rounded-2xl border border-zinc-800/70 bg-zinc-950/60 backdrop-blur-md p-6 sm:p-8 shadow-[0_0_60px_-20px_rgba(16,185,129,0.25)]"
        >
          {/* Honeypot — offscreen but in-DOM; bots fill it, humans never see it. */}
          <div
            aria-hidden="true"
            className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
          >
            <label htmlFor="company_website">Company website</label>
            <input
              id="company_website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("company_website")}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-zinc-300">
                Name
              </Label>
              <Input
                id="name"
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
              <Label htmlFor="email" className="text-zinc-300">
                Email
              </Label>
              <Input
                id="email"
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
              <Label htmlFor="message" className="text-zinc-300">
                Message
              </Label>
              <span
                className={`font-mono text-[11px] tabular-nums transition-colors ${
                  atLimit
                    ? "text-red-400"
                    : nearLimit
                      ? "text-amber-400"
                      : "text-zinc-600"
                }`}
                aria-live="polite"
              >
                {messageValue.length} / {MESSAGE_MAX}
              </span>
            </div>
            <Textarea
              id="message"
              rows={4}
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

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-xs text-zinc-500">
              We'll never share your information.
            </p>
            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-6 text-base rounded-full shadow-[0_0_30px_rgba(74,222,128,0.4)] hover:shadow-[0_0_50px_rgba(74,222,128,0.6)] transition-all duration-300 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  Request Early Access
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </section>
  )
}
