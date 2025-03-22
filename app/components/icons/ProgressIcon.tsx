import { COLORS } from "@/app/utilities/constants/colors";
import React from "react";

type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

const ProgressIcon = ({
  width = 28,
  height = 28,
  color = COLORS.secondary,
}: IconProps) => {
  return (
    <svg
      height={height}
      width={width}
      version="1.1"
      id="_x32_"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <g>
        <polygon
          color={color}
          points="55.176,455.098 55.176,16.574 55.176,0 0,0 0,16.574 0,455.098 0,495.426 0,512 16.07,512 55.176,512 
		480.412,512 496.484,512 496.484,455.098 480.412,455.098 	"
        />
        <polygon
        color={color}
          points="221.258,239.94 318.582,336.766 458.482,197.578 490.42,229.354 512,100.514 382.504,121.99 
		414.44,153.76 318.582,249.131 221.258,152.305 72.06,300.732 116.102,344.553 	"
        />
      </g>
    </svg>
  );
};

export default ProgressIcon;
