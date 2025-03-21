import { COLORS } from "@/app/utilities/constants/colors";
import React from "react";

type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

const RibbonIcon = ({
  width = 28,
  height = 28,
  color = COLORS.secondary,
}: IconProps) => {
  return (
    <svg
      version="1.1"
      id="_x36_"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <g>
        <g>
          <g>
            <polygon
              points="159.071,64.597 159.071,192.664 0,192.664 4.448,187.352 54.307,128.663 0,64.597 			"
            />
            <polygon
              points="89.213,142.217 159.051,142.217 159.051,191.686 			"
            />
          </g>
          <g>
            <polygon
              points="457.693,128.663 512,192.664 352.93,192.664 352.93,64.597 512,64.597 507.22,70.24 			
				"
            />
            <polygon
              points="422.787,142.217 352.949,142.217 352.949,191.686 			"
            />
          </g>
          <rect
            x="89.693"
            width="332.614"
            height="142.539"
          />
        </g>
        <polygon
          points="457.693,128.663 512,192.664 352.93,192.664 352.93,142.539 209.793,142.539 
		352.332,0 422.307,0 422.307,64.597 512,64.597 507.22,70.24 	"
        />
      </g>
    </svg>
  );
};

export default RibbonIcon;
