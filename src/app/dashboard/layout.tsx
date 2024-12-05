'use client';

import { Toaster } from '@/components/ui/toaster';
import { useAuth } from '@/context/AuthContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { logout } = useAuth();

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white p-4">
                <h2 className="text-lg font-bold mb-4">Dashboard</h2>
                <nav>
                    <ul className="space-y-2">
                        <li>
                            <a href="/dashboard" className="block hover:bg-gray-700 p-2 rounded">
                                Inicio
                            </a>
                        </li>
                        <li>
                            <a href="/dashboard/logs" className="block hover:bg-gray-700 p-2 rounded">
                                Logs
                            </a>
                        </li>
                        <li>
                            <button
                                onClick={logout}
                                className="block w-full text-left hover:bg-gray-700 p-2 rounded"
                            >
                                Cerrar Sesión
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Contenido principal */}
            <main className="flex-1 p-6">{children}</main>
            <Toaster />
        </div>
    );
}
