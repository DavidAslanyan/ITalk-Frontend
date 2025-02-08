import React from 'react'
import Image from 'next/image'
import ArrowIcon from '../icons/ArrowIcon';
import { COLORS } from '@/app/utilities/constants/colors';
import DropdownMenu from '../dropdown-menu';
import SettingsIcon from '../icons/profile-icons/SettingsIcon';
import HistoryIcon from '../icons/profile-icons/HistoryIcon';
import PolicyIcon from '../icons/navbar-icons/PolicyIcon';
import HelpIcon from '../icons/navbar-icons/HelpIcon';


const profileData = {
  avatarURL: "/user-avatars/male-1.png",
  username: "David Aslanyan"
}

const LETTER_LIMIT = 14;

const menuItems = [
  {
    icon: <SettingsIcon height={25} />,
    title: "Settings"
  },
  {
    icon: <HistoryIcon height={21} />,
    title: "History"
  },
  {
    icon: <PolicyIcon height={25} />,
    title: "Policy"
  },
  {
    icon: <HelpIcon height={23} />,
    title: "Help"
  }
];

const UserTabs = () => {
  return (
    <>
    <div className='hidden md:flex items-center gap-2'>
      <div className='border-2 border-thirdly rounded-full'>
      <Image width={40} height={40} src={profileData.avatarURL} alt='prfile avatar' />
      </div>

      <DropdownMenu
        menuButton={
          <div className='bg-secondary pl-5 pr-3 py-2 rounded-full flex items-center gap-1'>
            <span className='text-white font-semibold text-base'>
              {profileData.username.length > LETTER_LIMIT ? `${profileData.username.substring(0, LETTER_LIMIT)}...` : profileData.username }
            </span>
            <ArrowIcon color={COLORS.white} />
          </div>
        }
        menuItems={menuItems}
       />
    </div>

    <div className='z-50'>
      <DropdownMenu
        menuButton={
          <div className='md:hidden flex items-center bg-secondary pr-2 py-1 pl-1 rounded-full'>
            <div className='border-2 border-thirdly rounded-full'>
            <Image width={40} height={40} src={profileData.avatarURL} alt='prfile avatar' />
            </div>
            <ArrowIcon color={COLORS.white} />
          </div>
        }
        menuItems={menuItems}
       />
    </div>
    </>

  )
}

export default UserTabs;

