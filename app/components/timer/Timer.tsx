import { COLORS } from "@/app/utilities/constants/colors";
import React, { useState, useEffect } from "react";

interface TimerProps {
  seconds: number;
  isRunning: boolean;
  setIsRunning: (arg: boolean) => void;
}

const Timer: React.FC<TimerProps> = ({ seconds, isRunning, setIsRunning }) => {
  const [time, setTime] = useState<number>(seconds);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, time]);

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progress = (time / seconds) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width="150" height="150" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke={COLORS.secondary}
          strokeWidth="6"
          fill="transparent"
          opacity="0.2"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke={COLORS.secondary}
          strokeWidth="6"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
          className="transition-all duration-1000 ease-linear"
        />
        <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill={COLORS.secondary} fontSize="20">
          {time}s
        </text>
      </svg>
    </div>
  );
};

export default Timer;
