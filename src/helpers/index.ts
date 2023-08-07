import { decimalPlaces, setup } from "constants/common";
import { ILocationData, workSheetArray } from "types";

export const getDistantBetweenPoints = (
  point1: ILocationData,
  point2: ILocationData
) => {
  const { width, height } = setup;

  // latitude and longitude are in percentage
  const x = ((point1.vertical - point2.vertical) * height) / 100;
  const y = ((point1.horizontal - point2.horizontal) * width) / 100;
  return fixDecimalPlaces(Math.sqrt(x * x + y * y));
};

export const convertWorkSheetArrayToLocation = (worksheet: workSheetArray) => {
  worksheet.shift(); // remove the first row
  return worksheet.map((item) => ({
    horizontal: item[0],
    vertical: item[1],
    timestamp: item[2],
  }));
};

export const fixDecimalPlaces = (number: number, decimal?: number) => {
  return Number(
    number.toFixed(decimal !== undefined ? decimal : decimalPlaces)
  );
};

export const getTotalDistance = (data: ILocationData[]) => {
  let totalDistance = 0;
  if (data.length <= 1) return totalDistance;
  for (let i = 1; i < data.length; i++) {
    totalDistance += getDistantBetweenPoints(data[i - 1], data[i]);
  }
  return fixDecimalPlaces(totalDistance);
};

export const getTotalTime = (data: ILocationData[]) => {
  if (data.length <= 1) return 0;
  return (data[data.length - 1].timestamp - data[0].timestamp) / 1000;
};
