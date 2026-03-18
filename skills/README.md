# Agent Skills Library

This directory contains AI agent skills that provide specialized instructions, patterns, and workflows for development tasks.

## What are Agent Skills?

Agent skills are structured documentation files (SKILL.md) that teach AI agents how to perform specific tasks following project conventions and best practices. Each skill contains:

- **Triggers**: Conditions when the skill should be used
- **Patterns**: Code examples and best practices
- **Rules**: Constraints and conventions to follow
- **Workflows**: Step-by-step processes

## Skill Categories

### Generic Skills (Framework/Library Specific)

These skills are framework or library-specific and can be reused across projects:

| Skill | Purpose | Path |
|-------|---------|------|
| `typescript` | TypeScript patterns, types, and utilities | [SKILL.md](typescript/SKILL.md) |
| `react-19` | React 19 patterns (no useMemo/useCallback) | [SKILL.md](react-19/SKILL.md) |
| `nextjs-15` | Next.js 15 App Router, Server Actions | [SKILL.md](nextjs-15/SKILL.md) |
| `tailwind-4` | Tailwind CSS 4 patterns (no var() in className) | [SKILL.md](tailwind-4/SKILL.md) |
| `zod-4` | Zod 4 schema validation | [SKILL.md](zod-4/SKILL.md) |
| `zustand-5` | Zustand 5 state management | [SKILL.md](zustand-5/SKILL.md) |
| `ai-sdk-5` | Vercel AI SDK 5 patterns | [SKILL.md](ai-sdk-5/SKILL.md) |
| `playwright` | Playwright E2E testing | [SKILL.md](playwright/SKILL.md) |
| `frontend-design` | UI/UX component design | [SKILL.md](frontend-design/SKILL.md) |

#### Design & UX

Advanced design and user experience skills:

| Skill | Description |
|-------|-------------|
| `ui-ux-pro-max` | Complete design system with 50+ styles, 97 color palettes, 57 font pairings, 99 UX guidelines, and CLI search tool |
| `web-design-guidelines` | Review UI code against Vercel's Web Interface Guidelines for accessibility and UX best practices |
| `wireframe-prototyping` | Create wireframes and interactive prototypes with layout patterns and responsive design guidelines |

### Template-Specific Skills

These skills are specific to this template's architecture and conventions:

| Skill | Purpose | Path |
|-------|---------|------|
| `template-web` | UI module patterns and structure | [SKILL.md](template-web/SKILL.md) |
| `template-packages` | Shared package patterns and boundaries | [SKILL.md](template-packages/SKILL.md) |
| `template-commit` | Git commit workflow and conventions | [SKILL.md](template-commit/SKILL.md) |
| `template-pr` | Pull request creation and guidelines | [SKILL.md](template-pr/SKILL.md) |

### Meta Skills

These skills help create and maintain other skills:

| Skill | Purpose | Path |
|-------|---------|------|
| `skill-creator` | Create new agent skills | [SKILL.md](skill-creator/SKILL.md) |
| `skill-sync` | Sync auto-invoke tables in AGENTS.md | [SKILL.md](skill-sync/SKILL.md) |

## How to Use Skills

### 1. Check Auto-Invoke Table

Before starting any task, check the auto-invoke table in [../AGENTS.md](../AGENTS.md) to see if a skill matches your task.

Example:
```
Task: Add a new React component
→ Check AGENTS.md auto-invoke table
→ "Writing React components" → react-19 skill
→ Load skills/react-19/SKILL.md
```

### 2. Load the Skill

Read the SKILL.md file for the matching skill. It will contain:
- When to use it (triggers)
- What to do (patterns and examples)
- What not to do (anti-patterns and rules)

### 3. Follow the Patterns

Apply the patterns from the skill to your code. The skill ensures you follow project conventions and best practices.

### 4. Combine Multiple Skills

Some tasks require multiple skills. For example:
- Adding a form → `react-19` + `zod-4` + `template-web`
- Adding a store → `zustand-5` + `template-packages`
- Adding a styled component → `react-19` + `tailwind-4` + `frontend-design`

## Creating New Skills

To create a new skill:

1. Use the `skill-creator` skill:
   ```bash
   # Read skills/skill-creator/SKILL.md for instructions
   ```

2. Follow the naming convention:
   - Generic skill: `library-name` (e.g., `react-19`, `nextjs-15`)
   - Template skill: `template-feature` (e.g., `template-web`, `template-packages`)

3. Create the SKILL.md file with:
   - Metadata (name, description, author, version)
   - Triggers (when to use)
   - Patterns (how to use)
   - Anti-patterns (what to avoid)
   - Examples

4. Register in [../AGENTS.md](../AGENTS.md) auto-invoke table

5. Run skill-sync if available to update tables

## Skill Format

Each SKILL.md follows this structure:

```markdown
# Skill Name

## Metadata
- name: skill-name
- description: What this skill teaches
- author: Author Name
- version: 1.0.0

## Triggers
When to use this skill:
- Condition 1
- Condition 2

## Patterns
How to use this skill:
- Pattern 1 with examples
- Pattern 2 with examples

## Anti-Patterns
What to avoid:
- Don't do X
- Never do Y

## Examples
Full code examples
```

## Multi-Agent Setup

This template supports multiple AI agents. Run the setup script to configure skills for different agents:

```bash
# Copy skills to different agent config locations
bash skills/setup.sh
```

Supported agents:
- Claude (Claude Desktop, Claude Code)
- OpenCode
- Gemini Code Assist
- Cursor

## Skill Maintenance

### Updating Skills

When updating a skill:
1. Modify the SKILL.md file
2. Increment the version in metadata
3. Run skill-sync to update auto-invoke tables
4. Test with actual coding tasks

### Deprecating Skills

To deprecate a skill:
1. Add `[DEPRECATED]` to the title
2. Add deprecation notice at the top
3. Point to replacement skill
4. Update auto-invoke tables
5. Remove after 2 versions

## Best Practices

1. **Keep skills focused** - One skill per library/pattern
2. **Use examples** - Show don't tell with code examples
3. **Include anti-patterns** - Teach what NOT to do
4. **Update regularly** - Keep skills in sync with library versions
5. **Test skills** - Use them in real development tasks

## Contributing

To contribute a new skill:
1. Create the skill following the format
2. Test it with actual tasks
3. Add to auto-invoke table
4. Submit for review

## Resources

- [AGENTS.md](../AGENTS.md) - Root agent guide with auto-invoke table
- [Agent Skills Spec](https://github.com/Agent-Skills/agent-skills) - Official specification

---

**Remember**: Skills make AI agents more effective by teaching them project-specific patterns and conventions. Always check the auto-invoke table before starting a task!
