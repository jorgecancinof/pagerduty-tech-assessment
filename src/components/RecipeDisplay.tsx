import React from "react";
import { List } from "./List";
import { Details } from "./Details";
import { Recipe } from "../types/Recipe";

interface RecipeDisplayProps {
  query: string;
  recipes: Recipe[];
  selectedIndex: number | null;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  focusSearchInput: () => void;
}

export const RecipeDisplay: React.FC<RecipeDisplayProps> = ({
  query,
  recipes,
  selectedIndex,
  setSelectedIndex,
  focusSearchInput,
}) => {
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
