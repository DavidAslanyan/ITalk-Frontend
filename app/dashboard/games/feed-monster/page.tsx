"use client";
import DottedLine from '@/app/components/dotted-line';
import FoodPlate from '@/app/components/food-plate';
import Zombie from '@/app/components/lottie-zombie';
import React, { useEffect, useMemo, useState } from 'react';
import easyTermsData from "../../../data/easy-terms.json";
import { fetchRandomTerms } from "@/app/utilities/functions/fetch-random-terms";
import { ResponseEnum } from '@/app/utilities/enums/response.enum';
import { shuffleArray } from '@/app/utilities/functions/shuffle-array';
import CommentBlock from '@/app/components/comment-block';
import { DndContext } from '@dnd-kit/core';
import { Draggable } from './Draggable';
import { Droppable } from './Droppable';
import { useRouter } from 'next/navigation';
import { DASHBOARD_URL, GAMES, TERMS_URL } from '@/app/utilities/constants/global-urls';
import Popup from '@/app/components/popup';
import ButtonStandard from '@/app/components/buttons/button-standard';
import Timer from '@/app/components/timer';


const TIMER_SECONDS = 45;

const FeedMonster = () => {
  const router = useRouter();
  const data = {
    progress: 5,
  };

  const [step, setStep] = useState<number>(0);
  const [response, setResponse] = useState<ResponseEnum | null>(null);
  const [shuffledTerms, setShuffledTerms] = useState<string[]>([]);
  const [monstersQuestions, setMonstersQuestions] = useState<string[]>([]);

  const [timerRunning, setTimerRunning] = useState<boolean>(true);
  const [successPopupOpen, setSuccessPopupOpen] = useState<boolean>(false);
  const [failPopupOpen, setFailPopupOpen] = useState<boolean>(false);
  const [timeOverPopupOpen, setTimeOverPopupOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!timerRunning && !successPopupOpen && !failPopupOpen) {
      setTimeOverPopupOpen(true);
    }
  }, [timerRunning]);
    
  useEffect(() => {
    if (response === ResponseEnum.FAIL) {
      setTimerRunning(false);
      setFailPopupOpen(true);
    } else if (response === ResponseEnum.SUCCESS) {
      setSuccessPopupOpen(true);
    }
  }, [response]);

  const handleRetry = () => {
    window.location.reload();
  }

  const handleFailPopup = () => {
    router.replace(`${DASHBOARD_URL}/${TERMS_URL}`);
  }

  const handleSuccessPopup = () => {
    router.push(`${DASHBOARD_URL}/${GAMES}`);
  }

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

  const [draggingItem, setDraggingItem] = useState<string | null>(null);

  function handleDragStart({ active }: any) {
    if (active?.id) {
      setDraggingItem(active.id); 
    }
  }
  
  function handleDragEnd({ over }: any) {  
    if (draggingItem) {
      if (draggingItem.toLowerCase() === termsData[step].toLowerCase()) {
        setStep(step + 1);
        setShuffledTerms((prev) => prev.filter((term) => term.toLowerCase() !== draggingItem.toLowerCase()));
      } else {
        setResponse(ResponseEnum.FAIL);
      }
    }
  
    setDraggingItem(null); 
  }
  

  return (
    <div className="h-[140vh] md:h-auto">
      <h1 className="text-secondary text-2xl font-semibold">
        Game 4 - Feed the Monster
      </h1>

      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="pt-10 flex flex-col-reverse xl:flex-row xl:justify-around items-center">
          <section className="flex flex-1 flex-row xl:flex-col items-center pt-10 xl:pt-0">
            <div className="flex items-center justify-center">
              <Timer setIsRunning={setTimerRunning} seconds={TIMER_SECONDS} isRunning={timerRunning} />
            </div>
            <div className="flex flex-col xl:flex-row items-center">
              <CommentBlock 
                comment={monstersQuestions?.[step] ?? ''} 
                buttonActive={step === monstersQuestions.length} 
                setResponse={setResponse}
                />
              <Zombie />
            </div>
            <Droppable id="droppable">
              <FoodPlate step={step} />
            </Droppable>
          </section>

          <DottedLine />

          <section className="px-4 xl:px-8 flex-1 w-full mb-10">      
            <ul className="flex flex-row flex-wrap xl:flex-col gap-3 w-full max-w-[60rem] xl:max-w-[36rem]">
              {shuffledTerms.map((term, index) => (
                <li className={`${index % 2 === 0 ? 'xl:self-start' : 'xl:self-end'}`} key={index}>
                  <Draggable id={term}>
                    <div className={`cursor-grab xl:rotate-12 hover:rotate-3 transition-all justify-center bg-secondary w-full max-w-[15rem] text-center px-3 py-2 rounded-sm flex items-center`}>
                      <p className="text-white font-semibold text-md text-center">{term}</p>
                    </div>
                  </Draggable>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </DndContext>

      <Popup isOpen={successPopupOpen}>
        <div className="flex flex-col items-center justify-center p-5">
          <span className="py-3 text-2xl text-green-600 font-bold">SUCCESS</span>
          <ButtonStandard onClick={handleSuccessPopup} title="Proceed to other Games"/>
        </div>
      </Popup>
      
      <Popup isOpen={failPopupOpen}> 
        <div className="flex flex-col items-center justify-center p-5">
          <span className="py-3 text-2xl text-red-600 font-bold">FAIL</span>
          <ButtonStandard onClick={handleRetry} title="Try Again"/>
          <span className="text-secondary py-1 font-medium">or</span>
          <button onClick={handleFailPopup} className="text-secondary text-base font-semibold">Return to Terms</button>
        </div>
      </Popup>

      <Popup isOpen={timeOverPopupOpen}> 
        <div className="flex flex-col items-center justify-center p-5">
          <span className="py-3 text-2xl text-red-600 font-bold">FAIL</span>
          <span className="pb-2 text-red-600 text-xl">Sorry, your time is over</span>
          <ButtonStandard onClick={handleRetry} title="Try Again"/>
          <span className="text-secondary py-1 font-medium">or</span>
          <button onClick={handleFailPopup} className="text-secondary text-base font-semibold">Return to Terms</button>
        </div>
      </Popup>
    </div>
  );
};

export default FeedMonster;
