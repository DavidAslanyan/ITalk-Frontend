import React from 'react'
import StairsIcon from '../icons/StairsIcon';
import { COLORS } from '@/app/utilities/constants/colors';

type StairsProps = {
  color?: string;
}

const Stairs: React.FC<StairsProps> = ({
  color
}) => {
  return (
    <div className='relative bg-thirdly w-[1rem] h-[11rem]'>

    </div>
  )
}

export default Stairs;

