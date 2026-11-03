import React, { useState } from 'react';
import { X, Plus, AlertTriangle, CheckCircle2, Trash2, Sparkles, Clock, Calendar } from 'lucide-react';
import { PantryItem, WeeklyPlan } from '../types';
import { isPantryItemPlanned } from '../utils/pantryMatcher';

interface PantryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  pantryItems: PantryItem[];
  onAddPantryItem: (item: Omit<PantryItem, 'id'>) => void;
  onDeletePantryItem: (id: string) => void;
  onUpdatePantryItem?: (id: string, updates: Partial<PantryItem>) => void;
  onPrioritizeExpiring: () => void;
  plan: WeeklyPlan;
}

export const PantryDrawer: React.FC<PantryDrawerProps> = ({
  isOpen,
  onClose,
  pantryItems,
  onAddPantryItem,
  onDeletePantryItem,
  onUpdatePantryItem,
  onPrioritizeExpiring,
  plan
}) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [daysUntilExpiry, setDaysUntilExpiry] = useState<number>(2);
  const [category, setCategory] = useState<PantryItem['category']>('Produce');

  if (!isOpen) return null;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddPantryItem({
      name: name.trim(),
      quantity: quantity.trim() || '1 portion',
      daysUntilExpiry: Number(daysUntilExpiry) || 2,
      category
    });
    setName('');
    setQuantity('');
    setDaysUntilExpiry(2);
  };

  const sortedItems = [...pantryItems].sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl border-l-4 border-red-600 animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="px-6 py-4 bg-zinc-950 text-amber-50 flex items-center justify-between border-b-2 border-amber-400">
          <div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-500" />
              <h2 className="text-xl font-black uppercase tracking-wider font-['Oswald'] text-white">
                Soon-to-Expire Pantry
              </h2>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Prioritize expiring items to prevent food waste.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Callout */}
        <div className="p-4 bg-amber-50 border-b border-amber-200 flex items-center justify-between gap-3">
          <div className="text-xs text-amber-900 leading-tight">
            <span className="font-bold">Pantry Salvage Mode:</span> Swaps dishes into Monday & Tuesday to consume critical stock first.
          </div>
          <button
            onClick={onPrioritizeExpiring}
            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-wider rounded font-['Oswald'] shrink-0 cursor-pointer shadow-xs"
          >
            Auto-Match
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-['Oswald'] text-zinc-500 uppercase tracking-wider">
            <span>Inventory Items ({pantryItems.length})</span>
            <span>Urgency</span>
          </div>

          <div className="space-y-2">
            {sortedItems.map((item) => {
              const isCritical = item.daysUntilExpiry <= 2;
              const isWarning = item.daysUntilExpiry > 2 && item.daysUntilExpiry <= 4;
              
              // check if current plan incorporates this item
              const isMatched = isPantryItemPlanned(item, plan);

              return (
                <div
                  key={item.id}
                  className={`p-3 rounded-lg border flex items-center justify-between transition-colors ${
                    isCritical
                      ? 'border-red-300 bg-red-50/60'
                      : isWarning
                      ? 'border-amber-300 bg-amber-50/40'
                      : 'border-zinc-200 bg-zinc-50/50'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-zinc-900 font-['Plus_Jakarta_Sans']">
                        {item.name}
                      </span>
                      {isMatched && (
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded font-mono">
                          Planned
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-zinc-500 flex items-center gap-2">
                      <span>{item.quantity}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.category}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    {onUpdatePantryItem && (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdatePantryItem(item.id, {
                              daysUntilExpiry: Math.max(0, item.daysUntilExpiry - 1)
                            })
                          }
                          title="Decrease days until expiry (-1d)"
                          className="w-5 h-5 flex items-center justify-center text-[10px] font-bold font-mono bg-zinc-200/70 hover:bg-zinc-300 text-zinc-700 rounded cursor-pointer transition-colors"
                        >
                          -1d
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdatePantryItem(item.id, {
                              daysUntilExpiry: item.daysUntilExpiry + 1
                            })
                          }
                          title="Increase days until expiry (+1d)"
                          className="w-5 h-5 flex items-center justify-center text-[10px] font-bold font-mono bg-zinc-200/70 hover:bg-zinc-300 text-zinc-700 rounded cursor-pointer transition-colors"
                        >
                          +1d
                        </button>
                      </div>
                    )}
                    <div className="text-right min-w-[70px]">
                      <span
                        className={`text-xs font-bold font-mono block ${
                          isCritical
                            ? 'text-red-700 font-black'
                            : isWarning
                            ? 'text-amber-700'
                            : 'text-zinc-600'
                        }`}
                      >
                        {item.daysUntilExpiry <= 0
                          ? 'EXPIRES TODAY'
                          : item.daysUntilExpiry === 1
                          ? '1 day left'
                          : `${item.daysUntilExpiry} days left`}
                      </span>
                    </div>
                    <button
                      onClick={() => onDeletePantryItem(item.id)}
                      title="Remove item"
                      className="p-1 text-zinc-400 hover:text-red-600 rounded transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add Item Form */}
        <div className="p-4 bg-zinc-50 border-t border-zinc-200">
          <form onSubmit={handleAdd} className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 font-['Oswald'] block">
              + Log Soon-to-Expire Ingredient
            </span>

            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Item name (e.g., Avocado)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-zinc-300 rounded focus:ring-1 focus:ring-red-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Qty (e.g., 2 pieces)"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-zinc-300 rounded focus:ring-1 focus:ring-red-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-zinc-300 rounded focus:ring-1 focus:ring-red-500 focus:outline-none"
              >
                <option value="Produce">Produce</option>
                <option value="Meat & Seafood">Meat & Seafood</option>
                <option value="Dairy & Eggs">Dairy & Eggs</option>
                <option value="Bakery">Bakery</option>
                <option value="Pantry">Pantry</option>
                <option value="Sauces & Condiments">Sauces & Condiments</option>
              </select>

              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={daysUntilExpiry}
                  onChange={(e) => setDaysUntilExpiry(parseInt(e.target.value) || 0)}
                  className="w-16 px-2 py-1.5 text-xs bg-white border border-zinc-300 rounded focus:ring-1 focus:ring-red-500 focus:outline-none font-mono"
                />
                <span className="text-xs text-zinc-500 font-['Plus_Jakarta_Sans'] whitespace-nowrap">
                  days until expiry
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider rounded font-['Oswald'] transition-colors cursor-pointer"
            >
              Add To Expiry Watchlist
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
