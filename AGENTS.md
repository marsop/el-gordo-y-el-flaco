# AGENTS.md — Agent Developer Guide

Welcome to the **El Gordo Y El Flaco** repository. This document provides technical context, architecture specifications, design conventions, and operational guidelines for AI agents and human developers contributing to this codebase.

---

## 1. Project Overview & Vision

**El Gordo Y El Flaco** is an 80s fast-food and retro diner styled weekly meal planner built for two people with distinct dietary appetites:
- **El Gordo**: Hearty portions, protein & carb emphasis, generous servings.
- **El Flaco**: Lighter portions, veggie-forward, calorie-conscious balance.

### Key Capabilities
- **7-Day Meal Scheduler**: Monday through Sunday lunch and dinner planning.
- **"Cook Once, Eat Twice" Batch Cooking**: Smart leftover planning with suitability ratings (`excellent`, `good`, `cook_fresh_only`), automatically chaining batch dinners into zero-effort next-day lunches.
- **Expiring Pantry Tracker**: Inventory management tracking days until expiration and automatically prioritizing expiring ingredients in meal planning.
- **Aggregated Grocery List**: Dynamically synthesized shopping list grouped by category (Produce, Dairy, Meat, Pantry, etc.) accounting for current pantry stock.
- **Notion Integration Ready**: Prepared database schema and sync status for Notion meal planners.
- **Multi-Format Exporter**: One-click exports to CSV, structured Markdown, and print-optimized PDF with custom media print stylesheets.
- **Browser Persistence**: Automatic synchronization of plans, recipes, pantry items, and Notion configs to `localStorage`.

---

## 2. Tech Stack & Dependencies

| Layer | Technology | Notes |
|---|---|---|
| **Framework** | React 19 (`react`, `react-dom`) | Modern hooks, strictly typed components |
| **Language** | TypeScript 7 | Bundler resolution, strict types, no emitted JS (`noEmit`) |
| **Build Tool** | Vite 8 (`@vitejs/plugin-react`) | Port 3000, relative asset base (`./`) for GitHub Pages |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/vite`) | Configured via `@theme` in `src/index.css` |
| **Icons** | Lucide React (`lucide-react`) | Consistent retro-friendly icon set |
| **Animations** | Motion (`motion`) | Smooth modal transitions and UI interactions |
| **AI Integration** | `@google/genai` | Google GenAI SDK for server-side / AI meal assistance |
| **Deployment** | GitHub Actions (`deploy.yml`) | Automated build & deploy to GitHub Pages |

---

## 3. Repository Architecture & Layout

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Pages deployment pipeline
├── public/                       # Static public assets (favicons, manifest, icons)
├── src/
│   ├── components/               # React UI components
│   │   ├── AllMealsModal.tsx     # Full-week meal matrix overview
│   │   ├── ExportModal.tsx       # CSV, Markdown, and PDF export dialog
│   │   ├── GroceryModal.tsx      # Consolidated grocery checklist by category
│   │   ├── Header.tsx            # Retro diner banner & top toolbar actions
│   │   ├── MarqueeBanner.tsx     # Animated ticker with meal stats & pantry alerts
│   │   ├── MealCard.tsx          # Card for lunch/dinner slots with leftover badges
│   │   ├── MealModal.tsx         # Detailed meal editor (ingredients, portions)
│   │   ├── NotionModal.tsx       # Notion workspace integration settings
│   │   ├── PantryDrawer.tsx      # Slide-out pantry inventory with expiry tracker
│   │   ├── RecipeCatalogModal.tsx# Recipe book with filters, search, and swap selection
│   │   └── WeekView.tsx          # Monday-to-Sunday 7-day responsive layout
│   ├── data/
│   │   ├── defaultData.ts        # Seed recipes, initial pantry, weekly schedule
│   │   └── userFavorites.ts      # Curated favorite recipe presets
│   ├── utils/
│   │   └── exportUtils.ts        # Formatters for CSV and Markdown meal plans
│   ├── App.tsx                   # Root state orchestration & localStorage syncing
│   ├── index.css                 # Tailwind v4 theme, retro tokens, print stylesheet
│   ├── main.tsx                  # Application bootstrap
│   └── types.ts                  # Core TypeScript domain interfaces
├── index.html                    # HTML entry point with Google Fonts (Bricolage, Oswald)
├── metadata.json                 # Applet metadata and capability declarations
├── package.json                  # Dependencies and execution scripts
├── tsconfig.json                 # TypeScript compiler configuration
└── vite.config.ts                # Vite configuration with Tailwind plugin & aliases
```

---

## 4. Domain Model & Key Concepts (`src/types.ts`)

When working with data models, maintain fidelity to these core contracts:

- **`DayOfWeek` & `MealType`**: 7 days (`Monday`–`Sunday`) and 2 daily slots (`lunch` | `dinner`).
- **`Meal`**:
  - `servings`: Defaults to 2 (1 for Gordo, 1 for Flaco).
  - `gordoPortionNotes` / `flacoPortionNotes`: Specific guidance for each person.
  - `leftoverSuitability`: `'excellent' | 'good' | 'cook_fresh_only'`.
  - `isBatchCook`: Boolean indicating double batch (4 servings).
  - `isLeftover`: Boolean; when true, links back to `sourceDay` and `sourceMealType`.
  - `usesExpiringItemIds`: References pantry items to avoid food waste.
- **`PantryItem`**:
  - `daysUntilExpiry`: Integer (0 = expires today, negative = expired). Used to compute urgency badges.
- **`WeeklyPlan`**: Maps each `DayOfWeek` to a `DayPlan` containing `lunch` and `dinner`.

---

## 5. Development & Build Commands

Always execute commands using `pnpm` locally (or `npm` with `--legacy-peer-deps` in CI environments):

```bash
# Start local development server (http://localhost:3000)
pnpm run dev

# Run TypeScript type-checking without emitting files
pnpm run lint

# Build production bundle to /dist
pnpm run build

# Preview production build locally
pnpm run preview
```

### Environment Notes
- **Windows / PowerShell**: When executing git commands inside environments with restricted global config includes, pass `$env:GIT_CONFIG_GLOBAL=""` to avoid permission errors.
- **Vite Base Path**: `vite.config.ts` uses `base: './'` to support deployment to GitHub Pages subpaths. Do not change this to an absolute root `/`.
- **Peer Dependencies**: React 19 is used; when running `npm install`, ensure `--legacy-peer-deps` is used if peer warnings occur (configured in `.npmrc`).

---

## 6. Design System & Retro 80s Aesthetic

The UI strictly embraces an **80s fast-food diner** visual identity defined in `src/index.css`:

### Color Palette Tokens
- **Ketchup Red**: `--color-retro-ketchup` (`#dc2626`), `--color-retro-ketchup-dark` (`#991b1b`)
- **Mustard Yellow**: `--color-retro-mustard` (`#f59e0b`), `--color-retro-mustard-light` (`#fbbf24`)
- **Teal Accent**: `--color-retro-teal` (`#0d9488`)
- **Diner Cream / Paper**: `--color-retro-cream` (`#fefce8`), `--color-retro-paper` (`#fffbeb`)
- **Charcoal Text/Border**: `--color-retro-charcoal` (`#18181b`)

### Visual Motifs
- **Checkerboard Borders**: Utility classes `.bg-checker-pattern` and `.bg-checker-subtle`.
- **Marquee Glow**: `.marquee-glow` for retro illuminated signs.
- **Receipt Edges**: `.receipt-zigzag` for bill/ticket styling.
- **Typography**:
  - Display: `Bricolage Grotesque`
  - Diner/Heading: `Oswald`
  - Monospace Data: `Space Mono`
  - Body: `Plus Jakarta Sans`
- **Print Optimization**: Dedicated `@media print` rules hide non-printable UI and guarantee crisp white backgrounds for physical recipe/grocery printouts.

---

## 7. Guidelines for AI Agents

When implementing features or refactoring code:

1. **Preserve Dual Portioning**: Every meal feature must respect the dual-profile design (`El Gordo` vs `El Flaco`). Do not collapse meal portions into a generic single serving note.
2. **Respect Batch Cooking Logic**: When a user marks dinner as a batch cook, the logic should assist or prompt setting the next day's lunch as leftovers (unless the meal is marked `cook_fresh_only`).
3. **Keep `localStorage` Resilient**: State hydration in `App.tsx` uses fallback initialization (`INITIAL_WEEKLY_PLAN`, `INITIAL_PANTRY_ITEMS`, etc.) wrapped in try/catch blocks. When adding new keys or fields, provide safe defaults for existing stored data.
4. **Maintain Print Styles**: If adding modals or print features, verify that `@media print` classes (`no-print`, `print-only`, `print-container`) function properly so PDF generation remains clean.
5. **Type Safety**: Avoid using `any`. Extend interfaces in `src/types.ts` whenever introducing new meal attributes or configuration fields.
6. **Verify Before Completing**: Always verify changes by checking TypeScript compilation (`pnpm run lint`) or building the project (`pnpm run build`).
