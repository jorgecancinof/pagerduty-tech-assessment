import React, { useEffect, useRef } from "react";
import Item from "./Item";
import { Recipe } from "../types/Recipe";

interface Props {
  recipes: Recipe[];
  highlightedText: string;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  focusSearchInput: () => void;
  handleShowMobileDetails: (show: boolean) => void;
}

function List({
  recipes,
  highlightedText,
  selectedIndex,
  setSelectedIndex,
  focusSearchInput,
  handleShowMobileDetails,
}: Props) {
  const listRef = useRef<HTMLUListElement>(null);

  function scrollToSelectedItem(selectedIndex: number) {
    if (listRef.current) {
      const selectedItem = listRef.current.children[selectedIndex];
      selectedItem?.scrollIntoView({ block: "nearest" });
    }
  }

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
            highlightedText={highlightedText}
            onItemClick={() => {
              handleShowMobileDetails(true);
              setSelectedIndex(index);
              focusSearchInput();
            }}
          />
        </li>
      ))}
    </ul>
  );
}

export default List;
