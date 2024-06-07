import { useState, useCallback, useRef } from "react";
import useDebounce from "../hooks/useDebounce";
import SearchRecipe from "./SearchRecipe";
import RecipeBrowser from "./RecipeBrowser";
import KeyboardHint from "./ui/KeyboardHint";
import { Recipe } from "../types/recipe";

const QUERY_DEBOUNCE_DELAY_MS = 500;

function App() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, QUERY_DEBOUNCE_DELAY_MS);
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [showRecipeOnMobile, setShowRecipeOnMobile] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const focusSearchInput = useCallback(() => {
    searchInputRef.current?.focus();
  }, []);

  return (
    <main
      className={`app ${showRecipeOnMobile ? "app--show-recipe-mobile" : ""}`}
    >
      <SearchRecipe
        query={query}
        setQuery={setQuery}
        setSelectedIndex={setSelectedIndex}
        searchInputRef={searchInputRef}
        focusSearchInput={focusSearchInput}
        totalItemsCount={recipes?.length ?? 0}
      />
      <RecipeBrowser
        query={debouncedQuery}
        recipes={recipes}
        setRecipes={setRecipes}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        showRecipeOnMobile={showRecipeOnMobile}
        setShowRecipeOnMobile={setShowRecipeOnMobile}
        focusSearchInput={focusSearchInput}
      />
      <KeyboardHint />
    </main>
  );
}

export default App;
