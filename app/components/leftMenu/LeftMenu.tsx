"use client";
import React from 'react'
import { checkItemisActive, homeItem, menuItemsBottom, menuItemsTop } from './config';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { DASHBOARD_URL } from '@/app/utilities/constants/global-urls';


const LeftMenu = () => {
  const pathname: string = usePathname();

  return (
    <div className='flex flex-col bg-secondary w-36 h-[98vh] rounded'>
      <div className='flex justify-center w-full pt-10'><h1 className='text-primary'>LOGO</h1></div>

      <ul className='pt-36 pl-10 flex flex-col gap-5'>
        <li key={homeItem.id}>
          <Link 
            className={`${pathname === DASHBOARD_URL ? "text-primary" : "text-white"} text-md font-medium`}
            href={homeItem.url}
            >{homeItem.title}</Link>
        </li>

        {menuItemsTop.map((item) => (
          <li key={item.id}>
            <Link 
              className={`${checkItemisActive(pathname, item.url)} text-md font-medium`}
              href={item.url}
              >{item.title}</Link>
          </li>
        ))}
      </ul>

      <ul className='flex pl-10 pb-10 flex-col align-bottom h-full justify-end gap-5'>
        {menuItemsBottom.map((item) => (
          <li key={item.id}>
            <Link 
              className={`${checkItemisActive(pathname, item.url)} text-md font-medium`}
              href={item.url}
              >{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LeftMenu;

