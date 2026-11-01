import type { Meal } from '../../types';

// Eagerly import all individual JSON recipe files via Vite glob import
const recipeModules = import.meta.glob<Meal>('./*.json', { eager: true, import: 'default' });

// Consolidated unique recipe catalog
export const ALL_RECIPES: Meal[] = Object.values(recipeModules);

// Lookup helper
export const getRecipeById = (id: string): Meal | undefined =>
  ALL_RECIPES.find((r) => r.id === id);

// Convenience category collections (derived from the unique recipe catalog)
export const USER_FAVORITE_RECIPES: Meal[] = ALL_RECIPES.filter((r) => r.id.startsWith('fav-'));
export const DINER_ORIGINALS: Meal[] = ALL_RECIPES.filter((r) => r.id.startsWith('rec-'));
export const RECIPE_CATALOG: Meal[] = ALL_RECIPES;

export default ALL_RECIPES;
