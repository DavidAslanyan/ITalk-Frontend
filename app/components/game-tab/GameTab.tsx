"use client";
import React, { useRef } from "react";
import Image from "next/image";
import ButtonStandard from "../buttons/button-standard";
import { useRouter } from "next/navigation";

type GameTabProps = {
  title: string;
  url: string;
  gif: string;
  image: string;
  completed: boolean;
};

const GameTab: React.FC<GameTabProps> = ({ title, url, gif, image, completed }) => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.style.opacity = "1";
      videoRef.current.style.visibility = "visible";
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.style.opacity = "0";
      videoRef.current.style.visibility = "hidden";
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      className="group relative w-[20rem] cursor-pointer border-2 rounded-md border-thirdly"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video 
        ref={videoRef}
        width="420"
        height="250"
        muted
        loop
        className="absolute top-0 left-0 w-full h-[12rem] rounded-t-md opacity-0 invisible transition-opacity duration-500"
      >
        <source src={gif} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Image
        className="rounded-t-md w-full h-[12rem] transition-opacity duration-500 group-hover:opacity-0 object-contain"
        width={320}
        height={192}
        src={image}
        alt="gameImage"
      />

      {completed && (
        <div className="absolute top-0 bg-green-600 w-full rounded-t-md">
          <p className="py-2 text-white text-center font-semibold text-md uppercase">Completed</p>
        </div>
      )}

      <div className="transition-all flex justify-between items-center px-4 w-full max-w-[20rem] h-[4rem] bg-secondary rounded-b-md">
        <span className="text-white text-md font-semibold flex justify-center items-center pt-3">
          {title}
        </span>
        <div className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <ButtonStandard title="Play" onClick={() => router.push(url)} />
        </div>
      </div>
    </div>
  );
};

export default GameTab;
