import { DayOfWeek, DAYS_OF_WEEK, Meal, PantryItem, WeeklyPlan } from '../types';
import {
  ALL_RECIPES,
  RECIPE_CATALOG,
  USER_FAVORITE_RECIPES,
  DINER_ORIGINALS,
  getRecipeById
} from './recipes';

export { ALL_RECIPES, RECIPE_CATALOG, USER_FAVORITE_RECIPES, DINER_ORIGINALS, getRecipeById };

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
    tags: ['Leftovers', 'Zero Cooking', 'Quick 3m Reheat']
  };
}

// Find user favorite recipes helper
const getFav = (id: string) => getRecipeById(id) || ALL_RECIPES[0];

const monDinnerDish = getFav('fav-chili-sin-carne');
const tueDinnerDish = getFav('fav-lasagne');
const thuDinnerDish = getFav('fav-curry-garam-masala');
const satDinnerDish = getFav('fav-kasspatzle');

// Initial Weekly Plan showcasing user favorite meals and low-effort batching
export const INITIAL_WEEKLY_PLAN: WeeklyPlan = {
  id: 'week-1',
  weekName: 'Week of Monday, Oct 12',
  startDate: '2026-10-12',
  days: {
    Monday: {
      day: 'Monday',
      dateLabel: 'Oct 12',
      lunch: { ...getFav('fav-tortilla-patatas') }, // Tortilla de Patatas
      dinner: { 
        ...monDinnerDish, // Chili sin carne
        isBatchCook: true,
        batchServings: 4,
        notes: 'Double batch of chili tonight (4 servings total)! Saves Tuesday lunch with zero cooking.'
      }
    },
    Tuesday: {
      day: 'Tuesday',
      dateLabel: 'Oct 13',
      lunch: createLeftoverFromMeal(monDinnerDish, 'Monday', 'dinner'),
      dinner: { 
        ...tueDinnerDish, // Classic Lasagne al Forno
        isBatchCook: true,
        batchServings: 4,
        notes: 'Bake a 4-serving Lasagne tonight! Wednesday lunch will be an effortless reheat.'
      }
    },
    Wednesday: {
      day: 'Wednesday',
      dateLabel: 'Oct 14',
      lunch: createLeftoverFromMeal(tueDinnerDish, 'Tuesday', 'dinner'),
      dinner: { ...getFav('fav-fajitas-chicken') } // Sizzling Fajitas (Chicken / Quinoa / Guacamole)
    },
    Thursday: {
      day: 'Thursday',
      dateLabel: 'Oct 15',
      lunch: { ...getFav('fav-shakshuka') }, // Shakshuka with warm bread
      dinner: { 
        ...thuDinnerDish, // Garam Masala Curry
        isBatchCook: true,
        batchServings: 4,
        notes: 'Simmer fragrant curry for 4! Spices meld overnight for Friday lunch.'
      }
    },
    Friday: {
      day: 'Friday',
      dateLabel: 'Oct 16',
      lunch: createLeftoverFromMeal(thuDinnerDish, 'Thursday', 'dinner'),
      dinner: { ...getFav('fav-burgers-veggies-oven') } // Burgers + Veggies in the Oven
    },
    Saturday: {
      day: 'Saturday',
      dateLabel: 'Oct 17',
      lunch: { ...getFav('fav-wraps-chicken') }, // Wraps with chicken & fresh veggies
      dinner: { 
        ...satDinnerDish, // Kässpätzle with caramelized onions
        isBatchCook: true,
        batchServings: 4,
        notes: 'Make double batch of Alpine Kässpätzle! Leftovers warm up in skillet in 2 mins.'
      }
    },
    Sunday: {
      day: 'Sunday',
      dateLabel: 'Oct 18',
      lunch: createLeftoverFromMeal(satDinnerDish, 'Saturday', 'dinner'),
      dinner: { ...getFav('fav-salmon-oven') } // Salmon in the oven with roasted potatoes
    }
  }
};

