import React from "react";
import { Recipe } from "../types/Recipe.ts";

interface Props {
  recipe: Recipe;
  query: string;
  onItemClick: () => void;
}

const highlightText = (text: string, query: string) => {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "gi");

  return text.split(regex).map((part, index) => {
    if (regex.test(part)) {
      return (
        <span key={index} className="highlight">
          {part}
        </span>
      );
    } else {
      return part;
    }
  });
};

export const Item: React.FC<Props> = ({ recipe, query, onItemClick }) => {
  return (
    <button className="list__button" onClick={onItemClick} type="button">
      <h3>{highlightText(recipe.strMeal, query)}</h3>
      <p>
        {recipe.strArea} / {recipe.strCategory}
      </p>
    </button>
  );
};
