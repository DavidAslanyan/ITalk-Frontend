"use client";
import React, { useState } from 'react'
import { AVATARS_STORE, BACKGROUNDS_STORE, FRAMES_STORE } from './config'
import Image from 'next/image'
import { selectFrameColor } from '@/app/utilities/functions/select-frame-color';
import CoinIcon from '@/app/components/icons/CoinIcon';
import { AVATARS, BACKGROUNDS, FRAMES } from '@/app/utilities/constants/shop-items';
import SuccessIcon from '@/app/components/icons/SuccessIcon';
import { COLORS } from '@/app/utilities/constants/colors';
import Popup from '@/app/components/popup';
import ButtonSecondary from '@/app/components/buttons/button-secondary/ButtonSecondary';
import ButtonStandard from '@/app/components/buttons/button-standard';


enum ActiveTabEnum {
  AVATARS = "avatars",
  FRAMES = "frames",
  BACKGROUNDS = "backgrounds"
};

type StoreItemType = {
  title: string;
  url: string;
  price: number;
}

const Store = () => {
  const ownedAvatars = [AVATARS.male1, AVATARS.female1];
  const ownedFrames = [FRAMES.def];
  const ownedBackgrounds= [BACKGROUNDS.def];

  const [activeTab, setActiveTab] = useState<ActiveTabEnum>(ActiveTabEnum.BACKGROUNDS);
  const tabs = [
    { name: "Avatars", value: ActiveTabEnum.AVATARS },
    { name: "Frames", value: ActiveTabEnum.FRAMES },
    { name: "Backgrounds", value: ActiveTabEnum.BACKGROUNDS },
  ];

  const activeIndex = tabs.findIndex(tab => tab.value === activeTab);

  const [selectedItem, setSelectedItem] = useState<StoreItemType | null>(null);

  return (
    <div className='h-[180vh] md:h-auto relative'>
      <nav className="relative pt-20">
        <ul className="flex items-center gap-2 md:gap-5 relative">
          {tabs.map((tab) => (
            <li
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={"text-secondary text-md font-semibold cursor-pointer px-4 py-4 transition-colors duration-300"}
            >
              {tab.name}
            </li>
          ))}
        </ul>
        
        <div
          className="z-20 w-[4rem] md:w-[6rem] absolute bottom-0 h-[0.4rem] bg-secondary transition-all duration-300 rounded-full"
          style={{
            transform: `translateX(${activeIndex * 7.9}rem)`, 
          }}
        />
        <div className='z-10 left-3 absolute bottom-0 w-full max-w-[21rem] h-[0.4rem] bg-thirdly rounded-full'></div>
      </nav>
      
      <section className='w-full max-w-[60rem] py-10 flex items-center justify-center'>
        {activeTab === ActiveTabEnum.AVATARS && <AvatarsSection owned={ownedAvatars} set={setSelectedItem} />}
        {activeTab === ActiveTabEnum.FRAMES && <FramesSection owned={ownedFrames} set={setSelectedItem} />}
        {activeTab === ActiveTabEnum.BACKGROUNDS && <BackgroundsSection owned={ownedBackgrounds} set={setSelectedItem} />}
      </section>

      <Popup isOpen={selectedItem !== null}>
        {selectedItem && 
        (ownedAvatars.includes(selectedItem?.url) 
        || ownedFrames.includes(selectedItem?.url) 
        || ownedBackgrounds.includes(selectedItem?.url)) 
        ?
        <div className='flex flex-col items-center justify-center'>
          <p className='text-md font-semibold py-4'>You already own this item</p>
          {selectedItem?.url.includes("/")
          ?
          <>
          {selectedItem.url.includes("user")
          ?
          <Image className='rounded-sm object-cover' style={{width: "10rem", height: "10rem"}}  width={120} height={120} src={selectedItem.url} alt={selectedItem.title} />
          :
          <Image className='rounded-sm object-cover' style={{width: "15rem", height: "5rem"}}  width={120} height={120} src={selectedItem.url} alt={selectedItem.title} />
          }
          </>
          :
          <div className={`flex justify-center items-center w-[6rem] h-[6rem] border-[0.5rem] ${selectedItem?.url && selectFrameColor(selectedItem.url)} rounded-full bg-backPrimary`}></div>
          }
          <p className='pt-3 font-medium'>{selectedItem?.title}</p>
          <div className='flex items-center gap-1'>
            <SuccessIcon color={COLORS.primaryGreen} />
            <p className='font-medium'>Owned</p>
          </div>

          <div className='pt-10 flex w-full items-center justify-center gap-20'>
          <ButtonSecondary onClick={() => setSelectedItem(null)} title='Back'/>
        </div>
        </div>
        :
        <div className='flex flex-col items-center justify-center'>
          <p className='text-md font-semibold py-4'>Would You Like to Buy this item ?</p>
          {selectedItem?.url.includes("/")
          ?
          <>
          {selectedItem.url.includes("user")
          ?
          <Image className='rounded-sm object-cover' style={{width: "10rem", height: "10rem"}}  width={120} height={120} src={selectedItem.url} alt={selectedItem.title} />
          :
          <Image className='rounded-sm object-cover' style={{width: "15rem", height: "5rem"}}  width={120} height={120} src={selectedItem.url} alt={selectedItem.title} />
          }
          </>
          :
          <div className={`flex justify-center items-center w-[6rem] h-[6rem] border-[0.5rem] ${selectedItem?.url && selectFrameColor(selectedItem.url)} rounded-full bg-backPrimary`}></div>
          }
          <p className='pt-3 font-medium'>{selectedItem?.title}</p>
          <div className='flex items-center gap-1'>
            <CoinIcon />
            <p className='font-medium'>{selectedItem?.price}</p>
          </div>

          <div className='pt-10 flex w-full items-center justify-center gap-20'>
          <ButtonSecondary onClick={() => setSelectedItem(null)} title='Back'/>
          <ButtonStandard title='Buy Item' />
        </div>
        </div>
        }
        
      </Popup>
    </div>
  )
}

const AvatarsSection = ({ owned, set }: { owned: string[], set: (arg: StoreItemType) => void }) => {
  return (
    <ul className='flex justify-center md:justify-start items-center flex-wrap gap-16'>
      {AVATARS_STORE.map((item, index) => (
        <li onClick={() => set(item)} key={index}>
          <Image priority={true} width={120} height={120} src={item.url} alt='avatar'/>
          {owned.includes(item.url) ?
          <div className='pt-2 flex flex-col items-center'>
            <p className='font-medium'>{item.title}</p>
            <div className='flex items-center gap-1'>
              <SuccessIcon color={COLORS.primaryGreen} />
              <p className='text-secondary font-medium'>Owned</p>
            </div>
          </div>
          :
          <div className='pt-2 flex flex-col items-center'>
            <p className='font-medium'>{item.title}</p>
            <div className='flex items-center gap-1'>
              <CoinIcon />
              <p className='font-semibold'>{item.price}</p>
            </div>
          </div>
          }
        </li>
      ))}
    </ul>
  )
}

const FramesSection = ({ owned, set }: { owned: string[], set: (arg: StoreItemType) => void }) => {
  return (
    <ul className='flex justify-center md:justify-start items-center flex-wrap gap-16'>
      {FRAMES_STORE.map((item, index) => (
        <li onClick={() => set(item)} className="rounded-full flex-shrink-0 cursor-pointer" key={index}>
        <div className={`flex justify-center items-center w-[6rem] h-[6rem] border-[0.5rem] ${selectFrameColor(item.url)} rounded-full bg-backPrimary`}>
        </div>
        {owned.includes(item.url) ?
          <div className='pt-2 flex flex-col items-center'>
            <p className='font-medium'>{item.title}</p>
            <div className='flex items-center gap-1'>
              <SuccessIcon color={COLORS.primaryGreen} />
              <p className='text-secondary font-medium'>Owned</p>
            </div>
          </div>
          :
          <div className='pt-2 flex flex-col items-center'>
            <p className='font-medium'>{item.title}</p>
            <div className='flex items-center gap-1'>
              <CoinIcon />
              <p className='font-semibold'>{item.price}</p>
            </div>
          </div>
          }
      </li>
      ))}
    </ul>
  )
}

const BackgroundsSection = ({ owned, set }: { owned: string[], set: (arg: StoreItemType) => void }) => {
  return (
    <ul className='flex justify-center md:justify-start items-center flex-wrap gap-16'>
      {BACKGROUNDS_STORE.map((item, index) => (
        <li onClick={() => set(item)} key={index}>
          <Image className='w-[15rem] h-[4rem] object-cover rounded-sm' priority={true} style={{width: "15rem", height: '6rem'}} width={120} height={120} src={item.url} alt='background'/>
          {owned.includes(item.url) ?
          <div className='pt-2 flex flex-col items-center'>
            <p className='font-medium'>{item.title}</p>
            <div className='flex items-center gap-1'>
              <SuccessIcon color={COLORS.primaryGreen} />
              <p className='text-secondary font-medium'>Owned</p>
            </div>
          </div>
          :
          <div className='pt-2 flex flex-col items-center'>
            <p className='font-medium'>{item.title}</p>
            <div className='flex items-center gap-1'>
              <CoinIcon />
              <p className='font-semibold'>{item.price}</p>
            </div>
          </div>
          }
        </li>
      ))}
    </ul>
  )
}

export default Store;
