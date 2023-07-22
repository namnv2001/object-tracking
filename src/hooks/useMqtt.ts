import { mqttConstants } from "constants/mqtt";
import { useMqttContext } from "context";
import { getTime } from "date-fns";
import { connect, MqttClient } from "mqtt/dist/mqtt";
import { IPublishPayload, ISubscription } from "types";

// tutorial: https://www.emqx.com/en/blog/mqtt-js-tutorial
const useMqtt = () => {
  const { handleLocationData } = useMqttContext();
  let client: MqttClient | null = null;
  let reconnectInterval: NodeJS.Timeout | null = null;
  const RECONNECT_TIMEOUT = 5000; // Reconnect after 5 seconds if disconnected

  const connectClient = () => {
    client = connect("ws://broker.emqx.io:8083/mqtt", {
      clientId: mqttConstants.clientId,
      username: mqttConstants.username,
      password: mqttConstants.password,
    });

    client.on("connect", () => {
      // console.log("Connected to MQTT broker");
      // Clear the reconnect interval if we are connected
      if (reconnectInterval) {
        clearInterval(reconnectInterval);
        reconnectInterval = null;
      }
    });

    client.on("reconnect", () => {
      // console.log("Trying to reconnect...");
    });

    client.on("close", () => {
      // console.log("Connection closed");
      // Attempt to reconnect when the connection is closed
      if (!reconnectInterval) {
        reconnectInterval = setInterval(connectClient, RECONNECT_TIMEOUT);
      }
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
        handleLocationData(purifiedData);
      }
    });
  };

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

  // Initial connection attempt
  connectClient();

  return {
    subscribeTopic,
    unsubscribeTopic,
    publishMessage,
    disconnect,
  };
};

export default useMqtt;
