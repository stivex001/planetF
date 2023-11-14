"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["United States", "Canada", "Other", "Mexico"],
  datasets: [
    {
      label: "# of Votes",
      data: [38.6, 22.5, 8.1, 30.8],
      backgroundColor: ["#1C1C1C", "#05CE91", "#B1E3FF", "#95A4FC"],
      borderColor: ["#1C1C1C", "#05CE91", "#B1E3FF", "#95A4FC"],
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
      position: "right" as const,
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
  return <Doughnut data={data} options={options} />;
}

export default doughChart;
