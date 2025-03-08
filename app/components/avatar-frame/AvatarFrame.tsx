import { FRAMES } from '@/app/utilities/constants/shop-items';
import { selectFrameColor } from '@/app/utilities/functions/select-frame-color';
import React, { ReactNode } from 'react'

type AvatarFrameProps = {
  type?: string;
  children: ReactNode;
}

const AvatarFrame: React.FC<AvatarFrameProps> = ({
  type = FRAMES.def,
  children
}) => {
  return (
    <div className={`w-[12rem] border-[1rem] ${selectFrameColor(type)} rounded-full flex items-center justify-center`}>
      {children}
    </div>
  )
}

export default AvatarFrame;

