import { ADMIN_BACKEND_BASE_URL } from './constant';

const isTokenExpired = (token) => {
    if (!token) return true; // No token, consider it expired
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return payload.exp < currentTime;
};

const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    const userDetails = localStorage.getItem('user');
    const user_id = JSON.parse(localStorage.getItem('user')).id;
    let result = await fetch(`${ADMIN_BACKEND_BASE_URL}api/v1/auth/list-user/${user_id}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    result = await result.json();
    if (isTokenExpired(token) || result.response.userDetails.status == 0 || result.response.userDetails.is_deleted == 1) {
        localStorage.clear();
        window.location.href = '/';
        return null;
    }

    if (token) {
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
        };
    }

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            if (response.status === 401) {
                localStorage.clear();
                window.location.href = '/';
            }
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        throw error;
    }
};

export default fetchWithAuth;
