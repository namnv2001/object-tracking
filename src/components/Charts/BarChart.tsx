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
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const { storageData } = useMqttContext();
  const options = {
    responsive: true,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const datasets = useMemo(() => {
    return storageData
      .filter((i) => i.length)
      .map((item, index) => {
        const distance = getTotalDistance(item);
        const time = getTotalTime(item);

        return {
          label: `Label ${index + 1}`,
          data: [distance, time, distance / time || 0],
        };
      });
  }, [storageData]);

  const data = {
    labels: ["Distance", "Time", "Speed"],
    datasets,
  };

  return <Bar options={options} data={data} />;
};

export default BarChart;
