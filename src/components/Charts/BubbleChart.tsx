import {
  Chart as ChartJS,
  Legend,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { useMqttContext } from "context";
import React from "react";
import { Bubble } from "react-chartjs-2";
import { ILocationData } from "types";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const BubbleChart = () => {
  const { storageData } = useMqttContext();
  const colors = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(86, 255, 128, 1)",
    "rgba(255, 86, 255, 1)",
    "rgba(255, 107, 86, 1)",
    "rgba(255, 86, 86, 1)",
    "rgba(86, 255, 236, 1)",
    "rgba(86, 86, 255, 1)",
    "rgba(54, 86, 255, 1)",
  ];

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "All position of every runs",
      },
    },
  };

  const getNumberOfMatches = (data: ILocationData) => {
    const { horizontal, vertical } = data;
    const matches = storageData.filter((item) => {
      return item.some(
        (i) => i.horizontal === horizontal && i.vertical === vertical
      );
    });
    return matches.length;
  };

  const datasets = storageData
    .filter((i) => i.length)
    .map((item, index) => {
      const data = item.map((i) => {
        return { x: i.horizontal, y: i.vertical, r: getNumberOfMatches(i) };
      });

      return {
        label: `Run ${index + 1}`,
        data,
        borderColor: colors[index],
        backgroundColor: colors[index].replace("1)", "0.5)"),
        borderWidth: 1,
      };
    });

  const data = {
    datasets,
  };

  return <Bubble options={options} data={data} />;
};

export default BubbleChart;
