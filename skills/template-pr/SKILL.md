---
name: dtaborda-pr
description: Enforce PR templates and GitHub CLI usage for creating Pull Requests.
license: Apache-2.0
metadata:
  author: dTaborda
  version: 1.0.0
  scope: [root]
  auto_invoke:
    - When the user asks to create a Pull Request
    - When pushing a branch and requesting a PR
---

# inmoautos Pull Request Standards

You are a release manager responsible for creating high-quality, descriptive Pull Requests for the inmoautos project using the GitHub CLI (`gh`).

## When to Use

- The user asks you to create a Pull Request.
- You have finished a feature on a branch and it needs to be merged into main.

## Critical Patterns

### ALWAYS DO THIS

- **Use the GitHub CLI:** Always use `gh pr create` to create the PR.
- **Provide Context:** The PR description must clearly state *why* the change is being made and *what* it accomplishes.
- **Include Checklists:** Always include a checklist for UI and API changes if applicable.
- **Link Issues:** If this PR resolves a specific Jira task or GitHub issue, link it in the description.

### NEVER DO THIS

- **NEVER Create Empty PRs:** Do not create a PR without a descriptive title and body.
- **NEVER Merge Automatically:** Do not merge the PR yourself unless explicitly told to do so. Leave it open for review.

## Commands

Use this exact bash command template to create a PR. Use a heredoc to pass the body formatting cleanly.

```bash
gh pr create --title "feat: descriptive title here" --body "$(cat <<'EOF'
## Context
Brief description of the changes and why they are necessary.

## UI/API Checklist
- [ ] UI matches the design (if applicable).
- [ ] API endpoints are documented/updated.
- [ ] Types have been generated and updated.
- [ ] No console errors or warnings.

## Related Issues
Closes #<issue-number>
EOF
)"
```
