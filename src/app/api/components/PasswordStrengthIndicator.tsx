interface PasswordStrengthIndicatorProps {
    password: string;
    strength: number;
}

export function PasswordStrengthIndicator({ password, strength }: PasswordStrengthIndicatorProps) {
    if (!password) return null;

    const getStrengthText = (strength: number): string => {
        switch (strength) {
            case 0:
            case 1: return 'Muy débil';
            case 2: return 'Débil';
            case 3: return 'Regular';
            case 4: return 'Fuerte';
            case 5: return 'Muy fuerte';
            default: return '';
        }
    };

    const getStrengthColor = (strength: number): string => {
        switch (strength) {
            case 0:
            case 1: return 'text-red-500';
            case 2: return 'text-orange-500';
            case 3: return 'text-yellow-500';
            case 4: return 'text-green-500';
            case 5: return 'text-green-600';
            default: return '';
        }
    };

    return (
        <div className="mt-2">
            <div className="flex space-x-1 mb-1">
                {[1, 2, 3, 4, 5].map((level) => (
                    <div
                        key={level}
                        className={`h-1 flex-1 rounded ${level <= strength
                                ? strength <= 2
                                    ? 'bg-red-500'
                                    : strength === 3
                                        ? 'bg-yellow-500'
                                        : 'bg-green-500'
                                : 'bg-gray-200'
                            }`}
                    />
                ))}
            </div>
            <p className={`text-xs ${getStrengthColor(strength)}`}>
                Fortaleza: {getStrengthText(strength)}
            </p>
        </div>
    );
}