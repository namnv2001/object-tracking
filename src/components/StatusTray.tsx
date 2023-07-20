import React from "react";
import { IStatusTray } from "types";

const StatusTray = ({
  distance,
  time,
  averageSpeed,
  currentSpeed,
}: IStatusTray) => {
  return (
    <div className="flex items-center justify-between px-4">
      <b>Distance: {distance}m</b>
      <b>Time: {time}s</b>
      <b>Average speed: {averageSpeed}m/s</b>
      <b>Current speed: {currentSpeed}m/s</b>
    </div>
  );
};

export default StatusTray;
