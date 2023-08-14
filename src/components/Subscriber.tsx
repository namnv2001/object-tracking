import { Form, Switch } from "antd";
import { mqttConstants } from "constants/mqtt";
import { useMqttContext } from "context";
import React from "react";
import { ISubscription } from "types";

interface ISubscriberProps {
  sub: (values: ISubscription) => void;
  unSub: (values: ISubscription) => void;
  disabled: boolean;
  value: boolean;
}

const Subscriber = ({ sub, unSub, disabled, value }: ISubscriberProps) => {
  const { isSubscribed } = useMqttContext();
  const preset: ISubscription = {
    topic: mqttConstants.topic,
    qos: 1,
  };

  const onFinish = () => {
    isSubscribed ? unSub(preset) : sub(preset);
  };

  return (
    <Form.Item className="mb-0" label="Subscribe topic">
      <Switch onChange={onFinish} disabled={disabled} checked={value} />
    </Form.Item>
  );
};

export default Subscriber;
