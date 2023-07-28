import { mqttConstants } from "constants/mqtt";
import { useMqttContext } from "context";
import { getTime } from "date-fns";
import { connect, MqttClient } from "mqtt/dist/mqtt";
import { useEffect } from "react";
import { IPublishPayload, ISubscription } from "types";

// https://dev.to/emqx/how-to-use-mqtt-in-the-react-project-177e
const useMqtt = () => {
  const { updateBackgroundData } = useMqttContext();
  let client: MqttClient | null = null;

  client = connect("ws://broker.emqx.io:8083/mqtt", {
    clientId: mqttConstants.clientId,
    username: mqttConstants.username,
    password: mqttConstants.password,
  });

  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        console.log("Connected to MQTT broker");
      });

      client.on("reconnect", () => {
        // console.log("Trying to reconnect...");
      });

      client.on("error", (error) => {
        console.error("MQTT error:", error.message);
      });

      client.on("message", (_topic, payload, _packet) => {
        const [lat, long] = payload.toString().split(",");
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
      });
    }
  }, [client, updateBackgroundData]);

  const subscribeTopic = (subscription: ISubscription) => {
    if (client) {
      const { topic, qos = 0 } = subscription;
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.error("Subscribe to topic error", error);
          return;
        }
        console.log("Subscribed to topic:", topic);
      });
    } else {
      console.log("Client not connected");
    }
  };

  const unsubscribeTopic = (subscription: ISubscription) => {
    if (client) {
      const { topic, qos } = subscription;
      client.unsubscribe(topic, { qos }, (error) => {
        if (error) {
          console.log("Unsubscribe error", error);
          return;
        }
        console.log("Unsubscribed topic:", topic);
      });
    }
  };

  const publishMessage = (publishPayload: IPublishPayload) => {
    if (client) {
      const { topic, qos, payload } = publishPayload;
      client.publish(topic, payload, { qos }, (error) => {
        if (error) {
          console.log("Publish error", error);
          return;
        }
        console.log("Published message:", payload);
      });
    }
  };

  const disconnect = () => {
    if (client?.connected) {
      try {
        client.end(false, () => {
          console.log("Disconnected successfully");
        });
      } catch (error) {
        console.log("Disconnect error:", error);
      }
    }
  };

  return {
    subscribeTopic,
    unsubscribeTopic,
    publishMessage,
    disconnect,
    // connectClient,
  };
};

export default useMqtt;
