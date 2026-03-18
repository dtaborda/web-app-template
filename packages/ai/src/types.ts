/**
 * AI agent and chat types.
 */

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  createdAt?: Date
}

export interface ChatOptions {
  model?: string
  temperature?: number
  maxTokens?: number
}
