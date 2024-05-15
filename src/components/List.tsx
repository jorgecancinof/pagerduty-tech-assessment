import React, { useEffect, useRef } from "react";
import { Recipe } from "../types/Recipe";
import { Item } from "./Item";

interface Props {
  recipes: Recipe[];
  query: string;
  selectedIndex: number | null;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  focusSearchInput: () => void;
}

export const List: React.FC<Props> = ({
  recipes,
  query,
  selectedIndex,
  setSelectedIndex,
  focusSearchInput,
}) => {
  const listRef = useRef<HTMLUListElement>(null);

  const scrollToSelectedItem = (selectedIndex: number | null) => {
    if (selectedIndex !== null && listRef.current) {
      const selectedItem = listRef.current.children[selectedIndex];
      selectedItem?.scrollIntoView({ block: "nearest" });
    }
  };

  useEffect(() => {
    scrollToSelectedItem(selectedIndex);
  }, [selectedIndex]);

  return (
    <ul ref={listRef} className="list">
      {recipes.map((recipe, index) => (
        <li
          key={recipe.idMeal}
          className="list__item"
          aria-selected={index === selectedIndex}
        >
          <Item
            recipe={recipe}
            query={query}
            onItemClick={() => {
              setSelectedIndex(index);
              focusSearchInput();
            }}
          />
        </li>
      ))}
    </ul>
  );
};
