import React from "react";
import useFetch from "../hooks/useFetch";
import { List } from "./List";
import { Details } from "./Details";
import { MessageDisplay } from "./MessageDisplay.tsx";
import { Recipe, RecipeResponse } from "../types/Recipe";

interface RecipeDisplayProps {
  query: string;
  recipes: Recipe[] | null;
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[] | null>>;
  selectedIndex: number | null;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  focusSearchInput: () => void;
}

export const RecipeDisplay: React.FC<RecipeDisplayProps> = ({
  query,
  recipes,
  setRecipes,
  selectedIndex,
  setSelectedIndex,
  focusSearchInput,
}) => {
  const { isLoading, isError } = useFetch<RecipeResponse>({
    input: `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
    onSuccess: (data) => {
      setRecipes(data.meals ?? []);
      setSelectedIndex(0);
    },
  });

  if (isError) {
    return <MessageDisplay>Error</MessageDisplay>;
  }

  if (isLoading || recipes === null) {
    return <MessageDisplay>Loading...</MessageDisplay>;
  }

  if (recipes.length === 0) {
    return <MessageDisplay>No recipes found</MessageDisplay>;
  }

  return (
    <>
      <List
        recipes={recipes}
        query={query}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        focusSearchInput={focusSearchInput}
      />
      {selectedIndex !== null && <Details recipe={recipes[selectedIndex]} />}
    </>
  );
};
