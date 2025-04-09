import { forwardRef } from 'react';

const variantClasses = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  success: 'btn-success',
  danger: 'btn-danger',
  ghost: 'btn-outline-secondary'
};

const sizeClasses = {
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg'
};

const Button = forwardRef(({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  fullWidth = false,
  onClick,
  ...props
}, ref) => {
  const baseClasses = 'btn';
  const widthClass = fullWidth ? 'w-100' : '';
  
  return (
    <button
      ref={ref}
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button; 