import React, { useState, useCallback } from "react";
import { Search } from "./components/Search";
import { RecipeDisplay } from "./components/RecipeDisplay";
import { Recipe } from "./types/Recipe";
import useDebounce from "./hooks/useDebounce.ts";

const QUERY_DEBOUNCE_DELAY_MS = 500;

export const App: React.FC = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, QUERY_DEBOUNCE_DELAY_MS);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const focusSearchInput = useCallback(() => {
    searchInputRef.current?.focus();
  }, []);

  return (
    <main className="app">
      <Search
        query={query}
        setQuery={setQuery}
        setSelectedIndex={setSelectedIndex}
        searchInputRef={searchInputRef}
        focusSearchInput={focusSearchInput}
        totalItemsCount={recipes.length}
      />
      <RecipeDisplay
        query={debouncedQuery}
        recipes={recipes}
        setRecipes={setRecipes}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        focusSearchInput={focusSearchInput}
      />
    </main>
  );
};

export default App;
