import React from "react";
import IconClose from "./icons/IconClose";

function CloseDetailsButton({
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="details__close-button"
      title="Close"
      aria-label="Close"
      type="button"
      {...props}
    >
      <IconClose />
    </button>
  );
}

export default CloseDetailsButton;
