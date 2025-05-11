import React from 'react';

interface IProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

const Button: React.FC<IProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled = false,
  type = 'button'
}) => {
  const baseClasses = 'rounded-lg px-4 py-2 font-medium transition-all duration-200 flex items-center justify-center';

  const variantClasses = {
    primary: 'bg-orange-500 hover:bg-orange-600 text-white shadow-sm',
    secondary: 'bg-green-600 hover:bg-green-700 text-white shadow-sm',
    outline: 'border-2 border-orange-500 text-orange-500 hover:bg-orange-50',
    text: 'text-orange-500 hover:bg-orange-50',
    whatsapp: 'bg-green-500 hover:bg-green-600 text-white shadow-sm'
  };

  const sizeClasses = {
    sm: 'text-sm py-1.5 px-3',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-3 px-6'
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        ${widthClass} 
        ${disabledClasses} 
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;