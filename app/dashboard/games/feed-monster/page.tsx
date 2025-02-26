"use client";
import DottedLine from '@/app/components/dotted-line';
import FoodPlate from '@/app/components/food-plate';
import Zombie from '@/app/components/lottie-zombie';
import React, { useEffect, useMemo, useState } from 'react'
import easyTermsData from "../../../data/easy-terms.json";
import { fetchRandomTerms } from "@/app/utilities/functions/fetch-random-terms";
import { ResponseEnum } from '@/app/utilities/enums/response.enum';
import { shuffleArray } from '@/app/utilities/functions/shuffle-array';
import CommentBlock from '@/app/components/comment-block';


const FeedMonster = () => {
  const data = {
    progress: 5,
  };

  const [step, setStep] = useState<number>(0);
  const [response, setResponse] = useState<ResponseEnum | null>(null);
  const [shuffledTerms, setShuffledTerms] = useState<string[]>([]);
  const [monstersQuestions, setMonstersQuestions] = useState<string[]>([]);

  useEffect(() => {
    setMonstersQuestions(easyTermsData.slice(data.progress).map((item) => item.shortExplanation));
  }, [data.progress]);  

  const termsData = useMemo(() => {
    return easyTermsData.slice(data.progress).map((item) => item.term);
  }, [data.progress]);
  
  const randomTerms = useMemo(() => {
    return fetchRandomTerms(5).map((term) => term.term);
  }, [step]);
  
  
  useEffect(() => {
    setShuffledTerms(shuffleArray([...termsData, ...randomTerms]));
  }, [termsData, randomTerms]);
  

  return (
    <div className="h-[140vh] md:h-auto"> 
      <h1 className="text-secondary text-2xl font-semibold">
        Game 4 - Feed the Monster
      </h1>

      <div className='pt-10 flex flex-col-reverse xl:flex-row xl:justify-around items-center'>
        <section className='flex flex-1 flex-row xl:flex-col items-center'>
          <div className='flex flex-col xl:flex-row items-center'>
            <CommentBlock comment={monstersQuestions[0]} />
            <Zombie />
          </div>
          <FoodPlate step={5} />
        </section>

        <DottedLine />

        <section className='px-4 flex-1 w-full mb-10'>
          <ul className='flex flex-row flex-wrap xl:flex-col gap-3 w-full max-w-[60rem] xl:max-w-[36rem]'>
            {shuffledTerms.map((term, index) => (
              <li key={index} className={`${index % 2 === 0 ? 'xl:self-start' : 'xl:self-end'} xl:rotate-12 justify-center bg-secondary w-full max-w-[15rem] text-center px-3 py-2 rounded-sm flex items-center `}>
                <p className='text-white font-semibold text-md text-center'>{term}</p>
              </li>
            ))}
          </ul>
        </section>

      </div>

    </div>
  )
}

export default FeedMonster;

