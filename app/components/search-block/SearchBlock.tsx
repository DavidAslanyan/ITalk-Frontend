"use client";
import React, { ChangeEvent, useState } from "react";
import SearchIcon from "../icons/navbar-icons/SearchIcon";

type SearchBlockProps = {
  value: string;
  setValue: (arg: string) => void;
  variant?: "small" | "large";
}


const SearchBlock: React.FC<SearchBlockProps> = ({
  value,
  setValue,
  variant = "small"
}) => {
 
  return (
    <div className={`flex items-center px-3 w-full ${variant === "small" ? "max-w-[20rem]" : "max-w-[40rem]"} h-[2.5rem] bg-thirdly rounded-xl`}>
      <SearchIcon width={25} height={25} />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
        type="text"
        className="bg-thirdly pl-3 w-full focus:outline-none text-base font-medium text-secondary"
      />
    </div>
  );
};

export default SearchBlock;
