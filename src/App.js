import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Exam from "./pages/Exam";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Logout from "./components/Logout/Logout";

import "./styles/index.scss";
import NotFound from "./pages/NotFound";

function App() {
  const [questions, setQuestions] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : null;
  }, [token]);

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
  };

  return (
    <>
      <Router>
        <NavigationBar token={token} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAdminRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/exam" element={<Exam questions={questions} />} />
          <Route path="/logout" element={<Logout setToken={setToken} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
