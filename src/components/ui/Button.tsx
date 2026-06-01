import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'edit' | 'delete' | 'default';
}

const Button: React.FC<ButtonProps> = ({ variant = 'default', className = '', children, ...props }) => {
  let buttonClass = className;
  
  if (variant === 'primary') {
    buttonClass = `btn-primary ${className}`;
  } else if (variant === 'edit') {
    buttonClass = `action-btn btn-edit ${className}`;
  } else if (variant === 'delete') {
    buttonClass = `action-btn btn-delete ${className}`;
  }

  return (
    <button className={buttonClass.trim()} {...props}>
      {children}
    </button>
  );
};

export default Button;
