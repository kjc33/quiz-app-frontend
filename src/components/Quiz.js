import { useState } from "react";
import { resultInitialState } from "../constants";

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIndex, setAnswerIndex] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState({
    score: 0,
    correctAnswer: 0,
    wrongAnswers: 0
  });
  const [showResult, setShowResult] = useState(false);

  const { question, choices, correctAnswer } = questions[currentQuestion];

  const onAnswerClick = (answer, index) => {
    setAnswerIndex(index);
    if (answer === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const onClickNext = () => {
    setAnswerIndex(null);
    setResult((prev) =>
      answer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswer: prev.correctAnswer + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );

    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }
  };

  return (
    <div className="quiz-container">
      {!showResult ? (
        <>
          <div className="pagination">
            <span className="active-question-number">{currentQuestion + 1}</span>
            <span className="total-questions">/{questions.length}</span>
          </div>
          <div className="question">
            <h2>{question}</h2>
          </div>
          <div className="choices">
            <ul>
              {choices.map((answer, index) => (
                <li onClick={() => onAnswerClick(answer, index)} key={answer} className={answerIndex === index ? "selected-answer" : null}>
                  {answer}
                </li>
              ))}
            </ul>
            <div className="quiz-footer">
              <button onClick={onClickNext} disabled={answerIndex === null}>
                {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="result">
          <h3>Results</h3>
        </div>
      )}
    </div>
  );
};

export default Quiz;
