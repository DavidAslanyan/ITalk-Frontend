import React, { ButtonHTMLAttributes, forwardRef } from 'react'

type ButtonProps = {
  title: string;
  onClick?: any;
  disabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;


const ButtonSecondary = forwardRef<HTMLButtonElement, ButtonProps>(({ 
  title, 
  onClick, 
  className, 
  disabled = false,
  ...props 
}, ref) => {

  if (disabled) {
    return (
      <button 
        className="bg-thirdly opacity-25 transition-all text-white border-2 border-secondary px-6 py-2 rounded font-medium"
        onClick={onClick}
        ref={ref} 
        disabled={disabled}
        {...props}
        >{title}
      </button>
    )
  }

    return (
      <button 
        className="bg-secondary transition-all text-white border-2 border-secondary px-6 py-2 rounded font-medium"
        onClick={onClick}
        ref={ref} 
        disabled={disabled}
        {...props}
        >{title}
      </button>
    );
  }
);

export default ButtonSecondary;

