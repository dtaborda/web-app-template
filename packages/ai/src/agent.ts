/**
 * AI agent utilities for chat functionality.
 *
 * This module provides helpers for AI SDK 5 chat agents.
 * Configure your LLM provider (OpenAI, Anthropic, etc.) in the UI app.
 */

import type { ChatOptions } from './types'

export const defaultChatOptions: ChatOptions = {
  model: 'gpt-4o-mini',
  temperature: 0.7,
  maxTokens: 1000,
}

/**
 * System prompt for the default chat agent.
 * Customize this based on your application needs.
 */
export const defaultSystemPrompt =
  'You are a helpful assistant. Be concise and clear in your responses.'
