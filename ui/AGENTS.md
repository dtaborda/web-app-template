# UI Module - Agent Guide

> **Parent**: See [../AGENTS.md](../AGENTS.md) for root agent guide and full skill reference.

---

## Skills Reference

> - [`ui-ux-pro-max`](../skills/ui-ux-pro-max/SKILL.md) - Design system, palettes, typography
> - [`web-design-guidelines`](../skills/web-design-guidelines/SKILL.md) - UI code review
> - [`wireframe-prototyping`](../skills/wireframe-prototyping/SKILL.md) - Wireframes, prototypes

---

## UI Module Overview

This is the main Next.js 15 application. It uses:
- React 19 with React Compiler
- Tailwind CSS 4 for styling
- shadcn/ui components via `@template/ui`
- Server Actions for mutations
- AI SDK 5 for chat features

---

## Quick Rules

1. **English Only**: All code, comments, docs in English
2. **No useMemo/useCallback**: React Compiler handles optimization
3. **No var() in className**: Use Tailwind theme tokens directly
4. **Use @template/* packages**: Import shared code from packages
5. **Skill First**: Check auto-invoke table before starting

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15 | App Router, Server Actions, SSR |
| React | 19 | UI (React Compiler enabled) |
| TypeScript | 5.7+ | Type safety (strict mode) |
| Tailwind CSS | 4 | Utility-first styling |
| AI SDK | 5 | Chat/streaming features |
| Biome | latest | Linting + formatting |
| Playwright | latest | E2E testing |

---

## Package Dependencies

This UI app imports from:
- `@template/ui` - Shared UI components (Button, Input, Card, etc.)
- `@template/core` - Business logic, stores, schemas, types
- `@template/ai` - AI agent utilities and chat configuration

---

## Code Placement

```
ui/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   ├── chat/                 # Chat feature pages
│   └── api/                  # API routes
│       └── chat/
│           └── route.ts      # Chat streaming endpoint
├── components/               # UI components
│   ├── chat/                 # Chat-specific components
│   └── system/               # Error, loading, empty states
├── actions/                  # Server Actions
│   └── {feature}/
│       └── action.ts
├── hooks/                    # Shared React hooks
│   └── use-{hook-name}.ts
├── lib/
│   ├── contracts/            # Type definitions
│   └── utils/                # Utilities
├── stores/                   # App-specific Zustand stores
│   └── {store-name}-store.ts
├── styles/
│   └── globals.css           # Global styles + Tailwind theme
└── tests/                    # Playwright E2E tests
    └── {feature}.spec.ts
```

---

## Scope Rule

**2+ places** → Shared location (`lib/`, `hooks/`, `components/`, or `@template/*`)
**1 place** → Keep local in feature directory

Examples:
```typescript
// ❌ Premature abstraction
// hooks/use-fetch.ts (used once)

// ✅ Keep local
// app/users/use-fetch.ts (used once here)

// ✅ Extract when reused
// hooks/use-fetch.ts (used in 3+ places)
```

---

## Component Patterns

### Client Components

Use `"use client"` for interactivity:

```typescript
'use client'

import { Button } from '@template/ui'
import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)
  
  return <Button onClick={() => setCount(count + 1)}>Count: {count}</Button>
}
```

### Server Components (Default)

No directive needed:

```typescript
import { Card } from '@template/ui'

export default async function Page() {
  const data = await fetch('...')
  return <Card>{/* ... */}</Card>
}
```

### Server Actions

```typescript
// actions/contact/create.ts
'use server'

import { contactSchema } from '@template/core'

export async function createContact(formData: FormData) {
  const data = contactSchema.parse({ /* ... */ })
  // Save to database
  return { success: true }
}
```

---

## Styling Rules

### Use cn() for Conditional Classes

```typescript
import { cn } from '@template/ui'

function Component({ className, active }: Props) {
  return (
    <div className={cn(
      'base-class',
      active && 'active-class',
      className
    )} />
  )
}
```

### Never use var() in className

```typescript
// ❌ Bad
<div className="bg-[var(--primary)]" />

// ✅ Good - Use Tailwind tokens
<div className="bg-primary" />

// ✅ Good - Define in globals.css
// :root { --primary: 220 70% 50%; }
<div className="bg-primary" />
```

### Theme CSS Variables

Define theme colors in `styles/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  /* ... */
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  /* ... */
}
```

Then use in components:
```typescript
<div className="bg-background text-foreground" />
```

---

## State Management

### Global UI State (@template/core)

```typescript
'use client'

import { useUIStore } from '@template/core'

export function ThemeToggle() {
  const { theme, setTheme } = useUIStore()
  return <button onClick={() => setTheme('dark')}>Toggle</button>
}
```

### App-Specific State (ui/stores/)

```typescript
// stores/search-store.ts
import { create } from 'zustand'

interface SearchStore {
  query: string
  setQuery: (query: string) => void
}

export const useSearchStore = create<SearchStore>((set) => ({
  query: '',
  setQuery: (query) => set({ query }),
}))
```

---

## Forms

### With React Hook Form + Zod

```typescript
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type Contact } from '@template/core'
import { Button, Input } from '@template/ui'

export function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<Contact>({
    resolver: zodResolver(contactSchema),
  })
  
  return (
    <form onSubmit={handleSubmit(data => {/* ... */})}>
      <Input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}
      <Button type="submit">Submit</Button>
    </form>
  )
}
```

---

## React 19 Rules

### NEVER use useMemo or useCallback

```typescript
// ❌ Bad - React Compiler handles this
const memoValue = useMemo(() => expensive(), [dep])
const memoCallback = useCallback(() => {}, [dep])

// ✅ Good - Just write the code
const value = expensive()
const callback = () => {}
```

### Use useTransition for async

```typescript
'use client'

import { useTransition } from 'react'

export function DeleteButton({ id }: Props) {
  const [isPending, startTransition] = useTransition()
  
  return (
    <button
      onClick={() => startTransition(async () => await deleteItem(id))}
      disabled={isPending}
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  )
}
```

---

## Testing

### Playwright E2E Tests

```typescript
// tests/home.spec.ts
import { test, expect } from '@playwright/test'

test('home page loads', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading')).toContainText('Web App Template')
})
```

Run tests:
```bash
pnpm test           # Run all tests
pnpm test:ui        # Run with Playwright UI
```

---

## Commands

```bash
# Development
pnpm dev            # Start dev server (port 3000)

# Build
pnpm build          # Production build
pnpm start          # Start production server

# Quality
pnpm lint           # Run Biome linter
pnpm typecheck      # TypeScript check

# Testing
pnpm test           # Run Playwright tests
pnpm test:ui        # Playwright with UI
```

---

## Auto-invoke Skills for UI Work

When working in `ui/`, these skills are automatically relevant:

| Task | Skill |
|------|-------|
| Designing UI, choosing colors/fonts | `ui-ux-pro-max` |
| Reviewing UI code, accessibility | `web-design-guidelines` |
| Creating wireframes, layouts | `wireframe-prototyping` |
| Writing React components | `react-19` |
| Next.js routing, Server Actions | `nextjs-15` |
| Styling with Tailwind | `tailwind-4` |
| Zod validation | `zod-4` |
| Zustand state management | `zustand-5` |
| AI chat features | `ai-sdk-5` |
| E2E testing | `playwright` |
| UI module patterns | `template-web` |

**Full auto-invoke table**: See [../AGENTS.md](../AGENTS.md#auto-invoke-skills)

---

## Checklist

Before committing:

- [ ] Used `@template/ui` for UI primitives
- [ ] No `useMemo`/`useCallback`
- [ ] No `var()` in className
- [ ] Used Server Actions for mutations
- [ ] Added proper types
- [ ] Code passes `pnpm typecheck` and `pnpm lint`
- [ ] Tested manually
- [ ] Added E2E test if user-facing

---

## Related Skills

- **`template-web`**: Detailed UI module patterns → [../skills/template-web/SKILL.md](../skills/template-web/SKILL.md)
- **`template-packages`**: Shared package patterns → [../skills/template-packages/SKILL.md](../skills/template-packages/SKILL.md)
- **`react-19`**: React 19 specific patterns → [../skills/react-19/SKILL.md](../skills/react-19/SKILL.md)
- **`nextjs-15`**: Next.js 15 patterns → [../skills/nextjs-15/SKILL.md](../skills/nextjs-15/SKILL.md)
- **`tailwind-4`**: Tailwind CSS 4 patterns → [../skills/tailwind-4/SKILL.md](../skills/tailwind-4/SKILL.md)

---

*For root-level conventions and full skill reference, see [../AGENTS.md](../AGENTS.md)*
