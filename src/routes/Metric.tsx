import LineChart from "components/Charts/LineChart";
import BubbleChart from "components/Charts/BubbleChart";
import RadarChart from "components/Charts/RadarChart";
import React from "react";

const Metric = () => {
  return (
    <div className="flex flex-col justify-between items-center w-inherit">
      <BubbleChart />
      <LineChart />
      <RadarChart />
    </div>
  );
};

export default Metric;
