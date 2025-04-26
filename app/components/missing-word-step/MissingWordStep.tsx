"use client";
import React, { useEffect, useMemo, useState } from 'react'
import ButtonStandard from '../buttons/button-standard';


export enum CheckedWordReponseEnum {
  SUCCESS = "success",
  FAIL = "fail"
};

type MissingWordStepProps = {
  term: string;
  explanation: string;
  setResponse: (arg: CheckedWordReponseEnum) => void;
}

const WORD_LENGTH = 4;
const UNDERLINE = "_";

const MissingWordStep: React.FC<MissingWordStepProps> = ({
  term,
  explanation,
  setResponse
}) => {
  const words = explanation.split(' ');
  const longWords = words.filter((word) => word.length >= WORD_LENGTH);
  
  const [inputValue, setInputValue] = useState<string>("");
  const [savedWord, setSavedWord] = useState<string | null>(null);
  
  useEffect(() => {
    if (longWords.length > 0) {
      setSavedWord(longWords[Math.floor(Math.random() * Math.min(3, longWords.length))]);
    }
  }, [term]); 
  
  const formattedWords = useMemo(() => {
    return words.map((word) => (word === savedWord ? UNDERLINE : word));
  }, [words, savedWord]);
  

  const handleCheckClick = () => {
    if (inputValue.toLowerCase() === savedWord?.toLowerCase()) {
      setResponse(CheckedWordReponseEnum.SUCCESS);
    } else {
      setResponse(CheckedWordReponseEnum.FAIL);
    }
  }


  return (
    <div className='flex flex-col justify-center items-center'>
      <p className='pt-5'>Term: <span className='text-xl text-secondary font-semibold'>{term}</span></p>
      <div className='pt-10 flex flex-wrap items-center gap-2'>
        {formattedWords.map((word, index) => {
          if (word === UNDERLINE) {
            return (
              <div key={index} className='border-b-2 border-b-secondary'>
                <input 
                  value={inputValue} 
                  onChange={(e) => setInputValue(e.target.value)}
                  name='missingTerm' 
                  className={`text-lg px-2 w-full max-w-[10rem] font-semibold text-secondary bg-backPrimary border-none focus:outline-none`}
                  />
              </div>
            )
          }
          return <p className='text-md text-secondary font-medium' key={index}>{word}</p>
        })}
      </div>

      <div className='pt-6'>
        <ButtonStandard onClick={handleCheckClick} disabled={inputValue === ""} title='Check My Word' />
      </div>
    </div>
  )
}

export default MissingWordStep;

