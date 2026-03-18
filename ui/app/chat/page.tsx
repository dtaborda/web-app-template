'use client'

import { Header } from '@/components/Header'
import { Button } from '@template/ui/button'
import { Card } from '@template/ui/card'
import { Input } from '@template/ui/input'
import { useState } from 'react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })

      if (!response.ok) throw new Error('Failed to get response')

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let aiContent = ''

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          aiContent += chunk

          setMessages((prev) => {
            const lastMessage = prev[prev.length - 1]
            if (lastMessage?.role === 'assistant') {
              return [...prev.slice(0, -1), { ...lastMessage, content: aiContent }]
            }
            return [...prev, { id: Date.now().toString(), role: 'assistant', content: aiContent }]
          })
        }
      }
    } catch (error) {
      console.error('Chat error:', error)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content:
            'Sorry, there was an error processing your message. Make sure OPENAI_API_KEY is set in .env.local',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header />

      <main className="min-h-screen pt-14">
        <div className="container mx-auto p-8 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8" style={{ color: 'var(--color-text-primary)' }}>
            AI Chat
          </h1>

          <Card
            className="flex flex-col h-[600px]"
            style={{
              backgroundColor: 'var(--color-bg-surface)',
              borderColor: 'var(--color-border-default)',
            }}
          >
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-12" style={{ color: 'var(--color-text-muted)' }}>
                  <p>Start a conversation by typing a message below.</p>
                  <p className="text-sm mt-2">
                    Note: Set OPENAI_API_KEY in .env.local to enable chat
                  </p>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className="max-w-[80%] rounded-lg px-4 py-2"
                    style={{
                      backgroundColor:
                        message.role === 'user'
                          ? 'var(--color-accent-cyan)'
                          : 'var(--color-bg-elevated)',
                      color:
                        message.role === 'user'
                          ? 'var(--color-bg-base)'
                          : 'var(--color-text-primary)',
                    }}
                  >
                    <div className="text-sm font-medium mb-1">
                      {message.role === 'user' ? 'You' : 'AI'}
                    </div>
                    <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div
                    className="rounded-lg px-4 py-2"
                    style={{ backgroundColor: 'var(--color-bg-elevated)' }}
                  >
                    <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      Thinking...
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="border-t p-4 flex gap-2"
              style={{ borderColor: 'var(--color-border-default)' }}
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                disabled={isLoading}
                className="flex-1"
                style={{
                  backgroundColor: 'var(--color-bg-elevated)',
                  borderColor: 'var(--color-border-default)',
                  color: 'var(--color-text-primary)',
                }}
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                style={{
                  backgroundColor: 'var(--color-accent-cyan)',
                  color: 'var(--color-bg-base)',
                }}
              >
                Send
              </Button>
            </form>
          </Card>
        </div>
      </main>
    </>
  )
}
