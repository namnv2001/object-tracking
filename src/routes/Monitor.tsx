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
      <button
        className="text-white p-2 rounded-sm bg-green-400"
        onClick={onClickPublishMessage}
      >
        Publish message
      </button>
      <button
        className="text-white p-2 rounded-sm bg-green-400"
        onClick={onToggleSubscribe}
      >
        {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
      </button>
    </div>
  );
};

export default Monitor;
