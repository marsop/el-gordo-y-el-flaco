import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const recipesDir = path.resolve(__dirname, '../src/data/recipes');

const recipes = [
  // ==========================================
  // Category 1: High Protein & High Fiber (6)
  // ==========================================
  {
    id: 'dish-fajitas-with-guacamole',
    title: 'Fajitas with Guacamole',
    category: 'High Protein & High Fiber',
    speed: 'Standard',
    season: 'All Year',
    mealType: 'dinner',
    prepTime: 15,
    cookTime: 15,
    servings: 2,
    calorieEstimate: 620,
    leftoverSuitability: 'good',
    reheatInstructions: 'Reheat chicken, quinoa, and peppers in a hot skillet for 2 mins; serve in fresh warm tortillas with fresh guacamole.',
    tags: [
      'High Protein & High Fiber',
      'Standard',
      'All Year',
      'High Protein',
      'High Fiber',
      'Mexican Diner',
      'User Favorite'
    ],
    notes: 'Searing the peppers and onions over high griddle heat caramelizes natural sugars for restaurant sizzle.',
    gordoPortionNotes: '4 warm flour tortillas, double sliced chicken breast, extra black beans, cheddar & generous guacamole.',
    flacoPortionNotes: 'Quinoa & black bean bowl base with grilled chicken strips, charred bell peppers, Mexican veg mix, light feta & squeeze of fresh lime.',
    ingredients: [
      { id: 'ing-faj-1', name: 'Chicken breast', amount: '350g sliced strips', category: 'Meat & Seafood' },
      { id: 'ing-faj-2', name: 'Quinoa', amount: '1 cup cooked', category: 'Pantry' },
      { id: 'ing-faj-3', name: 'Black beans', amount: '1 can (240g drained)', category: 'Pantry' },
      { id: 'ing-faj-4', name: 'Mexican frozen veggie mix', amount: '200g (corn, peppers, peas)', category: 'Produce' },
      { id: 'ing-faj-5', name: 'Feta cheese', amount: '50g crumbled', category: 'Dairy & Eggs' },
      { id: 'ing-faj-6', name: 'Bell pepper', amount: '2 sliced (red & yellow)', category: 'Produce', isExpiring: true },
      { id: 'ing-faj-7', name: 'Tortillas', amount: '6 whole-wheat or flour tortillas', category: 'Bakery' },
      { id: 'ing-faj-8', name: 'Avocado (for guacamole)', amount: '2 ripe avocados', category: 'Produce', isExpiring: true },
      { id: 'ing-faj-9', name: 'Lime', amount: '2 fresh limes', category: 'Produce' },
      { id: 'ing-faj-10', name: 'Garlic', amount: '3 cloves minced', category: 'Produce' }
    ]
  },
  {
    id: 'dish-baked-cream-cheese-orzo',
    title: 'Baked Cream Cheese Orzo',
    category: 'High Protein & High Fiber',
    speed: 'Standard',
    season: 'All Year',
    mealType: 'dinner',
    prepTime: 10,
    cookTime: 25,
    servings: 2,
    calorieEstimate: 580,
    leftoverSuitability: 'excellent',
    reheatInstructions: 'Add a splash of vegetable broth or water; microwave 2 mins covered or warm in a skillet on medium heat.',
    tags: [
      'High Protein & High Fiber',
      'Standard',
      'All Year',
      'One-Pot Bake',
      'Batch Hero',
      'High Fiber',
      'Vegetarian'
    ],
    notes: 'Orzo absorbs the lemon-herb broth and melted cream cheese for a creamy, risotto-like bake with no standing over the stove.',
    gordoPortionNotes: 'Heaping bowl of creamy baked orzo with double chickpeas, herb cream cheese topping & lemon zest.',
    flacoPortionNotes: 'Balanced orzo portion folded with generous baby spinach, wilted sweet cherry tomatoes and extra squeeze of lemon.',
    ingredients: [
      { id: 'ing-orzo-1', name: 'Chickpeas', amount: '1 can (240g drained)', category: 'Pantry' },
      { id: 'ing-orzo-2', name: 'Baby spinach', amount: '150g fresh', category: 'Produce', isExpiring: true },
      { id: 'ing-orzo-3', name: 'Cherry tomatoes', amount: '250g halved', category: 'Produce' },
      { id: 'ing-orzo-4', name: 'Orzo pasta', amount: '250g', category: 'Pantry' },
      { id: 'ing-orzo-5', name: 'Yellow onion', amount: '1 diced', category: 'Produce' },
      { id: 'ing-orzo-6', name: 'Herb cream cheese', amount: '150g (Boursin or garlic-herb style)', category: 'Dairy & Eggs' },
      { id: 'ing-orzo-7', name: 'Vegetable broth', amount: '600ml', category: 'Pantry' },
      { id: 'ing-orzo-8', name: 'Lemon', amount: '1 fresh lemon (juiced & zested)', category: 'Produce' }
    ]
  },
  {
    id: 'dish-poke-bowl',
    title: 'Poke Bowl',
    category: 'High Protein & High Fiber',
    speed: 'Standard',
    season: 'Summer',
    mealType: 'lunch',
    prepTime: 20,
    cookTime: 10,
    servings: 2,
    calorieEstimate: 590,
    leftoverSuitability: 'good',
    reheatInstructions: 'Best served chilled or room temperature. Keep sushi rice separate and assemble toppings fresh.',
    tags: [
      'High Protein & High Fiber',
      'Standard',
      'Summer',
      'High Protein',
      'Seafood',
      'Fresh & Crisp',
      'Omega-3'
    ],
    notes: 'Vibrant Hawaiian bowl with fresh salmon, edamame, creamy avocado, sweet mango chunks and ruby pomegranate seeds.',
    gordoPortionNotes: 'Hearty sushi rice base topped with generous salmon cubes, extra edamame, whole sliced avocado & sesame soy drizzle.',
    flacoPortionNotes: 'Light rice base bulked with crunchy cucumber, sprouts, edamame, cubed tofu, mango and tart pomegranate seeds.',
    ingredients: [
      { id: 'ing-poke-1', name: 'Firm tofu', amount: '150g pressed & cubed', category: 'Produce' },
      { id: 'ing-poke-2', name: 'Fresh salmon fillet', amount: '250g diced sashimi-grade or seared', category: 'Meat & Seafood' },
      { id: 'ing-poke-3', name: 'Edamame', amount: '150g shelled', category: 'Produce' },
      { id: 'ing-poke-4', name: 'Sushi rice', amount: '200g seasoned cooked rice', category: 'Pantry' },
      { id: 'ing-poke-5', name: 'Avocado', amount: '1 ripe avocado sliced', category: 'Produce', isExpiring: true },
      { id: 'ing-poke-6', name: 'Sweet corn', amount: '100g kernels', category: 'Pantry' },
      { id: 'ing-poke-7', name: 'Fresh mango', amount: '1 diced', category: 'Produce' },
      { id: 'ing-poke-8', name: 'Cucumber', amount: '1 English cucumber sliced', category: 'Produce' },
      { id: 'ing-poke-9', name: 'Fresh sprouts', amount: '50g alfalfa or radish sprouts', category: 'Produce' },
      { id: 'ing-poke-10', name: 'Pomegranate seeds', amount: '80g arils', category: 'Produce' }
    ]
  },
  {
    id: 'dish-spanish-lentils-chorizo',
    title: 'Spanish Lentils with Chorizo',
    category: 'High Protein & High Fiber',
    speed: 'Slow Burn',
    season: 'Winter',
    mealType: 'dinner',
    prepTime: 15,
    cookTime: 45,
    servings: 2,
    calorieEstimate: 640,
    leftoverSuitability: 'excellent',
    reheatInstructions: 'Stew flavors deepen overnight! Simmer in saucepan on low with 1/4 cup water for 3-4 mins.',
    tags: [
      'High Protein & High Fiber',
      'Slow Burn',
      'Winter',
      'Batch Hero',
      'Cozy Warm',
      'Spanish Classic',
      'High Fiber'
    ],
    notes: 'Traditional Spanish winter stew. The smoked paprika and rendered fat from the chorizo infuse the earthy lentils.',
    gordoPortionNotes: 'Deep bowl with thick Spanish chorizo slices, tender skin-on potatoes, and crusty bread for dipping.',
    flacoPortionNotes: 'Lentil and root veggie heavy bowl with diced carrots, stewed tomatoes, garlic broth and modest chorizo slices.',
    ingredients: [
      { id: 'ing-len-1', name: 'Brown or green lentils', amount: '500g dry', category: 'Pantry' },
      { id: 'ing-len-2', name: 'Fresh tomatoes', amount: '500g diced', category: 'Produce' },
      { id: 'ing-len-3', name: 'Carrots', amount: '300g sliced into rounds', category: 'Produce' },
      { id: 'ing-len-4', name: 'Potatoes (skin-on)', amount: '500g washed & cubed', category: 'Produce' },
      { id: 'ing-len-5', name: 'Onions', amount: '2 medium onions chopped', category: 'Produce' },
      { id: 'ing-len-6', name: 'Garlic', amount: '4 cloves crushed', category: 'Produce' },
      { id: 'ing-len-7', name: 'Spanish chorizo', amount: '150g sliced rings', category: 'Meat & Seafood' }
    ]
  },
  {
    id: 'dish-red-lentil-mango-curry',
    title: 'Red Lentil Mango Curry',
    category: 'High Protein & High Fiber',
    speed: 'Standard',
    season: 'All Year',
    mealType: 'dinner',
    prepTime: 12,
    cookTime: 25,
    servings: 2,
    calorieEstimate: 570,
    leftoverSuitability: 'excellent',
    reheatInstructions: 'Warms up velvety and fragrant in microwave 2 mins or small saucepan. Finish with a fresh squeeze of lime.',
    tags: [
      'High Protein & High Fiber',
      'Standard',
      'All Year',
      'Batch Hero',
      'Curry',
      'Plant Protein',
      'High Fiber'
    ],
    notes: 'Peanut butter, creamy coconut milk, and frozen mango melt into a luscious sweet-savory curry with simmered red lentils.',
    gordoPortionNotes: 'Double portion of red lentil curry served over basmati rice with extra peanut butter swirl and yogurt dollop.',
    flacoPortionNotes: 'Lentil curry loaded with bell peppers, tender carrots, cherry tomatoes, fresh coriander and light Greek yogurt.',
    ingredients: [
      { id: 'ing-cur-1', name: 'Red lentils', amount: '250g rinsed', category: 'Pantry' },
      { id: 'ing-cur-2', name: 'Peanut butter', amount: '2 tbsp (40g) creamy', category: 'Pantry' },
      { id: 'ing-cur-3', name: 'Greek yogurt', amount: '100g (for swirl topping)', category: 'Dairy & Eggs', isExpiring: true },
      { id: 'ing-cur-4', name: 'Coconut milk', amount: '1 can (400ml)', category: 'Pantry' },
      { id: 'ing-cur-5', name: 'Carrots', amount: '200g sliced', category: 'Produce' },
      { id: 'ing-cur-6', name: 'Bell pepper', amount: '1 red bell pepper chopped', category: 'Produce', isExpiring: true },
      { id: 'ing-cur-7', name: 'Frozen mango', amount: '200g chunks', category: 'Produce' },
      { id: 'ing-cur-8', name: 'Cherry tomatoes', amount: '150g halved', category: 'Produce' },
      { id: 'ing-cur-9', name: 'Spring onion', amount: '3 stalks sliced', category: 'Produce' },
      { id: 'ing-cur-10', name: 'Maple syrup', amount: '1 tbsp', category: 'Pantry' },
      { id: 'ing-cur-11', name: 'Lime juice', amount: '1 lime juiced', category: 'Produce' },
      { id: 'ing-cur-12', name: 'Fresh coriander', amount: '1 bunch chopped cilantro', category: 'Produce' }
    ]
  },
  {
    id: 'dish-tabouleh-salad',
    title: 'Tabouleh Salad',
    category: 'High Protein & High Fiber',
    speed: 'Quick',
    season: 'Summer',
    mealType: 'lunch',
    prepTime: 15,
    cookTime: 5,
    servings: 2,
    calorieEstimate: 420,
    leftoverSuitability: 'cook_fresh_only',
    reheatInstructions: 'Serve fresh and chilled! Do not reheat.',
    tags: [
      'High Protein & High Fiber',
      'Quick',
      'Summer',
      'Fresh Salad',
      'Levantine',
      'High Fiber',
      'Vegetarian'
    ],
    notes: 'Herb-forward salad where fresh flat-leaf parsley is the star, backed by nutty bulgur, diced ripe tomatoes, and salty feta.',
    gordoPortionNotes: 'Double feta cheese crumbles, toasted whole-wheat pita triangles, generous extra virgin olive oil drizzle.',
    flacoPortionNotes: 'Herb-packed bowl overflowing with fresh parsley, mint, diced tomatoes, crisp red onion and zesty lemon dressing.',
    ingredients: [
      { id: 'ing-tab-1', name: 'Bulgur wheat', amount: '100g dry', category: 'Pantry' },
      { id: 'ing-tab-2', name: 'Feta cheese', amount: '100g crumbled', category: 'Dairy & Eggs' },
      { id: 'ing-tab-3', name: 'Tomatoes', amount: '300g finely diced', category: 'Produce' },
      { id: 'ing-tab-4', name: 'Fresh flat-leaf parsley', amount: '2 large bunches finely chopped', category: 'Produce' },
      { id: 'ing-tab-5', name: 'Fresh mint', amount: '1 bunch chopped', category: 'Produce' },
      { id: 'ing-tab-6', name: 'Red onion', amount: '1 small finely minced', category: 'Produce' },
      { id: 'ing-tab-7', name: 'Fresh lemon juice', amount: '2 lemons juiced', category: 'Produce' },
      { id: 'ing-tab-8', name: 'Olive oil', amount: '3 tbsp extra virgin', category: 'Sauces & Condiments' }
    ]
  },

  // ==========================================
  // Category 2: Great Base (7)
  // ==========================================
  {
    id: 'dish-alpine-barley-soup',
    title: 'Alpine Barley Soup',
    category: 'Great Base',
    speed: 'Slow Burn',
    season: 'Winter',
    mealType: 'dinner',
    prepTime: 15,
    cookTime: 40,
    servings: 2,
    calorieEstimate: 510,
    leftoverSuitability: 'excellent',
    reheatInstructions: 'Barley thickens soup overnight; stir in 1/2 cup water or broth and simmer 3 mins.',
    tags: [
      'Great Base',
      'Slow Burn',
      'Winter',
      'Batch Hero',
      'Alpine Classic',
      'Cozy Warm',
      'High Fiber'
    ],
    notes: 'The classic Grisons alpine recipe enriched with white beans for extra creamy texture and protein.',
    gordoPortionNotes: 'Heaping bowl with double thick-cut crusty country bread, butter, and extra white beans.',
    flacoPortionNotes: 'Aromatic vegetable and barley bowl with tender leeks, diced carrots, dried tomatoes and fresh herbs.',
    ingredients: [
      { id: 'ing-bar-1', name: 'Barley', amount: '80g pearl barley', category: 'Pantry' },
      { id: 'ing-bar-2', name: 'White beans', amount: '1 can (240g drained cannellini)', category: 'Pantry' },
      { id: 'ing-bar-3', name: 'Carrots', amount: '200g diced', category: 'Produce' },
      { id: 'ing-bar-4', name: 'Potatoes', amount: '200g diced', category: 'Produce' },
      { id: 'ing-bar-5', name: 'Leek', amount: '1 large sliced', category: 'Produce' },
      { id: 'ing-bar-6', name: 'Dried tomatoes', amount: '50g sun-dried sliced', category: 'Pantry' },
      { id: 'ing-bar-7', name: 'Vegetable broth', amount: '1 liter (4 cups)', category: 'Pantry' },
      { id: 'ing-bar-8', name: 'Crusty bread', amount: '4 thick artisan slices', category: 'Bakery' }
    ]
  },
  {
    id: 'dish-burritos-guacamole',
    title: 'Burritos with Guacamole',
    category: 'Great Base',
    speed: 'Standard',
    season: 'All Year',
    mealType: 'dinner',
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    calorieEstimate: 630,
    leftoverSuitability: 'good',
    reheatInstructions: 'Toast in a dry skillet over medium heat 2-3 mins per side for a crisp exterior and melted center.',
    tags: [
      'Great Base',
      'Standard',
      'All Year',
      'Mexican Diner',
      'High Fiber',
      'Vegetarian'
    ],
    notes: 'Stuffed with roasted sweet potatoes, seasoned black beans, sautéed zucchini, and melted cheese.',
    gordoPortionNotes: '2 large tightly wrapped burritos loaded with melted cheddar cheese, black beans, tomato sauce, and double guacamole.',
    flacoPortionNotes: '1 burrito packed with roasted sweet potato, zucchini, bell peppers, fresh lime, and fresh salsa verde.',
    ingredients: [
      { id: 'ing-bur-1', name: 'Whole-wheat tortillas', amount: '4 large tortillas', category: 'Bakery' },
      { id: 'ing-bur-2', name: 'Black beans', amount: '1 can (240g drained)', category: 'Pantry' },
      { id: 'ing-bur-3', name: 'Sweet potato', amount: '1 large (300g) cubed & roasted', category: 'Produce' },
      { id: 'ing-bur-4', name: 'Bell peppers', amount: '2 sliced (red & green)', category: 'Produce', isExpiring: true },
      { id: 'ing-bur-5', name: 'Zucchini', amount: '1 medium diced', category: 'Produce' },
      { id: 'ing-bur-6', name: 'Cheese (cheddar or jack)', amount: '80g shredded', category: 'Dairy & Eggs', isExpiring: true },
      { id: 'ing-bur-7', name: 'Tomato sauce', amount: '150ml salsa or purée', category: 'Pantry' },
      { id: 'ing-bur-8', name: 'Avocado (for guacamole)', amount: '2 ripe avocados', category: 'Produce', isExpiring: true },
      { id: 'ing-bur-9', name: 'Lime', amount: '1 lime', category: 'Produce' },
      { id: 'ing-bur-10', name: 'Garlic', amount: '2 cloves minced', category: 'Produce' }
    ]
  },
  {
    id: 'dish-baked-lasagna',
    title: 'Baked Lasagna',
    category: 'Great Base',
    speed: 'Slow Burn',
    season: 'Winter',
    mealType: 'dinner',
    prepTime: 20,
    cookTime: 45,
    servings: 2,
    calorieEstimate: 660,
    leftoverSuitability: 'excellent',
    reheatInstructions: 'Cover with foil and bake at 180°C for 15 mins, or microwave 3 mins covered.',
    tags: [
      'Great Base',
      'Slow Burn',
      'Winter',
      'Batch Hero',
      'Comfort Food',
      'Italian Bake',
      'High Protein'
    ],
    notes: 'Layered with whole-wheat sheets, savory canned tuna, iron-rich spinach, broccoli florets, and light Maizena bechamel.',
    gordoPortionNotes: 'Generous double corner cut with bubbling golden cheese crust, rich tomato tuna filling and extra milk bechamel.',
    flacoPortionNotes: 'Center cut loaded with steamed broccoli, spinach, shredded pumpkin and carrots with light cheese topping.',
    ingredients: [
      { id: 'ing-las-1', name: 'Whole-wheat lasagna sheets', amount: '250g (8-10 sheets)', category: 'Pantry' },
      { id: 'ing-las-2', name: 'Canned tuna', amount: '1 big can (250g drained)', category: 'Pantry' },
      { id: 'ing-las-3', name: 'Frozen spinach', amount: '200g thawed & squeezed', category: 'Produce' },
      { id: 'ing-las-4', name: 'Broccoli', amount: '150g small florets', category: 'Produce' },
      { id: 'ing-las-5', name: 'Carrot', amount: '1 grated', category: 'Produce' },
      { id: 'ing-las-6', name: 'Onion', amount: '1 finely diced', category: 'Produce' },
      { id: 'ing-las-7', name: 'Pumpkin', amount: '150g grated or thin diced', category: 'Produce' },
      { id: 'ing-las-8', name: 'Cheese (mozzarella or gouda)', amount: '100g shredded', category: 'Dairy & Eggs', isExpiring: true },
      { id: 'ing-las-9', name: 'Tomato sauce', amount: '400g passata', category: 'Pantry' },
      { id: 'ing-las-10', name: 'Milk', amount: '300ml', category: 'Dairy & Eggs' },
      { id: 'ing-las-11', name: 'Maizena (cornstarch)', amount: '2 tbsp', category: 'Pantry' }
    ]
  },
  {
    id: 'dish-falafel-hummus-plate',
    title: 'Falafel and Hummus Plate',
    category: 'Great Base',
    speed: 'Quick',
    season: 'Summer',
    mealType: 'lunch',
    prepTime: 10,
    cookTime: 10,
    servings: 2,
    calorieEstimate: 530,
    leftoverSuitability: 'good',
    reheatInstructions: 'Reheat falafel in toaster oven or air fryer 3 mins to restore crispiness; warm pita on dry skillet.',
    tags: [
      'Great Base',
      'Quick',
      'Summer',
      'Middle Eastern',
      'Plant Protein',
      'Vegetarian'
    ],
    notes: 'Crispy spiced falafels paired with silky hummus, blistered zucchini & bell peppers in extra virgin olive oil.',
    gordoPortionNotes: '6 golden falafels, warm whole-wheat pita bread, generous hummus swirl with smoked paprika and extra olive oil.',
    flacoPortionNotes: '4 falafels over charred zucchini and sweet bell peppers with lemon-tahini cucumber salad and dollop of hummus.',
    ingredients: [
      { id: 'ing-fal-1', name: 'Falafel', amount: '10 prepared falafel balls', category: 'Produce' },
      { id: 'ing-fal-2', name: 'Hummus', amount: '200g classic', category: 'Pantry' },
      { id: 'ing-fal-3', name: 'Whole-wheat pita bread', amount: '3 pita rounds', category: 'Bakery' },
      { id: 'ing-fal-4', name: 'Zucchini', amount: '1 sliced ribbons', category: 'Produce' },
      { id: 'ing-fal-5', name: 'Bell peppers', amount: '2 sliced', category: 'Produce', isExpiring: true },
      { id: 'ing-fal-6', name: 'Olive oil', amount: '2 tbsp extra virgin', category: 'Sauces & Condiments' }
    ]
  },
  {
    id: 'dish-shakshuka',
    title: 'Shakshuka',
    category: 'Great Base',
    speed: 'Standard',
    season: 'All Year',
    mealType: 'lunch',
    prepTime: 10,
    cookTime: 20,
    servings: 2,
    calorieEstimate: 490,
    leftoverSuitability: 'good',
    reheatInstructions: 'Warm tomato pepper sauce in a skillet on medium-low. Add fresh eggs if reheating sauce alone.',
    tags: [
      'Great Base',
      'Standard',
      'All Year',
      'Skillet Eggs',
      'Mediterranean',
      'High Protein',
      'Vegetarian'
    ],
    notes: 'Fresh eggs poached in a rich simmer of ripe tomatoes, sweet peppers, yellow onion, garlic, and tomato paste.',
    gordoPortionNotes: '3 soft-poached eggs in thick tomato-pepper sauce with 3 thick slices of toasted whole-grain sourdough for dipping.',
    flacoPortionNotes: '1-2 soft eggs nestled in deep tomato sauce with extra bell peppers, onion and 1 slice of whole-grain toast.',
    ingredients: [
      { id: 'ing-shak-1', name: 'Eggs', amount: '4 fresh eggs', category: 'Dairy & Eggs', isExpiring: true },
      { id: 'ing-shak-2', name: 'Tomatoes', amount: '500g fresh chopped', category: 'Produce' },
      { id: 'ing-shak-3', name: 'Peppers', amount: '2 bell peppers sliced', category: 'Produce', isExpiring: true },
      { id: 'ing-shak-4', name: 'Onion', amount: '1 diced', category: 'Produce' },
      { id: 'ing-shak-5', name: 'Garlic', amount: '3 cloves minced', category: 'Produce' },
      { id: 'ing-shak-6', name: 'Tomato paste', amount: '2 tbsp', category: 'Pantry' },
      { id: 'ing-shak-7', name: 'Whole-grain bread', amount: '4 thick slices', category: 'Bakery' }
    ]
  },
  {
    id: 'dish-vegetable-frittata',
    title: 'Vegetable Frittata',
    category: 'Great Base',
    speed: 'Standard',
    season: 'All Year',
    mealType: 'lunch',
    prepTime: 12,
    cookTime: 18,
    servings: 2,
    calorieEstimate: 460,
    leftoverSuitability: 'excellent',
    reheatInstructions: 'Frittata wedges are delicious hot or room temp! Warm in toaster oven 3 mins or enjoy cold.',
    tags: [
      'Great Base',
      'Standard',
      'All Year',
      'Batch Hero',
      'High Protein',
      'Low Carb',
      'Vegetarian'
    ],
    notes: 'Fluffy egg bake loaded with tender sautéed zucchini, carrots, bell peppers, and melted cheese, paired with a fresh side salad.',
    gordoPortionNotes: 'Two thick warm frittata wedges with melted cheese crust and crusty side baguette.',
    flacoPortionNotes: 'Frittata wedge paired with an abundant crisp mixed green salad tossed in Dijon vinaigrette.',
    ingredients: [
      { id: 'ing-frit-1', name: 'Eggs', amount: '4-5 large eggs', category: 'Dairy & Eggs', isExpiring: true },
      { id: 'ing-frit-2', name: 'Cheese (cheddar or gruyere)', amount: '60g grated', category: 'Dairy & Eggs', isExpiring: true },
      { id: 'ing-frit-3', name: 'Carrots', amount: '1 grated', category: 'Produce' },
      { id: 'ing-frit-4', name: 'Zucchini', amount: '1 medium diced', category: 'Produce' },
      { id: 'ing-frit-5', name: 'Bell peppers', amount: '1 diced', category: 'Produce', isExpiring: true },
      { id: 'ing-frit-6', name: 'Side salad with vinaigrette', amount: '120g mixed greens + dressing', category: 'Produce' }
    ]
  },
  {
    id: 'dish-veggie-sandwich',
    title: 'Veggie Sandwich',
    category: 'Great Base',
    speed: 'Quick',
    season: 'All Year',
    mealType: 'lunch',
    prepTime: 10,
    cookTime: 5,
    servings: 2,
    calorieEstimate: 520,
    leftoverSuitability: 'cook_fresh_only',
    reheatInstructions: 'Assemble fresh! Toast bread right before serving for maximum crunch.',
    tags: [
      'Great Base',
      'Quick',
      'All Year',
      'Diner Sandwich',
      'High Protein',
      'Vegetarian'
    ],
    notes: 'Layered whole-grain club sandwich with boiled or fried eggs, tender blanched asparagus spears, hummus, cheese, and lettuce.',
    gordoPortionNotes: 'Double-decker toasted sandwich with 3 eggs, extra cheese, mayo spread and thick tomato slices.',
    flacoPortionNotes: 'Single open-faced or neat whole-grain sandwich with 1 egg, steamed asparagus, hummus smear, crisp romaine and tomato.',
    ingredients: [
      { id: 'ing-sand-1', name: 'Whole-grain toast bread', amount: '4 slices', category: 'Bakery' },
      { id: 'ing-sand-2', name: 'Eggs', amount: '4 eggs (hard-boiled or fried)', category: 'Dairy & Eggs', isExpiring: true },
      { id: 'ing-sand-3', name: 'Asparagus', amount: '150g tender spears trimmed', category: 'Produce' },
      { id: 'ing-sand-4', name: 'Hummus', amount: '3 tbsp (50g)', category: 'Pantry' },
      { id: 'ing-sand-5', name: 'Cheese', amount: '50g (2 slices havarti or swiss)', category: 'Dairy & Eggs', isExpiring: true },
      { id: 'ing-sand-6', name: 'Tomato', amount: '1 large sliced', category: 'Produce' },
      { id: 'ing-sand-7', name: 'Lettuce', amount: '4 crisp romaine leaves', category: 'Produce' },
      { id: 'ing-sand-8', name: 'Mayonnaise', amount: '2 tbsp', category: 'Sauces & Condiments' }
    ]
  },

  // ==========================================
  // Category 3: Moderately Balanced (9)
  // ==========================================
  {
    id: 'dish-fish-sticks-potatoes-veggies',
    title: 'Fish Sticks with Potatoes and Veggies',
    category: 'Moderately Balanced',
    speed: 'Quick',
    season: 'All Year',
    mealType: 'dinner',
    prepTime: 8,
    cookTime: 15,
    servings: 2,
    calorieEstimate: 560,
    leftoverSuitability: 'good',
    reheatInstructions: 'Re-crisp fish sticks in air fryer or toaster oven 3 mins; steam or pan-toss potatoes.',
    tags: [
      'Moderately Balanced',
      'Quick',
      'All Year',
      'Retro Classic',
      'Comfort Food',
      'Seafood'
    ],
    notes: 'An 80s diner nostalgic plate! Golden crispy fish sticks served with unpeeled boiled yellow potatoes and buttery mixed vegetables.',
    gordoPortionNotes: '8 crisp fish sticks, generous bowl of buttered yellow potatoes with parsley, and tartar sauce.',
    flacoPortionNotes: '4-5 fish sticks, steamed unpeeled potatoes, double portion of mixed frozen vegetables with fresh lemon juice.',
    ingredients: [
      { id: 'ing-fish-1', name: 'Fish sticks', amount: '12-14 breaded cod sticks', category: 'Meat & Seafood' },
      { id: 'ing-fish-2', name: 'Unpeeled yellow potatoes', amount: '400g small/medium potatoes', category: 'Produce' },
      { id: 'ing-fish-3', name: 'Mixed frozen veggies', amount: '250g (peas, corn, carrots)', category: 'Produce' },
      { id: 'ing-fish-4', name: 'Lemon wedges', amount: '1 lemon in wedges', category: 'Produce' }
    ]
  },
  {
    id: 'dish-fried-rice',
    title: 'Fried Rice',
    category: 'Moderately Balanced',
    speed: 'Quick',
    season: 'All Year',
    mealType: 'dinner',
    prepTime: 10,
    cookTime: 12,
    servings: 2,
    calorieEstimate: 540,
    leftoverSuitability: 'good',
    reheatInstructions: 'Stir-fry in a hot skillet with a splash of water and drop of sesame oil for 2 mins, or microwave covered.',
    tags: [
      'Moderately Balanced',
      'Quick',
      'All Year',
      'Wok Special',
      'Quick Skillet',
      'High Fiber'
    ],
    notes: 'Healthy diner wok toss using fiber-rich brown rice, scrambled eggs or edamame, crunchy carrots, and toasted sesame oil.',
    gordoPortionNotes: 'Big heaping wok bowl with extra brown rice, 2 scrambled eggs, sweet peas, and generous drizzle of soy & sesame oil.',
    flacoPortionNotes: 'Veggie-forward fried rice loaded with edamame, diced carrots, spring onion, peas, and light tamari soy sauce.',
    ingredients: [
      { id: 'ing-rice-1', name: 'Brown rice', amount: '300g cooked', category: 'Pantry' },
      { id: 'ing-rice-2', name: 'Eggs (or edamame)', amount: '3-4 eggs (or 150g edamame)', category: 'Dairy & Eggs', isExpiring: true },
      { id: 'ing-rice-3', name: 'Carrots', amount: '150g finely diced', category: 'Produce' },
      { id: 'ing-rice-4', name: 'Spring onion', amount: '3 stalks sliced', category: 'Produce' },
      { id: 'ing-rice-5', name: 'Frozen peas/veggies', amount: '150g', category: 'Produce' },
      { id: 'ing-rice-6', name: 'Soy sauce', amount: '2 tbsp', category: 'Sauces & Condiments' },
      { id: 'ing-rice-7', name: 'Sesame oil', amount: '1 tbsp toasted sesame oil', category: 'Sauces & Condiments' }
    ]
  },
  {
    id: 'dish-burgers-oven-potato-wedges',
    title: 'Burgers with Oven Potato Wedges',
    category: 'Moderately Balanced',
    speed: 'Standard',
    season: 'All Year',
    mealType: 'dinner',
    prepTime: 15,
    cookTime: 25,
    servings: 2,
    calorieEstimate: 670,
    leftoverSuitability: 'good',
    reheatInstructions: 'Re-crisp potato wedges in oven/air fryer at 200°C for 4 mins; warm burger patty in skillet.',
    tags: [
      'Moderately Balanced',
      'Standard',
      'All Year',
      '80s Diner',
      'Burger Night',
      'High Protein'
    ],
    notes: 'Drive-thru diner classic! Seared patties in toasted buns with seasoned skin-on potato wedges, roasted zucchini, and crisp green salad.',
    gordoPortionNotes: 'Double protein burger with melted cheese, toasted brioche bun, hearty pile of seasoned potato wedges and garlic herb dip.',
    flacoPortionNotes: 'Bunless or single-bun burger patty with sliced tomatoes, roasted zucchini, bell peppers and large side green salad with light vinaigrette.',
    ingredients: [
      { id: 'ing-burg-1', name: 'Protein patties/fish cutlets', amount: '2-4 patties (beef, turkey, or fish)', category: 'Meat & Seafood', isExpiring: true },
      { id: 'ing-burg-2', name: 'Burger buns', amount: '2-4 soft buns', category: 'Bakery', isExpiring: true },
      { id: 'ing-burg-3', name: 'Unpeeled potato wedges', amount: '450g skin-on potatoes cut in wedges', category: 'Produce' },
      { id: 'ing-burg-4', name: 'Bell peppers', amount: '1 sliced', category: 'Produce', isExpiring: true },
      { id: 'ing-burg-5', name: 'Zucchini', amount: '1 medium sliced', category: 'Produce' },
      { id: 'ing-burg-6', name: 'Dip', amount: '3 tbsp burger sauce / herb dip', category: 'Sauces & Condiments' },
      { id: 'ing-burg-7', name: 'Side green salad', amount: '100g fresh mixed greens', category: 'Produce' }
    ]
  },
  {
    id: 'dish-caesar-salad',
    title: 'Caesar Salad',
    category: 'Moderately Balanced',
    speed: 'Quick',
    season: 'Summer',
    mealType: 'lunch',
    prepTime: 12,
    cookTime: 8,
    servings: 2,
    calorieEstimate: 480,
    leftoverSuitability: 'cook_fresh_only',
    reheatInstructions: 'Toss fresh right before serving. Keep dressing and croutons separate until ready to eat.',
    tags: [
      'Moderately Balanced',
      'Quick',
      'Summer',
      'Classic Salad',
      'High Protein'
    ],
    notes: 'Crisp romaine tossed with creamy Caesar dressing, shaved parmesan, whole-wheat croutons, and grilled chicken breast or pan-fried tofu.',
    gordoPortionNotes: 'Large bowl with double sliced grilled chicken breast, extra whole-wheat croutons, shaved parmesan flakes and creamy dressing.',
    flacoPortionNotes: 'Massive bed of crisp chopped romaine with grilled chicken or seared tofu, light dressing toss, cracked black pepper and lemon wedge.',
    ingredients: [
      { id: 'ing-caes-1', name: 'Grilled chicken breast or pan-fried tofu', amount: '300g', category: 'Meat & Seafood' },
      { id: 'ing-caes-2', name: 'Romaine lettuce', amount: '2 crisp romaine hearts chopped', category: 'Produce' },
      { id: 'ing-caes-3', name: 'Whole-wheat croutons', amount: '60g toasted', category: 'Bakery' },
      { id: 'ing-caes-4', name: 'Parmesan', amount: '40g shaved or grated', category: 'Dairy & Eggs' },
      { id: 'ing-caes-5', name: 'Caesar dressing', amount: '4 tbsp (60ml)', category: 'Sauces & Condiments' }
    ]
  },
  {
    id: 'dish-one-pan-udon',
    title: 'One-Pan Udon',
    category: 'Moderately Balanced',
    speed: 'Quick',
    season: 'All Year',
    mealType: 'dinner',
    prepTime: 10,
    cookTime: 10,
    servings: 2,
    calorieEstimate: 560,
    leftoverSuitability: 'good',
    reheatInstructions: 'Toss in a hot skillet with 1 tbsp water or coconut milk for 2 mins to revive chewy udon texture.',
    tags: [
      'Moderately Balanced',
      'Quick',
      'All Year',
      'Noodle Stir-Fry',
      'One-Pan'
    ],
    notes: 'Chewy udon noodles tossed with edamame or cubed tofu, sweet potato matchsticks, zucchini, carrots, and savory coconut-teriyaki sauce.',
    gordoPortionNotes: 'Generous tangle of udon noodles with sweet coconut-teriyaki glaze, double cubed tofu/edamame, and sesame seeds.',
    flacoPortionNotes: 'Veggie-loaded udon bowl with ribbons of carrots, bell peppers, zucchini, edamame and savory light soy drizzle.',
    ingredients: [
      { id: 'ing-udon-1', name: 'Udon/wok noodles', amount: '300g fresh or dry', category: 'Pantry' },
      { id: 'ing-udon-2', name: 'Edamame or cubed tofu', amount: '180g', category: 'Produce' },
      { id: 'ing-udon-3', name: 'Sweet potato', amount: '1 small (150g) thinly shaved', category: 'Produce' },
      { id: 'ing-udon-4', name: 'Zucchini', amount: '1 medium sliced', category: 'Produce' },
      { id: 'ing-udon-5', name: 'Carrots', amount: '1 shredded matchsticks', category: 'Produce' },
      { id: 'ing-udon-6', name: 'Bell peppers', amount: '1 sliced', category: 'Produce', isExpiring: true },
      { id: 'ing-udon-7', name: 'Coconut milk/teriyaki', amount: '80ml coconut milk or teriyaki sauce', category: 'Sauces & Condiments' },
      { id: 'ing-udon-8', name: 'Soy sauce', amount: '2 tbsp', category: 'Sauces & Condiments' }
    ]
  },
  {
    id: 'dish-crunchy-cheese-veggie-wraps',
    title: 'Crunchy Cheese & Veggie Wraps',
    category: 'Moderately Balanced',
    speed: 'Quick',
    season: 'All Year',
    mealType: 'lunch',
    prepTime: 10,
    cookTime: 5,
    servings: 2,
    calorieEstimate: 510,
    leftoverSuitability: 'good',
    reheatInstructions: 'Toast in a dry skillet or panini press 2 mins for melted cheese and a crunchy wrap exterior.',
    tags: [
      'Moderately Balanced',
      'Quick',
      'All Year',
      'Speedy Lunch',
      'Wrap Night',
      'Vegetarian'
    ],
    notes: 'Whole-wheat wraps stuffed with scrambled eggs, melted cheese, black beans, and crisp matchstick carrots, zucchini, and peppers.',
    gordoPortionNotes: '2 large toasted wraps stuffed with scrambled eggs, melted cheddar, black beans and spicy crema.',
    flacoPortionNotes: '1 crunchy wrap filled with sautéed veggies, black beans, scrambled egg and fresh crisp salsa.',
    ingredients: [
      { id: 'ing-wrap-1', name: 'Whole-wheat wraps', amount: '3-4 wraps', category: 'Bakery' },
      { id: 'ing-wrap-2', name: 'Eggs', amount: '3 eggs scrambled', category: 'Dairy & Eggs', isExpiring: true },
      { id: 'ing-wrap-3', name: 'Cheese', amount: '60g shredded cheddar or gouda', category: 'Dairy & Eggs', isExpiring: true },
      { id: 'ing-wrap-4', name: 'Black beans', amount: '1/2 cup (120g drained)', category: 'Pantry' },
      { id: 'ing-wrap-5', name: 'Carrots', amount: '1 grated', category: 'Produce' },
      { id: 'ing-wrap-6', name: 'Zucchini', amount: '1 small thinly sliced', category: 'Produce' },
      { id: 'ing-wrap-7', name: 'Bell peppers', amount: '1 sliced strips', category: 'Produce', isExpiring: true }
    ]
  },
  {
    id: 'dish-russian-potato-salad',
    title: 'Russian Potato Salad',
    category: 'Moderately Balanced',
    speed: 'Standard',
    season: 'All Year',
    mealType: 'lunch',
    prepTime: 15,
    cookTime: 15,
    servings: 2,
    calorieEstimate: 530,
    leftoverSuitability: 'excellent',
    reheatInstructions: 'Serve chilled or room temp! Perfect make-ahead salad that stays delicious in the fridge for 3 days.',
    tags: [
      'Moderately Balanced',
      'Standard',
      'All Year',
      'Batch Hero',
      'Deli Classic',
      'Make Ahead'
    ],
    notes: 'Tender boiled skin-on potatoes, sweet carrots, peas, and hard-boiled eggs tossed in a lighter 50/50 blend of mayo and Greek yogurt.',
    gordoPortionNotes: 'Big scoop of Russian salad with extra chopped hard-boiled egg, tuna flakes and crunchy breadsticks.',
    flacoPortionNotes: 'Moderate portion balanced with crisp salad greens and light 50/50 yogurt-mayo dressing.',
    ingredients: [
      { id: 'ing-rus-1', name: 'Potatoes (skin-on)', amount: '400g diced & boiled', category: 'Produce' },
      { id: 'ing-rus-2', name: 'Carrots', amount: '200g diced & boiled', category: 'Produce' },
      { id: 'ing-rus-3', name: 'Frozen peas/veggies', amount: '150g steamed', category: 'Produce' },
      { id: 'ing-rus-4', name: 'Eggs', amount: '3 hard-boiled eggs chopped', category: 'Dairy & Eggs', isExpiring: true },
      { id: 'ing-rus-5', name: '50/50 mayo and Greek yogurt', amount: '3 tbsp mayo + 3 tbsp Greek yogurt', category: 'Dairy & Eggs', isExpiring: true }
    ]
  },
  {
    id: 'dish-savory-crepes',
    title: 'Savory Crepes',
    category: 'Moderately Balanced',
    speed: 'Standard',
    season: 'All Year',
    mealType: 'dinner',
    prepTime: 12,
    cookTime: 15,
    servings: 2,
    calorieEstimate: 520,
    leftoverSuitability: 'good',
    reheatInstructions: 'Folded crepes re-crisp beautifully in a hot skillet with a tiny dab of butter for 1-2 mins per side.',
    tags: [
      'Moderately Balanced',
      'Standard',
      'All Year',
      'French Diner',
      'Brunch & Dinner',
      'Vegetarian'
    ],
    notes: 'Nutty buckwheat or whole-wheat crepes folded around bubbling melted Gruyère cheese, warm eggs, and sautéed zucchini and peppers.',
    gordoPortionNotes: '3 hearty filled buckwheat crepes with extra cheese, a fried egg nestled in the center, and side ham/chickpeas.',
    flacoPortionNotes: '2 delicate crepes generously stuffed with sautéed zucchini ribbons and sweet bell peppers with light cheese.',
    ingredients: [
      { id: 'ing-crep-1', name: 'Buckwheat/whole-wheat flour', amount: '120g flour', category: 'Pantry' },
      { id: 'ing-crep-2', name: 'Eggs', amount: '3 eggs (batter & filling)', category: 'Dairy & Eggs', isExpiring: true },
      { id: 'ing-crep-3', name: 'Cheese', amount: '75g grated gruyère or emmental', category: 'Dairy & Eggs', isExpiring: true },
      { id: 'ing-crep-4', name: 'Zucchini', amount: '1 medium sliced thin', category: 'Produce' },
      { id: 'ing-crep-5', name: 'Bell peppers', amount: '1 sliced thin strips', category: 'Produce', isExpiring: true }
    ]
  },
  {
    id: 'dish-huevos-rotos',
    title: 'Huevos Rotos (Broken Eggs with Potatoes)',
    category: 'Moderately Balanced',
    speed: 'Standard',
    season: 'Winter',
    mealType: 'dinner',
    prepTime: 10,
    cookTime: 20,
    servings: 2,
    calorieEstimate: 580,
    leftoverSuitability: 'cook_fresh_only',
    reheatInstructions: 'Cook fresh! Runny egg yolks broken over hot olive-oil potatoes must be eaten right away.',
    tags: [
      'Moderately Balanced',
      'Standard',
      'Winter',
      'Spanish Diner',
      'Comfort Skillet',
      'High Protein'
    ],
    notes: 'Golden olive-oil browned skin-on potatoes topped with sunny fried eggs broken at the table so rich yolks coat the potatoes, served with lean ham or chickpeas and a fresh salad.',
    gordoPortionNotes: 'Heaping plate of crispy potatoes, 2 broken eggs with runny yolks, extra slices of cured lean ham, and crusty bread.',
    flacoPortionNotes: 'Roasted potatoes with 1 broken egg, spiced roasted chickpeas, fresh herbs, and a large side green salad.',
    ingredients: [
      { id: 'ing-rot-1', name: 'Skin-on potatoes', amount: '450g sliced disks or fries', category: 'Produce' },
      { id: 'ing-rot-2', name: 'Olive oil', amount: '2 tbsp extra virgin', category: 'Sauces & Condiments' },
      { id: 'ing-rot-3', name: '3 fried eggs', amount: '3 large eggs fried sunny-side', category: 'Dairy & Eggs', isExpiring: true },
      { id: 'ing-rot-4', name: 'Lean ham or chickpeas', amount: '80g lean ham (or 100g roasted chickpeas)', category: 'Meat & Seafood' },
      { id: 'ing-rot-5', name: 'Herbs', amount: '2 tbsp chopped parsley/thyme', category: 'Produce' },
      { id: 'ing-rot-6', name: 'Side salad', amount: '100g salad leaves with dressing', category: 'Produce' }
    ]
  },

  // ==========================================
  // Category 4: Remastered Classics (8)
  // ==========================================
  {
    id: 'dish-kasspatzle-side-salad',
    title: 'Kässpätzle with Side Salad',
    category: 'Remastered Classics',
    speed: 'Standard',
    season: 'Winter',
    mealType: 'dinner',
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    calorieEstimate: 690,
    leftoverSuitability: 'excellent',
    reheatInstructions: 'Toss in a hot skillet with a tsp of butter or 2 tbsp milk for 2-3 mins until cheese strings again.',
    tags: [
      'Remastered Classics',
      'Standard',
      'Winter',
      'Batch Hero',
      'Alpine Comfort',
      'Comfort Food'
    ],
    notes: 'Swabian-Alpine egg noodles tossed with sharp melting mountain cheese, sweet caramelized onions, and balanced by a crisp rainbow salad with roasted chickpeas.',
    gordoPortionNotes: 'Double serving of bubbling cheesy spätzle topped with heaps of sweet dark caramelized onions and diced cured ham.',
    flacoPortionNotes: 'Moderate portion of spätzle accompanied by a large colorful side salad with shredded carrots, shaved zucchini, and crunchy roasted chickpeas.',
    ingredients: [
      { id: 'ing-spat-1', name: 'Spätzle', amount: '300g egg spätzle (fresh or dry)', category: 'Pantry' },
      { id: 'ing-spat-2', name: 'Melting cheese', amount: '120g grated bergkäse or gruyère', category: 'Dairy & Eggs', isExpiring: true },
      { id: 'ing-spat-3', name: 'Caramelized onions', amount: '2 large onions sliced thin', category: 'Produce' },
      { id: 'ing-spat-4', name: 'Large side salad with carrots, zucchini, and roasted chickpeas (or diced ham)', amount: 'Mixed greens, 1 carrot, 1 zucchini, 100g roasted chickpeas or diced ham', category: 'Produce' }
    ]
  },
  {
    id: 'dish-protein-tomato-pasta',
    title: 'Protein Tomato Pasta',
    category: 'Remastered Classics',
    speed: 'Quick',
    season: 'All Year',
    mealType: 'dinner',
    prepTime: 5,
    cookTime: 15,
    servings: 2,
    calorieEstimate: 540,
    leftoverSuitability: 'excellent',
    reheatInstructions: 'Reheat pasta and sauce in saucepan with 2 tbsp water; sprinkle fresh parmesan on top.',
    tags: [
      'Remastered Classics',
      'Quick',
      'All Year',
      'Italian Classic',
      'Batch Hero',
      'Plant Protein',
      'Vegetarian'
    ],
    notes: 'Classic tomato pasta sauce naturally boosted with tender simmered white beans, aromatic garlic, onion, and parmesan.',
    gordoPortionNotes: 'Heaping pasta bowl with extra white beans, double grated parmesan cheese, and olive oil drizzle.',
    flacoPortionNotes: 'Al dente pasta tossed with rich tomato-bean sauce, wilted spinach/cherry tomatoes, and fresh oregano.',
    ingredients: [
      { id: 'ing-ptom-1', name: 'Pasta', amount: '220g penne or spaghetti', category: 'Pantry' },
      { id: 'ing-ptom-2', name: 'Tomato sauce', amount: '400g passata', category: 'Pantry' },
      { id: 'ing-ptom-3', name: 'Garlic', amount: '3 cloves minced', category: 'Produce' },
      { id: 'ing-ptom-4', name: 'Onion', amount: '1 small diced', category: 'Produce' },
      { id: 'ing-ptom-5', name: '1 can white beans', amount: '1 can (240g drained cannellini)', category: 'Pantry' },
      { id: 'ing-ptom-6', name: 'Basil/oregano', amount: '1 handful fresh basil or dried oregano', category: 'Produce' },
      { id: 'ing-ptom-7', name: 'Parmesan', amount: '30g grated', category: 'Dairy & Eggs' }
    ]
  },
  {
    id: 'dish-cold-pasta-salad',
    title: 'Cold Pasta Salad',
    category: 'Remastered Classics',
    speed: 'Quick',
    season: 'Summer',
    mealType: 'lunch',
    prepTime: 12,
    cookTime: 10,
    servings: 2,
    calorieEstimate: 520,
    leftoverSuitability: 'excellent',
    reheatInstructions: 'Enjoy cold right out of the fridge! Flavors marry overnight.',
    tags: [
      'Remastered Classics',
      'Quick',
      'Summer',
      'Batch Hero',
      'Picnic Hero',
      'High Protein'
    ],
    notes: 'Whole-wheat or chickpea pasta tossed with canned tuna or diced chicken, sweet cherry tomatoes, mozzarella or feta, bell peppers, and vinaigrette.',
    gordoPortionNotes: 'Big bowl of pasta salad with double canned tuna, mozzarella pearls, and extra Italian herb vinaigrette.',
    flacoPortionNotes: 'Chickpea pasta base tossed with sweet cherry tomatoes, diced bell peppers, cucumber, diced chicken breast, and crumbled feta.',
    ingredients: [
      { id: 'ing-cpas-1', name: 'Whole-wheat or chickpea pasta', amount: '200g fusilli or penne', category: 'Pantry' },
      { id: 'ing-cpas-2', name: 'Canned tuna or diced chicken', amount: '200g tuna or cooked chicken', category: 'Meat & Seafood' },
      { id: 'ing-cpas-3', name: 'Cherry tomatoes', amount: '200g halved', category: 'Produce' },
      { id: 'ing-cpas-4', name: 'Mozzarella/feta', amount: '80g diced mozzarella or crumbled feta', category: 'Dairy & Eggs', isExpiring: true },
      { id: 'ing-cpas-5', name: 'Bell peppers', amount: '1 crunchy bell pepper diced', category: 'Produce', isExpiring: true },
      { id: 'ing-cpas-6', name: 'Vinaigrette', amount: '3 tbsp olive oil & herb vinaigrette', category: 'Sauces & Condiments' }
    ]
  },
  {
    id: 'dish-pesto-pasta-bowl',
    title: 'Pesto Pasta Bowl',
    category: 'Remastered Classics',
    speed: 'Quick',
    season: 'All Year',
    mealType: 'lunch',
    prepTime: 5,
    cookTime: 12,
    servings: 2,
    calorieEstimate: 560,
    leftoverSuitability: 'good',
    reheatInstructions: 'Warm gently in microwave 1-2 mins covered or toss in skillet with a spoonful of hot water.',
    tags: [
      'Remastered Classics',
      'Quick',
      'All Year',
      'Italian Classic',
      'Speedy 15m',
      'High Protein'
    ],
    notes: 'Fragrant basil pesto coats whole-wheat pasta, juicy burst cherry tomatoes, and your choice of grilled chicken or tender white beans.',
    gordoPortionNotes: 'Heaping bowl of whole-wheat pasta with grilled chicken strips, double pesto, toasted pine nuts or seeds, and parmesan.',
    flacoPortionNotes: 'Whole-wheat pasta with tender white beans, sweet burst cherry tomatoes, fresh basil and parmesan.',
    ingredients: [
      { id: 'ing-pesto-1', name: 'Whole-wheat pasta', amount: '220g penne or fusilli', category: 'Pantry' },
      { id: 'ing-pesto-2', name: 'Pesto', amount: '80g basil pesto (3-4 tbsp)', category: 'Sauces & Condiments' },
      { id: 'ing-pesto-3', name: 'Grilled chicken or white beans', amount: '250g grilled chicken (or 1 can white beans)', category: 'Meat & Seafood' },
      { id: 'ing-pesto-4', name: 'Cherry tomatoes', amount: '200g halved', category: 'Produce' },
      { id: 'ing-pesto-5', name: 'Parmesan', amount: '30g shaved', category: 'Dairy & Eggs' },
      { id: 'ing-pesto-6', name: 'Olive oil', amount: '1 tbsp extra virgin', category: 'Sauces & Condiments' }
    ]
  },
  {
    id: 'dish-high-protein-veggie-pizza',
    title: 'High-Protein Veggie Pizza',
    category: 'Remastered Classics',
    speed: 'Slow Burn',
    season: 'All Year',
    mealType: 'dinner',
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    calorieEstimate: 630,
    leftoverSuitability: 'good',
    reheatInstructions: 'Reheat slices in a dry skillet on medium heat for 3 mins to crisp the bottom crust, or oven at 200°C for 4 mins.',
    tags: [
      'Remastered Classics',
      'Slow Burn',
      'All Year',
      'Pizza Night',
      'High Protein'
    ],
    notes: 'Crispy whole-wheat artisan crust topped with savory tomato sauce, flaked tuna for high protein, melted mozzarella, peppers, and zucchini.',
    gordoPortionNotes: '4 large slices with bubbling mozzarella, flaked tuna, sliced bell peppers, and chili flake oil.',
    flacoPortionNotes: '2-3 thin slices loaded with colorful roasted peppers, sliced zucchini, mushrooms, and light mozzarella.',
    ingredients: [
      { id: 'ing-pizz-1', name: 'Whole-wheat pizza dough', amount: '350g dough ball', category: 'Bakery' },
      { id: 'ing-pizz-2', name: 'Tomato sauce', amount: '150ml pizza sauce', category: 'Pantry' },
      { id: 'ing-pizz-3', name: 'Tuna', amount: '1 can (150g drained)', category: 'Pantry' },
      { id: 'ing-pizz-4', name: 'Mozzarella', amount: '120g shredded', category: 'Dairy & Eggs', isExpiring: true },
      { id: 'ing-pizz-5', name: 'Bell peppers', amount: '1 sliced into rings', category: 'Produce', isExpiring: true },
      { id: 'ing-pizz-6', name: 'Zucchini', amount: '1 sliced into thin rounds', category: 'Produce' }
    ]
  },
  {
    id: 'dish-loaded-potatoes-cheese-egg',
    title: 'Loaded Potatoes with Cheese & Egg',
    category: 'Remastered Classics',
    speed: 'Quick',
    season: 'Winter',
    mealType: 'dinner',
    prepTime: 8,
    cookTime: 17,
    servings: 2,
    calorieEstimate: 580,
    leftoverSuitability: 'good',
    reheatInstructions: 'Broil loaded potatoes in the oven for 3-4 mins until cheese is bubbling hot.',
    tags: [
      'Remastered Classics',
      'Quick',
      'Winter',
      'Comfort Food',
      'Diner Classic',
      'High Protein'
    ],
    notes: 'Tender skin-on jacket potatoes split open, filled with melting cheese, fried or poached eggs, herbs, and steamed broccoli or roasted carrots.',
    gordoPortionNotes: '3 large loaded jacket potatoes with melted cheddar, 2 fried eggs with runny yolks, butter, and bacon or crispy onion bits.',
    flacoPortionNotes: '1-2 skin-on potatoes topped with melted cheese, 1 soft egg, paired with a generous mound of steamed bright broccoli and roasted carrots.',
    ingredients: [
      { id: 'ing-load-1', name: 'Skin-on potatoes', amount: '500g russet or yellow potatoes', category: 'Produce' },
      { id: 'ing-load-2', name: 'Melting cheese', amount: '80g shredded cheddar or raclette', category: 'Dairy & Eggs', isExpiring: true },
      { id: 'ing-load-3', name: '2 eggs', amount: '2-3 large eggs', category: 'Dairy & Eggs', isExpiring: true },
      { id: 'ing-load-4', name: 'Butter/oil', amount: '1 tbsp butter or olive oil', category: 'Dairy & Eggs' },
      { id: 'ing-load-5', name: 'Herbs', amount: '2 tbsp chopped chives/parsley', category: 'Produce' },
      { id: 'ing-load-6', name: 'Side of steamed broccoli or roasted carrots', amount: '250g fresh broccoli or carrots', category: 'Produce' }
    ]
  },
  {
    id: 'dish-oven-baked-salmon',
    title: 'Oven-Baked Salmon, Potatoes & Greens',
    category: 'Remastered Classics',
    speed: 'Standard',
    season: 'All Year',
    mealType: 'dinner',
    prepTime: 12,
    cookTime: 22,
    servings: 2,
    calorieEstimate: 610,
    leftoverSuitability: 'good',
    reheatInstructions: 'Warm gently in oven at 160°C for 6 mins to prevent drying out, or flake cold over lunch salad.',
    tags: [
      'Remastered Classics',
      'Standard',
      'All Year',
      'Sheet Pan',
      'Seafood',
      'Omega-3',
      'High Protein'
    ],
    notes: 'One-pan sheet dinner. Salmon fillet roasted alongside crispy skin-on baby potatoes, tender asparagus or green beans, lemon, garlic, and dill.',
    gordoPortionNotes: 'Generous thick-cut salmon fillet (220g) with double roasted crispy potatoes, garlic herb butter, and asparagus.',
    flacoPortionNotes: 'Salmon fillet (150g) roasted with fresh lemon wedges, lots of crisp green beans or asparagus, and baby potatoes.',
    ingredients: [
      { id: 'ing-salm-1', name: 'Salmon fillet', amount: '350g (2 fresh fillets)', category: 'Meat & Seafood' },
      { id: 'ing-salm-2', name: 'Skin-on potatoes', amount: '400g baby potatoes halved', category: 'Produce' },
      { id: 'ing-salm-3', name: 'Asparagus or green beans', amount: '250g trimmed', category: 'Produce' },
      { id: 'ing-salm-4', name: 'Olive oil', amount: '2 tbsp extra virgin', category: 'Sauces & Condiments' },
      { id: 'ing-salm-5', name: 'Lemon', amount: '1 lemon sliced', category: 'Produce' },
      { id: 'ing-salm-6', name: 'Garlic', amount: '3 cloves minced', category: 'Produce' },
      { id: 'ing-salm-7', name: 'Dill/rosemary', amount: '2 sprigs fresh dill or rosemary', category: 'Produce' }
    ]
  },
  {
    id: 'dish-sweet-potato-carrot-lentil-soup',
    title: 'Sweet Potato Carrot & Lentil Soup',
    category: 'Remastered Classics',
    speed: 'Standard',
    season: 'Winter',
    mealType: 'dinner',
    prepTime: 12,
    cookTime: 25,
    servings: 2,
    calorieEstimate: 470,
    leftoverSuitability: 'excellent',
    reheatInstructions: 'Simmer on low 2-3 mins. Add a splash of water if soup thickens overnight. Garnish with roasted pumpkin seeds.',
    tags: [
      'Remastered Classics',
      'Standard',
      'Winter',
      'Batch Hero',
      'Velvety Soup',
      'Plant Power',
      'High Fiber'
    ],
    notes: 'Velvety blended soup made with sweet potato, tender carrots, simmered red lentils, creamy coconut milk, and warming spices.',
    gordoPortionNotes: 'Big steaming bowl of velvety soup with crusty bread, extra coconut cream swirl, and roasted pumpkin seeds.',
    flacoPortionNotes: 'Nutritious comforting bowl topped with pumpkin seeds, a swirl of yogurt, and fresh cilantro or parsley.',
    ingredients: [
      { id: 'ing-swp-1', name: 'Sweet potato', amount: '300g peeled & cubed', category: 'Produce' },
      { id: 'ing-swp-2', name: 'Carrots', amount: '300g sliced', category: 'Produce' },
      { id: 'ing-swp-3', name: '1/2 cup red lentils (simmered & blended)', amount: '100g red lentils', category: 'Pantry' },
      { id: 'ing-swp-4', name: 'Onion', amount: '1 diced', category: 'Produce' },
      { id: 'ing-swp-5', name: 'Garlic', amount: '3 cloves minced', category: 'Produce' },
      { id: 'ing-swp-6', name: 'Vegetable broth', amount: '750ml (3 cups)', category: 'Pantry' },
      { id: 'ing-swp-7', name: 'Coconut milk', amount: '200ml', category: 'Pantry' },
      { id: 'ing-swp-8', name: 'Spices', amount: '1 tbsp cumin, ginger & turmeric', category: 'Pantry' },
      { id: 'ing-swp-9', name: 'Pumpkin seeds', amount: '30g toasted seeds for garnish', category: 'Pantry' }
    ]
  }
];

if (!fs.existsSync(recipesDir)) {
  fs.mkdirSync(recipesDir, { recursive: true });
}

console.log(`Writing ${recipes.length} recipes to ${recipesDir}...`);
for (const recipe of recipes) {
  const filePath = path.join(recipesDir, `${recipe.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(recipe, null, 2), 'utf-8');
  console.log(`✓ Created ${recipe.id}.json (${recipe.title})`);
}
console.log('All 30 master recipes written successfully!');
