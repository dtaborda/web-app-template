'use client'

import { Button } from '@template/ui/button'
import Link from 'next/link'

export function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6 border-b backdrop-blur-md"
      style={{
        backgroundColor: 'rgba(5, 5, 8, 0.95)',
        borderColor: 'var(--color-border-subtle)',
      }}
    >
      {/* Logo */}
      <Link href="/" className="flex flex-col justify-center">
        <span className="font-mono font-bold text-lg leading-tight tracking-tight">
          <span style={{ color: 'var(--color-accent-cyan)' }}>d</span>
          <span>Taborda</span>
        </span>
        <span
          className="font-mono text-[9px] uppercase tracking-[0.2em] leading-none"
          style={{ color: 'var(--color-text-muted)' }}
        >
          WEB APP TEMPLATE
        </span>
      </Link>

      {/* Navigation */}
      <nav className="flex items-center gap-6">
        <Link
          href="/"
          className="text-sm font-medium transition-colors"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Home
        </Link>
        <Link
          href="/chat"
          className="text-sm font-medium transition-colors"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Chat
        </Link>
        <Button
          size="sm"
          style={{
            backgroundColor: 'var(--color-accent-cyan)',
            color: 'var(--color-bg-base)',
          }}
        >
          Get Started
        </Button>
      </nav>
    </header>
  )
}
