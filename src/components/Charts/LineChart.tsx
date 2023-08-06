import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useMqttContext } from "context";
import { getTotalDistance, getTotalTime } from "helpers";
import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const { storageData } = useMqttContext();
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Distance, Time and Speed difference between runs",
      },
    },
  };

  const datasets = useMemo(() => {
    const distances = storageData
      .filter((i) => i.length)
      .map((item) => {
        const distance = getTotalDistance(item);
        return distance;
      });

    const times = storageData
      .filter((i) => i.length)
      .map((item) => {
        const time = getTotalTime(item);
        return time;
      });

    const speeds = storageData
      .filter((i) => i.length)
      .map((item) => {
        const distance = getTotalDistance(item);
        const time = getTotalTime(item);
        return distance / time || 0;
      });

    return [
      {
        label: "Distance",
        data: distances,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.8)",
        borderWidth: 1,
      },
      {
        label: "Time",
        data: times,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.8)",
        borderWidth: 1,
      },
      {
        label: "Speed",
        data: speeds,
        borderColor: "rgb(255,207,159)",
        backgroundColor: "rgba(255,207,159, 0.8)",
        borderWidth: 1,
      },
    ];
  }, [storageData]);

  const labels = useMemo(() => {
    return storageData
      .filter((i) => i.length)
      .map((_item, index) => {
        return `Run ${index + 1}`;
      });
  }, [storageData]);

  const data = {
    labels,
    datasets,
  };

  return <Line options={options} data={data} />;
};

export default LineChart;
