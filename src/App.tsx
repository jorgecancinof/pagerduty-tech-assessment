import React, { useState, useCallback } from "react";
import { Search } from "./components/Search";
import { RecipeDisplay } from "./components/RecipeDisplay";
import { Recipe } from "./types/Recipe";

export const App: React.FC = () => {
  const [query, setQuery] = useState("");
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
        recipes={recipes}
        setRecipes={setRecipes}
        setSelectedIndex={setSelectedIndex}
        searchInputRef={searchInputRef}
        focusSearchInput={focusSearchInput}
      />
      <RecipeDisplay
        query={query}
        recipes={recipes}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        focusSearchInput={focusSearchInput}
      />
    </main>
  );
};

export default App;
