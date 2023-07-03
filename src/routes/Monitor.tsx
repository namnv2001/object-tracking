import { Button, Switch } from 'antd';
import { mqttConstants } from 'constants/mqtt';
import { useMqttContext } from 'context';
import useMqtt from 'hooks';
import React, { useEffect } from 'react';

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
      payload: 'Hello world from my computer',
    });
  };
  return (
    <div>
      <Button type="primary" onClick={onClickPublishMessage}>
        Publish message
      </Button>
      <Switch checked={isSubscribed} onChange={onToggleSubscribe} />
    </div>
  );
};

export default Monitor;
