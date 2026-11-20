import { DayOfWeek, DAYS_OF_WEEK, Meal, PantryItem, WeeklyPlan } from '../types';
import {
  ALL_RECIPES,
  RECIPE_CATALOG,
  USER_FAVORITE_RECIPES,
  DINER_ORIGINALS,
  getRecipeById
} from './recipes';
import { INITIAL_INGREDIENTS } from './defaultIngredients';

export { ALL_RECIPES, RECIPE_CATALOG, USER_FAVORITE_RECIPES, DINER_ORIGINALS, getRecipeById, INITIAL_INGREDIENTS };

export const INITIAL_PANTRY_ITEMS: PantryItem[] = [
  { id: 'p1', name: 'Baby Spinach (Organic)', category: 'Produce', quantity: '1 bag (200g)', daysUntilExpiry: 1 },
  { id: 'p2', name: 'Fresh Cilantro & Limes', category: 'Produce', quantity: '1 bunch + 3 limes', daysUntilExpiry: 2 },
  { id: 'p3', name: 'Ripe Hass Avocados', category: 'Produce', quantity: '2 avocados', daysUntilExpiry: 2 },
  { id: 'p4', name: 'Smoked Cheddar Cheese', category: 'Dairy & Eggs', quantity: '150g block', daysUntilExpiry: 3 },
  { id: 'p5', name: 'Greek Yogurt / Crema', category: 'Dairy & Eggs', quantity: '1 tub (300g)', daysUntilExpiry: 2 },
  { id: 'p6', name: 'Brioche Burger Buns', category: 'Bakery', quantity: '4 buns', daysUntilExpiry: 3 },
  { id: 'p7', name: 'Free-range Eggs', category: 'Dairy & Eggs', quantity: '6 eggs', daysUntilExpiry: 4 },
  { id: 'p8', name: 'Red Bell Peppers', category: 'Produce', quantity: '2 peppers', daysUntilExpiry: 4 },
  { id: 'p9', name: 'Ground Turkey / Lean Beef', category: 'Meat & Seafood', quantity: '500g', daysUntilExpiry: 2 },
  { id: 'p10', name: 'Flour Tortillas', category: 'Bakery', quantity: '8 pack', daysUntilExpiry: 5 },
  { id: 'p11', name: 'Black Beans & Corn', category: 'Pantry', quantity: '2 cans', daysUntilExpiry: 45 },
  { id: 'p12', name: 'Chipotle in Adobo', category: 'Sauces & Condiments', quantity: '1 small jar', daysUntilExpiry: 14 }
];

export function createLeftoverFromMeal(
  sourceMeal: Meal,
  sourceDay: DayOfWeek,
  sourceMealType: 'lunch' | 'dinner'
): Meal {
  return {
    ...sourceMeal,
    id: `leftover-${sourceMeal.id}-${Date.now()}`,
    title: `🔄 Leftover: ${sourceMeal.title.replace('for Two', '').replace('& Mixed Salad', '').trim()}`,
    prepTime: 3,
    cookTime: 0,
    isLeftover: true,
    sourceDay,
    sourceMealType,
    sourceMealTitle: sourceMeal.title,
    notes: `Zero effort! Reheat from ${sourceDay} ${sourceMealType}. ${sourceMeal.reheatInstructions || 'Microwave 2 minutes covered.'}`,
    tags: ['Leftovers', 'Zero Cooking', 'Quick Reheat']
  };
}

// Find user favorite recipes helper
const getFav = (id: string) => getRecipeById(id) || ALL_RECIPES[0];

const monDinnerDish = getFav('dish-spanish-lentils-chorizo');
const tueDinnerDish = getFav('dish-baked-lasagna');
const thuDinnerDish = getFav('dish-red-lentil-mango-curry');
const satDinnerDish = getFav('dish-kasspatzle-side-salad');

// Initial Weekly Plan showcasing the new Master Recipe Collection and low-effort batching
export const INITIAL_WEEKLY_PLAN: WeeklyPlan = {
  id: 'week-1',
  weekName: 'Week of Monday, Oct 12',
  startDate: '2026-10-12',
  days: {
    Monday: {
      day: 'Monday',
      dateLabel: 'Oct 12',
      lunch: { ...getFav('dish-vegetable-frittata'), mealType: 'lunch' }, // Vegetable Frittata
      dinner: { 
        ...monDinnerDish, // Spanish Lentils with Chorizo
        mealType: 'dinner',
        isBatchCook: true,
        batchServings: 4,
        notes: 'Simmer a hearty double batch of Spanish Lentils! Saves Tuesday lunch with zero cooking.'
      }
    },
    Tuesday: {
      day: 'Tuesday',
      dateLabel: 'Oct 13',
      lunch: createLeftoverFromMeal(monDinnerDish, 'Monday', 'dinner'),
      dinner: { 
        ...tueDinnerDish, // Baked Lasagna
        mealType: 'dinner',
        isBatchCook: true,
        batchServings: 4,
        notes: 'Bake a 4-serving Lasagna tonight! Wednesday lunch will be an effortless reheat.'
      }
    },
    Wednesday: {
      day: 'Wednesday',
      dateLabel: 'Oct 14',
      lunch: createLeftoverFromMeal(tueDinnerDish, 'Tuesday', 'dinner'),
      dinner: { ...getFav('dish-fajitas-with-guacamole'), mealType: 'dinner' } // Fajitas with Guacamole
    },
    Thursday: {
      day: 'Thursday',
      dateLabel: 'Oct 15',
      lunch: { ...getFav('dish-shakshuka'), mealType: 'lunch' }, // Shakshuka with warm bread
      dinner: { 
        ...thuDinnerDish, // Red Lentil Mango Curry
        mealType: 'dinner',
        isBatchCook: true,
        batchServings: 4,
        notes: 'Simmer fragrant mango curry for 4! Spices meld overnight for Friday lunch.'
      }
    },
    Friday: {
      day: 'Friday',
      dateLabel: 'Oct 16',
      lunch: createLeftoverFromMeal(thuDinnerDish, 'Thursday', 'dinner'),
      dinner: { ...getFav('dish-burgers-oven-potato-wedges'), mealType: 'dinner' } // Burgers with Oven Potato Wedges
    },
    Saturday: {
      day: 'Saturday',
      dateLabel: 'Oct 17',
      lunch: { ...getFav('dish-crunchy-cheese-veggie-wraps'), mealType: 'lunch' }, // Crunchy Cheese & Veggie Wraps
      dinner: { 
        ...satDinnerDish, // Kässpätzle with Side Salad
        mealType: 'dinner',
        isBatchCook: true,
        batchServings: 4,
        notes: 'Make a double batch of Alpine Kässpätzle! Leftovers warm up in skillet in 2 mins.'
      }
    },
    Sunday: {
      day: 'Sunday',
      dateLabel: 'Oct 18',
      lunch: createLeftoverFromMeal(satDinnerDish, 'Saturday', 'dinner'),
      dinner: { ...getFav('dish-oven-baked-salmon'), mealType: 'dinner' } // Oven-Baked Salmon, Potatoes & Greens
    }
  }
};

