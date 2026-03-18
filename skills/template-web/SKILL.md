---
name: template-web
description: >
  UI module patterns for Next.js + React monorepo template. For generic patterns, see: typescript, react-19, nextjs-15, tailwind-4.
  Trigger: When working inside ui on frontend conventions (shadcn, folder placement, actions, shared types/hooks/lib).
license: Apache-2.0
metadata:
  author: Template
  version: "1.0.0"
  scope: [root, ui]
  auto_invoke:
    - "When working in ui or modifying frontend React/Next.js code"
    - "Creating/modifying UI components or pages"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, Task
---

## Related Generic Skills

- `react-19` - No useMemo/useCallback, React Compiler
- `nextjs-15` - App Router, Server Actions
- `tailwind-4` - cn() utility, styling rules
- `zod-4` - Schema validation
- `zustand-5` - State management
- `playwright` - E2E testing

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15 | App Router, Server Actions |
| React | 19 | UI (React Compiler) |
| TypeScript | strict | Type safety |
| Tailwind CSS | 4 | Styling |
| shadcn/ui | latest | Component library (via @template/ui) |
| Zustand | 5 | App-level state |
| Zod | 4 | Validation |
| React Hook Form | 7 | Form handling |
| AI SDK | 5 | Chat features |
| Biome | latest | Lint + format |
| Playwright | latest | E2E testing |

---

## CRITICAL: Component Library Rule

- **ALWAYS**: Use `shadcn/ui` + Tailwind (via `@template/ui`)
- **NEVER**: Add external UI libraries (no MUI, no Chakra, no Ant Design) without approval

---

## CRITICAL: Package Boundary Rule

- **Shared UI primitives** (Button, Input, Card, etc.) → `packages/ui` (imported as `@template/ui`)
- **Domain-specific components** (UserCard, ContactForm, etc.) → `ui/components/`
- **Shared schemas/types** (Zod schemas, TypeScript types) → `packages/core` (imported as `@template/core`)
- **AI/chat logic** (agent, chat types) → `packages/ai` (imported as `@template/ai`)

---

## Code Placement

```
ui/
├── app/
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   ├── chat/                     # Chat feature
│   │   └── page.tsx
│   └── api/
│       └── chat/
│           └── route.ts          # Chat API endpoint
├── components/
│   ├── chat/                     # Chat UI components
│   └── system/                   # Error, loading states
├── actions/                      # Server Actions
│   └── {feature}/
│       └── action.ts
├── hooks/                        # Shared React hooks
│   └── use-{hook-name}.ts
├── lib/
│   ├── contracts/                # Type definitions
│   │   └── {domain}.ts
│   └── utils/                    # Utilities
│       └── {utility}.ts
├── stores/                       # App-specific Zustand stores
│   └── {store-name}-store.ts
├── styles/
│   └── globals.css               # Global styles + Tailwind
└── tests/                        # Playwright E2E tests
    └── {feature}.spec.ts
```

---

## Scope Rule

- **2+ places**: Move to `lib/`, `hooks/`, `components/{domain}/`, or shared package
- **1 place**: Keep it local in the feature directory

Example:
```typescript
// ❌ Bad - premature abstraction
// lib/utils/format-date.ts  (used once)

// ✅ Good - keep local
// app/dashboard/format-date.ts  (used once here)

// ✅ Good - shared utility
// lib/utils/format-date.ts  (used in 3+ places)
```

---

## Component Patterns

### 1. Client Components

Use `"use client"` for:
- Event handlers
- State management
- Browser APIs
- Third-party libraries

```typescript
'use client'

import { Button } from '@template/ui'
import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <Button onClick={() => setCount(count + 1)}>
      Count: {count}
    </Button>
  )
}
```

### 2. Server Components (Default)

No `"use client"` directive:
- Data fetching
- Direct database access
- API calls
- Static rendering

```typescript
// No "use client" directive - this is a Server Component
import { Card } from '@template/ui'

export default async function HomePage() {
  // Can fetch data directly
  const data = await fetch('...')
  
  return <Card>{/* ... */}</Card>
}
```

### 3. Server Actions

Place in `actions/{feature}/`:

```typescript
// actions/contact/create-contact.ts
'use server'

import { contactSchema } from '@template/core'
import { revalidatePath } from 'next/cache'

export async function createContact(formData: FormData) {
  const data = contactSchema.parse({
    name: formData.get('name'),
    email: formData.get('email'),
  })
  
  // Save to database...
  
  revalidatePath('/contacts')
  return { success: true }
}
```

Usage:
```typescript
'use client'

import { createContact } from '@/actions/contact/create-contact'
import { Button } from '@template/ui'

export function ContactForm() {
  return (
    <form action={createContact}>
      {/* form fields */}
      <Button type="submit">Save</Button>
    </form>
  )
}
```

### 4. Forms with React Hook Form

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
  
  const onSubmit = async (data: Contact) => {
    // Handle form submission
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}
      <Button type="submit">Submit</Button>
    </form>
  )
}
```

---

## State Management

### Global UI State (from @template/core)

```typescript
'use client'

import { useUIStore } from '@template/core'

export function ThemeToggle() {
  const { theme, setTheme } = useUIStore()
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle theme
    </button>
  )
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

## Styling with Tailwind

### Using cn() Utility

```typescript
import { cn } from '@template/ui'

function MyComponent({ className, variant }: Props) {
  return (
    <div
      className={cn(
        'base-classes',
        variant === 'primary' && 'primary-classes',
        variant === 'secondary' && 'secondary-classes',
        className
      )}
    />
  )
}
```

### Never use var() in className

```typescript
// ❌ Bad - Don't use var() in className
<div className="bg-[var(--primary)]" />

// ✅ Good - Use Tailwind theme tokens
<div className="bg-primary" />

// ✅ Good - Define in globals.css if needed
// globals.css:
// :root { --primary: 220 70% 50%; }
// component:
<div className="bg-primary" />
```

---

## Testing with Playwright

Place tests in `tests/`:

```typescript
// tests/home.spec.ts
import { test, expect } from '@playwright/test'

test('home page loads', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading')).toContainText('Web App Template')
})

test('theme toggle works', async ({ page }) => {
  await page.goto('/')
  const toggle = page.getByRole('button', { name: /theme/i })
  await toggle.click()
  // Assert theme changed
})
```

---

## Type Safety

### Shared Types (packages/core)

```typescript
// packages/core/src/types/user.ts
export interface User {
  id: string
  email: string
  name?: string
}
```

### Local Types (ui/lib/contracts)

```typescript
// lib/contracts/dashboard.ts
export interface DashboardStats {
  users: number
  revenue: number
  growth: number
}
```

---

## React 19 Rules

**NEVER use useMemo or useCallback**:

```typescript
// ❌ Bad - React Compiler handles this
const memoized = useMemo(() => expensive(), [dep])
const callback = useCallback(() => {}, [dep])

// ✅ Good - Just write the code
const memoized = expensive()
const callback = () => {}
```

**Use useTransition for async updates**:

```typescript
'use client'

import { useTransition } from 'react'

export function DeleteButton({ id }: Props) {
  const [isPending, startTransition] = useTransition()
  
  return (
    <button
      onClick={() => startTransition(async () => {
        await deleteItem(id)
      })}
      disabled={isPending}
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  )
}
```

---

## Anti-Patterns

### ❌ Don't: Create UI components in ui/

```typescript
// ❌ Bad - UI primitives should be in packages/ui
// ui/components/button.tsx
export function Button() { /* ... */ }
```

```typescript
// ✅ Good - Use from @template/ui
import { Button } from '@template/ui'
```

### ❌ Don't: Put business logic in components

```typescript
// ❌ Bad - Business logic in component
function UserList() {
  const users = db.query('SELECT * FROM users')
  // ...
}
```

```typescript
// ✅ Good - Use Server Actions
async function getUsers() {
  'use server'
  return db.query('SELECT * FROM users')
}

function UserList() {
  const users = await getUsers()
  // ...
}
```

### ❌ Don't: Use inline styles

```typescript
// ❌ Bad
<div style={{ color: 'red', padding: '16px' }} />

// ✅ Good
<div className="text-red-500 p-4" />
```

---

## Checklist

Before committing changes in `ui/`:

- [ ] Used `@template/ui` for UI components
- [ ] Followed scope rule (2+ places = shared)
- [ ] No `useMemo`/`useCallback`
- [ ] Used Server Actions for mutations
- [ ] Added proper TypeScript types
- [ ] Used `cn()` for conditional classes
- [ ] No `var()` in className
- [ ] Tested manually
- [ ] Added E2E test if user-facing
- [ ] Code passes `pnpm typecheck` and `pnpm lint`

---

## Commands

```bash
# Development
pnpm dev              # Start dev server

# Code Quality
pnpm lint             # Lint with Biome
pnpm typecheck        # TypeScript check

# Testing
pnpm test             # Run Playwright tests
pnpm test:ui          # Playwright with UI

# Build
pnpm build            # Production build
```

---

**This skill focuses on UI module conventions. For shared package patterns, see `template-packages` skill.**
