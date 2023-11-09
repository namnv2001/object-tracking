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
      className={`absolute point-${index}`}
      style={{
        top: `${vertical}%`,
        left: `${horizontal}%`,
      }}
    />
  );
};

export default Point;
