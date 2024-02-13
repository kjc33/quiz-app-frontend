import React, { useState, useEffect } from "react";
import { resultInitalState } from "../../constants";
import AnswerTimer from "../AnswerTimer/AnswerTimer";

import "./Quiz.scss";

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIndex, setAnswerIndex] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState({
    score: 0,
    correctAnswer: 0,
    wrongAnswers: 0,
  });
  const [showResult, setShowResult] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  useEffect(() => {
    if (!showResult) {
      setResult(resultInitalState);
    }
  }, [showResult]);

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
    if (answer !== null) {
      setAnswerIndex(null);

      const isCorrectAnswer = answer === true;

      setResult((prev) => ({
        ...prev,
        score: isCorrectAnswer ? prev.score + 20 : prev.score,
        correctAnswer: isCorrectAnswer ? prev.correctAnswer + 1 : prev.correctAnswer,
        wrongAnswers: isCorrectAnswer ? prev.wrongAnswers : prev.wrongAnswers + 1,
      }));

      if (currentQuestion !== questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setCurrentQuestion(0);
        setShowResult(true);
      }
    } else {
      setWarningMessage("Please select an answer before proceeding to the next question.");
      setTimeout(() => {
        setWarningMessage("");
      }, 3000);
    }
  };

  const onTryAgain = () => {
    setResult(resultInitalState);
    setAnswer(null);
    setShowResult(false);
  };

  return (
    <div className="quiz-container">
      {warningMessage && <p className="warning-message">{warningMessage}</p>}
      {!showResult ? (
        <>
        <AnswerTimer />
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
          <p>
            Number of Questions: <span>{questions.length}</span>
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
      )}
    </div>
  );
};

export default Quiz;
