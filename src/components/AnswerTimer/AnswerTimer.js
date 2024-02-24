import React, { useEffect, useState, useRef } from "react";
import "./AnswerTimer.scss";

function AnswerTimer({ duration, timeExpire }) {
  const [counter, setCounter] = useState(0);
  const [progressLoaded, setProgressLoaded] = useState(0);
  const intervalRef = useRef();

  // Reset the timer whenever the duration prop changes
  useEffect(() => {
    setCounter(0);
    setProgressLoaded(0);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCounter((cur) => cur + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [duration]);

  useEffect(() => {
    setProgressLoaded((counter / duration) * 100);

    if (counter === duration) {
      clearInterval(intervalRef.current);
      setTimeout(() => {
        timeExpire();
      }, 1000);
    }
  }, [counter, duration, timeExpire]);

  return (
    <div className="answer-timer-container">
      <div
        style={{
          width: `${progressLoaded}%`,
          backgroundColor: `${
            progressLoaded < 40
              ? "green"
              : progressLoaded < 70
              ? "orange"
              : "red"
          }`,
        }}
        className="progress-bar"
      ></div>
    </div>
  );
}

export default AnswerTimer;
