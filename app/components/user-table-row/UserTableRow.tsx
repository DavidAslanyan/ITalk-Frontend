import React from 'react'
import Image from 'next/image';
import AvatarFrame from '../avatar-frame';
import { selectFrameColor } from '@/app/utilities/functions/select-frame-color';

type UserTableRowItem = {
  firstName: string,
  lastName: string,
  avatar: string,
  frame: string,
  email: string,
  points: number,
  difficulyLevel: string,
  progress: number
}

type UserTableRowProps = {
  data: UserTableRowItem;
  id: number
}

const MAX_LENGTH = 25;

const UserTableRow: React.FC<UserTableRowProps> = ({ data, id }) => {
  const {
    firstName,
    lastName,
    avatar,
    frame,
    email,
    points,
    difficulyLevel,
    progress
  } = data;


  return (
    <div className='flex justify-between items-center border border-thirdly rounded-lg px-4 py-2'>
      <div className='flex items-center gap-3 w-full max-w-[20rem]'>
        <span className='text-secondary text-md font-medium'>{id}</span>
        <div className={`flex justify-center items-center w-[3rem] h-[3rem] border-[0.3rem] ${selectFrameColor(frame)} rounded-full bg-white`}>
          <Image
            width={50}
            height={50}
            src={avatar}
            alt="profile avatar"
          />
        </div>
        <p className='text-secondary text-md font-medium'>{firstName?.substring(0, 10)} {lastName?.substring(0, 10)}</p>
      </div>

      <div className='flex items-center justify-around gap-3 w-full max-w-[20rem]'>
        <p className='hidden md:block text-secondary text-md font-medium'>{email?.substring(0, MAX_LENGTH)}</p>
        <p className='text-secondary text-md font-medium'>{points}</p>
        <p className='text-secondary text-md font-medium'>{progress}</p>
      </div>

      <div className='w-full flex items-end justify-end max-w-[5rem] '>
        <p className='text-secondary text-md font-medium'>{difficulyLevel}</p>
      </div>
    </div>
  )
}

export default UserTableRow;
