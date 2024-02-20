import { useState } from "react";
import "./Result.scss";

const Result = ({ totalQuestions, result, onTryAgain }) => {
  const [name, setName] = useState("");
  const [highScores, setHighScores] = useState([]);
  const [showScores, setShowScores] = useState(false);

  const handleSave = () => {
    const score = {
      name,
      score: result.score,
    };

    const newHighScores = [...highScores, score].sort((a, b) => b.score - a.score);
    setHighScores(newHighScores);
    setShowScores(true);
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
        Total Score: <span>{result.score}</span>
      </p>
      <button onClick={onTryAgain}>Try Again</button>
      {!showScores ? (
        <>
          <h3>Add to Leaderboard</h3>
          <input placeholder="Name" value={name} onChange={(evt) => setName(evt.target.value)} />
          <button onClick={handleSave}>Save</button>
        </>
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
                  <tr>
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
