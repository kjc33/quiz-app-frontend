import React, { useState, useEffect } from "react";
import { resultInitalState } from "../../constants";
import AnswerTimer from "../AnswerTimer/AnswerTimer";
import Result from "../Result/Result";

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
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!showResult) {
      setResult(resultInitalState);
    }
  }, [showResult]);

  const { question_name, choice_1, choice_2, choice_3, choice_4, answer: correctAnswer, type } = questions[currentQuestion];

  const onAnswerClick = (selectedAnswerIndex) => {
    setAnswerIndex(selectedAnswerIndex);
    if (selectedAnswerIndex === correctAnswer) {
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
        setKey((prevKey) => prevKey + 1);
      } else {
        setCurrentQuestion(0);
        setShowResult(true);
      }
    }
  };

  const onTryAgain = () => {
    setResult(resultInitalState);
    setAnswer(null);
    setShowResult(false);
  };

  const handleTimeExpire = () => {
    setAnswer(false);
    onClickNext();
  };

  const getAnswerUI = () => {
    if (!choice_1 || !choice_2 || !choice_3 || !choice_4) return null;
  
    return (
      <ul>
        <li onClick={() => onAnswerClick(0)} className={answerIndex === 0 ? "selected-answer" : null}>
          {choice_1}
        </li>
        <li onClick={() => onAnswerClick(1)} className={answerIndex === 1 ? "selected-answer" : null}>
          {choice_2}
        </li>
        <li onClick={() => onAnswerClick(2)} className={answerIndex === 2 ? "selected-answer" : null}>
          {choice_3}
        </li>
        <li onClick={() => onAnswerClick(3)} className={answerIndex === 3 ? "selected-answer" : null}>
          {choice_4}
        </li>
      </ul>
    );
  };
  
  return (
    <div className="quiz-container">
      {!showResult ? (
        <>
          <AnswerTimer key={key} duration={15} timeExpire={handleTimeExpire} />
          <div className="pagination">
            <span className="active-question-number">{currentQuestion + 1}</span>
            <span className="total-questions">/{questions.length}</span>
          </div>
          <div className="question">
            <h2>{question_name}</h2>
          </div>
          <div className="choices">
            {getAnswerUI(type)}
            <div className="quiz-footer">
              <button onClick={onClickNext} disabled={answerIndex === null}>
                {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        </>
      ) : (
        <Result result={result} onTryAgain={onTryAgain} totalQuestions={questions.length} />
      )}
    </div>
  );
};

export default Quiz;
