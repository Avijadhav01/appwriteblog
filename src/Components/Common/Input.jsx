import React, { useId, forwardRef } from 'react';

const Input = forwardRef(function Input({
  label,
  type = 'text',
  className = "",
  ...props
}, ref) {

  const id = useId();

  return (
    <div className="w-full mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        ref={ref}
        className={`w-full px-4 py-2 rounded-xl bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-200 shadow-sm ${className}`}
        {...props}
      />
    </div>
  );
});

export default Input;
