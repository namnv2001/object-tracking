import { Button, Switch } from "antd";
import TrackingMap from "components/TrackingMap";
import { mqttConstants } from "constants/mqtt";
import { useMqttContext } from "context";
import useMqtt from "hooks/useMqtt";
import React, { useEffect } from "react";

const Monitor = () => {
  const { isSubscribed, toggleSubscribe, currentSpeed } = useMqttContext();
  const { subscribeTopic, publishMessage, unsubscribeTopic } = useMqtt();
  const { topic } = mqttConstants;

  const onToggleSubscribe = () => {
    toggleSubscribe();
  };

  useEffect(() => {
    isSubscribed
      ? subscribeTopic({ topic, qos: 1 })
      : unsubscribeTopic({ topic });
  }, [isSubscribed, subscribeTopic, unsubscribeTopic, topic]);

  const onClickPublishMessage = () => {
    publishMessage({
      topic,
      payload: "Hello world from my computer",
    });
  };
  return (
    <>
      <div className="mb-10 flex justify-between">
        <Button type="primary" onClick={onClickPublishMessage}>
          Publish message
        </Button>
        <Switch checked={isSubscribed} onChange={onToggleSubscribe} />
        <div>Current speed: {currentSpeed} m/s</div>
      </div>
      <TrackingMap />
    </>
  );
};

export default Monitor;
