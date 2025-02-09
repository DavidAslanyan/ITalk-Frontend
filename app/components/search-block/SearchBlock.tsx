"use client";
import React, { useState } from "react";
import SearchIcon from "../icons/navbar-icons/SearchIcon";


const SearchBlock = () => {
  const [value, setValue] = useState<string>("");

  return (
    <div className="flex items-center px-3 max-w-[20rem] h-[2.5rem] bg-thirdly rounded-xl">
      <SearchIcon width={25} height={25} />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
        type="text"
        className="bg-thirdly pl-3 focus:outline-none text-base font-medium text-secondary"
      />
    </div>
  );
};

export default SearchBlock;
