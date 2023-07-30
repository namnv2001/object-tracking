import { Button, Form, Switch } from "antd";
import StatusTray from "components/StatusTray";
import TrackingMap from "components/TrackingMap";
import { useMqttContext } from "context";
import useXLSX from "hooks/useXLSX";
import React, { useEffect } from "react";
import MQTTHandler from "./MQTTHandler";

const Monitor = () => {
  const {
    isSubscribed,
    displayData,
    isOffline,
    toggleOffline,
    updateBackgroundData,
  } = useMqttContext();
  const { exportToExcel, handleFileSelect } = useXLSX();

  const handleExport = () => {
    exportToExcel(displayData);
  };

  const clearDisplayMapData = () => {
    updateBackgroundData([]);
  };

  useEffect(() => {
    if (isSubscribed && isOffline) {
      toggleOffline();
      updateBackgroundData([]);
    }
  }, [isSubscribed, isOffline, toggleOffline, updateBackgroundData]);

  return (
    <div className="flex flex-col gap-4">
      <MQTTHandler />
      <div className="flex justify-between items-center py-6 px-4 bg-gray-200 rounded-md">
        <Button type="primary" onClick={clearDisplayMapData}>
          Clear map
        </Button>
        <Form.Item label="Offline mode" className="m-0">
          <Switch checked={isOffline} onChange={toggleOffline} />
        </Form.Item>
        <input type="file" onChange={handleFileSelect} className="w-48" />
        <Button type="primary" onClick={handleExport}>
          Export file
        </Button>
      </div>
      <StatusTray />
      <TrackingMap />
    </div>
  );
};

export default Monitor;
