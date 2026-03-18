# Web App Template - Root Agent Guide

> **CRITICAL INSTRUCTION**: **ALL code, documentation, comments, and responses MUST be in English ONLY.** This is a strict requirement for the entire project.

> **Navigation**: This is the root `AGENTS.md`. For UI-specific guidance:
> - **UI Module**: [`ui/AGENTS.md`](ui/AGENTS.md) - Next.js frontend patterns

---

## Core Directives

1. **English-Only Rule**: All code, technical documentation, commits, and PRs MUST be in English. Spanish is ONLY allowed for user-facing UI copy.
2. **Skill First**: Before starting any task, check the Auto-invoke table below. If a task matches a skill, you MUST load and follow it.
3. **No Assumptions**: Do not assume the existence of a package or tool. Check `package.json` or `pnpm-workspace.yaml` first.

## Skill Naming Policy (Mandatory)

Use these categories to avoid naming conflicts and keep portability clear:

- **Generic skill** (library/technical practice): use neutral names like `react-19`, `typescript`, `nextjs-15`.
- **`template-*`**: Template-specific skills for architecture, UI patterns, and workflows.

When creating a new skill:

1. Pick prefix by intent (generic vs `template-*`).
2. Keep consistent metadata format.
3. Register the skill in this file and run skill-sync if available.

---

## Quick Reference

### Available Modules

| Module | Location | Status | Description |
|--------|----------|--------|-------------|
| ✅ **UI** | `ui/` | Ready | Next.js 15 + React 19 + Tailwind 4 frontend |
| ✅ **UI Components** | `packages/ui/` | Ready | Shared UI components (shadcn/ui based) |
| ✅ **Core** | `packages/core/` | Ready | Business logic, Zustand stores, Zod schemas |
| ✅ **AI** | `packages/ai/` | Ready | AI SDK 5 chat agent utilities |

**Legend:**
- ✅ Fully implemented and documented

---

## Tech Stack

### Monorepo Setup

| Technology | Version | Purpose |
|------------|---------|---------|
| Turborepo | 2.x | Monorepo build system |
| pnpm | 9+ | Package management with workspaces |
| Biome | latest | Linting + formatting (replaces ESLint/Prettier) |
| TypeScript | 5.7+ | Type safety (strict mode) |

### UI Module

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15 | App Router, Server Actions, SSR |
| React | 19 | UI (React Compiler enabled) |
| Tailwind CSS | 4 | Utility-first styling |
| shadcn/ui | latest | Component library |
| Zustand | 5 | State management with localStorage persist |
| Zod | 4 | Runtime validation |
| React Hook Form | 7 | Form handling |
| AI SDK | 5 | Chat/streaming features |
| Playwright | latest | E2E testing |

### Shared Packages

| Package | Purpose |
|---------|---------|
| `@template/ui` | UI primitives (Button, Input, Card, etc.) |
| `@template/core` | Business logic, stores, schemas, types |
| `@template/ai` | AI agent utilities and chat types |

---

## Architecture & Folder Structure

This is a Turborepo monorepo. Follow this decision tree for file placement:

- **Is it a user-facing web application?**
  👉 Put it in `ui/` (e.g., Next.js applications).
- **Is it a shared UI component (shadcn, generic buttons, layouts)?**
  👉 Put it in `packages/ui/`.
- **Is it core business logic, Zod schemas, or Zustand stores used across apps?**
  👉 Put it in `packages/core/`.
- **Is it related to AI agents, chat, or streaming features?**
  👉 Put it in `packages/ai/`.

### Package Boundaries

**`packages/ui/`**
- UI primitives only (Button, Input, Card, etc.)
- No business logic
- No external dependencies beyond styling utilities
- Use `cn()` for conditional classes

**`packages/core/`**
- Business logic and domain types
- Zustand stores (with localStorage persistence)
- Zod schemas for validation
- Shared utility functions

**`packages/ai/`**
- AI agent configuration
- Chat utilities
- Streaming helpers

**`ui/`**
- Next.js application
- Page components and layouts
- Server Actions
- API routes
- App-specific components

### Scope Rule

- **Used 2+ places** → Shared package (`packages/ui/`, `packages/core/`)
- **Used 1 place** → Keep local in feature directory

---

## Build, Lint & Test Commands

### Root Level (All Packages)

```bash
# Setup
pnpm install

# Development (runs all workspaces)
pnpm dev

# Build all packages
pnpm build

# Linting
pnpm lint                   # Run Biome linter on all packages
pnpm format:check           # Check formatting
pnpm format                 # Write formatting changes

# Type Checking
pnpm typecheck              # Run TypeScript on all packages

# Testing
pnpm test                   # Run tests in all packages

# Clean
pnpm clean                  # Remove all build artifacts
```

### UI Module

```bash
cd ui

# Development
pnpm dev                    # Start dev server (port 3000)

# Build
pnpm build                  # Production build
pnpm start                  # Start production server

# Linting & Formatting
pnpm lint                   # Run Biome linter
pnpm typecheck              # TypeScript check

# Testing
pnpm test                   # Run Playwright E2E tests
pnpm test:ui                # Run Playwright with UI
```

---

## Code & Domain Standards

### TypeScript
- Strict mode enabled (`noImplicitAny`, `noUncheckedIndexedAccess`, no `@ts-ignore`)
- Use const types: `const X = { A: "a" } as const`
- Flat interfaces (one level depth max)
- Type inference over explicit types where possible
- Export types alongside implementations

### React
- Import named exports: `import { useState } from "react"`
- ❌ NEVER use `useMemo` or `useCallback` (React Compiler handles it)
- Client components: `"use client"` directive
- Server components: Default (no directive)
- Use Server Actions for mutations

### Styling
- Tailwind classes only (no inline hex colors)
- Use `cn()` helper for conditional classes
- ❌ NEVER use `var()` in className - use Tailwind theme values directly
- Prefer Tailwind tokens over custom values
- Use theme CSS variables in globals.css only

### Component Library
- ✅ ALWAYS use shadcn/ui + Tailwind
- ❌ NEVER add external UI libraries without approval
- Extend shadcn components in `packages/ui/`

### State Management (Zustand 5)
- Global UI state in `packages/core/src/store/`
- Use `persist` middleware for localStorage
- App-specific state in `ui/stores/`
- Selectors for optimal re-renders: `useStore(state => state.value)`

### Validation (Zod 4)
- Shared schemas in `packages/core/src/schemas/`
- Breaking changes from v3: `.email()` and `.uuid()` require explicit import
- Use with React Hook Form for forms

### File Organization
- **Used 2+ places** → `packages/ui/`, `packages/core/`, or `ui/lib/`, `ui/hooks/`, `ui/components/{domain}/`
- **Used 1 place** → Keep local in feature directory
- Server actions → `ui/actions/{feature}/`
- Types (shared) → `packages/core/src/types/` or `ui/lib/contracts/`

---

## Commit & PR Guidelines

### Commit Messages (Conventional Commits)

```bash
<type>[optional scope]: <description>

# Types:
# - feat: New feature
# - fix: Bug fix
# - docs: Documentation only
# - style: Formatting (no code change)
# - refactor: Code restructuring
# - perf: Performance improvement
# - test: Adding tests
# - chore: Maintenance tasks

# Examples:
feat(ui): add chat page with AI SDK 5
feat(core): add localStorage persistence to UI store
fix(ui): resolve form validation race condition
docs: update setup instructions in README
chore: upgrade to Next.js 15.1.4
```

### Pre-Commit Checklist

**Before committing**:
- [ ] Code compiles: `pnpm typecheck`
- [ ] Linting passes: `pnpm lint`
- [ ] Tests pass: `pnpm test`
- [ ] No secrets in code
- [ ] All console.logs removed (except intentional logging)
- [ ] Commit message follows Conventional Commits
- [ ] English is used for commit message and code

**Before creating PR**:
- [ ] Update relevant documentation
- [ ] Add tests for new features
- [ ] Include screenshots for UI changes
- [ ] Link related issues
- [ ] All packages build successfully

---

## QA Checklist

### Before Deployment

- [ ] All tests pass (`pnpm test`)
- [ ] Type checking passes (`pnpm typecheck`)
- [ ] Linting passes (`pnpm lint`)
- [ ] Production build succeeds (`pnpm build`)
- [ ] No console errors in dev tools
- [ ] All UI states handled (loading, error, empty)
- [ ] Accessibility: keyboard nav, ARIA labels, contrast
- [ ] Responsive: Test 360px to 2560px
- [ ] No secrets in code or environment files
- [ ] Environment variables documented

---

## Available Skills

### Generic Frontend Skills

| Skill | Description | Path |
|-------|-------------|------|
| `typescript` | Const types, flat interfaces, utility types | [SKILL.md](skills/typescript/SKILL.md) |
| `react-19` | No `useMemo`/`useCallback`, React Compiler rules | [SKILL.md](skills/react-19/SKILL.md) |
| `nextjs-15` | App Router, Server Actions, streaming | [SKILL.md](skills/nextjs-15/SKILL.md) |
| `tailwind-4` | cn() helper, token palette, no var() in className | [SKILL.md](skills/tailwind-4/SKILL.md) |
| `zod-4` | Runtime validation (`z.email()`, `z.uuid()`) | [SKILL.md](skills/zod-4/SKILL.md) |
| `zustand-5` | Persist middleware, selectors, slices | [SKILL.md](skills/zustand-5/SKILL.md) |
| `ai-sdk-5` | Vercel AI SDK 5 usage, streaming patterns | [SKILL.md](skills/ai-sdk-5/SKILL.md) |
| `playwright` | E2E testing, Page Objects, selectors | [SKILL.md](skills/playwright/SKILL.md) |
| `frontend-design` | Building distinctive UI components | [SKILL.md](skills/frontend-design/SKILL.md) |

### Design & UX Skills

| Skill | Description | Path |
|-------|-------------|------|
| `ui-ux-pro-max` | Complete design system: 50+ styles, 97 palettes, 57 font pairings, 99 UX guidelines | [SKILL.md](skills/ui-ux-pro-max/SKILL.md) |
| `web-design-guidelines` | Review UI code against Web Interface Guidelines (accessibility, UX) | [SKILL.md](skills/web-design-guidelines/SKILL.md) |
| `wireframe-prototyping` | Wireframing fundamentals, prototyping tools, layout patterns | [SKILL.md](skills/wireframe-prototyping/SKILL.md) |

### Template-Specific Skills

| Skill | Purpose | Path |
|-------|---------|------|
| `template-web` | UI module patterns, Next.js structure | [SKILL.md](skills/template-web/SKILL.md) |
| `template-packages` | Shared package patterns and boundaries | [SKILL.md](skills/template-packages/SKILL.md) |
| `template-commit` | Git workflow and commit conventions | [SKILL.md](skills/template-commit/SKILL.md) |
| `template-pr` | Pull request workflow and guidelines | [SKILL.md](skills/template-pr/SKILL.md) |

### Meta Skills

| Skill | Purpose | Path |
|-------|---------|------|
| `skill-creator` | Create new agent skills | [SKILL.md](skills/skill-creator/SKILL.md) |
| `skill-sync` | Sync auto-invoke tables in AGENTS.md | [SKILL.md](skills/skill-sync/SKILL.md) |

### Auto-invoke Skills

When performing these actions, ALWAYS invoke the corresponding skill FIRST:

<!-- AUTO-INVOKE-START -->
<!-- This section is managed by skill-sync. Do not edit manually. -->

| Action | Skill |
|--------|-------|
| After creating/modifying a skill | `skill-sync` |
| Building landing pages or dashboards | `ui-ux-pro-max` |
| Choosing color palettes or typography | `ui-ux-pro-max` |
| Creating wireframes or planning UI layouts | `wireframe-prototyping` |
| Creating/modifying Zod schemas or Zustand stores in packages/core | `template-packages` |
| Creating/modifying shared UI components in packages/ui | `template-packages` |
| Designing new UI components or choosing design system | `ui-ux-pro-max` |
| Managing React state with Zustand | `zustand-5` |
| Reviewing UI code for accessibility or UX issues | `web-design-guidelines` |
| Styling with Tailwind - cn(), theme variables, no var() in className | `tailwind-4` |
| When saving changes to git | `template-commit` |
| When the user asks to create a Pull Request | `template-pr` |
| When the user asks to create a git commit | `template-commit` |
| When user asks to create a new skill, add agent instructions, or document patterns for AI | `skill-creator` |
| Using Zod for validation - breaking changes from v3 | `zod-4` |
| Working in packages/* or modifying shared libraries | `template-packages` |
| Working in ui or modifying frontend React/Next.js code | `template-web` |
| Working with Next.js - routing, Server Actions, data fetching | `nextjs-15` |
| Writing E2E tests - Page Objects, selectors, MCP workflow | `playwright` |
| Writing React components - no useMemo/useCallback needed | `react-19` |

<!-- AUTO-INVOKE-END -->

---

## Engram Persistent Memory — Protocol

You have access to Engram, a persistent memory system that survives across sessions and compactions.

### WHEN TO SAVE (mandatory — not optional)

Call `mem_save` IMMEDIATELY after any of these:
- Bug fix completed
- Architecture or design decision made
- Non-obvious discovery about the codebase
- Configuration change or environment setup
- Pattern established (naming, structure, convention)
- User preference or constraint learned

Format for `mem_save`:
- **title**: Verb + what — short, searchable (e.g. "Fixed N+1 query in UserList", "Chose Zustand over Redux")
- **type**: bugfix | decision | architecture | discovery | pattern | config | preference
- **scope**: `project` (default) | `personal`
- **topic_key** (optional, recommended for evolving decisions): stable key like `architecture/auth-model`
- **content**:
  **What**: One sentence — what was done
  **Why**: What motivated it (user request, bug, performance, etc.)
  **Where**: Files or paths affected
  **Learned**: Gotchas, edge cases, things that surprised you (omit if none)

Topic rules:
- Different topics must not overwrite each other (e.g. architecture vs bugfix)
- Reuse the same `topic_key` to update an evolving topic instead of creating new observations
- If unsure about the key, call `mem_suggest_topic_key` first and then reuse it
- Use `mem_update` when you have an exact observation ID to correct

### WHEN TO SEARCH MEMORY

When the user asks to recall something — any variation of "remember", "recall", "what did we do",
"how did we solve", or references to past work:
1. First call `mem_context` — checks recent session history (fast, cheap)
2. If not found, call `mem_search` with relevant keywords (FTS5 full-text search)
3. If you find a match, use `mem_get_observation` for full untruncated content

Also search memory PROACTIVELY when:
- Starting work on something that might have been done before
- The user mentions a topic you have no context on — check if past sessions covered it

### SESSION CLOSE PROTOCOL (mandatory)

Before ending a session or saying "done" / "listo" / "that's it", you MUST:
1. Call `mem_session_summary` with this structure:

## Goal
[What we were working on this session]

## Instructions
[User preferences or constraints discovered — skip if none]

## Discoveries
- [Technical findings, gotchas, non-obvious learnings]

## Accomplished
- [Completed items with key details]

## Next Steps
- [What remains to be done — for the next session]

## Relevant Files
- path/to/file — [what it does or what changed]

This is NOT optional. If you skip this, the next session starts blind.

### AFTER COMPACTION

If you see a message about compaction or context reset:
1. IMMEDIATELY call `mem_session_summary` with the compacted summary content
2. Then call `mem_context` to recover any additional context from previous sessions
3. Only THEN continue working

---

## Environment Variables

Create `.env.local` in the root:

```bash
# Copy the example file
cp .env.example .env.local

# Uncomment and add your values
# OPENAI_API_KEY=sk-your-openai-api-key-here
# NEXT_PUBLIC_APP_ENV=development
```

**Security Rules:**
- ❌ NEVER commit `.env.local`
- ✅ Use `NEXT_PUBLIC_` prefix for client-side variables
- ✅ Keep secrets server-side only

---

## Getting Started

### 1. Initial Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### 2. Verify Setup

```bash
pnpm typecheck     # Should pass
pnpm lint          # Should pass
pnpm test          # Should pass (if tests exist)
```

### 3. Customize

1. **Update branding**: Edit `ui/app/layout.tsx` metadata
2. **Modify theme**: Edit `ui/styles/globals.css` color tokens
3. **Add features**: Follow patterns in `ui/AGENTS.md` and package-specific guides
4. **Configure AI**: Add OpenAI API key to `.env.local` for chat features

### 4. Development Workflow

1. Check Auto-invoke table for relevant skills
2. Load and follow skill instructions
3. Make changes following code standards
4. Run QA checklist before committing
5. Use conventional commits
6. Create PR with proper documentation

---

## Project Philosophy

**This template prioritizes:**
1. **Type safety**: Strict TypeScript, runtime validation with Zod
2. **Developer experience**: Fast tooling (Turborepo + pnpm), clear patterns
3. **Performance**: React Compiler, modern bundling, code splitting
4. **Maintainability**: Consistent structure, clear conventions, package boundaries
5. **Quality**: Automated testing, linting, type checking
6. **AI-first workflow**: Comprehensive skill library, auto-invoke enforcement

**Design principles:**
- Minimal but functional
- Easy to extend
- Hard to break
- Self-documenting
- Skill-driven development

---

## Next Steps

1. **Explore UI module**: Read [`ui/AGENTS.md`](ui/AGENTS.md)
2. **Review skills**: Check [`skills/`](skills/) for detailed patterns
3. **Review packages**: Check package READMEs for implementation details
4. **Build something**: Use the template as a starting point for your application

---

*This is the Root Agent. Start here for all development requests.*
