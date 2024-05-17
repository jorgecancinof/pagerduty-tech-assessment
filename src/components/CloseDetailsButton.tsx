import React from "react";
import IconClose from "./icons/IconClose";

const CloseDetailsButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ ...props }) => {
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
};

export default CloseDetailsButton;
