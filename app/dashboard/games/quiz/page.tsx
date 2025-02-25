"use client";
import ButtonStandard from "@/app/components/buttons/button-standard";
import React, { useEffect, useMemo, useState } from "react";
import easyTermsData from "../../../data/easy-terms.json";
import { fetchRandomTerms } from "@/app/utilities/functions/fetch-random-terms";
import QuizStep from "@/app/components/quiz-step/QuizStep";
import { useRouter } from "next/navigation";
import { DASHBOARD_URL, GAMES, TERMS_URL } from "@/app/utilities/constants/global-urls";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import { QuizButtonForm } from "@/app/components/buttons/button-quiz-step/ButtonQuizStep";
import Popup from "@/app/components/popup";
import SmallProgressBar from "@/app/components/small-progress-bar/SmallProgressBar";
import Timer from "@/app/components/timer";


const TIMER_SECONDS = 45;

const Quiz = () => {
  const router = useRouter();
  const [gameLive, setGameLive] = useState<boolean>(false);

  const [swiper, setSwiper] = useState<any>(null);
  const [step, setStep] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [timerRunning, setTimerRunning] = useState<boolean>(true);

  const [successPopupOpen, setSuccessPopupOpen] = useState<boolean>(false);
  const [failPopupOpen, setFailPopupOpen] = useState<boolean>(false);
  const [timeOverPopupOpen, setTimeOverPopupOpen] = useState<boolean>(false);
  const [response, setResponse] = useState<QuizButtonForm | "">("");

  useEffect(() => {
    if (!timerRunning && !successPopupOpen && !failPopupOpen) {
      setTimeOverPopupOpen(true);
    }
  }, [timerRunning]);
  
  useEffect(() => {
    if (response === QuizButtonForm.ERROR) {
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

  const data = {
    progress: 5,
  };

  const termData = useMemo(() => easyTermsData.slice(data.progress), [data.progress]);
  const randomTerms = useMemo(() => fetchRandomTerms(3).map((term) => term.shortExplanation), [swiper, step]);

  const onSlideChange = () => {
    setStep(swiper.activeIndex);
  }

  const handleNext = () => {
    if (step <= randomTerms.length) {
      swiper?.slideNext();
    } else {
      setTimerRunning(false);
      setSuccessPopupOpen(true);
    }
    setSelectedOption("");
    setResponse("");
  }

  const handleSelect = (option: string) => {
    if (selectedOption === "") {
      setSelectedOption(option);
    }
  }

  const shuffledOptions = useMemo(() => {
    let uniqueRandomTerms = new Set<string>();
  
    while (uniqueRandomTerms.size < 3) {
      const term = fetchRandomTerms(1)[0].shortExplanation;
      if (term !== termData[step].shortExplanation) {
        uniqueRandomTerms.add(term);
      }
    }
  
    const options = [...uniqueRandomTerms];
    const randomIndex = Math.floor(Math.random() * (options.length + 1));
  
    options.splice(randomIndex, 0, termData[step].shortExplanation);
  
    return options;
  }, [termData, step]);

  if (!gameLive) {
    return (
      <div className="px-4">
        <h1>Game 1 - Quiz</h1>
        <h3>Take a quiz to test your recently learnt terms</h3>

        <div className="pt-10">
          <span>Instructions</span>
          <ul className=" list-decimal">
            <li>Simple and straighforward quiz</li>
            <li>One of the learned terms will be shown to you</li>
            <li>
              Below the term, you will see a list of explanations for the term
            </li>
            <li>
              You will have to select the right explanation to move forward
            </li>
            <li>Tha's it, continue the same steps for the rest of the terms</li>
            <li>If you passed all, Congrats, you won Game-1</li>
            <li>You are ready to proceed to the next games</li>
          </ul>
        </div>

        <p className="pt-10">Excited? Great then jump right into the game</p>
        <div>
          <ButtonStandard onClick={() => setGameLive(true)} title="Start the Game" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-[140vh] md:h-auto">
      <h1 className="text-secondary text-2xl font-semibold">Game 1 - Quiz</h1>

      <div className="pt-10">
        <Timer setIsRunning={setTimerRunning} seconds={TIMER_SECONDS} isRunning={timerRunning} />
      </div>
      
      <div className="md:flex pt-3 justify-center items-center">
        <div className="w-full max-w-[40rem] lg:max-w-[50rem]">
          <h2 className="text-center text-lg font-semibold">Question {step + 1}</h2>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            onSwiper={setSwiper}
            onSlideChange={onSlideChange}
            allowTouchMove={false}
          >
            {termData.map((item ,index) => (
              <SwiperSlide key={index}>
                <QuizStep
                  term={item.term}
                  answer={item.shortExplanation}
                  selectedOption={selectedOption}
                  selectOption={handleSelect}
                  shuffledOptions={shuffledOptions}
                  setResponse={setResponse}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex flex-col items-center justify-center gap-3">
            {response === QuizButtonForm.SUCCESS ?
            <span className="pt-3 text-xl text-green-700 font-semibold">Correct, well done !</span>
            : <span className="pt-3 text-xl">Select the right option</span>
            }

            <div className="pt-3">
              <ButtonStandard 
                disabled={selectedOption === ""}
                onClick={handleNext}
                title={step <= randomTerms.length ? "Next Question" : "Finish"}
              />
            </div>
          </div>

          <section className="w-full max-w-[30rem] mx-auto pt-10">
            <div className="w-full">
              <SmallProgressBar progress={step} limit={randomTerms.length + 1} />
            </div>
          </section>

        
        </div>
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

export default Quiz;
