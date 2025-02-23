"use client";
import React, { useMemo, useState } from "react";
import easyTermsData from "../../../data/easy-terms.json";
import { fetchRandomTerms } from "@/app/utilities/functions/fetch-random-terms";
import MissingWordStep from "@/app/components/missing-word-step";
import { CheckedWordReponseEnum } from "@/app/components/missing-word-step/MissingWordStep";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';


const MissingWord = () => {
  const [swiper, setSwiper] = useState<any>(null);
  const [step, setStep] = useState<number>(0);
  const [response, setResponse] = useState<CheckedWordReponseEnum | null>(null);

  const [successPopupOpen, setSuccessPopupOpen] = useState<boolean>(false);
  const [failPopupOpen, setFailPopupOpen] = useState<boolean>(false);
  const [timeOverPopupOpen, setTimeOverPopupOpen] = useState<boolean>(false);

  const data = {
    progress: 5,
  };

  const termData = useMemo(
    () => easyTermsData.slice(data.progress),
    [data.progress]
  );

  const onSlideChange = () => {
    setStep(swiper.activeIndex);
  };
  console.log(termData)

  return (
    <div className="h-[140vh] md:h-auto">
      <h1 className="text-secondary text-2xl font-semibold">
        Game 2 - Missing Word
      </h1>

      <div  className="md:flex pt-3 justify-center items-center">
        <div className="w-full max-w-[40rem] lg:max-w-[50rem]">
          <h2 className="text-center text-lg font-semibold">Question {step + 1}</h2>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={10}
              slidesPerView={1}
              onSwiper={setSwiper}
              onSlideChange={onSlideChange}
              // allowTouchMove={false}
            >
              {termData.map((term, index) => (
                <SwiperSlide key={index}>
                  <MissingWordStep
                    response={response}
                    setResponse={setResponse}
                    term={term.term}
                    explanation={term.shortExplanation}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
      
        </div>

      <p>Result: {response}</p>
    </div>
  );
};

export default MissingWord;
