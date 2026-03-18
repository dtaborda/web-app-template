import { z } from 'zod'

/**
 * Shared Zod schemas for validation.
 *
 * Use these schemas for:
 * - API request/response validation
 * - Form validation
 * - Environment variable validation
 */

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
})

export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema.optional(),
    error: z.string().optional(),
    success: z.boolean(),
  })

export type User = z.infer<typeof userSchema>
