import { setup } from "constants/common";
import { ILocationData } from "types";

export const getDistantBetweenPoints = (
  point1: ILocationData,
  point2: ILocationData
) => {
  const { width, height } = setup;

  // latitude and longitude are in percentage
  const x = ((point1.vertical - point2.vertical) * height) / 100;
  const y = ((point1.horizontal - point2.horizontal) * width) / 100;
  console.info({ x, y });
  return Math.sqrt(x * x + y * y);
};
