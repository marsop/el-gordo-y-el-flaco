import React, { useState } from 'react';
import { X, Plus, Trash2, Save, ChefHat, RotateCcw, Layers } from 'lucide-react';
import { Meal, Ingredient, MealType, LeftoverSuitability } from '../types';

interface MealModalProps {
  isOpen: boolean;
  onClose: () => void;
  meal: Meal;
  dayName: string;
  onSave: (updated: Meal) => void;
}

export const MealModal: React.FC<MealModalProps> = ({
  isOpen,
  onClose,
  meal,
  dayName,
  onSave
}) => {
  const [title, setTitle] = useState(meal.title);
  const [prepTime, setPrepTime] = useState(meal.prepTime);
  const [cookTime, setCookTime] = useState(meal.cookTime);
  const [calories, setCalories] = useState(meal.calorieEstimate || 550);
  const [notes, setNotes] = useState(meal.notes);
  const [gordoPortionNotes, setGordoPortionNotes] = useState(meal.gordoPortionNotes || '');
  const [flacoPortionNotes, setFlacoPortionNotes] = useState(meal.flacoPortionNotes || '');
  const [tagsInput, setTagsInput] = useState(meal.tags.join(', '));
  const [ingredients, setIngredients] = useState<Ingredient[]>(meal.ingredients);

  // Leftover & Batch cooking state
  const [isLeftover, setIsLeftover] = useState(!!meal.isLeftover);
  const [isBatchCook, setIsBatchCook] = useState(!!meal.isBatchCook);
  const [leftoverSuitability, setLeftoverSuitability] = useState<LeftoverSuitability>(
    meal.leftoverSuitability || 'good'
  );
  const [reheatInstructions, setReheatInstructions] = useState(
    meal.reheatInstructions || ''
  );

  // New ingredient row state
  const [newIngName, setNewIngName] = useState('');
  const [newIngAmount, setNewIngAmount] = useState('');
  const [newIngCat, setNewIngCat] = useState<Ingredient['category']>('Produce');

  if (!isOpen) return null;

  const handleAddIngredient = () => {
    if (!newIngName.trim()) return;
    setIngredients([
      ...ingredients,
      {
        id: `ing-${Date.now()}`,
        name: newIngName.trim(),
        amount: newIngAmount.trim() || 'To taste',
        category: newIngCat
      }
    ]);
    setNewIngName('');
    setNewIngAmount('');
  };

  const handleRemoveIngredient = (id: string) => {
    setIngredients(ingredients.filter((i) => i.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: Meal = {
      ...meal,
      title: title.trim(),
      prepTime: isLeftover ? 3 : (Number(prepTime) || 10),
      cookTime: isLeftover ? 0 : (Number(cookTime) || 10),
      calorieEstimate: Number(calories) || undefined,
      notes: notes.trim(),
      gordoPortionNotes: gordoPortionNotes.trim(),
      flacoPortionNotes: flacoPortionNotes.trim(),
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
      ingredients,
      isLeftover,
      isBatchCook: isLeftover ? false : isBatchCook,
      batchServings: isBatchCook ? 4 : 2,
      leftoverSuitability,
      reheatInstructions: reheatInstructions.trim()
    };
    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border-4 border-zinc-900 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-zinc-950 text-amber-50 flex items-center justify-between border-b-2 border-red-600">
          <div className="flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-xl font-black uppercase tracking-wider font-['Oswald'] text-white">
                Customize Recipe · {dayName} {meal.mealType.toUpperCase()}
              </h3>
              <p className="text-xs text-zinc-400">
                Adjust ingredients, cooking effort, batch preservation, and portions.
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto text-xs">
          <div>
            <label className="block font-bold uppercase tracking-wider text-zinc-800 font-['Oswald'] mb-1">
              Dish Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-zinc-300 rounded focus:ring-2 focus:ring-red-500 focus:outline-none font-semibold text-zinc-900"
            />
          </div>

          {/* Leftover & Batch Preservation Settings */}
          <div className="p-3.5 bg-teal-50/70 border border-teal-200 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold uppercase tracking-wider text-teal-950 font-['Oswald'] flex items-center gap-1.5">
                <RotateCcw className="w-4 h-4 text-teal-700" />
                Leftover & Multi-Day Preservation Strategy
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <label className="flex items-start gap-2 cursor-pointer p-2 bg-white rounded border border-teal-200">
                <input
                  type="checkbox"
                  checked={isLeftover}
                  onChange={(e) => setIsLeftover(e.target.checked)}
                  className="mt-0.5 rounded border-zinc-300 text-teal-600 focus:ring-teal-500"
                />
                <div>
                  <span className="font-bold text-zinc-900 block font-['Plus_Jakarta_Sans']">
                    This is a Reheat Leftover Meal
                  </span>
                  <span className="text-[11px] text-zinc-500">
                    Sets cook time to 0m (3m reheat). Zero active kitchen effort.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-2 cursor-pointer p-2 bg-white rounded border border-teal-200">
                <input
                  type="checkbox"
                  disabled={isLeftover}
                  checked={isBatchCook}
                  onChange={(e) => setIsBatchCook(e.target.checked)}
                  className={`mt-0.5 rounded border-zinc-300 ${
                    meal.mealType === 'lunch'
                      ? 'text-amber-600 focus:ring-amber-500'
                      : 'text-red-800 focus:ring-red-700'
                  }`}
                />
                <div>
                  <span className="font-bold text-zinc-900 block font-['Plus_Jakarta_Sans']">
                    Cook Double Batch (4 Servings)
                  </span>
                  <span className="text-[11px] text-zinc-500">
                    {meal.mealType === 'lunch'
                      ? 'Cook extra lunch portions (Dark Yellow) to feed 2 people across two meals.'
                      : 'Cook extra dinner portions (Dark Red) tonight to feed tomorrow\'s lunch.'}
                  </span>
                </div>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block font-bold text-zinc-800 mb-1">
                  Multi-Day Keeping Quality
                </label>
                <select
                  value={leftoverSuitability}
                  onChange={(e) => setLeftoverSuitability(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 bg-white border border-zinc-300 rounded focus:ring-1 focus:ring-teal-500"
                >
                  <option value="excellent">Excellent (Keeps 3-4 days: stews, chili, bowls, pasta)</option>
                  <option value="good">Good (Keeps 2 days: fajitas, tenders, roasted items)</option>
                  <option value="cook_fresh_only">Cook Fresh Only (Burgers, fried fish, raw salads, runny eggs)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-zinc-800 mb-1">
                  Reheat Instructions
                </label>
                <input
                  type="text"
                  value={reheatInstructions}
                  onChange={(e) => setReheatInstructions(e.target.value)}
                  placeholder="e.g. Microwave 2 mins covered, or warm in skillet 3m"
                  className="w-full px-2.5 py-1.5 bg-white border border-zinc-300 rounded focus:ring-1 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold uppercase tracking-wider text-zinc-800 font-['Oswald'] mb-1">
                Prep Time (Min)
              </label>
              <input
                type="number"
                min="1"
                disabled={isLeftover}
                value={isLeftover ? 3 : prepTime}
                onChange={(e) => setPrepTime(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-white border border-zinc-300 rounded font-mono disabled:bg-zinc-100"
              />
            </div>
            <div>
              <label className="block font-bold uppercase tracking-wider text-zinc-800 font-['Oswald'] mb-1">
                Cook Time (Min)
              </label>
              <input
                type="number"
                min="0"
                disabled={isLeftover}
                value={isLeftover ? 0 : cookTime}
                onChange={(e) => setCookTime(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-white border border-zinc-300 rounded font-mono disabled:bg-zinc-100"
              />
            </div>
            <div>
              <label className="block font-bold uppercase tracking-wider text-zinc-800 font-['Oswald'] mb-1">
                Est. Calories / Serving
              </label>
              <input
                type="number"
                min="100"
                value={calories}
                onChange={(e) => setCalories(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-white border border-zinc-300 rounded font-mono"
              />
            </div>
          </div>

          {/* Portion Notes for Gordo & Flaco */}
          <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-lg space-y-3">
            <span className="font-bold uppercase tracking-wider text-zinc-800 font-['Oswald'] block">
              Two-Person Portion Customization
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-amber-700 font-['Oswald'] mb-1">
                  El Gordo (Hearty / Extra Portion)
                </label>
                <textarea
                  rows={2}
                  value={gordoPortionNotes}
                  onChange={(e) => setGordoPortionNotes(e.target.value)}
                  placeholder="e.g. Double patty, extra melted cheese, toasted buns"
                  className="w-full p-2 bg-white border border-zinc-300 rounded resize-none"
                />
              </div>
              <div>
                <label className="block font-bold text-teal-700 font-['Oswald'] mb-1">
                  El Flaco (Lean / Balanced Portion)
                </label>
                <textarea
                  rows={2}
                  value={flacoPortionNotes}
                  onChange={(e) => setFlacoPortionNotes(e.target.value)}
                  placeholder="e.g. Single patty, lettuce wrapped, lemon herb dressing"
                  className="w-full p-2 bg-white border border-zinc-300 rounded resize-none"
                />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block font-bold uppercase tracking-wider text-zinc-800 font-['Oswald'] mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. 80s Diner, Quick Prep, High Protein"
              className="w-full px-3 py-2 bg-white border border-zinc-300 rounded"
            />
          </div>

          {/* Ingredients for 2 People */}
          <div className="space-y-2">
            <label className="block font-bold uppercase tracking-wider text-zinc-800 font-['Oswald']">
              Ingredients List ({isBatchCook ? 'Double Batch - 4 Servings' : 'Serves 2 Diners'})
            </label>
            <div className="space-y-1.5 max-h-40 overflow-y-auto border border-zinc-200 rounded p-2 bg-zinc-50">
              {ingredients.map((ing) => (
                <div key={ing.id} className="flex items-center justify-between p-1.5 bg-white rounded border border-zinc-200">
                  <span className="font-semibold text-zinc-900">{ing.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-zinc-500">
                      {isBatchCook ? `${ing.amount} (×2)` : ing.amount}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(ing.id)}
                      className="p-1 text-zinc-400 hover:text-red-600 rounded cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Add Ingredient Row */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                placeholder="Ingredient name"
                value={newIngName}
                onChange={(e) => setNewIngName(e.target.value)}
                className="flex-1 px-2.5 py-1.5 bg-white border border-zinc-300 rounded"
              />
              <input
                type="text"
                placeholder="Qty for 2"
                value={newIngAmount}
                onChange={(e) => setNewIngAmount(e.target.value)}
                className="w-28 px-2.5 py-1.5 bg-white border border-zinc-300 rounded"
              />
              <button
                type="button"
                onClick={handleAddIngredient}
                className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded font-['Oswald'] uppercase font-bold cursor-pointer"
              >
                + Add
              </button>
            </div>
          </div>

          {/* Chef Prep Notes */}
          <div>
            <label className="block font-bold uppercase tracking-wider text-zinc-800 font-['Oswald'] mb-1">
              Chef Prep Tip / Notes
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Griddle hot for crispy lace edges. Toast buns with butter."
              className="w-full p-2 bg-white border border-zinc-300 rounded resize-none"
            />
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-zinc-300 text-zinc-700 hover:bg-zinc-100 rounded font-['Oswald'] uppercase font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 bg-red-600 hover:bg-red-500 text-white rounded font-['Oswald'] uppercase font-bold tracking-wider cursor-pointer shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Meal Plan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
