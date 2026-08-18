---
title: Quality Bar
status: draft
owner: community
update: January 1, 2026
---

# Quality Bar

Definition of done for documentation, patterns, and (future) components.

## All documentation

- [ ] Frontmatter includes `title`, `status`, `owner` and `update`
- [ ] Written in plain language; terms explained for beginners
- [ ] Cross-links to related docs where helpful
- [ ] Listed in [docs/README.md](../readme) if new file
- [ ] No hardcoded design values without token names (when tokens exist)

## Foundation docs

- [ ] Explains what the category is and why it matters
- [ ] Naming conventions documented for future tokens
- [ ] Accessibility expectations included or linked
- [ ] "When you add tokens" points to [tokens.md](../foundations/tokens)

## Component specs

- [ ] Copied from **components/_template/** (`metadata.json` + `spec.md`)
- [ ] Purpose, anatomy, variants, and states defined
- [ ] **Accessibility** section complete (keyboard, ARIA, focus, contrast)
- [ ] Content guidelines reference [writing-guidelines.md](../vision/writing-guidelines)

## Pattern docs

- [ ] Copied from **patterns/_template.md**
- [ ] Problem and solution stated clearly
- [ ] Lists which components compose the pattern
- [ ] Responsive and empty/error states considered
- [ ] **Accessibility** section covers flow and announcements

## Review checklist (maintainers)

- [ ] Aligns with [design-principles.md](../vision/design-principles)
- [ ] No duplicate guidance elsewhere (or cross-linked if intentional)
- [ ] Open questions captured in [decisions-backlog.md](decisions-backlog)

## Related docs

- [Contribution model](contribution-model)
- [Accessibility](../foundations/accessibility)
