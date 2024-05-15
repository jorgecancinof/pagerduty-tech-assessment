import React, { useState, useCallback } from "react";
import { Search } from "./components/Search";
import { List } from "./components/List";
import { Details } from "./components/Details";
import { MessageDisplay } from "./components/MessageDisplay.tsx";
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
      {query ? (
        <>
          <List
            recipes={recipes}
            query={query}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            focusSearchInput={focusSearchInput}
          />
          {selectedIndex !== null && (
            <Details recipe={recipes[selectedIndex]} />
          )}
        </>
      ) : (
        <MessageDisplay>
          <h2>Welcome!</h2>
          <p>Search for a recipe to get started</p>
        </MessageDisplay>
      )}
    </main>
  );
};

export default App;
