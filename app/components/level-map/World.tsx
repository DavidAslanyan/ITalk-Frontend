import React from 'react'
import Image from 'next/image'

type WorldTypeProps = {
  passed: boolean;
  image: string;
  direction: "toRight" | "toLeft"
}

const World: React.FC<WorldTypeProps> = ({
  passed,
  image,
  direction
}) => {
  return (
    <>
    {passed
    ?
    <div className={`z-20 relative ${direction === "toRight" ? "left-1" : "right-1" } w-28 h-28 sm:w-32 sm:h-32 md:w-48 md:h-48 flex items-center bg-backPrimary border-4 border-thirdly rounded-full`}>
      <Image width={250} height={250} src={image} alt="world"/>
    </div>
    :
    <div className={`z-20 relative ${direction === "toRight" ? "left-1" : "right-1" } w-28 h-28 sm:w-32 sm:h-32 md:w-48 md:h-48 flex items-center bg-backPrimary border-4 border-thirdly rounded-full`}>
      <Image className=' opacity-10' width={250} height={250} src={image} alt="world"/>
    </div>
    }
    </>
  
  )
}

export default World;

