# AI LAB | Design brief

## Design read
A personal learning academy for a technically curious mechanical-engineering student who wants to understand AI, apply it to engineering and production, and turn practical competence into income. The emotional register is precise, optimistic, hands-on and intellectually serious.

## Concept spine
**The engineering field manual.** The interface behaves like a well-designed technical notebook translated into a modern learning console. Lessons are the reference pages, projects are workshop sheets, and progress is a measured record of practice.

## Delivery tier
Editorial, with a product-dashboard information architecture and responsive PWA behavior.

## Animation mode
non-animated, user selected alternative 2 in the conversation: a lighter site with interface animations instead of a generated cinematic film.

## Locked palette
- Mineral paper: `#F0F2EE` (main canvas)
- Deep graphite: `#202927` (primary ink)
- Soft graphite: `#53605C` (secondary ink)
- Hairline: `#D5DAD4` (rules and separators)
- Oxide red: `#98584F` (the single accent, muted and restrained)
- White: `#FBFCFA` (content surfaces)

The palette takes its cue from engineering paper, graphite marks and oxide-treated metal. It avoids the common dark-neon AI aesthetic and keeps contrast high for long study sessions.

## Locked type
Outfit for display and interface typography, IBM Plex Mono for measurements, labels and technical metadata. System sans and monospace fallbacks keep the product usable if web fonts are unavailable.

## Hero architecture
Asymmetric editorial split: a short, useful learning promise on the left and a real, labeled AI-to-engineering workflow diagram on the right. The diagram is instructional content, not a decorative fake dashboard.

## Tier-1 technique
**D3, kinetic type opener.** The hero headline shifts its tracking and vertical position gently as the page scrolls, while remaining fully visible. This gives the learning console a responsive opening gesture without requiring generated film or hiding essential information.

## Section plan
1. Dashboard: asymmetric split, active learning status and next lesson.
2. Curriculum: editorial rail with expandable module and lesson list.
3. Lesson room: reading column with worked example, practice and checkpoint.
4. Laboratory: project sheets with deliverables and step-by-step tasks.
5. Library: searchable glossary and flashcards, with flip interaction.
6. Assessment: one-question-at-a-time quiz with explanation and score.
7. Aeronautical maintenance: controlled documentation, engine trend monitoring and visual inspection support.
8. Progress and backup: measured completion, study history and export/import controls.

## Signature components
- Engineering workflow diagram with connected stages.
- Lesson progress rail with completion states.
- Flashcard flip interaction.
- Project worksheet with numbered deliverables.

## Motion and accessibility
Use subtle transform and color transitions for tabs, cards and flashcards. Use CSS scroll-driven reveal only inside `@supports (animation-timeline: view())`. Every animated element respects `prefers-reduced-motion`. Keyboard focus is visible, interactive targets have labels, and mobile navigation remains reachable.

## Persistence and delivery
No paid APIs, no paid model generation, no paid fonts, no user accounts and no external database. Study progress is stored locally in IndexedDB on each browser. A JSON export/import feature provides a manual backup between devices. The site is a responsive installable PWA with a basic offline shell.

## Asset plan and budget decision
A free generation allowance was checked and was not available. Paid generation was rejected to preserve the user's zero-cost constraint. The visual identity therefore uses a custom vector monogram, an original instructional workflow diagram and native interface components. No stock imagery or fabricated performance claims are used. This is the one deliberate compromise versus the full bespoke generated asset pipeline.

## CTA inventory
- Continue learning: resume the next incomplete lesson.
- Open curriculum: browse all learning paths.
- Start a project: open the chosen workshop sheet.
- Review cards: open flashcard practice.
- Export backup: download local learning progress.

## Anti-convergence ledger
This is the first shipped site in this project. Palette: mineral paper and oxide red. Type: Outfit plus IBM Plex Mono. Hero: asymmetric split with a real instructional diagram. Technique: C3 scroll-driven mask reveal. CTA garments: editorial text link, stamped project action and outlined backup control. Corners: restrained 10px radius with hairline borders.
