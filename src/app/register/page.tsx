'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (data.success) {
                // Redirigir al login con mensaje de éxito
                router.push('/login?message=Usuario creado exitosamente');
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Error de conexión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cream">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold text-forest-green">
                        Crear Cuenta
                    </h2>
                </div>
                <form className="mt-8 space-y-6 gap-1" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">
                                Usuario
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-sage-green placeholder-forest-green text-forest-green bg-white rounded-t-md focus:outline-none focus:ring-golden-yellow focus:border-golden-yellow focus:z-10 sm:text-sm"
                                placeholder="Usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-sage-green placeholder-forest-green text-forest-green bg-white focus:outline-none focus:ring-golden-yellow focus:border-golden-yellow focus:z-10 sm:text-sm"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-sage-green placeholder-forest-green text-forest-green bg-white focus:outline-none focus:ring-golden-yellow focus:border-golden-yellow focus:z-10 sm:text-sm"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="sr-only">
                                Confirmar Contraseña
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-sage-green placeholder-forest-green text-forest-green bg-white rounded-b-md focus:outline-none focus:ring-golden-yellow focus:border-golden-yellow focus:z-10 sm:text-sm"
                                placeholder="Confirmar Contraseña"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-600 text-sm text-center">{error}</div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-forest-green hover:text-cream bg-golden-yellow hover:bg-sage-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-green disabled:opacity-50"
                        >
                            {loading ? 'Creando...' : 'Crear Cuenta'}
                        </button>
                    </div>

                    <div className="text-center">
                        <a href="/login" className="text-sage-green hover:text-forest-green">
                            ¿Ya tienes cuenta? Inicia sesión
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}
