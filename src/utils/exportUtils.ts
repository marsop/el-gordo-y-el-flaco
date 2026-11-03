import { DAYS_OF_WEEK, WeeklyPlan, PantryItem } from '../types';
import { isIngredientExpiring } from './pantryMatcher';

/**
 * Escapes values for safe CSV format
 */
function escapeCSV(val: string | number | undefined): string {
  if (val === undefined || val === null) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

/**
 * Export the weekly plan as a clean RFC 4180 CSV file
 */
export function exportToCSV(plan: WeeklyPlan): void {
  const headers = [
    'Day',
    'Date',
    'Meal Type',
    'Dish Title',
    'Cooking Strategy',
    'Leftover Suitability',
    'Servings',
    'Prep Time (mins)',
    'Cook Time (mins)',
    'Est Calories (per serving)',
    'Tags',
    'Ingredients',
    'Reheat Instructions',
    'Notes',
    'Gordo Portion Note',
    'Flaco Portion Note'
  ];

  const rows: string[] = [headers.join(',')];

  DAYS_OF_WEEK.forEach((day) => {
    const dayPlan = plan.days[day];
    if (!dayPlan) return;

    // Lunch row
    const lunchCookingStrategy = dayPlan.lunch.isLeftover 
      ? `Leftovers (from ${dayPlan.lunch.sourceDay || 'previous'} ${dayPlan.lunch.sourceMealType || 'dinner'})` 
      : dayPlan.lunch.isBatchCook 
      ? 'Double Batch Cook' 
      : 'Cook Fresh';

    const lunchIngs = dayPlan.lunch.ingredients.map((i) => `${i.amount} ${i.name}`).join('; ');
    rows.push([
      escapeCSV(day),
      escapeCSV(dayPlan.dateLabel),
      escapeCSV('Lunch'),
      escapeCSV(dayPlan.lunch.title),
      escapeCSV(lunchCookingStrategy),
      escapeCSV(dayPlan.lunch.leftoverSuitability || ''),
      escapeCSV(dayPlan.lunch.servings),
      escapeCSV(dayPlan.lunch.prepTime),
      escapeCSV(dayPlan.lunch.cookTime),
      escapeCSV(dayPlan.lunch.calorieEstimate || ''),
      escapeCSV(dayPlan.lunch.tags.join(', ')),
      escapeCSV(lunchIngs),
      escapeCSV(dayPlan.lunch.reheatInstructions || ''),
      escapeCSV(dayPlan.lunch.notes),
      escapeCSV(dayPlan.lunch.gordoPortionNotes || ''),
      escapeCSV(dayPlan.lunch.flacoPortionNotes || '')
    ].join(','));

    // Dinner row
    const dinnerCookingStrategy = dayPlan.dinner.isLeftover 
      ? `Leftovers (from ${dayPlan.dinner.sourceDay || 'previous'} ${dayPlan.dinner.sourceMealType || 'dinner'})` 
      : dayPlan.dinner.isBatchCook 
      ? 'Double Batch Cook' 
      : 'Cook Fresh';

    const dinnerIngs = dayPlan.dinner.ingredients.map((i) => `${i.amount} ${i.name}`).join('; ');
    rows.push([
      escapeCSV(day),
      escapeCSV(dayPlan.dateLabel),
      escapeCSV('Dinner'),
      escapeCSV(dayPlan.dinner.title),
      escapeCSV(dinnerCookingStrategy),
      escapeCSV(dayPlan.dinner.leftoverSuitability || ''),
      escapeCSV(dayPlan.dinner.servings),
      escapeCSV(dayPlan.dinner.prepTime),
      escapeCSV(dayPlan.dinner.cookTime),
      escapeCSV(dayPlan.dinner.calorieEstimate || ''),
      escapeCSV(dayPlan.dinner.tags.join(', ')),
      escapeCSV(dinnerIngs),
      escapeCSV(dayPlan.dinner.reheatInstructions || ''),
      escapeCSV(dayPlan.dinner.notes),
      escapeCSV(dayPlan.dinner.gordoPortionNotes || ''),
      escapeCSV(dayPlan.dinner.flacoPortionNotes || '')
    ].join(','));
  });

  const csvContent = '\uFEFF' + rows.join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `el_gordo_y_el_flaco_${plan.weekName.replace(/\s+/g, '_').toLowerCase()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generate rich Markdown content for copying or downloading
 */
export function generateMarkdown(plan: WeeklyPlan, pantryItems?: PantryItem[]): string {
  const lines: string[] = [];

  // Count metrics
  let leftoverCount = 0;
  DAYS_OF_WEEK.forEach((d) => {
    if (plan.days[d]?.lunch.isLeftover) leftoverCount++;
    if (plan.days[d]?.dinner.isLeftover) leftoverCount++;
  });

  lines.push(`# 🍔🌮 EL GORDO Y EL FLACO — WEEKLY MEAL PLAN`);
  lines.push(`**${plan.weekName}** | Starts: Monday | 2 People (El Gordo & El Flaco)`);
  lines.push(`*Efficiency Strategy: ${leftoverCount} Leftover Reheat Meals (Zero active cooking!)*\n`);

  lines.push(`## 🗓️ Weekly Schedule At A Glance\n`);
  lines.push(`| Day | Date | Lunch (2 Servings) | Dinner (2 Servings) |`);
  lines.push(`| :--- | :--- | :--- | :--- |`);

  DAYS_OF_WEEK.forEach((day) => {
    const dp = plan.days[day];
    if (dp) {
      const lunchPrefix = dp.lunch.isLeftover ? '🔄 **[LEFTOVER]** ' : '';
      const dinnerSuffix = dp.dinner.isBatchCook ? ' *(🥘 Double Batch)*' : '';
      lines.push(
        `| **${day}** | ${dp.dateLabel} | ${lunchPrefix}${dp.lunch.title} *(${dp.lunch.prepTime + dp.lunch.cookTime}m)* | ${dp.dinner.title}${dinnerSuffix} *(${dp.dinner.prepTime + dp.dinner.cookTime}m)* |`
      );
    }
  });

  lines.push(`\n---\n`);
  lines.push(`## 🍽️ Day-by-Day Meal Breakdown & Portions\n`);

  DAYS_OF_WEEK.forEach((day) => {
    const dp = plan.days[day];
    if (!dp) return;

    lines.push(`### ${day} (${dp.dateLabel})`);
    
    // Lunch
    const lunchHeading = dp.lunch.isLeftover
      ? `#### ☀️ Lunch: 🔄 [LEFTOVER REHEAT] ${dp.lunch.title}`
      : `#### ☀️ Lunch: ${dp.lunch.title}`;
    lines.push(lunchHeading);
    
    if (dp.lunch.isLeftover) {
      lines.push(`> **Zero Cooking:** Saved from ${dp.lunch.sourceDay || 'previous'} ${dp.lunch.sourceMealType || 'dinner'}. Reheat: ${dp.lunch.reheatInstructions || 'Microwave 2m covered.'}`);
    } else {
      lines.push(`- **Time:** ${dp.lunch.prepTime}m prep · ${dp.lunch.cookTime}m cook | **Est:** ~${dp.lunch.calorieEstimate || 500} kcal/person`);
    }
    lines.push(`- **Tags:** ${dp.lunch.tags.join(' · ')}`);
    lines.push(`- **Ingredients (Serves 2):**`);
    dp.lunch.ingredients.forEach((ing) => {
      const isExp = pantryItems ? isIngredientExpiring(ing, dp.lunch, pantryItems) : ing.isExpiring;
      lines.push(`  - [ ] ${ing.amount} ${ing.name} ${isExp ? '*(Expiring soon)*' : ''}`);
    });
    if (dp.lunch.notes) {
      lines.push(`- **Diner Tip:** ${dp.lunch.notes}`);
    }
    if (dp.lunch.gordoPortionNotes) {
      lines.push(`- **El Gordo Portion:** ${dp.lunch.gordoPortionNotes}`);
    }
    if (dp.lunch.flacoPortionNotes) {
      lines.push(`- **El Flaco Portion:** ${dp.lunch.flacoPortionNotes}`);
    }
    lines.push('');

    // Dinner
    const dinnerHeading = dp.dinner.isBatchCook
      ? `#### 🌙 Dinner: 🥘 [DOUBLE BATCH - 4 SERVINGS] ${dp.dinner.title}`
      : `#### 🌙 Dinner: ${dp.dinner.title}`;
    lines.push(dinnerHeading);

    lines.push(`- **Time:** ${dp.dinner.prepTime}m prep · ${dp.dinner.cookTime}m cook | **Est:** ~${dp.dinner.calorieEstimate || 600} kcal/person`);
    if (dp.dinner.leftoverSuitability) {
      lines.push(`- **Keeping Quality:** ${dp.dinner.leftoverSuitability === 'excellent' ? 'Excellent (keeps 3-4 days)' : dp.dinner.leftoverSuitability === 'good' ? 'Good (keeps 2 days)' : 'Cook fresh only'}`);
    }
    lines.push(`- **Tags:** ${dp.dinner.tags.join(' · ')}`);
    lines.push(`- **Ingredients (${dp.dinner.isBatchCook ? 'Double Batch for 4 Servings' : 'Serves 2'}):**`);
    dp.dinner.ingredients.forEach((ing) => {
      const isExp = pantryItems ? isIngredientExpiring(ing, dp.dinner, pantryItems) : ing.isExpiring;
      lines.push(`  - [ ] ${dp.dinner.isBatchCook ? `${ing.amount} (×2)` : ing.amount} ${ing.name} ${isExp ? '*(Expiring soon)*' : ''}`);
    });
    if (dp.dinner.notes) {
      lines.push(`- **Diner Tip:** ${dp.dinner.notes}`);
    }
    if (dp.dinner.gordoPortionNotes) {
      lines.push(`- **El Gordo Portion:** ${dp.dinner.gordoPortionNotes}`);
    }
    if (dp.dinner.flacoPortionNotes) {
      lines.push(`- **El Flaco Portion:** ${dp.dinner.flacoPortionNotes}`);
    }
    lines.push('\n---\n');
  });

  // Consolidated Grocery List
  lines.push(`## 🛒 Consolidated Grocery List (for 2 People)\n`);
  const grouped: Record<string, string[]> = {};
  
  DAYS_OF_WEEK.forEach((day) => {
    const dp = plan.days[day];
    if (!dp) return;
    
    // Only count fresh meals or batch dinners so we don't duplicate leftover ingredients
    const mealsToCount = [
      dp.dinner,
      ...(dp.lunch.isLeftover ? [] : [dp.lunch])
    ];

    mealsToCount.forEach((meal) => {
      meal.ingredients.forEach((ing) => {
        const cat = ing.category || 'Pantry';
        if (!grouped[cat]) grouped[cat] = [];
        const label = meal.isBatchCook ? `${ing.name} (${ing.amount} × 2 batch)` : `${ing.name} (${ing.amount})`;
        if (!grouped[cat].includes(label)) {
          grouped[cat].push(label);
        }
      });
    });
  });

  Object.entries(grouped).forEach(([cat, items]) => {
    lines.push(`### ${cat}`);
    items.forEach((item) => {
      lines.push(`- [ ] ${item}`);
    });
    lines.push('');
  });

  lines.push(`\n*Generated by El Gordo Y El Flaco Meal Planner · 80s Diner Drive-Thru Edition*`);

  return lines.join('\n');
}

/**
 * Trigger download of Markdown file
 */
export function exportToMarkdown(plan: WeeklyPlan, pantryItems?: PantryItem[]): void {
  const content = generateMarkdown(plan, pantryItems);
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `el_gordo_y_el_flaco_${plan.weekName.replace(/\s+/g, '_').toLowerCase()}.md`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Trigger browser Print dialog for PDF saving or printing
 */
export function triggerPrintPlan(): void {
  window.print();
}
