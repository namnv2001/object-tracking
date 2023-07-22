import { Slider } from "antd";
import { useMqttContext } from "context";
import { fixDecimalPlaces } from "helpers";
import React, { useMemo, useState } from "react";
import InfoTooltip from "./InfoTooltip";

const BacktrackSlider = () => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(100);

  const { locationData: data } = useMqttContext();

  const [minValue, maxValue] = useMemo(() => {
    if (data.length <= 1) return [0, 100];
    const start = 0;
    const end = data[data.length - 1].timestamp - data[0].timestamp;
    return [start, fixDecimalPlaces(end / 1000, 0)];
  }, [data]);

  const handleChangeSlider = (value: [number, number]) => {
    setStart(value[0]);
    setEnd(value[1]);
  };

  return (
    <div className="flex items-center gap-4">
      <Slider
        className="w-full"
        range
        keyboard
        step={1}
        onChange={handleChangeSlider}
        value={[start, end]}
        min={minValue}
        max={maxValue}
      />
      <InfoTooltip message={"Drag to show the path during the time"} />
    </div>
  );
};

export default BacktrackSlider;
