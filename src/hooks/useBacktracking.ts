import { useMqttContext } from "context";
import { useEffect, useMemo, useState } from "react";

const useBacktracking = (step: number) => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(100);

  const { isSubscribed, updateDisplayData, backgroundData } = useMqttContext();

  const disableTray = backgroundData.length <= 1 || isSubscribed;

  const [minValue, maxValue] = useMemo(() => {
    if (backgroundData.length <= 1) return [0, 100];
    const start = 0;
    const end =
      backgroundData[backgroundData.length - 1].timestamp -
      backgroundData[0].timestamp;
    return [start, end * step];
  }, [backgroundData, step]);

  const pointsInRange = useMemo(() => {
    if (backgroundData.length <= 1) return backgroundData;

    const startTime = backgroundData[0].timestamp;
    // only floor end value so actual value can always in range
    const startRange = startTime + Math.floor(start / step);
    const endRange = startTime + Math.floor(end / step);
    return backgroundData.filter(
      (item) => item.timestamp >= startRange && item.timestamp <= endRange
    );
  }, [backgroundData, end, start, step]);

  useEffect(() => {
    setStart(minValue);
    setEnd(maxValue);
  }, [minValue, maxValue]);

  // show data in range
  useEffect(() => {
    if (!isSubscribed) {
      updateDisplayData(pointsInRange);
    }
  }, [pointsInRange, updateDisplayData, isSubscribed]);

  useEffect(() => {
    if (!backgroundData.length) {
      setStart(0);
      setEnd(100);
    }
  }, [backgroundData]);

  const handleChangeSlider = (value: [number, number]) => {
    setStart(value[0]);
    setEnd(value[1]);
  };

  const resetData = () => {
    updateDisplayData(backgroundData);
    // reset slider
    setStart(minValue);
    setEnd(maxValue);
  };

  return {
    end,
    start,
    maxValue,
    minValue,
    resetData,
    disableTray,
    handleChangeSlider,
  };
};

export default useBacktracking;
