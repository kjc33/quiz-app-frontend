import React from 'react'
import { Link } from 'react-router-dom'


export default function NavigationBar() {
    // function to check if token is in header
    const token = localStorage.getItem('token')

    return (
        <div>
            <nav>
                <ul>

                    <li><Link to="/">Home</Link></li>
                    {token ?
                        <div>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><Link to="/logout">Logout</Link></li>

                        </div> :
                        <div>
                            <li><Link to="/register">Register</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </div>
                    }
                </ul>

            </nav>
        </div>
    )
}
