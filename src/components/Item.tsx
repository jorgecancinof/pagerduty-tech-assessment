import React from "react";
import { Recipe } from "../types/Recipe.ts";

interface Props {
  recipe: Recipe;
  query: string;
  onItemClick: () => void;
}

export const Item: React.FC<Props> = ({ recipe, query, onItemClick }) => {
  const highlightText = (text: string) => {
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        <React.Fragment key={index}>{part}</React.Fragment>
      ),
    );
  };

  return (
    <button className="list__button" onClick={onItemClick} type="button">
      <h3>{highlightText(recipe.strMeal)}</h3>
      <p>
        {recipe.strArea} / {recipe.strCategory}
      </p>
    </button>
  );
};
