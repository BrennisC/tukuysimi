import { Alert, AlertDescription } from '@components/ui/alert';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { Lock, Mail, User } from 'lucide-react';
import { useState } from 'react';

interface RegisterFormProps {
    onSubmit: (data: { first_name: string, last_name: string, username: string; email: string; password: string }) => Promise<void>;
    loading: boolean;
    error: string;
    onLoginClick: () => void;
}

export default function RegisterForm({ onSubmit, loading, error, onLoginClick }: RegisterFormProps) {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPasswords, setShowPasswords] = useState({ password: false, confirmPassword: false });
    const [localError, setLocalError] = useState('');

    const updateField = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const togglePassword = (field: 'password' | 'confirmPassword') => {
        setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError('');

        if (formData.password !== formData.confirmPassword) {
            setLocalError('Las contraseñas no coinciden');
            return;
        }

        const { confirmPassword, ...data } = formData;
        await onSubmit(data);
    };

    const displayError = localError || error;

    const fields = [
        { key: 'first_name', label: 'Nombre', icon: User, placeholder: 'Tu nombre', type: 'text' },
        { key: 'last_name', label: 'Apellido', icon: User, placeholder: 'Tu apellido', type: 'text' },
        { key: 'username', label: 'Usuario', icon: User, placeholder: 'Tu nombre de usuario', type: 'text' },
        { key: 'email', label: 'Email', icon: Mail, placeholder: 'tu@email.com', type: 'email' },
    ];

    const passwordFields = [
        { key: 'password', label: 'Contraseña', placeholder: 'Tu contraseña' },
        { key: 'confirmPassword', label: 'Confirmar Contraseña', placeholder: 'Confirma tu contraseña' }
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {displayError && (
                <Alert variant="destructive">
                    <AlertDescription>{displayError}</AlertDescription>
                </Alert>
            )}

            {/* Campos regulares */}
            {fields.map(({ key, label, icon: Icon, placeholder, type }) => (
                <div key={key} className="space-y-2">
                    <Label htmlFor={key} className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {label}
                    </Label>
                    <Input
                        id={key}
                        type={type}
                        placeholder={placeholder}
                        value={formData[key as keyof typeof formData]}
                        onChange={(e) => updateField(key, e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
            ))}

            {/* Campos de contraseña */}
            {passwordFields.map(({ key, label, placeholder }) => (
                <div key={key} className="space-y-2">
                    <Label htmlFor={key} className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        {label}
                    </Label>
                    <div className="relative">
                        <Input
                            id={key}
                            type={showPasswords[key as keyof typeof showPasswords] ? "text" : "password"}
                            placeholder={placeholder}
                            value={formData[key as keyof typeof formData]}
                            onChange={(e) => updateField(key, e.target.value)}
                            required
                            disabled={loading}
                            className="pr-10"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => togglePassword(key as 'password' | 'confirmPassword')}
                        >
                            {showPasswords[key as keyof typeof showPasswords] ? (
                                <EyeSlashIcon className="h-4 w-4 text-forest-green/60" />
                            ) : (
                                <EyeIcon className="h-4 w-4 text-forest-green/60" />
                            )}
                        </button>
                    </div>
                </div>
            ))}

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creando cuenta..." : "Crear Cuenta"}
            </Button>

            <div className="text-center">
                <Button
                    type="button"
                    variant="link"
                    onClick={onLoginClick}
                    className="text-sm"
                >
                    ¿Ya tienes cuenta? Inicia sesión
                </Button>
            </div>
        </form>
    );
}