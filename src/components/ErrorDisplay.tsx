import IconErrorCircle from "./icons/IconErrorCircle.tsx";
import MessageDisplay from "./MessageDisplay.tsx";

function ErrorDisplay() {
  return (
    <MessageDisplay>
      <section className="error" aria-label="Error" role="alert">
        <IconErrorCircle fontSize={100} />
        <h2 className="error__title">Error getting recipes</h2>
        <p className="error__description">Please try again later</p>
      </section>
    </MessageDisplay>
  );
}

export default ErrorDisplay;
