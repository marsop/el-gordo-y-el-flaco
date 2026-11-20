import React, { useState } from 'react';
import { DAYS_OF_WEEK, DayOfWeek, Meal, PantryItem, WeeklyPlan } from '../types';
import { MealCard } from './MealCard';
import { Calendar, RefreshCw, Sparkles } from 'lucide-react';

interface WeekViewProps {
  plan: WeeklyPlan;
  pantryItems: PantryItem[];
  onSwapMeal: (day: DayOfWeek, type: 'lunch' | 'dinner') => void;
  onEditMeal: (day: DayOfWeek, type: 'lunch' | 'dinner') => void;
  onShuffleDay: (day: DayOfWeek) => void;
  onToggleBatch?: (day: DayOfWeek, type: 'lunch' | 'dinner') => void;
  onMakeLeftover?: (day: DayOfWeek, type: 'lunch' | 'dinner') => void;
}

export const WeekView: React.FC<WeekViewProps> = ({
  plan,
  pantryItems,
  onSwapMeal,
  onEditMeal,
  onShuffleDay,
  onToggleBatch,
  onMakeLeftover
}) => {
  const [selectedDayFilter, setSelectedDayFilter] = useState<'ALL' | DayOfWeek>('ALL');

  const activeDays = selectedDayFilter === 'ALL' 
    ? DAYS_OF_WEEK 
    : [selectedDayFilter];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Sub-header & Filter Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-zinc-200 pb-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-950 font-['Oswald']">
              Weekly Meal Rotation
            </h2>
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 bg-red-600 text-white rounded font-mono">
              Mon — Sun
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 font-['Plus_Jakarta_Sans'] mt-0.5">
            Two daily meals for two diners. Batch cook dinners to yield effortless reheats for lunch!
          </p>
        </div>

        {/* Day Filter Segmented Bar (Interactive functional buttons) */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedDayFilter('ALL')}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded font-['Oswald'] transition-colors whitespace-nowrap cursor-pointer ${
              selectedDayFilter === 'ALL'
                ? 'bg-zinc-950 text-amber-400 shadow-sm'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            All 7 Days
          </button>
          {DAYS_OF_WEEK.map((day) => {
            const shortName = day.slice(0, 3);
            const isSelected = selectedDayFilter === day;
            return (
              <button
                key={day}
                onClick={() => setSelectedDayFilter(day)}
                className={`px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded font-['Oswald'] transition-colors whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                {shortName}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Days: Monday Through Sunday */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {activeDays.map((day) => {
          const dayPlan = plan.days[day];
          if (!dayPlan) return null;

          const totalDayTime =
            dayPlan.lunch.prepTime +
            dayPlan.lunch.cookTime +
            dayPlan.dinner.prepTime +
            dayPlan.dinner.cookTime;

          return (
            <div
              key={day}
              className="flex flex-col rounded-xl border-2 border-zinc-800 bg-amber-50/40 p-3.5 shadow-sm space-y-3 relative overflow-hidden"
            >
              {/* Day Header Bar */}
              <div className="flex items-center justify-between border-b-2 border-zinc-300 pb-2.5">
                <div>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-lg font-black uppercase tracking-tight text-zinc-900 font-['Oswald']">
                      {day}
                    </h3>
                    <span className="text-xs font-mono font-semibold text-zinc-500">
                      {dayPlan.dateLabel}
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-500 block">
                    Daily Active Kitchen Time: ~{totalDayTime} mins
                  </span>
                </div>

                <button
                  onClick={() => onShuffleDay(day)}
                  title={`Shuffle ${day}'s Lunch and Dinner`}
                  className="p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 rounded transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Day's Meals: Lunch & Dinner */}
              <div className="space-y-3 flex-1 flex flex-col justify-between">
                {/* 1. Lunch */}
                <MealCard
                  meal={dayPlan.lunch}
                  dayName={day}
                  pantryItems={pantryItems}
                  onSwap={() => onSwapMeal(day, 'lunch')}
                  onEdit={() => onEditMeal(day, 'lunch')}
                  onToggleBatch={() => onToggleBatch && onToggleBatch(day, 'lunch')}
                  onMakeLeftover={() => onMakeLeftover && onMakeLeftover(day, 'lunch')}
                />

                {/* 2. Dinner */}
                <MealCard
                  meal={dayPlan.dinner}
                  dayName={day}
                  pantryItems={pantryItems}
                  onSwap={() => onSwapMeal(day, 'dinner')}
                  onEdit={() => onEditMeal(day, 'dinner')}
                  onToggleBatch={() => onToggleBatch && onToggleBatch(day, 'dinner')}
                  onMakeLeftover={() => onMakeLeftover && onMakeLeftover(day, 'dinner')}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
