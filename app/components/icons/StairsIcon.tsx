import { COLORS } from "@/app/utilities/constants/colors";
import React from "react";

type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

const StairsIcon = ({
  width = 60,
  height = 60,
  color = COLORS.secondary,
}: IconProps) => {
  return (
    <svg
      fill="#000000"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      id="stairs"
      data-name="Flat Color"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="secondary"
        fill={color}
        d="M16,19H8a1,1,0,0,1,0-2h8a1,1,0,0,1,0,2Zm0-4H8a1,1,0,0,1,0-2h8a1,1,0,0,1,0,2Zm0-4H8A1,1,0,0,1,8,9h8a1,1,0,0,1,0,2Zm0-4H8A1,1,0,0,1,8,5h8a1,1,0,0,1,0,2Z"
      ></path>
      <path
        id="primary"
        fill={COLORS.thirdly}
        d="M16,22a1,1,0,0,1-1-1V3a1,1,0,0,1,2,0V21A1,1,0,0,1,16,22ZM8,22a1,1,0,0,1-1-1V3A1,1,0,0,1,9,3V21A1,1,0,0,1,8,22Z"
      ></path>
    </svg>
  );
};

export default StairsIcon;
