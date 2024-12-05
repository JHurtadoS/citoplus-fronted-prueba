'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { fetchUsers, UserResponse } from '@/services/userService';

interface DashboardContextType {
    users: UserResponse[];
    loading: boolean;
    error: string | null;
    page: number;
    totalPages: number;
    fetchUserPage: (page: number, items: number) => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
    const [users, setUsers] = useState<UserResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const fetchUserPage = useCallback(async (page: number, items: number) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchUsers(page, items);
            setUsers(data.users);
            setPage(page);
            setTotalPages(data.totalPages);
        } catch (err) {
            console.error(err)
            setError('Error al cargar usuarios');
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <DashboardContext.Provider
            value={{ users, loading, error, page, totalPages, fetchUserPage }}
        >
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error('useDashboard debe usarse dentro de un DashboardProvider');
    }
    return context;
};
