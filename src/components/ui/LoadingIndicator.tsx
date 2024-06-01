function LoadingIndicator() {
  return (
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
  );
}

export default LoadingIndicator;
