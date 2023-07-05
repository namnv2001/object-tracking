import { Button } from "antd";
import useXLSX from "hooks/useXLSX";
import React from "react";

const Metric = () => {
  const { readXLSXFile } = useXLSX("src/data/location.xlsx");

  const getExcel = () => {
    const data = readXLSXFile();
    console.log(data);
  };

  return (
    <div>
      <Button type="primary" onClick={getExcel}>
        Get excel information
      </Button>
    </div>
  );
};

export default Metric;
