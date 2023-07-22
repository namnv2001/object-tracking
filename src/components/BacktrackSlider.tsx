import { Button, Slider } from "antd";
import { useMqttContext } from "context";
import { fixDecimalPlaces } from "helpers";
import React, { useEffect, useMemo, useState } from "react";
import { ILocationData } from "types";
import InfoTooltip from "./InfoTooltip";

const BacktrackSlider = () => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(100);
  // const [backupData, setBackupData] = useState<ILocationData[]>([]);

  const {
    locationData: data,
    isSubscribed,
    handleLocationData,
    isOffline,
  } = useMqttContext();
  const backupData = [...data];

  // const canBackTracking = data.length > 1 && (!isSubscribed || isOffline);
  // useEffect(() => {
  //   !canBackTracking && setBackupData(data);
  // }, [canBackTracking, data]);

  const disableTray = data.length <= 1 || isSubscribed;

  const [minValue, maxValue] = useMemo(() => {
    if (data.length <= 1) return [0, 100];
    const start = 0;
    const end = data[data.length - 1].timestamp - data[0].timestamp;
    return [start, fixDecimalPlaces(end / 1000, 0)];
  }, [data]);

  const getPointsInRange = () => {
    const startTime = backupData[0].timestamp;
    const startRange = startTime + start * 1000;
    const endRange = startTime + end * 1000;
    return backupData.filter((item) => {
      return item.timestamp >= startRange && item.timestamp <= endRange;
    });
  };

  const handleChangeSlider = (value: [number, number]) => {
    setStart(value[0]);
    setEnd(value[1]);
    const pointsInRange = getPointsInRange();
    handleLocationData(pointsInRange, true);
  };

  const resetData = () => {
    handleLocationData(backupData, true);
  };

  return (
    <div className="flex items-center gap-4 px-4">
      <Button type="primary" onClick={resetData} disabled={disableTray}>
        Reset filter
      </Button>
      <Slider
        className="w-full"
        range
        keyboard
        step={1}
        disabled={disableTray}
        onChange={handleChangeSlider}
        value={[start, end]}
        min={minValue}
        max={maxValue}
      />
      <InfoTooltip message={"Show path during time range"} />
    </div>
  );
};

export default BacktrackSlider;
