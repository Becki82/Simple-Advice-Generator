import { useEffect, useState } from "react";
import "./App.css";

export const AdviceCard = () => {
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAdvice = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch("https://api.adviceslip.com/advice", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.slip.advice);
        setAdvice(result.slip.advice);
        setLoading(false);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="adviceContainer">
          <div className="adviceContent">
            <h2>Advice of the day...</h2>
            {loading ? <p className="loader">Loading...</p> : <p>{advice}</p>}
            <button className="btn" onClick={fetchAdvice}>
              More Advice
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};
