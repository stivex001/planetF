"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "top" as const,
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

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep","Oct","Nov","Dec"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [8, 19, 16, 11, 10, 17, 26, 34, 40, 48, 56, 64, 75, 89],
      borderColor: "#457182",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [14, 7, 8, 13, 17, 21, 23,27, 32, 38, 43, 47, 52, 59],
      borderColor: "#94a3b8",
      backgroundColor: "#A8C5DA",
    },
  ],
};

type Props = {};

function lineChart(props: Props) {
  return <Line options={options} data={data} />;
}

export default lineChart;
