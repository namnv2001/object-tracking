import { setup } from "constants/common";
import { ILocationData } from "types";

export const getDistantBetweenPoints = (
  point1: ILocationData,
  point2: ILocationData
) => {
  const { width, height } = setup;

  // latitude and longitude are in percentage
  const x = ((point1.latitude - point2.latitude) * width) / 100;
  const y = ((point1.longitude - point2.longitude) * height) / 100;
  return Math.sqrt(x * x + y * y);
};
