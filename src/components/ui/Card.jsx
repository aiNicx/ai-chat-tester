import { forwardRef } from 'react';

const Card = forwardRef(({
  children,
  className = '',
  hasShadow = true,
  hasBorder = false,
  padding = 'normal',
  ...props
}, ref) => {
  const baseClasses = 'card';
  const shadowClass = hasShadow ? 'shadow' : '';
  const borderClass = hasBorder ? 'border' : '';
  
  let paddingClass;
  switch (padding) {
    case 'none':
      paddingClass = '';
      break;
    case 'small':
      paddingClass = 'p-2';
      break;
    case 'normal':
      paddingClass = 'p-3';
      break;
    case 'large':
      paddingClass = 'p-4';
      break;
    default:
      paddingClass = 'p-3';
  }
  
  return (
    <div
      ref={ref}
      className={`${baseClasses} ${shadowClass} ${borderClass} ${paddingClass} ${className}`}
      {...props}
    >
      <div className="card-body">
        {children}
      </div>
    </div>
  );
});

Card.displayName = 'Card';

export default Card; 