import { Button, Form, Switch } from "antd";
import Connector from "components/Connector";
import Subscriber from "components/Subscriber";
import { useMqttContext } from "context";
import { getTime } from "date-fns";
import { IClientOptions } from "mqtt";
import { MqttClient, connect } from "mqtt/dist/mqtt";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IPublishPayload, ISubscription } from "types";
import InstructionModal from "./InstructionModal";

type MqttMessage = {
  topic: string;
  message: string;
};

const MQTTHandler = () => {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [payload, setPayload] = useState<MqttMessage>();
  const [connectStatus, setConnectStatus] = useState<
    "Connect" | "Connecting" | "Connected" | "Reconnecting"
  >("Connect");
  const [showModal, setShowModal] = useState(false);
  const {
    isSubscribed,
    isOffline,
    toggleOffline,
    updateBackgroundData,
    toggleSubscribe,
  } = useMqttContext();

  const mqttConnect = (host: string, mqttOption: IClientOptions) => {
    setConnectStatus("Connecting");
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
    if (!payload) return;
    if (payload.message === "require_manual_control") {
      handleRequestManualControl();
      return;
    }

    // normal route
    const [x, y] = payload.message.split(",");
    const vertical = parseFloat(y);
    const horizontal = parseFloat(x);
    const timestamp = Math.floor(getTime(new Date()) / 1000); // seconds
    console.log(timestamp);
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
    // eslint-disable-next-line
  }, [payload]);

  const handleRequestManualControl = () => {
    setShowModal(true);
  };

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
        toggleSubscribe(true);
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
        toggleSubscribe(false);
      });
    }
  };

  // MQTT connection logic above
  const clearDisplayMapData = () => {
    updateBackgroundData([]);
  };

  // Turn off offline mode when subscribe topic
  useEffect(() => {
    if (isSubscribed && isOffline) {
      toggleOffline(false);
      updateBackgroundData([]);
    }
  }, [isSubscribed, isOffline, toggleOffline, updateBackgroundData]);

  return (
    <div className="flex justify-between items-center">
      <Connector
        connect={mqttConnect}
        disconnect={() => {
          toggleSubscribe(false);
          mqttDisconnect();
        }}
        connectStatus={connectStatus}
      />
      <Subscriber
        disabled={connectStatus === "Connect"}
        sub={mqttSub}
        unSub={mqttUnSub}
        value={isSubscribed}
      />
      <Form.Item label="Offline mode" className="m-0">
        <Switch
          checked={isOffline}
          onChange={toggleOffline}
          disabled={isSubscribed}
        />
      </Form.Item>
      <Button type="primary" onClick={clearDisplayMapData}>
        Clear map
      </Button>
      <InstructionModal
        showModal={showModal}
        setShowModal={setShowModal}
        onConfirm={mqttPublish}
      />
    </div>
  );
};

export default MQTTHandler;
