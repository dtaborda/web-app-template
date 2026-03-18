'use client'

import { Button } from '@template/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@template/ui/card'
import { useUIStore } from '@template/core'
import Link from 'next/link'

export default function HomePage() {
  const { theme, setTheme, sidebarOpen, toggleSidebar } = useUIStore()

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col gap-8">
        <header className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Web App Template</h1>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              Theme: {theme}
            </Button>
            <Button variant="outline" onClick={toggleSidebar}>
              Sidebar: {sidebarOpen ? 'Open' : 'Closed'}
            </Button>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Turborepo Monorepo</CardTitle>
              <CardDescription>Efficient build system with shared packages</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Organized workspace with ui, core, and ai packages. Fast builds with Turbo.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Modern Stack</CardTitle>
              <CardDescription>Next.js 15, React 19, TypeScript</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Latest versions with React Compiler, Server Actions, and full type safety.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>State Management</CardTitle>
              <CardDescription>Zustand 5 with localStorage persistence</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Lightweight state management with automatic localStorage sync. Try the theme
                toggle!
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Chat</CardTitle>
              <CardDescription>Built-in AI SDK 5 integration</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Full chat implementation with streaming support and configurable LLM providers.
              </p>
              <Link href="/chat">
                <Button>Try Chat</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Agent Skills</CardTitle>
              <CardDescription>AI-first development workflow</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Comprehensive skill library for TypeScript, React, Next.js, and more.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Best Practices</CardTitle>
              <CardDescription>Production-ready patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Biome for linting, Playwright for E2E, strict TypeScript, and comprehensive docs.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
