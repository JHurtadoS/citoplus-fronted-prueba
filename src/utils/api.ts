import axios from 'axios';

import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://citoplusback-production.up.railway.app',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
    },
});


api.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
