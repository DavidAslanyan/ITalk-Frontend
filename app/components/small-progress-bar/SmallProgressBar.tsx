import { MAX_POINTS } from '@/app/utilities/constants/global-data';
import React from 'react'

type ProgressBarType = {
  progress?: number;
  limit?: number;
  maxWidth?: string;
}

const SmallProgressBar: React.FC<ProgressBarType> = ({
  progress = 0,
  limit = MAX_POINTS,
  maxWidth = "max-w-[40rem]"
}) => {
  const progressWidth = `${Math.min((progress / limit) * 100, 100)}%`;

  return (
    <div className={`relative px-1 w-full ${maxWidth} h-[1.9rem] bg-thirdly rounded-lg overflow-hidden flex items-center`}>
      <div
        className="h-[1.5rem] bg-primary rounded-lg transition-all duration-300"
        style={{ width: progressWidth }}
      />
    </div>
  );
}

export default SmallProgressBar;
