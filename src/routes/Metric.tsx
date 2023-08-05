import BarChart from "components/Charts/BarChart";
import BubbleChart from "components/Charts/BubbleChart";
import RadarChart from "components/Charts/RadarChart";
import React from "react";

const Metric = () => {
  return (
    <div className="flex flex-col justify-between items-center w-inherit">
      <BarChart />
      <RadarChart />
      <BubbleChart />
    </div>
  );
};

export default Metric;
