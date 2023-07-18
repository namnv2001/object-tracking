import { getDistantBetweenPoints } from "helpers";
import React, { useEffect } from "react";
import LineTo from "react-lineto";
import { ITrackingMap } from "types";
import Point from "./Point";

const TrackingMap = ({ locationData: data, setCurrentSpeed }: ITrackingMap) => {
  useEffect(() => {
    const length = data.length;
    if (length > 1) {
      const before = data[length - 2];
      const after = data[length - 1];
      const time = Math.abs(after.timestamp - before.timestamp) / 1000; // seconds
      const distance = getDistantBetweenPoints(after, before);
      setCurrentSpeed(Number((distance / time).toFixed(2))); // m/s
    }
  }, [data, data.length, setCurrentSpeed]);

  return (
    <div className="bg-cyan-200 h-[600px] relative">
      {data.map((item, index) => (
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
