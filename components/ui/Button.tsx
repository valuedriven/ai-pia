import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className = '', 
  disabled,
  ...props 
}) => {
  const baseStyle = "inline-flex items-center justify-center px-4 py-2 rounded-md font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[#1F3A5F] text-white hover:bg-[#162942] focus:ring-[#1F3A5F]",
    secondary: "bg-white text-[#1F3A5F] border border-[#1F3A5F] hover:bg-gray-50 focus:ring-[#1F3A5F]",
    ghost: "bg-transparent text-[#4B5563] hover:bg-gray-100 focus:ring-gray-500",
    danger: "bg-[#C62828] text-white hover:bg-[#B71C1C] focus:ring-[#C62828]",
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  );
};
