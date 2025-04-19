import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import MealForm from "@/components/nutrition/meal-form";
import RecipeCard from "@/components/nutrition/recipe-card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { pageVariants, listVariants, listItemVariants } from "@/lib/animation";
import { Recipe, MealAnalysis } from "@/types";

// Sample recipes data
const RECIPES: Recipe[] = [
  {
    id: "1",
    name: "Rainbow Protein Bowl",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    prepTime: "20 min",
    calories: 420,
    protein: 32,
    tags: ["High Protein"],
    ingredients: [
      "150g grilled chicken breast",
      "1/2 cup quinoa, cooked",
      "1 cup mixed vegetables (bell peppers, carrots, cucumber)",
      "1/4 avocado, sliced",
      "2 tbsp hummus",
      "1 tbsp olive oil",
      "Lemon juice, salt and pepper to taste"
    ],
    instructions: [
      "Cook quinoa according to package instructions and let cool",
      "Grill chicken breast and slice into strips",
      "Chop vegetables into bite-sized pieces",
      "Arrange all ingredients in a bowl",
      "Drizzle with olive oil and lemon juice",
      "Season with salt and pepper to taste"
    ]
  },
  {
    id: "2",
    name: "Mediterranean Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    prepTime: "15 min",
    calories: 350,
    protein: 18,
    tags: ["Low Calorie"],
    ingredients: [
      "1 cup mixed greens",
      "1/2 cup chickpeas, rinsed and drained",
      "1/4 cup feta cheese, crumbled",
      "10 cherry tomatoes, halved",
      "1/4 cucumber, diced",
      "10 kalamata olives",
      "2 tbsp Greek yogurt",
      "1 tbsp olive oil",
      "1 tsp dried oregano",
      "Lemon juice, salt and pepper to taste"
    ],
    instructions: [
      "Place mixed greens in a bowl",
      "Add chickpeas, tomatoes, cucumber, and olives",
      "Sprinkle with feta cheese",
      "Mix Greek yogurt with olive oil, oregano, lemon juice, salt and pepper",
      "Drizzle dressing over the salad",
      "Toss gently and serve"
    ]
  },
  {
    id: "3",
    name: "Avocado Grain Bowl",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    prepTime: "25 min",
    calories: 480,
    protein: 22,
    tags: ["Energy Boost"],
    ingredients: [
      "1/2 cup brown rice, cooked",
      "1/2 cup black beans, rinsed and drained",
      "1 avocado, sliced",
      "1 small sweet potato, roasted and cubed",
      "1 cup kale, chopped",
      "2 tbsp pumpkin seeds",
      "2 tbsp tahini",
      "1 tbsp maple syrup",
      "1 tbsp lime juice",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Cook brown rice according to package instructions",
      "Roast sweet potato cubes with olive oil, salt and pepper at 400°F for 20 minutes",
      "Massage kale with a little olive oil and salt until softened",
      "Combine rice, beans, sweet potato, and kale in a bowl",
      "Top with avocado slices and pumpkin seeds",
      "Mix tahini with maple syrup, lime juice, salt and pepper",
      "Drizzle dressing over the bowl and serve"
    ]
  }
];

export default function Nutrition() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showRecipeDialog, setShowRecipeDialog] = useState(false);
  const [mealAnalysis, setMealAnalysis] = useState<MealAnalysis | null>(null);

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setShowRecipeDialog(true);
  };

  const handleMealAnalysis = (analysis: MealAnalysis) => {
    setMealAnalysis(analysis);
  };

  return (
    <motion.section
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="py-20 bg-neutral-100"
    >
      <div className="container mx-auto px-4 pt-16">
        <h2 className="text-2xl font-poppins font-bold mb-2 text-secondary">Nutrition & Recipes</h2>
        <p className="text-neutral-600 mb-10">Track your meals and discover healthy recipe ideas tailored to your goals</p>
        
        {/* Meal Tracking Tabs */}
        <motion.div 
          variants={listItemVariants}
          className="bg-white rounded-2xl shadow-md mb-12 overflow-hidden text-secondary"
        >
          <Tabs defaultValue="log">
            <TabsList className="border-b w-full justify-start rounded-none p-0 h-auto">
              <TabsTrigger 
                value="log"
                className="px-6 py-4 font-medium data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Log Meal
              </TabsTrigger>
              <TabsTrigger 
                value="history"
                className="px-6 py-4 font-medium data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Meal History
              </TabsTrigger>
              <TabsTrigger 
                value="goals"
                className="px-6 py-4 font-medium data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Nutrition Goals
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="log" className="p-6">
              <MealForm onAnalysisComplete={handleMealAnalysis} />
            </TabsContent>
            
            <TabsContent value="history" className="p-6">
              <h3 className="font-medium mb-4">Your Meal History</h3>
              <p className="text-neutral-500">You haven't logged any meals yet. Start by logging your first meal!</p>
            </TabsContent>
            
            <TabsContent value="goals" className="p-6">
              <h3 className="font-medium mb-4">Your Nutrition Goals</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-neutral-100 p-4 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Daily Calories</h4>
                  <p className="text-2xl font-bold">1,800 kcal</p>
                </div>
                <div className="bg-neutral-100 p-4 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Protein Goal</h4>
                  <p className="text-2xl font-bold">120g</p>
                  <p className="text-xs text-neutral-500">30% of daily calories</p>
                </div>
                <div className="bg-neutral-100 p-4 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Water Intake</h4>
                  <p className="text-2xl font-bold">2.5L</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
        
        {/* Recipe Suggestions */}
        <motion.div variants={listVariants}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-medium">Soulful Recipes For You</h3>
            <Button variant="link" className="text-primary flex items-center text-sm">
              <span>View All</span>
              <i className='bx bx-right-arrow-alt ml-1'></i>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-red-400">
            {RECIPES.map(recipe => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                onClick={() => handleRecipeClick(recipe)}
              />
            ))}
          </div>
          
          {/* Meal Planner CTA */}
          <motion.div 
            variants={listItemVariants}
            className="mt-12 bg-gradient-to-r from-primary to-accent rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="md:flex">
              <div className="md:w-2/3 p-8 md:p-10">
                <h3 className="text-white font-poppins font-bold text-2xl mb-3">Get Your Personal Meal Plan</h3>
                <p className="text-white/80 mb-6">Let our AI create a customized weekly meal plan based on your fitness goals, preferences, and available ingredients.</p>
                <Button className="bg-white text-primary hover:bg-neutral-100">
                  <i className='bx bx-calendar-star mr-2'></i>
                  <span>Generate My Meal Plan</span>
                </Button>
              </div>
              <div className="md:w-1/3 hidden md:block relative">
                <img 
                  src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                  alt="Healthy foods" 
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Recipe Details Dialog */}
      <Dialog open={showRecipeDialog} onOpenChange={setShowRecipeDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedRecipe?.name}</DialogTitle>
          </DialogHeader>
          {selectedRecipe && (
            <div className="space-y-4">
              <div className="h-60 rounded-lg overflow-hidden">
                <img 
                  src={selectedRecipe.image} 
                  alt={selectedRecipe.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex space-x-4">
                <div className="flex items-center text-sm">
                  <i className='bx bx-time-five mr-1'></i>
                  <span>{selectedRecipe.prepTime}</span>
                </div>
                <div className="flex items-center text-sm">
                  <i className='bx bx-food-tag mr-1'></i>
                  <span>{selectedRecipe.calories} calories</span>
                </div>
                <div className="flex items-center text-sm">
                  <i className='bx bx-dumbbell mr-1'></i>
                  <span>{selectedRecipe.protein}g protein</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-lg mb-2">Ingredients</h4>
                  <ul className="space-y-2">
                    {selectedRecipe.ingredients?.map((ingredient, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-lg mb-2">Instructions</h4>
                  <ol className="space-y-2 list-decimal list-inside">
                    {selectedRecipe.instructions?.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button>Add to Meal Plan</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.section>
  );
}
