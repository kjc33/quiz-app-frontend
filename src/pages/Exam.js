import React from "react";
import Quiz from "../components/Quiz/Quiz";

export default function Exam({ questions }) {
  return <section className="exam"><div className="container">{questions.length > 0 && <Quiz questions={questions} />}</div></section>;
}
