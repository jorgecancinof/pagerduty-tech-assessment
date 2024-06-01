import placeholderMeal from "../../assets/placeholder-meal.png";
import { Recipe } from "../../types/recipe";

interface RecipeItemProps {
  recipe: Recipe;
  highlightedTerm: string;
  onItemClick: () => void;
}

function normalizeText(text: string) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightTerm(text: string, term: string) {
  if (!term) return text;

  try {
    const normalizedText = normalizeText(text);
    const normalizedTerm = normalizeText(term);

    const escapedTerm = escapeRegExp(normalizedTerm);
    const termRegex = new RegExp(`(${escapedTerm})`, "gi");

    return normalizedText.split(termRegex).map((part, index) => {
      const startIndex = normalizedText.indexOf(part);
      const endIndex = startIndex + part.length;

      if (termRegex.test(part)) {
        return (
          <mark key={index} className="highlight">
            {text.slice(startIndex, endIndex)}
          </mark>
        );
      } else {
        return text.slice(startIndex, endIndex);
      }
    });
  } catch (error) {
    console.error("Error in highlightTerm function:", error);
    return text;
  }
}

function RecipeItem({ recipe, highlightedTerm, onItemClick }: RecipeItemProps) {
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
        {highlightTerm(recipe.strMeal, highlightedTerm)}
      </h2>
    </button>
  );
}

export default RecipeItem;
