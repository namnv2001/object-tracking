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

  const options = {
    scales: {
      y: {
        beginAtZero: true,
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

  const datasets = storageData.map((item, index) => {
    const data = item.map((i) => {
      return { x: i.horizontal, y: i.vertical, r: getNumberOfMatches(i) };
    });

    return {
      label: `Label ${index + 1}`,
      data,
      backgroundColor: "red",
      borderColor: "red",
      borderWidth: 1,
    };
  });

  const data = {
    datasets,
  };

  return <Bubble options={options} data={data} />;
};

export default BubbleChart;
