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
      className={`absolute point-${index}`}
      style={{
        top: `${latitude}%`,
        left: `${longitude}%`,
      }}
    />
  );
};

export default Point;
