import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const [name, setName] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            const response = axios.post('https://quiz-app-backend-32v6.onrender.com/api/users', {
                user_name: name
            })

            console.log("Registration successful", response.data)

            navigate('/login')
        } catch (error) {
            console.error("Register error: ", error.response.data)
        }
    }
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}
