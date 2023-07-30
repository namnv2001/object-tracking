import { Button, Form, Switch } from "antd";
import Connector from "components/Connector";
import Publisher from "components/Publisher";
import Subscriber from "components/Subscriber";
import { useMqttContext } from "context";
import { getTime } from "date-fns";
import useXLSX from "hooks/useXLSX";
import { IClientOptions } from "mqtt";
import { MqttClient, connect } from "mqtt/dist/mqtt";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IPublishPayload, ISubscription } from "types";

type MqttMessage = {
  topic: string;
  message: string;
};

const MQTTHandler = () => {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [payload, setPayload] = useState<MqttMessage>();
  const [connectStatus, setConnectStatus] = useState("Connect");
  const {
    isSubscribed,
    displayData,
    isOffline,
    toggleOffline,
    updateBackgroundData,
    toggleSubscribe,
  } = useMqttContext();
  const { exportToExcel, handleFileSelect } = useXLSX();

  const mqttConnect = (host: string, mqttOption: IClientOptions) => {
    setConnectStatus("Connecting");
    /**
     * if protocol is "ws", connectUrl = "ws://broker.emqx.io:8083/mqtt"
     * if protocol is "wss", connectUrl = "wss://broker.emqx.io:8084/mqtt"
     *
     * /mqtt: MQTT-WebSocket uniformly uses /path as the connection path,
     * which should be specified when connecting, and the path used on EMQX is /mqtt.
     *
     * for more details about "mqtt.connect" method & options,
     * please refer to https://github.com/mqttjs/MQTT.js#mqttconnecturl-options
     */
    setClient(connect(host, mqttOption));
  };

  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        setConnectStatus("Connected");
        toast.success("Connected successfully");
      });

      client.on("error", (err) => {
        toast.error("Connection error: " + err);
        client.end();
      });

      client.on("reconnect", () => {
        setConnectStatus("Reconnecting");
      });

      client.on("message", (topic, message) => {
        const payload = { topic, message: message.toString() };
        setPayload(payload);
        console.log(`received message: ${message} from topic: ${topic}`);
      });
    }
  }, [client]);

  // set global data
  useEffect(() => {
    if (payload) {
      const [x, y] = payload.message.toString().split(",");
      const vertical = parseFloat(y);
      const horizontal = parseFloat(x);
      const timestamp = getTime(new Date()); // milliseconds
      const purifiedData = {
        vertical,
        horizontal,
        timestamp,
      };

      if (isNaN(vertical) || isNaN(horizontal)) {
        console.log("Invalid data:", payload.toString());
      } else {
        updateBackgroundData(purifiedData);
      }
    }
    // eslint-disable-next-line
  }, [payload]);

  const mqttDisconnect = () => {
    if (client) {
      try {
        client.end(false, () => {
          setConnectStatus("Connect");
          toast.success("Disconnected successfully");
        });
      } catch (error) {
        console.error("disconnect error:", error);
      }
    }
  };

  const mqttPublish = (context: IPublishPayload) => {
    if (client) {
      // topic, QoS & payload for publishing message
      const { topic, qos, payload } = context;
      client.publish(topic, payload, { qos }, (error) => {
        if (error) {
          console.error("Publish error: ", error);
          return;
        }
        toast.success("Publish successfully");
      });
    }
  };

  const mqttSub = (subscription: ISubscription) => {
    if (client) {
      // topic & QoS for MQTT subscribing
      const { topic, qos } = subscription;
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.error("Subscribe to topics error", error);
          toast.error("Subscribe to topics error");
          return;
        }
        toast.success("Subscribe to topic: " + topic);
        toggleSubscribe();
      });
    }
  };

  const mqttUnSub = (subscription: ISubscription) => {
    if (client) {
      const { topic, qos } = subscription;
      client.unsubscribe(topic, { qos }, (error) => {
        if (error) {
          console.log("Unsubscribe error", error);
          toast.error("Unsubscribe error");
          return;
        }
        toast.success("Unsubscribe topic: " + topic);
        toggleSubscribe();
      });
    }
  };

  // MQTT connection logic above
  const handleExport = () => {
    exportToExcel(displayData);
  };

  const clearDisplayMapData = () => {
    updateBackgroundData([]);
  };

  useEffect(() => {
    if (isSubscribed && isOffline) {
      toggleOffline();
      updateBackgroundData([]);
    }
  }, [isSubscribed, isOffline, toggleOffline, updateBackgroundData]);

  return (
    <div className="flex justify-between items-center py-6 px-4 bg-gray-200 rounded-md">
      <Connector
        connect={mqttConnect}
        disconnect={mqttDisconnect}
        connectBtn={connectStatus}
      />
      <Subscriber sub={mqttSub} unSub={mqttUnSub} />
      <Form.Item label="Offline mode" className="m-0">
        <Switch
          checked={isOffline}
          onChange={toggleOffline}
          disabled={isSubscribed}
        />
      </Form.Item>

      <Publisher publish={mqttPublish} />
      <Button type="primary" onClick={clearDisplayMapData}>
        Clear map
      </Button>
      <input type="file" onChange={handleFileSelect} className="w-48" />
      <Button type="primary" onClick={handleExport}>
        Export file
      </Button>
    </div>
  );
};

export default MQTTHandler;
