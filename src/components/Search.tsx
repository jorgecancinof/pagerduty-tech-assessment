import React, { useEffect, useCallback } from "react";
import { searchRecipes } from "../services/api";
import IconSearch from "./icons/IconSearch.tsx";
import IconCloseCircle from "./icons/IconCloseCircle.tsx";
import { Recipe } from "../types/Recipe";

interface Props {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  searchInputRef: React.RefObject<HTMLInputElement>;
  focusSearchInput: () => void;
}

export const Search: React.FC<Props> = ({
  query,
  setQuery,
  recipes,
  setRecipes,
  setSelectedIndex,
  searchInputRef,
  focusSearchInput,
}) => {
  const handleSearchInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setQuery(value);

    if (value.length > 0) {
      const results = await searchRecipes(value);
      setRecipes(results);
      setSelectedIndex(0);
    } else {
      setRecipes([]);
      setSelectedIndex(null);
    }
  };

  const handleClear = useCallback(() => {
    setQuery("");
    setRecipes([]);
    setSelectedIndex(null);
    focusSearchInput();
  }, [setQuery, setRecipes, setSelectedIndex, focusSearchInput]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleSearchInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    const isArrowUp = event.key === "ArrowUp";
    const isArrowDown = event.key === "ArrowDown";

    if (isArrowDown || isArrowUp) {
      event.preventDefault();

      setSelectedIndex((prevIndex) => {
        const lastIndex = recipes.length - 1;
        const isFirstItem = prevIndex === 0;
        const isLastItem = prevIndex === lastIndex;
        const isNoSelection = prevIndex === null;

        if (isArrowDown) {
          return isNoSelection || isLastItem ? 0 : prevIndex + 1;
        } else {
          return isNoSelection || isFirstItem ? lastIndex : prevIndex - 1;
        }
      });
    }
  };

  const handleDocumentKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClear();
      }
    },
    [handleClear],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleDocumentKeyDown);

    return () => {
      document.removeEventListener("keydown", handleDocumentKeyDown);
    };
  }, [handleDocumentKeyDown]);

  return (
    <form className="search" onSubmit={handleSubmit}>
      <label
        className="search__icon"
        htmlFor="search"
        aria-label="Search recipes"
      >
        <IconSearch />
      </label>
      <input
        id="search"
        type="text"
        placeholder="Search recipes..."
        className="search__input"
        value={query}
        onChange={handleSearchInputChange}
        onKeyDown={handleSearchInputKeyDown}
        ref={searchInputRef}
        maxLength={50}
        autoFocus
      />
      {query.length > 0 && (
        <button
          type="reset"
          title="Clear"
          aria-label="Clear"
          className="search__clear"
          onClick={handleClear}
        >
          <IconCloseCircle />
        </button>
      )}
    </form>
  );
};
