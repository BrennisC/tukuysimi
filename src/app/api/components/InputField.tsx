import { CheckCircleIcon, EyeIcon, EyeSlashIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface InputFieldProps {
    id: string;
    name: string;
    type: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    required?: boolean;
    showPasswordToggle?: boolean;
    className?: string;
    showSuccess?: boolean;
}

export function InputField({
    id,
    name,
    type,
    label,
    placeholder,
    value,
    onChange,
    error,
    required = false,
    showPasswordToggle = false,
    className = '',
    showSuccess = false
}: InputFieldProps) {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = showPasswordToggle
        ? (showPassword ? 'text' : 'password')
        : type;

    return (
        <div className={className}>
            <label htmlFor={id} className="block text-sm font-medium text-forest-green mb-1">
                {label}
            </label>
            <div className="relative">
                <input
                    id={id}
                    name={name}
                    type={inputType}
                    required={required}
                    className={`w-full px-3 py-2 ${showPasswordToggle ? 'pr-10' : ''} border rounded-lg bg-white text-forest-green placeholder-sage-green focus:outline-none focus:ring-2 focus:ring-golden-yellow/50 focus:border-golden-yellow transition-colors ${error ? 'border-red-500' : 'border-sage-green'
                        }`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    aria-describedby={error ? `${id}-error` : undefined}
                />

                {/* Icono de toggle de contraseña */}
                {showPasswordToggle && (
                    <button
                        type="button"
                        className="absolute right-3 top-2.5 text-sage-green hover:text-forest-green"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                    >
                        {showPassword ? (
                            <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                            <EyeIcon className="h-5 w-5" />
                        )}
                    </button>
                )}

                {/* Icono de error */}
                {error && !showPasswordToggle && (
                    <XCircleIcon className="absolute right-3 top-2.5 h-5 w-5 text-red-500" />
                )}

                {/* Icono de éxito */}
                {showSuccess && !error && value && (
                    <CheckCircleIcon className={`absolute ${showPasswordToggle ? 'right-10' : 'right-3'} top-2.5 h-5 w-5 text-green-500`} />
                )}
            </div>

            {/* Mensaje de error */}
            {error && (
                <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}