import React from 'react';
import Image from 'next/image';

type BackgroundContainerProps = {
  imageUrl: string;
}

const BackgroundContainer: React.FC<BackgroundContainerProps> = ({ imageUrl }) => {
  return (
    <div className='w-full max-w-[50rem] h-[15rem]'>
      <Image className='w-full max-w-[50rem] h-[12rem] md:h-[19rem] object-cover rounded-t-md' width={800} height={120} src={imageUrl} alt='bg' priority />
    </div>
  )
}

export default BackgroundContainer;

