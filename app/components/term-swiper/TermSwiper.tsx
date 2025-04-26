"use client";
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Popup from '../popup';
import ButtonStandard from '../buttons/button-standard';
import { useRouter } from 'next/navigation';
import { DASHBOARD_URL, GAMES } from '@/app/utilities/constants/global-urls';
import LottieAnimation from '../lottie-animations/lottie';
import termsLearned from '@/app/components/lottie-animations/terms-learned.json';


type TermProps = {
  id: number;
  term: string;
  shortExplanation: string;
  longExplanation: string;
}

type TermSwiperProps = {
  data: TermProps[] | any;
}


const TermSwiper: React.FC<TermSwiperProps> = ({ data }) => {
  const router = useRouter();
  const [swiper, setSwiper] = useState<any>(null);
  const [step, setStep] = useState<number>(0);
  const [popupOpen, setPopupOpen] = useState<boolean>(false);

  const handlePopup = () => {
    router.push(`${DASHBOARD_URL}/${GAMES}`);
  }

  const onSlideChange = () => {
    setStep(swiper.activeIndex);
  }

  const handleNext = () => {
    if (step < data.length - 1) {
      swiper?.slideNext();
    } else {
      setPopupOpen(true);
    }
  }

  const handleBack = () => {
    swiper?.slidePrev();
  }

  
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        onSwiper={setSwiper}
        onSlideChange={onSlideChange}
      >
        {data.map((item: TermProps, index: number) => (
          <SwiperSlide key={index}>
             <div>
                <span className='text-xl font-bold text-secondary text-center flex justify-center'>Term {index + 1 }. {' '} {item.term}</span>
                <div className='my-4 h-[0.12rem] w-full mx-4 bg-gray-300 rounded-full'></div>
                <p className='text-lg font-semibold text-secondary'>
                  {item.shortExplanation}
                </p>
                <p>{item.longExplanation}</p>
                <div className='my-4 h-[0.12rem] w-full mx-4 bg-gray-300 rounded-full'></div>
             </div>
          </SwiperSlide>
        ))}

      </Swiper>

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
          title={step === data.length - 1 ? "Finish" : "Next"}
          />
      
      </div>
      
      <Popup isOpen={popupOpen} setIsOpen={setPopupOpen}>
        <div className='flex flex-col justify-center items-center pt-3'>
          <p className='text-lg text-secondary font-bold text-center'>Congrats, you learned some new terms! </p>
  
          {popupOpen &&
          <LottieAnimation data={termsLearned} loop={false} width='max-w-[20rem]' />
          }

          <p className='text-center text-md text-secondary'>Now it's time to practice to make it stick. Are you ready to test your knowledge?</p>

          <div className='flex justify-between pt-3 gap-5'>
            <button
              onClick={() => setPopupOpen(false)}
              className="text-secondary border border-secondary px-4 py-2 rounded-sm"
            >
              Close
            </button>

            <ButtonStandard 
              onClick={handlePopup} 
              title='Proceed to Games'
            />
          </div>
        </div>
      </Popup> 
    </div>
  )
}

export default TermSwiper;

