import React from "react";
import { ILocationData } from "types";

const Point = ({
  vertical,
  horizontal,
  index,
}: ILocationData & {
  index: number;
}) => {
  return (
    <div
      className={`absolute w-4 h-4 rounded-full bg-red-500 point-${index}`}
      style={{
        top: `${vertical}%`,
        left: `${horizontal}%`,
      }}
    />
  );
};

export default Point;
