import { useMqttContext } from "context";
import { fixDecimalPlaces } from "helpers";
import React, { useMemo } from "react";
import BacktrackSlider from "./BacktrackSlider";

const StatusTray = () => {
  const { distance, time, currentSpeed } = useMqttContext();

  const averageSpeed = useMemo(
    () => fixDecimalPlaces(distance / time) || 0,
    [distance, time]
  );

  return (
    <>
      <div className="flex items-center justify-between px-4">
        <b>Distance: {distance}m</b>
        <b>Time: {time}s</b>
        <b>Average speed: {averageSpeed}m/s</b>
        <b>Current speed: {currentSpeed}m/s</b>
      </div>
      <BacktrackSlider />
    </>
  );
};

export default StatusTray;
