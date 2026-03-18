# Web App Template

A modern, production-ready web application template combining the best practices from multiple projects. Built with Next.js 15, React 19, TypeScript, and AI SDK 5 in a Turborepo monorepo.

## Features

- 🏗️ **Turborepo Monorepo** - Efficient build system with shared packages
- ⚡ **Modern Stack** - Next.js 15, React 19, TypeScript 5.7+
- 🎨 **Tailwind CSS 4** - Utility-first styling with shadcn/ui components
- 🧠 **State Management** - Zustand 5 with localStorage persistence
- 🤖 **AI Integration** - Built-in AI SDK 5 chat implementation
- 📦 **Shared Packages** - UI components, core logic, and AI utilities
- 🎯 **Type Safety** - Strict TypeScript with Zod validation
- 🧪 **Testing** - Playwright for E2E testing
- 🔍 **Code Quality** - Biome for linting and formatting
- 🤝 **AI-First Workflow** - Comprehensive agent skills library

## Quick Start

### Prerequisites

- Node.js 18.17.0 or higher
- pnpm 8.0.0 or higher

### Installation

```bash
# Clone or copy this template
git clone <your-repo-url> my-app
cd my-app

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Build all packages
pnpm build

# Start production server
cd ui && pnpm start
```

## Project Structure

```
web-app-template/
├── packages/
│   ├── ui/              # Shared UI components (shadcn/ui)
│   ├── core/            # Business logic, stores, schemas
│   └── ai/              # AI agent utilities
├── ui/                  # Main Next.js application
│   ├── app/             # App Router pages and layouts
│   ├── components/      # UI components
│   ├── actions/         # Server Actions
│   ├── hooks/           # React hooks
│   ├── stores/          # Zustand stores
│   └── styles/          # Global styles
├── skills/              # AI agent skills
├── docs/                # Documentation
├── AGENTS.md            # Root agent guide
└── README.md            # This file
```

## Tech Stack

### Core Technologies

- **Next.js 15** - React framework with App Router
- **React 19** - UI library with React Compiler
- **TypeScript 5.7+** - Type safety
- **Tailwind CSS 4** - Utility-first CSS
- **Turborepo** - Monorepo build system
- **pnpm** - Fast package manager

### Key Libraries

- **Zustand 5** - Lightweight state management
- **Zod 4** - Runtime type validation
- **AI SDK 5** - AI chat and streaming
- **shadcn/ui** - Accessible UI components
- **React Hook Form** - Form handling
- **Playwright** - E2E testing
- **Biome** - Linting and formatting

## Package Overview

### @template/ui

Shared UI components built on shadcn/ui and Tailwind CSS.

- Button, Input, Card components
- `cn()` utility for class merging
- Fully typed and accessible

### @template/core

Core business logic and state management.

- Zustand stores with localStorage persistence
- Zod schemas for validation
- Shared TypeScript types

### @template/ai

AI agent utilities and chat functionality.

- AI SDK 5 configuration
- Chat types and interfaces
- Default system prompts

## Key Features Implemented

### 🎨 Design & UX Intelligence

- **ui-ux-pro-max**: Complete design system with searchable database
  - 50+ design styles (glassmorphism, minimalism, brutalism, etc.)
  - 97 color palettes with accessibility guidance
  - 57 professional font pairings
  - 99 UX guidelines prioritized by impact
  - CLI tool for design system generation: `python3 skills/ui-ux-pro-max/scripts/search.py`
- **web-design-guidelines**: Automated UI code review against Web Interface Guidelines
- **wireframe-prototyping**: Wireframing and prototyping best practices

## Key Features

### 1. LocalStorage State Management

Global UI state with automatic persistence:

```typescript
import { useUIStore } from '@template/core'

function MyComponent() {
  const { theme, setTheme } = useUIStore()
  
  return (
    <button onClick={() => setTheme('dark')}>
      Current theme: {theme}
    </button>
  )
}
```

### 2. AI Chat Integration

Full chat implementation with streaming support:

- Chat page at `/chat`
- API route with AI SDK 5
- Configurable LLM provider (OpenAI by default)

To enable chat, copy the example environment file and add your API key:

```bash
# Copy the example file
cp ui/.env.example ui/.env.local

# Edit ui/.env.local and add your OpenAI API key
OPENAI_API_KEY=sk-your-actual-api-key-here
```

### 3. Shared Component Library

Reusable UI components across all applications:

```typescript
import { Button, Card } from '@template/ui'

function MyFeature() {
  return (
    <Card>
      <Button variant="outline">Click me</Button>
    </Card>
  )
}
```

## Environment Variables

The template uses environment variables for configuration. All optional features are disabled by default.

### Setup

```bash
# Copy the example environment file
cp ui/.env.example ui/.env.local

# Edit ui/.env.local with your values
```

### Required Variables

**None** - The template works out of the box without any environment variables.

### Optional Variables

| Variable | Purpose | Get It From |
|----------|---------|-------------|
| `OPENAI_API_KEY` | Enable AI chat features | [platform.openai.com](https://platform.openai.com/api-keys) |
| `NEXT_PUBLIC_APP_URL` | Application base URL | Your domain or `http://localhost:3000` |
| `NEXT_PUBLIC_APP_ENV` | Environment name | `development`, `staging`, `production` |

See `ui/.env.example` for a complete list of available variables including:
- Alternative AI providers (Anthropic, Google, Cohere)
- Analytics (Google Analytics, PostHog)
- Database (PostgreSQL, Supabase)
- Authentication (NextAuth, OAuth)
- Email (Resend, SendGrid)
- File storage (AWS S3, Cloudinary)
- Error tracking (Sentry)

### Security Rules

- ✅ Use `NEXT_PUBLIC_` prefix for client-side variables
- ❌ NEVER commit `.env.local` (already in `.gitignore`)
- ❌ NEVER expose API keys client-side (no `NEXT_PUBLIC_` for secrets)
- ✅ Set production variables in your hosting platform (Vercel, etc.)

## Development Workflow

### Commands

```bash
# Development
pnpm dev              # Start all workspaces in dev mode

# Build
pnpm build            # Build all packages

# Code Quality
pnpm lint             # Run Biome linter
pnpm typecheck        # Run TypeScript compiler
pnpm format           # Format code with Biome

# Testing
pnpm test             # Run all tests
```

### Adding a New Package

1. Create directory in `packages/`
2. Add `package.json` with `"name": "@template/package-name"`
3. Update `pnpm-workspace.yaml` if needed
4. Run `pnpm install` to link packages

### Adding Dependencies

```bash
# Add to specific workspace
pnpm add <package> --filter ui
pnpm add <package> --filter @template/core

# Add to root (dev dependencies)
pnpm add -D <package> -w
```

## Agent Skills

This template includes a comprehensive library of AI agent skills for development:

### Generic Skills
- TypeScript patterns
- React 19 best practices
- Next.js 15 App Router
- Tailwind CSS 4
- Zod 4 validation
- Zustand 5 state management
- AI SDK 5 integration
- Playwright testing

### Template Skills
- `template-web` - UI module patterns
- `template-packages` - Package boundaries
- `template-commit` - Git workflow
- `template-pr` - Pull request guidelines

See [AGENTS.md](AGENTS.md) for the complete skill reference and auto-invoke table.

## Customization

### Update Branding

1. Edit `ui/app/layout.tsx` for metadata
2. Update theme colors in `ui/styles/globals.css`
3. Replace favicon and images in `ui/public/`

### Add New Features

1. Check [AGENTS.md](AGENTS.md) for relevant skills
2. Follow package boundary rules
3. Add shared code to appropriate package
4. Update documentation

### Configure AI Features

Edit `packages/ai/src/agent.ts` to customize:
- Default model
- Temperature
- System prompt
- Max tokens

## Testing

### E2E Tests (Playwright)

```bash
cd ui

# Run tests
pnpm test

# Run with UI
pnpm test:ui
```

### Writing Tests

Place tests in `ui/tests/`. Example:

```typescript
import { test, expect } from '@playwright/test'

test('home page loads', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading')).toContainText('Web App Template')
})
```

## Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set root directory to `ui/`
3. Add environment variables
4. Deploy

### Other Platforms

Build the UI app and deploy the `.next` directory:

```bash
pnpm build
cd ui
# Deploy .next directory
```

## Environment Variables

Create `ui/.env.local`:

```bash
# AI SDK (Optional - for chat features)
OPENAI_API_KEY=your_openai_api_key

# App Configuration
NEXT_PUBLIC_APP_ENV=development
```

**Never commit `.env.local` to version control.**

## Documentation

- [AGENTS.md](AGENTS.md) - Root agent guide with all patterns and skills
- [ui/AGENTS.md](ui/AGENTS.md) - UI-specific patterns
- [docs/GETTING_STARTED.md](docs/GETTING_STARTED.md) - Detailed setup guide
- [skills/](skills/) - Individual skill documentation

## Contributing

1. Check auto-invoke table in [AGENTS.md](AGENTS.md) for relevant skills
2. Follow code standards and conventions
3. Run QA checklist before committing
4. Use conventional commits
5. Add tests for new features
6. Update documentation

## License

MIT

---

**Built with ❤️ using modern web technologies**
