import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', id, ...props }) => {
  const inputId = id || props.name;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-[#111827] mb-1">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-[#111827] placeholder-gray-400 focus:border-[#1F3A5F] focus:outline-none focus:ring-1 focus:ring-[#1F3A5F] disabled:bg-gray-50 ${
          error ? 'border-[#C62828] focus:border-[#C62828] focus:ring-[#C62828]' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-[#C62828]">{error}</p>}
    </div>
  );
};
