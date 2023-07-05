import * as fs from "fs";
import { read, readFile, set_fs } from "xlsx";

// set_fs(fs);

const useXLSX = (path: string) => {
  const readXLSXFile = () => {
    try {
      const workbook = read(path, { type: "binary" });
      return workbook;
    } catch (e) {
      console.log("error", e);
      return {};
    }
  };

  return {
    readXLSXFile,
  };
};

export default useXLSX;
