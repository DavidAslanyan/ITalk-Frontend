import React from 'react'

type ButtonProps = {
  title: string;
  onClick: () => void;
}

const ButtonQuizStep: React.FC<ButtonProps> = ({
  title,
  onClick
}) => {
  return (
    <button 
      type='button'
      className='w-full max-w-[20rem] md:max-w-auto md:w-[20rem] h-20 py-2 px-3 bg-secondary rounded-sm text-white'
      onClick={onClick}
      >
        {title}
    </button>
  )
}

export default ButtonQuizStep;
