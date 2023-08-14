import BubbleChart from "components/Charts/BubbleChart";
import LineChart from "components/Charts/LineOrRadarChart";
import { useMqttContext } from "context";
import React from "react";

const Metric = () => {
  const { storageData } = useMqttContext();

  const length = storageData.filter((i) => i.length).length;

  return (
    <div className="flex flex-col justify-between items-center w-inherit">
      <BubbleChart />
      {length > 1 && <LineChart />}
    </div>
  );
};

export default Metric;
