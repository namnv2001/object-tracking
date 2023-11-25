import { useMqttContext } from "context";
import { convertWorkSheetArrayToLocation } from "helpers";
import { ILocationData, workSheetArray } from "types";
import { read, utils, write } from "xlsx";
const saveAs = require("file-saver");

const useXLSX = () => {
  const { updateStorageData } = useMqttContext();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      // Handle the file reading completion
      reader.onload = (event) => {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = read(data, { type: "array" });

        // Assuming there's only one sheet, read its data
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = utils.sheet_to_json(worksheet, { header: 1 });

        // Process the jsonData as needed
        const locationData = convertWorkSheetArrayToLocation(
          jsonData as workSheetArray
        );
        updateStorageData(locationData);
      };

      // Start reading the file
      reader.readAsArrayBuffer(file);
    }
  };

  // Function to export data to Excel
  const exportToExcel = (
    data: ILocationData[],
    realData: ILocationData[],
    fileName: string
  ) => {
    const worksheetData = data.map((item) => ({
      vertical: item.vertical,
      horizontal: item.horizontal,
      timestamp: item.timestamp,
    }));
    const realDataWorksheetData = realData.map((item) => ({
      vertical: item.vertical,
      horizontal: item.horizontal,
      timestamp: item.timestamp,
    }));

    const worksheet = utils.json_to_sheet(worksheetData);
    const realDataWorksheet = utils.json_to_sheet(realDataWorksheetData);
    const workbook = utils.book_new();

    utils.book_append_sheet(workbook, worksheet, "Sheet1");
    utils.book_append_sheet(workbook, realDataWorksheet, "Sheet2");

    const excelData = write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelData], { type: "application/octet-stream" });

    saveAs(blob, `${fileName}.xlsx`);
  };

  return {
    exportToExcel,
    handleFileSelect,
  };
};

export default useXLSX;
