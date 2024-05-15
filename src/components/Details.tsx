import React from "react";
import placeholderMeal from "../assets/placeholder-meal.png";
import { Recipe } from "../types/Recipe.ts";

interface Props {
  recipe: Recipe;
}

export const Details: React.FC<Props> = ({ recipe }) => {
  return (
    <div className="details">
      {recipe && (
        <>
          <img
            src={recipe.strMealThumb ?? placeholderMeal}
            alt={recipe.strMeal}
            className="details__image"
          />
          <h2>{recipe.strMeal}</h2>
          <p>{recipe.strInstructions}</p>
        </>
      )}
    </div>
  );
};
