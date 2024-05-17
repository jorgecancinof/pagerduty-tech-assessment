import React from "react";
import placeholderMeal from "../assets/placeholder-meal.png";
import { Recipe } from "../types/Recipe.ts";

interface Props {
  recipe: Recipe;
  query: string;
  onItemClick: () => void;
}

const normalizeText = (text: string) => {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const escapeRegExp = (text: string) => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const highlightText = (text: string, query: string) => {
  if (!query) return text;

  try {
    const normalizedText = normalizeText(text);
    const normalizedQuery = normalizeText(query);

    const escapedQuery = escapeRegExp(normalizedQuery);
    const regex = new RegExp(`(${escapedQuery})`, "gi");

    return normalizedText.split(regex).map((part, index) => {
      const startIndex = normalizedText.indexOf(part);
      const endIndex = startIndex + part.length;

      if (regex.test(part)) {
        return (
          <span key={index} className="highlight">
            {text.slice(startIndex, endIndex)}
          </span>
        );
      } else {
        return text.slice(startIndex, endIndex);
      }
    });
  } catch (error) {
    console.error("Error in highlightText function:", error);
    return text;
  }
};

const Item: React.FC<Props> = ({ recipe, query, onItemClick }) => {
  const mealThumbImg = recipe.strMealThumb ?? placeholderMeal;

  return (
    <button
      className="list__button"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 70%), url(${mealThumbImg})`,
      }}
      onClick={onItemClick}
      type="button"
    >
      <p className="list__button-subtitle">
        {recipe.strArea} / {recipe.strCategory}
      </p>
      <h2 className="list__button-title">
        {highlightText(recipe.strMeal, query)}
      </h2>
    </button>
  );
};

export default Item;
