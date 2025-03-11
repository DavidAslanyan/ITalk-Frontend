import React, { useState } from 'react';
import Student from '../lottie-animations/lottie-student';
import Programmer from '../lottie-animations/lottie-programmer';
import Robot from '../lottie-animations/lottie-robot';
import { DifficultyLevel } from '@/app/utilities/enums/difficulty-level.enum';
import ButtonSecondary from '../buttons/button-secondary/ButtonSecondary';
import ButtonStandard from '../buttons/button-standard';
import { changeDifficultyrMutation } from '@/app/services/queries/auth.query';

type SelectDifficultyProps = {
  difficulty: string;
  setDifficultyPopupOpen: (arg: boolean) => void;
}


const SelectDifficulty: React.FC<SelectDifficultyProps> = ({
  difficulty,
  setDifficultyPopupOpen
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(difficulty);
  const { mutate: changeDifficulty } = changeDifficultyrMutation();

  const levels = [
    {
      title: "Student - Easy",
      description: "Start simple! Perfect for beginners or those with a little IT knowledge. You'll earn rewards at a steady pace—great for building a strong foundation.",
      icon: <Student />,
      level: DifficultyLevel.EASY
    },
    {
      title: "Specialist - Medium",
      description: "Step it up! If you already know your way around IT, this level offers a balanced challenge with faster rewards. Time to level up!",
      icon: <Programmer />,
      level: DifficultyLevel.MEDIUM
    },
    {
      title: "IT Master - Hard",
      description: "Only for the brave! Test your mastery with complex terms and tough challenges. The harder the task, the bigger the rewards!",
      icon: <Robot />,
      level: DifficultyLevel.HARD
    }
  ];

  const handleSaveClick = (level: DifficultyLevel | string) => {
    if (level === difficulty) {
      setDifficultyPopupOpen(false);
      return;
    }
    const data = { level };

    changeDifficulty(data,
      {
        onSuccess: () => {
          setDifficultyPopupOpen(false);
        },
        onError: (error) => {
          setDifficultyPopupOpen(false);
          console.error(error);
        }
      }
    );
  }
  

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-center text-secondary font-bold text-xl pb-10'>Select Difficulty</h1>
      <ul className='flex flex-col md:flex-row items-center justify-around md:gap-10'>
        {levels.map((item, index) => (
          <li 
            onClick={() => setSelectedDifficulty(item.level)}
            className={`${selectedDifficulty === item.level && "border-[0.3rem] rounded-sm border-green-500" } cursor-pointer p-2 pb-4 flex flex-row md:flex-col items-center`}
            key={index}>
            <div className='hidden sm:block w-full max-w-[10rem] md:max-w-[20rem]'>{item.icon}</div>
            <div>
              <p className='text-secondary text-center font-bold text-md'>{item.title}</p>
              <p className='w-full max-w-[21rem] text-center text-sm md:text-base'>{item.description}</p>
              {selectedDifficulty === item.level && <p className='pt-3 text-center text-md text-green-500 font-semibold transition-all'>Active</p>}
            </div>
          </li>
        ))}
      </ul>

      <div className='pt-10 flex items-center justify-center gap-5'>
        <ButtonSecondary onClick={() => setDifficultyPopupOpen(false)} title='Cancel' />
        <ButtonStandard onClick={() => handleSaveClick(selectedDifficulty)} title='Save Changes' />
      </div>
    </div>
  )
}

export default SelectDifficulty;
