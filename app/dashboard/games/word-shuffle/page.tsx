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


const TIMER_SECONDS = 120;

const WordShuffle = () => {
  const router = useRouter();
  const data = {
    progress: 5,
  };

  const [gameLive, setGameLive] = useState<boolean>(false);
  const [swiper, setSwiper] = useState<any>(null);
  const [step, setStep] = useState<number>(0);
  const [response, setResponse] = useState<ResponseEnum | null>(null);
  const [timerRunning, setTimerRunning] = useState<boolean>(true);

  const [successPopupOpen, setSuccessPopupOpen] = useState<boolean>(false);
  const [failPopupOpen, setFailPopupOpen] = useState<boolean>(false);
  const [timeOverPopupOpen, setTimeOverPopupOpen] = useState<boolean>(false);

  const termData = useMemo(
    () => easyTermsData.slice(data.progress),
    [data.progress]
  );

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
    router.push(`${DASHBOARD_URL}/${GAMES}`);
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
  )
}

export default WordShuffle;

