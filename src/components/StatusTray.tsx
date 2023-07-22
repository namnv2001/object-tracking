import React from "react";
import { IStatusTray } from "types";
import BacktrackSlider from "./BacktrackSlider";

const StatusTray = ({
  distance,
  time,
  averageSpeed,
  currentSpeed,
  data,
}: IStatusTray) => {
  return (
    <>
      <div className="flex items-center justify-between px-4">
        <b>Distance: {distance}m</b>
        <b>Time: {time}s</b>
        <b>Average speed: {averageSpeed}m/s</b>
        <b>Current speed: {currentSpeed}m/s</b>
      </div>
      <BacktrackSlider data={data} />
    </>
  );
};

export default StatusTray;
