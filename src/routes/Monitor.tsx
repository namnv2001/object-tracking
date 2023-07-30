import MQTTHandler from "components/MQTTHandler";
import StatusTray from "components/StatusTray";
import TrackingMap from "components/TrackingMap";
import React from "react";

const Monitor = () => {
  return (
    <div className="flex flex-col gap-4">
      <MQTTHandler />
      <StatusTray />
      <TrackingMap />
    </div>
  );
};

export default Monitor;
