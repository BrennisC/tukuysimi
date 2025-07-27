'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface User {
    id: number;
    username: string;
    email: string;
    createdAt: string;
}

interface NavigationProps {
    currentPath?: string;
}

export default function Navigation({ currentPath }: NavigationProps) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
    };

    const navigationItems = [
        {
            href: '/dashboard',
            label: 'Dashboard',
            icon: '🏠',
            description: 'Inicio'
        },
        {
            href: '/dashboard/learning',
            label: 'Aprender',
            icon: '📚',
            description: 'Lecciones y cursos'
        },
        {
            href: '/dashboard/practice',
            label: 'Practicar',
            icon: '🎯',
            description: 'Ejercicios y juegos'
        },
        {
            href: '/dashboard/community',
            label: 'Comunidad',
            icon: '🤝',
            description: 'Conecta con hablantes nativos'
        },
        {
            href: '/dashboard/progress',
            label: 'Progreso',
            icon: '📈',
            description: 'Tu avance y logros'
        },
        {
            href: '/dashboard/profile',
            label: 'Perfil',
            icon: '👤',
            description: 'Tu información personal'
        }
    ];

    return (
        <>
            {/* Header Principal */}
            <div className="bg-white shadow-md border-b-2 border-sage-green">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <Link href="/dashboard" className="flex items-center space-x-2">
                                <span className="text-2xl">🌱</span>
                                <h1 className="text-2xl font-bold text-forest-green">TukuySimi</h1>
                            </Link>
                            {user && (
                                <span className="text-sage-green text-sm">
                                    ¡Kawsay, {user.username}! 🌟
                                </span>
                            )}
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                        >
                            <span>🚪</span>
                            <span>Cerrar Sesión</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Navegación Secundaria */}
            <div className="bg-sage-green/10 border-b border-sage-green/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex space-x-8 overflow-x-auto py-4">
                        {navigationItems.map((item) => {
                            const isActive = currentPath === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex flex-col items-center min-w-fit px-3 py-2 rounded-lg transition-all duration-200 group ${isActive
                                            ? 'bg-forest-green text-white shadow-md'
                                            : 'text-forest-green hover:bg-sage-green/20 hover:shadow-sm'
                                        }`}
                                >
                                    <span className="text-xl mb-1">{item.icon}</span>
                                    <span className="text-sm font-medium">{item.label}</span>
                                    <span className={`text-xs ${isActive ? 'text-cream/80' : 'text-sage-green'} group-hover:opacity-100 opacity-0 transition-opacity`}>
                                        {item.description}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </>
    );
}
