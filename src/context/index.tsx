import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IContextProps, ILocationData } from "types";

export const MQTTContext = createContext<IContextProps>({
  time: 0,
  distance: 0,
  currentSpeed: 0,
  isOffline: false,
  displayData: [],
  isSubscribed: false,
  storageData: [[]],
  setDistance: () => {},
  setTotalTime: () => {},
  toggleOffline: () => {},
  toggleSubscribe: () => {},
  setCurrentSpeed: () => {},
  updateDisplayData: () => {},
  updateStorageData: () => {},
});

export const MQTTProvider = ({ children }: PropsWithChildren) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [isOffline, setIsOffline] = useState(false);
  // display information in the map
  const [displayData, setDisplayData] = useState<ILocationData[]>([]);
  // data storage for metric
  const [storageData, setStorageData] = useState<ILocationData[][]>([[]]);

  useEffect(() => {
    if (!isSubscribed && isOffline && storageData.length) {
      updateDisplayData(storageData[storageData.length - 1]);
    }
  }, [isOffline, isSubscribed, storageData]);

  // push online data to storage when unsubscribe
  useEffect(() => {
    if (!isSubscribed && displayData.length) {
      updateStorageData(displayData);
    }
  }, [isSubscribed]);

  const toggleSubscribe = () => {
    setIsSubscribed((value) => !value);
  };

  const toggleOffline = () => {
    setIsOffline((value) => !value);
  };

  const updateDisplayData = (data: ILocationData | ILocationData[]) => {
    Array.isArray(data)
      ? setDisplayData(data)
      : setDisplayData((value) => [...value, data]);
  };

  const updateStorageData = (data: ILocationData[]) => {
    setStorageData((prev) => [...prev, data]);
  };

  const setTotalTime = (value: number) => {
    setTime(value);
  };

  return (
    <MQTTContext.Provider
      value={{
        time,
        distance,
        isOffline,
        isSubscribed,
        displayData,
        storageData,
        currentSpeed,
        setDistance,
        setTotalTime,
        toggleOffline,
        toggleSubscribe,
        setCurrentSpeed,
        updateDisplayData,
        updateStorageData,
      }}
    >
      {children}
    </MQTTContext.Provider>
  );
};

export const useMqttContext = () => {
  const context = useContext(MQTTContext);
  return context;
};
