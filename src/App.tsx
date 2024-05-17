import React, { useState, useCallback } from "react";
import { Search } from "./components/Search";
import { RecipeDisplay } from "./components/RecipeDisplay";
import { Recipe } from "./types/Recipe";
import useDebounce from "./hooks/useDebounce.ts";
import KeyboardHint from "./components/KeyboardHint.tsx";
import CloseDetailsButton from "./components/CloseDetailsButton.tsx";

const QUERY_DEBOUNCE_DELAY_MS = 500;

export const App: React.FC = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, QUERY_DEBOUNCE_DELAY_MS);
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showMobileDetails, setShowMobileDetails] = useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

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
      <RecipeDisplay
        query={debouncedQuery}
        recipes={recipes}
        setRecipes={setRecipes}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        focusSearchInput={focusSearchInput}
        handleShowMobileDetails={handleShowMobileDetails}
      />
      <KeyboardHint />
    </main>
  );
};

export default App;
