import React from 'react'
import ButtonQuizStep from '../buttons/button-quiz-step/ButtonQuizStep';

type QuizStepProps = {
  term: string;
  answer: string;
  shuffledOptions?: string[];
  selectOption: (arg: string) => void;
}

const QuizStep: React.FC<QuizStepProps> = ({
  term,
  answer,
  shuffledOptions,
  selectOption
}) => {
  const handleClick = (text: string) => {
    if (text === answer) {
      selectOption("Correct")
    } else {
      selectOption("Wrong")
    }
  }

  return (
    <div className='border flex flex-col justify-center items-center'>
      <span className='text-secondary text-base'>What does this mean? - <span className='text-secondary text-2xl font-semibold'>{term}</span></span>
      <ul className='pt-5 flex w-full max-w-[45rem] flex-wrap items-center flex-gap gap-4'>
        {shuffledOptions?.map((option, index) => (
          <li key={index}>
            <ButtonQuizStep title={option} onClick={() => handleClick(option)} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default QuizStep;

