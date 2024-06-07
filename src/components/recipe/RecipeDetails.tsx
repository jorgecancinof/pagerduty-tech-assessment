import React, { useLayoutEffect, useRef, useMemo } from "react";
import CloseRecipeButton from "../ui/CloseRecipeButton";
import placeholderMeal from "../../assets/placeholder-meal.png";
import { Recipe } from "../../types/recipe";

interface RecipeDetailsProps {
  recipe: Recipe;
  showRecipeOnMobile: boolean;
  setShowRecipeOnMobile: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Ingredient {
  id: string;
  ingredient: string;
  measure: string;
}

function getExistingIngredients(recipe: Recipe): Ingredient[] {
  const RECIPE_TOTAL_INGREDIENTS = 20;
  const ingredients = [];

  for (let i = 1; i <= RECIPE_TOTAL_INGREDIENTS; i++) {
    const ingredient = recipe[`strIngredient${i}` as keyof Recipe] as
      | string
      | null;
    const measure = recipe[`strMeasure${i}` as keyof Recipe] as string | null;

    if (ingredient && measure) {
      const id = `${recipe.idMeal}-${i}`;
      ingredients.push({ id, ingredient, measure });
    }
  }

  return ingredients;
}

function RecipeDetails({
  recipe,
  showRecipeOnMobile,
  setShowRecipeOnMobile,
}: RecipeDetailsProps) {
  const detailsRef = useRef<HTMLDivElement>(null);
  const mealThumbImg = recipe.strMealThumb ?? placeholderMeal;

  const ingredients = useMemo(() => {
    return getExistingIngredients(recipe);
  }, [recipe]);

  useLayoutEffect(() => {
    detailsRef.current?.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [recipe, showRecipeOnMobile]);

  return (
    <div className="details" ref={detailsRef}>
      <CloseRecipeButton onClick={() => setShowRecipeOnMobile(false)} />
      <section
        className="details__header"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8) 10%, rgba(0, 0, 0, 0) 50%), url(${mealThumbImg})`,
        }}
      >
        <p className="details__header-subtitle">
          {recipe.strArea} / {recipe.strCategory}
        </p>
        <h2 className="details__header-title">{recipe.strMeal}</h2>
      </section>
      <section className="details__ingredients">
        <h3 className="details__ingredients-title">Ingredients</h3>
        <ul className="details__ingredients-list">
          {ingredients.map(({ id, ingredient, measure }) => (
            <li className="details__ingredients-list-item" key={id}>
              <div className="checkbox">
                <input id={id} type="checkbox" className="checkbox__input" />
                <label htmlFor={id} className="checkbox__label">
                  <span className="checkbox__checkmark"></span>
                  <span className="checkbox__title">{ingredient}</span>
                  <span className="checkbox__subtitle">{measure}</span>
                </label>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className="details__instructions">
        <h3 className="details__instructions-title">Instructions</h3>
        <p className="details__instructions-description">
          {recipe.strInstructions}
        </p>
      </section>
    </div>
  );
}

export default RecipeDetails;
