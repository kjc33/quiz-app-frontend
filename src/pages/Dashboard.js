import React from "react";
import QuestionEditor from "../components/QuestionEditor/QuestionEditor"

export default function Dashboard() {
  return (
    <section className="dashboard">
      <div className="container flex flex-column medium-gap medium-large-width">
      <h1 className="main-body-heading">Dashboard</h1>
      <QuestionEditor />
      </div>
    </section>
  );
}
