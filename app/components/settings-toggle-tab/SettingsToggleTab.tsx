"use client";
import React, { ReactNode } from 'react';
import SwitchCustom from '../switch-custom';


type SettingsTabProps = {
  title: string;
  icon?: ReactNode;
  enabled: boolean;
  setEnabled: (arg: boolean) => void;
}

const SettingsToggleTab: React.FC<SettingsTabProps> = ({
  title,
  icon,
  enabled,
  setEnabled
}) => {

  return (
    <div className='pr-2 flex items-center justify-between w-full max-w-[40rem] h-10 bg-white rounded-md cursor-pointer'>
      <div className='ml-3 flex items-center gap-2'>
        {icon && icon}
        <p>{title}</p>
      </div>
      <SwitchCustom enabled={enabled} setEnabled={setEnabled} />
    </div>
  )
  }


export default SettingsToggleTab;

