import { Card } from "antd";
import BacktrackSlider from "components/BacktrackSlider";
import MQTTHandler from "components/MQTTHandler";
import TrackingMap from "components/TrackingMap";
import { useMqttContext } from "context";
import { fixDecimalPlaces } from "helpers";
import React, { useMemo, useState } from "react";

const Monitor = () => {
  const [activeTab, setActiveTab] = useState("action_center");
  const { distance, time, currentSpeed } = useMqttContext();

  const averageSpeed = useMemo(
    () => fixDecimalPlaces(distance / time) || 0,
    [distance, time]
  );

  const onTabChange = (key: string) => {
    setActiveTab(key);
  };

  const tabList = [
    {
      key: "action_center",
      label: "Action center",
    },
    {
      key: "backtrack",
      label: "Backtracking",
    },
  ];

  const content: Record<string, JSX.Element> = {
    action_center: <MQTTHandler />,
    backtrack: <BacktrackSlider />,
  };

  return (
    <div className="flex flex-col gap-4">
      <Card
        tabList={tabList}
        onTabChange={onTabChange}
        activeTabKey={activeTab}
      >
        {content[activeTab]}
      </Card>
      <div className="flex items-center justify-between px-4">
        <b>Distance: {distance}m</b>
        <b>Time: {time}s</b>
        <b>Average speed: {averageSpeed}m/s</b>
        <b>Current speed: {currentSpeed}m/s</b>
      </div>
      <TrackingMap />
    </div>
  );
};

export default Monitor;
