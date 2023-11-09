import {
  DownOutlined,
  LeftOutlined,
  RightOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { instructCommands, mqttConstants } from "constants/mqtt";
import React from "react";
import { IPublishPayload } from "types";

interface IInstructionModalProps {
  onConfirm: (value: IPublishPayload) => void;
}

const ObjectController = (props: IInstructionModalProps) => {
  const { onConfirm: publish } = props;

  const onPublish = (value: string) => {
    publish({
      topic: mqttConstants.topic,
      payload: value,
      qos: 1,
    });
    console.log("published message:", value, "to topic:", mqttConstants.topic);
  };

  return (
    <div className="h-40 w-40 flex flex-col items-center justify-between absolute right-0 top-24">
      <UpOutlined
        className="text-5xl hover:scale-110 transform transition-all"
        onClick={() => onPublish(instructCommands.up)}
      />
      <div className="w-full flex justify-between">
        <LeftOutlined
          className="text-5xl hover:scale-110 transform transition-all"
          onClick={() => onPublish(instructCommands.left)}
        />
        <RightOutlined
          className="text-5xl hover:scale-110 transform transition-all"
          onClick={() => onPublish(instructCommands.right)}
        />
      </div>
      <DownOutlined
        className="text-5xl hover:scale-110 transform transition-all"
        onClick={() => onPublish(instructCommands.down)}
      />
    </div>
  );
};

export default ObjectController;
