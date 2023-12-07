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
      className={`absolute w-1 h-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 point-${index}`}
      style={{
        top: `${vertical}%`,
        left: `${horizontal}%`,
      }}
    />
  );
};

export default Point;
