# Research, Analysis & Deployment Docs

This folder contains all technical research, package analysis, and deployment documentation for comingofage2040_COMPLETE. It follows a three-stage pipeline for integrating new packages and features.

---

## The Pipeline

Every new package or major feature goes through three stages:

1. **Research** -- Evaluate the package using [HOW_TO_RESEARCH_PACKAGES.md](./HOW_TO_RESEARCH_PACKAGES.md) and write the analysis using [RESEARCH_TEMPLATE.md](./RESEARCH_TEMPLATE.md).
2. **Analysis** -- Document the decision: why this package, how it fits the stack, pros/cons, alternatives considered. Named `{feature}-analysis.md`.
3. **Deployment** -- Track integration, configuration, known issues, and troubleshooting. Named `{feature}-deployment.md`.

Not every feature needs all three stages. Some only need a deployment doc (e.g., Docker setup). But any new third-party library **must** have at least an analysis doc.

Note: the app's existing dependency set was inherited wholesale from the two Lovable-generated source repos (shadcn/ui kit + friends) and was intentionally NOT re-evaluated during the merge, to guarantee zero behavior change.

---

## Documents in This Folder

### Research Guides
| File | Purpose |
|------|---------|
| [HOW_TO_RESEARCH_PACKAGES.md](./HOW_TO_RESEARCH_PACKAGES.md) | Step-by-step process for evaluating packages |
| [RESEARCH_TEMPLATE.md](./RESEARCH_TEMPLATE.md) | 15-section template for analysis docs |

### Analysis Docs
| File | Feature | Recommendation |
|------|---------|----------------|

<!--
  Add rows as you create analysis docs. Format:
  | [package-analysis.md](./package-analysis.md) | What it does | ✅ YES / ❌ NO / ⚠️ CONDITIONAL |
-->

### Deployment Docs
| File | Feature | Status |
|------|---------|--------|
| [docker-deployment.md](./docker-deployment.md) | Single-container Docker deploy (nginx) + Cloudflare tunnel | Built & container-tested 2026-08-04; server deploy pending |

---

## Adding New Docs

- **New package?** Follow [HOW_TO_RESEARCH_PACKAGES.md](./HOW_TO_RESEARCH_PACKAGES.md) -> create `{package}-analysis.md` using [RESEARCH_TEMPLATE.md](./RESEARCH_TEMPLATE.md)
- **Deploying a feature?** Create `{feature}-deployment.md` with setup steps, configuration, and troubleshooting
- **Update RESEARCH.md** when adding new docs -- keep the tables current

---

## Quick Links

- [Project README](../../README.md) -- Tech stack, structure, architecture
- [PROGRESS.md](../PROGRESS.md) -- What's built, what's next
- [TODO.md](../TODO.md) -- Pending tasks

---

**Last Updated:** 2026-08-04
