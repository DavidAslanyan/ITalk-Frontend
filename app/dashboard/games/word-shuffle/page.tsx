"use client"
import React, { useEffect, useMemo, useState } from 'react';
import easyTermsData from "../../../data/easy-terms.json";
import ShuffleWord from '@/app/components/shuffle-word';
import { ResponseEnum } from '@/app/utilities/enums/response.enum';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import ButtonStandard from '@/app/components/buttons/button-standard';
import { useRouter } from 'next/navigation';
import { DASHBOARD_URL, GAMES, TERMS_URL } from '@/app/utilities/constants/global-urls';
import Popup from '@/app/components/popup';
import Timer from '@/app/components/timer';
import SmallProgressBar from '@/app/components/small-progress-bar/SmallProgressBar';
import { addCoinsMutation, addPassedGameMutation, addPointsMutation } from '@/app/services/queries/progress.query';
import { GAME, GamesEnum } from '@/app/utilities/constants/game-titles';
import VictoryBlock from '@/app/components/victory-block/VictoryBlock';
import { getUserQuery } from '@/app/services/queries/auth.query';
import { fetchTermsLevelBased } from '@/app/utilities/functions/fetch-terms-level-based';
import { PROGRESS_POINTS } from '@/app/utilities/constants/global-data';
import { shuffleArray } from '@/app/utilities/functions/shuffle-array';
import LottieAnimation from '@/app/components/lottie-animations/lottie';
import failAnimation from "@/app/components/lottie-animations/fail.json";
import Loading from '@/app/components/loading';


const TIMER_SECONDS = 120;
const REWARD_COINS = 5;
const REWARD_POINTS = 175;

const WordShuffle = () => {
  const gamesPassed: string[] = [];
  const { mutateAsync: addPassedGame } = addPassedGameMutation();
  const { mutateAsync: addCoins } = addCoinsMutation();
  const { mutateAsync: addPoints } = addPointsMutation();
  
  const savePassedGame = async () => {
    try {
      await addPassedGame({ gamePassed: GamesEnum.WORD_SHUFFLE });
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
  const [response, setResponse] = useState<ResponseEnum | null>(null);
  const [timerRunning, setTimerRunning] = useState<boolean>(true);

  const [successPopupOpen, setSuccessPopupOpen] = useState<boolean>(false);
  const [failPopupOpen, setFailPopupOpen] = useState<boolean>(false);
  const [timeOverPopupOpen, setTimeOverPopupOpen] = useState<boolean>(false);

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

  useEffect(() => {
    if (!timerRunning && !successPopupOpen && !failPopupOpen) {
      setTimeOverPopupOpen(true);
    }
  }, [timerRunning]);

  useEffect(() => {
    if (response === ResponseEnum.FAIL) {
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
    if (!gamesPassed.includes(GAME.WORD_SHUFFLE)) {
      savePassedGame();
    } else {
      router.replace(`${DASHBOARD_URL}/${GAMES}`);
    }
  }

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
    return <Loading />
  }

  if (!gameLive) {
    return (
      <div className="px-4 flex flex-col lg:flex-row gap-5 h-[100rem] md:h-auto items-center min-h-screen w-full justify-between max-w-[80rem] mx-auto">
        <div>
          <h1 className="text-xl text-secondary font-bold">
            Game 3 - Word Shuffle
          </h1>
          <h3 className="text-secondary font-semibold text-md">Decode the terms to test your recently learnt </h3>

          <div className="pt-10">
            <span className="text-secondary font-semibold text-md">Instructions</span>
            <ul className="pl-4 list-decimal">
              <li>Simple and straighforward game</li>
              <li>You will see a term, but it is shuffled, menaing the characters are in wrong order</li>
              <li>Your jov is to recongnize the decoded term, and give it to us</li>
              <li>As a Hint a short explanation will be shown to you</li>
              <li>Do not worry about case sensitivity</li>
              <li>However Note, as terms can consist of more than one word, you will need to type spaces as well</li>
              <li>Tha's it, continue the same steps for the rest of the terms</li>
              <li>If you passed all, Congrats, you won Game 3</li>
              <li>You are ready to proceed to the next games</li>
            </ul>
          </div>

          <p className="py-10 font-semibold">Excited? Great then jump right into the game</p>
          <div className="pt-5 pb-20">
            <ButtonStandard onClick={() => setGameLive(true)} title="Start the Game" />
          </div>
        </div>

        <div className="flex justify-center items-center px-4">
          <video autoPlay controls className="rounded-lg shadow-lg w-full max-w-xl border-thirdly border-2">
            <source src={'/demos/game-3.mp4'} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    );
  }

    
  return (
    <div className="h-[140vh] md:h-auto">
      <h1 className="text-secondary text-2xl font-semibold">
        Game 3 - Word Shuffle
      </h1>

      <div className="pt-10">
        <Timer setIsRunning={setTimerRunning} seconds={TIMER_SECONDS} isRunning={timerRunning} />
      </div>

      <div className='relative md:flex flex-col pt-10 justify-start items-center min-h-[60vh]'>
        <div className="w-full max-w-[40rem] lg:max-w-[50rem]">
          <h2 className="text-center text-lg font-semibold">Question {step + 1}</h2>
          <p className='text-center text-lg text-secondary font-medium'>Can you figure this out?</p>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            onSwiper={setSwiper}
            onSlideChange={onSlideChange}
            allowTouchMove={false}
          >
            {termData.map((item, index) => (
            <SwiperSlide key={index}>
              <ShuffleWord 
                response={response}
                setResponse={setResponse} 
                term={item.term} 
                explanation={item.shortExplanation} 
              />
            </SwiperSlide>
          ))} 
          </Swiper>
        </div>

        <div>
          {response === ResponseEnum.SUCCESS
          && 
          <div className="flex flex-col items-center">
            <p className="py-3 text-2xl text-green-700 font-bold">Decoded, Very Well Done !</p>
            <ButtonStandard 
              onClick={handleNext} 
              title={step < termData.length - 1 ? "Next Question" : "Finish"}
            />
          </div>
          }
        </div>

        <section className="hidden sm:block absolute bottom-0 w-full max-w-[30rem] mx-auto">
          <div className="w-full">
            <SmallProgressBar progress={step} limit={termData.length - 1} />
          </div>
        </section>

      </div>


      <Popup isOpen={successPopupOpen}>
        <VictoryBlock 
          isOpen={successPopupOpen}
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
  )
}

export default WordShuffle;

