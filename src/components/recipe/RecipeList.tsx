import React, { useEffect, useRef } from "react";
import RecipeItem from "./RecipeItem";
import { Recipe } from "../../types/recipe";

interface RecipeListProps {
  recipes: Recipe[];
  highlightedTerm: string;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  focusSearchInput: () => void;
  setShowRecipeOnMobile: React.Dispatch<React.SetStateAction<boolean>>;
}

function RecipeList({
  recipes,
  highlightedTerm,
  selectedIndex,
  setSelectedIndex,
  focusSearchInput,
  setShowRecipeOnMobile,
}: RecipeListProps) {
  const listRef = useRef<HTMLUListElement>(null);

  function scrollToSelectedItem(selectedIndex: number) {
    const selectedItem = listRef.current?.children[selectedIndex];
    selectedItem?.scrollIntoView({ block: "nearest" });
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
          <RecipeItem
            recipe={recipe}
            highlightedTerm={highlightedTerm}
            onItemClick={() => {
              setShowRecipeOnMobile(true);
              setSelectedIndex(index);
              focusSearchInput();
            }}
          />
        </li>
      ))}
    </ul>
  );
}

export default RecipeList;
