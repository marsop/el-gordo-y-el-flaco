import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Check, Plus, X, Search, Tag } from 'lucide-react';
import { MasterIngredient, IngredientCategory } from '../types';

interface IngredientComboboxProps {
  ingredients: MasterIngredient[];
  value: string;
  onChange: (value: string, matchedIngredient?: MasterIngredient) => void;
  onSelectIngredient: (ingredient: MasterIngredient) => void;
  onAddCustomIngredient?: (ingredient: Omit<MasterIngredient, 'id'>) => void;
  placeholder?: string;
  categoryFilter?: IngredientCategory;
  disabled?: boolean;
  dropdownPosition?: 'top' | 'bottom';
}

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

const ALL_CATEGORIES: IngredientCategory[] = [
  'Produce',
  'Dairy & Eggs',
  'Meat & Seafood',
  'Bakery',
  'Pantry',
  'Sauces & Condiments'
];

export const IngredientCombobox: React.FC<IngredientComboboxProps> = ({
  ingredients,
  value,
  onChange,
  onSelectIngredient,
  onAddCustomIngredient,
  placeholder = 'Select or type ingredient (e.g. Avocado)...',
  categoryFilter,
  disabled = false,
  dropdownPosition = 'top'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered ingredients list based on search value and category pill
  const filteredIngredients = useMemo(() => {
    const q = (value || '').trim().toLowerCase();
    return ingredients.filter((ing) => {
      // Category filter
      if (activeCategory !== 'All' && ing.category !== activeCategory) {
        return false;
      }
      if (categoryFilter && activeCategory === 'All' && ing.category !== categoryFilter) {
        // Soft match if parent specified categoryFilter and category is 'All'
        // Allow user to still see others if they search
      }
      if (!q) return true;
      return (
        ing.name.toLowerCase().includes(q) ||
        ing.category.toLowerCase().includes(q)
      );
    });
  }, [ingredients, value, activeCategory, categoryFilter]);

  // Reset highlighted index on list change
  useEffect(() => {
    setHighlightedIndex(filteredIngredients.length > 0 ? 0 : -1);
  }, [filteredIngredients.length, value, activeCategory]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (isOpen && listboxRef.current && highlightedIndex >= 0) {
      const items = listboxRef.current.querySelectorAll('li[role="option"]');
      if (items[highlightedIndex]) {
        (items[highlightedIndex] as HTMLElement).scrollIntoView({
          block: 'nearest'
        });
      }
    }
  }, [highlightedIndex, isOpen]);

  const handleSelect = (ingredient: MasterIngredient) => {
    onSelectIngredient(ingredient);
    onChange(ingredient.name, ingredient);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    const directMatch = ingredients.find(
      (i) => i.name.toLowerCase() === newText.trim().toLowerCase()
    );
    onChange(newText, directMatch);
    if (!isOpen) setIsOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else if (filteredIngredients.length > 0) {
        setHighlightedIndex((prev) => (prev + 1) % filteredIngredients.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else if (filteredIngredients.length > 0) {
        setHighlightedIndex((prev) =>
          prev <= 0 ? filteredIngredients.length - 1 : prev - 1
        );
      }
    } else if (e.key === 'Enter') {
      if (isOpen && highlightedIndex >= 0 && filteredIngredients[highlightedIndex]) {
        e.preventDefault();
        handleSelect(filteredIngredients[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  // Determine if typed value is not in ingredients list
  const isCustomEntry =
    value.trim().length > 0 &&
    !ingredients.some(
      (i) => i.name.toLowerCase() === value.trim().toLowerCase()
    );

  const handleAddCustom = (cat: IngredientCategory = 'Produce') => {
    if (!value.trim()) return;
    const newName = value.trim();
    if (onAddCustomIngredient) {
      onAddCustomIngredient({
        name: newName,
        category: cat,
        defaultQuantity: '1 portion',
        defaultDaysUntilExpiry: 3
      });
    }
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Combobox Input Box */}
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls="ingredient-combobox-list"
          className="w-full px-2.5 py-1.5 pr-14 text-xs bg-white border border-zinc-300 rounded focus:ring-1 focus:ring-red-500 focus:border-red-500 focus:outline-none font-medium text-zinc-900 transition-colors shadow-2xs"
        />

        <div className="absolute right-1.5 flex items-center gap-0.5">
          {value && (
            <button
              type="button"
              onClick={handleClear}
              title="Clear text"
              className="p-1 text-zinc-400 hover:text-zinc-600 rounded transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              setIsOpen((prev) => !prev);
              inputRef.current?.focus();
            }}
            title="Toggle ingredients list"
            className="p-1 text-zinc-500 hover:text-zinc-800 rounded transition-colors cursor-pointer"
          >
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-150 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Floating Dropdown Listbox */}
      {isOpen && (
        <div
          id="ingredient-combobox-list"
          className={`absolute z-60 left-0 right-0 bg-white rounded-lg border-2 border-zinc-900 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 ${
            dropdownPosition === 'top'
              ? 'bottom-full mb-1'
              : 'top-full mt-1'
          }`}
        >
          {/* Category Filter Tabs */}
          <div className="p-1.5 bg-zinc-900 border-b border-zinc-800 flex items-center gap-1 overflow-x-auto scrollbar-none text-[10px] font-['Oswald'] uppercase tracking-wider">
            <button
              type="button"
              onClick={() => setActiveCategory('All')}
              className={`px-2 py-0.5 rounded transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'All'
                  ? 'bg-amber-400 text-zinc-950 font-bold'
                  : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
              }`}
            >
              All ({ingredients.length})
            </button>
            {ALL_CATEGORIES.map((cat) => {
              const count = ingredients.filter((i) => i.category === cat).length;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-2 py-0.5 rounded transition-colors whitespace-nowrap cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-amber-400 text-zinc-950 font-bold'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          {/* Results List */}
          <ul
            ref={listboxRef}
            role="listbox"
            className="max-h-56 overflow-y-auto divide-y divide-zinc-100 text-xs"
          >
            {filteredIngredients.length > 0 ? (
              filteredIngredients.map((item, idx) => {
                const isSelected = item.name.toLowerCase() === value.trim().toLowerCase();
                const isHighlighted = idx === highlightedIndex;
                const colors = CATEGORY_COLORS[item.category] || CATEGORY_COLORS.Produce;

                return (
                  <li
                    key={item.id}
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    onClick={() => handleSelect(item)}
                    className={`px-3 py-2 flex items-center justify-between cursor-pointer transition-colors ${
                      isHighlighted
                        ? 'bg-amber-50 text-zinc-950 font-semibold'
                        : isSelected
                        ? 'bg-red-50 text-red-950'
                        : 'text-zinc-800 hover:bg-zinc-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${colors.dot}`}
                      />
                      <span className="truncate font-['Plus_Jakarta_Sans']">
                        {item.name}
                      </span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-red-600 shrink-0 ml-1" />
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {item.defaultQuantity && (
                        <span className="text-[10px] text-zinc-400 font-mono hidden sm:inline">
                          {item.defaultQuantity}
                        </span>
                      )}
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${colors.badge} font-mono`}
                      >
                        {item.category}
                      </span>
                    </div>
                  </li>
                );
              })
            ) : (
              <li className="p-4 text-center text-xs text-zinc-500">
                <Search className="w-4 h-4 mx-auto mb-1 text-zinc-400" />
                <p>No ingredient found matching &quot;{value}&quot;.</p>
              </li>
            )}
          </ul>

          {/* Custom Ingredient Creation Banner if typed text is unique */}
          {isCustomEntry && (
            <div className="p-2 bg-amber-50 border-t border-amber-200 flex items-center justify-between gap-2">
              <div className="text-[11px] text-amber-900 truncate">
                <span className="font-bold">Not in list?</span> Add &quot;{value.trim()}&quot; to master catalog
              </div>
              <button
                type="button"
                onClick={() => handleAddCustom('Produce')}
                className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 text-amber-300 text-[10px] font-bold uppercase tracking-wider rounded font-['Oswald'] shrink-0 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Save to List</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
