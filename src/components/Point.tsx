import React from "react";
import { ILocationData } from "types";

const Point = ({
  vertical: latitude,
  horizontal: longitude,
  index,
}: ILocationData & {
  index: number;
}) => {
  return (
    <div
      className={`w-1 h-1 bg-red-500 rounded-full absolute point-${index}`}
      style={{
        top: `${latitude}%`,
        left: `${longitude}%`,
      }}
    />
  );
};

export default Point;
