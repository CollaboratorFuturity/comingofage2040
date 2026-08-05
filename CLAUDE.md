# comingofage2040_COMPLETE -- Claude Code Instructions

## Before ANY Task

Read these docs in order before writing code:

1. **README.md** -- Tech stack, project structure, architecture, doc update checklist
2. **docs/TODO.md** -- Known issues & technical notes (includes OPEN QUESTIONS from the repo merge)
3. **docs/PROGRESS.md** -- What's built, what's in progress
4. **docs/research/RESEARCH.md** -- Index of all research, analysis & deployment docs

For feature-specific context, check the relevant docs linked from RESEARCH.md.

## Rules

- **Read official docs first.** Before using any package, library, or tool -- read its official documentation. Not your training data, not your memory. The actual docs.
- **docs/TODO.md is where all todos live.** Update all TODOS and keep them here to work on them after finishing a main task.
- **Follow STYLEGUIDE.md** for all UI changes -- colors, typography, component patterns.
- **Follow API.md conventions** for all endpoint changes.
- **New package?** Follow the 3-stage pipeline in docs/research/RESEARCH.md: Research -> Analysis doc -> Deployment doc.
- **Do NOT run git commands** (commit, push, etc.) unless the user explicitly asks.

Project-specific rules:

- **Do not change visuals.** This app was merged 1:1 from two Lovable repos (`futurescape-whisper` + `comingofage2040`). Layout, colors, copy and animations must stay identical unless explicitly requested.
- **This is a static SPA with no backend.** Do not add servers, databases, or build-time env secrets without discussion. The ElevenLabs agent IDs are public client-side IDs by design.
- **Routing is nginx-dependent.** Any new client route works automatically (SPA fallback in `nginx.conf`), but never remove the `try_files ... /index.html` rule.
- **Global uppercase CSS**: `src/index.css` force-uppercases nearly all text and then un-uppercases the ElevenLabs widget and `.normal-case`. Mind this when adding text UI.
- **When giving a docker command always add sudo** if the server user is not in the docker group (Debian trixie target).
- **The consent modal is a legal requirement** (biometric data / GDPR wording). Never bypass or auto-grant it.

## After Completing a Feature

Follow the 6-step doc update checklist in README.md:

1. **README.md** -- Tech Stack, Project Structure, Architecture Notes, Development Progress
2. **PROGRESS.md** -- Check off completed items
3. **TODO.md** -- when finding TODOs already completed
4. **API.md** -- If endpoints were added, changed, or removed
5. **docs/research/RESEARCH.md** -- If new analysis or deployment docs were created
6. **Relevant deployment doc** in docs/research/ -- Update status, known issues

This is not optional. Do it before considering a feature "done".
