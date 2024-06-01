import { useState } from "react";
import IconClose from "../icons/IconClose";

function KeyboardHint() {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <section className="keyboard-hint" aria-label="Keyboard hint">
      <p className="keyboard-hint__message">
        Use <kbd className="keyboard-hint__key">↓</kbd> and{" "}
        <kbd className="keyboard-hint__key">↑</kbd> to navigate and{" "}
        <kbd className="keyboard-hint__key">esc</kbd> to clear search
      </p>
      <button
        className="keyboard-hint__close-button"
        type="button"
        title="Close keyboard hint"
        aria-label="Close keyboard hint"
        onClick={() => setShow(false)}
      >
        <IconClose />
      </button>
    </section>
  );
}

export default KeyboardHint;
