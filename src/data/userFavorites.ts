import { Meal } from '../types';

export const USER_FAVORITE_RECIPES: Meal[] = [
  // --- SPANISH & MEDITERRANEAN CLASSICS ---
  {
    id: 'fav-tortilla-patatas',
    title: 'Tortilla de Patatas & Mixed Salad',
    mealType: 'lunch',
    prepTime: 12,
    cookTime: 18,
    servings: 2,
    tags: ['User Favorite', 'Spanish Classic', 'Vegetarian'],
    calorieEstimate: 510,
    gordoPortionNotes: 'Thick wedge with crusty baguette slices & alioli',
    flacoPortionNotes: 'Generous tortilla slice with crisp mixed garden greens & vinaigrette',
    notes: 'Slow-poach diced potatoes and onions in olive oil until fork-tender. Flip with diner plate confidence!',
    leftoverSuitability: 'good',
    reheatInstructions: 'Delicious at room temperature or warm in dry skillet for 2 minutes.',
    ingredients: [
      { id: 'fav-i-1', name: 'Potatoes (Waxy)', amount: '4 medium diced', category: 'Produce' },
      { id: 'fav-i-2', name: 'Eggs', amount: '5 large', category: 'Dairy & Eggs', isExpiring: true },
      { id: 'fav-i-3', name: 'Yellow Onion', amount: '1 medium', category: 'Produce' },
      { id: 'fav-i-4', name: 'Extra Virgin Olive Oil', amount: '3 tbsp', category: 'Pantry' },
      { id: 'fav-i-5', name: 'Mixed Salad Greens', amount: '2 cups', category: 'Produce' }
    ]
  },
  {
    id: 'fav-arroz-tres-delicias',
    title: 'Arroz Tres Delicias (Three-Flavor Fried Rice)',
    mealType: 'lunch',
    prepTime: 10,
    cookTime: 12,
    servings: 2,
    tags: ['User Favorite', 'Takeout Style', 'Batch Friendly'],
    calorieEstimate: 490,
    gordoPortionNotes: 'Extra heap of fried rice with diced ham & drizzle of toasted sesame oil',
    flacoPortionNotes: 'Heavy on sweet green peas, fluffy egg ribbons & side of pickled cucumber',
    notes: 'Use cold day-old jasmine rice for separate grains! High skillet heat with wok-style tossing.',
    leftoverSuitability: 'excellent',
    reheatInstructions: 'Reheats wonderfully. Toss in hot pan with 1 tsp water or microwave 90 seconds covered.',
    ingredients: [
      { id: 'fav-i-6', name: 'Cooked Long Grain Rice', amount: '3 cups cold', category: 'Pantry' },
      { id: 'fav-i-7', name: 'Sweet Green Peas', amount: '1 cup', category: 'Produce' },
      { id: 'fav-i-8', name: 'Eggs (scrambled ribbons)', amount: '2 eggs', category: 'Dairy & Eggs', isExpiring: true },
      { id: 'fav-i-9', name: 'Diced Ham or Cooked Shrimp', amount: '120g', category: 'Meat & Seafood' },
      { id: 'fav-i-10', name: 'Soy Sauce & Sesame Oil', amount: '2 tbsp', category: 'Sauces & Condiments' }
    ]
  },
  {
    id: 'fav-croquetas',
    title: 'Crispy Jamón Croquetas & Tomato Salad',
    mealType: 'dinner',
    prepTime: 15,
    cookTime: 15,
    servings: 2,
    tags: ['User Favorite', 'Tapas Classic', 'Crispy Golden'],
    calorieEstimate: 580,
    gordoPortionNotes: '8 golden croquetas with toasted bread & bravas sauce',
    flacoPortionNotes: '4 croquetas with oversized sliced tomato salad & oregano',
    notes: 'Silky béchamel interior with golden panko crust fried to crunchy perfection.',
    leftoverSuitability: 'good',
    reheatInstructions: 'Crisp back up in air fryer or toaster oven at 380°F for 4 mins.',
    ingredients: [
      { id: 'fav-i-11', name: 'Prepared Croquetas (Jamón or Mushroom)', amount: '10-12 pieces', category: 'Pantry' },
      { id: 'fav-i-12', name: 'Ripe Vine Tomatoes', amount: '2 large', category: 'Produce' },
      { id: 'fav-i-13', name: 'Olive Oil & Sea Salt', amount: 'To taste', category: 'Pantry' }
    ]
  },
  {
    id: 'fav-russian-salad',
    title: 'Ensaladilla Rusa (Russian Potato Salad with Tuna)',
    mealType: 'lunch',
    prepTime: 15,
    cookTime: 10,
    servings: 2,
    tags: ['User Favorite', 'Make Ahead', 'Cold Classic'],
    calorieEstimate: 470,
    gordoPortionNotes: 'Heaping scoop served with crispy breadsticks (picos) & olives',
    flacoPortionNotes: 'Light olive oil mayonnaise dressing with hard-boiled egg quarters & red pepper strips',
    notes: 'Tastes even better chilled! Gently fold cooked potatoes, carrots, peas, tuna and light mayo.',
    leftoverSuitability: 'excellent',
    reheatInstructions: 'Eaten chilled straight from the fridge. Keeps in airtight container for up to 3 days.',
    ingredients: [
      { id: 'fav-i-14', name: 'Potatoes & Carrots', amount: '3 potatoes + 2 carrots diced', category: 'Produce' },
      { id: 'fav-i-15', name: 'Quality Canned Tuna', amount: '2 cans drained', category: 'Meat & Seafood' },
      { id: 'fav-i-16', name: 'Green Peas', amount: '1/2 cup', category: 'Produce' },
      { id: 'fav-i-17', name: 'Hard Boiled Eggs', amount: '2 eggs', category: 'Dairy & Eggs', isExpiring: true },
      { id: 'fav-i-18', name: 'Mayonnaise & Piquillo Peppers', amount: '3 tbsp', category: 'Sauces & Condiments' }
    ]
  },

  // --- ALPINE & CENTRAL EUROPEAN COMFORT ---
  {
    id: 'fav-kasspatzle',
    title: 'Kässpätzle with Caramelized Onions & Side Salad',
    mealType: 'dinner',
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    tags: ['User Favorite', 'Alpine Classic', 'Batch Hero'],
    calorieEstimate: 690,
    gordoPortionNotes: 'Extra cheese pull (Bergkäse & Emmentaler) with crispy roasted onions',
    flacoPortionNotes: 'Balanced portion with crisp garden salad tossed in apple cider vinaigrette',
    notes: 'Layer hot boiled Spätzle with grated alpine cheese. Let rest 2 minutes under lid to melt into gooey glory.',
    leftoverSuitability: 'excellent',
    reheatInstructions: 'Phenomenal leftovers! Fry in butter in skillet until bottom gets golden and crispy.',
    ingredients: [
      { id: 'fav-i-19', name: 'Egg Spätzle', amount: '350g fresh or dry', category: 'Pantry' },
      { id: 'fav-i-20', name: 'Aged Mountain Cheese (Bergkäse/Emmentaler)', amount: '180g grated', category: 'Dairy & Eggs', isExpiring: true },
      { id: 'fav-i-21', name: 'Yellow Onions (for browning)', amount: '2 large sliced', category: 'Produce' },
      { id: 'fav-i-22', name: 'Butter', amount: '2 tbsp', category: 'Dairy & Eggs' },
      { id: 'fav-i-23', name: 'Green Side Salad', amount: '2 cups', category: 'Produce' }
    ]
  },
  {
    id: 'fav-spinatspatzle',
    title: 'Spinatspätzle in Creamy Mushroom Sauce',
    mealType: 'dinner',
    prepTime: 15,
    cookTime: 18,
    servings: 2,
    tags: ['User Favorite', 'Comfort Food', 'Vegetarian'],
    calorieEstimate: 590,
    gordoPortionNotes: 'Generous bowl with rich parmesan cream & pan-seared mushrooms',
    flacoPortionNotes: 'Tossed in light garlic herb broth with fresh cherry tomatoes',
    notes: 'Vibrant green spinach spätzle sauteed with cremini mushrooms and fresh parsley.',
    leftoverSuitability: 'excellent',
    reheatInstructions: 'Reheat in skillet with splash of milk or water for 2-3 minutes.',
    ingredients: [
      { id: 'fav-i-24', name: 'Spinach Spätzle', amount: '350g', category: 'Pantry' },
      { id: 'fav-i-25', name: 'Baby Spinach', amount: '100g', category: 'Produce', isExpiring: true },
      { id: 'fav-i-26', name: 'Cremini Mushrooms', amount: '200g sliced', category: 'Produce' },
      { id: 'fav-i-27', name: 'Cream or Oat Cream', amount: '150ml', category: 'Dairy & Eggs' },
      { id: 'fav-i-28', name: 'Parmesan Cheese', amount: '3 tbsp grated', category: 'Dairy & Eggs' }
    ]
  },
  {
    id: 'fav-kasefladen',
    title: 'Käsefladen (Warm Alpine Cheese Tart)',
    mealType: 'dinner',
    prepTime: 12,
    cookTime: 25,
    servings: 2,
    tags: ['User Favorite', 'Alpine Classic', 'Comfort Food'],
    calorieEstimate: 630,
    gordoPortionNotes: 'Two large golden baked squares with spicy mustard dip',
    flacoPortionNotes: 'One square paired with warm barley soup or green herb salad',
    notes: 'Crisp pastry base topped with rich savory onion and alpine cheese custard baked golden brown.',
    leftoverSuitability: 'good',
    reheatInstructions: 'Reheat in oven or air fryer at 350°F for 5 minutes to crisp the crust.',
    ingredients: [
      { id: 'fav-i-29', name: 'Fladen Pastry / Shortcrust', amount: '1 rolled sheet', category: 'Bakery' },
      { id: 'fav-i-30', name: 'Grated Swiss or Alpine Cheese', amount: '200g', category: 'Dairy & Eggs', isExpiring: true },
      { id: 'fav-i-31', name: 'Eggs & Milk / Cream', amount: '2 eggs + 100ml milk', category: 'Dairy & Eggs', isExpiring: true },
      { id: 'fav-i-32', name: 'Finely chopped Onions', amount: '1 onion', category: 'Produce' }
    ]
  },
  {
    id: 'fav-schnitzel',
    title: 'Golden Crispy Schnitzel & Warm Potato Salad',
    mealType: 'dinner',
    prepTime: 15,
    cookTime: 15,
    servings: 2,
    tags: ['User Favorite', 'Diner Classic', 'Crispy'],
    calorieEstimate: 660,
    gordoPortionNotes: 'Large cutlet with extra vinegar potato salad & lemon wedges',
    flacoPortionNotes: 'Lightly pan fried cutlet with cucumber salad & squeeze of fresh lemon',
    notes: 'Pound cutlets thin for that authentic soufflé crust ripple when frying!',
    leftoverSuitability: 'good',
    reheatInstructions: 'Warm in dry skillet or 375°F oven for 5 minutes so breading crisps back up.',
    ingredients: [
      { id: 'fav-i-33', name: 'Pork, Veal or Chicken Cutlets', amount: '350g', category: 'Meat & Seafood' },
      { id: 'fav-i-34', name: 'Flour, Egg, Breadcrumbs', amount: 'Standard breading kit', category: 'Pantry' },
      { id: 'fav-i-35', name: 'Potatoes (for Swabian warm salad)', amount: '4 potatoes', category: 'Produce' },
      { id: 'fav-i-36', name: 'Beef or Veg Broth & Vinegar', amount: '100ml', category: 'Pantry' },
      { id: 'fav-i-37', name: 'Lemon', amount: '1 sliced', category: 'Produce', isExpiring: true }
    ]
  },
  {
    id: 'fav-hirseauflauf',
    title: 'Hirseauflauf (Baked Millet & Vegetable Casserole)',
    mealType: 'dinner',
    prepTime: 15,
    cookTime: 30,
    servings: 2,
    tags: ['User Favorite', 'Wholesome', 'Batch Friendly'],
    calorieEstimate: 520,
    gordoPortionNotes: 'Baked with extra cheddar crust and steamed broccoli side',
    flacoPortionNotes: 'Golden slice with herb yogurt dip & grated carrot salad',
    notes: 'Fluffy golden millet cooked in broth and baked with zucchini, peppers, and cheese.',
    leftoverSuitability: 'excellent',
    reheatInstructions: 'Keeps 3 days. Reheat in oven or microwave covered for 2 minutes.',
    ingredients: [
      { id: 'fav-i-46', name: 'Millet (Hirse)', amount: '1 cup', category: 'Pantry' },
      { id: 'fav-i-47', name: 'Zucchini & Bell Pepper', amount: '1 of each diced', category: 'Produce', isExpiring: true },
      { id: 'fav-i-48', name: 'Eggs & Grated Cheese', amount: '2 eggs + 100g cheese', category: 'Dairy & Eggs', isExpiring: true },
      { id: 'fav-i-49', name: 'Vegetable Broth', amount: '2 cups', category: 'Pantry' }
    ]
  },
  {
    id: 'fav-barley-soup',
    title: 'Alpine Barley Soup (Gerstensuppe) with Crusty Bread',
    mealType: 'lunch',
    prepTime: 12,
    cookTime: 25,
    servings: 2,
    tags: ['User Favorite', 'Cozy Warm', 'Batch Hero'],
    calorieEstimate: 460,
    gordoPortionNotes: 'Large bowl with diced smoked ham & double buttered sourdough',
    flacoPortionNotes: 'Steaming bowl with root vegetables & fresh chives',
    notes: 'Rich alpine soup made with pearl barley, carrots, leeks, and cream. Pure comfort in a bowl.',
    leftoverSuitability: 'excellent',
    reheatInstructions: 'Soup thickens nicely overnight. Add splash of water or broth and simmer 3 mins.',
    ingredients: [
      { id: 'fav-i-50', name: 'Pearl Barley', amount: '3/4 cup', category: 'Pantry' },
      { id: 'fav-i-51', name: 'Carrots, Celery, Leek', amount: '1 cup diced', category: 'Produce' },
      { id: 'fav-i-52', name: 'Vegetable or Beef Broth', amount: '4 cups', category: 'Pantry' },
      { id: 'fav-i-53', name: 'Fresh Crusty Bread', amount: '4 slices', category: 'Bakery' }
    ]
  },

  // --- BAKED PASTA & CASSEROLES ---
  {
    id: 'fav-lasagne',
    title: 'Classic Lasagne al Forno with Golden Cheese Crust',
    mealType: 'dinner',
    prepTime: 20,
    cookTime: 35,
    servings: 2,
    tags: ['User Favorite', 'Batch Legend', 'Comfort Food'],
    calorieEstimate: 680,
    gordoPortionNotes: 'Center square slice with bubbling golden cheese & garlic bread',
    flacoPortionNotes: 'Moderate square slice with arugula & balsamic side salad',
    notes: 'Layers of rich slow-simmered bolognese or lentil marinara, creamy béchamel, and melted mozzarella.',
    leftoverSuitability: 'excellent',
    reheatInstructions: 'The undisputed leftover king! Flavors consolidate. Reheat in oven at 350°F for 10m or microwave 2m.',
    ingredients: [
      { id: 'fav-i-54', name: 'Lasagne Pasta Sheets', amount: '8 sheets', category: 'Pantry' },
      { id: 'fav-i-55', name: 'Rich Tomato Meat or Veg Sauce', amount: '2.5 cups', category: 'Pantry' },
      { id: 'fav-i-56', name: 'Béchamel Sauce (Butter, Flour, Milk)', amount: '1.5 cups', category: 'Dairy & Eggs' },
      { id: 'fav-i-57', name: 'Mozzarella & Parmesan', amount: '150g shredded', category: 'Dairy & Eggs', isExpiring: true }
    ]
  },
  {
    id: 'fav-shepherds-pie',
    title: 'Hearty Shepherd’s Pie with Golden Potato Mash Crust',
    mealType: 'dinner',
    prepTime: 20,
    cookTime: 30,
    servings: 2,
    tags: ['User Favorite', 'Comfort Classic', 'Batch Hero'],
    calorieEstimate: 640,
    gordoPortionNotes: 'Deep scoop with browned butter mash ridges and extra savory gravy',
    flacoPortionNotes: 'Scoop with tender peas, sweet carrots & steamed green beans',
    notes: 'Savory simmered minced beef, lentils or lamb topped with fluffy piping-hot mashed potatoes.',
    leftoverSuitability: 'excellent',
    reheatInstructions: 'Keeps up to 4 days. Warm in toaster oven at 375°F to re-crisp the potato peaks.',
    ingredients: [
      { id: 'fav-i-62', name: 'Lean Minced Meat or Brown Lentils', amount: '400g', category: 'Meat & Seafood', isExpiring: true },
      { id: 'fav-i-63', name: 'Mashed Potatoes (Butter & Milk)', amount: '3 cups prepared', category: 'Produce' },
      { id: 'fav-i-64', name: 'Peas, Carrots & Onions', amount: '1.5 cups diced', category: 'Produce' },
      { id: 'fav-i-65', name: 'Tomato Paste & Worcestershire', amount: '2 tbsp', category: 'Sauces & Condiments' }
    ]
  },

  // --- STEWS, CHILI & CURRY ---
  {
    id: 'fav-chili-sin-carne',
    title: 'Chili Sin Carne with Sweet Corn & Smoked Cheddar',
    mealType: 'dinner',
    prepTime: 15,
    cookTime: 25,
    servings: 2,
    tags: ['User Favorite', 'Plant Protein', 'Batch Hero'],
    calorieEstimate: 540,
    gordoPortionNotes: 'Heaping bowl with crushed tortilla chips, diced onions & sour cream',
    flacoPortionNotes: 'Medium bowl with sliced avocado, fresh lime juice & cilantro leaves',
    notes: 'Simmered with black beans, kidney beans, sweet corn, cocoa powder, and smoked paprika.',
    leftoverSuitability: 'excellent',
    reheatInstructions: 'Supreme leftover! The spices deepen beautifully. Microwave 2 mins or simmer in small pot.',
    ingredients: [
      { id: 'fav-i-66', name: 'Black Beans & Kidney Beans', amount: '2 cans rinsed', category: 'Pantry' },
      { id: 'fav-i-67', name: 'Sweet Corn', amount: '1 cup', category: 'Pantry' },
      { id: 'fav-i-68', name: 'Crushed Fire-Roasted Tomatoes', amount: '1 large can', category: 'Pantry' },
      { id: 'fav-i-69', name: 'Bell Pepper & Onion', amount: '1 of each', category: 'Produce', isExpiring: true },
      { id: 'fav-i-70', name: 'Smoked Cheddar or Crema', amount: '3 tbsp', category: 'Dairy & Eggs', isExpiring: true }
    ]
  },
  {
    id: 'fav-curry-garam-masala',
    title: 'Aromatic Garam Masala Chickpea & Veggie Curry',
    mealType: 'dinner',
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    tags: ['User Favorite', 'Curry Lover', 'Batch Hero'],
    calorieEstimate: 560,
    gordoPortionNotes: 'Double scoop over basmati rice with warm toasted naan bread',
    flacoPortionNotes: 'Coconut curry bowl with baby spinach wilted in & squeeze of lime',
    notes: 'Toasted garam masala, turmeric, ginger, and coconut milk simmered until fragrant and creamy.',
    leftoverSuitability: 'excellent',
    reheatInstructions: 'Curry is always better the next day! Warm 3 mins in saucepan or microwave covered.',
    ingredients: [
      { id: 'fav-i-71', name: 'Chickpeas or Chicken Strips', amount: '1 can or 350g chicken', category: 'Pantry' },
      { id: 'fav-i-72', name: 'Coconut Milk', amount: '1 can (400ml)', category: 'Pantry' },
      { id: 'fav-i-73', name: 'Garam Masala & Turmeric', amount: '2 tbsp', category: 'Pantry' },
      { id: 'fav-i-74', name: 'Baby Spinach & Bell Pepper', amount: '100g spinach + 1 pepper', category: 'Produce', isExpiring: true },
      { id: 'fav-i-75', name: 'Basmati Rice', amount: '1 cup dry', category: 'Pantry' }
    ]
  },
  {
    id: 'fav-shakshuka',
    title: 'Shakshuka (Eggs Poached in Spiced Tomato Pepper Sauce)',
    mealType: 'lunch',
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    tags: ['User Favorite', 'Quick 15m', 'Skillet Classic'],
    calorieEstimate: 480,
    gordoPortionNotes: '3 eggs in sauce with crumbled feta & half a crusty baguette',
    flacoPortionNotes: '2 eggs with fresh cilantro, avocado slices & warm pita bread',
    notes: 'Simmer peppers and tomatoes with cumin and paprika, then crack eggs into sauce wells until just set.',
    leftoverSuitability: 'cook_fresh_only',
    reheatInstructions: 'Cook fresh! Poached runny yolks are best eaten immediately with crusty bread.',
    ingredients: [
      { id: 'fav-i-76', name: 'Fresh Eggs', amount: '4-5 eggs', category: 'Dairy & Eggs', isExpiring: true },
      { id: 'fav-i-77', name: 'Crushed Tomatoes', amount: '1 can (400g)', category: 'Pantry' },
      { id: 'fav-i-78', name: 'Red Bell Pepper & Onion', amount: '1 of each sliced', category: 'Produce', isExpiring: true },
      { id: 'fav-i-79', name: 'Feta Cheese & Cilantro', amount: '50g feta', category: 'Dairy & Eggs' },
      { id: 'fav-i-80', name: 'Crusty Bread or Pita', amount: '4 slices', category: 'Bakery' }
    ]
  },

  // --- BURGERS, WRAPS, PIZZA & DINER FAVORITES ---
  {
    id: 'fav-burgers-veggies-oven',
    title: 'Burgers + Roasted Veggies in the Oven',
    mealType: 'dinner',
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    tags: ['User Favorite', '80s Diner', 'Eat Fresh'],
    calorieEstimate: 690,
    gordoPortionNotes: 'Double patty burger with melted cheddar, toasted brioche & herb roasted potato wedges',
    flacoPortionNotes: 'Single patty burger on toasted bun with tray of roasted zucchini, peppers & garlic dip',
    notes: 'Roast potatoes and bell peppers on sheet pan at 400°F while searing juicy smash burgers on skillet.',
    leftoverSuitability: 'cook_fresh_only',
    reheatInstructions: 'Burgers must be enjoyed fresh! Oven veggies reheat well in skillet.',
    ingredients: [
      { id: 'fav-i-81', name: 'Ground Beef or Veggie Patties', amount: '400g', category: 'Meat & Seafood', isExpiring: true },
      { id: 'fav-i-82', name: 'Brioche Buns', amount: '2-4 buns', category: 'Bakery', isExpiring: true },
      { id: 'fav-i-83', name: 'Tray Veggies (Potatoes, Bell Peppers, Zucchini)', amount: '400g mixed', category: 'Produce', isExpiring: true },
      { id: 'fav-i-84', name: 'Smoked Cheddar Cheese', amount: '4 slices', category: 'Dairy & Eggs', isExpiring: true },
      { id: 'fav-i-85', name: 'Diner Burger Sauce & Pickles', amount: '3 tbsp', category: 'Sauces & Condiments' }
    ]
  },
  {
    id: 'fav-pizza-fresh',
    title: 'Homemade 80s Diner Pizza / Pizza Muffins',
    mealType: 'dinner',
    prepTime: 15,
    cookTime: 15,
    servings: 2,
    tags: ['User Favorite', 'Friday Night', 'Diner Comfort'],
    calorieEstimate: 650,
    gordoPortionNotes: 'Crispy thick crust with double mozzarella, mushrooms & spicy salami',
    flacoPortionNotes: 'Thin crust with marinara, roasted peppers, spinach & fresh basil',
    notes: 'Bake at maximum oven temperature (450°F / 230°C) on a preheated tray for bubbly crust blister.',
    leftoverSuitability: 'excellent',
    reheatInstructions: 'Cold pizza breakfast or re-crisp in dry skillet on medium heat for 3 mins covered with lid.',
    ingredients: [
      { id: 'fav-i-86', name: 'Pizza Dough or Muffin Halves', amount: '1 dough ball or 4 muffins', category: 'Bakery' },
      { id: 'fav-i-87', name: 'Tomato Pizza Sauce', amount: '1/2 cup', category: 'Sauces & Condiments' },
      { id: 'fav-i-88', name: 'Mozzarella Cheese', amount: '180g shredded', category: 'Dairy & Eggs', isExpiring: true },
      { id: 'fav-i-89', name: 'Favorite Toppings (Mushrooms, Peppers, Herbs)', amount: '1 cup', category: 'Produce', isExpiring: true }
    ]
  },
  {
    id: 'fav-fajitas-chicken',
    title: 'Sizzling Fajitas (Chicken, Quinoa, Beans & Guacamole)',
    mealType: 'dinner',
    prepTime: 15,
    cookTime: 15,
    servings: 2,
    tags: ['User Favorite', 'High Protein', 'Diner Sizzle'],
    calorieEstimate: 610,
    gordoPortionNotes: '4 warm flour tortillas, double chicken strips with charred peppers and salsa',
    flacoPortionNotes: 'Quinoa base bowl with grilled chicken, black beans, pico de gallo & guacamole',
    notes: 'Get the skillet screaming hot with a tablespoon of oil for authentic restaurant sizzle!',
    leftoverSuitability: 'good',
    reheatInstructions: 'Reheat chicken and peppers in hot skillet for 2 mins; assemble in fresh warm tortillas.',
    ingredients: [
      { id: 'fav-i-90', name: 'Chicken Breast or Quinoa & Black Beans', amount: '400g chicken or 1.5 cups quinoa/beans', category: 'Meat & Seafood' },
      { id: 'fav-i-91', name: 'Bell Peppers (Red, Green, Yellow)', amount: '2 sliced', category: 'Produce', isExpiring: true },
      { id: 'fav-i-92', name: 'Yellow Onion', amount: '1 sliced', category: 'Produce' },
      { id: 'fav-i-93', name: 'Avocado (for fresh guacamole)', amount: '2 avocados', category: 'Produce', isExpiring: true },
      { id: 'fav-i-94', name: 'Flour Tortillas', amount: '6 small', category: 'Bakery' }
    ]
  },
  {
    id: 'fav-wraps-chicken',
    title: 'Crispy Chicken & Veggie Crunch Wraps',
    mealType: 'lunch',
    prepTime: 10,
    cookTime: 8,
    servings: 2,
    tags: ['User Favorite', 'Quick 10m', 'Handheld'],
    calorieEstimate: 510,
    gordoPortionNotes: 'Two thick wraps loaded with chicken tenders, cheese & ranch dip',
    flacoPortionNotes: 'Wheat wrap packed with shredded carrots, cucumber, tender chicken & yogurt dressing',
    notes: 'Toast the wrapped burrito-fold seam-down in a dry pan for 2 minutes to seal it shut and make it crunchy!',
    leftoverSuitability: 'cook_fresh_only',
    reheatInstructions: 'Assemble fresh so veggies stay crisp and tortilla does not get soggy.',
    ingredients: [
      { id: 'fav-i-95', name: 'Cooked Chicken Strips or Tenders', amount: '300g', category: 'Meat & Seafood' },
      { id: 'fav-i-96', name: 'Large Flour Wraps', amount: '2-4 wraps', category: 'Bakery' },
      { id: 'fav-i-97', name: 'Shredded Lettuce & Carrots', amount: '2 cups', category: 'Produce' },
      { id: 'fav-i-98', name: 'Cheddar & Dressing', amount: '3 tbsp', category: 'Dairy & Eggs', isExpiring: true }
    ]
  },
  {
    id: 'fav-falafel-hummus',
    title: 'Falafel & Warm Hummus Mezze Plate with Pita',
    mealType: 'lunch',
    prepTime: 12,
    cookTime: 10,
    servings: 2,
    tags: ['User Favorite', 'Mediterranean', 'Plant Based'],
    calorieEstimate: 520,
    gordoPortionNotes: '8 crispy falafels with generous hummus swirl & 2 toasted warm pitas',
    flacoPortionNotes: '4 falafels with tabouleh salad, cucumber ribbons & tahini drizzle',
    notes: 'Warm pita bread on burner; spread velvety hummus with a swirl of olive oil and paprika.',
    leftoverSuitability: 'good',
    reheatInstructions: 'Crisp falafels in toaster oven or air fryer 3 mins. Hummus keeps in fridge 4 days.',
    ingredients: [
      { id: 'fav-i-99', name: 'Crispy Falafels', amount: '10-12 pieces', category: 'Pantry' },
      { id: 'fav-i-100', name: 'Creamy Hummus', amount: '1 tub (250g)', category: 'Pantry' },
      { id: 'fav-i-101', name: 'Pita Bread', amount: '2-4 pitas', category: 'Bakery' },
      { id: 'fav-i-102', name: 'Cucumber & Cherry Tomatoes', amount: '1 cup diced', category: 'Produce' }
    ]
  },
  {
    id: 'fav-salmon-oven',
    title: 'Salmon in the Oven with Roasted Potatoes & Herb Dill Sauce',
    mealType: 'dinner',
    prepTime: 10,
    cookTime: 18,
    servings: 2,
    tags: ['User Favorite', 'Heart Healthy', 'Sunday Special'],
    calorieEstimate: 590,
    gordoPortionNotes: 'Thick center-cut salmon fillet with double garlic butter roasted potatoes',
    flacoPortionNotes: 'Herb-crusted salmon with lemon slices & steamed green beans',
    notes: 'Bake salmon on parchment with lemon slices, dill, and a dash of olive oil at 380°F for 14-16 minutes.',
    leftoverSuitability: 'good',
    reheatInstructions: 'Reheat gently at low microwave power (50%) for 90 seconds so salmon stays tender.',
    ingredients: [
      { id: 'fav-i-103', name: 'Fresh Salmon Fillets', amount: '380g', category: 'Meat & Seafood' },
      { id: 'fav-i-104', name: 'Baby Potatoes', amount: '400g halved', category: 'Produce' },
      { id: 'fav-i-105', name: 'Fresh Dill & Lemon', amount: '1 lemon + dill', category: 'Produce', isExpiring: true },
      { id: 'fav-i-106', name: 'Olive Oil & Sea Salt', amount: '2 tbsp', category: 'Pantry' }
    ]
  },
  {
    id: 'fav-fish-sticks',
    title: 'Golden Fish Sticks with Potato Salad or Steamed Veggies',
    mealType: 'lunch',
    prepTime: 8,
    cookTime: 12,
    servings: 2,
    tags: ['User Favorite', 'Quick 15m', 'Diner Nostalgia'],
    calorieEstimate: 510,
    gordoPortionNotes: '8 golden crispy fish sticks with tartar dip & homemade potato salad',
    flacoPortionNotes: '5 fish sticks with steamed broccoli, carrots & fresh lemon wedges',
    notes: 'Pan fry or bake until golden crunchy. A nostalgic 80s fast-food comfort classic.',
    leftoverSuitability: 'cook_fresh_only',
    reheatInstructions: 'Cook fresh only! Reheating breaded fish sticks causes loss of crunch.',
    ingredients: [
      { id: 'fav-i-107', name: 'Crispy Breaded Fish Sticks', amount: '12-14 sticks', category: 'Meat & Seafood' },
      { id: 'fav-i-108', name: 'Potato Salad or Steamed Veggies', amount: '2 generous servings', category: 'Produce' },
      { id: 'fav-i-109', name: 'Tartar Sauce & Lemon', amount: '3 tbsp', category: 'Sauces & Condiments' }
    ]
  },
  {
    id: 'fav-chinese-noodles',
    title: 'Chinese Wok Noodles with Teriyaki Glaze & Vegetables',
    mealType: 'dinner',
    prepTime: 12,
    cookTime: 10,
    servings: 2,
    tags: ['User Favorite', 'Asian Noodle', 'Batch Hero'],
    calorieEstimate: 520,
    gordoPortionNotes: 'Big wok bowl with chicken or beef strips, extra teriyaki drizzle & peanuts',
    flacoPortionNotes: 'Egg noodles loaded with crisp snap peas, bell peppers, carrots & toasted sesame',
    notes: 'Toss boiled noodles into high-heat skillet with teriyaki, garlic, ginger, and vegetables.',
    leftoverSuitability: 'excellent',
    reheatInstructions: 'Noodles absorb the teriyaki glaze and taste incredible next day! Warm 2 mins in pan.',
    ingredients: [
      { id: 'fav-i-110', name: 'Chinese Egg Noodles or Ramen', amount: '200g dry', category: 'Pantry' },
      { id: 'fav-i-111', name: 'Bell Pepper, Carrots & Scallions', amount: '2 cups sliced', category: 'Produce', isExpiring: true },
      { id: 'fav-i-112', name: 'Teriyaki Sauce & Soy Sauce', amount: '4 tbsp', category: 'Sauces & Condiments' },
      { id: 'fav-i-113', name: 'Chicken, Tofu or Beef Strips', amount: '250g', category: 'Meat & Seafood' }
    ]
  },
  {
    id: 'fav-pasta-pesto',
    title: 'Gnocchi or Penne with Basil Pesto & Cherry Tomatoes',
    mealType: 'lunch',
    prepTime: 8,
    cookTime: 10,
    servings: 2,
    tags: ['User Favorite', 'Quick 10m', 'Italian Classic'],
    calorieEstimate: 540,
    gordoPortionNotes: 'Generous bowl of pan-crisped gnocchi with green pesto & grated parmesan',
    flacoPortionNotes: 'Penne tossed in basil pesto with toasted pine nuts & sweet burst cherry tomatoes',
    notes: 'Sear gnocchi in olive oil until golden on outside, then stir through vibrant basil pesto.',
    leftoverSuitability: 'good',
    reheatInstructions: 'Reheats nicely. Add a teaspoon of olive oil or water before warming.',
    ingredients: [
      { id: 'fav-i-114', name: 'Fresh Gnocchi or Penne Pasta', amount: '400g gnocchi or 220g penne', category: 'Pantry' },
      { id: 'fav-i-115', name: 'Basil Genovese Pesto', amount: '1 jar (150g)', category: 'Sauces & Condiments' },
      { id: 'fav-i-116', name: 'Cherry Tomatoes', amount: '1 cup halved', category: 'Produce' },
      { id: 'fav-i-117', name: 'Parmesan Cheese', amount: '3 tbsp grated', category: 'Dairy & Eggs', isExpiring: true }
    ]
  },
  {
    id: 'fav-quiche-frittata',
    title: 'Vegetable Quiche / Frittata with Mixed Salad',
    mealType: 'lunch',
    prepTime: 15,
    cookTime: 25,
    servings: 2,
    tags: ['User Favorite', 'Make Ahead', 'Batch Friendly'],
    calorieEstimate: 510,
    gordoPortionNotes: 'Two thick slices of quiche with warm crust & garlic dip',
    flacoPortionNotes: 'One slice of crustless vegetable frittata with oversized mixed herb salad',
    notes: 'Baked egg custard loaded with spinach, leeks, and gruyère cheese. Terrific hot or cold.',
    leftoverSuitability: 'excellent',
    reheatInstructions: 'Keeps 3 days! Slice cold for easy lunch or warm in toaster oven for 4 minutes.',
    ingredients: [
      { id: 'fav-i-118', name: 'Eggs & Milk / Cream', amount: '4 eggs + 120ml milk', category: 'Dairy & Eggs', isExpiring: true },
      { id: 'fav-i-119', name: 'Spinach, Leeks or Zucchini', amount: '1.5 cups', category: 'Produce', isExpiring: true },
      { id: 'fav-i-120', name: 'Grated Cheese', amount: '80g', category: 'Dairy & Eggs', isExpiring: true },
      { id: 'fav-i-121', name: 'Mixed Salad', amount: '2 cups', category: 'Produce' }
    ]
  },
  {
    id: 'fav-poke-bowl',
    title: 'Fresh Poke Bowl with Salmon, Edamame & Avocado',
    mealType: 'lunch',
    prepTime: 15,
    cookTime: 0,
    servings: 2,
    tags: ['User Favorite', 'Fresh & Light', 'Omega-3'],
    calorieEstimate: 520,
    gordoPortionNotes: 'Large bowl over seasoned sushi rice with extra salmon, spicy mayo & crispy onions',
    flacoPortionNotes: 'Half brown rice half cabbage base with diced avocado, cucumber & ponzu sesame',
    notes: 'Assemble vibrant bowls with marinated sashimi salmon or cooked tofu, edamame, and pickled ginger.',
    leftoverSuitability: 'cook_fresh_only',
    reheatInstructions: 'Eat fresh immediately! Raw fish and crisp vegetables must not be heated.',
    ingredients: [
      { id: 'fav-i-122', name: 'Sashimi Salmon or Marinated Tofu', amount: '300g diced', category: 'Meat & Seafood' },
      { id: 'fav-i-123', name: 'Sushi Rice (Seasoned)', amount: '2 cups cooked', category: 'Pantry' },
      { id: 'fav-i-124', name: 'Ripe Avocado & Edamame', amount: '1 avocado + 1/2 cup edamame', category: 'Produce', isExpiring: true },
      { id: 'fav-i-125', name: 'Soy Sauce, Sesame Oil & Spicy Mayo', amount: '3 tbsp', category: 'Sauces & Condiments' }
    ]
  },
  {
    id: 'fav-crepes-savory',
    title: 'Savory Buckwheat Galettes / Crepes (Ham, Cheese & Egg)',
    mealType: 'lunch',
    prepTime: 10,
    cookTime: 10,
    servings: 2,
    tags: ['User Favorite', 'French Bistro', 'Diner Special'],
    calorieEstimate: 490,
    gordoPortionNotes: 'Two folded galettes with smoked ham, melted gruyere & sunny egg center',
    flacoPortionNotes: 'One galette with sautéed spinach, mushrooms, goat cheese & salad',
    notes: 'Classic Brittany galette complète. Fold the 4 sides into an open square frame with egg in middle.',
    leftoverSuitability: 'cook_fresh_only',
    reheatInstructions: 'Best made fresh on a hot skillet in under 10 minutes.',
    ingredients: [
      { id: 'fav-i-126', name: 'Crepe or Galette Batter', amount: '4 crepes worth', category: 'Bakery' },
      { id: 'fav-i-127', name: 'Smoked Ham & Gruyère Cheese', amount: '100g each', category: 'Meat & Seafood', isExpiring: true },
      { id: 'fav-i-128', name: 'Eggs', amount: '2-4 eggs', category: 'Dairy & Eggs', isExpiring: true },
      { id: 'fav-i-129', name: 'Butter', amount: '1 tbsp', category: 'Dairy & Eggs' }
    ]
  },
  {
    id: 'fav-egg-sandwich',
    title: 'Diner Egg Salad & Crispy Bacon Sandwich',
    mealType: 'lunch',
    prepTime: 10,
    cookTime: 5,
    servings: 2,
    tags: ['User Favorite', 'Quick 10m', 'Diner Lunch'],
    calorieEstimate: 470,
    gordoPortionNotes: 'Loaded with 3 hard-boiled eggs, 4 bacon slices & toasted brioche',
    flacoPortionNotes: 'Egg salad with greek yogurt, chives & crunchy watercress on whole grain',
    notes: 'Mash warm eggs with dijon mustard, chives, and black pepper. Cut diagonally!',
    leftoverSuitability: 'cook_fresh_only',
    reheatInstructions: 'Assemble right before eating so bread stays crisp.',
    ingredients: [
      { id: 'fav-i-134', name: 'Boiled Eggs', amount: '4 eggs', category: 'Dairy & Eggs', isExpiring: true },
      { id: 'fav-i-135', name: 'Crispy Bacon', amount: '4 strips', category: 'Meat & Seafood' },
      { id: 'fav-i-136', name: 'Toasted Sandwich Bread', amount: '4 slices', category: 'Bakery' },
      { id: 'fav-i-137', name: 'Dijon Mayo & Chives', amount: '2 tbsp', category: 'Sauces & Condiments' }
    ]
  },
  {
    id: 'fav-shashlik-bbq',
    title: '80s Diner BBQ Skewers & Grilled Corn',
    mealType: 'dinner',
    prepTime: 15,
    cookTime: 15,
    servings: 2,
    tags: ['User Favorite', 'Grill Classic', 'High Protein'],
    calorieEstimate: 620,
    gordoPortionNotes: '4 skewers with glazed barbecue sauce, roasted potatoes & garlic bread',
    flacoPortionNotes: '2 lean chicken/veggie skewers with charred sweet corn & coleslaw',
    notes: 'Sear on ribbed grill pan for smoky char lines. Brush with sweet & smoky barbecue sauce.',
    leftoverSuitability: 'good',
    reheatInstructions: 'Reheat skewers in hot skillet for 2 mins to revive the barbecue glaze.',
    ingredients: [
      { id: 'fav-i-138', name: 'Chicken Breast or Pork Cuts', amount: '400g diced', category: 'Meat & Seafood' },
      { id: 'fav-i-139', name: 'Sweet Corn on the Cob', amount: '2 cobs', category: 'Produce' },
      { id: 'fav-i-140', name: 'Bell Peppers & Red Onion', amount: '1 of each chunked', category: 'Produce', isExpiring: true },
      { id: 'fav-i-141', name: 'Barbecue Sauce', amount: '4 tbsp', category: 'Sauces & Condiments' }
    ]
  },
  {
    id: 'fav-waffles-pancakes',
    title: 'Savory Herb Waffles with Sunny Eggs or Sweet Pancakes',
    mealType: 'lunch',
    prepTime: 12,
    cookTime: 10,
    servings: 2,
    tags: ['User Favorite', 'Weekend Brunch', 'Diner Star'],
    calorieEstimate: 510,
    gordoPortionNotes: 'Stack of 3 waffles with melted cheddar, bacon & maple drizzle',
    flacoPortionNotes: 'Herb waffle topped with smoked salmon, poached egg & baby spinach',
    notes: 'Hot waffle iron gives that iconic crisp grid! Fold chives and cheddar into batter.',
    leftoverSuitability: 'good',
    reheatInstructions: 'Reheat in toaster for 2 minutes to make exterior shatteringly crisp again.',
    ingredients: [
      { id: 'fav-i-142', name: 'Waffle / Pancake Flour Mix', amount: '2 cups', category: 'Pantry' },
      { id: 'fav-i-143', name: 'Eggs & Milk', amount: '2 eggs + 1 cup milk', category: 'Dairy & Eggs', isExpiring: true },
      { id: 'fav-i-144', name: 'Butter', amount: '2 tbsp', category: 'Dairy & Eggs' },
      { id: 'fav-i-145', name: 'Bacon or Smoked Salmon', amount: '100g', category: 'Meat & Seafood' }
    ]
  },
  {
    id: 'fav-couscous-tabouleh',
    title: 'Herbed Tabouleh & Warm Spiced Couscous Bowl',
    mealType: 'lunch',
    prepTime: 12,
    cookTime: 5,
    servings: 2,
    tags: ['User Favorite', 'Mediterranean', 'Quick Prep'],
    calorieEstimate: 460,
    gordoPortionNotes: 'Large bowl with spiced chickpeas, crumbled feta & pita bread',
    flacoPortionNotes: 'Loaded with flat-leaf parsley, fresh mint, cucumber, tomato & lemon juice',
    notes: 'Steam couscous with boiling broth in covered bowl for 5 minutes. Fluff with fork.',
    leftoverSuitability: 'excellent',
    reheatInstructions: 'Enjoy cold as a fresh grain salad or warm up for 1 minute.',
    ingredients: [
      { id: 'fav-i-146', name: 'Couscous (Semolina)', amount: '1 cup', category: 'Pantry' },
      { id: 'fav-i-147', name: 'Fresh Parsley & Mint', amount: '1 large bunch', category: 'Produce', isExpiring: true },
      { id: 'fav-i-148', name: 'Cucumber & Tomatoes', amount: '1 cup diced', category: 'Produce' },
      { id: 'fav-i-149', name: 'Lemon Juice & Olive Oil', amount: '3 tbsp', category: 'Pantry' }
    ]
  }
];
