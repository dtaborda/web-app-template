'use client'

import { useChat } from 'ai/react'
import { Button } from '@template/ui/button'
import { Input } from '@template/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@template/ui/card'
import Link from 'next/link'

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()

  return (
    <div className="container mx-auto p-8 h-screen flex flex-col">
      <header className="mb-4">
        <Link href="/">
          <Button variant="ghost">← Back</Button>
        </Link>
      </header>

      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle>AI Chat</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <p>Start a conversation with the AI assistant</p>
                <p className="text-sm mt-2">
                  Note: Configure your API key in .env.local to enable chat
                </p>
              </div>
            )}
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    m.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <div className="font-bold text-xs mb-1">
                    {m.role === 'user' ? 'You' : 'AI'}
                  </div>
                  <div className="whitespace-pre-wrap">{m.content}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-muted-foreground rounded-lg px-4 py-2">
                  <div className="font-bold text-xs mb-1">AI</div>
                  <div className="flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>
                      .
                    </span>
                    <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>
                      .
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type a message..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
