interface LoadingSpinnerProps {
    message?: string;
    size?: 'sm' | 'md' | 'lg';
}

export default function LoadingSpinner({
    message = 'Cargando...',
    size = 'md'
}: LoadingSpinnerProps) {
    const getSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'w-6 h-6';
            case 'lg':
                return 'w-12 h-12';
            default:
                return 'w-8 h-8';
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cream">
            <div className="text-center">
                <div className="flex justify-center mb-4">
                    <div className={`${getSizeClasses()} animate-spin`}>
                        <div className="h-full w-full border-4 border-sage-green border-t-forest-green rounded-full"></div>
                    </div>
                </div>
                <p className="text-forest-green font-medium">{message}</p>
                <div className="mt-2 text-sage-green text-sm">
                    🌱 Preparando tu experiencia TukuySimi...
                </div>
            </div>
        </div>
    );
}
