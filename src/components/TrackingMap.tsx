import React from "react";
import { ILocationData } from "types";

const Point = ({
  latitude,
  longitude,
}: Pick<ILocationData, "latitude" | "longitude">) => {
  return (
    <div
      className="w-2 h-2 bg-red-500 rounded-full absolute"
      style={{
        top: `${latitude}%`,
        left: `${longitude}%`,
      }}
    />
  );
};

const data = [
  {
    latitude: 50,
    longitude: 50,
  },
  {
    latitude: 100,
    longitude: 100,
  },
  {
    latitude: 0,
    longitude: 0,
  },
  {
    latitude: 0,
    longitude: 100,
  },
  {
    latitude: 100,
    longitude: 0,
  },
];

const TrackingMap = () => {
  return (
    <div className="bg-cyan-200 h-[1000px] relative">
      {data.map((item, index) => (
        <Point key={index} {...item} />
      ))}
    </div>
  );
};

export default TrackingMap;
