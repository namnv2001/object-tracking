import { Form, Switch } from "antd";
import { mqttConstants } from "constants/mqtt";
import { IClientOptions } from "mqtt";
import React, { useState } from "react";

interface IConnectorProps {
  connect: (url: string, options: IClientOptions) => void;
  disconnect: () => void;
  connectStatus: React.ReactNode;
}

const Connector = ({ connect, disconnect, connectStatus }: IConnectorProps) => {
  const [isConnect, setIsConnect] = useState(false);
  const onConnect = () => {
    const { clientId, username, password } = mqttConstants;
    const url = "ws://emqx@127.0.0.1:8083/mqtt";
    const options = {
      clientId,
      username,
      password,
      clean: true,
      reconnectPeriod: 1000, // ms
      connectTimeout: 30 * 1000, // ms
    };
    connect(url, options);
  };

  const onChange = () => {
    if (isConnect) {
      disconnect();
      setIsConnect(false);
    } else {
      onConnect();
      setIsConnect(true);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Form.Item label={connectStatus} className="m-0">
        <Switch checked={isConnect} onChange={onChange} />
      </Form.Item>
    </div>
  );
};

export default Connector;
