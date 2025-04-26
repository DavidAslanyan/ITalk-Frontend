"use client";
import React from 'react'
import Image from 'next/image';
import { homeItem, menuItemsBottom, menuItemsTop } from './config';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { DASHBOARD_URL, TERMS_URL } from '@/app/utilities/constants/global-urls';
import HomeIcon from '../icons/navbar-icons/HomeIcon';
import { COLORS } from '@/app/utilities/constants/colors';
import LearnButton from '../buttons/learn-button';
import f from '../../../public/logo.png'


const LeftMenu = () => {
  const pathname: string = usePathname();

  const checkIsActive = (pathname: string, url: string): boolean => {
    return pathname === url || pathname.startsWith(url);
  }

  return (
    <div className='flex flex-col bg-secondary w-[4.2rem] xl:w-36 h-[98vh] rounded'>
      <div className='flex justify-center w-full pt-10'>
        <Image width={80} height={80} src='/logo.png' alt='logo' className='rounded-sm' />
      </div>

      <div className='hidden xl:block pl-10 pt-24'>
        <LearnButton url={`${DASHBOARD_URL}/${TERMS_URL}`} title='Study' size='small' />
      </div>

      <ul className='pt-36 xl:pt-24 pl-5 flex flex-col gap-5'>
        <li key={homeItem.id}>
          <Link href={homeItem.url} className="flex items-center gap-2">
            <HomeIcon color={pathname === DASHBOARD_URL ? COLORS.primary : COLORS.white} />
            <span
              className={`hidden xl:block ${pathname === DASHBOARD_URL ? "text-primary" : "text-white"} text-md font-medium`}
            >{homeItem.title}</span>
          </Link>
        </li>

        {menuItemsTop.map(({ id, title, url, icon }) => (
          <Link key={id} href={url} className="flex items-center gap-2">
            {icon && React.cloneElement(icon, { color: checkIsActive(pathname, url) ? COLORS.primary : COLORS.white })}
            <span
              className={`hidden xl:block ${checkIsActive(pathname, url)? `text-primary` : `text-white`} text-md font-medium`}
            >{title}</span>
          </Link>
        ))}
      </ul>

      <ul className='flex pl-5 pb-10 flex-col align-bottom h-full justify-end gap-5'>
        {menuItemsBottom.map(({ id, title, url, icon }) => (
          <Link key={id} href={url} className="flex items-center gap-2">
            {icon && React.cloneElement(icon, { color: checkIsActive(pathname, url) ? COLORS.primary : COLORS.white })}
            <span
              className={`hidden xl:block ${checkIsActive(pathname, url)? `text-primary` : `text-white`} text-md font-medium`}
            >{title}</span>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default LeftMenu;

