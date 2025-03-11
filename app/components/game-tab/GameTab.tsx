"use client";
import React from "react";
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

      {completed &&
      <div className="absolute top-0 bg-green-600 w-full rounded-t-md">
        <p className="py-2 text-white text-center font-semibold text-md uppercase">Completed</p>
      </div>
      }

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
