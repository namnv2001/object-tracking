import { Button } from "antd";
import { useMqttContext } from "context";
import useXLSX from "hooks/useXLSX";
import React from "react";

const Metric = () => {
  const { exportToExcel, handleFileSelect } = useXLSX();
  const { locationData } = useMqttContext();

  const handleExport = () => {
    exportToExcel(locationData);
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
