import React, { useState, useRef, useEffect } from 'react';
import { Filter, Check, X, ChevronDown, ChevronUp, Search, RotateCcw } from 'lucide-react';
import { Meal } from '../types';
import { mealMatchesTag, getTagDefinition } from '../utils/tagRegistry';

export const DEFAULT_FILTER_TAGS = [
  'High Protein',
  'Great Base',
  'Balanced',
  'Classics',
  'Quick ≤20m',
  'Batch Hero',
  'Slow Burn',
  'Summer',
  'Winter',
  'High Fiber',
  'Vegetarian'
];

export interface TagMultiSelectDropdownProps {
  recipes: Meal[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  onClearAll: () => void;
  onSelectAll?: () => void;
  availableTags?: string[];
  filterMode?: 'and' | 'or';
  onFilterModeChange?: (mode: 'and' | 'or') => void;
  className?: string;
}

export const TagMultiSelectDropdown: React.FC<TagMultiSelectDropdownProps> = ({
  recipes,
  selectedTags,
  onToggleTag,
  onClearAll,
  onSelectAll,
  availableTags,
  filterMode = 'and',
  onFilterModeChange,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tagSearch, setTagSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Compute all available tags (curated + any tags present in current recipes)
  const allTags = React.useMemo(() => {
    if (availableTags && availableTags.length > 0) {
      return availableTags;
    }
    const set = new Set<string>();
    // Add default curated tags first
    DEFAULT_FILTER_TAGS.forEach((t) => set.add(t));
    // Add any tags present on recipes
    recipes.forEach((r) => {
      if (Array.isArray(r.tags)) {
        r.tags.forEach((t) => set.add(t));
      }
    });
    return Array.from(set);
  }, [availableTags, recipes]);

  // Compute recipe counts for each tag
  const tagCounts = React.useMemo(() => {
    const counts = new Map<string, number>();
    allTags.forEach((tagName) => {
      const count = recipes.filter((r) => mealMatchesTag(r, tagName)).length;
      counts.set(tagName, count);
    });
    return counts;
  }, [allTags, recipes]);

  // Filter tags by search query and only show tags with at least 1 recipe
  const visibleTags = React.useMemo(() => {
    return allTags
      .filter((tag) => {
        const count = tagCounts.get(tag) || 0;
        if (count === 0) return false;
        if (!tagSearch.trim()) return true;
        const def = getTagDefinition(tag);
        return (
          def.label.toLowerCase().includes(tagSearch.toLowerCase()) ||
          tag.toLowerCase().includes(tagSearch.toLowerCase())
        );
      })
      .sort((a, b) => {
        // Prioritize selected tags first, then by count descending
        const aSelected = selectedTags.some((t) => getTagDefinition(t).id === getTagDefinition(a).id);
        const bSelected = selectedTags.some((t) => getTagDefinition(t).id === getTagDefinition(b).id);
        if (aSelected && !bSelected) return -1;
        if (!aSelected && bSelected) return 1;
        return (tagCounts.get(b) || 0) - (tagCounts.get(a) || 0);
      });
  }, [allTags, tagCounts, tagSearch, selectedTags]);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const hasActiveSelection = selectedTags.length > 0;

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`flex items-center gap-2 px-3 py-2 bg-white rounded-lg border-2 text-xs font-['Oswald'] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs ${
            hasActiveSelection
              ? 'border-red-600 bg-red-50/40 text-zinc-950 ring-1 ring-red-500'
              : 'border-zinc-800 hover:border-red-600 text-zinc-800 hover:bg-zinc-50'
          }`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <Filter className={`w-3.5 h-3.5 ${hasActiveSelection ? 'text-red-600' : 'text-zinc-500'}`} />
          <span>Tags</span>

          {hasActiveSelection ? (
            <span className="flex items-center gap-1">
              <span className="px-1.5 py-0.2 rounded font-mono text-[10px] font-black bg-amber-400 text-zinc-950 border border-amber-500">
                {selectedTags.length}
              </span>
              <span className="text-[10px] text-zinc-500 font-mono lowercase">
                ({filterMode})
              </span>
            </span>
          ) : (
            <span className="text-zinc-400 font-normal lowercase font-mono text-[11px]">all</span>
          )}

          {isOpen ? (
            <ChevronUp className="w-3.5 h-3.5 text-zinc-500 ml-0.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-zinc-500 ml-0.5" />
          )}
        </button>

        {/* Quick clear button on trigger when tags are active */}
        {hasActiveSelection && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClearAll();
            }}
            title="Clear all selected tags"
            className="ml-1 p-1 text-zinc-400 hover:text-red-600 rounded hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Dropdown Popover */}
      {isOpen && (
        <div className="absolute left-0 mt-1.5 w-76 sm:w-84 bg-white rounded-xl shadow-2xl border-2 border-zinc-900 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
          {/* Popover Header */}
          <div className="px-3.5 py-2.5 bg-zinc-950 text-amber-50 flex items-center justify-between border-b-2 border-red-600">
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-['Oswald'] font-black uppercase tracking-wider text-xs text-white">
                Filter by Tags
              </span>
              {hasActiveSelection && (
                <span className="px-1.5 py-0.2 bg-red-600 text-white rounded font-mono text-[10px] font-bold">
                  {selectedTags.length} selected
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono">
              {hasActiveSelection && (
                <button
                  type="button"
                  onClick={onClearAll}
                  className="text-amber-400 hover:text-white uppercase font-bold underline cursor-pointer"
                >
                  Clear All
                </button>
              )}
              {onSelectAll && visibleTags.length > 0 && (
                <button
                  type="button"
                  onClick={onSelectAll}
                  className="text-zinc-400 hover:text-white uppercase cursor-pointer"
                >
                  Select All
                </button>
              )}
            </div>
          </div>

          {/* Match Mode Toggle (AND vs OR) */}
          {onFilterModeChange && (
            <div className="px-3 py-1.5 bg-zinc-100 border-b border-zinc-200 flex items-center justify-between text-xs">
              <span className="text-[11px] font-mono text-zinc-600">
                Match dishes with:
              </span>
              <div className="flex items-center bg-zinc-200 p-0.5 rounded border border-zinc-300 font-['Oswald']">
                <button
                  type="button"
                  onClick={() => onFilterModeChange('and')}
                  className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold transition-all cursor-pointer ${
                    filterMode === 'and'
                      ? 'bg-zinc-900 text-amber-300 shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                  title="Dishes must contain ALL selected tags (narrower)"
                >
                  All Tags (AND)
                </button>
                <button
                  type="button"
                  onClick={() => onFilterModeChange('or')}
                  className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold transition-all cursor-pointer ${
                    filterMode === 'or'
                      ? 'bg-zinc-900 text-amber-300 shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                  title="Dishes can contain ANY selected tag (broader)"
                >
                  Any Tag (OR)
                </button>
              </div>
            </div>
          )}

          {/* Tag Search Input */}
          <div className="p-2 border-b border-zinc-200 bg-zinc-50">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-2" />
              <input
                type="text"
                placeholder="Find a tag (e.g. Protein, Quick, Vegan)..."
                value={tagSearch}
                onChange={(e) => setTagSearch(e.target.value)}
                className="w-full pl-8 pr-7 py-1 bg-white border border-zinc-300 rounded text-xs focus:ring-1 focus:ring-red-500 focus:outline-none"
              />
              {tagSearch && (
                <button
                  type="button"
                  onClick={() => setTagSearch('')}
                  className="absolute right-2 top-1.5 text-zinc-400 hover:text-zinc-700"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Tags List */}
          <div className="max-h-56 overflow-y-auto p-1.5 space-y-0.5 scrollbar-thin">
            {visibleTags.length === 0 ? (
              <div className="p-4 text-center text-xs text-zinc-500 italic">
                No matching tags found.
              </div>
            ) : (
              visibleTags.map((tag) => {
                const def = getTagDefinition(tag);
                const isSelected = selectedTags.some(
                  (t) => getTagDefinition(t).id === def.id
                );
                const count = tagCounts.get(tag) || 0;

                return (
                  <button
                    key={def.id}
                    type="button"
                    onClick={() => onToggleTag(def.label)}
                    className={`w-full text-left px-2 py-1.5 rounded flex items-center justify-between text-xs transition-colors group cursor-pointer ${
                      isSelected
                        ? 'bg-amber-100/70 text-zinc-950 font-semibold'
                        : 'hover:bg-zinc-100 text-zinc-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {/* Checkbox */}
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0 ${
                          isSelected
                            ? 'bg-red-600 border-zinc-900 text-white'
                            : 'border-zinc-300 bg-white group-hover:border-zinc-500'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>

                      {/* Tag preview */}
                      <span className="shrink-0">{def.emoji}</span>
                      <span className="font-['Oswald'] uppercase tracking-wider text-xs truncate">
                        {def.label}
                      </span>
                    </div>

                    {/* Dish count badge */}
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold shrink-0 ${
                        isSelected
                          ? 'bg-red-600 text-white'
                          : 'bg-zinc-100 text-zinc-600 group-hover:bg-zinc-200'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })
            )}
          </div>

          {/* Popover Footer */}
          <div className="px-3 py-2 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between">
            <span className="text-[11px] font-mono text-zinc-500">
              {hasActiveSelection
                ? `${selectedTags.length} tag${selectedTags.length > 1 ? 's' : ''} applied`
                : 'No tags selected'}
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 bg-zinc-900 hover:bg-red-600 text-white rounded text-[11px] font-['Oswald'] font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
