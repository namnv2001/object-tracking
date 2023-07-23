import { Button, Slider } from "antd";
import { useMqttContext } from "context";
import React, { useEffect, useMemo, useState } from "react";
import InfoTooltip from "./InfoTooltip";

const BacktrackSlider = () => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(100);

  const { isSubscribed, isOffline, handleLocationData, locationExcelData } =
    useMqttContext();

  const data = locationExcelData[locationExcelData.length - 1];
  const neutralMode = !isSubscribed && !isOffline;
  const disableTray = data.length <= 1 || isSubscribed || neutralMode;

  const [minValue, maxValue] = useMemo(() => {
    if (data.length <= 1) return [0, 100];
    const start = 0;
    const end = data[data.length - 1].timestamp - data[0].timestamp;
    // only round up end value so actual value can always in range
    return [start, Math.ceil(end / 1000)];
  }, [data]);

  const pointsInRange = useMemo(() => {
    if (neutralMode) return [];
    if (data.length <= 1) return data;

    const startTime = data[0].timestamp;
    const startRange = startTime + start * 1000;
    const endRange = startTime + end * 1000;
    return data.filter(
      (item) => item.timestamp >= startRange && item.timestamp <= endRange
    );
  }, [data, end, neutralMode, start]);

  // show data in range
  useEffect(() => {
    handleLocationData(pointsInRange);
  }, [pointsInRange, handleLocationData]);

  const handleChangeSlider = (value: [number, number]) => {
    setStart(value[0]);
    setEnd(value[1]);
  };

  const resetData = () => {
    handleLocationData(data);
    // reset slider
    setStart(minValue);
    setEnd(maxValue);
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
