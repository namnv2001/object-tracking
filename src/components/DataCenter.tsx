import { Button, Form, Select } from "antd";
import { useMqttContext } from "context";
import useXLSX from "hooks/useXLSX";
import React from "react";

interface IDataCenterProps {
  value: string;
  options: IMapOptions[];
  onChange: (value: string) => void;
}

interface IMapOptions {
  value: string;
  label: string;
}

const DataCenter = ({ value, options, onChange }: IDataCenterProps) => {
  const { exportToExcel, handleFileSelect } = useXLSX();
  const { displayData } = useMqttContext();

  const handleExport = () => {
    exportToExcel(displayData);
  };

  return (
    <div className="flex items-center justify-between">
      <Form.Item label="Select map" className="m-0">
        <Select value={value} options={options} onChange={onChange} />
      </Form.Item>
      <Form.Item label="Import data" className="m-0">
        <input type="file" onChange={handleFileSelect} className="w-48" />
      </Form.Item>
      <Button type="primary" onClick={handleExport}>
        Export data
      </Button>
    </div>
  );
};

export default DataCenter;
