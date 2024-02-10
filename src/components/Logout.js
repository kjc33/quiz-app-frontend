import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Logout() {
    const navigate = useNavigate()

    useEffect(() => {
        // clear the token from localStorage
        localStorage.removeItem('token')

        // redirect to the home page
        navigate('/')
    }, [navigate])

    return (
        <div>
            Logging out...
        </div>
    )
}
