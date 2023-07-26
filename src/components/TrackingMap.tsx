import { useMqttContext } from "context";
import { fixDecimalPlaces, getDistantBetweenPoints } from "helpers";
import React, { useEffect, useMemo } from "react";
import LineTo from "react-lineto";
import Point from "./Point";

const TrackingMap = () => {
  const { setTotalTime, setDistance, isOffline, setCurrentSpeed, displayData } =
    useMqttContext();

  const totalDistance = useMemo(() => {
    let totalDistance = 0;
    if (displayData.length <= 1) return totalDistance;
    for (let i = 0; i < displayData.length - 1; i++) {
      totalDistance += getDistantBetweenPoints(
        displayData[i],
        displayData[i + 1]
      );
    }
    return fixDecimalPlaces(totalDistance);
  }, [displayData]);

  const totalTime = useMemo(() => {
    if (displayData.length <= 1) return 0;
    return (
      (displayData[displayData.length - 1].timestamp -
        displayData[0].timestamp) /
      1000
    );
  }, [displayData]);

  const currentSpeed = useMemo(() => {
    if (displayData.length <= 1 || isOffline) return 0;
    const before = displayData[displayData.length - 2];
    const after = displayData[displayData.length - 1];
    const time = Math.abs(after.timestamp - before.timestamp) / 1000; // seconds
    const distance = getDistantBetweenPoints(after, before); // meters

    return fixDecimalPlaces(distance / time); // m/s
  }, [displayData, isOffline]);

  useEffect(() => {
    setDistance(totalDistance);
    setTotalTime(totalTime);
    setCurrentSpeed(currentSpeed);
  }, [
    totalTime,
    currentSpeed,
    totalDistance,
    setDistance,
    setTotalTime,
    setCurrentSpeed,
  ]);

  return (
    <div className="bg-cyan-200 h-[600px] relative rounded-md">
      {displayData.map((item, index) => (
        <>
          <Point key={`point-key-${index}`} index={index} {...item} />
          <LineTo
            delay={0}
            key={`line-key-${index}`}
            from={`point-${index - 1}`}
            to={`point-${index}`}
          />
        </>
      ))}
    </div>
  );
};

export default TrackingMap;
