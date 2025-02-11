"use client";
import { COLORS } from "@/app/utilities/constants/colors";
import { useRouter } from "next/navigation";
import React, { ButtonHTMLAttributes, forwardRef } from "react";
import TriangleIcon from "../../icons/TriangleIcon";

type LearnButtonProps = {
  title: string;
  url: string;
  size?: "small" | "large" | "medium";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const LearnButton = forwardRef<HTMLButtonElement, LearnButtonProps>(
  ({ title, url, size = "large", className, ...props }, ref) => {
    const router = useRouter();

    let width, height, top, left;

    if (size === "small") {
      width = 75;
      height = 75;
      top = "top-[2rem]";
      left = "left-[1rem]";
    } else if (size === "medium" ) {
      width = 100;
      height = 100;
      top = "top-[2.5rem]";
      left = "left-[1.2rem]";
    } else {
      width = 150;
      height = 150;
      top = "top-[4.2rem]";
      left = "left-[2.5rem]";
    }

    return (
      <div className="relative">
        <div className="absolute top-0 transform rotate-45">
            <TriangleIcon width={width} height={height} color={COLORS.primary} />
          </div>
        <button
          onClick={() => router.push(url)}
          ref={ref}
          className={`${size === "small" ? "text-sm" : "text-lg"} text-secondary font-bold ${className}`}
          aria-label={title}
          {...props}
        >
          <span className={`absolute ${top} ${left}`}>{title}</span>
        </button>
      </div>
    );
  }
);

export default LearnButton;
