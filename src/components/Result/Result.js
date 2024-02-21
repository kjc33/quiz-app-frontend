import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Result.scss";

const Result = ({ totalQuestions, result, onTryAgain, onSubmit }) => {
  const [name, setName] = useState("");
  const [highScores, setHighScores] = useState([]);
  const [showScores, setShowScores] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (showScores) {
      navigate("/");
    }
  }, [showScores, navigate]);

  const handleSave = async () => {
    try {
      await onSubmit(name, result.score);
      setHighScores((prevScores) => [...prevScores, { name: name, score: result.score }]);
      setShowScores(true);
    } catch (error) {
      console.error("Error saving score:", error);
    }
  };

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
        Total Score: <span>{result.score}%</span>
      </p>
      <button onClick={onTryAgain}>Try Again</button>
      {!showScores ? (
        <div className="add-to-leaderboard">
          <h3>Add to Leaderboard</h3>
          <input placeholder="Name" id="user-name" name="user-name" value={name} onChange={(evt) => setName(evt.target.value)} />
          <button className="btn" onClick={handleSave}>Save</button>
        </div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Ranking</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {highScores.map((highScore, i) => {
                return (
                  <tr key={`${highScore.score}${highScore.name}${i}`}>
                    <td>{i + 1}</td>
                    <td>{highScore.name}</td>
                    <td>{highScore.score}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Result;
