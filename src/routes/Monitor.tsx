import { Card } from "antd";
import BacktrackSlider from "components/BacktrackSlider";
import DataCenter from "components/DataCenter";
import MQTTHandler from "components/MQTTHandler";
import TrackingMap from "components/TrackingMap";
import { useMqttContext } from "context";
import { fixDecimalPlaces } from "helpers";
import React, { useMemo, useState } from "react";

const Monitor = () => {
  const [activeTab, setActiveTab] = useState("action_center");
  const [map, setMap] = useState("maze_1.png");
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
    {
      key: "data_center",
      label: "Data center",
    },
  ];

  const mapOptions = [
    {
      value: "maze_1.png",
      label: "Map 1",
    },
    {
      value: "maze_2.png",
      label: "Map 2",
    },
  ];

  const content: Record<string, JSX.Element> = {
    action_center: <MQTTHandler />,
    backtrack: <BacktrackSlider />,
    data_center: (
      <DataCenter value={map} options={mapOptions} onChange={setMap} />
    ),
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
      <TrackingMap map={map} />
    </div>
  );
};

export default Monitor;
