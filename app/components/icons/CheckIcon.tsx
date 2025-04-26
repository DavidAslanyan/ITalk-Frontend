import { COLORS } from "@/app/utilities/constants/colors";
import React from "react";

type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

const CheckIcon = ({
  width = 28,
  height = 28,
  color = COLORS.secondary,
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 12.6111L8.92308 17.5L20 6.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckIcon;
