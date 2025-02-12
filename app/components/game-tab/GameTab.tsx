"use client";
import React from "react";
import Image from "next/image";
import ButtonStandard from "../buttons/button-standard";

type GameTabProps = {
  title: string;
  url: string;
  gif: string;
  image: string;
};

const GameTab: React.FC<GameTabProps> = ({ title, url, gif, image }) => {
  return (
    <div className="group relative w-full max-w-[20rem] cursor-pointer">
      <div className="absolute top-0 left-0 w-full h-full rounded-t-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <Image
          src={gif}
          className="rounded-t-md w-full h-[12rem]"
          width={320}
          height={320}
          alt="gameGif"
        />
      </div>

      <div className="w-full rounded-t-md">
        <Image
          className="rounded-t-md w-full h-[12rem] transition-opacity duration-500 group-hover:opacity-0"
          width={320}
          height={320}
          src={image}
          alt="gameImage"
        />
      </div>

      <div className="transition-all flex justify-between items-center px-4 w-full max-w-[20rem] h-[4rem] bg-secondary rounded-b-md">
        <span className="text-white text-md font-semibold flex justify-center items-center pt-3">
          {title}
        </span>
        <div className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <ButtonStandard title="Play" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default GameTab;
