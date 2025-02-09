"use client";
import React from 'react'
import UserCircle from './UserCircle';
import LevelLine from './LevelLine';
import f from '../../../public/levels/level-1.png'

type LevelMapProps = {
  progress: number;
  limit: number;
}

const LevelMap: React.FC<LevelMapProps> = ({
  progress,
  limit
}) => {
  const width = Math.min((progress / limit) * 100, 100);
  const progressWidth = `${width}%`;

  const levels = [
    {
      point: 100,
      leftWorld: "/levels/level-1.png",
      rightWorld: "/levels/level-2.png",
    },
    {
      point: 100,
      leftWorld: "/levels/level-3.png",
      rightWorld: "/levels/level-4.png",
    },
    {
      point: 200,
      leftWorld: "/levels/level-5.png",
      rightWorld: "/levels/level-6.png",
    },
    {
      point: 200,
      leftWorld: "/levels/level-1.png",
      rightWorld: "/levels/level-8.png",
    },
    {
      point: 300,
      leftWorld: "/levels/level-9.png",
      rightWorld: "/levels/level-10.png",
    },
    {
      point: 300,
      leftWorld: "/levels/level-1.png",
      rightWorld: "/levels/level-2.png",
    },
    {
      point: 300,
      leftWorld: "/levels/level-1.png",
      rightWorld: "/levels/level-8.png",
    },
  ];

  const cumulativeThresholds = levels.map((sum => level => sum += level.point)(0));


  return (
    <div className="">

      <div className='relative flex flex-col gap-24 top-10'>
        

      {levels.map((level, index) => {
        const prevThreshold = index === 0 ? 0 : cumulativeThresholds[index - 1];
        const currentThreshold = cumulativeThresholds[index];

        let barProgress = 0;
        if (progress >= currentThreshold) {
          barProgress = level.point;
        } else if (progress > prevThreshold) {
          barProgress = progress - prevThreshold;
        }

        return (
          <LevelLine
            key={index}
            progress={barProgress}
            limit={level.point}
            leftWorld={level.leftWorld}
            rightWorld={level.rightWorld}
            direction={index % 2 === 0 ? "toRight" : "toLeft"}
          />
        );
      })}

      </div>

    </div>
  )
}

export default LevelMap;

