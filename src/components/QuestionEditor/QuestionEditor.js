import React, { useEffect, useState } from 'react';
import axios from 'axios';

import "./QuestionEditor.scss";

const QuestionEditor = () => {
  const [questions, setQuestions] = useState([]);
  const [editedQuestion, setEditedQuestion] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://quiz-app-backend-32v6.onrender.com/api/questions');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
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
      const response = await axios.get('https://quiz-app-backend-32v6.onrender.com/api/questions');
      setQuestions(response.data);
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  return (
    <div>
      <h1>Question Editor</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <div>{question.question_name}</div>
            <div>
              Choices: {question.choice_1}, {question.choice_2}, {question.choice_3}, {question.choice_4}
            </div>
            <div>Correct Answer: {question.answer}</div>
            <button onClick={() => handleEditQuestion(question.id)}>Edit</button>
          </li>
        ))}
      </ul>
      {editedQuestion && (
        <QuestionForm question={editedQuestion} onSubmit={handleFormSubmit} />
      )}
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
    <form onSubmit={handleSubmit}>
      <label>
        Question Name:
        <input type="text" name="question_name" value={formData.question_name} onChange={handleChange} />
      </label>
      <label>
        Choice 1:
        <input type="text" name="choice_1" value={formData.choice_1} onChange={handleChange} />
      </label>
      <label>
        Choice 2:
        <input type="text" name="choice_2" value={formData.choice_2} onChange={handleChange} />
      </label>
      <label>
        Choice 3:
        <input type="text" name="choice_3" value={formData.choice_3} onChange={handleChange} />
      </label>
      <label>
        Choice 4:
        <input type="text" name="choice_4" value={formData.choice_4} onChange={handleChange} />
      </label>
      <label>
        Correct Answer:
        <select name="answer" value={formData.answer} onChange={handleChange}>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default QuestionEditor;
