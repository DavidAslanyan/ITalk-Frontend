import { MAX_POINTS } from '@/app/utilities/constants/global-data';
import React from 'react'

type ProgressBarType = {
  progress: number;
  limit?: number;
}

const SmallProgressBar: React.FC<ProgressBarType> = ({
  progress,
  limit = MAX_POINTS
}) => {
  const progressWidth = `${Math.min((progress / limit) * 100, 100)}%`;

  return (
    <div className="relative max-w-[40rem] h-[2rem] bg-secondary rounded-lg overflow-hidden">
      <div
        className="absolute top-[0.25rem] left-[0.2rem] h-[1.5rem] bg-primary rounded-lg transition-all duration-300"
        style={{ width: progressWidth }}
      />
    </div>
  );
}

export default SmallProgressBar;
