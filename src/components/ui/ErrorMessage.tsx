import IconErrorCircle from "../icons/IconErrorCircle";

function ErrorMessage() {
  return (
    <section className="error" aria-label="Error" role="alert">
      <IconErrorCircle fontSize={100} />
      <h2 className="error__title">Error getting recipes</h2>
      <p className="error__description">Please try again later</p>
    </section>
  );
}

export default ErrorMessage;
