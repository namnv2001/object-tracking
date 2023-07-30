import { Button } from "antd";
import { mqttConstants } from "constants/mqtt";
import { IClientOptions } from "mqtt";
import React from "react";

interface IConnectorProps {
  connect: (url: string, options: IClientOptions) => void;
  disconnect: () => void;
  connectBtn: React.ReactNode;
}

const Connector = ({ connect, disconnect, connectBtn }: IConnectorProps) => {
  const onConnect = () => {
    const { clientId, username, password } = mqttConstants;
    const url = "ws://broker.emqx.io:8083/mqtt";
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

  const onDisconnect = () => {
    disconnect();
  };

  return (
    <div>
      <Button type="primary" onClick={onConnect}>
        {connectBtn}
      </Button>
      <Button danger disabled={connectBtn === "Connect"} onClick={onDisconnect}>
        Disconnect
      </Button>
    </div>
  );
};

export default Connector;
