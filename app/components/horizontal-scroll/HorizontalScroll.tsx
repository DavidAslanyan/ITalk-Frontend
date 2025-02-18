"use client";
import React, { ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';


type HorizontalScrollTypeProps = {
  step: number;
  setStep: (n: number) => void;
  swiper: any;
  setSwiper: any;
  onSlideChange: any;
  numberOfSlides: number;
  children: ReactNode;
}

const HorizontalScroll: React.FC<HorizontalScrollTypeProps> = ({
  step,
  setStep,
  swiper,
  setSwiper,
  onSlideChange,
  numberOfSlides,
  children
}) => {


  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        onSwiper={setSwiper}
        onSlideChange={onSlideChange}
      >
        {children}
        {/* {Array.from({ length: numberOfSlides }, (_, index) => (
          <SwiperSlide key={index}>
            <>{children}</>
          </SwiperSlide>
        ))} */}
      </Swiper>
    </div>
  )
}

export default HorizontalScroll;

