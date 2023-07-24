import { useMqttContext } from "context";
import { useEffect, useMemo, useState } from "react";

const useBacktracking = () => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(100);

  const { isSubscribed, updateDisplayData, storageData } = useMqttContext();

  const data = storageData[storageData.length - 1];
  const disableTray = data.length <= 1 || isSubscribed;

  const [minValue, maxValue] = useMemo(() => {
    if (data.length <= 1) return [0, 100];
    const start = 0;
    const end = data[data.length - 1].timestamp - data[0].timestamp;
    // only round up end value so actual value can always in range
    return [start, Math.ceil(end / 1000)];
  }, [data]);

  const pointsInRange = useMemo(() => {
    if (data.length <= 1) return data;

    const startTime = data[0].timestamp;
    const startRange = startTime + start * 1000;
    const endRange = startTime + end * 1000;
    return data.filter(
      (item) => item.timestamp >= startRange && item.timestamp <= endRange
    );
  }, [data, end, start]);

  // show data in range
  useEffect(() => {
    !isSubscribed && updateDisplayData(pointsInRange);
  }, [pointsInRange, updateDisplayData, isSubscribed]);

  const handleChangeSlider = (value: [number, number]) => {
    setStart(value[0]);
    setEnd(value[1]);
  };

  const resetData = () => {
    updateDisplayData(data);
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
