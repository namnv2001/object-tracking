import { Button, Form, Switch } from "antd";
import TrackingMap from "components/TrackingMap";
import { mqttConstants } from "constants/mqtt";
import { useMqttContext } from "context";
import useMqtt from "hooks/useMqtt";
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
  } = useMqttContext();
  const { subscribeTopic, publishMessage, unsubscribeTopic } = useMqtt();
  const { topic } = mqttConstants;

  useEffect(() => {
    isSubscribed
      ? subscribeTopic({ topic, qos: defaultQos })
      : unsubscribeTopic({ topic });
  }, [isSubscribed, subscribeTopic, unsubscribeTopic, topic]);

  useEffect(() => {
    if (isSubscribed && isOffline) {
      toggleOffline();
    }
  }, [isSubscribed, isOffline, toggleOffline, setCurrentSpeed]);

  const onClickPublishMessage = () => {
    publishMessage({
      topic,
      payload: "Hello world from my computer",
      qos: defaultQos,
    });
  };
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <Button type="primary" onClick={onClickPublishMessage}>
          Publish message
        </Button>
        <Form.Item label="Offline mode" className="m-0">
          <Switch checked={isOffline} onChange={toggleOffline} />
        </Form.Item>
        <Form.Item label="Subscribe" className="m-0">
          <Switch checked={isSubscribed} onChange={toggleSubscribe} />
        </Form.Item>
        <div className="font-bold">Current speed: {currentSpeed} m/s</div>
      </div>
      <TrackingMap
        locationData={isOffline ? locationExcelData : locationData}
        setCurrentSpeed={setCurrentSpeed}
      />
    </>
  );
};

export default Monitor;
