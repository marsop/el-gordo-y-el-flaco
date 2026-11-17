import React, { useState } from 'react';
import { X, ShoppingBag, Check, Copy, CheckSquare, Square } from 'lucide-react';
import { WeeklyPlan, DAYS_OF_WEEK } from '../types';

interface GroceryModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: WeeklyPlan;
}

export const GroceryModal: React.FC<GroceryModalProps> = ({ isOpen, onClose, plan }) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Aggregate ingredients from all 14 meals
  const categorized: Record<string, { id: string; label: string; amount: string; name: string }[]> = {};

  DAYS_OF_WEEK.forEach((day) => {
    const dp = plan.days[day];
    if (!dp) return;

    const mealsToShop = [
      dp.dinner,
      ...(dp.lunch.isLeftover ? [] : [dp.lunch])
    ];

    mealsToShop.forEach((meal) => {
      meal.ingredients.forEach((ing) => {
        const cat = ing.category || 'Pantry';
        if (!categorized[cat]) categorized[cat] = [];

        // Check if item name already exists in this category
        const existing = categorized[cat].find(
          (i) => i.name.toLowerCase() === ing.name.toLowerCase()
        );
        if (!existing) {
          const amountLabel = meal.isBatchCook ? `${ing.amount} (×2 double batch)` : ing.amount;
          categorized[cat].push({
            id: `${cat}-${ing.name}`,
            label: `${ing.name} (${amountLabel})`,
            name: ing.name,
            amount: amountLabel
          });
        }
      });
    });
  });

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  let totalItemsCount = 0;
  Object.values(categorized).forEach((arr) => {
    totalItemsCount += arr.length;
  });

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  const handleCopy = () => {
    const lines = [`🛒 EL GORDO & EL FLACO — 2-PERSON GROCERY LIST (${plan.weekName})\n`];
    Object.entries(categorized).forEach(([cat, items]) => {
      lines.push(`## ${cat}`);
      items.forEach((item) => {
        const isDone = checkedItems[item.id] ? '[x]' : '[ ]';
        lines.push(`${isDone} ${item.label}`);
      });
      lines.push('');
    });
    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border-4 border-zinc-900 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-zinc-950 text-amber-50 flex items-center justify-between border-b-2 border-red-600">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center text-amber-300 font-bold text-sm">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-wider font-['Oswald'] text-white">
                Weekly Grocery List (2 Diners)
              </h3>
              <p className="text-xs text-zinc-400">
                Consolidated ingredients for all 14 scheduled meals.
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

        {/* Progress & Quick Action Bar */}
        <div className="px-6 py-3 bg-zinc-100 border-b border-zinc-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-mono text-zinc-700">
            <span className="font-bold">
              {checkedCount} / {totalItemsCount} items bagged
            </span>
            <div className="w-24 h-2 bg-zinc-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-600 transition-all duration-300"
                style={{ width: `${totalItemsCount ? (checkedCount / totalItemsCount) * 100 : 0}%` }}
              ></div>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded font-['Oswald'] font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied List!' : 'Copy To Clipboard'}</span>
          </button>
        </div>

        {/* Categorized Grocery List */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {Object.entries(categorized).map(([category, items]) => (
            <div key={category} className="space-y-2">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-red-700 font-['Oswald']">
                  {category}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  {items.length} items
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {items.map((item) => {
                  const isChecked = !!checkedItems[item.id];
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={`flex items-center gap-2 p-2 rounded border text-left text-xs transition-colors cursor-pointer ${
                        isChecked
                          ? 'bg-zinc-100 border-zinc-200 text-zinc-400 line-through'
                          : 'bg-white border-zinc-200 text-zinc-800 hover:border-zinc-300'
                      }`}
                    >
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-zinc-400 shrink-0" />
                      )}
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
