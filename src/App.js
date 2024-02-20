import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import NavigationBar from "./components/NavigationBar";
import Logout from "./components/NavigationBar";
import Quiz from "./components/Quiz/Quiz";

import "./styles/index.scss";
import NotFound from "./pages/NotFound";

function App() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    try {
      const response = await fetch("https://quiz-app-backend-32v6.onrender.com/api/questions");
      const questionsResponse = await response.json();
      console.log(questionsResponse);
      setQuestions(questionsResponse);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
                {questions.length && <Quiz questions={questions} />}
              </ProtectedRoute>
            }
          />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;