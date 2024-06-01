import mockRecipeData from "./mock-recipe-data.json";
import { RecipeResponse } from "../types/recipe";

const MOCK_RESPONSE_DELAY_MS = 500;

export function mockRecipesSearchRequest(
  query: string,
): Promise<RecipeResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const unfilteredRecipes = mockRecipeData.meals;

      const filteredRecipes = unfilteredRecipes.filter((recipe) =>
        recipe.strMeal.toLowerCase().includes(query.toLowerCase()),
      );

      resolve({ meals: filteredRecipes });
    }, MOCK_RESPONSE_DELAY_MS);
  });
}
