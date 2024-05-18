import React, { useState, useCallback, useEffect } from "react";
import useFetch from "../hooks/useFetch.ts";
import useDebounce from "../hooks/useDebounce.ts";
import Search from "./Search";
import ErrorDisplay from "./ErrorDisplay.tsx";
import LoadingDisplay from "./LoadingDisplay.tsx";
import MessageDisplay from "./MessageDisplay.tsx";
import RecipeDisplay from "./RecipeDisplay";
import KeyboardHint from "./KeyboardHint.tsx";
import CloseDetailsButton from "./CloseDetailsButton.tsx";
import { Recipe, RecipeResponse } from "../types/Recipe";

const QUERY_DEBOUNCE_DELAY_MS = 500;

const App: React.FC = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, QUERY_DEBOUNCE_DELAY_MS);
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [showMobileDetails, setShowMobileDetails] = useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const { isLoading, isError } = useFetch<RecipeResponse>({
    input: `https://www.themealdb.com/api/json/v1/1/search.php?s=${debouncedQuery}`,
    onSuccess: (data) => {
      setRecipes(data.meals ?? []);
      setSelectedIndex(0);
    },
  });

  useEffect(() => {
    if (isLoading) setRecipes(null);
  }, [isLoading, setRecipes]);

  const focusSearchInput = useCallback(() => {
    searchInputRef.current?.focus();
  }, []);

  const handleShowMobileDetails = useCallback((show: boolean) => {
    setShowMobileDetails(show);
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);

  const result = () => {
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
      <RecipeDisplay
        query={debouncedQuery}
        recipes={recipes}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        focusSearchInput={focusSearchInput}
        handleShowMobileDetails={handleShowMobileDetails}
      />
    );
  };

  return (
    <main className={`app ${showMobileDetails ? "app--mobile-show-item" : ""}`}>
      <CloseDetailsButton onClick={() => handleShowMobileDetails(false)} />
      <Search
        query={query}
        setQuery={setQuery}
        setSelectedIndex={setSelectedIndex}
        searchInputRef={searchInputRef}
        focusSearchInput={focusSearchInput}
        totalItemsCount={recipes?.length ?? 0}
      />
      {result()}
      <KeyboardHint />
    </main>
  );
};

export default App;
