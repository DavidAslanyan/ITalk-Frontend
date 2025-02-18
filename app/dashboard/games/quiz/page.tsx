"use client";
import ButtonStandard from "@/app/components/buttons/button-standard";
import React, { useMemo, useState } from "react";
import easyTermsData from "../../../data/easy-terms.json";
import { fetchRandomTerms } from "@/app/utilities/functions/fetch-random-terms";
import QuizStep from "@/app/components/quiz-step/QuizStep";
import { useRouter } from "next/navigation";
import { DASHBOARD_URL, GAMES } from "@/app/utilities/constants/global-urls";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';


const Quiz = () => {
  const router = useRouter();
  const [gameLive, setGameLive] = useState<boolean>(true);
  const [swiper, setSwiper] = useState<any>(null);
  const [step, setStep] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const [selectedOption, setSelectedOption] = useState<string>("");
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  
  const handlePopup = () => {
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
      setPopupOpen(true);
    }
    setSelectedOption("");
  }

  const handleBack = () => {
    swiper?.slidePrev();
    setSelectedOption("");
  }
  

  if (!gameLive) {
    return (
      <div>
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
          <ButtonStandard title="Start the Game" />
        </div>
      </div>
    );
  }

  const shuffledOptions = useMemo(() => {
    const shuffled = [...randomTerms];
    const randomIndex = Math.floor(Math.random() * 3);
    shuffled.splice(randomIndex, 0, termData[step].shortExplanation);
    return shuffled;
  }, [randomTerms, termData, swiper]);


  return (
    <div className="">
      <h1>Game 1 - Quiz</h1>
      <h2>Question {step + 1}</h2>

      
      <div className="w-full max-w-[50rem]">
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
                selectOption={setSelectedOption}
                shuffledOptions={shuffledOptions}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div>
          <p>{selectedOption}</p>
        </div>

        <div className="flex justify-between mt-4 gap-4">
        <button
          disabled={step === 0}
          className={`border px-6 py-2 ${step === 0 ? "bg-thirdly" : "bg-secondary" } text-white rounded transition-all`}
          onClick={handleBack}
        >
          Back
        </button>
        
        <ButtonStandard 
          onClick={handleNext}
          title={"Next"}
          />
        </div>
      </div>


    </div>
  );
};

export default Quiz;
