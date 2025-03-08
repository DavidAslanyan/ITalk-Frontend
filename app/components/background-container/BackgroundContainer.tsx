import React from 'react';
import Image from 'next/image';

type BackgroundContainerProps = {
  imageUrl: string;
}

const BackgroundContainer: React.FC<BackgroundContainerProps> = ({ imageUrl }) => {
  return (
    <div className='w-full max-w-[50rem] h-[10rem]'>
      <Image className='w-full max-w-[50rem] h-[15rem] object-cover rounded-sm' width={800} height={120} src={imageUrl} alt='bg' />
    </div>
  )
}

export default BackgroundContainer;

