import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import ButtonStandard from '../../buttons/button-standard'
import ButtonSecondary from '../../buttons/button-secondary/ButtonSecondary'
import AvatarFrame from '../../avatar-frame'
import { selectFrameColor } from '@/app/utilities/functions/select-frame-color'
import CheckIcon from '../../icons/CheckIcon'
import { COLORS } from '@/app/utilities/constants/colors'

type FrameClosetProps = {
  avatar: string,
  frame: string,
  setFrame: (arg: string) => void,
  purchasedFrames: string[]
  setPopup: (arg: boolean) => void
}

const FrameCloset: React.FC<FrameClosetProps> = ({ avatar, frame, setFrame, purchasedFrames, setPopup }) => {
  const [curFrame, setCurFrame] = useState(frame);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true)  
  }, [])

  const handleUpdateUserFrame = () => {
    setFrame(curFrame);
    setPopup(false)
  }

  const handleCancel = () => {
    setFrame(frame);
    setCurFrame(frame);
    setPopup(false)
  }

  if (!hasMounted) {
    return null  
  }
    

  return (
    <div className="">
      <h3 className="text-secondary text-center capitalize text-xl pb-3 font-semibold">Change your Frame</h3>

      <section className="flex flex-col items-center justify-between">
        <div className='pb-5'>
          <AvatarFrame type={curFrame}>
            <Image priority width={200} height={200} src={avatar} alt="profile Frame" />
          </AvatarFrame>
        </div>

        <div className="w-full overflow-x-auto scrollbar-hidden">
          <ul className="py-5 flex items-center justify-start gap-10 overflow-x-auto whitespace-nowrap w-max min-w-full">
            {purchasedFrames.map((item, index) => (
              <li onClick={() => setCurFrame(item)} className="rounded-full flex-shrink-0 cursor-pointer" key={index}>
                <div className={`flex justify-center items-center w-[6rem] h-[6rem] border-[0.5rem] ${selectFrameColor(item)} rounded-full bg-white`}>
                  {item === curFrame && 
                    <CheckIcon width={38} height={38} color={COLORS.primaryGreen} />
                  }
                </div>
              </li>
            ))}
          </ul>
        </div>

      </section>

      <div className='flex justify-center items-center w-40 mx-auto gap-3'>
        <div className='mt-3 mx-auto w-20 h-[0.2rem] bg-thirdly rounded-full'></div>
        <p className='text-thirdly font-semibold'>Scroll</p>
        <div className='mt-3 mx-auto w-20 h-[0.2rem] bg-thirdly rounded-full'></div>
      </div>

      <section className="pt-10 flex justify-center items-center gap-4">
        <ButtonStandard onClick={handleUpdateUserFrame} title="Save" />
        <ButtonSecondary onClick={handleCancel} title="Cancel" />
      </section>
    </div>
  )
}

export default FrameCloset
