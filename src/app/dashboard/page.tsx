'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface User {
    id: number;
    username: string;
    email: string;
    createdAt: string;
}

export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (!token || !userData) {
            router.push('/login');
            return;
        }

        try {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
        } catch (error) {
            router.push('/login');
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div>Cargando...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream">
            <div className="bg-white shadow border-b-2 border-sage-green">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className="text-2xl font-bold text-forest-green">Dashboard</h1>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="border-4 border-dashed border-sage-green rounded-lg p-8 bg-white">
                        <h2 className="text-xl font-semibold mb-4 text-forest-green">Bienvenido, {user.username}!</h2>
                        <div className="space-y-2 text-forest-green">
                            <p><strong>ID:</strong> {user.id}</p>
                            <p><strong>Usuario:</strong> {user.username}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Fecha de registro:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
