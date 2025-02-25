"use client"
import { ResponseEnum } from '@/app/utilities/enums/response.enum';
import React, { useEffect, useState } from 'react'
import OTPInput from '../otp-input';
import ButtonStandard from '../buttons/button-standard';


type ShuffleWordStepProps = {
  term: string;
  explanation: string;
  response: ResponseEnum | null;
  setResponse: (arg: ResponseEnum) => void;
}

function shuffleString(str: string): string {
  return str
    .toUpperCase()
    .split('') 
    .sort(() => Math.random() - 0.5) 
    .join(''); 
};

const ShuffleWord: React.FC<ShuffleWordStepProps> = ({
  term,
  explanation,
  response,
  setResponse
}) => {
  
  const [shuffledTerm, setShuffledTerm] = useState("");

  useEffect(() => {
    setShuffledTerm(shuffleString(term));
  }, [term]);

  const [otp, setOtp] = useState("");

  const handleCheckClick = () => {
    if (otp.toLowerCase() === term.toLowerCase()) {
      setResponse(ResponseEnum.SUCCESS);
    } else {
      setResponse(ResponseEnum.FAIL);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <p style={{letterSpacing: '0.3rem'}} className='mt-3 text-3xl text-primary font-semibold bg-secondary px-2 py2 rounded-sm'>
        {response === ResponseEnum.SUCCESS ? term.toUpperCase() : shuffledTerm}
      </p>
      <p className='pt-3 text-secondary text-lg'>Hint: {explanation}</p>

      <div className='py-5'>
        <OTPInput response={response} length={shuffledTerm.length} value={otp} onChange={setOtp} />
      </div>

      <ButtonStandard disabled={otp.length !== term.length} onClick={handleCheckClick} title='Check my word'/>
    </div>
  )
}

export default ShuffleWord;

