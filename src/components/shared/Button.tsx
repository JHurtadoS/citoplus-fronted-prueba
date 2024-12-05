import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', isLoading, children, ...props }) => {
    const baseClasses =
        'py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 transition';

    const variantClasses =
        variant === 'primary'
            ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
            : 'bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-gray-200';

    return (
        <button
            className={`${baseClasses} ${variantClasses}`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? 'Cargando...' : children}
        </button>
    );
};

export default Button;
