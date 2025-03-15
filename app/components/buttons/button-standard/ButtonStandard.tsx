import React, { ButtonHTMLAttributes, forwardRef } from 'react'

type ButtonProps = {
  title: string;
  onClick?: any;
  disabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;


const ButtonStandard = forwardRef<HTMLButtonElement, ButtonProps>(({ 
  title, 
  onClick, 
  className, 
  disabled = false,
  ...props 
}, ref) => {

  if (disabled) {
    return (
      <button 
        className="bg-thirdly opacity-25 transition-all text-secondary border-2 border-secondary px-6 py-2 rounded font-semibold"
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
        className="hover:none bg-primary md:hover:bg-secondary hover:border-secondary transition-all text-white border-2 border-primary px-6 py-2 rounded font-semibold"
        onClick={onClick}
        ref={ref} 
        disabled={disabled}
        {...props}
        >{title}
      </button>
    );
  }
);

export default ButtonStandard;

