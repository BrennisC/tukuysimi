"use client";
import RegisterForm from '@components/FormRegister';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (data: { first_name: string, last_name: string, username: string; email: string; password: string }) => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.success) {
                router.push('/login?message=Usuario creado exitosamente');
            } else {
                setError(result.message);
            }
        } catch (error) {
            setError('Error de conexión');
        } finally {
            setLoading(false);
        }
    };

    const handleLoginClick = () => {
        router.push('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cream p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center">
                        <UserPlus className="mx-auto h-8 w-8 mb-2" />
                        Crear Cuenta
                    </CardTitle>
                    <CardDescription className="text-center text-forest-green/70">
                        Ingresa tus datos para crear una nueva cuenta
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <RegisterForm
                        onSubmit={handleSubmit}
                        loading={loading}
                        error={error}
                        onLoginClick={handleLoginClick}
                    />
                </CardContent>
            </Card>
        </div>
    );
}