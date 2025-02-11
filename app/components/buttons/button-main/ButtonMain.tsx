import React, { ButtonHTMLAttributes, forwardRef } from 'react'

type ButtonProps = {
  title: string;
  onClick: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;


const ButtonMain = forwardRef<HTMLButtonElement, ButtonProps>(({ 
  title, 
  onClick, 
  className, 
  ...props 
}, ref) => {

    return (
      <button 
        className='w-32 h-12 bg-primary border-2 border-secondary'
        onClick={onClick}
        ref={ref} 
        {...props}
        >{title}
      </button>
    );
  }
);

export default ButtonMain;

