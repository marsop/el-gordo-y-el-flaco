import React, { useState } from 'react';
import { X, Clock, Flame, Check, AlertCircle, Search } from 'lucide-react';
import { Meal, DayOfWeek, PantryItem } from '../types';
import { getExpiringIngredientsForMeal } from '../utils/pantryMatcher';

interface RecipeCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipes: Meal[];
  day: DayOfWeek;
  mealType: 'lunch' | 'dinner';
  pantryItems?: PantryItem[];
  onSelectRecipe: (recipe: Meal) => void;
}

export const RecipeCatalogModal: React.FC<RecipeCatalogModalProps> = ({
  isOpen,
  onClose,
  recipes,
  day,
  mealType,
  pantryItems,
  onSelectRecipe
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'lunch' | 'dinner' | 'favorites'>('all');

  if (!isOpen) return null;

  const filtered = recipes.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
      r.ingredients.some((i) => i.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = 
      filterType === 'all' 
        ? true 
        : filterType === 'favorites' 
        ? r.tags.includes('User Favorite') 
        : r.mealType === filterType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl border-4 border-zinc-900 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-zinc-950 text-amber-50 flex items-center justify-between border-b-2 border-red-600">
          <div>
            <h3 className="text-xl font-black uppercase tracking-wider font-['Oswald'] text-white">
              Diner Recipe Catalog · Choose for {day} {mealType.toUpperCase()}
            </h3>
            <p className="text-xs text-zinc-400">
              Select a meal for 2 people (El Gordo & El Flaco) to swap into this slot.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filters */}
        <div className="p-4 bg-zinc-100 border-b border-zinc-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search favorites (e.g. Tortilla, Kässpätzle, Lasagne, Curry, Chili)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-zinc-300 rounded text-xs focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1 bg-zinc-200/80 p-1 rounded">
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 text-xs font-bold font-['Oswald'] uppercase rounded transition-colors cursor-pointer ${
                filterType === 'all' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              All ({recipes.length})
            </button>
            <button
              onClick={() => setFilterType('favorites')}
              className={`px-2.5 py-1 text-xs font-bold font-['Oswald'] uppercase rounded transition-colors cursor-pointer ${
                filterType === 'favorites' ? 'bg-amber-400 text-zinc-950 font-black shadow-xs' : 'text-zinc-700 hover:text-zinc-900'
              }`}
            >
              ★ Favorites
            </button>
            <button
              onClick={() => setFilterType('lunch')}
              className={`px-2.5 py-1 text-xs font-bold font-['Oswald'] uppercase rounded transition-colors cursor-pointer ${
                filterType === 'lunch' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Lunches
            </button>
            <button
              onClick={() => setFilterType('dinner')}
              className={`px-2.5 py-1 text-xs font-bold font-['Oswald'] uppercase rounded transition-colors cursor-pointer ${
                filterType === 'dinner' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Dinners
            </button>
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="p-6 max-h-[65vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((recipe) => {
            const expiringCount = pantryItems
              ? getExpiringIngredientsForMeal(recipe, pantryItems).length
              : recipe.ingredients.filter((i) => i.isExpiring).length;
            const totalTime = recipe.prepTime + recipe.cookTime;

            return (
              <div
                key={recipe.id}
                className="border-2 border-zinc-200 hover:border-red-500 rounded-lg p-4 flex flex-col justify-between space-y-3 bg-white hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-1">
                    <span className="font-['Oswald'] uppercase font-bold text-red-700">
                      {recipe.mealType}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-0.5">
                        <Clock className="w-3 h-3" />
                        <span>{totalTime}m</span>
                      </span>
                      {recipe.calorieEstimate && (
                        <span>~{recipe.calorieEstimate} kcal</span>
                      )}
                    </div>
                  </div>

                  <h4 className="font-bold text-zinc-900 text-sm group-hover:text-red-600 transition-colors">
                    {recipe.title}
                  </h4>

                  <div className="mt-1 flex flex-wrap gap-1 text-[11px] text-zinc-500">
                    {recipe.tags.slice(0, 3).map((tag) => (
                      <span key={tag}>#{tag}</span>
                    ))}
                  </div>

                  {recipe.leftoverSuitability && (
                    <div className="mt-1.5 text-[11px] font-mono">
                      {recipe.leftoverSuitability === 'excellent' && (
                        <span className="text-teal-700 font-bold">★ Great for leftovers (keeps 3-4 days)</span>
                      )}
                      {recipe.leftoverSuitability === 'good' && (
                        <span className="text-zinc-600">✓ Good keeping quality (keeps 2 days)</span>
                      )}
                      {recipe.leftoverSuitability === 'cook_fresh_only' && (
                        <span className="text-amber-700">⚠️ Best cooked fresh (does not keep well)</span>
                      )}
                    </div>
                  )}

                  {expiringCount > 0 && (
                    <div className="mt-2 text-[11px] text-amber-700 bg-amber-50 p-1.5 rounded flex items-center gap-1 border border-amber-200">
                      <AlertCircle className="w-3 h-3 text-amber-600 shrink-0" />
                      <span>Saves {expiringCount} expiring ingredient(s)</span>
                    </div>
                  )}

                  <div className="mt-2 text-[11px] text-zinc-600 line-clamp-2">
                    {recipe.notes}
                  </div>
                </div>

                <button
                  onClick={() => onSelectRecipe(recipe)}
                  className="w-full py-2 bg-zinc-900 hover:bg-red-600 text-white rounded font-['Oswald'] font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Choose This Meal</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
