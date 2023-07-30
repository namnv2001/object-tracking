import { Button } from "antd";
import { mqttConstants } from "constants/mqtt";
import React from "react";
import { IPublishPayload } from "types";

interface IPublisherProps {
  publish: (values: IPublishPayload) => void;
}

const Publisher = ({ publish }: IPublisherProps) => {
  const onFinish = () => {
    publish({
      topic: mqttConstants.topic,
      payload: "publish message test",
      qos: 1,
    });
  };

  return (
    <Button type="primary" onClick={onFinish}>
      Publish message
    </Button>
  );
};

export default Publisher;
