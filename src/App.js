import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
// import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'

const Dashboard = () => {
    return (
        <div>Dashboard</div>
    )
}

export default function App() {
    return (
        <div>
            <Router>
                <nav>
                    <ul>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } />

                    <Route path="*" element={<Login />} />
                </Routes>
            </Router>
        </div>
    )
}
