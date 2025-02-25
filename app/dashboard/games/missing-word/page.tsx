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


const TIMER_SECONDS = 59;

const MissingWord = () => {
  const router = useRouter();
  const [swiper, setSwiper] = useState<any>(null);
  const [step, setStep] = useState<number>(0);
  const [response, setResponse] = useState<CheckedWordReponseEnum | null>(null);
  const [timerRunning, setTimerRunning] = useState<boolean>(true);

  const [successPopupOpen, setSuccessPopupOpen] = useState<boolean>(false);
  const [failPopupOpen, setFailPopupOpen] = useState<boolean>(false);
  const [timeOverPopupOpen, setTimeOverPopupOpen] = useState<boolean>(false);

  const data = {
    progress: 5,
  };

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
    router.push(`${DASHBOARD_URL}/${GAMES}`);
  }
    
  const termData = useMemo(
    () => easyTermsData.slice(data.progress),
    [data.progress]
  );

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

export default MissingWord;
