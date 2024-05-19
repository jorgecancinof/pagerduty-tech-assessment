import { useState, useCallback, useRef } from "react";
import useDebounce from "../hooks/useDebounce.ts";
import Search from "./Search";
import RecipeDisplay from "./RecipeDisplay";
import KeyboardHint from "./KeyboardHint.tsx";
import CloseDetailsButton from "./CloseDetailsButton.tsx";
import { Recipe } from "../types/Recipe";

const QUERY_DEBOUNCE_DELAY_MS = 500;

function App() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, QUERY_DEBOUNCE_DELAY_MS);
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [showMobileDetails, setShowMobileDetails] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

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
}

export default App;
