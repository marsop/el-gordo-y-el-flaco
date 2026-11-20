import { DayOfWeek, DAYS_OF_WEEK, Ingredient, Meal, PantryItem, WeeklyPlan } from '../types';
import { isIngredientMatchingPantryItem } from './pantryMatcher';

export interface IngredientSource {
  day: DayOfWeek;
  mealType: 'lunch' | 'dinner';
  mealTitle: string;
  originalAmount: string;
  calculatedAmount: string;
  isBatchCook: boolean;
  multiplier: number;
}

export interface AggregatedGroceryItem {
  id: string;
  name: string;
  category: Ingredient['category'];
  totalCount: number; // Primary badge count: either total discrete units (e.g. 3 for 3 bottles) or occurrences
  occurrences: number; // Number of meal slots (taking x2 batch cook into account)
  totalQuantity: number | null; // Numeric sum if parseable (e.g. 3)
  unit: string | null; // e.g. "bottle"
  displayAmount: string; // e.g. "3 bottles" or "3 cans rinsed" or "400g"
  sources: IngredientSource[];
  isExpiring?: boolean;
  pantryStock?: {
    item: PantryItem;
    quantity: string;
    daysUntilExpiry: number;
  };
}

export interface ItemizedGroceryItem {
  id: string;
  name: string;
  category: Ingredient['category'];
  amount: string;
  day: DayOfWeek;
  mealType: 'lunch' | 'dinner';
  mealTitle: string;
  isBatchCook: boolean;
  isExpiring?: boolean;
}

interface ParsedAmountPart {
  value: number | null;
  unit: string;
  suffix: string;
  raw: string;
}

const INVARIANT_UNITS = new Set(['g', 'kg', 'ml', 'l', 'tbsp', 'tsp', 'oz', 'lbs']);

/**
 * Normalizes a unit string to singular for matching (e.g. "bottles" -> "bottle")
 */
function normalizeUnit(unit: string): string {
  const lower = unit.toLowerCase().trim();
  if (INVARIANT_UNITS.has(lower)) return lower;
  if (lower.endsWith('ies') && lower.length > 4) return lower.slice(0, -3) + 'y';
  if (lower.endsWith('es') && (lower.endsWith('ches') || lower.endsWith('shes') || lower.endsWith('xes'))) {
    return lower.slice(0, -2);
  }
  if (lower.endsWith('s') && !lower.endsWith('ss') && lower.length > 2) {
    return lower.slice(0, -1);
  }
  return lower;
}

/**
 * Formats a unit back to singular or plural based on quantity
 */
function formatUnit(unit: string, quantity: number): string {
  const norm = normalizeUnit(unit);
  if (INVARIANT_UNITS.has(norm)) return norm;
  if (quantity === 1) return norm;

  // Pluralization
  if (norm.endsWith('y') && !/[aeiou]y$/.test(norm)) {
    return norm.slice(0, -1) + 'ies';
  }
  if (norm.endsWith('ch') || norm.endsWith('sh') || norm.endsWith('x') || norm.endsWith('s')) {
    return norm + 'es';
  }
  return norm + 's';
}

/**
 * Parses numeric amount from a string like "1 bottle", "2 cans rinsed", "3/4 cup", "400g"
 */
export function parseAmount(rawAmount: string, multiplier = 1): ParsedAmountPart {
  const trimmed = rawAmount.trim();
  if (!trimmed) {
    return { value: null, unit: '', suffix: '', raw: trimmed };
  }

  // 1. Mixed fraction: e.g. "1 1/2 cups"
  const mixedMatch = trimmed.match(/^(\d+)\s+(\d+)\/(\d+)\s*(.*)$/);
  if (mixedMatch) {
    const whole = parseFloat(mixedMatch[1]);
    const num = parseFloat(mixedMatch[2]);
    const denom = parseFloat(mixedMatch[3]) || 1;
    const val = (whole + num / denom) * multiplier;
    const rest = mixedMatch[4].trim();
    const [unit, ...suffixParts] = rest.split(/\s+/);
    return {
      value: val,
      unit: unit ? normalizeUnit(unit) : '',
      suffix: suffixParts.join(' '),
      raw: trimmed
    };
  }

  // 2. Simple fraction: e.g. "3/4 cup"
  const fractionMatch = trimmed.match(/^(\d+)\/(\d+)\s*(.*)$/);
  if (fractionMatch) {
    const num = parseFloat(fractionMatch[1]);
    const denom = parseFloat(fractionMatch[2]) || 1;
    const val = (num / denom) * multiplier;
    const rest = fractionMatch[3].trim();
    const [unit, ...suffixParts] = rest.split(/\s+/);
    return {
      value: val,
      unit: unit ? normalizeUnit(unit) : '',
      suffix: suffixParts.join(' '),
      raw: trimmed
    };
  }

  // 3. Simple range: e.g. "2-4 eggs" or "4-5 buns" -> average value with multiplier
  const rangeMatch = trimmed.match(/^(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)\s*(.*)$/);
  if (rangeMatch) {
    const min = parseFloat(rangeMatch[1]);
    const max = parseFloat(rangeMatch[2]);
    const val = Math.round(((min + max) / 2) * multiplier);
    const rest = rangeMatch[3].trim();
    const [unit, ...suffixParts] = rest.split(/\s+/);
    return {
      value: val,
      unit: unit ? normalizeUnit(unit) : '',
      suffix: suffixParts.join(' '),
      raw: trimmed
    };
  }

  // 4. Metric joined e.g. "400g", "250ml"
  const metricMatch = trimmed.match(/^(\d+(?:\.\d+)?)(g|kg|ml|l|oz|lbs)$/i);
  if (metricMatch) {
    const val = parseFloat(metricMatch[1]) * multiplier;
    return {
      value: val,
      unit: metricMatch[2].toLowerCase(),
      suffix: '',
      raw: trimmed
    };
  }

  // 5. Standard decimal / integer with unit: e.g. "1 bottle", "2 cans rinsed", "1.5 cups"
  const standardMatch = trimmed.match(/^(\d+(?:\.\d+)?)\s*(.*)$/);
  if (standardMatch) {
    const val = parseFloat(standardMatch[1]) * multiplier;
    const rest = standardMatch[2].trim();
    const [unit, ...suffixParts] = rest.split(/\s+/);
    return {
      value: val,
      unit: unit ? normalizeUnit(unit) : '',
      suffix: suffixParts.join(' '),
      raw: trimmed
    };
  }

  // 6. Unparseable non-numeric amount: e.g. "To taste", "1 of each"
  return {
    value: null,
    unit: '',
    suffix: '',
    raw: trimmed
  };
}

/**
 * Formats a numeric value nicely (e.g. 1.5 -> "1.5", 3.0 -> "3")
 */
function formatNumber(num: number): string {
  const rounded = Math.round(num * 10) / 10;
  return rounded % 1 === 0 ? rounded.toString() : rounded.toFixed(1);
}

/**
 * Combines parsed amounts into a clean human-readable summary string
 */
function combineParsedAmounts(parts: ParsedAmountPart[]): string {
  if (parts.length === 0) return '';
  if (parts.length === 1) {
    const p = parts[0];
    if (p.value !== null) {
      const u = p.unit ? ` ${formatUnit(p.unit, p.value)}` : '';
      const s = p.suffix ? ` ${p.suffix}` : '';
      return `${formatNumber(p.value)}${u}${s}`.trim();
    }
    return p.raw;
  }

  // Group by (unit + suffix)
  const grouped = new Map<string, { totalVal: number; unit: string; suffix: string }>();
  const unparseable: string[] = [];

  for (const p of parts) {
    if (p.value !== null) {
      const key = `${p.unit}___${p.suffix}`.toLowerCase();
      const existing = grouped.get(key);
      if (existing) {
        existing.totalVal += p.value;
      } else {
        grouped.set(key, { totalVal: p.value, unit: p.unit, suffix: p.suffix });
      }
    } else {
      if (!unparseable.includes(p.raw)) {
        unparseable.push(p.raw);
      }
    }
  }

  const resultSegments: string[] = [];

  for (const g of grouped.values()) {
    const formattedVal = formatNumber(g.totalVal);
    const u = g.unit ? ` ${formatUnit(g.unit, g.totalVal)}` : '';
    const s = g.suffix ? ` ${g.suffix}` : '';
    resultSegments.push(`${formattedVal}${u}${s}`.trim());
  }

  resultSegments.push(...unparseable);
  return resultSegments.join(' + ');
}

export interface GroceryExtractionOptions {
  pantryItems?: PantryItem[];
}

/**
 * Extracts and aggregates all required grocery ingredients across the weekly plan.
 * Strictly skips leftover meals (reheats) since their ingredients were already accounted
 * for during batch cooking. Double batch cooks (isBatchCook = true) count with multiplier 2.
 */
export function getAggregatedGroceryList(
  plan: WeeklyPlan,
  options?: GroceryExtractionOptions
): Record<string, AggregatedGroceryItem[]> {
  const pantryItems = options?.pantryItems || [];
  const categoryMap: Record<string, AggregatedGroceryItem[]> = {};

  DAYS_OF_WEEK.forEach((day) => {
    const dp = plan.days[day];
    if (!dp) return;

    // Both lunch and dinner can potentially be leftovers; skip leftovers
    const mealsToShop: { meal: Meal; mealType: 'lunch' | 'dinner' }[] = [];
    if (!dp.lunch.isLeftover) {
      mealsToShop.push({ meal: dp.lunch, mealType: 'lunch' });
    }
    if (!dp.dinner.isLeftover) {
      mealsToShop.push({ meal: dp.dinner, mealType: 'dinner' });
    }

    mealsToShop.forEach(({ meal, mealType }) => {
      const multiplier = meal.isBatchCook ? 2 : 1;

      meal.ingredients.forEach((ing) => {
        const cat = ing.category || 'Pantry';
        if (!categoryMap[cat]) categoryMap[cat] = [];

        const normalizedName = ing.name.trim().toLowerCase();
        let existingItem = categoryMap[cat].find(
          (item) => item.name.trim().toLowerCase() === normalizedName
        );

        const parsed = parseAmount(ing.amount, multiplier);
        const calculatedAmount = parsed.value !== null
          ? `${formatNumber(parsed.value)}${parsed.unit ? ` ${formatUnit(parsed.unit, parsed.value)}` : ''}${parsed.suffix ? ` ${parsed.suffix}` : ''}`.trim()
          : multiplier > 1 ? `${ing.amount} (×${multiplier} batch)` : ing.amount;

        const source: IngredientSource = {
          day,
          mealType,
          mealTitle: meal.title,
          originalAmount: ing.amount,
          calculatedAmount,
          isBatchCook: !!meal.isBatchCook,
          multiplier
        };

        if (existingItem) {
          existingItem.occurrences += multiplier;
          existingItem.sources.push(source);
          if (ing.isExpiring) existingItem.isExpiring = true;
        } else {
          // Check if stocked in pantry
          let matchedPantryStock: AggregatedGroceryItem['pantryStock'];
          if (pantryItems.length > 0) {
            const pItem = pantryItems.find((p) =>
              isIngredientMatchingPantryItem(ing.name, p.name)
            );
            if (pItem) {
              matchedPantryStock = {
                item: pItem,
                quantity: pItem.quantity,
                daysUntilExpiry: pItem.daysUntilExpiry
              };
            }
          }

          existingItem = {
            id: `${cat}-${normalizedName}`,
            name: ing.name.trim(),
            category: cat,
            totalCount: multiplier,
            occurrences: multiplier,
            totalQuantity: null,
            unit: null,
            displayAmount: '',
            sources: [source],
            isExpiring: ing.isExpiring,
            pantryStock: matchedPantryStock
          };
          categoryMap[cat].push(existingItem);
        }
      });
    });
  });

  const DISCRETE_COUNTABLE_UNITS = new Set([
    'bottle', 'can', 'egg', 'pack', 'slice', 'bun', 'piece', 'tub',
    'jar', 'block', 'bag', 'head', 'clove', 'stalk', 'sheet', 'box'
  ]);

  // Calculate final aggregated display amounts and precise counts
  Object.values(categoryMap).forEach((items) => {
    items.forEach((item) => {
      const parsedParts = item.sources.map((s) => parseAmount(s.originalAmount, s.multiplier));
      item.displayAmount = combineParsedAmounts(parsedParts);

      // Check if all parts have valid numeric values with the same unit
      const validNumbers = parsedParts.filter((p) => p.value !== null);
      if (validNumbers.length === parsedParts.length && parsedParts.length > 0) {
        const firstUnit = parsedParts[0].unit;
        const allSameUnit = parsedParts.every((p) => p.unit === firstUnit);
        if (allSameUnit) {
          const sum = parsedParts.reduce((acc, p) => acc + (p.value || 0), 0);
          item.totalQuantity = sum;
          item.unit = firstUnit || null;

          // If unit is discrete/countable or bare number (e.g. 3 bottles or 6 eggs),
          // set totalCount to the actual number of units needed!
          if (firstUnit === '' || DISCRETE_COUNTABLE_UNITS.has(firstUnit)) {
            item.totalCount = Math.max(1, Math.round(sum));
          } else {
            // Continuous metric (e.g. 600g, 3 cups): totalCount is occurrences
            item.totalCount = item.occurrences;
          }
        } else {
          item.totalCount = item.occurrences;
        }
      } else {
        item.totalCount = item.occurrences;
      }
    });
    // Sort alphabetically by ingredient name
    items.sort((a, b) => a.name.localeCompare(b.name));
  });

  return categoryMap;
}

/**
 * Returns itemized list of all ingredients by meal occurrence
 */
export function getItemizedGroceryList(
  plan: WeeklyPlan
): Record<string, ItemizedGroceryItem[]> {
  const result: Record<string, ItemizedGroceryItem[]> = {};

  DAYS_OF_WEEK.forEach((day) => {
    const dp = plan.days[day];
    if (!dp) return;

    const mealsToShop: { meal: Meal; mealType: 'lunch' | 'dinner' }[] = [];
    if (!dp.lunch.isLeftover) mealsToShop.push({ meal: dp.lunch, mealType: 'lunch' });
    if (!dp.dinner.isLeftover) mealsToShop.push({ meal: dp.dinner, mealType: 'dinner' });

    mealsToShop.forEach(({ meal, mealType }) => {
      const multiplier = meal.isBatchCook ? 2 : 1;
      meal.ingredients.forEach((ing, idx) => {
        const cat = ing.category || 'Pantry';
        if (!result[cat]) result[cat] = [];

        const parsed = parseAmount(ing.amount, multiplier);
        const amountDisplay = parsed.value !== null
          ? `${formatNumber(parsed.value)}${parsed.unit ? ` ${formatUnit(parsed.unit, parsed.value)}` : ''}${parsed.suffix ? ` ${parsed.suffix}` : ''}`.trim()
          : multiplier > 1 ? `${ing.amount} (×${multiplier} batch)` : ing.amount;

        result[cat].push({
          id: `${cat}-${day}-${mealType}-${ing.name}-${idx}`,
          name: ing.name,
          category: cat,
          amount: amountDisplay,
          day,
          mealType,
          mealTitle: meal.title,
          isBatchCook: !!meal.isBatchCook,
          isExpiring: ing.isExpiring
        });
      });
    });
  });

  return result;
}
