import React from "react";
import Quiz from "../components/Quiz/Quiz";

export default function Exam({ questions }) {
  return <div className="exam">{questions.length > 0 && <Quiz questions={questions} />}</div>;
}
