"use client";
import React, { useEffect, useMemo, useState } from "react";
import easyTermsData from "../../../data/easy-terms.json";
import MissingWordStep from "@/app/components/missing-word-step";
import { CheckedWordReponseEnum } from "@/app/components/missing-word-step/MissingWordStep";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import ButtonStandard from "@/app/components/buttons/button-standard";
import Popup from "@/app/components/popup";
import { useRouter } from "next/navigation";
import { DASHBOARD_URL, GAMES, TERMS_URL } from "@/app/utilities/constants/global-urls";
import Timer from "@/app/components/timer";
import SmallProgressBar from "@/app/components/small-progress-bar/SmallProgressBar";
import { addCoinsMutation, addPassedGameMutation, addPointsMutation } from "@/app/services/queries/progress.query";
import { GAME, GamesEnum } from "@/app/utilities/constants/game-titles";
import VictoryBlock from "@/app/components/victory-block/VictoryBlock";
import { getUserQuery } from "@/app/services/queries/auth.query";
import { PROGRESS_POINTS } from "@/app/utilities/constants/global-data";
import { fetchTermsLevelBased } from "@/app/utilities/functions/fetch-terms-level-based";
import { shuffleArray } from "@/app/utilities/functions/shuffle-array";
import LottieAnimation from "@/app/components/lottie-animations/lottie";
import failAnimation from "@/app/components/lottie-animations/fail.json";


const TIMER_SECONDS = 59;
const REWARD_COINS = 5;
const REWARD_POINTS = 175;

const MissingWord = () => {
  const gamesPassed: string[] = [];
  const { mutateAsync: addPassedGame } = addPassedGameMutation();
  const { mutateAsync: addCoins } = addCoinsMutation();
  const { mutateAsync: addPoints } = addPointsMutation();
  
  const savePassedGame = async () => {
    try {
      await addPassedGame({ gamePassed: GamesEnum.MISSING_WORD });
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
  const [swiper, setSwiper] = useState<any>(null);
  const [step, setStep] = useState<number>(0);
  const [response, setResponse] = useState<CheckedWordReponseEnum | null>(null);
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
    if (response === CheckedWordReponseEnum.FAIL) {
      setTimerRunning(false);
      setFailPopupOpen(true);
    }
  }, [response]);

  const handleRetry = () => {
    window.location.reload();
  }

  const handleFailPopup = () => {
    router.replace(`${DASHBOARD_URL}/${TERMS_URL}`);
  }

  const handleSuccessPopup = () => {
    if (!gamesPassed.includes(GAME.MISSING_WORD)) {
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
  const termData = useMemo(() => shuffleArray(termsLevelBased.slice(curProgress, curProgress + PROGRESS_POINTS)), [curProgress]);
  const onSlideChange = () => {
    setStep(swiper.activeIndex);
  };

  const handleNext = () => {
    if (step < termData.length - 1) {
      swiper?.slideNext();
    } else {
      setTimerRunning(false);
      setSuccessPopupOpen(true);
    }
    setResponse(null);
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
          Game 2 - Missing Word
        </h1>
        <h3>Find the missing words in the terms' explanations to test your recently learnt </h3>

        <div className="pt-10">
          <span className="text-xl font-semibold">Instructions</span>
          <ul className=" list-decimal">
            <li>Simple and straighforward game</li>
            <li>A short explanation of one the learned terms will be shown to you</li>
            <li>
              However, one of the words will be missing
            </li>
            <li>You will have to type the missing word by yourself and click check</li>
            <li>You have 1 minute to complete all 5 terms</li>
            <li>Tha's it, continue the same steps for the rest of the terms</li>
            <li>If you passed all, Congrats, you won Game 2</li>
            <li>You are ready to proceed to the next games</li>
          </ul>
        </div>

        <p className="pt-10">Excited? Great then jump right into the game</p>
        <div className="pt-5 pb-20">
          <ButtonStandard onClick={() => setGameLive(true)} title="Start the Game" />
        </div>
      </div>
    );
  }

  console.log(termData)


  return (
    <div className="h-[140vh] md:h-auto">
      <h1 className="text-secondary text-2xl font-semibold">
        Game 2 - Missing Word
      </h1>

      <div className="pt-10">
        <Timer setIsRunning={setTimerRunning} seconds={TIMER_SECONDS} isRunning={timerRunning} />
      </div>

      <div className="relative md:flex flex-col pt-10 justify-start items-center min-h-[55vh]">
        <div className="w-full max-w-[40rem] lg:max-w-[50rem]">
          <h2 className="text-center text-lg font-semibold">Question {step + 1}</h2>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={10}
              slidesPerView={1}
              onSwiper={setSwiper}
              onSlideChange={onSlideChange}
              allowTouchMove={false}
            >
              {termData.map((term, index) => (
                <SwiperSlide key={index}>
                  <MissingWordStep
                    setResponse={setResponse}
                    term={term.term}
                    explanation={term.shortExplanation}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div>
            {response === CheckedWordReponseEnum.SUCCESS
            && 
            <div className="flex flex-col items-center">
              <p className="py-10 text-2xl text-green-700 font-bold">Correct, Well Done !</p>
              <ButtonStandard 
                onClick={handleNext} 
                title={step < termData.length - 1 ? "Next Question" : "Finish"}
              />
            </div>
            }
          </div>

          <section className="hidden sm:block absolute bottom-0 pt-5 w-full max-w-[30rem] mx-auto">
            <div className="w-full">
              <SmallProgressBar progress={step} limit={termData.length - 1} />
            </div>
          </section>
        </div>

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

export default MissingWord;
