export type DayOfWeek = 
  | 'Monday' 
  | 'Tuesday' 
  | 'Wednesday' 
  | 'Thursday' 
  | 'Friday' 
  | 'Saturday' 
  | 'Sunday';

export const DAYS_OF_WEEK: DayOfWeek[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export type MealType = 'lunch' | 'dinner';

export interface Ingredient {
  id: string;
  name: string;
  amount: string;
  category: 'Produce' | 'Dairy & Eggs' | 'Meat & Seafood' | 'Bakery' | 'Pantry' | 'Sauces & Condiments';
  isExpiring?: boolean;
}

export type LeftoverSuitability = 'excellent' | 'good' | 'cook_fresh_only';

export interface Meal {
  id: string;
  title: string;
  mealType: MealType;
  prepTime: number; // in mins
  cookTime: number; // in mins
  servings: number; // default 2 (El Gordo & El Flaco)
  tags: string[];
  ingredients: Ingredient[];
  notes: string;
  calorieEstimate?: number; // per serving
  gordoPortionNotes?: string;
  flacoPortionNotes?: string;
  usesExpiringItemIds?: string[];
  
  // Leftover & Low-Effort Batch Cooking
  leftoverSuitability?: LeftoverSuitability;
  isLeftover?: boolean;
  sourceDay?: DayOfWeek;
  sourceMealType?: MealType;
  sourceMealTitle?: string;
  isBatchCook?: boolean;
  batchServings?: number; // e.g. 4 (2 people x 2 meals)
  reheatInstructions?: string;
}

export interface DayPlan {
  day: DayOfWeek;
  dateLabel: string;
  lunch: Meal;
  dinner: Meal;
}

export interface WeeklyPlan {
  id: string;
  weekName: string;
  startDate: string;
  days: Record<DayOfWeek, DayPlan>;
}

export interface PantryItem {
  id: string;
  name: string;
  category: 'Produce' | 'Dairy & Eggs' | 'Meat & Seafood' | 'Bakery' | 'Pantry' | 'Sauces & Condiments';
  quantity: string;
  daysUntilExpiry: number; // e.g. 1 = tomorrow, 0 = today, negative = past
  addedDate?: string;
}

export interface PersonProfile {
  id: 'gordo' | 'flaco';
  name: string;
  nickname: string;
  appetitePreference: string;
  badgeColor: string;
}
