import { useMqttContext } from "context";
import React from "react";
import LineTo from "react-lineto";
import Point from "./Point";

const TrackingMap = () => {
  const { locationData } = useMqttContext();

  return (
    <div className="bg-cyan-200 h-[800px] relative">
      {locationData.map((item, index) => (
        <>
          <Point key={index} index={index} {...item} />
          <LineTo
            delay={0}
            key={index}
            from={`point-${index - 1}`}
            to={`point-${index}`}
          />
        </>
      ))}
    </div>
  );
};

export default TrackingMap;
