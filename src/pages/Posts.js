import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Posts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('https://node-security-api-demo.onrender.com/posts')
                setPosts(response.data)
            } catch (error) {
                console.error('Error fetching posts: ', error)
            }
        }

        fetchPosts()
    }, [])

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>{post.body}</li>
                ))}
            </ul>
        </div>
    )
}
