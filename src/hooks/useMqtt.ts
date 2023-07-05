import { mqttConstants } from "constants/mqtt";
import { useMqttContext } from "context";
import { connect } from "mqtt/dist/mqtt";
import { IPublishPayload, ISubscription } from "types";

// tutorial: https://www.emqx.com/en/blog/mqtt-js-tutorial
const useMqtt = () => {
  const { handleLocationData } = useMqttContext();
  const client = connect("ws://broker.emqx.io:8083/mqtt", {
    clientId: mqttConstants.clientId,
    username: mqttConstants.username,
    password: mqttConstants.password,
  });

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
    if (client.connected) {
      try {
        client.end(false, () => {
          console.log("disconnected successfully");
        });
      } catch (error) {
        console.log("disconnect error:", error);
      }
    }
  };

  client.on("message", (_topic, payload, _packet) => {
    const [lat, long] = payload.toString().split(",");
    const latitude = parseFloat(lat);
    const longitude = parseFloat(long);
    const purifyData = {
      latitude,
      longitude,
    };

    if (isNaN(latitude) || isNaN(longitude)) {
      console.log("Invalid data:", payload.toString());
    } else handleLocationData(purifyData);
  });

  return {
    subscribeTopic,
    unsubscribeTopic,
    publishMessage,
    disconnect,
  };
};

export default useMqtt;
