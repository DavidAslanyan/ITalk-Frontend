"use client";
import { DASHBOARD_URL } from '@/app/utilities/constants/global-urls';
import React from 'react'
import ProfileIcon from '../icons/navbar-icons/ProfileIcon';
import GameIcon from '../icons/navbar-icons/GameIcon';
import SearchIcon from '../icons/navbar-icons/SearchIcon';
import { COLORS } from '@/app/utilities/constants/colors';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import HomeIcon from '../icons/navbar-icons/HomeIcon';


const homeTab = {
  id: Math.random(),
  url: `${DASHBOARD_URL}`,
  icon: <HomeIcon width={36} height={36} />
}

export const tabItems = [
  {
    id: Math.random(),
    url: `${DASHBOARD_URL}/search`,
    icon: <SearchIcon width={36} height={36} />
  },
  {
    id: Math.random(),
    url: `${DASHBOARD_URL}/games`,
    icon: <GameIcon width={36} height={36} />
  },
  {
    id: Math.random(),
    url: `${DASHBOARD_URL}/profile`,
    icon: <ProfileIcon width={36} height={36} />
  }
];


const Tabbar = () => {
  const pathname: string = usePathname();
  
  const checkIsActive = (pathname: string, url: string): boolean => {
    return pathname === url || pathname.startsWith(url);
  }
    
  return (
    <div>
      <ul className='flex items-center gap-5'>
        <li 
          className='flex items-center justify-center w-16 h-16 bg-secondary rounded-full'
          key={homeTab.id}
          >
          <Link href={homeTab.url} className="flex items-center gap-2">
            {homeTab.icon && React.cloneElement(homeTab.icon, { color: pathname === homeTab.url ? COLORS.primary : COLORS.white })}
          </Link>
        </li>

        {tabItems.map(({ id, url, icon }) => (
          <li 
            className='flex items-center justify-center w-16 h-16 bg-secondary rounded-full'
            key={id}
            >
            <Link href={url} className="flex items-center gap-2">
              {icon && React.cloneElement(icon, { color: checkIsActive(pathname, url) ? COLORS.primary : COLORS.white })}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Tabbar;
