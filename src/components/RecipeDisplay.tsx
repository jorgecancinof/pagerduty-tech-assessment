import React from "react";
import List from "./List";
import Details from "./Details";
import { Recipe } from "../types/Recipe";

interface RecipeDisplayProps {
  query: string;
  recipes: Recipe[];
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  focusSearchInput: () => void;
  handleShowMobileDetails: (show: boolean) => void;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({
  query,
  recipes,
  selectedIndex,
  setSelectedIndex,
  focusSearchInput,
  handleShowMobileDetails,
}) => {
  return (
    <>
      <List
        recipes={recipes}
        query={query}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        focusSearchInput={focusSearchInput}
        handleShowMobileDetails={handleShowMobileDetails}
      />
      <Details recipe={recipes[selectedIndex]} />
    </>
  );
};

export default RecipeDisplay;
