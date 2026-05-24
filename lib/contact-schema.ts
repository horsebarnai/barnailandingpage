import { z } from "zod"

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please tell us your name.").max(120),
  email: z.string().trim().email("That doesn't look like a valid email."),
  message: z
    .string()
    .trim()
    .min(1, "Add a short note so we know how to help.")
    .max(200, "Please keep your message under 200 characters."),
  company_website: z.string().max(500).optional(),
})

export type ContactPayload = z.infer<typeof contactSchema>
