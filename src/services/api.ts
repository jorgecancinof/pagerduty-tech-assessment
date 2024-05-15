import { Recipe, RecipeResponse } from "../types/Recipe.ts";
import mockData from "./mock-data.json";

export const mockRecipesRequest = (
  query: string,
  delayInSeconds: number,
): Promise<RecipeResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const unfilteredRecipes = mockData.meals;

      const filteredRecipes = unfilteredRecipes.filter((recipe) =>
        recipe.strMeal.toLowerCase().includes(query.toLowerCase()),
      );

      resolve({ meals: filteredRecipes });
    }, delayInSeconds * 1000);
  });
};

export async function searchRecipes(query: string): Promise<Recipe[]> {
  return mockRecipesRequest(query, 0.5).then((response) => response.meals);
}
