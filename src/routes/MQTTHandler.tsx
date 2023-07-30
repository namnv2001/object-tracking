import Connector from "components/Connector";
import Publisher from "components/Publisher";
import Subscriber from "components/Subscriber";
import { useMqttContext } from "context";
import { getTime } from "date-fns";
import { IClientOptions } from "mqtt";
import { MqttClient, connect } from "mqtt/dist/mqtt";
import React, { useEffect, useState } from "react";
import { IPublishPayload, ISubscription } from "types";

type MqttMessage = {
  topic: string;
  message: string;
};

const MQTTHandler = () => {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [isSubed, setIsSub] = useState(false);
  const [payload, setPayload] = useState<MqttMessage>();
  const [connectStatus, setConnectStatus] = useState("Connect");
  const { updateBackgroundData } = useMqttContext();

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
        console.log("connection successful");
      });

      client.on("error", (err) => {
        console.error("Connection error: ", err);
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
      const [lat, long] = payload.message.toString().split(",");
      const vertical = parseFloat(lat);
      const horizontal = parseFloat(long);
      const timestamp = getTime(new Date()); // milliseconds
      const purifiedData = {
        vertical,
        horizontal,
        timestamp,
      };
      console.log(purifiedData);

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
          console.log("disconnected successfully");
        });
      } catch (error) {
        console.log("disconnect error:", error);
      }
    }
  };

  const mqttPublish = (context: IPublishPayload) => {
    if (client) {
      // topic, QoS & payload for publishing message
      const { topic, qos, payload } = context;
      client.publish(topic, payload, { qos }, (error) => {
        if (error) {
          console.log("Publish error: ", error);
        }
      });
    }
  };

  const mqttSub = (subscription: ISubscription) => {
    if (client) {
      // topic & QoS for MQTT subscribing
      const { topic, qos } = subscription;
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log("Subscribe to topics error", error);
          return;
        }
        console.log(`Subscribe to topics: ${topic}`);
        setIsSub(true);
      });
    }
  };

  const mqttUnSub = (subscription: ISubscription) => {
    if (client) {
      const { topic, qos } = subscription;
      client.unsubscribe(topic, { qos }, (error) => {
        if (error) {
          console.log("Unsubscribe error", error);
          return;
        }
        console.log(`unsubscribed topic: ${topic}`);
        setIsSub(false);
      });
    }
  };

  return (
    <div className="flex justify-between items-center">
      <Connector
        connect={mqttConnect}
        disconnect={mqttDisconnect}
        connectBtn={connectStatus}
      />
      <Subscriber sub={mqttSub} unSub={mqttUnSub} isSubscribed={isSubed} />
      <Publisher publish={mqttPublish} />
    </div>
  );
};

export default MQTTHandler;
