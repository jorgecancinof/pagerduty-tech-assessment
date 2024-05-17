import React, { useEffect, useCallback } from "react";
import IconSearch from "./icons/IconSearch.tsx";
import IconClose from "./icons/IconClose.tsx";

interface Props {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  searchInputRef: React.RefObject<HTMLInputElement>;
  focusSearchInput: () => void;
  totalItemsCount: number;
}

export const Search: React.FC<Props> = ({
  query,
  setQuery,
  setSelectedIndex,
  searchInputRef,
  focusSearchInput,
  totalItemsCount,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleClear = useCallback(() => {
    setQuery("");
    focusSearchInput();
  }, [setQuery, focusSearchInput]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setQuery(value);
  };

  const handleSearchInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    const isArrowUp = event.key === "ArrowUp";
    const isArrowDown = event.key === "ArrowDown";

    if (isArrowDown || isArrowUp) {
      event.preventDefault();

      setSelectedIndex((prevIndex) => {
        const lastIndex = totalItemsCount - 1;
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
          <IconClose />
        </button>
      )}
    </form>
  );
};
