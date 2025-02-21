import React from 'react';
import ButtonQuizStep, { QuizButtonForm } from '../buttons/button-quiz-step/ButtonQuizStep';

type QuizStepProps = {
  term: string;
  answer: string;
  shuffledOptions?: string[];
  selectedOption: string;
  selectOption: (arg: string) => void;
  setResponse: (arg: QuizButtonForm | "") => void;
};

const QuizStep: React.FC<QuizStepProps> = ({
  term,
  answer,
  shuffledOptions,
  selectedOption,
  selectOption,
  setResponse,
}) => {
  
  const handleClick = (option: string) => {
    if (selectedOption === "") {  
      selectOption(option);
      setResponse(option === answer ? QuizButtonForm.SUCCESS : QuizButtonForm.ERROR);
    }
  };

  const checkButtonColor = (option: string): QuizButtonForm => {
    if (selectedOption === "") return QuizButtonForm.DEF;
    if (option === answer) return QuizButtonForm.SUCCESS;
    if (option === selectedOption) return QuizButtonForm.ERROR;
    return QuizButtonForm.DEF;
  };

  return (
    <div className='border flex flex-col justify-center items-center'>
      <span className='text-secondary text-base'>
        What does this mean? - <span className='text-secondary text-2xl font-semibold'>{term}</span>
      </span>
      <ul className='pt-5 flex w-full max-w-[45rem] flex-wrap items-center gap-4'>
        {shuffledOptions?.map((option, index) => (
          <li key={index}>
            <ButtonQuizStep 
              form={checkButtonColor(option)} 
              title={option} 
              onClick={() => handleClick(option)} 
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizStep;
