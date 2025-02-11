"use client";
import React, { useState, useEffect } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval); 
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center justify-center border-b-2 border-thirdly w-20 text-2xl font-bold text-secondary">
      {formatTime(time)}
    </div>
  );
};

export default Stopwatch;
