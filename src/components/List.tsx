import React, { useEffect, useRef } from "react";
import Item from "./Item";
import { Recipe } from "../types/Recipe";

interface Props {
  recipes: Recipe[];
  query: string;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  focusSearchInput: () => void;
  handleShowMobileDetails: (show: boolean) => void;
}

const List: React.FC<Props> = ({
  recipes,
  query,
  selectedIndex,
  setSelectedIndex,
  focusSearchInput,
  handleShowMobileDetails,
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
              handleShowMobileDetails(true);
              setSelectedIndex(index);
              focusSearchInput();
            }}
          />
        </li>
      ))}
    </ul>
  );
};

export default List;
