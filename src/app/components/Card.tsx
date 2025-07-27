import { ReactNode } from 'react';

interface CardProps {
    title?: string;
    subtitle?: string;
    icon?: string;
    children: ReactNode;
    className?: string;
    variant?: 'default' | 'gradient' | 'bordered' | 'cultural';
}

export default function Card({
    title,
    subtitle,
    icon,
    children,
    className = '',
    variant = 'default'
}: CardProps) {
    const getVariantStyles = () => {
        switch (variant) {
            case 'gradient':
                return 'bg-gradient-to-br from-cream via-golden-yellow/20 to-sage-green/20 border-2 border-golden-yellow/30';
            case 'bordered':
                return 'bg-white border-2 border-sage-green shadow-md';
            case 'cultural':
                return 'bg-gradient-to-r from-forest-green to-sage-green text-white shadow-lg';
            default:
                return 'bg-white border border-sage-green/20 shadow-sm hover:shadow-md transition-shadow duration-200';
        }
    };

    return (
        <div className={`rounded-xl p-6 ${getVariantStyles()} ${className}`}>
            {(title || subtitle || icon) && (
                <div className="mb-4">
                    <div className="flex items-center space-x-3 mb-2">
                        {icon && <span className="text-2xl">{icon}</span>}
                        {title && (
                            <h3 className={`text-xl font-semibold ${variant === 'cultural' ? 'text-white' : 'text-forest-green'
                                }`}>
                                {title}
                            </h3>
                        )}
                    </div>
                    {subtitle && (
                        <p className={`text-sm ${variant === 'cultural' ? 'text-cream/90' : 'text-sage-green'
                            }`}>
                            {subtitle}
                        </p>
                    )}
                </div>
            )}
            <div className={variant === 'cultural' ? 'text-cream' : 'text-forest-green'}>
                {children}
            </div>
        </div>
    );
}
