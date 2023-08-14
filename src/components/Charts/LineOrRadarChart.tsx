import { Button } from "antd";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { colors } from "constants/common";
import { useMqttContext } from "context";
import { getTotalDistance, getTotalTime } from "helpers";
import React, { useMemo, useState } from "react";
import { Line, Radar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip
);

const LineChart = () => {
  const [isRadarChart, setIsRadarChart] = useState(false);
  const { storageData } = useMqttContext();

  const canSwitch = storageData.filter((i) => i.length).length > 2;

  const switchType = () => {
    canSwitch && setIsRadarChart((prev) => !prev);
  };

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
    const getBackgroundColor = (color: string) => {
      return isRadarChart
        ? color.replace("1)", "0.5)")
        : color.replace("1)", "0.8)");
    };

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
        label: "Distance (meters)",
        data: distances,
        borderColor: colors[0],
        backgroundColor: getBackgroundColor(colors[0]),
        borderWidth: 1,
      },
      {
        label: "Time (seconds)",
        data: times,
        borderColor: colors[1],
        backgroundColor: getBackgroundColor(colors[1]),
        borderWidth: 1,
      },
      {
        label: "Speed (meter per second)",
        data: speeds,
        borderColor: colors[2],
        backgroundColor: getBackgroundColor(colors[2]),
        borderWidth: 1,
      },
    ];
  }, [isRadarChart, storageData]);

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

  return (
    <>
      {canSwitch && (
        <Button className="self-start" type="primary" onClick={switchType}>
          Change chart type
        </Button>
      )}

      {isRadarChart ? (
        <Radar options={options} data={data} />
      ) : (
        <Line options={options} data={data} />
      )}
    </>
  );
};

export default LineChart;
