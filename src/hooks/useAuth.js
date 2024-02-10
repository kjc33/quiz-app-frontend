import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Added to track loading state

    useEffect(() => {
        const verifyToken = async () => {
            setIsLoading(true); // Begin loading
            const token = localStorage.getItem('token');
            if (!token) {
                setIsAuthenticated(false);
                setIsLoading(false); // End loading
                return;
            }

            try {
                await axios.get('https://node-security-api-demo.onrender.com/users/verifyToken', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
                localStorage.removeItem('token');
            }
            setIsLoading(false); // End loading regardless of outcome
        };

        verifyToken();
    }, []);

    return { isAuthenticated, isLoading };
};

export default useAuth;
