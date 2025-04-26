"use client";
import React, { ReactNode } from 'react';
import ArrowIcon from '../icons/ArrowIcon';


type SettingsTabProps = {
  title: string;
  icon?: ReactNode;
  onClick?: () => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({
  title,
  icon,
  onClick,
}) => {

  return (
    <button onClick={onClick} className='flex items-center justify-between w-full max-w-[45rem] h-10 bg-white rounded-md cursor-pointer'>
      <div className='ml-3 flex items-center gap-2'>
        {icon && icon}
        <p className={`${!icon && 'pl-2'} text-secondary font-medium`}>{title}</p>
      </div>
      <div className='relative right-3 -rotate-90'>
        <ArrowIcon />
      </div>
    </button>
  )
  }


export default SettingsTab;

