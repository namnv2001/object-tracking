import { Button, Form, Switch } from "antd";
import StatusTray from "components/StatusTray";
import TrackingMap from "components/TrackingMap";
import { mqttConstants } from "constants/mqtt";
import { useMqttContext } from "context";
import { fixDecimalPlaces } from "helpers";
import useMqtt from "hooks/useMqtt";
import useXLSX from "hooks/useXLSX";
import React, { useEffect } from "react";

const Monitor = () => {
  const defaultQos = 1;
  const {
    isSubscribed,
    toggleSubscribe,
    locationData,
    locationExcelData,
    currentSpeed,
    setCurrentSpeed,
    isOffline,
    toggleOffline,
    time,
    distance,
  } = useMqttContext();
  const { subscribeTopic, publishMessage, unsubscribeTopic } = useMqtt();
  const { exportToExcel, handleFileSelect } = useXLSX();
  const { topic } = mqttConstants;

  const handleExport = () => {
    exportToExcel(locationData);
  };

  useEffect(() => {
    isSubscribed
      ? subscribeTopic({ topic, qos: defaultQos })
      : unsubscribeTopic({ topic });
  }, [isSubscribed, subscribeTopic, unsubscribeTopic, topic]);

  useEffect(() => {
    if (isSubscribed && isOffline) {
      toggleOffline();
    }
  }, [isSubscribed, isOffline, toggleOffline]);

  const onClickPublishMessage = () => {
    publishMessage({
      topic,
      payload: "Hello world from my computer",
      qos: defaultQos,
    });
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center py-6 px-4 bg-gray-200 rounded-md">
        <Button type="primary" onClick={onClickPublishMessage}>
          Publish message
        </Button>
        <Form.Item label="Offline mode" className="m-0">
          <Switch checked={isOffline} onChange={toggleOffline} />
        </Form.Item>
        <Form.Item label="Subscribe" className="m-0">
          <Switch checked={isSubscribed} onChange={toggleSubscribe} />
        </Form.Item>
        <input type="file" onChange={handleFileSelect} className="w-48" />
        <Button type="primary" onClick={handleExport}>
          Export file
        </Button>
      </div>
      <StatusTray
        distance={distance}
        time={time}
        averageSpeed={fixDecimalPlaces(distance / time) || 0}
        currentSpeed={currentSpeed}
        data={isOffline ? locationExcelData : locationData}
      />
      <TrackingMap
        locationData={isOffline ? locationExcelData : locationData}
        setCurrentSpeed={setCurrentSpeed}
      />
    </div>
  );
};

export default Monitor;
