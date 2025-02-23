"use client";
import React, { Fragment, useMemo, useState } from 'react'
import InputUnderlined from '../input-underlined';
import ButtonStandard from '../buttons/button-standard';


export enum CheckedWordReponseEnum {
  SUCCESS = "success",
  FAIL = "fail"
};

type MissingWordStepProps = {
  term: string;
  explanation: string;
  response: CheckedWordReponseEnum | null;
  setResponse: (arg: CheckedWordReponseEnum) => void;
}

const WORD_LENGTH = 4;
const UNDERLINE = "_";

const MissingWordStep: React.FC<MissingWordStepProps> = ({
  term,
  explanation,
  response,
  setResponse
}) => {
  const words = explanation.split(' ');
  const longWords = words.filter((word) => word.length >= WORD_LENGTH);

  const [inputValue, setInputValue] = useState<string>("");
  const [savedWord, setSavedWord] = useState<string | null>(null);

  const formattedWords = useMemo(() => {
    const wordToCut = longWords[Math.floor(Math.random() * 3)];
    setSavedWord(wordToCut);

    return words.map((word) => (word === wordToCut ? UNDERLINE : word));
  }, [term, savedWord]);

  const handleCheckClick = () => {
    if (inputValue.toLowerCase() === savedWord?.toLowerCase()) {
      setResponse(CheckedWordReponseEnum.SUCCESS);
    } else {
      setResponse(CheckedWordReponseEnum.FAIL);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <p>Term: {term}</p>
      <div className='flex items-center gap-2'>
        {formattedWords.map((word, index) => (
          word === UNDERLINE
          ? 
          <div key={index}>
            <InputUnderlined 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)}
              name='missingTerm' 
            />
          </div>
          : <p className='text-base text-secondary font-medium' key={index}>{word}</p>
        ))}
      </div>

      <div className='pt-6'>
        <ButtonStandard onClick={handleCheckClick} disabled={inputValue === ""} title='Check My Word' />
      </div>
    </div>
  )
}

export default MissingWordStep;

