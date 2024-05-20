import React, { useState, memo } from "react";
import useFetch from "../hooks/useFetch.ts";
import List from "./List";
import Details from "./Details";
import ErrorDisplay from "./ErrorDisplay.tsx";
import LoadingDisplay from "./LoadingDisplay.tsx";
import MessageDisplay from "./MessageDisplay.tsx";
import { Recipe, RecipeResponse } from "../types/Recipe";

interface RecipeDisplayProps {
  query: string;
  recipes: Recipe[] | null;
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[] | null>>;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  focusSearchInput: () => void;
  handleShowMobileDetails: (show: boolean) => void;
}

function RecipeDisplay({
  query,
  recipes,
  setRecipes,
  selectedIndex,
  setSelectedIndex,
  focusSearchInput,
  handleShowMobileDetails,
}: RecipeDisplayProps) {
  const [highlightedText, setHighlightedText] = useState(query);
  const { isLoading, isError } = useFetch<RecipeResponse>({
    input: `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
    onSuccess: (data) => {
      setRecipes(data.meals ?? []);
      setSelectedIndex(0);
      setHighlightedText(query);
    },
  });

  if (isError) {
    return <ErrorDisplay />;
  }

  if (isLoading || recipes === null) {
    return <LoadingDisplay />;
  }

  if (recipes.length === 0) {
    return <MessageDisplay>No recipes found</MessageDisplay>;
  }

  return (
    <>
      <List
        recipes={recipes}
        highlightedText={highlightedText}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        focusSearchInput={focusSearchInput}
        handleShowMobileDetails={handleShowMobileDetails}
      />
      <Details recipe={recipes[selectedIndex]} />
    </>
  );
}

const MemoizedRecipeDisplay = memo(RecipeDisplay);
export default MemoizedRecipeDisplay;
