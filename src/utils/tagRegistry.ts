import { TagDefinition, Meal, WeeklyPlan } from '../types';

/**
 * Canonical Tag Registry for El Gordo & El Flaco
 * Maps normalized tag slugs to standardized TagDefinitions with retro-styled colors and emojis.
 */
export const TAG_REGISTRY: Record<string, TagDefinition> = {
  // === PRIMARY PILLARS ===
  'high-protein': {
    id: 'high-protein',
    label: 'High Protein',
    emoji: '🟢',
    bgClass: 'bg-emerald-50',
    textClass: 'text-emerald-950',
    borderClass: 'border-emerald-300',
    badgeClass: 'bg-emerald-50 text-emerald-950 border-emerald-300 hover:bg-emerald-100',
    category: 'pillar'
  },
  'great-base': {
    id: 'great-base',
    label: 'Great Base',
    emoji: '🟡',
    bgClass: 'bg-amber-50',
    textClass: 'text-amber-950',
    borderClass: 'border-amber-300',
    badgeClass: 'bg-amber-50 text-amber-950 border-amber-300 hover:bg-amber-100',
    category: 'pillar'
  },
  'balanced': {
    id: 'balanced',
    label: 'Balanced',
    emoji: '🟠',
    bgClass: 'bg-orange-50',
    textClass: 'text-orange-950',
    borderClass: 'border-orange-300',
    badgeClass: 'bg-orange-50 text-orange-950 border-orange-300 hover:bg-orange-100',
    category: 'pillar'
  },
  'classics': {
    id: 'classics',
    label: 'Classics',
    emoji: '🔴',
    bgClass: 'bg-red-50',
    textClass: 'text-red-950',
    borderClass: 'border-red-300',
    badgeClass: 'bg-red-50 text-red-950 border-red-300 hover:bg-red-100',
    category: 'pillar'
  },
  'quick': {
    id: 'quick',
    label: 'Quick ≤20m',
    emoji: '⚡',
    bgClass: 'bg-purple-50',
    textClass: 'text-purple-950',
    borderClass: 'border-purple-300',
    badgeClass: 'bg-purple-50 text-purple-950 border-purple-300 hover:bg-purple-100',
    category: 'pillar'
  },
  'batch-hero': {
    id: 'batch-hero',
    label: 'Batch Hero',
    emoji: '🍲',
    bgClass: 'bg-teal-50',
    textClass: 'text-teal-950',
    borderClass: 'border-teal-300',
    badgeClass: 'bg-teal-50 text-teal-950 border-teal-300 hover:bg-teal-100',
    category: 'pillar'
  },
  'slow-burn': {
    id: 'slow-burn',
    label: 'Slow Burn',
    emoji: '⏳',
    bgClass: 'bg-indigo-50',
    textClass: 'text-indigo-950',
    borderClass: 'border-indigo-300',
    badgeClass: 'bg-indigo-50 text-indigo-950 border-indigo-300 hover:bg-indigo-100',
    category: 'pillar'
  },
  'summer': {
    id: 'summer',
    label: 'Summer',
    emoji: '☀️',
    bgClass: 'bg-sky-50',
    textClass: 'text-sky-950',
    borderClass: 'border-sky-300',
    badgeClass: 'bg-sky-50 text-sky-950 border-sky-300 hover:bg-sky-100',
    category: 'pillar'
  },
  'winter': {
    id: 'winter',
    label: 'Winter',
    emoji: '❄️',
    bgClass: 'bg-slate-100',
    textClass: 'text-slate-900',
    borderClass: 'border-slate-300',
    badgeClass: 'bg-slate-100 text-slate-900 border-slate-300 hover:bg-slate-200',
    category: 'pillar'
  },
  'all-year': {
    id: 'all-year',
    label: 'All Year',
    emoji: '📅',
    bgClass: 'bg-zinc-100',
    textClass: 'text-zinc-800',
    borderClass: 'border-zinc-300',
    badgeClass: 'bg-zinc-100 text-zinc-800 border-zinc-300 hover:bg-zinc-200',
    category: 'pillar'
  },

  // === DIETARY & NUTRITIONAL ===
  'high-fiber': {
    id: 'high-fiber',
    label: 'High Fiber',
    emoji: '🌾',
    bgClass: 'bg-lime-50',
    textClass: 'text-lime-950',
    borderClass: 'border-lime-300',
    badgeClass: 'bg-lime-50 text-lime-950 border-lime-300 hover:bg-lime-100',
    category: 'dietary'
  },
  'vegetarian': {
    id: 'vegetarian',
    label: 'Vegetarian',
    emoji: '🥬',
    bgClass: 'bg-green-50',
    textClass: 'text-green-950',
    borderClass: 'border-green-300',
    badgeClass: 'bg-green-50 text-green-950 border-green-300 hover:bg-green-100',
    category: 'dietary'
  },
  'plant-protein': {
    id: 'plant-protein',
    label: 'Plant Protein',
    emoji: '🌱',
    bgClass: 'bg-emerald-100',
    textClass: 'text-emerald-950',
    borderClass: 'border-emerald-400',
    badgeClass: 'bg-emerald-100 text-emerald-950 border-emerald-400 hover:bg-emerald-200',
    category: 'dietary'
  },
  'seafood': {
    id: 'seafood',
    label: 'Seafood',
    emoji: '🐟',
    bgClass: 'bg-cyan-50',
    textClass: 'text-cyan-950',
    borderClass: 'border-cyan-300',
    badgeClass: 'bg-cyan-50 text-cyan-950 border-cyan-300 hover:bg-cyan-100',
    category: 'dietary'
  },
  'omega-3': {
    id: 'omega-3',
    label: 'Omega-3',
    emoji: '🥑',
    bgClass: 'bg-teal-100',
    textClass: 'text-teal-950',
    borderClass: 'border-teal-400',
    badgeClass: 'bg-teal-100 text-teal-950 border-teal-400 hover:bg-teal-200',
    category: 'dietary'
  },
  'low-carb': {
    id: 'low-carb',
    label: 'Low Carb',
    emoji: '🥗',
    bgClass: 'bg-emerald-50',
    textClass: 'text-emerald-900',
    borderClass: 'border-emerald-300',
    badgeClass: 'bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100',
    category: 'dietary'
  },

  // === CULINARY STYLE & MOOD ===
  'alpine-classic': {
    id: 'alpine-classic',
    label: 'Alpine Classic',
    emoji: '🏔️',
    bgClass: 'bg-stone-100',
    textClass: 'text-stone-900',
    borderClass: 'border-stone-300',
    badgeClass: 'bg-stone-100 text-stone-900 border-stone-300 hover:bg-stone-200',
    category: 'style'
  },
  'cozy-warm': {
    id: 'cozy-warm',
    label: 'Cozy Warm',
    emoji: '🔥',
    bgClass: 'bg-amber-100',
    textClass: 'text-amber-950',
    borderClass: 'border-amber-400',
    badgeClass: 'bg-amber-100 text-amber-950 border-amber-400 hover:bg-amber-200',
    category: 'style'
  },
  'comfort-food': {
    id: 'comfort-food',
    label: 'Comfort Food',
    emoji: '🥧',
    bgClass: 'bg-orange-100',
    textClass: 'text-orange-950',
    borderClass: 'border-orange-400',
    badgeClass: 'bg-orange-100 text-orange-950 border-orange-400 hover:bg-orange-200',
    category: 'style'
  },
  'one-pan': {
    id: 'one-pan',
    label: 'One-Pan',
    emoji: '🍳',
    bgClass: 'bg-amber-50',
    textClass: 'text-amber-900',
    borderClass: 'border-amber-300',
    badgeClass: 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100',
    category: 'style'
  },
  'mexican-diner': {
    id: 'mexican-diner',
    label: 'Mexican Diner',
    emoji: '🌮',
    bgClass: 'bg-rose-50',
    textClass: 'text-rose-950',
    borderClass: 'border-rose-300',
    badgeClass: 'bg-rose-50 text-rose-950 border-rose-300 hover:bg-rose-100',
    category: 'style'
  },
  'italian-classic': {
    id: 'italian-classic',
    label: 'Italian Classic',
    emoji: '🍝',
    bgClass: 'bg-red-50',
    textClass: 'text-red-950',
    borderClass: 'border-red-300',
    badgeClass: 'bg-red-50 text-red-950 border-red-300 hover:bg-red-100',
    category: 'style'
  },
  'spanish-classic': {
    id: 'spanish-classic',
    label: 'Spanish Classic',
    emoji: '🥘',
    bgClass: 'bg-red-100',
    textClass: 'text-red-950',
    borderClass: 'border-red-400',
    badgeClass: 'bg-red-100 text-red-950 border-red-400 hover:bg-red-200',
    category: 'style'
  },
  'middle-eastern': {
    id: 'middle-eastern',
    label: 'Middle Eastern',
    emoji: '🧆',
    bgClass: 'bg-stone-100',
    textClass: 'text-stone-900',
    borderClass: 'border-stone-300',
    badgeClass: 'bg-stone-100 text-stone-900 border-stone-300 hover:bg-stone-200',
    category: 'style'
  },
  'burger-night': {
    id: 'burger-night',
    label: 'Burger Night',
    emoji: '🍔',
    bgClass: 'bg-amber-100',
    textClass: 'text-amber-950',
    borderClass: 'border-amber-400',
    badgeClass: 'bg-amber-100 text-amber-950 border-amber-400 hover:bg-amber-200',
    category: 'style'
  },
  'pizza-night': {
    id: 'pizza-night',
    label: 'Pizza Night',
    emoji: '🍕',
    bgClass: 'bg-red-50',
    textClass: 'text-red-950',
    borderClass: 'border-red-300',
    badgeClass: 'bg-red-50 text-red-950 border-red-300 hover:bg-red-100',
    category: 'style'
  },
  'diner-sandwich': {
    id: 'diner-sandwich',
    label: 'Diner Sandwich',
    emoji: '🥪',
    bgClass: 'bg-yellow-50',
    textClass: 'text-yellow-950',
    borderClass: 'border-yellow-300',
    badgeClass: 'bg-yellow-50 text-yellow-950 border-yellow-300 hover:bg-yellow-100',
    category: 'style'
  },
  'wrap-night': {
    id: 'wrap-night',
    label: 'Wrap Night',
    emoji: '🌯',
    bgClass: 'bg-yellow-50',
    textClass: 'text-yellow-950',
    borderClass: 'border-yellow-300',
    badgeClass: 'bg-yellow-50 text-yellow-950 border-yellow-300 hover:bg-yellow-100',
    category: 'style'
  },
  'noodle-stir-fry': {
    id: 'noodle-stir-fry',
    label: 'Noodle Stir-Fry',
    emoji: '🥢',
    bgClass: 'bg-rose-50',
    textClass: 'text-rose-950',
    borderClass: 'border-rose-300',
    badgeClass: 'bg-rose-50 text-rose-950 border-rose-300 hover:bg-rose-100',
    category: 'style'
  },
  'curry': {
    id: 'curry',
    label: 'Curry',
    emoji: '🍛',
    bgClass: 'bg-yellow-100',
    textClass: 'text-yellow-950',
    borderClass: 'border-yellow-400',
    badgeClass: 'bg-yellow-100 text-yellow-950 border-yellow-400 hover:bg-yellow-200',
    category: 'style'
  },
  'fresh-salad': {
    id: 'fresh-salad',
    label: 'Fresh Salad',
    emoji: '🥗',
    bgClass: 'bg-green-50',
    textClass: 'text-green-950',
    borderClass: 'border-green-300',
    badgeClass: 'bg-green-50 text-green-950 border-green-300 hover:bg-green-100',
    category: 'style'
  },
  '80s-diner': {
    id: '80s-diner',
    label: '80s Diner',
    emoji: '🥤',
    bgClass: 'bg-red-50',
    textClass: 'text-red-950',
    borderClass: 'border-red-300',
    badgeClass: 'bg-red-50 text-red-950 border-red-300 hover:bg-red-100',
    category: 'style'
  },
  'french-diner': {
    id: 'french-diner',
    label: 'French Diner',
    emoji: '🥖',
    bgClass: 'bg-blue-50',
    textClass: 'text-blue-950',
    borderClass: 'border-blue-300',
    badgeClass: 'bg-blue-50 text-blue-950 border-blue-300 hover:bg-blue-100',
    category: 'style'
  },

  // === LEFTOVERS & COPY MEALS ===
  'leftovers': {
    id: 'leftovers',
    label: 'Leftovers',
    emoji: '🔄',
    bgClass: 'bg-teal-50',
    textClass: 'text-teal-900',
    borderClass: 'border-teal-300',
    badgeClass: 'bg-teal-50 text-teal-900 border-teal-300 hover:bg-teal-100',
    category: 'leftover'
  },
  'zero-cooking': {
    id: 'zero-cooking',
    label: 'Zero Cooking',
    emoji: '✨',
    bgClass: 'bg-sky-50',
    textClass: 'text-sky-900',
    borderClass: 'border-sky-300',
    badgeClass: 'bg-sky-50 text-sky-900 border-sky-300 hover:bg-sky-100',
    category: 'leftover'
  },
  'quick-reheat': {
    id: 'quick-reheat',
    label: 'Quick Reheat',
    emoji: '♨️',
    bgClass: 'bg-orange-50',
    textClass: 'text-orange-900',
    borderClass: 'border-orange-300',
    badgeClass: 'bg-orange-50 text-orange-900 border-orange-300 hover:bg-orange-100',
    category: 'leftover'
  }
};

/**
 * Historical and naming variant aliases mapping into canonical slugs.
 */
export const TAG_ALIASES: Record<string, string> = {
  // High Protein & High Fiber
  'high protein & high fiber': 'high-protein',
  'high protein': 'high-protein',
  'high-protein': 'high-protein',
  'protein': 'high-protein',

  // Great Base
  'great base': 'great-base',
  'great-base': 'great-base',

  // Balanced
  'moderately balanced': 'balanced',
  'balanced': 'balanced',

  // Classics
  'remastered classics': 'classics',
  'diner classic': 'classics',
  'retro classic': 'classics',
  'classics': 'classics',
  'classic': 'classics',

  // Quick
  'quick': 'quick',
  'quick ≤20m': 'quick',
  'quick ≤20 m': 'quick',
  'quick <=20m': 'quick',
  'quick <=20 m': 'quick',
  'speedy lunch': 'quick',
  'speedy 15m': 'quick',
  'quick skillet': 'quick',
  'speedy': 'quick',

  // Batch Hero
  'batch hero': 'batch-hero',
  'batch heroes': 'batch-hero',
  'batch-hero': 'batch-hero',
  'batch legend': 'batch-hero',
  'make ahead': 'batch-hero',

  // Speeds & Seasons
  'slow burn': 'slow-burn',
  'slow-burn': 'slow-burn',
  'summer': 'summer',
  'winter': 'winter',
  'all year': 'all-year',
  'all-year': 'all-year',
  'allyear': 'all-year',

  // Dietary
  'high fiber': 'high-fiber',
  'high-fiber': 'high-fiber',
  'fiber': 'high-fiber',
  'vegetarian': 'vegetarian',
  'plant power': 'plant-protein',
  'plant protein': 'plant-protein',
  'seafood': 'seafood',
  'omega-3': 'omega-3',
  'low carb': 'low-carb',

  // Cuisines & styles
  'alpine classic': 'alpine-classic',
  'alpine comfort': 'alpine-classic',
  'cozy warm': 'cozy-warm',
  'velvety soup': 'cozy-warm',
  'comfort food': 'comfort-food',
  'comfort skillet': 'comfort-food',
  'one-pan': 'one-pan',
  'one pan': 'one-pan',
  'one-pot bake': 'one-pan',
  'one pot bake': 'one-pan',
  'sheet pan': 'one-pan',
  'skillet eggs': 'one-pan',
  'mexican diner': 'mexican-diner',
  'italian classic': 'italian-classic',
  'italian bake': 'italian-classic',
  'spanish classic': 'spanish-classic',
  'spanish diner': 'spanish-classic',
  'middle eastern': 'middle-eastern',
  'levantine': 'middle-eastern',
  'mediterranean': 'middle-eastern',
  'burger night': 'burger-night',
  'pizza night': 'pizza-night',
  'diner sandwich': 'diner-sandwich',
  'deli classic': 'diner-sandwich',
  'wrap night': 'wrap-night',
  'noodle stir-fry': 'noodle-stir-fry',
  'wok special': 'noodle-stir-fry',
  'curry': 'curry',
  'fresh salad': 'fresh-salad',
  'classic salad': 'fresh-salad',
  'fresh & crisp': 'fresh-salad',
  '80s diner': '80s-diner',
  'french diner': 'french-diner',
  'user favorite': '80s-diner',
  'picnic hero': '80s-diner',
  'brunch & dinner': 'one-pan',

  // Leftovers
  'leftovers': 'leftovers',
  'zero cooking': 'zero-cooking',
  'quick 3m reheat': 'quick-reheat',
  'quick reheat': 'quick-reheat'
};

/**
 * Fallback palette options for custom/user-added tags (80s retro compatible).
 */
const FALLBACK_PALETTES = [
  { bgClass: 'bg-emerald-50', textClass: 'text-emerald-950', borderClass: 'border-emerald-300' },
  { bgClass: 'bg-amber-50', textClass: 'text-amber-950', borderClass: 'border-amber-300' },
  { bgClass: 'bg-orange-50', textClass: 'text-orange-950', borderClass: 'border-orange-300' },
  { bgClass: 'bg-red-50', textClass: 'text-red-950', borderClass: 'border-red-300' },
  { bgClass: 'bg-teal-50', textClass: 'text-teal-950', borderClass: 'border-teal-300' },
  { bgClass: 'bg-purple-50', textClass: 'text-purple-950', borderClass: 'border-purple-300' },
  { bgClass: 'bg-sky-50', textClass: 'text-sky-950', borderClass: 'border-sky-300' },
  { bgClass: 'bg-stone-100', textClass: 'text-stone-900', borderClass: 'border-stone-300' }
];

/**
 * Contextual keyword emoji detector for custom user tags.
 */
function getCustomEmoji(cleanName: string): string {
  const lower = cleanName.toLowerCase();
  if (lower.includes('spic') || lower.includes('chili') || lower.includes('hot')) return '🌶️';
  if (lower.includes('chees')) return '🧀';
  if (lower.includes('garlic')) return '🧄';
  if (lower.includes('rice')) return '🍚';
  if (lower.includes('pasta') || lower.includes('noodle')) return '🍝';
  if (lower.includes('egg')) return '🥚';
  if (lower.includes('soup') || lower.includes('stew') || lower.includes('broth')) return '🥣';
  if (lower.includes('bread') || lower.includes('toast') || lower.includes('bak')) return '🍞';
  if (lower.includes('sweet') || lower.includes('dessert') || lower.includes('cake') || lower.includes('pancake')) return '🥞';
  if (lower.includes('drink') || lower.includes('shake') || lower.includes('coffee')) return '🥤';
  if (lower.includes('meat') || lower.includes('steak') || lower.includes('beef') || lower.includes('pork')) return '🥩';
  if (lower.includes('chick') || lower.includes('poultry')) return '🍗';
  if (lower.includes('fish') || lower.includes('salmon') || lower.includes('tuna')) return '🐟';
  if (lower.includes('vegan') || lower.includes('plant') || lower.includes('salad')) return '🥗';
  if (lower.includes('snack') || lower.includes('crisp')) return '🥨';
  return '🏷️';
}

/**
 * Deterministic string hash for palette assignment.
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Retrieve canonical TagDefinition for any tag string (registered, aliased, or custom).
 */
export function getTagDefinition(rawTag: string): TagDefinition {
  const trimmed = (rawTag || '').trim();
  if (!trimmed) {
    return {
      id: 'general',
      label: 'General',
      emoji: '🏷️',
      bgClass: 'bg-zinc-100',
      textClass: 'text-zinc-800',
      borderClass: 'border-zinc-300',
      badgeClass: 'bg-zinc-100 text-zinc-800 border-zinc-300 hover:bg-zinc-200',
      category: 'custom'
    };
  }

  // 1. Direct registry match (by slug or label)
  const directSlug = trimmed.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  if (TAG_REGISTRY[directSlug]) {
    return TAG_REGISTRY[directSlug];
  }

  // 2. Check alias dictionary
  const aliasSlug = TAG_ALIASES[trimmed.toLowerCase()];
  if (aliasSlug && TAG_REGISTRY[aliasSlug]) {
    return TAG_REGISTRY[aliasSlug];
  }

  // 3. Fallback: generate custom tag definition
  const palette = FALLBACK_PALETTES[hashString(trimmed) % FALLBACK_PALETTES.length];
  const emoji = getCustomEmoji(trimmed);
  const badgeClass = `${palette.bgClass} ${palette.textClass} ${palette.borderClass} hover:opacity-90`;

  return {
    id: directSlug || 'custom-tag',
    label: trimmed,
    emoji,
    bgClass: palette.bgClass,
    textClass: palette.textClass,
    borderClass: palette.borderClass,
    badgeClass,
    category: 'custom'
  };
}

/**
 * Normalize and deduplicate a list of tag strings.
 * Filters out legacy filler tags (like 'Standard' speed), empty strings,
 * and collapses variant aliases to their canonical definitions.
 */
export function normalizeTagList(tags: string[]): string[] {
  if (!Array.isArray(tags)) return [];
  const seenSlugs = new Set<string>();
  const normalized: string[] = [];

  tags.forEach((raw) => {
    const trimmed = (raw || '').trim();
    if (!trimmed) return;

    // Ignore legacy/filler speed tag 'standard' so it never generates duplicate or unwanted badges
    if (trimmed.toLowerCase() === 'standard') return;

    const def = getTagDefinition(trimmed);
    if (!seenSlugs.has(def.id)) {
      seenSlugs.add(def.id);
      normalized.push(def.label);
    }
  });

  return normalized;
}

/**
 * Deduplicate and normalize tags for a meal object.
 */
export function normalizeMealTags<T extends Meal>(meal: T): T {
  if (!meal) return meal;
  return {
    ...meal,
    tags: normalizeTagList(meal.tags || [])
  };
}

/**
 * Deduplicate and normalize tags across every meal in a weekly plan.
 */
export function normalizeWeeklyPlan(plan: WeeklyPlan): WeeklyPlan {
  if (!plan || !plan.days) return plan;
  const days = { ...plan.days };
  for (const day of Object.keys(days) as (keyof typeof days)[]) {
    const dayPlan = days[day];
    if (dayPlan) {
      days[day] = {
        ...dayPlan,
        lunch: normalizeMealTags(dayPlan.lunch),
        dinner: normalizeMealTags(dayPlan.dinner)
      };
    }
  }
  return {
    ...plan,
    days
  };
}

/**
 * Return curated list of all registered tags for UI quick-selection.
 */
export function getAllRegisteredTags(): TagDefinition[] {
  return Object.values(TAG_REGISTRY);
}

/**
 * Helper to check whether a meal contains a tag (matching canonical, alias, or raw string).
 */
export function mealMatchesTag(meal: Meal, targetTag: string): boolean {
  if (!meal || !Array.isArray(meal.tags)) return false;
  const targetDef = getTagDefinition(targetTag);
  return meal.tags.some((t) => {
    const tDef = getTagDefinition(t);
    return tDef.id === targetDef.id;
  });
}
