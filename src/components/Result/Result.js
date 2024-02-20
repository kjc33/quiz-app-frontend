import React from "react";
import "./Result.scss";

const Result = ({ totalQuestions, result, onTryAgain }) => {
  return (
    <div className="result">
      <h3>Results</h3>
      <p>
        Number of Questions: <span>{totalQuestions}</span>
      </p>
      <p>
        Correct Answers: <span>{result.correctAnswer}</span>
      </p>
      <p>
        Wrong Answers: <span>{result.wrongAnswers}</span>
      </p>
      <p>
        Total Score: <span>{result.score}</span>
      </p>
      <button onClick={onTryAgain}>Try Again</button>
    </div>
  );
};

export default Result;
