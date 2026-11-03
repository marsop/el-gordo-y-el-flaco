import React, { useState } from 'react';
import { 
  Clock, 
  Flame, 
  Shuffle, 
  Edit3, 
  ChevronDown, 
  ChevronUp, 
  AlertCircle, 
  RotateCcw,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { Meal, PantryItem } from '../types';
import { getExpiringIngredientsForMeal, isIngredientExpiring } from '../utils/pantryMatcher';

interface MealCardProps {
  meal: Meal;
  dayName: string;
  pantryItems: PantryItem[];
  onSwap: () => void;
  onEdit: () => void;
  onToggleBatch?: () => void;
  onMakeLeftover?: () => void;
}

export const MealCard: React.FC<MealCardProps> = ({
  meal,
  dayName,
  pantryItems,
  onSwap,
  onEdit,
  onToggleBatch,
  onMakeLeftover
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Dynamically recalculate which pantry items this meal uses that are expiring soon based on current pantry list
  const expiringIngredients = getExpiringIngredientsForMeal(meal, pantryItems);
  const totalTime = meal.prepTime + meal.cookTime;
  const isLunch = meal.mealType === 'lunch';
  const isLeftover = !!meal.isLeftover;
  const isBatch = !!meal.isBatchCook;

  return (
    <article 
      className={`relative flex flex-col justify-between rounded-lg border-2 transition-all duration-200 bg-white ${
        isLeftover
          ? 'border-teal-500 shadow-sm bg-teal-50/20'
          : isBatch
          ? 'border-amber-500 shadow-sm'
          : isLunch 
          ? 'border-amber-400 hover:border-amber-500 shadow-sm' 
          : 'border-red-600 hover:border-red-700 shadow-sm'
      }`}
    >
      {/* Top Header Strip */}
      <div 
        className={`px-3.5 py-2 flex items-center justify-between border-b text-xs font-['Oswald'] uppercase tracking-wider ${
          isLeftover
            ? 'bg-teal-100 border-teal-300 text-teal-950 font-bold'
            : isBatch
            ? 'bg-amber-100/90 border-amber-300 text-amber-950'
            : isLunch 
            ? 'bg-amber-100/70 border-amber-300 text-amber-900' 
            : 'bg-red-50 border-red-200 text-red-900'
        }`}
      >
        <div className="flex items-center gap-1.5 font-bold">
          {isLeftover ? (
            <span className="flex items-center gap-1 text-teal-800">
              <RotateCcw className="w-3.5 h-3.5 text-teal-600" />
              <span>Leftover Reheat (2 Diners)</span>
            </span>
          ) : isBatch ? (
            <span className="flex items-center gap-1 text-amber-900">
              <Layers className="w-3.5 h-3.5 text-amber-700" />
              <span>Double Batch (4 Servings)</span>
            </span>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-current"></span>
              <span>{isLunch ? 'Lunch (2 Servings)' : 'Dinner (2 Servings)'}</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{isLeftover ? `${meal.prepTime}m reheat` : `${totalTime}m`}</span>
          </span>
          {meal.calorieEstimate && (
            <>
              <span aria-hidden="true" className="opacity-40">·</span>
              <span className="flex items-center gap-0.5">
                <Flame className="w-3 h-3 text-amber-600" />
                <span>{meal.calorieEstimate} kcal</span>
              </span>
            </>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Leftover Notice Banner */}
          {isLeftover && (
            <div className="mb-2.5 p-2 rounded bg-teal-50 border border-teal-200 text-teal-900 text-xs flex items-start gap-1.5">
              <RotateCcw className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
              <div className="leading-tight">
                <span className="font-bold">Zero cooking effort! </span>
                <span>
                  Portion saved from {meal.sourceDay || 'previous'} {meal.sourceMealType || 'dinner'}. 
                  {meal.reheatInstructions ? ` ${meal.reheatInstructions}` : ' Microwave 2 mins or warm in pan.'}
                </span>
              </div>
            </div>
          )}

          {/* Batch Cook Notice Banner */}
          {isBatch && !isLeftover && (
            <div className="mb-2.5 p-2 rounded bg-amber-50 border border-amber-300 text-amber-950 text-xs flex items-start gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
              <div className="leading-tight">
                <span className="font-bold">Cook once, eat twice: </span>
                <span>Cook 4 portions tonight so tomorrow's lunch is ready with no extra effort!</span>
              </div>
            </div>
          )}

          {/* Dish Title */}
          <h4 className="text-base font-bold text-zinc-900 leading-snug font-['Plus_Jakarta_Sans'] group-hover:text-red-700">
            {meal.title}
          </h4>

          {/* Tags and Leftover Suitability Indicator */}
          <div className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-zinc-500">
            {meal.tags.map((tag, idx) => (
              <React.Fragment key={tag}>
                <span>{tag}</span>
                {idx < meal.tags.length - 1 && <span aria-hidden="true">·</span>}
              </React.Fragment>
            ))}

            {/* Leftover Suitability metadata */}
            {meal.leftoverSuitability && !isLeftover && (
              <>
                <span aria-hidden="true">·</span>
                <span className={
                  meal.leftoverSuitability === 'excellent' 
                    ? 'text-teal-700 font-semibold' 
                    : meal.leftoverSuitability === 'good' 
                    ? 'text-zinc-600' 
                    : 'text-amber-700'
                }>
                  {meal.leftoverSuitability === 'excellent' 
                    ? 'Keeps 3-4 days' 
                    : meal.leftoverSuitability === 'good' 
                    ? 'Keeps 2 days' 
                    : 'Best eaten fresh'}
                </span>
              </>
            )}
          </div>

          {/* Expiring Ingredients Alert Banner (if any) */}
          {expiringIngredients.length > 0 && !isLeftover && (
            <div className="mt-2.5 p-2 rounded bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <div className="leading-tight">
                <span className="font-semibold">Uses expiring stock: </span>
                <span>{expiringIngredients.map((i) => i.name).join(', ')}</span>
              </div>
            </div>
          )}
        </div>

        {/* Expandable Ingredients & Notes */}
        {isExpanded && (
          <div className="pt-2 border-t border-zinc-200 space-y-2 text-xs">
            <div>
              <span className="font-bold text-zinc-800 uppercase tracking-wider font-['Oswald'] block mb-1">
                {isBatch ? 'Ingredients (Double Batch - 4 Servings):' : 'Ingredients (Portioned for 2):'}
              </span>
              <ul className="space-y-1 text-zinc-600">
                {meal.ingredients.map((ing) => {
                  const isExpiring = isIngredientExpiring(ing, meal, pantryItems);
                  return (
                    <li key={ing.id} className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${isExpiring ? 'bg-amber-500' : 'bg-zinc-400'}`}></span>
                        <span className={isExpiring ? 'font-semibold text-amber-950' : ''}>{ing.name}</span>
                        {isExpiring && (
                          <span className="text-[10px] font-semibold text-amber-800 bg-amber-100 border border-amber-300 px-1.5 py-0.2 rounded font-mono">
                            Expiring stock
                          </span>
                        )}
                      </span>
                      <span className="font-mono text-zinc-500">
                        {isBatch ? `${ing.amount} (×2)` : ing.amount}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {meal.notes && (
              <div className="pt-2 border-t border-zinc-100 text-zinc-600 italic">
                <span className="font-bold not-italic text-zinc-700">Diner Prep Tip: </span>
                {meal.notes}
              </div>
            )}

            {meal.reheatInstructions && (
              <div className="pt-1 text-teal-800">
                <span className="font-bold text-teal-900">Reheat Guide: </span>
                {meal.reheatInstructions}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Card Action Footer */}
      <div className="px-3 py-2 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between text-xs font-['Oswald']">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-zinc-600 hover:text-zinc-900 transition-colors uppercase tracking-wide cursor-pointer"
        >
          {isExpanded ? (
            <>
              <span>Hide Details</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              <span>{isLeftover ? 'Reheat Tip' : `Ingredients (${meal.ingredients.length})`}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </>
          )}
        </button>

        <div className="flex items-center gap-1">
          {onToggleBatch && !isLeftover && (
            <button
              onClick={onToggleBatch}
              title={isBatch ? "Change back to standard 2 servings" : "Batch cook double portion for leftovers"}
              className={`flex items-center gap-1 px-2 py-1 rounded transition-colors uppercase cursor-pointer ${
                isBatch 
                  ? 'bg-amber-200 text-amber-900 font-bold' 
                  : 'text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              <Layers className="w-3 h-3 text-amber-700" />
              <span>{isBatch ? 'Batch: 4x' : 'Batch 2x'}</span>
            </button>
          )}

          {onMakeLeftover && isLunch && !isLeftover && (
            <button
              onClick={onMakeLeftover}
              title="Set this lunch as leftovers from yesterday's dinner"
              className="flex items-center gap-1 px-2 py-1 text-teal-700 hover:bg-teal-100 rounded transition-colors uppercase cursor-pointer"
            >
              <RotateCcw className="w-3 h-3 text-teal-600" />
              <span>Leftover</span>
            </button>
          )}

          <button
            onClick={onSwap}
            title="Swap dish with another recipe from diner catalog"
            className="flex items-center gap-1 px-2 py-1 text-zinc-700 hover:bg-zinc-200 rounded transition-colors uppercase cursor-pointer"
          >
            <Shuffle className="w-3 h-3 text-amber-600" />
            <span>Swap</span>
          </button>

          <button
            onClick={onEdit}
            title="Edit recipe title, cook times or ingredients"
            className="flex items-center gap-1 px-2 py-1 text-zinc-700 hover:bg-zinc-200 rounded transition-colors uppercase cursor-pointer"
          >
            <Edit3 className="w-3 h-3 text-red-600" />
            <span>Edit</span>
          </button>
        </div>
      </div>
    </article>
  );
};
