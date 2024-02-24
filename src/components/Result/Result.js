import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Result.scss";
import Button from "../EditButton/EditButton";

const Result = ({ totalQuestions, result, onTryAgain, onSubmit }) => {
  const [name, setName] = useState("");
  const [highScores, setHighScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (highScores.length > 0) {
      navigate("/");
    }
  }, [highScores, navigate]);

  const handleSave = async () => {
    try {
      await onSubmit(name, result.score);
      setHighScores((prevScores) => [...prevScores, { name: name, score: result.score }]);
    } catch (error) {
      console.error("Error saving score:", error);
    }
  };

  return (
    <div className="result">
      <h2>Results</h2>
      <p className="results-text">
        Number of Questions: <span className="results-number">{totalQuestions}</span>
      </p>
      <p className="results-text">
        Correct Answers: <span className="results-number">{result.correctAnswer}</span>
      </p>
      <p className="results-text">
        Wrong Answers: <span className="results-number">{result.wrongAnswers}</span>
      </p>
      <p className="results-text">
        Total Score: <span className="results-number">{result.score}%</span>
      </p>
      <Button className="btn basic-btn" onClick={onTryAgain} btnText="Try Again" />
      <div className="add-to-leaderboard">
        <h2>Add to Leaderboard</h2>
        <input placeholder="Name" id="user-name" name="user-name" value={name} onChange={(evt) => setName(evt.target.value)} />
        <Button className="btn basic-btn" onClick={handleSave} btnText="Save" />
      </div>
    </div>
  );
};

export default Result;
