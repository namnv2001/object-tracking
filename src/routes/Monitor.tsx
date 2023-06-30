import useMqtt from 'hooks';
import { mqttConstants } from 'constants/mqtt';
import React, { useEffect, useState } from 'react';

const Monitor = () => {
  const [isSubscribed, setIsSubscribed] = useState(true);
  const { subscribeTopic, publishMessage, unsubscribeTopic } = useMqtt();
  const { topic } = mqttConstants;

  const obSubscribe = () => {
    setIsSubscribed((value) => !value);
  };

  useEffect(() => {
    isSubscribed ? subscribeTopic({ topic }) : unsubscribeTopic({ topic });
  }, [isSubscribed, subscribeTopic, unsubscribeTopic, topic]);

  const onPublish = () => {
    publishMessage({
      topic,
      payload: 'Hello world from my computer',
    });
  };
  return (
    <div>
      <button
        className="text-white p-2 rounded-sm bg-green-400"
        onClick={onPublish}
      >
        Publish message
      </button>
      <button
        className="text-white p-2 rounded-sm bg-green-400"
        onClick={obSubscribe}
      >
        Subscribe
      </button>
    </div>
  );
};

export default Monitor;
