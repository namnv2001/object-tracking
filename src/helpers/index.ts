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
    vertical: item[0],
    horizontal: item[1],
    timestamp: item[2],
  }));
};

export const fixDecimalPlaces = (number: number) => {
  return Number(number.toFixed(decimalPlaces));
};
