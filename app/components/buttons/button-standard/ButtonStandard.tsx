import React, { ButtonHTMLAttributes, forwardRef } from 'react'

type ButtonProps = {
  title: string;
  onClick: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;


const ButtonStandard = forwardRef<HTMLButtonElement, ButtonProps>(({ 
  title, 
  onClick, 
  className, 
  ...props 
}, ref) => {

    return (
      <button 
        className="hover:none bg-primary md:hover:bg-secondary md:hover:text-primary transition-all text-secondary border-2 border-secondary px-6 py-2 rounded font-semibold"
        onClick={onClick}
        ref={ref} 
        {...props}
        >{title}
      </button>
    );
  }
);

export default ButtonStandard;

