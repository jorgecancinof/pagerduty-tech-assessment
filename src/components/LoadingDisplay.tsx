import MessageDisplay from "./MessageDisplay.tsx";

function LoadingDisplay() {
  return (
    <MessageDisplay>
      <section className="loading" aria-label="Loading" role="status">
        <div className="loading__spinner" aria-hidden="true">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </section>
    </MessageDisplay>
  );
}

export default LoadingDisplay;
