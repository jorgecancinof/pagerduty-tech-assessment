import { useState } from "react";
import IconClose from "./icons/IconClose.tsx";

function KeyboardHint() {
  const [show, setShow] = useState(true);

  if (!show) {
    return null;
  }

  return (
    <div className="keyboard-hint">
      <p className="keyboard-hint__message">
        Use <kbd className="keyboard-hint__key">↓</kbd> and{" "}
        <kbd className="keyboard-hint__key">↑</kbd> to navigate and{" "}
        <kbd className="keyboard-hint__key">esc</kbd> to clear search
      </p>
      <button
        className="keyboard-hint__close-button"
        type="button"
        title="Close"
        aria-label="Close"
        onClick={() => setShow(false)}
      >
        <IconClose />
      </button>
    </div>
  );
}

export default KeyboardHint;
