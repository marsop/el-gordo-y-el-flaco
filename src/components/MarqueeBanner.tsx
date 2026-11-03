import React, { useState } from 'react';
import { Shuffle, Sparkles, AlertTriangle, Users, Utensils, RotateCcw, Layers, Coffee, Star, Clock, Flame } from 'lucide-react';
import { WeeklyPlan, PantryItem } from '../types';

interface MarqueeBannerProps {
  plan: WeeklyPlan;
  pantryItems: PantryItem[];
  totalRecipesCount: number;
  activePreset?: 'favorites' | 'batch_leftovers' | 'quick' | 'comfort' | null;
  onShuffleAll: () => void;
  onPrioritizeExpiring: () => void;
  onApplyPreset: (preset: 'favorites' | 'batch_leftovers' | 'balanced' | 'quick' | 'comfort') => void;
  onAutoBatchLeftovers: () => void;
  onOpenAllMeals: () => void;
}

export const MarqueeBanner: React.FC<MarqueeBannerProps> = ({
  plan,
  pantryItems,
  totalRecipesCount,
  activePreset,
  onShuffleAll,
  onPrioritizeExpiring,
  onApplyPreset,
  onAutoBatchLeftovers,
  onOpenAllMeals
}) => {
  const [internalPreset, setInternalPreset] = useState<'favorites' | 'batch_leftovers' | 'quick' | 'comfort' | null>('favorites');
  const currentPreset = activePreset !== undefined ? activePreset : internalPreset;

  const handleSelectPreset = (presetId: 'favorites' | 'batch_leftovers' | 'quick' | 'comfort') => {
    setInternalPreset(presetId);
    onApplyPreset(presetId);
  };

  const PRESET_OPTIONS = [
    {
      id: 'favorites' as const,
      label: 'Favorites',
      title: 'Plan curated from your favorite meals',
      Icon: Star,
      isFilled: true
    },
    {
      id: 'batch_leftovers' as const,
      label: 'Leftovers',
      title: 'Cook Once, Eat Twice (Max Leftovers)',
      Icon: RotateCcw,
      isFilled: false
    },
    {
      id: 'quick' as const,
      label: 'Quick 20m',
      title: 'Under 25 Mins',
      Icon: Clock,
      isFilled: false
    },
    {
      id: 'comfort' as const,
      label: 'Comfort',
      title: 'Griddle & Comfort',
      Icon: Flame,
      isFilled: true
    }
  ];
  // Calculate stats
  const criticalItems = pantryItems.filter((i) => i.daysUntilExpiry <= 2);
  let totalPrepTime = 0;
  let totalMeals = 0;
  let leftoverMealsCount = 0;
  let batchMealsCount = 0;

  Object.values(plan.days).forEach((d) => {
    totalPrepTime += d.lunch.prepTime + d.lunch.cookTime;
    totalPrepTime += d.dinner.prepTime + d.dinner.cookTime;
    totalMeals += 2;
    if (d.lunch.isLeftover) leftoverMealsCount++;
    if (d.dinner.isLeftover) leftoverMealsCount++;
    if (d.lunch.isBatchCook) batchMealsCount++;
    if (d.dinner.isBatchCook) batchMealsCount++;
  });

  const activeCookSessions = totalMeals - leftoverMealsCount;
  const avgMinutesPerMeal = Math.round(totalPrepTime / totalMeals);

  return (
    <section className="relative overflow-hidden bg-zinc-900 border-b-4 border-amber-400 text-amber-50">
      {/* 80s Checkerboard Top Strip */}
      <div className="h-2.5 w-full bg-checker-pattern opacity-80 border-b border-zinc-700"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Brand & Concept Hero */}
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 font-['Oswald']">
              <span>Drive-Thru Special</span>
              <span aria-hidden="true">·</span>
              <span>2 Meals / Day for 2 People</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight font-['Oswald'] text-white drop-shadow-sm">
              EL GORDO <span className="text-amber-400">&</span> EL FLACO
            </h1>

            {/* Profile Tagline & Low-Cooking Metrics */}
            <div className="pt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400 font-mono">
              <span className="text-amber-400 font-bold">● El Gordo: Hearty + Extra Protein</span>
              <span aria-hidden="true">·</span>
              <span className="text-teal-400 font-bold">▲ El Flaco: Balanced + Crisp Greens</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400 font-bold">
                ✓ {leftoverMealsCount} Leftover Meals (Only {activeCookSessions} Cook Sessions!)
              </span>
            </div>
          </div>

          {/* 80s Quick Action Menu Board */}
          <div className="bg-zinc-950 p-4 sm:p-5 rounded-lg border-2 border-red-600/80 shadow-xl space-y-4 lg:w-96 shrink-0">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <span className="text-xs uppercase tracking-wider font-bold font-['Oswald'] text-amber-400 flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-red-500" />
                Diner Controls & Presets
              </span>
              <span className="text-xs font-mono text-zinc-400">Avg {avgMinutesPerMeal}m / meal</span>
            </div>

            {/* Quick Presets Segmented Bar */}
            <div className="space-y-1.5">
              <span className="text-xs text-zinc-400 block font-['Plus_Jakarta_Sans']">Select Menu Rotation:</span>
              <div className="grid grid-cols-4 gap-1 p-1 bg-zinc-900 rounded border border-zinc-800" role="tablist">
                {PRESET_OPTIONS.map((opt) => {
                  const isSelected = currentPreset === opt.id;
                  const Icon = opt.Icon;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectPreset(opt.id)}
                      role="tab"
                      aria-selected={isSelected}
                      className={`flex items-center justify-center gap-1 px-1 sm:px-1.5 py-1.5 text-[10.5px] sm:text-[11px] rounded transition-colors cursor-pointer truncate ${
                        isSelected
                          ? 'bg-amber-400 text-zinc-950 font-black shadow-xs border border-amber-300'
                          : 'text-zinc-300 hover:text-white hover:bg-zinc-800/80 font-medium border border-transparent'
                      }`}
                      title={opt.title}
                    >
                      <Icon className={`w-3 h-3 shrink-0 ${opt.isFilled ? 'fill-current' : ''}`} />
                      <span className="truncate">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Functional Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={onAutoBatchLeftovers}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold uppercase tracking-wider bg-teal-600 hover:bg-teal-500 text-white rounded transition-colors font-['Oswald'] cursor-pointer shadow"
              >
                <RotateCcw className="w-3.5 h-3.5 text-teal-200" />
                <span>Cook Once, Eat Twice (Batch Plan)</span>
              </button>

              <button
                onClick={onPrioritizeExpiring}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-zinc-950 rounded transition-colors font-['Oswald'] cursor-pointer shadow"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-red-950" />
                <span>Prioritize Expiring Pantry ({criticalItems.length} Urgent)</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={onOpenAllMeals}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wider bg-zinc-900 hover:bg-zinc-800 text-amber-300 border border-amber-400/60 rounded transition-colors font-['Oswald'] cursor-pointer"
                >
                  <Utensils className="w-3.5 h-3.5 text-amber-400" />
                  <span>See All Meals ({totalRecipesCount})</span>
                </button>

                <button
                  onClick={onShuffleAll}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 rounded transition-colors font-['Oswald'] cursor-pointer"
                >
                  <Shuffle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Shuffle Week</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 80s Checkerboard Bottom Strip */}
      <div className="h-2 w-full bg-checker-pattern opacity-80 border-t border-zinc-700"></div>
    </section>
  );
};
