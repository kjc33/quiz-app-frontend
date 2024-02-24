import React, { useState, useEffect, useMemo } from "react";
import AnswerTimer from "../AnswerTimer/AnswerTimer";
import Result from "../Result/Result";
import axios from "axios";

import "./Quiz.scss";

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIndex, setAnswerIndex] = useState(null);
  const [answer, setAnswer] = useState(null);

  const resultInitialState = useMemo(
    () => ({
      score: 0,
      correctAnswer: 0,
      wrongAnswers: 0,
    }),
    []
  );

  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!showResult) {
      setResult(resultInitialState);
    }
  }, [showResult, resultInitialState]);

  const { question_name, choice_1, choice_2, choice_3, choice_4, answer: correctAnswer, type } = questions[currentQuestion];

  const questionAnswerEnum = ["A", "B", "C", "D"];

  const onAnswerClick = (selectedAnswerIndex) => {
    setAnswerIndex(selectedAnswerIndex);
    const correctAnswerIndex = questionAnswerEnum.indexOf(correctAnswer);
    if (selectedAnswerIndex === correctAnswerIndex) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const onClickNext = () => {
    const isCorrectAnswer = answer === true;
  
    setResult((prev) => ({
      ...prev,
      score: isCorrectAnswer ? prev.score +  20 : prev.score,
      correctAnswer: isCorrectAnswer ? prev.correctAnswer +  1 : prev.correctAnswer,
    }));
  
    if (!isCorrectAnswer) {
      setResult((prev) => ({
        ...prev,
        wrongAnswers: prev.wrongAnswers +  1,
      }));
    }
  
    setAnswer(null);
    setAnswerIndex(null);
  
    if (currentQuestion !== questions.length -  1) {
      setCurrentQuestion((prev) => prev +  1);
      setKey((prevKey) => prevKey +  1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }
  };  

  const onTryAgain = () => {
    setResult(resultInitialState);
    setAnswer(null);
    setShowResult(false);
  };

  const handleTimeExpire = () => {
    if (answer === null) {
      setAnswer(false);
    }
    onClickNext();
  };  

  const handleSubmitScore = async (name, score) => {
    try {
      await axios.post("https://quiz-app-backend-32v6.onrender.com/api/users", {
        user_name: name,
        score: score,
      });
      console.log("Score submitted successfully");
    } catch (error) {
      console.error("Error submitting score:", error.response.data);
    }
  };

  const getAnswerUI = () => {
    if (!choice_1 || !choice_2 || !choice_3 || !choice_4) return null;

    return (
      <ul className="choice-list">
        <li onClick={() => onAnswerClick(0)} className={answerIndex === 0 ? "selected-answer" : null}>
          A: {choice_1}
        </li>
        <li onClick={() => onAnswerClick(1)} className={answerIndex === 1 ? "selected-answer" : null}>
          B: {choice_2}
        </li>
        <li onClick={() => onAnswerClick(2)} className={answerIndex === 2 ? "selected-answer" : null}>
          C: {choice_3}
        </li>
        <li onClick={() => onAnswerClick(3)} className={answerIndex === 3 ? "selected-answer" : null}>
          D: {choice_4}
        </li>
      </ul>
    );
  };

  return (
    <div className="exam-wrapper">
      {!showResult ? (
        <>
          <AnswerTimer key={key} duration={30} timeExpire={handleTimeExpire} />
          <div className="pagination">
            <span className="active-question-number">{currentQuestion + 1}</span>
            <span className="total-questions">/{questions.length}</span>
          </div>
          <div className="question">
            <p>{question_name}</p>
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
        <Result result={result} onTryAgain={onTryAgain} totalQuestions={questions.length} onSubmit={handleSubmitScore} />
      )}
    </div>
  );
};

export default Quiz;
