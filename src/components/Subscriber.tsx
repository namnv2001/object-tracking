import { Button } from "antd";
import { mqttConstants } from "constants/mqtt";
import React from "react";
import { ISubscription } from "types";

interface ISubscriberProps {
  sub: (values: ISubscription) => void;
  unSub: (values: ISubscription) => void;
  isSubscribed: boolean;
}

const Subscriber = ({ sub, unSub, isSubscribed }: ISubscriberProps) => {
  const preset: ISubscription = {
    topic: mqttConstants.topic,
    qos: 1,
  };

  const onFinish = () => {
    isSubscribed ? unSub(preset) : sub(preset);
  };

  return (
    <Button type="primary" onClick={onFinish}>
      {isSubscribed ? "Unsubscribe" : "Subscribe"}
    </Button>
  );
};

export default Subscriber;
