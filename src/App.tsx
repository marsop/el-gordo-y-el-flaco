import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MarqueeBanner } from './components/MarqueeBanner';
import { WeekView } from './components/WeekView';
import { PantryDrawer } from './components/PantryDrawer';
import { GroceryModal } from './components/GroceryModal';
import { MealModal } from './components/MealModal';
import { ExportModal } from './components/ExportModal';
import { RecipeCatalogModal } from './components/RecipeCatalogModal';
import { AllMealsModal } from './components/AllMealsModal';
import { 
  INITIAL_PANTRY_ITEMS, 
  INITIAL_WEEKLY_PLAN, 
  RECIPE_CATALOG, 
  INITIAL_INGREDIENTS,
  createLeftoverFromMeal
} from './data/defaultData';
import { DayOfWeek, Meal, PantryItem, WeeklyPlan, DAYS_OF_WEEK, MasterIngredient } from './types';
import { getExpiringIngredientsForMeal } from './utils/pantryMatcher';
import { Check, Info, Sparkles, ChefHat } from 'lucide-react';

const PLAN_STORAGE_KEY = 'el_gordo_weekly_plan_v3';
const PANTRY_STORAGE_KEY = 'el_gordo_pantry_v3';
const RECIPES_STORAGE_KEY = 'el_gordo_recipes_v3';
const INGREDIENTS_STORAGE_KEY = 'el_gordo_ingredients_v4';

export default function App() {
  const [plan, setPlan] = useState<WeeklyPlan>(() => {
    try {
      const saved = localStorage.getItem(PLAN_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const monDinner = parsed?.days?.Monday?.dinner;
        if (monDinner?.id && !monDinner.id.startsWith('fav-') && !monDinner.id.startsWith('rec-')) {
          return parsed;
        }
      }
    } catch {}
    return INITIAL_WEEKLY_PLAN;
  });

  const [pantryItems, setPantryItems] = useState<PantryItem[]>(() => {
    try {
      const saved = localStorage.getItem(PANTRY_STORAGE_KEY) || localStorage.getItem('el_gordo_pantry');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_PANTRY_ITEMS;
  });

  const [availableIngredients, setAvailableIngredients] = useState<MasterIngredient[]>(() => {
    try {
      const saved = localStorage.getItem(INGREDIENTS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {}
    return INITIAL_INGREDIENTS;
  });

  const [recipes, setRecipes] = useState<Meal[]>(() => {
    try {
      const saved = localStorage.getItem(RECIPES_STORAGE_KEY);
      if (saved) {
        const parsed: Meal[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && !parsed.some((r) => r.id.startsWith('fav-') || r.id.startsWith('rec-'))) {
          return parsed;
        }
      }
    } catch {}
    return RECIPE_CATALOG;
  });

  useEffect(() => {
    try {
      localStorage.removeItem('el_gordo_weekly_plan');
      localStorage.removeItem('el_gordo_recipes');
      localStorage.removeItem('el_gordo_ingredients_v3');
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(plan)); } catch {}
  }, [plan]);

  useEffect(() => {
    try { localStorage.setItem(PANTRY_STORAGE_KEY, JSON.stringify(pantryItems)); } catch {}
  }, [pantryItems]);

  useEffect(() => {
    try { localStorage.setItem(RECIPES_STORAGE_KEY, JSON.stringify(recipes)); } catch {}
  }, [recipes]);

  useEffect(() => {
    try { localStorage.setItem(INGREDIENTS_STORAGE_KEY, JSON.stringify(availableIngredients)); } catch {}
  }, [availableIngredients]);

  // Active Menu Rotation preset
  const [activePreset, setActivePreset] = useState<'favorites' | 'batch_leftovers' | 'quick' | 'comfort' | null>(() => {
    try {
      const saved = localStorage.getItem('el_gordo_active_preset');
      if (saved && ['favorites', 'batch_leftovers', 'quick', 'comfort'].includes(saved)) {
        return saved as 'favorites' | 'batch_leftovers' | 'quick' | 'comfort';
      }
    } catch {}
    return 'favorites';
  });

  useEffect(() => {
    try {
      if (activePreset) {
        localStorage.setItem('el_gordo_active_preset', activePreset);
      } else {
        localStorage.removeItem('el_gordo_active_preset');
      }
    } catch {}
  }, [activePreset]);

  // Modal visibility states
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isPantryOpen, setIsPantryOpen] = useState(false);
  const [isGroceryOpen, setIsGroceryOpen] = useState(false);
  const [isAllMealsOpen, setIsAllMealsOpen] = useState(false);

  // Active Meal being edited
  const [editingTarget, setEditingTarget] = useState<{
    day: DayOfWeek;
    mealType: 'lunch' | 'dinner';
    meal: Meal;
  } | null>(null);

  // Active Meal being swapped
  const [swappingTarget, setSwappingTarget] = useState<{
    day: DayOfWeek;
    mealType: 'lunch' | 'dinner';
  } | null>(null);

  // Notification Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 1. Swap a single meal with selected recipe
  const handleSelectSwapRecipe = (recipe: Meal) => {
    if (!swappingTarget) return;
    const { day, mealType } = swappingTarget;

    setPlan((prev) => ({
      ...prev,
      days: {
        ...prev.days,
        [day]: {
          ...prev.days[day],
          [mealType]: { ...recipe, mealType, isLeftover: false }
        }
      }
    }));

    setSwappingTarget(null);
    showToast(`Updated ${day} ${mealType} to "${recipe.title}"!`);
  };

  // 2. Save edited meal
  const handleSaveMeal = (updatedMeal: Meal) => {
    if (!editingTarget) return;
    const { day, mealType } = editingTarget;

    setPlan((prev) => ({
      ...prev,
      days: {
        ...prev.days,
        [day]: {
          ...prev.days[day],
          [mealType]: updatedMeal
        }
      }
    }));

    setEditingTarget(null);
    showToast(`Saved recipe details for ${day} ${mealType}!`);
  };

  // 3. Toggle Batch Cooking on a meal
  const handleToggleBatch = (day: DayOfWeek, mealType: 'lunch' | 'dinner') => {
    const currentMeal = plan.days[day][mealType];
    const willBeBatch = !currentMeal.isBatchCook;

    const dayIndex = DAYS_OF_WEEK.indexOf(day);
    const nextDay = DAYS_OF_WEEK[(dayIndex + 1) % DAYS_OF_WEEK.length];

    setPlan((prev) => {
      const updatedDays = { ...prev.days };
      updatedDays[day] = {
        ...updatedDays[day],
        [mealType]: {
          ...currentMeal,
          isBatchCook: willBeBatch,
          batchServings: willBeBatch ? 4 : 2
        }
      };

      // If dinner is made into a double batch, automatically set tomorrow's lunch as leftovers!
      if (mealType === 'dinner' && willBeBatch && dayIndex < DAYS_OF_WEEK.length - 1) {
        updatedDays[nextDay] = {
          ...updatedDays[nextDay],
          lunch: createLeftoverFromMeal(currentMeal, day, 'dinner')
        };
      }

      return { ...prev, days: updatedDays };
    });

    if (willBeBatch && mealType === 'dinner' && dayIndex < DAYS_OF_WEEK.length - 1) {
      showToast(`Double batch set! ${nextDay} lunch is now zero-effort leftovers.`);
    } else {
      showToast(willBeBatch ? `Set ${day} ${mealType} as double batch (4 servings)!` : `Reverted to 2 servings.`);
    }
  };

  // 4. Set a lunch slot as leftover from the previous day's dinner
  const handleMakeLeftover = (day: DayOfWeek, mealType: 'lunch' | 'dinner') => {
    const dayIndex = DAYS_OF_WEEK.indexOf(day);
    if (dayIndex === 0) {
      showToast('Monday is the start of the week! Monday lunch is prepared fresh.');
      return;
    }

    const previousDay = DAYS_OF_WEEK[dayIndex - 1];
    const previousDinner = plan.days[previousDay].dinner;

    if (previousDinner.leftoverSuitability === 'cook_fresh_only') {
      showToast(`Warning: ${previousDinner.title} is best eaten fresh and does not preserve well.`);
    }

    const leftoverMeal = createLeftoverFromMeal(previousDinner, previousDay, 'dinner');

    setPlan((prev) => {
      const updatedDays = { ...prev.days };
      // Also ensure previous dinner is marked as double batch
      updatedDays[previousDay] = {
        ...updatedDays[previousDay],
        dinner: {
          ...previousDinner,
          isBatchCook: true,
          batchServings: 4
        }
      };
      updatedDays[day] = {
        ...updatedDays[day],
        lunch: leftoverMeal
      };
      return { ...prev, days: updatedDays };
    });

    showToast(`${day} lunch set as leftovers from ${previousDay} dinner!`);
  };

  // 5. Intelligent "Cook Once, Eat Twice" Batch Planner
  const handleAutoBatchLeftovers = () => {
    setActivePreset('batch_leftovers');
    // Select batch-friendly recipes
    const batchFriendly = recipes.filter((r) => r.leftoverSuitability === 'excellent' || r.leftoverSuitability === 'good');
    const freshOnly = recipes.filter((r) => r.leftoverSuitability === 'cook_fresh_only');

    const newDays = { ...plan.days };

    // Mon Dinner -> Tue Lunch
    const monDinner = batchFriendly.find((r) => r.id === 'dish-spanish-lentils-chorizo') || batchFriendly[0];
    newDays['Monday'].lunch = freshOnly.find((r) => r.id === 'dish-vegetable-frittata') || freshOnly[0] || recipes[1];
    newDays['Monday'].dinner = { ...monDinner, isBatchCook: true, batchServings: 4 };
    newDays['Tuesday'].lunch = createLeftoverFromMeal(monDinner, 'Monday', 'dinner');

    // Tue Dinner -> Wed Lunch
    const tueDinner = batchFriendly.find((r) => r.id === 'dish-baked-lasagna') || batchFriendly[1];
    newDays['Tuesday'].dinner = { ...tueDinner, isBatchCook: true, batchServings: 4 };
    newDays['Wednesday'].lunch = createLeftoverFromMeal(tueDinner, 'Tuesday', 'dinner');

    // Wed Dinner -> Fresh skillet (Fajitas with Guacamole)
    newDays['Wednesday'].dinner = recipes.find((r) => r.id === 'dish-fajitas-with-guacamole') || recipes[3];

    // Thu Lunch: Shakshuka
    newDays['Thursday'].lunch = recipes.find((r) => r.id === 'dish-shakshuka') || recipes[8];

    // Thu Dinner -> Fri Lunch (Red Lentil Mango Curry)
    const thuDinner = batchFriendly.find((r) => r.id === 'dish-red-lentil-mango-curry') || batchFriendly[2];
    newDays['Thursday'].dinner = { ...thuDinner, isBatchCook: true, batchServings: 4 };
    newDays['Friday'].lunch = createLeftoverFromMeal(thuDinner, 'Thursday', 'dinner');

    // Fri Dinner: Burgers with Oven Potato Wedges
    newDays['Friday'].dinner = recipes.find((r) => r.id === 'dish-burgers-oven-potato-wedges') || recipes[0];

    // Sat Lunch: Crunchy Cheese & Veggie Wraps
    newDays['Saturday'].lunch = recipes.find((r) => r.id === 'dish-crunchy-cheese-veggie-wraps') || recipes[11];

    // Sat Dinner -> Sun Lunch (Kässpätzle with Side Salad)
    const satDinner = batchFriendly.find((r) => r.id === 'dish-kasspatzle-side-salad') || batchFriendly[3];
    newDays['Saturday'].dinner = { ...satDinner, isBatchCook: true, batchServings: 4 };
    newDays['Sunday'].lunch = createLeftoverFromMeal(satDinner, 'Saturday', 'dinner');

    // Sun Dinner: Oven-Baked Salmon, Potatoes & Greens
    newDays['Sunday'].dinner = recipes.find((r) => r.id === 'dish-oven-baked-salmon') || recipes[12];

    setPlan((prev) => ({ ...prev, days: newDays }));
    showToast('Applied "Cook Once, Eat Twice" plan! 4 meals are zero-cooking reheats.');
  };

  // 6. Shuffle a single day's lunch & dinner
  const handleShuffleDay = (day: DayOfWeek) => {
    const lunches = recipes.filter((r) => r.mealType === 'lunch');
    const dinners = recipes.filter((r) => r.mealType === 'dinner');

    const randomLunch = lunches[Math.floor(Math.random() * lunches.length)] || recipes[0];
    const randomDinner = dinners[Math.floor(Math.random() * dinners.length)] || recipes[1];

    setPlan((prev) => ({
      ...prev,
      days: {
        ...prev.days,
        [day]: {
          ...prev.days[day],
          lunch: { ...randomLunch, mealType: 'lunch', isLeftover: false },
          dinner: { ...randomDinner, mealType: 'dinner' }
        }
      }
    }));

    showToast(`Shuffled lunch & dinner for ${day}!`);
  };

  // 7. Shuffle entire 7-day week
  const handleShuffleAll = () => {
    setActivePreset(null);
    const lunches = recipes.filter((r) => r.mealType === 'lunch');
    const dinners = recipes.filter((r) => r.mealType === 'dinner');

    const newDays = { ...plan.days };
    DAYS_OF_WEEK.forEach((day, index) => {
      const lunchPick = lunches[(index * 2) % lunches.length] || recipes[0];
      const dinnerPick = dinners[(index * 2 + 1) % dinners.length] || recipes[1];
      newDays[day] = {
        ...newDays[day],
        lunch: { ...lunchPick, mealType: 'lunch', isLeftover: false },
        dinner: { ...dinnerPick, mealType: 'dinner' }
      };
    });

    setPlan((prev) => ({ ...prev, days: newDays }));
    showToast('Weekly diner lineup refreshed across all 7 days!');
  };

  // 8. Prioritize soon-to-expire ingredients
  const handlePrioritizeExpiring = () => {
    const expiringRecipes = recipes.filter((r) => 
      getExpiringIngredientsForMeal(r, pantryItems).length > 0
    );

    if (expiringRecipes.length === 0) {
      showToast('No meals with expiring ingredients found.');
      return;
    }

    const newDays = { ...plan.days };
    const lunchExpiring = expiringRecipes.filter((r) => r.mealType === 'lunch');
    const dinnerExpiring = expiringRecipes.filter((r) => r.mealType === 'dinner');

    if (lunchExpiring[0]) {
      newDays['Monday'].lunch = { ...lunchExpiring[0], mealType: 'lunch', isLeftover: false };
    }
    if (dinnerExpiring[0]) {
      newDays['Monday'].dinner = { ...dinnerExpiring[0], mealType: 'dinner' };
    }
    if (lunchExpiring[1] || lunchExpiring[0]) {
      newDays['Tuesday'].lunch = { ...(lunchExpiring[1] || lunchExpiring[0]), mealType: 'lunch', isLeftover: false };
    }
    if (dinnerExpiring[1] || dinnerExpiring[0]) {
      newDays['Tuesday'].dinner = { ...(dinnerExpiring[1] || dinnerExpiring[0]), mealType: 'dinner' };
    }

    setPlan((prev) => ({ ...prev, days: newDays }));
    showToast('Expiring pantry ingredients prioritized for Monday & Tuesday!');
  };

  // 9. Apply curated presets
  const handleApplyPreset = (preset: 'favorites' | 'batch_leftovers' | 'balanced' | 'quick' | 'comfort') => {
    if (preset === 'favorites' || preset === 'batch_leftovers' || preset === 'quick' || preset === 'comfort') {
      setActivePreset(preset);
    } else {
      setActivePreset(null);
    }

    if (preset === 'favorites') {
      const getFav = (id: string) => recipes.find((r) => r.id === id) || recipes[0];
      const monDinner = getFav('dish-spanish-lentils-chorizo');
      const tueDinner = getFav('dish-baked-lasagna');
      const thuDinner = getFav('dish-red-lentil-mango-curry');
      const satDinner = getFav('dish-kasspatzle-side-salad');

      const favDays = {
        Monday: {
          day: 'Monday' as DayOfWeek,
          dateLabel: plan.days['Monday'].dateLabel,
          lunch: { ...getFav('dish-vegetable-frittata'), mealType: 'lunch' as const },
          dinner: { ...monDinner, mealType: 'dinner' as const, isBatchCook: true, batchServings: 4 }
        },
        Tuesday: {
          day: 'Tuesday' as DayOfWeek,
          dateLabel: plan.days['Tuesday'].dateLabel,
          lunch: createLeftoverFromMeal(monDinner, 'Monday', 'dinner'),
          dinner: { ...tueDinner, mealType: 'dinner' as const, isBatchCook: true, batchServings: 4 }
        },
        Wednesday: {
          day: 'Wednesday' as DayOfWeek,
          dateLabel: plan.days['Wednesday'].dateLabel,
          lunch: createLeftoverFromMeal(tueDinner, 'Tuesday', 'dinner'),
          dinner: { ...getFav('dish-fajitas-with-guacamole'), mealType: 'dinner' as const }
        },
        Thursday: {
          day: 'Thursday' as DayOfWeek,
          dateLabel: plan.days['Thursday'].dateLabel,
          lunch: { ...getFav('dish-shakshuka'), mealType: 'lunch' as const },
          dinner: { ...thuDinner, mealType: 'dinner' as const, isBatchCook: true, batchServings: 4 }
        },
        Friday: {
          day: 'Friday' as DayOfWeek,
          dateLabel: plan.days['Friday'].dateLabel,
          lunch: createLeftoverFromMeal(thuDinner, 'Thursday', 'dinner'),
          dinner: { ...getFav('dish-burgers-oven-potato-wedges'), mealType: 'dinner' as const }
        },
        Saturday: {
          day: 'Saturday' as DayOfWeek,
          dateLabel: plan.days['Saturday'].dateLabel,
          lunch: { ...getFav('dish-crunchy-cheese-veggie-wraps'), mealType: 'lunch' as const },
          dinner: { ...satDinner, mealType: 'dinner' as const, isBatchCook: true, batchServings: 4 }
        },
        Sunday: {
          day: 'Sunday' as DayOfWeek,
          dateLabel: plan.days['Sunday'].dateLabel,
          lunch: createLeftoverFromMeal(satDinner, 'Saturday', 'dinner'),
          dinner: { ...getFav('dish-oven-baked-salmon'), mealType: 'dinner' as const }
        }
      };

      setPlan((prev) => ({ ...prev, days: favDays }));
      showToast('Loaded your personalized favorites rotation with batch cooking!');
      return;
    }

    if (preset === 'batch_leftovers') {
      handleAutoBatchLeftovers();
      return;
    }

    let orderedIds: string[] = [];
    if (preset === 'quick') {
      orderedIds = [
        'dish-veggie-sandwich',
        'dish-tabouleh-salad',
        'dish-protein-tomato-pasta',
        'dish-one-pan-udon',
        'dish-cold-pasta-salad',
        'dish-crunchy-cheese-veggie-wraps',
        'dish-pesto-pasta-bowl'
      ];
      showToast('Applied "Quick 20m Diner" preset!');
    } else if (preset === 'comfort') {
      orderedIds = [
        'dish-baked-lasagna',
        'dish-burgers-oven-potato-wedges',
        'dish-kasspatzle-side-salad',
        'dish-spanish-lentils-chorizo',
        'dish-loaded-potatoes-cheese-egg',
        'dish-high-protein-veggie-pizza',
        'dish-alpine-barley-soup'
      ];
      showToast('Applied "80s Griddle & Comfort" preset!');
    } else {
      orderedIds = [
        'dish-fried-rice',
        'dish-fish-sticks-potatoes-veggies',
        'dish-caesar-salad',
        'dish-russian-potato-salad',
        'dish-savory-crepes',
        'dish-huevos-rotos',
        'dish-oven-baked-salmon'
      ];
      showToast('Applied "Balanced Diner Rotation" preset!');
    }

    const newDays = { ...plan.days };
    DAYS_OF_WEEK.forEach((day, idx) => {
      const recId1 = orderedIds[idx % orderedIds.length];
      const recId2 = orderedIds[(idx + 2) % orderedIds.length];
      const r1 = recipes.find((r) => r.id === recId1) || recipes[0];
      const r2 = recipes.find((r) => r.id === recId2) || recipes[1];

      newDays[day] = {
        ...newDays[day],
        lunch: { ...r1, mealType: 'lunch', isLeftover: false },
        dinner: { ...r2, mealType: 'dinner' }
      };
    });

    setPlan((prev) => ({ ...prev, days: newDays }));
  };

  // 10. Add & delete pantry items
  const handleAddPantryItem = (item: Omit<PantryItem, 'id'>) => {
    const newItem: PantryItem = {
      ...item,
      id: `p-${Date.now()}`
    };
    setPantryItems((prev) => [newItem, ...prev]);
    showToast(`Added "${newItem.name}" to expiry tracker!`);
  };

  const handleDeletePantryItem = (id: string) => {
    setPantryItems((prev) => prev.filter((p) => p.id !== id));
    showToast('Removed item from pantry.');
  };

  const handleUpdatePantryItem = (id: string, updates: Partial<PantryItem>) => {
    setPantryItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const handleAddMasterIngredient = (item: Omit<MasterIngredient, 'id'>) => {
    const newItem: MasterIngredient = {
      ...item,
      id: `ing-custom-${Date.now()}`
    };
    setAvailableIngredients((prev) => [newItem, ...prev]);
    showToast(`Added "${newItem.name}" to ingredients list!`);
  };

  const handleDeleteMasterIngredient = (id: string) => {
    setAvailableIngredients((prev) => prev.filter((i) => i.id !== id));
    showToast('Removed ingredient from master list.');
  };

  const urgentPantryCount = pantryItems.filter((i) => i.daysUntilExpiry <= 2).length;

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 text-zinc-900 font-['Plus_Jakarta_Sans']">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-zinc-950 text-amber-300 border-2 border-red-500 px-4 py-2.5 rounded-lg shadow-xl text-xs font-['Oswald'] uppercase tracking-wider flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 3-Zone Top Navigation Bar */}
      <Header
        onOpenExport={() => setIsExportOpen(true)}
        onOpenPantry={() => setIsPantryOpen(true)}
        onOpenGrocery={() => setIsGroceryOpen(true)}
        onOpenAllMeals={() => setIsAllMealsOpen(true)}
        expiringCount={urgentPantryCount}
      />

      {/* Main Drive-thru Diner Hero Marquee */}
      <main className="flex-1">
        <MarqueeBanner
          plan={plan}
          pantryItems={pantryItems}
          activePreset={activePreset}
          onShuffleAll={handleShuffleAll}
          onPrioritizeExpiring={handlePrioritizeExpiring}
          onApplyPreset={handleApplyPreset}
          onAutoBatchLeftovers={handleAutoBatchLeftovers}
        />

        {/* Monday to Sunday Schedule View */}
        <WeekView
          plan={plan}
          pantryItems={pantryItems}
          onSwapMeal={(day, type) => setSwappingTarget({ day, mealType: type })}
          onEditMeal={(day, type) =>
            setEditingTarget({
              day,
              mealType: type,
              meal: plan.days[day][type]
            })
          }
          onShuffleDay={handleShuffleDay}
          onToggleBatch={handleToggleBatch}
          onMakeLeftover={handleMakeLeftover}
        />
      </main>

      {/* 80s Diner Footer */}
      <footer className="mt-auto bg-zinc-950 text-zinc-400 border-t-2 border-red-600 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-zinc-300">
            <span className="w-2 h-2 bg-red-600 rounded-full"></span>
            <span className="font-['Oswald'] text-sm uppercase tracking-wider font-bold text-white">
              EL GORDO <span className="text-amber-400">&</span> EL FLACO
            </span>
            <span>— 80s Fast Food Kitchen Dispatch · Cook Once, Eat Twice</span>
          </div>

          <div className="text-zinc-400">
            <span>Made with ♥️ by </span>
            <a
              href="https://albertogregorio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors font-medium"
            >
              Alberto Gregorio
            </a>
          </div>
        </div>
      </footer>

      {/* Modals & Slide-overs */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        plan={plan}
        pantryItems={pantryItems}
      />

      <PantryDrawer
        isOpen={isPantryOpen}
        onClose={() => setIsPantryOpen(false)}
        pantryItems={pantryItems}
        availableIngredients={availableIngredients}
        onAddPantryItem={handleAddPantryItem}
        onDeletePantryItem={handleDeletePantryItem}
        onUpdatePantryItem={handleUpdatePantryItem}
        onPrioritizeExpiring={handlePrioritizeExpiring}
        onAddMasterIngredient={handleAddMasterIngredient}
        onDeleteMasterIngredient={handleDeleteMasterIngredient}
        plan={plan}
      />

      <GroceryModal
        isOpen={isGroceryOpen}
        onClose={() => setIsGroceryOpen(false)}
        plan={plan}
        pantryItems={pantryItems}
      />

      {editingTarget && (
        <MealModal
          isOpen={!!editingTarget}
          onClose={() => setEditingTarget(null)}
          meal={editingTarget.meal}
          dayName={editingTarget.day}
          onSave={handleSaveMeal}
        />
      )}

      {swappingTarget && (
        <RecipeCatalogModal
          isOpen={!!swappingTarget}
          onClose={() => setSwappingTarget(null)}
          recipes={recipes}
          day={swappingTarget.day}
          mealType={swappingTarget.mealType}
          pantryItems={pantryItems}
          onSelectRecipe={handleSelectSwapRecipe}
        />
      )}

      <AllMealsModal
        isOpen={isAllMealsOpen}
        onClose={() => setIsAllMealsOpen(false)}
        recipes={recipes}
        plan={plan}
        onScheduleMeal={(meal, day, mealType) => {
          setPlan((prev) => ({
            ...prev,
            days: {
              ...prev.days,
              [day]: {
                ...prev.days[day],
                [mealType]: { ...meal, mealType, isLeftover: false }
              }
            }
          }));
          setIsAllMealsOpen(false);
          showToast(`Scheduled "${meal.title}" into ${day} ${mealType}!`);
        }}
        onEditMeal={(meal) => {
          setIsAllMealsOpen(false);
          setEditingTarget({
            day: 'Monday',
            mealType: meal.mealType,
            meal
          });
        }}
      />
    </div>
  );
}
