import { Button, Switch } from "antd";
import TrackingMap from "components/TrackingMap";
import { mqttConstants } from "constants/mqtt";
import { useMqttContext } from "context";
import useMqtt from "hooks/useMqtt";
import React, { useEffect } from "react";

const Monitor = () => {
  const { isSubscribed, toggleSubscribe } = useMqttContext();
  const { subscribeTopic, publishMessage, unsubscribeTopic } = useMqtt();
  const { topic } = mqttConstants;

  const onToggleSubscribe = () => {
    toggleSubscribe();
  };

  useEffect(() => {
    isSubscribed ? subscribeTopic({ topic }) : unsubscribeTopic({ topic });
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
      </div>
      <TrackingMap />
    </>
  );
};

export default Monitor;
