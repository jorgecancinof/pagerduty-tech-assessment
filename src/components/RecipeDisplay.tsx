import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { List } from "./List";
import { Details } from "./Details";
import { Recipe, RecipeResponse } from "../types/Recipe";

interface RecipeDisplayProps {
  query: string;
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
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
  const { fetchedData } = useFetch<RecipeResponse>(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
  );

  useEffect(() => {
    setRecipes(fetchedData?.meals || []);
    setSelectedIndex(fetchedData ? 0 : null);
  }, [fetchedData, setRecipes, setSelectedIndex]);

  return (
    recipes.length > 0 && (
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
    )
  );
};
