'use client'

import { Header } from '@/components/Header'
import { useUIStore } from '@template/core'
import { Button } from '@template/ui/button'
import { Card } from '@template/ui/card'
import Link from 'next/link'

export default function HomePage() {
  const { theme, setTheme } = useUIStore()

  return (
    <>
      <Header />

      <main className="min-h-screen pt-14">
        {/* Hero Section */}
        <section className="px-6 py-24 md:py-32">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-6">
              <h1
                className="text-5xl md:text-7xl font-bold leading-tight"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Build scalable
                <br />
                <span style={{ color: 'var(--color-accent-cyan)' }}>web applications</span>
              </h1>

              <p
                className="text-xl md:text-2xl max-w-2xl mx-auto"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Production-ready template with Turborepo, Next.js 15, React 19, AI chat, and
                comprehensive design skills.
              </p>

              <div className="flex items-center justify-center gap-4 pt-8">
                <Link href="/chat">
                  <Button
                    size="lg"
                    style={{
                      backgroundColor: 'var(--color-accent-cyan)',
                      color: 'var(--color-bg-base)',
                    }}
                  >
                    Try AI Chat →
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  style={{
                    borderColor: 'var(--color-border-default)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  Toggle Theme
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  className="p-6 transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--color-bg-surface)',
                    borderColor: 'var(--color-border-default)',
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${feature.color}20` }}
                  >
                    <span style={{ color: feature.color, fontSize: '24px' }}>{feature.icon}</span>
                  </div>
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {feature.title}
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)' }}>{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

const features = [
  {
    icon: '⚡',
    title: 'Turborepo Monorepo',
    description:
      'Efficient build system with shared packages for UI, core logic, and AI utilities.',
    color: '#FFB800',
  },
  {
    icon: '🎨',
    title: 'Modern Stack',
    description:
      'Next.js 15, React 19, Tailwind CSS 4, TypeScript strict mode, and React Compiler.',
    color: '#4D8DFF',
  },
  {
    icon: '💾',
    title: 'State Management',
    description: 'Zustand 5 with automatic localStorage persistence for seamless state sync.',
    color: '#00E5A0',
  },
  {
    icon: '🤖',
    title: 'AI Chat',
    description: 'Built-in AI SDK 5 integration with streaming support and configurable providers.',
    color: '#00F0FF',
  },
  {
    icon: '🎯',
    title: 'Agent Skills',
    description: '18+ comprehensive skills for TypeScript, React, design systems, and more.',
    color: '#FF3366',
  },
  {
    icon: '✅',
    title: 'Production Ready',
    description: 'Biome linting, Playwright E2E, strict TypeScript, and complete documentation.',
    color: '#9B59FF',
  },
]
