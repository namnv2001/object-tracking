import { Button, Select, Slider } from "antd";
import useBacktracking from "hooks/useBacktracking";
import React, { useState } from "react";
import InfoTooltip from "./InfoTooltip";

const BacktrackSlider = () => {
  const [step, setStep] = useState(1);
  const {
    end,
    start,
    maxValue,
    minValue,
    resetData,
    disableTray,
    handleChangeSlider,
  } = useBacktracking(step);

  const options = [
    { value: 1000, label: "Miliseconds" },
    { value: 100, label: "Centiseconds" },
    { value: 10, label: "Deciseconds" },
    { value: 1, label: "Seconds" },
  ];

  return (
    <div className="flex items-center gap-4">
      <Button type="primary" onClick={resetData} disabled={disableTray}>
        Reset filter
      </Button>
      <Select
        options={options}
        placeholder="Filter option"
        className="w-44"
        value={step}
        onChange={(value) => setStep(value)}
        disabled={disableTray}
      />
      <Slider
        className="w-full m-0"
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
