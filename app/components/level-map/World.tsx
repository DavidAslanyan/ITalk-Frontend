import React from 'react'
import Image from 'next/image'
import RibbonIcon from '../icons/RibbonIcon';

type WorldTypeProps = {
  passed: boolean;
  image: string;
  direction: "toRight" | "toLeft"
  title: string;
}

const World: React.FC<WorldTypeProps> = ({
  passed,
  image,
  direction,
  title
}) => {
  return (
    <>
    {passed
    ?
    <div className={`z-20 relative ${direction === "toRight" ? "left-1" : "right-1" } w-28 h-28 sm:w-32 sm:h-32 md:w-48 md:h-48 flex items-center bg-backPrimary border-4 border-primary rounded-full`}>
      <p className='z-10 absolute top-1 md:top-[1.5rem] left-1 md:left-[1.8rem] text-xs md:text-base text-white bg-primary font-semibold px-2 md:px-4 rounded-sm'>COMPLETED</p>
      <Image priority={true} width={250} height={250} src={image} alt="world"/>
      <p className={`bg-secondary text-white text-xs md:text-base font-semibold w-full max-w-[6rem] md:max-w-[7rem] rounded-sm text-center absolute bottom-2 md:bottom-5 left-[0.3rem] md:left-[2.4rem]`}>{title}</p>
    </div>
    :
    <div className={`z-20 relative ${direction === "toRight" ? "left-1" : "right-1" } w-28 h-28 sm:w-32 sm:h-32 md:w-48 md:h-48 flex items-center bg-backPrimary border-4 border-thirdly rounded-full`}>
      <Image priority={true} className=' opacity-10' width={250} height={250} src={image} alt="world"/>
      <p className={`bg-gray-300 text-white text-xs md:text-base w-full max-w-[6rem] md:max-w-[7rem] rounded-sm text-center absolute bottom-2 md:bottom-5 left-[0.3rem] md:left-[2.4rem]`}>{title}</p>
    </div>
    }
    </>
  
  )
}

export default World;

