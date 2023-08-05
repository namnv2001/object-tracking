import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import { useMqttContext } from "context";
import { getTotalDistance, getTotalTime } from "helpers";
import React from "react";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = () => {
  const { storageData } = useMqttContext();
  const datasets = storageData.map((item, index) => {
    const distance = getTotalDistance(item);
    const time = getTotalTime(item);

    return {
      label: `Label ${index + 1}`,
      data: [distance, time, distance / time || 0],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    };
  });

  const data = {
    labels: ["Distance", "Time", "Speed"],
    datasets,
  };

  return <Radar data={data} />;
};

export default RadarChart;
