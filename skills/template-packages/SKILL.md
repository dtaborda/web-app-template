---
name: template-packages
description: >
  Shared Turborepo packages patterns. For generic patterns, see: typescript, zod-4, zustand-5, tailwind-4.
  Trigger: When working inside packages/* on shared UI components, core schemas, or AI logic.
license: Apache-2.0
metadata:
  author: Template
  version: "1.0.0"
  scope: [root, packages]
  auto_invoke:
    - "When working in packages/* or modifying shared libraries"
    - "Creating/modifying shared UI components in packages/ui"
    - "Creating/modifying Zod schemas or Zustand stores in packages/core"
    - "Working on AI agent or chat logic in packages/ai"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, Task
---

## Related Generic Skills

- `tailwind-4` - cn() utility, styling rules
- `zod-4` - Schema validation
- `zustand-5` - State management

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| TypeScript | strict | Type safety across all packages |
| Tailwind CSS | 4 | Styling (packages/ui) |
| shadcn/ui | latest | UI primitives (packages/ui) |
| Zod | 4 | Schema validation (packages/core) |
| Zustand | 5 | State management (packages/core) |
| AI SDK | 5 | Chat generation (packages/ai) |
| Biome | latest | Lint + format (all packages) |

---

## CRITICAL: Package Boundary Rules

- **packages/ui**: ONLY visual React components. No business logic. No API calls. No state management.
- **packages/core**: ONLY schemas (Zod), stores (Zustand), and TypeScript types. No React components. No API calls.
- **packages/ai**: ONLY AI agent logic and chat utilities. No React components. No UI state.

---

## CRITICAL: Export Convention

Every package MUST use explicit exports in `src/index.ts`:

```typescript
// packages/ui/src/index.ts
export { Button, type ButtonProps } from './button'
export { Input, type InputProps } from './input'
export { Card, CardHeader, CardTitle, CardContent } from './card'
export { cn } from './lib/utils'

// packages/core/src/index.ts
export { useUIStore, type UIStore } from './store/ui-store'
export { userSchema } from './schemas'
export type { User, Theme } from './types'

// packages/ai/src/index.ts
export { defaultChatOptions, defaultSystemPrompt } from './agent'
export type { ChatMessage, ChatOptions } from './types'
```

---

## Package Structure

### packages/ui - Shared UI Components

```
packages/ui/
├── src/
│   ├── index.ts              # Public exports
│   ├── button.tsx            # shadcn Button
│   ├── input.tsx             # shadcn Input
│   ├── card.tsx              # shadcn Card
│   └── lib/
│       └── utils.ts          # cn() utility
├── package.json
└── tsconfig.json
```

**Purpose**: Shared visual components only
**Dependencies**: React, Tailwind utilities (clsx, tailwind-merge, cva)
**No**: Business logic, API calls, state management

**Example Component**:
```typescript
// packages/ui/src/button.tsx
import { type VariantProps, cva } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from './lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        outline: 'border border-input bg-background',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}
```

---

### packages/core - Business Logic

```
packages/core/
├── src/
│   ├── index.ts              # Public exports
│   ├── schemas/
│   │   └── index.ts          # Zod schemas
│   ├── store/
│   │   └── ui-store.ts       # Zustand stores
│   └── types/
│       └── index.ts          # TypeScript types
├── package.json
└── tsconfig.json
```

**Purpose**: Business logic, validation, state, types
**Dependencies**: Zod, Zustand
**No**: React components, UI libraries, API endpoints

**Example Store** (with localStorage persistence):
```typescript
// packages/core/src/store/ui-store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UIStore {
  theme: 'light' | 'dark'
  sidebarOpen: boolean
  toggleSidebar: () => void
  setTheme: (theme: 'light' | 'dark') => void
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      theme: 'light',
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'ui-store', // localStorage key
      partialize: (state) => ({
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
)
```

**Example Schema**:
```typescript
// packages/core/src/schemas/index.ts
import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
})

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
})

export type User = z.infer<typeof userSchema>
export type Contact = z.infer<typeof contactSchema>
```

**Example Types**:
```typescript
// packages/core/src/types/index.ts
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
```

---

### packages/ai - AI Agent Logic

```
packages/ai/
├── src/
│   ├── index.ts              # Public exports
│   ├── agent.ts              # AI agent config
│   └── types.ts              # AI types
├── package.json
└── tsconfig.json
```

**Purpose**: AI agent utilities and chat configuration
**Dependencies**: AI SDK (Vercel), Zod
**No**: React components, UI state, UI libraries

**Example Agent Config**:
```typescript
// packages/ai/src/agent.ts
import type { ChatOptions } from './types'

export const defaultChatOptions: ChatOptions = {
  model: 'gpt-4o-mini',
  temperature: 0.7,
  maxTokens: 1000,
}

export const defaultSystemPrompt = `You are a helpful assistant. Be concise and clear.`
```

**Example Types**:
```typescript
// packages/ai/src/types.ts
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
```

---

## Package Dependencies

### packages/ui/package.json

```json
{
  "name": "@template/ui",
  "version": "0.1.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "dependencies": {
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.6.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.18",
    "react": "^19.0.0",
    "typescript": "^5.7.2"
  },
  "peerDependencies": {
    "react": "^19.0.0"
  }
}
```

### packages/core/package.json

```json
{
  "name": "@template/core",
  "version": "0.1.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "dependencies": {
    "zod": "^4.0.0-beta.1",
    "zustand": "^5.0.2"
  },
  "devDependencies": {
    "typescript": "^5.7.2"
  }
}
```

### packages/ai/package.json

```json
{
  "name": "@template/ai",
  "version": "0.1.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "dependencies": {
    "ai": "^4.0.0",
    "zod": "^4.0.0-beta.1"
  },
  "devDependencies": {
    "typescript": "^5.7.2"
  }
}
```

---

## Usage Examples

### Using @template/ui in ui/

```typescript
// ui/app/page.tsx
import { Button, Card, CardHeader, CardTitle } from '@template/ui'

export default function HomePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <Button>Get Started</Button>
    </Card>
  )
}
```

### Using @template/core in ui/

```typescript
// ui/components/user-profile.tsx
'use client'

import { useUIStore } from '@template/core'
import { userSchema, type User } from '@template/core'

export function UserProfile({ data }: { data: unknown }) {
  const { theme } = useUIStore()
  const user = userSchema.parse(data)
  
  return <div>Theme: {theme}, User: {user.name}</div>
}
```

### Using @template/ai in ui/

```typescript
// ui/app/api/chat/route.ts
import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { defaultSystemPrompt, defaultChatOptions } from '@template/ai'

export async function POST(req: Request) {
  const { messages } = await req.json()
  
  const result = streamText({
    model: openai(defaultChatOptions.model!),
    system: defaultSystemPrompt,
    messages,
  })
  
  return result.toDataStreamResponse()
}
```

---

## Anti-Patterns

### ❌ Don't: Add business logic to packages/ui

```typescript
// ❌ Bad - Business logic in UI package
// packages/ui/src/user-card.tsx
export function UserCard({ userId }: Props) {
  const user = await fetch(`/api/users/${userId}`)
  return <Card>{user.name}</Card>
}
```

```typescript
// ✅ Good - Pass data as props
// packages/ui/src/card.tsx
export function Card({ children }: Props) {
  return <div className="rounded-lg border">{children}</div>
}

// ui/components/user-card.tsx
import { Card } from '@template/ui'
export function UserCard({ user }: { user: User }) {
  return <Card>{user.name}</Card>
}
```

### ❌ Don't: Add React components to packages/core

```typescript
// ❌ Bad - React component in core package
// packages/core/src/user-badge.tsx
export function UserBadge({ user }: Props) {
  return <span>{user.name}</span>
}
```

```typescript
// ✅ Good - Only types and schemas
// packages/core/src/types/user.ts
export interface User {
  id: string
  name: string
}
```

### ❌ Don't: Add UI state to packages/ai

```typescript
// ❌ Bad - UI state in AI package
// packages/ai/src/chat-state.ts
export const useChatState = create((set) => ({
  isOpen: false,
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
}))
```

```typescript
// ✅ Good - Only AI logic
// packages/ai/src/agent.ts
export const defaultSystemPrompt = "..."
```

---

## Scope Rule

When to create a shared package export vs. keep local:

**Create shared export when**:
- Used in 2+ apps
- Used in 2+ places within same app
- Clear abstraction boundary
- Stable API

**Keep local when**:
- Used in 1 place
- Still evolving
- App-specific

Example:
```typescript
// ❌ Premature - used once
// packages/core/src/utils/format-date.ts

// ✅ Good - keep local first
// ui/lib/utils/format-date.ts

// ✅ Good - after used in multiple places
// packages/core/src/utils/format-date.ts (now used in 3+ places)
```

---

## Checklist

Before committing changes in `packages/*`:

- [ ] Followed package boundary rules
- [ ] Exported from src/index.ts
- [ ] No React in packages/core or packages/ai
- [ ] No business logic in packages/ui
- [ ] Added proper TypeScript types
- [ ] Updated package.json if new dependencies
- [ ] Code passes `pnpm typecheck` and `pnpm lint`
- [ ] Tested in ui/ app

---

## Commands

```bash
# Development (from root)
pnpm dev              # Start all packages + ui

# Add dependency to package
pnpm add <package> --filter @template/ui
pnpm add <package> --filter @template/core

# Typecheck specific package
pnpm --filter @template/ui typecheck

# Build specific package
pnpm --filter @template/core build
```

---

**This skill focuses on shared package conventions. For UI module patterns, see `template-web` skill.**
