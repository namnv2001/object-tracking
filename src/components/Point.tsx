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
      className={`absolute top-0 bottom-0 left-0 right-0 w-2 h-2 rounded-full bg-red-500 point-${index}`}
      style={{
        top: `${vertical}%`,
        left: `${horizontal}%`,
      }}
    />
  );
};

export default Point;
