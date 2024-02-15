import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import NavigationBar from "./components/NavigationBar";
import Logout from "./components/NavigationBar";
import Quiz from "./components/Quiz/Quiz";
import { jsQuiz } from "./constants";

import "./styles/index.scss";
import NotFound from "./pages/NotFound";

export default function App() {
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
                <Quiz questions={jsQuiz.questions} />
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
