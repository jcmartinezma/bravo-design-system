---
title: Writing Guidelines
status: draft
owner: community
update: January 1, 2026
---

# Writing Guidelines

Practical rules for UI copy: labels, errors, confirmations, and empty states.

## General rules

1. **Front-load meaning** — Put the outcome or action first.
2. **One idea per sentence** — Especially on mobile.
3. **Use verbs in buttons** — "Save changes", not "Submit".
4. **Be specific** — Say what failed and how to fix it.

## Labels and buttons

| Element | Guideline | Example |
|---------|-----------|---------|
| Primary button | Verb + object | "Create project" |
| Secondary button | Clear alternative | "Cancel" |
| Form label | Noun or short phrase | "Email address" |
| Placeholder | Example format, not a label | "you@company.com" |

Placeholders must not replace labels — labels stay visible for accessibility.

## Error messages

Structure: **What happened** + **How to fix it** (when possible).

| Bad | Good |
|-----|------|
| "Invalid input" | "Enter a date in MM/DD/YYYY format." |
| "Request failed" | "We couldn't load your projects. Refresh the page or try again later." |

Avoid error codes alone in user-facing text. Log codes for support separately.

## Confirmations

- **Success toasts** — Short, past tense: "Project deleted."
- **Destructive dialogs** — Name the object: "Delete 'Q3 Report'?"
- **Undo** — Offer when the action is reversible: "Project deleted. [Undo]"

## Empty states

Include three parts:

1. **What this area is for** (one line)
2. **Why it's empty** (if known)
3. **Primary action** to move forward

Example: "No documents yet. Create a document to share with your team." + [Create document]

## Length

| Surface | Target |
|---------|--------|
| Button | 1–3 words |
| Toast | Under 90 characters |
| Error inline | 1–2 short sentences |
| Empty state body | 1–2 sentences |

## Related docs

- [Voice and tone](voice-and-tone)
- [Example empty state pattern](../patterns/example-empty-state)
