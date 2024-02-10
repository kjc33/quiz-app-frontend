import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsAuthenticated(false);
                return;
            }

            try {
                await axios.post('https://node-security-api-demo.onrender.com/users/verifyToken', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setIsAuthenticated(true);
            } catch (error) {
                console.error("Token verification error: ", error.response.data);
                setIsAuthenticated(false);
                localStorage.removeItem('token');
            }
        };
        verifyToken();
    }, []);

    return isAuthenticated;
};

export default useAuth;