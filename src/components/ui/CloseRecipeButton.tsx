import React from "react";
import IconClose from "../icons/IconClose";

function CloseRecipeButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return (
    <button
      className="details__close-button"
      title="Close this recipe"
      aria-label="Close this recipe"
      type="button"
      {...props}
    >
      <IconClose />
    </button>
  );
}

export default CloseRecipeButton;
