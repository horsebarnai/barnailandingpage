import { NextResponse } from "next/server"
import { contactSchema } from "@/lib/contact-schema"
import { getSupabaseAdmin } from "@/lib/supabase-admin"
import { sendContactNotification } from "@/lib/notify-email"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 })
  }

  // Honeypot: if a bot filled the hidden field, pretend it worked and drop the message.
  if (
    raw &&
    typeof raw === "object" &&
    "company_website" in raw &&
    typeof (raw as Record<string, unknown>).company_website === "string" &&
    ((raw as Record<string, string>).company_website ?? "").trim() !== ""
  ) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const parsed = contactSchema.safeParse(raw)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation_failed" },
      { status: 400 },
    )
  }

  const { name, email, message } = parsed.data

  try {
    const supabase = getSupabaseAdmin()
    const { error } = await supabase
      .from("contact_submissions")
      .insert({ name, email, message })

    if (error) {
      console.error("[contact] insert failed:", error.message)
      return NextResponse.json({ ok: false, error: "insert_failed" }, { status: 500 })
    }
  } catch (err) {
    console.error("[contact] unexpected error:", err)
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 })
  }

  // Fire-and-log email notification. Best-effort — never blocks the user's
  // success response, since the submission is already safely in the database.
  try {
    await sendContactNotification({ name, email, message })
  } catch (err) {
    console.error("[contact] notify-email threw:", err)
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
