"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { COLORS } from "@/app/utilities/constants/colors";

ChartJS.register(ArcElement, Tooltip, Legend);

type ChartProps = {
  progress: number;
  limit: number;
}

const DoughnutChart: React.FC<ChartProps> = ({
  progress,
  limit
}) => {
  const data = {
    labels: ["Progress", "For Next Rang Remaining"],
    datasets: [
      {
        label: "Terms mastered",
        data: [progress, limit],
        backgroundColor: [COLORS.primary, COLORS.secondaryLight],
        hoverBackgroundColor: [COLORS.primaryDark, "#4d4c4c"],
        borderColor: COLORS.thirdly  
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="w-[12rem] h-[12rem] md:w-[18rem] md:h-[18rem]">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
