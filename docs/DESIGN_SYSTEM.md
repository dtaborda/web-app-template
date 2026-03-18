# Design System Guide

This template includes comprehensive design skills to help you create professional, accessible web applications.

## 🎨 Generate a Design System

Use `ui-ux-pro-max` to generate a complete design system for your project:

### Quick Start

```bash
# Generate design system for a SaaS product
python3 skills/ui-ux-pro-max/scripts/search.py "SaaS dashboard professional" --design-system -p "MyApp"

# Generate for e-commerce
python3 skills/ui-ux-pro-max/scripts/search.py "e-commerce modern minimal" --design-system -p "MyShop"

# Generate with persistence (saves to design-system/ directory)
python3 skills/ui-ux-pro-max/scripts/search.py "fintech app professional" --design-system --persist -p "FinanceApp"
```

### What You Get

- **Style recommendation** with reasoning (e.g., minimalism, glassmorphism)
- **Color palette** (primary, secondary, accent, neutral colors)
- **Typography** (heading + body font pairings)
- **Effects** (shadows, borders, animations)
- **Anti-patterns** to avoid

### Page-Specific Overrides

```bash
# Generate page-specific design (overrides master)
python3 skills/ui-ux-pro-max/scripts/search.py "checkout trust security" --design-system --persist -p "MyApp" --page "checkout"
```

This creates:
- `design-system/MASTER.md` - Global design rules
- `design-system/pages/checkout.md` - Checkout-specific rules

## 🔍 Search Specific Design Elements

```bash
# Search color palettes
python3 skills/ui-ux-pro-max/scripts/search.py "blue professional" --domain color

# Search font pairings
python3 skills/ui-ux-pro-max/scripts/search.py "modern elegant" --domain typography

# Search UX guidelines
python3 skills/ui-ux-pro-max/scripts/search.py "accessibility touch targets" --domain ux

# Search chart types
python3 skills/ui-ux-pro-max/scripts/search.py "real-time dashboard" --domain chart
```

## ✅ Review UI Code

Use `web-design-guidelines` to audit your UI components:

```bash
# In AI chat, ask:
"Review my UI code in ui/components/dashboard/ against web interface guidelines"
```

This checks:
- Accessibility (WCAG compliance)
- Touch targets (44x44px minimum)
- Color contrast
- Keyboard navigation
- Responsive design
- Performance best practices

## 📐 Create Wireframes

Use `wireframe-prototyping` for layout planning:

```bash
# In AI chat, ask:
"Create a wireframe for an e-commerce product page"
"What's the best layout pattern for a SaaS dashboard?"
"Design a mobile-first navigation for my app"
```

## 🎯 Common Workflows

### Starting a New Project

1. Generate design system:
   ```bash
   python3 skills/ui-ux-pro-max/scripts/search.py "your product type and style" --design-system --persist -p "ProjectName"
   ```

2. Review generated `design-system/MASTER.md`

3. Apply colors to `ui/styles/globals.css`

4. Update font pairings in `ui/app/layout.tsx`

5. Build components following the style guide

### Building a Specific Page

1. Check for page-specific design:
   ```bash
   # If design-system/pages/[page].md exists, use it
   # Otherwise, use design-system/MASTER.md
   ```

2. Ask AI to generate code following the design system

3. Review with `web-design-guidelines`

### Refining Design

1. Search for alternatives:
   ```bash
   python3 skills/ui-ux-pro-max/scripts/search.py "glassmorphism dark mode" --domain style
   ```

2. Compare options and update design system

3. Regenerate components

## 📚 Resources

- [ui-ux-pro-max](../skills/ui-ux-pro-max/SKILL.md) - Full documentation
- [web-design-guidelines](../skills/web-design-guidelines/SKILL.md) - Review guidelines
- [wireframe-prototyping](../skills/wireframe-prototyping/SKILL.md) - Prototyping guide
