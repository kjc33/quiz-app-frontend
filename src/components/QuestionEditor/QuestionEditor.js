import React, { useEffect, useState } from "react";
import axios from "axios";

import "./QuestionEditor.scss";

const QuestionEditor = () => {
  const [questions, setQuestions] = useState([]);
  const [editedQuestion, setEditedQuestion] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("https://quiz-app-backend-32v6.onrender.com/api/questions");
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleEditQuestion = (questionId) => {
    const questionToEdit = questions.find((question) => question.id === questionId);
    setEditedQuestion(questionToEdit);
  };

  const handleFormSubmit = async (editedData) => {
    try {
      await axios.put(`https://quiz-app-backend-32v6.onrender.com/api/questions/${editedData.id}`, editedData);
      // Optionally, update state or display success message
      setEditedQuestion(null);
      // Refetch questions to update the list
      const response = await axios.get("https://quiz-app-backend-32v6.onrender.com/api/questions");
      setQuestions(response.data);
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  return (
    <div className="exam-questions">
      <ol className="exam-list">
        {questions.map((question) => (
          <li key={question.id}>
            <div className="exam-question">
              <strong className="exam-editor-strong-text">Question:</strong> {question.question_name}
            </div>
            <div className="exam-choices">
              <strong className="exam-editor-strong-text">Choices:</strong> A. {question.choice_1} <span className="pipe">|</span> B. {question.choice_2} <span className="pipe">|</span> C. {question.choice_3} <span className="pipe">|</span> D. {question.choice_4}
            </div>
            <div className="correct-answer">
              <strong className="exam-editor-strong-text">Correct Answer:</strong> {question.answer}
            </div>
            <button className="btn edit-btn" onClick={() => handleEditQuestion(question.id)}>
              Edit
            </button>
          </li>
        ))}
      </ol>
      {editedQuestion && <QuestionForm question={editedQuestion} onSubmit={handleFormSubmit} />}
    </div>
  );
};

const QuestionForm = ({ question, onSubmit }) => {
  const [formData, setFormData] = useState(question);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="exam-editor">
      <form className="exam-editor-form" onSubmit={handleSubmit}>
        <label>
          Question Name:
          <input type="text" id="question_name" name="question_name" value={formData.question_name} onChange={handleChange} />
        </label>
        <label>
          Choice 1:
          <input type="text" id="choice_1" name="choice_1" value={formData.choice_1} onChange={handleChange} />
        </label>
        <label>
          Choice 2:
          <input type="text" id="choice_2" name="choice_2" value={formData.choice_2} onChange={handleChange} />
        </label>
        <label>
          Choice 3:
          <input type="text" id="choice_3" name="choice_3" value={formData.choice_3} onChange={handleChange} />
        </label>
        <label>
          Choice 4:
          <input type="text" id="choice_4" name="choice_4" value={formData.choice_4} onChange={handleChange} />
        </label>
        <label>
          Correct Answer:
          <select id="answer" name="answer" value={formData.answer} onChange={handleChange}>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </label>
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default QuestionEditor;
