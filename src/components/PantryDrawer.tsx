import React, { useState, useMemo, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Clock, 
  Check, 
  ListFilter, 
  Search, 
  Sparkles,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { PantryItem, WeeklyPlan, MasterIngredient, IngredientCategory } from '../types';
import { isPantryItemPlanned } from '../utils/pantryMatcher';
import { IngredientCombobox } from './IngredientCombobox';
import { INITIAL_INGREDIENTS } from '../data/defaultIngredients';

interface PantryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  pantryItems: PantryItem[];
  availableIngredients?: MasterIngredient[];
  onAddPantryItem: (item: Omit<PantryItem, 'id'>) => void;
  onDeletePantryItem: (id: string) => void;
  onUpdatePantryItem?: (id: string, updates: Partial<PantryItem>) => void;
  onPrioritizeExpiring: () => void;
  onAddMasterIngredient?: (item: Omit<MasterIngredient, 'id'>) => void;
  onDeleteMasterIngredient?: (id: string) => void;
  plan: WeeklyPlan;
}

const CATEGORIES: IngredientCategory[] = [
  'Produce',
  'Dairy & Eggs',
  'Meat & Seafood',
  'Bakery',
  'Pantry',
  'Sauces & Condiments'
];

const CATEGORY_COLORS: Record<IngredientCategory, { badge: string; dot: string }> = {
  Produce: {
    badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    dot: 'bg-emerald-500'
  },
  'Dairy & Eggs': {
    badge: 'bg-amber-100 text-amber-800 border-amber-300',
    dot: 'bg-amber-500'
  },
  'Meat & Seafood': {
    badge: 'bg-red-100 text-red-800 border-red-300',
    dot: 'bg-red-500'
  },
  Bakery: {
    badge: 'bg-orange-100 text-orange-800 border-orange-300',
    dot: 'bg-orange-500'
  },
  Pantry: {
    badge: 'bg-zinc-100 text-zinc-800 border-zinc-300',
    dot: 'bg-zinc-500'
  },
  'Sauces & Condiments': {
    badge: 'bg-purple-100 text-purple-800 border-purple-300',
    dot: 'bg-purple-500'
  }
};

export const PantryDrawer: React.FC<PantryDrawerProps> = ({
  isOpen,
  onClose,
  pantryItems,
  availableIngredients = INITIAL_INGREDIENTS,
  onAddPantryItem,
  onDeletePantryItem,
  onUpdatePantryItem,
  onPrioritizeExpiring,
  onAddMasterIngredient,
  onDeleteMasterIngredient,
  plan
}) => {
  // Navigation tabs: 'expiring' = active soon-to-expire inventory; 'ingredients' = separate master ingredients catalog
  const [activeTab, setActiveTab] = useState<'expiring' | 'ingredients'>('expiring');

  // Log expiring item form state
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [daysUntilExpiry, setDaysUntilExpiry] = useState<number>(2);
  const [category, setCategory] = useState<IngredientCategory>('Produce');

  // Master ingredients list filter state
  const [ingSearch, setIngSearch] = useState('');
  const [ingCategory, setIngCategory] = useState<string>('All');
  const [isAddingNewMaster, setIsAddingNewMaster] = useState(false);
  const [newMasterName, setNewMasterName] = useState('');
  const [newMasterCat, setNewMasterCat] = useState<IngredientCategory>('Produce');
  const [newMasterQty, setNewMasterQty] = useState('');
  const [newMasterDays, setNewMasterDays] = useState<number>(3);

  // Recently added toast for the catalog view
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const handleSelectIngredient = (ingredient: MasterIngredient) => {
    setName(ingredient.name);
    setCategory(ingredient.category);
    if (!quantity && ingredient.defaultQuantity) {
      setQuantity(ingredient.defaultQuantity);
    }
    if (ingredient.defaultDaysUntilExpiry !== undefined) {
      setDaysUntilExpiry(ingredient.defaultDaysUntilExpiry);
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const trimmedName = name.trim();
    onAddPantryItem({
      name: trimmedName,
      quantity: quantity.trim() || '1 portion',
      daysUntilExpiry: Number(daysUntilExpiry) || 2,
      category
    });

    // If the typed item doesn't exist in master catalog yet, add it automatically
    if (
      onAddMasterIngredient &&
      !availableIngredients.some(
        (i) => i.name.toLowerCase() === trimmedName.toLowerCase()
      )
    ) {
      onAddMasterIngredient({
        name: trimmedName,
        category,
        defaultQuantity: quantity.trim() || '1 portion',
        defaultDaysUntilExpiry: Number(daysUntilExpiry) || 2
      });
    }

    setName('');
    setQuantity('');
    setDaysUntilExpiry(2);
  };

  // One-click add from master ingredients list directly to expiring pantry
  const handleQuickAddToPantry = (item: MasterIngredient) => {
    onAddPantryItem({
      name: item.name,
      quantity: item.defaultQuantity || '1 portion',
      daysUntilExpiry: item.defaultDaysUntilExpiry !== undefined ? item.defaultDaysUntilExpiry : 2,
      category: item.category
    });
    setRecentlyAddedId(item.id);
    setTimeout(() => {
      setRecentlyAddedId((curr) => (curr === item.id ? null : curr));
    }, 2000);
  };

  // Add new ingredient to master catalog
  const handleCreateMasterIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMasterName.trim()) return;
    if (onAddMasterIngredient) {
      onAddMasterIngredient({
        name: newMasterName.trim(),
        category: newMasterCat,
        defaultQuantity: newMasterQty.trim() || '1 portion',
        defaultDaysUntilExpiry: Number(newMasterDays) || 3
      });
    }
    setNewMasterName('');
    setNewMasterQty('');
    setNewMasterDays(3);
    setIsAddingNewMaster(false);
  };

  // Filter master ingredients
  const filteredMasterIngredients = useMemo(() => {
    const q = ingSearch.trim().toLowerCase();
    return availableIngredients.filter((ing) => {
      if (ingCategory !== 'All' && ing.category !== ingCategory) return false;
      if (!q) return true;
      return (
        ing.name.toLowerCase().includes(q) ||
        ing.category.toLowerCase().includes(q)
      );
    });
  }, [availableIngredients, ingSearch, ingCategory]);

  const sortedItems = [...pantryItems].sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
    >
      <div className="w-full max-w-2xl sm:max-w-3xl bg-white rounded-xl shadow-2xl border-4 border-zinc-900 overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-zinc-950 text-amber-50 flex items-center justify-between border-b-2 border-red-600 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded bg-red-600 flex items-center justify-center text-amber-300 font-black text-sm border border-amber-400">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wider font-['Oswald'] text-white">
                  Expiring Pantry & Inventory
                </h3>
                <span className="text-xs font-mono font-bold px-2 py-0.5 bg-amber-400 text-zinc-950 rounded">
                  {pantryItems.length} Tracked
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Prioritize expiring ingredients & manage your master pantry list.
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

        {/* View Switcher Tabs: Expiring Pantry vs Master Ingredients List */}
        <div className="flex border-b-2 border-zinc-900 bg-zinc-100 font-['Oswald'] uppercase tracking-wider text-xs shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('expiring')}
            className={`flex-1 py-2.5 px-3 flex items-center justify-center gap-2 font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'expiring'
                ? 'bg-white text-red-600 border-red-600 shadow-xs'
                : 'text-zinc-600 hover:text-zinc-950 border-transparent hover:bg-zinc-200/60'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-red-500" />
            <span>Expiring Watchlist ({pantryItems.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ingredients')}
            className={`flex-1 py-2.5 px-3 flex items-center justify-center gap-2 font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'ingredients'
                ? 'bg-white text-zinc-950 border-red-600 shadow-xs'
                : 'text-zinc-600 hover:text-zinc-950 border-transparent hover:bg-zinc-200/60'
            }`}
          >
            <ListFilter className="w-3.5 h-3.5 text-amber-500" />
            <span>Ingredients List ({availableIngredients.length})</span>
          </button>
        </div>

        {/* TAB 1: SOON-TO-EXPIRE INVENTORY */}
        {activeTab === 'expiring' && (
          <>
            {/* Action Callout */}
            <div className="px-6 py-3 bg-amber-50 border-b border-amber-200 flex items-center justify-between gap-3 shrink-0">
              <div className="text-xs text-amber-900 leading-tight">
                <span className="font-bold">Pantry Salvage Mode:</span> Swaps dishes into Monday & Tuesday to consume critical stock first.
              </div>
              <button
                onClick={onPrioritizeExpiring}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-wider rounded font-['Oswald'] shrink-0 cursor-pointer shadow-xs transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Auto-Match</span>
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 min-h-[160px]">
              <div className="flex items-center justify-between text-xs font-['Oswald'] text-zinc-500 uppercase tracking-wider">
                <span>Active Stock Items ({pantryItems.length})</span>
                <span>Urgency</span>
              </div>

              {sortedItems.length === 0 ? (
                <div className="p-8 text-center text-zinc-500 text-xs space-y-2">
                  <Clock className="w-6 h-6 mx-auto text-zinc-400" />
                  <p className="font-semibold text-zinc-700">No expiring pantry items logged.</p>
                  <p className="text-[11px] text-zinc-400">
                    Use the combobox below or pick from the Ingredients List tab to track soon-to-expire food.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {sortedItems.map((item) => {
                    const isCritical = item.daysUntilExpiry <= 2;
                    const isWarning = item.daysUntilExpiry > 2 && item.daysUntilExpiry <= 4;
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
                        <div className="space-y-0.5 min-w-0 pr-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-zinc-900 font-['Plus_Jakarta_Sans'] truncate">
                              {item.name}
                            </span>
                            {isMatched && (
                              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded font-mono shrink-0">
                                Planned
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-zinc-500 flex items-center gap-2">
                            <span className="truncate">{item.quantity}</span>
                            <span aria-hidden="true">·</span>
                            <span className="shrink-0">{item.category}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5 shrink-0">
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
              )}
            </div>

            {/* Add Item Form with Combobox */}
            <div className="p-4 sm:p-5 bg-zinc-50 border-t border-zinc-200 shrink-0 relative">
              <form onSubmit={handleAdd} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 font-['Oswald'] block">
                    + Log Soon-to-Expire Ingredient
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveTab('ingredients')}
                    className="text-[10px] text-red-600 hover:text-red-700 font-bold uppercase tracking-wider font-['Oswald'] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Browse All ({availableIngredients.length})</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {/* Combobox & Quantity Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="relative">
                    <IngredientCombobox
                      ingredients={availableIngredients}
                      value={name}
                      onChange={(val, matched) => {
                        setName(val);
                        if (matched) {
                          setCategory(matched.category);
                          if (!quantity && matched.defaultQuantity) {
                            setQuantity(matched.defaultQuantity);
                          }
                          if (matched.defaultDaysUntilExpiry !== undefined) {
                            setDaysUntilExpiry(matched.defaultDaysUntilExpiry);
                          }
                        }
                      }}
                      onSelectIngredient={handleSelectIngredient}
                      onAddCustomIngredient={(newIng) => {
                        if (onAddMasterIngredient) {
                          onAddMasterIngredient(newIng);
                        }
                        setName(newIng.name);
                        setCategory(newIng.category);
                        if (newIng.defaultQuantity) setQuantity(newIng.defaultQuantity);
                        if (newIng.defaultDaysUntilExpiry !== undefined) {
                          setDaysUntilExpiry(newIng.defaultDaysUntilExpiry);
                        }
                      }}
                      dropdownPosition="top"
                      placeholder="Select or type ingredient..."
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Qty (e.g. 2 pieces)"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-zinc-300 rounded focus:ring-1 focus:ring-red-500 focus:outline-none"
                  />
                </div>

                {/* Category & Days Until Expiry */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as IngredientCategory)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-zinc-300 rounded focus:ring-1 focus:ring-red-500 focus:outline-none"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>

                  <div className="flex items-center gap-2 bg-white px-2.5 py-1 border border-zinc-300 rounded">
                    <span className="text-[11px] text-zinc-500 font-['Plus_Jakarta_Sans'] whitespace-nowrap">
                      Expires in:
                    </span>
                    <input
                      type="number"
                      min="0"
                      max="30"
                      value={daysUntilExpiry}
                      onChange={(e) => setDaysUntilExpiry(parseInt(e.target.value) || 0)}
                      className="w-14 px-1.5 py-0.5 text-xs border border-zinc-200 rounded font-mono font-bold text-zinc-900 focus:ring-1 focus:ring-red-500 focus:outline-none"
                    />
                    <span className="text-[11px] text-zinc-500 font-['Plus_Jakarta_Sans'] whitespace-nowrap">
                      days
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider rounded font-['Oswald'] transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add To Expiry Watchlist</span>
                </button>
              </form>
            </div>
          </>
        )}

        {/* TAB 2: SEPARATE INGREDIENTS MASTER LIST */}
        {activeTab === 'ingredients' && (
          <div className="flex-1 flex flex-col overflow-hidden min-h-0">
            {/* Search and Category Filter Toolbar */}
            <div className="p-3 sm:px-6 sm:py-3.5 bg-zinc-900 text-amber-50 space-y-2.5 shrink-0 border-b border-zinc-800">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Filter ingredients (e.g. Avocado, Beans)..."
                  value={ingSearch}
                  onChange={(e) => setIngSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-zinc-800 text-white placeholder-zinc-400 border border-zinc-700 rounded focus:ring-1 focus:ring-amber-400 focus:outline-none"
                />
                {ingSearch && (
                  <button
                    type="button"
                    onClick={() => setIngSearch('')}
                    className="absolute right-2.5 top-2 text-zinc-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-none text-[10px] font-['Oswald'] uppercase tracking-wider">
                <button
                  type="button"
                  onClick={() => setIngCategory('All')}
                  className={`px-2 py-0.5 rounded transition-colors whitespace-nowrap cursor-pointer ${
                    ingCategory === 'All'
                      ? 'bg-amber-400 text-zinc-950 font-bold'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  All ({availableIngredients.length})
                </button>
                {CATEGORIES.map((cat) => {
                  const count = availableIngredients.filter((i) => i.category === cat).length;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setIngCategory(cat)}
                      className={`px-2 py-0.5 rounded transition-colors whitespace-nowrap cursor-pointer ${
                        ingCategory === cat
                          ? 'bg-amber-400 text-zinc-950 font-bold'
                          : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
                      }`}
                    >
                      {cat} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Add New Master Ingredient Form Button */}
            <div className="p-3 sm:px-6 bg-zinc-100 border-b border-zinc-200 flex items-center justify-between text-xs shrink-0">
              <span className="font-bold text-zinc-700 font-['Oswald'] uppercase tracking-wider">
                Cataloged Ingredients ({filteredMasterIngredients.length})
              </span>
              <button
                type="button"
                onClick={() => setIsAddingNewMaster((prev) => !prev)}
                className="px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 text-amber-300 rounded font-['Oswald'] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>{isAddingNewMaster ? 'Close Form' : 'New Ingredient'}</span>
              </button>
            </div>

            {/* Expandable Form to Add New Master Ingredient */}
            {isAddingNewMaster && (
              <form
                onSubmit={handleCreateMasterIngredient}
                className="p-3 sm:p-5 bg-amber-50 border-b border-amber-200 space-y-2.5 shrink-0 animate-in slide-in-from-top-2 duration-150 text-xs"
              >
                <span className="font-bold font-['Oswald'] uppercase tracking-wider text-amber-950 block">
                  Add Item to Master Ingredients List
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Ingredient Name"
                    value={newMasterName}
                    onChange={(e) => setNewMasterName(e.target.value)}
                    className="px-2.5 py-1.5 bg-white border border-amber-300 rounded focus:ring-1 focus:ring-red-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Default Qty (e.g. 200g)"
                    value={newMasterQty}
                    onChange={(e) => setNewMasterQty(e.target.value)}
                    className="px-2.5 py-1.5 bg-white border border-amber-300 rounded focus:ring-1 focus:ring-red-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <select
                    value={newMasterCat}
                    onChange={(e) => setNewMasterCat(e.target.value as IngredientCategory)}
                    className="px-2.5 py-1.5 bg-white border border-amber-300 rounded focus:ring-1 focus:ring-red-500 focus:outline-none"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>

                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min="1"
                      max="365"
                      value={newMasterDays}
                      onChange={(e) => setNewMasterDays(parseInt(e.target.value) || 3)}
                      className="w-16 px-2 py-1.5 bg-white border border-amber-300 rounded focus:ring-1 focus:ring-red-500 focus:outline-none font-mono"
                    />
                    <span className="text-[11px] text-zinc-600 font-['Plus_Jakarta_Sans'] whitespace-nowrap">
                      days shelf life
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-wider rounded font-['Oswald'] cursor-pointer transition-colors shadow-xs"
                >
                  Save Ingredient to Catalog
                </button>
              </form>
            )}

            {/* Master Ingredients Scrollable Table */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-1.5 min-h-0">
              {filteredMasterIngredients.length > 0 ? (
                filteredMasterIngredients.map((item) => {
                  const colors = CATEGORY_COLORS[item.category] || CATEGORY_COLORS.Produce;
                  const isRecentlyAdded = recentlyAddedId === item.id;

                  return (
                    <div
                      key={item.id}
                      className="p-2.5 bg-white hover:bg-amber-50/50 rounded-lg border border-zinc-200 transition-colors flex items-center justify-between gap-2 shadow-2xs"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-zinc-900 truncate font-['Plus_Jakarta_Sans']">
                            {item.name}
                          </span>
                          <span
                            className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${colors.badge} font-mono shrink-0`}
                          >
                            {item.category}
                          </span>
                        </div>
                        <div className="text-[11px] text-zinc-500 flex items-center gap-2 mt-0.5">
                          {item.defaultQuantity && (
                            <span className="font-mono text-zinc-600 truncate">
                              {item.defaultQuantity}
                            </span>
                          )}
                          {item.defaultDaysUntilExpiry !== undefined && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="text-zinc-500">
                                ~{item.defaultDaysUntilExpiry}d shelf life
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleQuickAddToPantry(item)}
                          title="Add this ingredient directly to expiring pantry"
                          className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider font-['Oswald'] flex items-center gap-1 transition-all cursor-pointer ${
                            isRecentlyAdded
                              ? 'bg-emerald-600 text-white scale-105'
                              : 'bg-red-50 hover:bg-red-600 text-red-700 hover:text-white border border-red-200'
                          }`}
                        >
                          {isRecentlyAdded ? (
                            <>
                              <Check className="w-3 h-3" />
                              <span>Added!</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3 h-3" />
                              <span>+ Watch</span>
                            </>
                          )}
                        </button>

                        {onDeleteMasterIngredient && (
                          <button
                            type="button"
                            onClick={() => onDeleteMasterIngredient(item.id)}
                            title="Remove from master catalog"
                            className="p-1 text-zinc-300 hover:text-red-500 rounded transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center text-xs text-zinc-500">
                  <Search className="w-5 h-5 mx-auto mb-1 text-zinc-400" />
                  <p>No ingredients found matching &quot;{ingSearch}&quot;.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const PantryModal = PantryDrawer;

