import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import ButtonStandard from '../../buttons/button-standard'
import ButtonSecondary from '../../buttons/button-secondary/ButtonSecondary'


type BackgroundClosetProps = {
  background: string,
  setBackground: (arg: string) => void,
  purchasedBackgrounds: string[]
  setPopup: (arg: boolean) => void
}

const BackgroundCloset: React.FC<BackgroundClosetProps> = ({ background, setBackground, purchasedBackgrounds, setPopup }) => {
  const [curBackground, setCurBackground] = useState(background);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true)  
  }, [])

  const handleUpdateUserFrame = () => {
    setBackground(curBackground);
    setPopup(false)
  }

  const handleCancel = () => {
    setBackground(background);
    setCurBackground(background);
    setPopup(false)
  }

  if (!hasMounted) {
    return null  
  }
    

  return (
    <div className="">
      <h3 className="text-secondary text-center capitalize text-xl pb-3 font-semibold">Change your background</h3>

      <section className="flex flex-col items-center justify-between">
        <div className='pb-5'>
          <Image className='w-[18rem] h-[8rem] object-cover rounded-sm' priority width={200} height={200} src={curBackground} alt="profile Frame" />
        </div>

        <div className="w-full overflow-x-auto scrollbar-hidden">
          <ul className="py-5 flex items-center justify-start gap-10 overflow-x-auto whitespace-nowrap w-max min-w-full">
            {purchasedBackgrounds.map((item, index) => (
              <li onClick={() => setCurBackground(item)} className="flex-shrink-0 cursor-pointer transition-all" key={index}>
                <Image 
                  className={`${item === curBackground && "border-4 border-green-600"} object-cover w-[10rem] h-[5rem] rounded-sm`}
                  priority 
                  width={100} 
                  height={100} 
                  src={item} 
                  alt="profile background" 
                />
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

export default BackgroundCloset;

