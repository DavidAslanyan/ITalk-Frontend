import React from 'react';
import Image from 'next/image';

type FoodPlateProps = {
  step: number;
}

const foods = {
  fish: '/games/food-1.png',
  pizza: '/games/food-2.png',
  pepper: '/games/food-3.png',
  egg: '/games/food-4.png',
  cake: '/games/food-5.png',
};

const FoodPlate: React.FC<FoodPlateProps> = ({ step }) => {
  return (
    <div className="relative w-40 h-40 md:w-52 md:h-52 bg-white rounded-full shadow-2xl border-8 border-gray-300">
      <div className="absolute inset-2 bg-gray-100 rounded-full shadow-inner"></div>

      {step >= 1 && <Image className='absolute top-0' style={{width: "6rem"}} src={foods.fish} width={100} height={100} alt='food-1' priority />}
      {step >= 2 && <Image className='absolute top-0 right-0' style={{width: "7rem"}} src={foods.egg} width={80} height={100} alt='food-4' priority />}
      {step >= 3 && <Image className='absolute top-16 right-0' style={{width: "7rem"}} src={foods.pizza} width={90} height={100} alt='food-2' priority/>}
      {step >= 4 && <Image className='absolute top-14' style={{width: "6rem"}} src={foods.pepper} width={90} height={100} alt='food-3' />}
      {step >= 5 && <Image className='absolute bottom-2 left-14' style={{width: "5rem"}} src={foods.cake} width={70} height={70} alt='food-5' priority />}
    </div>
  ) 
}

export default FoodPlate;

