import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Clock, 
  Flame, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  Check, 
  Utensils, 
  RotateCcw,
  Sparkles,
  Layers,
  ChefHat
} from 'lucide-react';
import { Meal, WeeklyPlan, DayOfWeek, DAYS_OF_WEEK } from '../types';

interface AllMealsModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipes: Meal[];
  plan: WeeklyPlan;
  onScheduleMeal: (meal: Meal, day: DayOfWeek, mealType: 'lunch' | 'dinner') => void;
  onEditMeal: (meal: Meal) => void;
}

export const AllMealsModal: React.FC<AllMealsModalProps> = ({
  isOpen,
  onClose,
  recipes,
  plan,
  onScheduleMeal,
  onEditMeal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<
    'all' | 'cat1' | 'cat2' | 'cat3' | 'cat4' | 'quick' | 'leftovers' | 'summer' | 'winter'
  >('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Scheduling popover state for a specific card
  const [schedulingMealId, setSchedulingMealId] = useState<string | null>(null);
  const [targetDay, setTargetDay] = useState<DayOfWeek>('Monday');
  const [targetMealType, setTargetMealType] = useState<'lunch' | 'dinner'>('dinner');

  if (!isOpen) return null;

  // Build a map of which meals are currently scheduled in this week's plan
  const scheduledMap = new Map<string, { day: DayOfWeek; mealType: 'lunch' | 'dinner' }>();
  DAYS_OF_WEEK.forEach((day) => {
    const dp = plan.days[day];
    if (dp) {
      scheduledMap.set(dp.lunch.id, { day, mealType: 'lunch' });
      scheduledMap.set(dp.dinner.id, { day, mealType: 'dinner' });
    }
  });

  const cat1Count = recipes.filter((r) => r.category === 'High Protein & High Fiber').length;
  const cat2Count = recipes.filter((r) => r.category === 'Great Base').length;
  const cat3Count = recipes.filter((r) => r.category === 'Moderately Balanced').length;
  const cat4Count = recipes.filter((r) => r.category === 'Remastered Classics').length;
  const leftoverFriendlyCount = recipes.filter((r) => r.leftoverSuitability === 'excellent').length;
  const quickCount = recipes.filter((r) => r.speed === 'Quick' || r.prepTime + r.cookTime <= 20).length;

  const filtered = recipes.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
      r.ingredients.some((i) => i.name.toLowerCase().includes(searchTerm.toLowerCase()));

    let matchesCat = true;
    if (activeCategory === 'cat1') {
      matchesCat = r.category === 'High Protein & High Fiber';
    } else if (activeCategory === 'cat2') {
      matchesCat = r.category === 'Great Base';
    } else if (activeCategory === 'cat3') {
      matchesCat = r.category === 'Moderately Balanced';
    } else if (activeCategory === 'cat4') {
      matchesCat = r.category === 'Remastered Classics';
    } else if (activeCategory === 'quick') {
      matchesCat = r.speed === 'Quick' || r.prepTime + r.cookTime <= 20;
    } else if (activeCategory === 'leftovers') {
      matchesCat = r.leftoverSuitability === 'excellent';
    } else if (activeCategory === 'summer') {
      matchesCat = r.season === 'Summer';
    } else if (activeCategory === 'winter') {
      matchesCat = r.season === 'Winter';
    }

    return matchesSearch && matchesCat;
  });

  const handleConfirmSchedule = (meal: Meal) => {
    onScheduleMeal(meal, targetDay, targetMealType);
    setSchedulingMealId(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-2xl border-4 border-zinc-900 overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-zinc-950 text-amber-50 flex items-center justify-between border-b-2 border-red-600 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded bg-red-600 flex items-center justify-center text-amber-300 font-black text-sm border border-amber-400">
              <Utensils className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wider font-['Oswald'] text-white">
                  Diner Menu Book · All Included Meals
                </h3>
                <span className="text-xs font-mono font-bold px-2 py-0.5 bg-amber-400 text-zinc-950 rounded">
                  {recipes.length} Dishes
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Browse, search, and schedule meals from your complete favorite dishes collection.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar: Search & Category Filters */}
        <div className="p-4 bg-zinc-100 border-b border-zinc-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shrink-0">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search dishes (e.g. Fajitas, Orzo, Lasagna, Poke Bowl, Lentils, Kässpätzle)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-zinc-300 rounded text-xs focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none bg-zinc-200/70 p-1 rounded">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-2.5 py-1 text-xs font-bold font-['Oswald'] uppercase rounded transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-zinc-900 text-amber-300 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              All ({recipes.length})
            </button>
            <button
              onClick={() => setActiveCategory('cat1')}
              className={`px-2.5 py-1 text-xs font-bold font-['Oswald'] uppercase rounded transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'cat1'
                  ? 'bg-emerald-600 text-white font-black shadow-xs'
                  : 'text-zinc-700 hover:text-zinc-900'
              }`}
            >
              🟢 High Protein ({cat1Count})
            </button>
            <button
              onClick={() => setActiveCategory('cat2')}
              className={`px-2.5 py-1 text-xs font-bold font-['Oswald'] uppercase rounded transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'cat2'
                  ? 'bg-amber-500 text-zinc-950 font-black shadow-xs'
                  : 'text-zinc-700 hover:text-zinc-900'
              }`}
            >
              🟡 Great Base ({cat2Count})
            </button>
            <button
              onClick={() => setActiveCategory('cat3')}
              className={`px-2.5 py-1 text-xs font-bold font-['Oswald'] uppercase rounded transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'cat3'
                  ? 'bg-orange-500 text-white font-black shadow-xs'
                  : 'text-zinc-700 hover:text-zinc-900'
              }`}
            >
              🟠 Balanced ({cat3Count})
            </button>
            <button
              onClick={() => setActiveCategory('cat4')}
              className={`px-2.5 py-1 text-xs font-bold font-['Oswald'] uppercase rounded transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'cat4'
                  ? 'bg-red-600 text-white font-black shadow-xs'
                  : 'text-zinc-700 hover:text-zinc-900'
              }`}
            >
              🔴 Classics ({cat4Count})
            </button>
            <button
              onClick={() => setActiveCategory('quick')}
              className={`px-2.5 py-1 text-xs font-bold font-['Oswald'] uppercase rounded transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'quick'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              ⚡ Quick ≤20m ({quickCount})
            </button>
            <button
              onClick={() => setActiveCategory('leftovers')}
              className={`px-2.5 py-1 text-xs font-bold font-['Oswald'] uppercase rounded transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'leftovers'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              🍲 Batch Heroes ({leftoverFriendlyCount})
            </button>
            <button
              onClick={() => setActiveCategory('summer')}
              className={`px-2 py-1 text-xs font-bold font-['Oswald'] uppercase rounded transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'summer'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              ☀️ Summer
            </button>
            <button
              onClick={() => setActiveCategory('winter')}
              className={`px-2 py-1 text-xs font-bold font-['Oswald'] uppercase rounded transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'winter'
                  ? 'bg-slate-700 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              ❄️ Winter
            </button>
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-amber-50/20">
          {filtered.map((meal) => {
            const isExpanded = expandedId === meal.id;
            const scheduledInfo = scheduledMap.get(meal.id);
            const totalTime = meal.prepTime + meal.cookTime;
            const isScheduling = schedulingMealId === meal.id;

            return (
              <div
                key={meal.id}
                className="bg-white rounded-lg border-2 border-zinc-200 hover:border-red-600 transition-all flex flex-col justify-between shadow-xs relative"
              >
                {/* Header */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span className={`font-['Oswald'] uppercase font-bold ${
                      meal.mealType === 'lunch' ? 'text-amber-700' : 'text-red-700'
                    }`}>
                      {meal.mealType}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{totalTime}m</span>
                      </span>
                      {meal.calorieEstimate && (
                        <span>~{meal.calorieEstimate} kcal</span>
                      )}
                    </div>
                  </div>

                  {/* Category, Speed & Season Badges */}
                  {meal.category && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-[10px] font-bold font-['Oswald'] uppercase px-2 py-0.5 rounded border ${
                        meal.category === 'High Protein & High Fiber'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : meal.category === 'Great Base'
                          ? 'bg-amber-50 text-amber-900 border-amber-300'
                          : meal.category === 'Moderately Balanced'
                          ? 'bg-orange-50 text-orange-900 border-orange-300'
                          : 'bg-red-50 text-red-900 border-red-300'
                      }`}>
                        {meal.category === 'High Protein & High Fiber' && '🟢 '}
                        {meal.category === 'Great Base' && '🟡 '}
                        {meal.category === 'Moderately Balanced' && '🟠 '}
                        {meal.category === 'Remastered Classics' && '🔴 '}
                        {meal.category}
                      </span>
                      {meal.speed && (
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-700 border border-zinc-300">
                          [{meal.speed}]
                        </span>
                      )}
                      {meal.season && (
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-300">
                          [{meal.season}]
                        </span>
                      )}
                    </div>
                  )}

                  <h4 className="font-bold text-zinc-900 text-base leading-snug font-['Plus_Jakarta_Sans']">
                    {meal.title}
                  </h4>

                  {/* Scheduled Status Tag */}
                  {scheduledInfo && (
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[11px] font-mono font-semibold border border-emerald-200">
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>In Active Plan: {scheduledInfo.day} ({scheduledInfo.mealType})</span>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-zinc-500">
                    {meal.tags.map((t) => (
                      <span key={t} className="bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-600">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Leftover Quality Badge */}
                  {meal.leftoverSuitability && (
                    <div className="text-[11px] font-mono">
                      {meal.leftoverSuitability === 'excellent' && (
                        <span className="text-teal-700 font-bold flex items-center gap-1">
                          <RotateCcw className="w-3 h-3 text-teal-600" />
                          <span>Keeps 3-4 days (Batch Legend)</span>
                        </span>
                      )}
                      {meal.leftoverSuitability === 'good' && (
                        <span className="text-zinc-600">✓ Keeps 2 days in fridge</span>
                      )}
                      {meal.leftoverSuitability === 'cook_fresh_only' && (
                        <span className="text-amber-700">⚠️ Best cooked fresh</span>
                      )}
                    </div>
                  )}

                  {/* Description / Notes snippet */}
                  <p className="text-xs text-zinc-600 line-clamp-2">
                    {meal.notes}
                  </p>

                  {/* Expanded View for Ingredients & Portions */}
                  {isExpanded && (
                    <div className="pt-2 border-t border-zinc-200 space-y-2 text-xs animate-in fade-in duration-150">
                      <div>
                        <span className="font-bold text-zinc-800 uppercase tracking-wider font-['Oswald'] block mb-1">
                          Ingredients for 2 Diners:
                        </span>
                        <ul className="space-y-0.5 text-zinc-600 text-[11px]">
                          {meal.ingredients.map((ing) => (
                            <li key={ing.id} className="flex items-center justify-between">
                              <span>• {ing.name}</span>
                              <span className="font-mono text-zinc-400">{ing.amount}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {meal.gordoPortionNotes && (
                        <div className="p-1.5 bg-amber-50 rounded border border-amber-200 text-[11px]">
                          <strong className="text-amber-800">El Gordo:</strong> {meal.gordoPortionNotes}
                        </div>
                      )}
                      {meal.flacoPortionNotes && (
                        <div className="p-1.5 bg-teal-50 rounded border border-teal-200 text-[11px]">
                          <strong className="text-teal-800">El Flaco:</strong> {meal.flacoPortionNotes}
                        </div>
                      )}

                      {meal.reheatInstructions && (
                        <div className="text-[11px] text-teal-800 italic">
                          <strong>Reheat:</strong> {meal.reheatInstructions}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Scheduling Popover Panel */}
                {isScheduling && (
                  <div className="p-3 bg-zinc-950 text-white border-t-2 border-amber-400 space-y-2.5 text-xs font-['Oswald']">
                    <span className="uppercase tracking-wider font-bold text-amber-400 block">
                      Assign to Weekly Schedule:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-zinc-400 uppercase block mb-0.5">Day</label>
                        <select
                          value={targetDay}
                          onChange={(e) => setTargetDay(e.target.value as DayOfWeek)}
                          className="w-full bg-zinc-800 text-white px-2 py-1 rounded text-xs border border-zinc-700"
                        >
                          {DAYS_OF_WEEK.map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-400 uppercase block mb-0.5">Meal Slot</label>
                        <select
                          value={targetMealType}
                          onChange={(e) => setTargetMealType(e.target.value as 'lunch' | 'dinner')}
                          className="w-full bg-zinc-800 text-white px-2 py-1 rounded text-xs border border-zinc-700"
                        >
                          <option value="lunch">Lunch</option>
                          <option value="dinner">Dinner</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        onClick={() => setSchedulingMealId(null)}
                        className="px-2.5 py-1 text-zinc-400 hover:text-white uppercase text-[11px]"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleConfirmSchedule(meal)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white font-bold uppercase rounded text-[11px]"
                      >
                        Set in {targetDay} {targetMealType}
                      </button>
                    </div>
                  </div>
                )}

                {/* Card Footer Actions */}
                <div className="px-3 py-2 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between text-xs font-['Oswald']">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : meal.id)}
                    className="text-zinc-600 hover:text-zinc-900 transition-colors uppercase flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isExpanded ? 'Less' : 'Details'}</span>
                    {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setSchedulingMealId(isScheduling ? null : meal.id)}
                      className="px-2 py-1 bg-zinc-900 hover:bg-red-600 text-white rounded font-bold uppercase text-[11px] transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Calendar className="w-3 h-3" />
                      <span>Schedule</span>
                    </button>
                    <button
                      onClick={() => onEditMeal(meal)}
                      className="px-2 py-1 text-zinc-700 hover:bg-zinc-200 rounded uppercase text-[11px] transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
