import { Ingredient, Meal, PantryItem, WeeklyPlan } from '../types';

export const EXPIRING_THRESHOLD_DAYS = 7;

const FILLER_WORDS = new Set([
  'fresh',
  'ripe',
  'organic',
  'raw',
  'lean',
  'large',
  'medium',
  'small',
  'shredded',
  'sliced',
  'grated',
  'diced',
  'chopped',
  'block',
  'bag',
  'tub',
  'can',
  'cans',
  'jar',
  'pack',
  'bunch',
  'whole',
  'extra',
  'light',
  'for',
  'and',
  'the',
  'style',
  'option',
  'homemade',
  'free',
  'range',
  'favorite',
  'mixed',
  'tray',
  'to',
  'taste',
  'with'
]);

const COLOR_WORDS = new Set(['red', 'green', 'yellow', 'white', 'black', 'brown']);

export function stemWord(word: string): string {
  if (word.endsWith('ies') && word.length > 4) return word.slice(0, -3) + 'y';
  if (word.endsWith('oes') && word.length > 4) return word.slice(0, -2);
  if (word.endsWith('s') && !word.endsWith('ss') && word.length > 3) return word.slice(0, -1);
  return word;
}

export function tokenizeText(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/\([^)]*\)/g, ' ') // Strip parenthetical notes e.g. (Organic), (200g)
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .map((w) => stemWord(w))
    .filter((w) => w.length > 1);
}

export function splitSegments(name: string): string[] {
  return name
    .split(/[&+/]|(?:\s+or\s+)|\band\b|,\s*|(?:\s+with\s+)/i)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function matchSegment(segA: string, segB: string): boolean {
  const wordsA = tokenizeText(segA).filter((w) => !FILLER_WORDS.has(w));
  const wordsB = tokenizeText(segB).filter((w) => !FILLER_WORDS.has(w));
  if (wordsA.length === 0 || wordsB.length === 0) return false;

  const setB = new Set(wordsB);
  const common = wordsA.filter((w) => setB.has(w));
  if (common.length === 0) return false;

  // Avoid matching solely on a color word (e.g. "red" alone should not link "Red Onion" to "Red Bell Peppers")
  const nonColorCommon = common.filter((w) => !COLOR_WORDS.has(w));
  return nonColorCommon.length > 0;
}

export function isIngredientMatchingPantryItem(ingredientName: string, pantryItemName: string): boolean {
  const pSegs = splitSegments(pantryItemName);
  const iSegs = splitSegments(ingredientName);
  for (const p of pSegs) {
    for (const i of iSegs) {
      if (matchSegment(p, i)) return true;
    }
  }
  return false;
}

export function isPantryItemExpiring(item: PantryItem, thresholdDays = EXPIRING_THRESHOLD_DAYS): boolean {
  return typeof item.daysUntilExpiry === 'number' && item.daysUntilExpiry <= thresholdDays;
}

export function getExpiringPantryItems(pantryItems: PantryItem[], thresholdDays = EXPIRING_THRESHOLD_DAYS): PantryItem[] {
  return pantryItems.filter((item) => isPantryItemExpiring(item, thresholdDays));
}

export function isIngredientExpiring(
  ingredient: Ingredient,
  meal: Meal,
  pantryItems: PantryItem[],
  thresholdDays = EXPIRING_THRESHOLD_DAYS
): boolean {
  const expiringPantry = getExpiringPantryItems(pantryItems, thresholdDays);

  // 1. Direct pantry item ID match via meal.usesExpiringItemIds
  if (meal.usesExpiringItemIds && meal.usesExpiringItemIds.length > 0) {
    for (const id of meal.usesExpiringItemIds) {
      const pItem = expiringPantry.find((p) => p.id === id);
      if (pItem && isIngredientMatchingPantryItem(ingredient.name, pItem.name)) {
        return true;
      }
    }
  }

  // 2. Name matching against any expiring pantry item
  return expiringPantry.some((pItem) => isIngredientMatchingPantryItem(ingredient.name, pItem.name));
}

export interface ExpiringStockMatch {
  name: string;
  pantryItemId?: string;
  daysUntilExpiry?: number;
}

export function getExpiringIngredientsForMeal(
  meal: Meal,
  pantryItems: PantryItem[],
  thresholdDays = EXPIRING_THRESHOLD_DAYS
): ExpiringStockMatch[] {
  const expiringPantry = getExpiringPantryItems(pantryItems, thresholdDays);
  if (expiringPantry.length === 0) return [];

  const matched = new Map<string, ExpiringStockMatch>();

  // Check each ingredient of the meal
  for (const ing of meal.ingredients) {
    for (const pItem of expiringPantry) {
      if (isIngredientMatchingPantryItem(ing.name, pItem.name)) {
        if (!matched.has(ing.name)) {
          matched.set(ing.name, {
            name: ing.name,
            pantryItemId: pItem.id,
            daysUntilExpiry: pItem.daysUntilExpiry
          });
        }
        break;
      }
    }
  }

  // Also include any items explicitly linked via usesExpiringItemIds that weren't captured by ingredient names
  if (meal.usesExpiringItemIds) {
    for (const id of meal.usesExpiringItemIds) {
      const pItem = expiringPantry.find((p) => p.id === id);
      if (pItem) {
        const alreadyCovered = Array.from(matched.values()).some((m) => m.pantryItemId === pItem.id);
        if (!alreadyCovered && !matched.has(pItem.name)) {
          matched.set(pItem.name, {
            name: pItem.name,
            pantryItemId: pItem.id,
            daysUntilExpiry: pItem.daysUntilExpiry
          });
        }
      }
    }
  }

  return Array.from(matched.values());
}

export function isPantryItemPlanned(pantryItem: PantryItem, plan: WeeklyPlan): boolean {
  for (const day of Object.values(plan.days)) {
    const meals = [day.lunch, day.dinner];
    for (const m of meals) {
      if (m.usesExpiringItemIds?.includes(pantryItem.id)) {
        return true;
      }
      for (const ing of m.ingredients) {
        if (isIngredientMatchingPantryItem(ing.name, pantryItem.name)) {
          return true;
        }
      }
    }
  }
  return false;
}
