"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["31 - 50 Years old", "17 - 30 Years old", ">= 50 Years old"],
  datasets: [
    {
      label: "Years old",
      data: [33, 62, 10],
      backgroundColor: ["#dd841e", "#2d5f72", "#dd841e"],
      borderColor: ["#dd841e", "#2d5f72", "#dd841e"],
      borderWidth: 1,
      weight: 10,
      spacing: 10,
      borderRadius: 4,
    },
  ],
};

export const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: true,
      position: "bottom" as const,
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
  elements: {
    line: {
      tension: 0.5,
    },
  },
};

type Props = {};

function doughChart(props: Props) {
  return <Pie data={data} options={options} />;
}

export default doughChart;
