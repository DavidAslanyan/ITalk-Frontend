import React from 'react'
import ButtonStandard from '../buttons/button-standard';
import Coins from '../lottie-animations/lottie-coins';
import LottieAnimation from '../lottie-animations/lottie';
import vicotryAnimation from "@/app/components/lottie-animations/victory.json";

type VictoryBlockProps = {
  isOpen: boolean;
  handleSuccessPopup: () => void;
  coins: number;
  points: number;
}

const VictoryBlock: React.FC<VictoryBlockProps> = ({
  isOpen,
  handleSuccessPopup,
  points,
  coins
}) => {
  return (
    <div className="relative flex flex-col items-center justify-center p-5">
      <span className="z-20 py-3 text-2xl text-green-600 font-bold">Victory</span>
      <LottieAnimation data={vicotryAnimation} width='max-w-[20rem]' />
      <p className="z-20 text-md font-medium">Congrats, you successfully passed the game!</p>
      <p className="z-20 text-md font-medium">Here are your rewards</p>

      <section className='flex items-center gap-5 py-5'>
        <div className='flex items-center'>
          <p className='font-bold text-md text-secondary'>+XP</p>
          <p className='text-secondary font-bold'>{points} points</p>
        </div>
        <div className='flex items-center'>
          {isOpen &&
          <Coins width='max-w-[2rem]' />
          }
          <p className='text-secondary font-bold'>+{coins} coins</p>
        </div>
      </section>

      <ButtonStandard onClick={handleSuccessPopup} title="Proceed to other Games"/>
    </div>
  )
}

export default VictoryBlock;

