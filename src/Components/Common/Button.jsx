import React from 'react';

function Button({
  children,
  type = 'button',
  bgColor = 'bg-blue-500',
  textColor = 'text-white',
  className = '',
  loading = false,
  ...props
}) {
  return (
    <button
      type={type}
      className={`
        px-2 py-1
        rounded-full
        font-medium
        shadow-md
        hover:brightness-110
        transition duration-300 ease-in-out
        disabled:opacity-50 disabled:cursor-not-allowed
        cursor-pointer
        ${bgColor} ${textColor} ${className}
      `}
      disabled={loading}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}

export default Button;
