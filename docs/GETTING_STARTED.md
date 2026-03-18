# Getting Started with Web App Template

This guide will walk you through setting up and customizing the Web App Template for your project.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.17.0 or higher ([download](https://nodejs.org/))
- **pnpm** 8.0.0 or higher
  ```bash
  npm install -g pnpm
  ```

## Initial Setup

### 1. Clone the Template

```bash
# Clone or copy this template
git clone <your-repo-url> my-app
cd my-app

# Install dependencies
pnpm install
```

### 2. Verify Installation

Run these commands to ensure everything is set up correctly:

```bash
# Type checking
pnpm typecheck        # Should pass with no errors

# Linting
pnpm lint             # Should pass with no errors

# Start dev server
pnpm dev              # Should start on http://localhost:3000
```

Visit [http://localhost:3000](http://localhost:3000) to see your app running.

### 3. Explore the Structure

```
web-app-template/
├── packages/         # Shared packages
│   ├── ui/          # UI components (@template/ui)
│   ├── core/        # Business logic (@template/core)
│   └── ai/          # AI utilities (@template/ai)
├── ui/              # Main Next.js app
├── skills/          # AI agent skills
└── docs/            # Documentation
```

## Understanding the Monorepo

This template uses **Turborepo** to manage multiple packages:

### Workspace Packages

1. **`packages/ui`** - Shared UI components
   - Button, Input, Card, etc.
   - Built on shadcn/ui and Tailwind
   - Imported as `@template/ui`

2. **`packages/core`** - Business logic
   - Zustand stores with localStorage
   - Zod schemas
   - Shared types
   - Imported as `@template/core`

3. **`packages/ai`** - AI agent utilities
   - Chat configuration
   - System prompts
   - AI SDK helpers
   - Imported as `@template/ai`

4. **`ui`** - Main application
   - Next.js 15 App Router
   - Pages and layouts
   - Server Actions
   - API routes

### How Packages Work Together

```typescript
// In ui/app/page.tsx
import { Button } from '@template/ui'           // From packages/ui
import { useUIStore } from '@template/core'     // From packages/core
import { defaultSystemPrompt } from '@template/ai' // From packages/ai

export default function HomePage() {
  const { theme } = useUIStore()
  
  return <Button>Current theme: {theme}</Button>
}
```

## Customization Guide

### 1. Update Branding

**Update app metadata** in `ui/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'My Awesome App',
  description: 'My application description',
}
```

**Update theme colors** in `ui/styles/globals.css`:

```css
:root {
  --primary: 220 70% 50%;        /* Your brand color */
  --secondary: 210 40% 96%;
  /* ... other colors */
}
```

**Add your logo** to `ui/public/` and update references.

### 2. Configure AI Features

To enable the chat feature:

1. Get an OpenAI API key from [platform.openai.com](https://platform.openai.com)

2. Copy the example environment file:
   ```bash
   cp ui/.env.example ui/.env.local
   ```

3. Edit `ui/.env.local` and add your API key:
   ```bash
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

3. Customize the AI agent in `packages/ai/src/agent.ts`:
   ```typescript
   export const defaultChatOptions: ChatOptions = {
     model: 'gpt-4o-mini',        // Change model
     temperature: 0.7,            // Adjust creativity
     maxTokens: 1000,             // Set response length
   }
   
   export const defaultSystemPrompt = `Your custom system prompt here`
   ```

4. Visit [http://localhost:3000/chat](http://localhost:3000/chat) to test

### 3. Add New Pages

Create a new page in `ui/app/`:

```typescript
// ui/app/about/page.tsx
export default function AboutPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold">About</h1>
      <p>Your content here</p>
    </div>
  )
}
```

### 4. Add Shared Components

Add reusable components to `packages/ui/src/`:

```typescript
// packages/ui/src/badge.tsx
import { cn } from './lib/utils'

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        className
      )}
      {...props}
    />
  )
}
```

Export it in `packages/ui/src/index.ts`:

```typescript
export { Badge } from './badge'
```

Use it anywhere:

```typescript
import { Badge } from '@template/ui'

function MyComponent() {
  return <Badge>New</Badge>
}
```

### 5. Add State Management

Create a new store in `packages/core/src/store/`:

```typescript
// packages/core/src/store/user-store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserStore {
  user: { name: string; email: string } | null
  setUser: (user: UserStore['user']) => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: 'user-store',
    }
  )
)
```

Export in `packages/core/src/index.ts`:

```typescript
export { useUserStore } from './store/user-store'
```

Use it:

```typescript
import { useUserStore } from '@template/core'

function Profile() {
  const { user, setUser } = useUserStore()
  // ...
}
```

### 6. Add Validation Schemas

Create schemas in `packages/core/src/schemas/`:

```typescript
// packages/core/src/schemas/contact.ts
import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})

export type Contact = z.infer<typeof contactSchema>
```

Use with React Hook Form:

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type Contact } from '@template/core'

function ContactForm() {
  const { register, handleSubmit } = useForm<Contact>({
    resolver: zodResolver(contactSchema),
  })
  
  // ...
}
```

## Development Workflow

### Working with Multiple Packages

When you modify code in `packages/*`, changes are automatically reflected in `ui/` thanks to hot module replacement.

### Adding Dependencies

```bash
# To UI app
pnpm add <package> --filter ui

# To a shared package
pnpm add <package> --filter @template/core

# Dev dependencies at root
pnpm add -D <package> -w
```

### Running Commands in Specific Workspaces

```bash
# Run dev server only for UI
pnpm --filter ui dev

# Build only core package
pnpm --filter @template/core build

# Run lint in all packages
pnpm lint
```

### Testing

```bash
# E2E tests
cd ui
pnpm test

# With Playwright UI
pnpm test:ui

# Generate tests
pnpm playwright codegen http://localhost:3000
```

## AI-First Development

This template includes comprehensive AI agent skills. Before making changes:

1. **Check AGENTS.md** - Read the [root AGENTS.md](../AGENTS.md) and [ui/AGENTS.md](../ui/AGENTS.md)
2. **Review auto-invoke table** - Find skills that match your task
3. **Load the skill** - Read the skill's SKILL.md for patterns
4. **Follow conventions** - Apply the patterns from the skill

Example workflow:

```bash
# Task: Add a new React component

# 1. Check AGENTS.md auto-invoke table
#    → "Writing React components" → react-19 skill

# 2. Read skills/react-19/SKILL.md
#    → Never use useMemo/useCallback
#    → Use 'use client' for client components

# 3. Write component following patterns
# 4. Run QA checks before committing
```

## Common Tasks

### Task: Add a New Feature Page

1. Create page in `ui/app/feature/page.tsx`
2. Add components in `ui/components/feature/`
3. Add Server Actions in `ui/actions/feature/`
4. Add shared types to `packages/core/src/types/`
5. Test and verify

### Task: Add a Shared UI Component

1. Create component in `packages/ui/src/component.tsx`
2. Export in `packages/ui/src/index.ts`
3. Use in `ui/` anywhere
4. Document in component comments

### Task: Add API Integration

1. Create Server Action in `ui/actions/api/`
2. Add types to `packages/core/src/types/`
3. Add validation schemas to `packages/core/src/schemas/`
4. Use in components via `useTransition` or form actions

### Task: Add E2E Test

1. Create test file in `ui/tests/`
2. Use Page Object pattern
3. Run with `pnpm test`
4. Add to CI/CD pipeline

## Package Boundaries

**Follow these rules:**

- **`packages/ui/`** - Only UI primitives, no business logic
- **`packages/core/`** - Business logic, no UI components
- **`packages/ai/`** - AI utilities, no UI or business logic
- **`ui/`** - Application code, can import from all packages

**Scope rule:**
- Used 2+ places → Move to shared package
- Used 1 place → Keep local

## Environment Variables

Create `ui/.env.local` for local development:

```bash
# AI SDK (Optional)
OPENAI_API_KEY=your_key

# App Config
NEXT_PUBLIC_APP_ENV=development

# API URLs
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Rules:**
- Never commit `.env.local`
- Use `NEXT_PUBLIC_` for client-accessible vars
- Keep secrets server-side only

## Code Quality

Before every commit:

```bash
# Type check
pnpm typecheck

# Lint
pnpm lint

# Format
pnpm format

# Test
pnpm test
```

Use conventional commits:

```bash
git commit -m "feat(ui): add contact form"
git commit -m "fix(core): resolve store persistence issue"
git commit -m "docs: update getting started guide"
```

## Deployment

### Deploy to Vercel

1. Push code to GitHub/GitLab
2. Connect repository to Vercel
3. Configure:
   - Root directory: `ui`
   - Build command: `cd .. && pnpm build --filter=ui`
   - Output directory: `ui/.next`
4. Add environment variables in Vercel dashboard
5. Deploy

### Deploy to Other Platforms

1. Build the project:
   ```bash
   pnpm build
   ```

2. The built UI is in `ui/.next/`

3. Set environment variables on your platform

4. Start with:
   ```bash
   cd ui && pnpm start
   ```

## Getting Help

- **AGENTS.md** - Check auto-invoke table and skill reference
- **Skills** - Read individual SKILL.md files in `skills/`
- **Code examples** - Look at existing implementations in `ui/`
- **Documentation** - Browse `docs/` folder

## Next Steps

1. ✅ Complete initial setup
2. ✅ Understand the structure
3. ✅ Try customization examples
4. 🚀 Build your application!

Start by exploring:
- [Root AGENTS.md](../AGENTS.md) - Complete guide
- [UI AGENTS.md](../ui/AGENTS.md) - UI patterns
- [Skills directory](../skills/) - All available skills

---

Happy coding! 🎉
