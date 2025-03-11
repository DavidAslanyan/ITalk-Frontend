import React from 'react'
import ButtonStandard from '../buttons/button-standard';
import SuccessAnimation from '../lottie-animations/lottie-success';
import Coins from '../lottie-animations/lottie-coins';

type VictoryBlockProps = {
  handleSuccessPopup: () => void;
  coins: number;
  points: number;
}

const VictoryBlock: React.FC<VictoryBlockProps> = ({
  handleSuccessPopup,
  points,
  coins
}) => {
  return (
    <div className="relative flex flex-col items-center justify-center p-5">
      <span className="z-20 py-3 text-2xl text-green-600 font-bold">Victory</span>
      <p className="z-20 text-md font-medium">Congrats, you successfully passed the game!</p>
      <p className="z-20 text-md font-medium">Here are your rewards</p>

      <section className='flex items-center gap-5 py-5'>
        <div className='flex items-center'>
          <Coins width='max-w-[2rem]' />
          <p className='text-secondary font-bold'>+{points} points</p>
        </div>
        <div className='flex items-center'>
          <Coins width='max-w-[2rem]' />
          <p className='text-secondary font-bold'>+{coins} coins</p>
        </div>
      </section>

      {/* <div className="z-0 absolute left-0 top-0">
        <SuccessAnimation />
      </div>
      <div className="z-0 absolute right-0 top-0">
        <SuccessAnimation />
      </div> */}
      <ButtonStandard onClick={handleSuccessPopup} title="Proceed to other Games"/>
    </div>
  )
}

export default VictoryBlock;

