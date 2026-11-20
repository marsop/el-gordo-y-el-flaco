import { MasterIngredient } from '../types';

/**
 * Master catalog of ingredients maintained as a standalone collection.
 * Curated and deduplicated: no plurals, no composite recipe instructions.
 */
export const INITIAL_INGREDIENTS: MasterIngredient[] = [
  {
    "id": "ing-asparagus",
    "name": "Asparagus",
    "category": "Produce",
    "defaultQuantity": "1 bunch (250g)",
    "defaultDaysUntilExpiry": 3
  },
  {
    "id": "ing-avocado",
    "name": "Avocado",
    "category": "Produce",
    "defaultQuantity": "2 ripe avocados",
    "defaultDaysUntilExpiry": 2
  },
  {
    "id": "ing-baby-spinach",
    "name": "Baby Spinach",
    "category": "Produce",
    "defaultQuantity": "1 bag (200g)",
    "defaultDaysUntilExpiry": 2
  },
  {
    "id": "ing-balsamic-vinegar",
    "name": "Balsamic Vinegar",
    "category": "Sauces & Condiments",
    "defaultQuantity": "1 bottle (250ml)",
    "defaultDaysUntilExpiry": 365
  },
  {
    "id": "ing-basil-pesto",
    "name": "Basil Pesto",
    "category": "Sauces & Condiments",
    "defaultQuantity": "1 jar (190g)",
    "defaultDaysUntilExpiry": 14
  },
  {
    "id": "ing-bell-peppers",
    "name": "Bell Peppers",
    "category": "Produce",
    "defaultQuantity": "2 peppers (red & yellow)",
    "defaultDaysUntilExpiry": 4
  },
  {
    "id": "ing-black-beans",
    "name": "Black Beans",
    "category": "Pantry",
    "defaultQuantity": "1 can (240g drained)",
    "defaultDaysUntilExpiry": 365
  },
  {
    "id": "ing-broccoli",
    "name": "Broccoli",
    "category": "Produce",
    "defaultQuantity": "1 head (300g)",
    "defaultDaysUntilExpiry": 4
  },
  {
    "id": "ing-brown-rice",
    "name": "Brown Rice",
    "category": "Pantry",
    "defaultQuantity": "500g dry",
    "defaultDaysUntilExpiry": 365
  },
  {
    "id": "ing-bulgur-wheat",
    "name": "Bulgur Wheat",
    "category": "Pantry",
    "defaultQuantity": "300g dry",
    "defaultDaysUntilExpiry": 365
  },
  {
    "id": "ing-burger-buns",
    "name": "Burger Buns",
    "category": "Bakery",
    "defaultQuantity": "4 soft brioche buns",
    "defaultDaysUntilExpiry": 4
  },
  {
    "id": "ing-butter",
    "name": "Butter",
    "category": "Dairy & Eggs",
    "defaultQuantity": "250g block",
    "defaultDaysUntilExpiry": 21
  },
  {
    "id": "ing-caesar-dressing",
    "name": "Caesar Dressing",
    "category": "Sauces & Condiments",
    "defaultQuantity": "1 bottle (250ml)",
    "defaultDaysUntilExpiry": 21
  },
  {
    "id": "ing-canned-tuna",
    "name": "Canned Tuna",
    "category": "Meat & Seafood",
    "defaultQuantity": "2 cans (160g drained)",
    "defaultDaysUntilExpiry": 365
  },
  {
    "id": "ing-carrots",
    "name": "Carrots",
    "category": "Produce",
    "defaultQuantity": "500g",
    "defaultDaysUntilExpiry": 7
  },
  {
    "id": "ing-cheddar-cheese",
    "name": "Cheddar Cheese",
    "category": "Dairy & Eggs",
    "defaultQuantity": "150g block or shredded",
    "defaultDaysUntilExpiry": 7
  },
  {
    "id": "ing-cherry-tomatoes",
    "name": "Cherry Tomatoes",
    "category": "Produce",
    "defaultQuantity": "250g",
    "defaultDaysUntilExpiry": 4
  },
  {
    "id": "ing-chicken-breast",
    "name": "Chicken Breast",
    "category": "Meat & Seafood",
    "defaultQuantity": "400g fillets",
    "defaultDaysUntilExpiry": 2
  },
  {
    "id": "ing-chickpeas",
    "name": "Chickpeas",
    "category": "Pantry",
    "defaultQuantity": "1 can (240g drained)",
    "defaultDaysUntilExpiry": 365
  },
  {
    "id": "ing-chipotle-in-adobo",
    "name": "Chipotle in Adobo",
    "category": "Sauces & Condiments",
    "defaultQuantity": "1 small jar (100g)",
    "defaultDaysUntilExpiry": 14
  },
  {
    "id": "ing-cilantro",
    "name": "Cilantro / Fresh Coriander",
    "category": "Produce",
    "defaultQuantity": "1 bunch",
    "defaultDaysUntilExpiry": 3
  },
  {
    "id": "ing-coconut-milk",
    "name": "Coconut Milk",
    "category": "Pantry",
    "defaultQuantity": "1 can (400ml)",
    "defaultDaysUntilExpiry": 180
  },
  {
    "id": "ing-cornstarch",
    "name": "Cornstarch / Maizena",
    "category": "Pantry",
    "defaultQuantity": "1 box (250g)",
    "defaultDaysUntilExpiry": 365
  },
  {
    "id": "ing-cream-cheese",
    "name": "Cream Cheese / Herb Spread",
    "category": "Dairy & Eggs",
    "defaultQuantity": "1 tub (150g)",
    "defaultDaysUntilExpiry": 7
  },
  {
    "id": "ing-crusty-bread",
    "name": "Crusty Country Bread",
    "category": "Bakery",
    "defaultQuantity": "1 rustic loaf",
    "defaultDaysUntilExpiry": 3
  },
  {
    "id": "ing-cucumber",
    "name": "Cucumber",
    "category": "Produce",
    "defaultQuantity": "1 English cucumber",
    "defaultDaysUntilExpiry": 5
  },
  {
    "id": "ing-dijon-mustard",
    "name": "Dijon Mustard",
    "category": "Sauces & Condiments",
    "defaultQuantity": "1 jar (200g)",
    "defaultDaysUntilExpiry": 90
  },
  {
    "id": "ing-edamame",
    "name": "Edamame",
    "category": "Produce",
    "defaultQuantity": "200g shelled",
    "defaultDaysUntilExpiry": 5
  },
  {
    "id": "ing-eggs",
    "name": "Eggs",
    "category": "Dairy & Eggs",
    "defaultQuantity": "6 large eggs",
    "defaultDaysUntilExpiry": 7
  },
  {
    "id": "ing-olive-oil",
    "name": "Extra Virgin Olive Oil",
    "category": "Sauces & Condiments",
    "defaultQuantity": "1 bottle (500ml)",
    "defaultDaysUntilExpiry": 365
  },
  {
    "id": "ing-falafel",
    "name": "Falafel",
    "category": "Pantry",
    "defaultQuantity": "1 box (8-10 pieces)",
    "defaultDaysUntilExpiry": 7
  },
  {
    "id": "ing-feta-cheese",
    "name": "Feta Cheese",
    "category": "Dairy & Eggs",
    "defaultQuantity": "1 block (200g)",
    "defaultDaysUntilExpiry": 7
  },
  {
    "id": "ing-fish-sticks",
    "name": "Fish Sticks",
    "category": "Meat & Seafood",
    "defaultQuantity": "1 box (10 sticks)",
    "defaultDaysUntilExpiry": 60
  },
  {
    "id": "ing-flour",
    "name": "Flour (Whole-Wheat / Plain)",
    "category": "Pantry",
    "defaultQuantity": "500g",
    "defaultDaysUntilExpiry": 365
  },
  {
    "id": "ing-tortillas-wraps",
    "name": "Flour Tortillas / Wraps",
    "category": "Bakery",
    "defaultQuantity": "8 tortillas",
    "defaultDaysUntilExpiry": 6
  },
  {
    "id": "ing-fresh-basil",
    "name": "Fresh Basil",
    "category": "Produce",
    "defaultQuantity": "1 bunch",
    "defaultDaysUntilExpiry": 3
  },
  {
    "id": "ing-fresh-ginger",
    "name": "Fresh Ginger",
    "category": "Produce",
    "defaultQuantity": "1 thumb root",
    "defaultDaysUntilExpiry": 14
  },
  {
    "id": "ing-fresh-mint",
    "name": "Fresh Mint",
    "category": "Produce",
    "defaultQuantity": "1 bunch",
    "defaultDaysUntilExpiry": 4
  },
  {
    "id": "ing-fresh-parsley",
    "name": "Fresh Parsley",
    "category": "Produce",
    "defaultQuantity": "1 bunch flat-leaf",
    "defaultDaysUntilExpiry": 4
  },
  {
    "id": "ing-frozen-mango",
    "name": "Frozen Mango",
    "category": "Produce",
    "defaultQuantity": "1 bag (300g)",
    "defaultDaysUntilExpiry": 90
  },
  {
    "id": "ing-frozen-mixed-veggies",
    "name": "Frozen Mixed Veggies",
    "category": "Produce",
    "defaultQuantity": "1 bag (400g)",
    "defaultDaysUntilExpiry": 90
  },
  {
    "id": "ing-frozen-peas",
    "name": "Frozen Peas",
    "category": "Produce",
    "defaultQuantity": "1 bag (400g)",
    "defaultDaysUntilExpiry": 90
  },
  {
    "id": "ing-frozen-spinach",
    "name": "Frozen Spinach",
    "category": "Produce",
    "defaultQuantity": "1 box (300g)",
    "defaultDaysUntilExpiry": 90
  },
  {
    "id": "ing-garlic",
    "name": "Garlic",
    "category": "Produce",
    "defaultQuantity": "1 bulb",
    "defaultDaysUntilExpiry": 21
  },
  {
    "id": "ing-greek-yogurt",
    "name": "Greek Yogurt",
    "category": "Dairy & Eggs",
    "defaultQuantity": "1 tub (300g)",
    "defaultDaysUntilExpiry": 5
  },
  {
    "id": "ing-ground-beef-turkey",
    "name": "Ground Beef / Turkey",
    "category": "Meat & Seafood",
    "defaultQuantity": "500g lean",
    "defaultDaysUntilExpiry": 2
  },
  {
    "id": "ing-hummus",
    "name": "Hummus",
    "category": "Pantry",
    "defaultQuantity": "1 tub (200g)",
    "defaultDaysUntilExpiry": 7
  },
  {
    "id": "ing-lasagna-sheets",
    "name": "Lasagna Sheets",
    "category": "Pantry",
    "defaultQuantity": "1 box (500g)",
    "defaultDaysUntilExpiry": 365
  },
  {
    "id": "ing-lean-ham",
    "name": "Lean Ham",
    "category": "Meat & Seafood",
    "defaultQuantity": "150g sliced",
    "defaultDaysUntilExpiry": 4
  },
  {
    "id": "ing-leeks",
    "name": "Leeks",
    "category": "Produce",
    "defaultQuantity": "2 leeks",
    "defaultDaysUntilExpiry": 5
  },
  {
    "id": "ing-lemons",
    "name": "Lemons",
    "category": "Produce",
    "defaultQuantity": "3 lemons",
    "defaultDaysUntilExpiry": 7
  },
  {
    "id": "ing-lentils-brown-green",
    "name": "Lentils (Brown or Green)",
    "category": "Pantry",
    "defaultQuantity": "500g dry",
    "defaultDaysUntilExpiry": 365
  },
  {
    "id": "ing-lentils-red",
    "name": "Lentils (Red)",
    "category": "Pantry",
    "defaultQuantity": "500g dry",
    "defaultDaysUntilExpiry": 365
  },
  {
    "id": "ing-limes",
    "name": "Limes",
    "category": "Produce",
    "defaultQuantity": "3 limes",
    "defaultDaysUntilExpiry": 7
  },
  {
    "id": "ing-maple-syrup",
    "name": "Maple Syrup",
    "category": "Pantry",
    "defaultQuantity": "1 bottle (250ml)",
    "defaultDaysUntilExpiry": 365
  },
  {
    "id": "ing-mayonnaise",
    "name": "Mayonnaise",
    "category": "Sauces & Condiments",
    "defaultQuantity": "1 jar (250ml)",
    "defaultDaysUntilExpiry": 30
  },
  {
    "id": "ing-milk",
    "name": "Milk",
    "category": "Dairy & Eggs",
    "defaultQuantity": "1 liter",
    "defaultDaysUntilExpiry": 6
  },
  {
    "id": "ing-mozzarella",
    "name": "Mozzarella Cheese",
    "category": "Dairy & Eggs",
    "defaultQuantity": "1 ball (125g)",
    "defaultDaysUntilExpiry": 4
  },
  {
    "id": "ing-mushrooms",
    "name": "Mushrooms",
    "category": "Produce",
    "defaultQuantity": "250g cremini",
    "defaultDaysUntilExpiry": 4
  },
  {
    "id": "ing-onions-red",
    "name": "Onions (Red)",
    "category": "Produce",
    "defaultQuantity": "2 onions",
    "defaultDaysUntilExpiry": 14
  },
  {
    "id": "ing-onions-yellow",
    "name": "Onions (Yellow)",
    "category": "Produce",
    "defaultQuantity": "3 onions",
    "defaultDaysUntilExpiry": 14
  },
  {
    "id": "ing-orzo-pasta",
    "name": "Orzo Pasta",
    "category": "Pantry",
    "defaultQuantity": "500g",
    "defaultDaysUntilExpiry": 365
  },
  {
    "id": "ing-parmesan",
    "name": "Parmesan Cheese",
    "category": "Dairy & Eggs",
    "defaultQuantity": "1 wedge (100g)",
    "defaultDaysUntilExpiry": 21
  },
  {
    "id": "ing-pasta-whole-wheat",
    "name": "Pasta (Whole-Wheat)",
    "category": "Pantry",
    "defaultQuantity": "500g",
    "defaultDaysUntilExpiry": 365
  },
  {
    "id": "ing-peanut-butter",
    "name": "Peanut Butter",
    "category": "Pantry",
    "defaultQuantity": "1 jar (350g)",
    "defaultDaysUntilExpiry": 180
  },
  {
    "id": "ing-pearl-barley",
    "name": "Pearl Barley",
    "category": "Pantry",
    "defaultQuantity": "250g dry",
    "defaultDaysUntilExpiry": 365
  },
  {
    "id": "ing-pita-bread",
    "name": "Pita Bread",
    "category": "Bakery",
    "defaultQuantity": "4 pitas",
    "defaultDaysUntilExpiry": 5
  },
  {
    "id": "ing-pizza-dough",
    "name": "Pizza Dough",
    "category": "Bakery",
    "defaultQuantity": "1 dough ball (400g)",
    "defaultDaysUntilExpiry": 3
  },
  {
    "id": "ing-pomegranate-seeds",
    "name": "Pomegranate Seeds",
    "category": "Produce",
    "defaultQuantity": "1 cup (150g)",
    "defaultDaysUntilExpiry": 5
  },
  {
    "id": "ing-potatoes",
    "name": "Potatoes",
    "category": "Produce",
    "defaultQuantity": "1 kg yellow potatoes",
    "defaultDaysUntilExpiry": 14
  },
  {
    "id": "ing-pumpkin",
    "name": "Pumpkin / Butternut Squash",
    "category": "Produce",
    "defaultQuantity": "500g diced",
    "defaultDaysUntilExpiry": 10
  },
  {
    "id": "ing-pumpkin-seeds",
    "name": "Pumpkin Seeds",
    "category": "Pantry",
    "defaultQuantity": "100g bag",
    "defaultDaysUntilExpiry": 180
  },
  {
    "id": "ing-quinoa",
    "name": "Quinoa",
    "category": "Pantry",
    "defaultQuantity": "300g dry",
    "defaultDaysUntilExpiry": 365
  },
  {
    "id": "ing-romaine-lettuce",
    "name": "Romaine Lettuce",
    "category": "Produce",
    "defaultQuantity": "2 heads",
    "defaultDaysUntilExpiry": 4
  },
  {
    "id": "ing-salmon-fillet",
    "name": "Salmon Fillet",
    "category": "Meat & Seafood",
    "defaultQuantity": "2 fresh fillets (300g)",
    "defaultDaysUntilExpiry": 2
  },
  {
    "id": "ing-sesame-oil",
    "name": "Sesame Oil",
    "category": "Sauces & Condiments",
    "defaultQuantity": "1 bottle (150ml)",
    "defaultDaysUntilExpiry": 365
  },
  {
    "id": "ing-shredded-cheese",
    "name": "Shredded Cheese (Melting)",
    "category": "Dairy & Eggs",
    "defaultQuantity": "200g bag",
    "defaultDaysUntilExpiry": 7
  },
  {
    "id": "ing-soy-sauce",
    "name": "Soy Sauce / Tamari",
    "category": "Sauces & Condiments",
    "defaultQuantity": "1 bottle (250ml)",
    "defaultDaysUntilExpiry": 365
  },
  {
    "id": "ing-spanish-chorizo",
    "name": "Spanish Chorizo",
    "category": "Meat & Seafood",
    "defaultQuantity": "150g sliced or sausage",
    "defaultDaysUntilExpiry": 10
  },
  {
    "id": "ing-spatzle",
    "name": "Spätzle",
    "category": "Pantry",
    "defaultQuantity": "500g fresh or dry",
    "defaultDaysUntilExpiry": 14
  },
  {
    "id": "ing-spring-onions",
    "name": "Spring Onions",
    "category": "Produce",
    "defaultQuantity": "1 bunch",
    "defaultDaysUntilExpiry": 5
  },
  {
    "id": "ing-sprouts",
    "name": "Sprouts",
    "category": "Produce",
    "defaultQuantity": "1 container (100g)",
    "defaultDaysUntilExpiry": 3
  },
  {
    "id": "ing-sun-dried-tomatoes",
    "name": "Sun-Dried Tomatoes",
    "category": "Pantry",
    "defaultQuantity": "1 jar in oil (200g)",
    "defaultDaysUntilExpiry": 30
  },
  {
    "id": "ing-sushi-rice",
    "name": "Sushi Rice",
    "category": "Pantry",
    "defaultQuantity": "500g dry",
    "defaultDaysUntilExpiry": 365
  },
  {
    "id": "ing-sweet-corn",
    "name": "Sweet Corn",
    "category": "Pantry",
    "defaultQuantity": "1 can (200g)",
    "defaultDaysUntilExpiry": 365
  },
  {
    "id": "ing-sweet-potatoes",
    "name": "Sweet Potatoes",
    "category": "Produce",
    "defaultQuantity": "2 large sweet potatoes",
    "defaultDaysUntilExpiry": 14
  },
  {
    "id": "ing-teriyaki-sauce",
    "name": "Teriyaki Sauce",
    "category": "Sauces & Condiments",
    "defaultQuantity": "1 bottle (200ml)",
    "defaultDaysUntilExpiry": 180
  },
  {
    "id": "ing-tofu-firm",
    "name": "Tofu (Firm)",
    "category": "Produce",
    "defaultQuantity": "1 block (400g)",
    "defaultDaysUntilExpiry": 5
  },
  {
    "id": "ing-tomato-paste",
    "name": "Tomato Paste",
    "category": "Pantry",
    "defaultQuantity": "1 tube (150g)",
    "defaultDaysUntilExpiry": 30
  },
  {
    "id": "ing-tomato-sauce",
    "name": "Tomato Sauce / Crushed Tomatoes",
    "category": "Pantry",
    "defaultQuantity": "1 can (400g)",
    "defaultDaysUntilExpiry": 365
  },
  {
    "id": "ing-tomatoes",
    "name": "Tomatoes",
    "category": "Produce",
    "defaultQuantity": "4 ripe vine tomatoes",
    "defaultDaysUntilExpiry": 4
  },
  {
    "id": "ing-udon-noodles",
    "name": "Udon Noodles",
    "category": "Pantry",
    "defaultQuantity": "2 packs (400g)",
    "defaultDaysUntilExpiry": 30
  },
  {
    "id": "ing-vegetable-broth",
    "name": "Vegetable Broth",
    "category": "Pantry",
    "defaultQuantity": "1 liter or cubes",
    "defaultDaysUntilExpiry": 180
  },
  {
    "id": "ing-veggie-patties",
    "name": "Veggie / Protein Patties",
    "category": "Meat & Seafood",
    "defaultQuantity": "2 patties (200g)",
    "defaultDaysUntilExpiry": 5
  },
  {
    "id": "ing-vinaigrette",
    "name": "Vinaigrette Dressing",
    "category": "Sauces & Condiments",
    "defaultQuantity": "1 bottle (250ml)",
    "defaultDaysUntilExpiry": 60
  },
  {
    "id": "ing-white-beans",
    "name": "White Cannellini Beans",
    "category": "Pantry",
    "defaultQuantity": "1 can (240g drained)",
    "defaultDaysUntilExpiry": 365
  },
  {
    "id": "ing-whole-grain-bread",
    "name": "Whole-Grain Bread",
    "category": "Bakery",
    "defaultQuantity": "1 loaf",
    "defaultDaysUntilExpiry": 5
  },
  {
    "id": "ing-croutons",
    "name": "Whole-Wheat Croutons",
    "category": "Bakery",
    "defaultQuantity": "1 bag (100g)",
    "defaultDaysUntilExpiry": 30
  },
  {
    "id": "ing-zucchini",
    "name": "Zucchini",
    "category": "Produce",
    "defaultQuantity": "2 medium zucchini",
    "defaultDaysUntilExpiry": 4
  }
];
