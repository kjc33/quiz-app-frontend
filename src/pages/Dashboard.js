import React from "react";
import QuestionEditor from "../components/QuestionEditor/QuestionEditor"

export default function Dashboard() {
  return (
    <section className="dashboard">
      <div className="container">
      <h1>Dashboard</h1>
      <QuestionEditor />
      </div>
    </section>
  );
}
