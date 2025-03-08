import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import ButtonStandard from '../../buttons/button-standard'
import ButtonSecondary from '../../buttons/button-secondary/ButtonSecondary'

type AvatarClosetProps = {
  avatar: string,
  setAvatar: (arg: string) => void,
  purchasedAvatars: string[]
  setPopup: (arg: boolean) => void
}

const AvatarCloset: React.FC<AvatarClosetProps> = ({ avatar, setAvatar, purchasedAvatars, setPopup }) => {
  const [curAvatar, setCurAvatar] = useState(avatar);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true)  
  }, [])

  const handleUpdateUserAvatar = () => {
    setAvatar(curAvatar);
    setPopup(false)
  }

  const handleCancel = () => {
    setAvatar(avatar);
    setCurAvatar(avatar);
    setPopup(false)
  }

  if (!hasMounted) {
    return null  
  }

  return (
    <div className="">
      <h3 className="text-secondary text-center capitalize text-xl pb-3 font-semibold">Change your avatar</h3>

      <section className="flex flex-col items-center justify-between">
        <div className='pb-5'>
          <Image priority width={200} height={200} src={curAvatar} alt="profile avatar" />
        </div>

        <div className="w-full overflow-x-auto scrollbar-hidden">
          <ul className="py-5 flex items-center justify-start gap-5 overflow-x-auto whitespace-nowrap w-max min-w-full">
            {purchasedAvatars.map((item, index) => (
              <li onClick={() => setCurAvatar(item)} className="rounded-full flex-shrink-0 cursor-pointer transition-all" key={index}>
                <Image 
                  className={`${item === curAvatar && "border-4 border-green-500 rounded-full"}`}
                  priority 
                  width={100} 
                  height={100} 
                  src={item} 
                  alt="profile avatar" 
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
        <ButtonStandard onClick={handleUpdateUserAvatar} title="Save" />
        <ButtonSecondary onClick={handleCancel} title="Cancel" />
      </section>
    </div>
  )
}

export default AvatarCloset
