import React, { useState } from 'react';
import { X, ShoppingBag, Check, Copy, CheckSquare, Square, Layers, ListOrdered, AlertTriangle } from 'lucide-react';
import { WeeklyPlan, PantryItem } from '../types';
import { getAggregatedGroceryList, getItemizedGroceryList } from '../utils/groceryUtils';

interface GroceryModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: WeeklyPlan;
  pantryItems?: PantryItem[];
}

export const GroceryModal: React.FC<GroceryModalProps> = ({
  isOpen,
  onClose,
  plan,
  pantryItems
}) => {
  const [viewMode, setViewMode] = useState<'consolidated' | 'itemized'>('consolidated');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const aggregated = getAggregatedGroceryList(plan, { pantryItems });
  const itemized = getItemizedGroceryList(plan);

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Calculate total items count depending on view
  let totalItemsCount = 0;
  if (viewMode === 'consolidated') {
    Object.values(aggregated).forEach((arr) => {
      totalItemsCount += arr.length;
    });
  } else {
    Object.values(itemized).forEach((arr) => {
      totalItemsCount += arr.length;
    });
  }

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  const handleCopy = () => {
    const lines = [`🛒 EL GORDO Y EL FLACO — 2-PERSON GROCERY LIST (${plan.weekName})\n`];

    if (viewMode === 'consolidated') {
      Object.entries(aggregated).forEach(([cat, items]) => {
        if (items.length === 0) return;
        lines.push(`## ${cat}`);
        items.forEach((item) => {
          const isDone = checkedItems[item.id] ? '[x]' : '[ ]';
          const qtyPrefix = item.totalCount > 1 ? `${item.totalCount}× ` : '';
          const sources = item.sources
            .map((s) => `${s.day.slice(0, 3)} ${s.mealType}${s.isBatchCook ? ' (×2 batch)' : ''}`)
            .join(', ');
          const pantryNote = item.pantryStock ? ` [In pantry: ${item.pantryStock.quantity}]` : '';
          lines.push(`${isDone} ${qtyPrefix}${item.name} (${item.displayAmount}) — ${sources}${pantryNote}`);
        });
        lines.push('');
      });
    } else {
      Object.entries(itemized).forEach(([cat, items]) => {
        if (items.length === 0) return;
        lines.push(`## ${cat}`);
        items.forEach((item) => {
          const isDone = checkedItems[item.id] ? '[x]' : '[ ]';
          const batchTag = item.isBatchCook ? ' (Double Batch)' : '';
          lines.push(`${isDone} ${item.name} (${item.amount}) — ${item.day} ${item.mealType}${batchTag}`);
        });
        lines.push('');
      });
    }

    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border-4 border-zinc-900 overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-zinc-950 text-amber-50 flex items-center justify-between border-b-2 border-red-600 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center text-amber-300 font-bold text-sm">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-wider font-['Oswald'] text-white">
                Weekly Grocery List (2 Diners)
              </h3>
              <p className="text-xs text-zinc-400">
                Calculated from weekly meals · Multipliers & batch quantities aggregated.
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

        {/* View Mode Switcher & Quick Action Bar */}
        <div className="px-6 py-2.5 bg-zinc-100 border-b border-zinc-200 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          {/* View Toggle */}
          <div className="flex items-center bg-zinc-200/80 p-0.5 rounded border border-zinc-300">
            <button
              onClick={() => setViewMode('consolidated')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-['Oswald'] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                viewMode === 'consolidated'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-zinc-700 hover:text-zinc-950'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Consolidated Totals</span>
            </button>
            <button
              onClick={() => setViewMode('itemized')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-['Oswald'] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                viewMode === 'itemized'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-zinc-700 hover:text-zinc-950'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span>By Meal Occurrence</span>
            </button>
          </div>

          {/* Progress & Copy */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 font-mono text-zinc-700">
              <span className="font-bold text-[11px]">
                {checkedCount} / {totalItemsCount} bagged
              </span>
              <div className="w-20 h-2 bg-zinc-300 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-600 transition-all duration-300"
                  style={{ width: `${totalItemsCount ? (checkedCount / totalItemsCount) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded font-['Oswald'] font-bold uppercase tracking-wider transition-colors cursor-pointer text-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy List'}</span>
            </button>
          </div>
        </div>

        {/* Categorized Grocery List */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {viewMode === 'consolidated' ? (
            /* CONSOLIDATED TOTALS VIEW */
            Object.entries(aggregated).map(([category, items]) => {
              if (items.length === 0) return null;
              return (
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
                          className={`flex items-start gap-2.5 p-2.5 rounded border text-left text-xs transition-colors cursor-pointer ${
                            isChecked
                              ? 'bg-zinc-100 border-zinc-200 text-zinc-400 line-through opacity-75'
                              : 'bg-white border-zinc-200 text-zinc-800 hover:border-zinc-300 hover:bg-zinc-50/50'
                          }`}
                        >
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          ) : (
                            <Square className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                          )}

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {item.totalCount > 1 && (
                                <span
                                  className={`px-1.5 py-0.2 rounded text-[10px] font-black font-['Oswald'] shrink-0 ${
                                    isChecked
                                      ? 'bg-zinc-200 text-zinc-500'
                                      : 'bg-red-600 text-white'
                                  }`}
                                >
                                  {item.totalCount}×
                                </span>
                              )}
                              <span className="font-bold text-zinc-900 truncate">
                                {item.name}
                              </span>
                              <span className="text-zinc-600 font-mono text-[11px] shrink-0">
                                ({item.displayAmount})
                              </span>
                            </div>

                            {/* Meal Sources Breakdown */}
                            <div className="text-[10px] text-zinc-500 font-mono mt-1 flex flex-wrap gap-1 items-center">
                              <span className="text-zinc-400">For:</span>
                              {item.sources.map((s, idx) => (
                                <span
                                  key={idx}
                                  className="bg-zinc-100 px-1 py-0.2 rounded border border-zinc-200 text-zinc-600"
                                >
                                  {s.day.slice(0, 3)} {s.mealType === 'lunch' ? 'Lunch' : 'Dinner'}
                                  {s.isBatchCook ? ' (×2)' : ''}
                                </span>
                              ))}
                            </div>

                            {/* Pantry Stock Indicator */}
                            {item.pantryStock && (
                              <div className="mt-1 flex items-center gap-1 text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 font-mono">
                                <span>Pantry stock: {item.pantryStock.quantity}</span>
                                {item.pantryStock.daysUntilExpiry <= 3 && (
                                  <span className="text-red-700 font-bold flex items-center gap-0.5">
                                    <AlertTriangle className="w-2.5 h-2.5" />
                                    Expiring!
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            /* ITEMIZED BY MEAL VIEW */
            Object.entries(itemized).map(([category, items]) => {
              if (items.length === 0) return null;
              return (
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
                          className={`flex items-start gap-2.5 p-2.5 rounded border text-left text-xs transition-colors cursor-pointer ${
                            isChecked
                              ? 'bg-zinc-100 border-zinc-200 text-zinc-400 line-through opacity-75'
                              : 'bg-white border-zinc-200 text-zinc-800 hover:border-zinc-300 hover:bg-zinc-50/50'
                          }`}
                        >
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          ) : (
                            <Square className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                          )}

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-zinc-900 truncate">
                                {item.name}
                              </span>
                              <span className="text-zinc-600 font-mono text-[11px] shrink-0">
                                {item.amount}
                              </span>
                            </div>

                            <div className="text-[10px] text-zinc-500 font-mono mt-1 flex items-center gap-1.5">
                              <span className="font-semibold text-zinc-700">
                                {item.day} {item.mealType.toUpperCase()}
                              </span>
                              {item.isBatchCook && (
                                <span className="bg-amber-100 text-amber-800 px-1 rounded text-[9px] font-bold">
                                  Double Batch (×2)
                                </span>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
