import { useEffect, useState } from "react";
import "./App.css";

export const AdviceCard = () => {
  const [advice, setAdvice] = useState(null);
  const [adviceCount, setAdviceCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAdvice = async () => {
    setLoading(true);
    setError(null);

    await fetch("https://api.adviceslip.com/advice")
      .then((response) => response.json())
      .then((result) => {
        setAdvice(result.slip.advice);
        setAdviceCount(result.slip.id);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="advice-card">
      <h2 className="advice-card__title">
        {loading ? (
          <div className="advice-card__title-skeleton"></div>
        ) : (
          `Advice #${adviceCount}`
        )}
      </h2>
      <div className="advice-card__content">
        {loading ? (
          <div className="advice-card__content-skeleton"></div>
        ) : (
          <h3>{advice}</h3>
        )}
      </div>
      <button
        disabled={loading}
        className="advice-card__button"
        onClick={fetchAdvice}
      >
        More Advice
      </button>
      <div className="advice-card__error-container">
        {error ? (
          <span className="advice-card__error">
            Uh Oh, no advice available, please try again later
          </span>
        ) : null}
      </div>
    </div>
  );
};
