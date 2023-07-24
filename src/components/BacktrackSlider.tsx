import { Button, Slider } from "antd";
import useBacktracking from "hooks/useBacktracking";
import React from "react";
import InfoTooltip from "./InfoTooltip";

const BacktrackSlider = () => {
  const {
    end,
    start,
    maxValue,
    minValue,
    resetData,
    disableTray,
    handleChangeSlider,
  } = useBacktracking();

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
