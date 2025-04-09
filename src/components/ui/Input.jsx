import { forwardRef } from 'react';

const Input = forwardRef(({
  type = 'text',
  label,
  id,
  name,
  placeholder,
  value,
  onChange,
  error,
  className = '',
  fullWidth = false,
  ...props
}, ref) => {
  const baseClasses = 'form-control';
  const errorClass = error ? 'is-invalid' : '';
  
  return (
    <div className={`${fullWidth ? 'w-100' : ''} mb-3`}>
      {label && (
        <label 
          htmlFor={id} 
          className="form-label"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${baseClasses} ${errorClass} ${className}`}
        {...props}
      />
      {error && (
        <div className="invalid-feedback">{error}</div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input; 