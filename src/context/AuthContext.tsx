'use client';

import React, { createContext, useState, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { fetchUserById } from '@/services/userService';
import Cookies from 'js-cookie';
import api from '@/utils/api';
import { useRouter } from 'next/navigation';

interface DecodedToken {
    sub: string;
    exp: number;
}

interface User {
    id: string;
    email: string;
    roles: string[];
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    setToken: (token: string) => void;
    logout: () => void;
    login: (email: string, password: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setTokenState] = useState<string | null>(null);
    const router = useRouter();

    const setToken = async (jwtToken: string) => {
        console.log(jwtToken)
        setTokenState(jwtToken);
        const decoded = jwtDecode<DecodedToken>(jwtToken);
        console.log(decoded)
        const userData = await fetchUserById(decoded.sub);
        setUser(userData);
    };

    const logout = () => {

        setTokenState(null);
        setUser(null);
        router.push('/login');

        document.cookie = 'token=; Max-Age=0; path=/';
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await api.post('/auth/login', { email, password });


            const token = response.data.accessToken;
            Cookies.set('token', token, { path: '/' });
            setToken(token)

        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            throw new Error('No se pudo iniciar sesión');
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, setToken, logout, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};
