import React, { useEffect, useCallback } from "react";
import IconSearch from "./icons/IconSearch";
import IconClose from "./icons/IconClose";

interface SearchRecipeProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  searchInputRef: React.RefObject<HTMLInputElement>;
  focusSearchInput: () => void;
  totalItemsCount: number;
}

function SearchRecipe({
  query,
  setQuery,
  setSelectedIndex,
  searchInputRef,
  focusSearchInput,
  totalItemsCount,
}: SearchRecipeProps) {
  function handleSearchInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setQuery(value);
  }

  function handleSearchInputKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>,
  ) {
    const isArrowUp = event.key === "ArrowUp";
    const isArrowDown = event.key === "ArrowDown";

    if (isArrowDown || isArrowUp) {
      event.preventDefault();

      setSelectedIndex((prevIndex) => {
        const firstIndex = 0;
        const lastIndex = totalItemsCount - 1;
        const isFirstItem = prevIndex === firstIndex;
        const isLastItem = prevIndex === lastIndex;

        if (isArrowDown) {
          return isLastItem ? firstIndex : prevIndex + 1;
        } else {
          return isFirstItem ? lastIndex : prevIndex - 1;
        }
      });
    }
  }

  const handleClear = useCallback(() => {
    setQuery("");
    focusSearchInput();
  }, [setQuery, focusSearchInput]);

  const handleDocumentKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClear();
    },
    [handleClear],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleDocumentKeyDown);

    return () => {
      document.removeEventListener("keydown", handleDocumentKeyDown);
    };
  }, [handleDocumentKeyDown]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

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
        spellCheck={false}
        autoComplete="off"
        enterKeyHint="search"
        autoFocus
      />
      {query.length > 0 && (
        <button
          type="reset"
          title="Clear search"
          aria-label="Clear search"
          className="search__clear-button"
          onClick={handleClear}
        >
          <IconClose />
        </button>
      )}
    </form>
  );
}

export default SearchRecipe;
