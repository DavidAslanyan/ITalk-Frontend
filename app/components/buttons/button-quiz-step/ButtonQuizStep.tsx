import React from 'react'

export enum QuizButtonForm {
  SUCCESS = "success",
  ERROR = "error",
  DEF = "def"
}

type ButtonProps = {
  title: string;
  onClick: () => void;
  form: QuizButtonForm;
}

const ButtonQuizStep: React.FC<ButtonProps> = ({
  title,
  onClick,
  form
}) => {
  const buttonColor = {
    [QuizButtonForm.SUCCESS]: "bg-green-700",
    [QuizButtonForm.ERROR]: "bg-red-500",
    [QuizButtonForm.DEF]: "bg-secondary"
  }[form];

  return (
    <button 
      type='button'
      className={`
        ${buttonColor}
        text-white rounded-sm w-full max-w-[20rem] md:max-w-auto md:w-[20rem] h-20 py-2 px-3`
      }
      onClick={onClick}
      >
        {title}
    </button>
  )
}

export default ButtonQuizStep;
