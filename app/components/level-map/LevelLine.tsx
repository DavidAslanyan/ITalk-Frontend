import React from 'react'
import UserCircle from './UserCircle'
import World from './World';

type Leveline = {
  progress: number;
  limit: number;
  leftWorld: string;
  rightWorld: string;
  direction: "toRight" | "toLeft",
  index: number,
  levelsTotal: number,
  leftTitle: string,
  rightTitle: string
}

const LevelLine: React.FC<Leveline> = ({
  progress,
  limit,
  leftWorld,
  rightWorld,
  direction,
  index,
  levelsTotal,
  leftTitle,
  rightTitle
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
    <div className="flex justify-center items-center w-full">    
      <div>
        <World 
          passed={leftActive} 
          image={leftWorld} 
          direction={"toRight"}
          title={leftTitle}
        />
        
        {index % 2 === 1 && 
        <div className='absolute left-[3.3rem] md:left-[5.8rem]'>
          <div className={`relative w-[1rem] h-[12rem] bottom-2 ${leftActive ? "bg-primary" : "bg-thirdly"}`}>
        </div>
        </div>
        }
      </div>

      <div className='relative flex-1'>
        <div className='relative bg-thirdly h-[1.5rem]'>          
          <div 
            className={`absolute bottom-1 ${direction === "toRight" ? "left-0" : "right-0" } bg-green-400 h-[1rem]`}
            style={{ width: progressWidth }}
          />

          <div className="absolute bottom-[2rem]"
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
      </div>

      <div className='relative'>
        <World passed={rightActive} image={rightWorld} direction={"toLeft"} title={rightTitle} />

        {index % 2 === 0 && index !== levelsTotal - 1 && 
        <div className='absolute left-[3rem] md:left-[5.3rem]'>
          <div className={`relative w-[1rem] h-[12rem] bottom-1 ${rightActive ? "bg-primary" : "bg-thirdly"} `}>
        </div>
      </div>
        }
      </div>
    </div>
  )
}

export default LevelLine;

