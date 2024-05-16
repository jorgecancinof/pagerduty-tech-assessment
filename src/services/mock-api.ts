import { RecipeResponse } from "../types/Recipe.ts";
import mockData from "./mock-api-response.json";

const MOCK_RESPONSE_DELAY_MS = 500;

export const mockRecipesRequest = (query: string): Promise<RecipeResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const unfilteredRecipes = mockData.meals;

      const filteredRecipes = unfilteredRecipes.filter((recipe) =>
        recipe.strMeal.toLowerCase().includes(query.toLowerCase()),
      );

      resolve({ meals: filteredRecipes });
    }, MOCK_RESPONSE_DELAY_MS);
  });
};
