import { useMqttContext } from "context";
import {
  fixDecimalPlaces,
  getDistantBetweenPoints,
  getTotalDistance,
  getTotalTime,
} from "helpers";
import React, { useEffect, useMemo } from "react";
import LineTo from "react-lineto";
import Point from "./Point";

interface ITrackingMapProps {
  map: string;
}

const TrackingMap = ({ map }: ITrackingMapProps) => {
  const { setTotalTime, setDistance, isOffline, setCurrentSpeed, displayData } =
    useMqttContext();

  const totalDistance = useMemo(() => {
    return getTotalDistance(displayData);
  }, [displayData]);

  const totalTime = useMemo(() => {
    return getTotalTime(displayData);
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
    <div className="bg-cyan-200 relative rounded-md h-max w-max mx-auto">
      <img
        className="max-w-full max-h-[800px]"
        src={require(`images/${map}`)}
        alt="Can't display map"
      />
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
