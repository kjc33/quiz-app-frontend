import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function CreatePost() {
    const [body, setBody] = useState('')

    const navigate = useNavigate()

    const { isAuthenticated } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!isAuthenticated) {
            navigate('/login')
            return
        }

        try {
            const response = await axios.post('https://node-security-api-demo.onrender.com/posts', {
                topic_id: 1,
                body
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            console.log("Post created", response.data)

            navigate('/')

        } catch (error) {
            console.error("Create post error: ", error.response.data)
        }
    }


    return (
        <div>
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="body">Body</label>
                    <input type="text" id="body" name="body" value={body} onChange={(e) => setBody(e.target.value)} />
                </div>
                <button type="submit">Create Post</button>
            </form>
        </div>
    )
}
