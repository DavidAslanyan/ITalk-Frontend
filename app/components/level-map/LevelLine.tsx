import React from 'react'
import UserCircle from './UserCircle'
import Image from 'next/image'
import World from './World';

type Leveline = {
  progress: number;
  limit: number;
  leftWorld: string;
  rightWorld: string;
  direction: "toRight" | "toLeft"
}

const LevelLine: React.FC<Leveline> = ({
  progress,
  limit,
  leftWorld,
  rightWorld,
  direction
}) => {
  const width = Math.min((progress / limit) * 100, 100);
  const progressWidth = `${width}%`;

  let leftActive = false;
  let rightActive = false;

  if (progress >= limit) {
    leftActive = true;
    rightActive = true;
  }

  else if (progress <= limit && direction === "toRight" && progress !== 0) {
    rightActive = false;
    leftActive = true;
  }

  else if (progress <= limit && direction === "toLeft" && progress !== 0) {
    rightActive = true;
    leftActive = false;
  }


  return (
    <div className="flex justify-center items-center max-w-[40rem] md:max-w-[60rem]">
      <World passed={leftActive} image={leftWorld} direction={"toRight"} />

      <div className='relative flex-1'>
        <div className='relative bg-thirdly h-4 max-w-[30rem] md:max-w-[40rem]'>

          <div
            className={`absolute top-[-0.5rem] ${direction === "toRight" ? "left-0" : "right-0" } h-[1.5rem] bg-primary transition-all duration-300`}
            style={{ width: progressWidth }}
          />
          
          <div 
          className={`absolute bottom-0 ${direction === "toRight" ? "left-0" : "right-0" } bg-green-400 h-[0.5rem]`}
          style={{ width: progressWidth }}
          />

          <div className="absolute top-[-1.3rem]"
            style={ direction === "toLeft" 
              ? 
              {right: `${width + 2}%`}
              : 
              {left: `${width - 2}%`}
            }
          >
            {progress < limit && progress !== 0 &&
            <UserCircle />
            }
          </div>
        </div>
        <div className='relative z-0 bg-gray-400 h-4  max-w-[30rem] md:max-w-[40rem] shadow-lg shadow-gray-400'></div>
      </div>

      <World passed={rightActive} image={rightWorld} direction={"toLeft"} />
    </div>
  )
}

export default LevelLine;

