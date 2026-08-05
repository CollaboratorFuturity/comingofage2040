# comingofage2040_COMPLETE -- Style Guide & Cheatsheet

Use this to replicate the project's visual language across all UI work. The design system lives in `src/index.css` (HSL CSS variables consumed by Tailwind via `tailwind.config.ts`). **Do not restyle existing pages -- the visual state is frozen as migrated from Lovable.**

---

## Color Palette

All colors are HSL CSS variables in `src/index.css` (`:root`).

| Token | HSL | Use |
|-------|-----|-----|
| `--background` | `0 0% 100%` | Page background (white) |
| `--foreground` | `0 0% 0%` | Body text (black) |
| `--primary` | `195 85% 50%` | Links hover, ring, key actions (cyan-blue) |
| `--accent` | `195 100% 60%` | Highlights |
| `--muted-foreground` | `0 0% 45%` | Secondary text |
| `--border` | `0 0% 90%` | Borders, dividers |
| `--destructive` | `0 72% 51%` | Errors |

Persona/tab accent colors (hard-coded per scenario in `MainSection.tsx` / `Index.tsx`):

| Persona / item | Hex |
|----------------|-----|
| Zane / Project | `#333538` |
| Rowan / Story | `#853042` |
| Nova / Experience | `#deb8e3` |
| Cypher / Action | `#ffffff` (bar shown as `#D3D3D3`, title `#000000`) |

Landing section is forced `bg-black` with white text over the AnimatedNumbersBackground.

---

## Typography

**Font stack:**
```
'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
```
Loaded from Google Fonts in `index.html` (weights 400/500/600/700).

**Global rule (unusual -- respect it):** `src/index.css` applies `text-transform: uppercase !important` to virtually every text element. Exceptions: the ElevenLabs widget subtree and anything with `.normal-case`. `h1, h3` are weight 700; the design otherwise leans on `font-thin`/`font-normal` Tailwind utilities.

| Element | Pattern |
|---------|---------|
| Hero h1 | `text-[2.25rem]..md:text-[3rem] font-bold text-white` |
| Section titles (tabs) | `text-2xl 2xl:text-3xl font-normal` |
| Body/description | `text-sm text-foreground` or `text-foreground/70 font-thin` |
| Micro-labels/footers | `text-xs uppercase font-thin tracking-widest` |

---

## Spacing & Layout

| Concept | Value |
|---------|-------|
| Experience page max width | `max-w-[1900px]`, `px-6 pt-16 pb-8` |
| Landing content max width | `max-w-4xl` (hero), `max-w-6xl` (main items) |
| Left tab panel width | `w-56 lg:w-64 xl:w-72` |
| Border radius | `--radius: 0.75rem`; buttons often square (no radius) with `border-foreground/30` |
| Snap scrolling | landing uses `snap-y md:snap-mandatory` full-viewport sections |

---

## Component Patterns

### Outline CTA button (landing + experience)
```jsx
<button className="px-8 py-4 border border-foreground/30 text-foreground hover:bg-foreground hover:text-background transition-all duration-300 text-sm tracking-widest">
  EXPERIENCE THE ONLINE VERSION
</button>
```

### Expanding info row (MainSection) / tab (Index)
framer-motion `AnimatePresence` with `initial/animate/exit` on `opacity` + `height: 0 -> "auto"`, duration 0.25-0.3, `ease: "easeInOut"`. Hover on desktop (`useIsMobile` false), tap-toggle on mobile.

### Hotspot images
`HoverableImage` + `ScenarioCard`: hotspots are `%`-positioned rectangles (`x`, `y`, `w`, `h`) over the persona PNG; tooltip colored per persona (`tooltipColor` / `tooltipTitleColor`).

### Consent modal
`VoiceConsentModal`: fixed overlay `bg-black/55 backdrop-blur-sm`, white card `max-w-[480px] rounded-xl`, blue primary `#1a73e8`, amber notice box `#fff8e1`/`#f9a825`. Uses raw hex on purpose (self-contained, mirrors the original) -- keep it that way.

---

## Responsive Breakpoints

| Breakpoint | What changes |
|------------|--------------|
| base | Landing stacks; experience shows "better on desktop" note; right image panel hidden below 720px |
| `min-[720px]` | Experience two-column layout, hover hints visible |
| `md` (768px+) | Snap-scroll mandatory on landing |
| `lg`/`xl`/`2xl` | Wider tab panel, larger type |

---

## Accessibility Checklist

- Consent modal: `role="dialog"`, `aria-modal`, labelled title, Escape closes, backdrop click declines
- Interactive rows/tabs are clickable divs (legacy from Lovable) -- if ever refactored, use `<button>`, but do not change visuals
- Color contrast: black-on-white base is fine; verify persona pink `#deb8e3` tooltips if text is ever placed on them
- External links use `rel="noopener noreferrer"`
