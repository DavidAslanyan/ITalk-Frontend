"use client";
import DottedLine from '@/app/components/dotted-line';
import FoodPlate from '@/app/components/food-plate';
import React, { useEffect, useMemo, useState } from 'react';
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
import Monster from '@/app/components/lottie-animations/lottie-monster';
import { addCoinsMutation, addPassedGameMutation, addPointsMutation } from '@/app/services/queries/progress.query';
import { GAME, GamesEnum } from '@/app/utilities/constants/game-titles';
import VictoryBlock from '@/app/components/victory-block/VictoryBlock';
import { getUserQuery } from '@/app/services/queries/auth.query';
import { fetchTermsLevelBased } from '@/app/utilities/functions/fetch-terms-level-based';
import { PROGRESS_POINTS } from '@/app/utilities/constants/global-data';
import LottieAnimation from '@/app/components/lottie-animations/lottie';
import failAnimation from "@/app/components/lottie-animations/fail.json";


const TIMER_SECONDS = 120;
const REWARD_COINS = 5;
const REWARD_POINTS = 175;

const FeedMonster = () => {
  const gamesPassed: string[] = [];
  const { mutateAsync: addPassedGame } = addPassedGameMutation();
  const { mutateAsync: addCoins } = addCoinsMutation();
  const { mutateAsync: addPoints } = addPointsMutation();
  
  const savePassedGame = async () => {
    try {
      await addPassedGame({ gamePassed: GamesEnum.FEED_MONSTER });
      await addCoins({ coins: REWARD_COINS });
      await addPoints({ points: REWARD_POINTS });
  
      router.replace(`${DASHBOARD_URL}/${GAMES}`);
    } catch (error) {
      console.error("Error in transaction:", error);
      router.replace(`${DASHBOARD_URL}/${GAMES}`);
    }
  }

  const router = useRouter();
  const [gameLive, setGameLive] = useState<boolean>(false);
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
      setTimerRunning(false);
    }
  }, [response]);

  const handleRetry = () => {
    window.location.reload();
  }

  const handleFailPopup = () => {
    router.replace(`${DASHBOARD_URL}/${TERMS_URL}`);
  }

  const handleSuccessPopup = () => {
    if (!gamesPassed.includes(GAME.FEED_MONSTER)) {
      savePassedGame();
    } else {
      router.replace(`${DASHBOARD_URL}/${GAMES}`);
    }
  }

  const { data: user, isLoading } = getUserQuery();
  const userMappedData = useMemo(() => {
    if (!user) return null;
    return {
      username: `${user.data.firstName} ${user.data.lastName}`,
      progress: user.data.progress ?? 0, 
      gamesPassed: user.data.gamesPassed,
      coins: user.data.coins,
      points: user.data.points,
      difficultyLevel: user.data.difficultyLevel
    };
  }, [user]);
  
  const curProgress = userMappedData?.progress;
  const termsLevelBased = fetchTermsLevelBased(userMappedData?.difficultyLevel); 

  useEffect(() => {
    setMonstersQuestions(termsLevelBased.slice(curProgress, curProgress + PROGRESS_POINTS).map((item) => item.shortExplanation));
  }, [curProgress]);  

  const termsData = useMemo(() => {
    return termsLevelBased.slice(curProgress, curProgress + PROGRESS_POINTS).map((item) => item.term);
  }, [curProgress]);
  
  const randomTerms = useMemo(() => {
    const fetchedTerms = fetchRandomTerms(5).map((term) => term.term);
    return Array.from(new Set(fetchedTerms.filter(term => !termsData.includes(term))));
  }, [step]);
  
  
  useEffect(() => {
    setShuffledTerms(shuffleArray([...termsData, ...randomTerms]));
  }, []);

  const [draggingItem, setDraggingItem] = useState<string | null>(null);

  function handleDragStart({ active }: any) {
    if (active?.id) {
      setDraggingItem(active.id); 
    }
  }
  
  function handleDragEnd({ over }: any) {  
    if (draggingItem) {
      if (draggingItem.toLowerCase() === termsData[step].toLowerCase()) {
        setStep((prev) => prev + 1);
        setShuffledTerms((prev) => prev.filter((term) => term.toLowerCase() !== draggingItem.toLowerCase()));
      } else {
        setResponse(ResponseEnum.FAIL);
      }
    }
  
    setDraggingItem(null); 
  }  

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }

  if (!gameLive) {
    return (
      <div className="px-4">
        <h1 className="text-secondary text-2xl font-semibold">
          Game 4 - Feed the Monster
        </h1>
        <h3>Figure out what term the mosnter needs and feed him with it</h3>

        <div className="pt-10">
          <span className="text-xl font-semibold">Instructions</span>
          <ul className=" list-decimal">
            <li>Simple and straightforward game</li>
            <li>The monster is hungry and you need to feed him</li>
            <li>The monster is very bad at speaking so you will have to figure out what terms does he want</li>
            <li>
              He has a plate where you need to place the terms which trasnform into food for him
            </li>
            <li>Fill the plate with food until the monster the satisfied</li>
            <li>When the plate is full, press feed and feed the monster</li>
            <li>That's it you won the game!</li>
            <li>Note: The monster is very sensitive you grab a wrong term, he will get angry and you will loose</li>
            <li>So, pick think carefully before you grab one</li>
            <li>Note, if you are on a mobile, no need to grab, just tap on the term and it will be automatically placed on monster's plate</li>
          </ul>
        </div>

        <p className="pt-10">Excited? Great then jump right into the game</p>
        <div className="pt-5 pb-20">
          <ButtonStandard onClick={() => setGameLive(true)} title="Start the Game" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-[160vh] sm:h-auto">
      <h1 className="text-secondary text-2xl font-semibold">
        Game 4 - Feed the Monster
      </h1>

      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="pt-10 flex flex-col-reverse xl:flex-row xl:justify-around items-center">
          <section className="flex flex-1 flex-row xl:flex-col items-center pt-10 xl:pt-0">
            <div className="hidden sm:flex items-center justify-center">
              <Timer setIsRunning={setTimerRunning} seconds={TIMER_SECONDS} isRunning={timerRunning} />
            </div>
            <div className="flex flex-col xl:flex-row items-center">
              <CommentBlock 
                comment={monstersQuestions?.[step] ?? ''} 
                buttonActive={step === monstersQuestions.length} 
                setResponse={setResponse}
                />
              <Monster />
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
        <VictoryBlock 
          handleSuccessPopup={handleSuccessPopup}
          points={REWARD_POINTS}
          coins={REWARD_COINS}
        />
      </Popup>
      
      <Popup isOpen={failPopupOpen}> 
        <div className="flex flex-col items-center justify-center p-5">
            {failPopupOpen &&
              <LottieAnimation width="max-w-[15rem]" data={failAnimation} loop={false} />
            }
            <span className="pt-3 text-2xl text-red-600 font-bold">Failed</span>
            <p className="text-md font-semibold py-2">No worries, with failures we learn as well!</p>
          <ButtonStandard onClick={handleRetry} title="Try Again"/>
          <span className="text-secondary py-1 font-medium">or</span>
          <button onClick={handleFailPopup} className="text-secondary text-base font-semibold">Return to Terms</button>
        </div>
      </Popup>

      <Popup isOpen={timeOverPopupOpen}> 
        <div className="flex flex-col items-center justify-center p-5">
            {failPopupOpen &&
              <LottieAnimation width="max-w-[15rem]" data={failAnimation} loop={false} />
            }
            <span className="pt-3 text-2xl text-red-600 font-bold">Failed</span>
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
