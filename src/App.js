import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import NavigationBar from './components/NavigationBar'
import Logout from './components/NavigationBar'

import Posts from './pages/Posts'
import NotFound from './pages/NotFound'

export default function App() {
    return (
        <div>
            <Router>
                <NavigationBar />
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } />

                    <Route path="/" element={<Posts />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </div>
    )
}
