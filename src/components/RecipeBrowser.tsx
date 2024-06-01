import React, { useState, memo } from "react";
import useFetch from "../hooks/useFetch";
import RecipeList from "./recipe/RecipeList";
import RecipeDetails from "./recipe/RecipeDetails";
import ErrorMessage from "./ui/ErrorMessage";
import LoadingIndicator from "./ui/LoadingIndicator";
import BrowserContainer from "./ui/BrowserContainer";
import { Recipe, RecipeResponse } from "../types/recipe";

interface RecipeBrowserProps {
  query: string;
  recipes: Recipe[] | null;
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[] | null>>;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  focusSearchInput: () => void;
  handleShowRecipeOnMobile: (show: boolean) => void;
}

function RecipeBrowser({
  query,
  recipes,
  setRecipes,
  selectedIndex,
  setSelectedIndex,
  focusSearchInput,
  handleShowRecipeOnMobile,
}: RecipeBrowserProps) {
  const [highlightedTerm, setHighlightedTerm] = useState(query);
  const { isLoading, isError } = useFetch<RecipeResponse>({
    input: `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
    onSuccess: (data) => {
      setRecipes(data.meals ?? []);
      setSelectedIndex(0);
      setHighlightedTerm(query);
    },
  });

  if (isError) {
    return (
      <BrowserContainer>
        <ErrorMessage />
      </BrowserContainer>
    );
  }

  if (isLoading || recipes === null) {
    return (
      <BrowserContainer>
        <LoadingIndicator />
      </BrowserContainer>
    );
  }

  if (recipes.length === 0) {
    return <BrowserContainer>No recipes found</BrowserContainer>;
  }

  return (
    <>
      <RecipeList
        recipes={recipes}
        highlightedTerm={highlightedTerm}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        focusSearchInput={focusSearchInput}
        handleShowRecipeOnMobile={handleShowRecipeOnMobile}
      />
      <RecipeDetails recipe={recipes[selectedIndex]} />
    </>
  );
}

const MemoizedRecipeBrowser = memo(RecipeBrowser);
export default MemoizedRecipeBrowser;
