import { Button } from "antd";
import { useMqttContext } from "context";
import useXLSX from "hooks/useXLSX";
import React from "react";

const Metric = () => {
  const { exportToExcel, handleFileSelect } = useXLSX();
  const { locationData } = useMqttContext();

  const testData = [
    {
      latitude: 10.762622,
      longitude: 106.660172,
    },
    {
      latitude: 12.19238,
      longitude: 120.6602,
    },
  ];

  const handleExport = () => {
    exportToExcel(testData);
  };

  return (
    <div className="flex justify-between items-center w-inherit">
      <input type="file" onChange={handleFileSelect} />
      <Button type="primary" onClick={handleExport}>
        Export file
      </Button>
    </div>
  );
};

export default Metric;
