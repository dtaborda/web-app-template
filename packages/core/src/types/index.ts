/**
 * Shared TypeScript types for the application.
 *
 * Add domain types, utility types, and shared interfaces here.
 */

export type Theme = 'light' | 'dark'

export interface User {
  id: string
  email: string
  name?: string
}

export interface ApiResponse<T> {
  data?: T
  error?: string
  success: boolean
}
