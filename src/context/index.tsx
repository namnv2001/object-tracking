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
  backgroundData: [],
  storageData: [[]],
  isSubscribed: false,
  connectStatus: "Connect",
  realData: [],
  updateRealData: () => {},
  setDistance: () => {},
  setTotalTime: () => {},
  toggleOffline: () => {},
  toggleSubscribe: () => {},
  setCurrentSpeed: () => {},
  updateDisplayData: () => {},
  updateStorageData: () => {},
  updateBackgroundData: () => {},
  setConnectStatus: () => {},
});

export const MQTTProvider = ({ children }: PropsWithChildren) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [isOffline, setIsOffline] = useState(false);
  // display information in the map, always sync with background data
  // one for display only, one for handle background logic (update data between modes)
  const [displayData, setDisplayData] = useState<ILocationData[]>([]);
  const [backgroundData, setBackgroundData] = useState<ILocationData[]>([]);
  // data storage for metric
  const [storageData, setStorageData] = useState<ILocationData[][]>([[]]);
  const [connectStatus, setConnectStatus] = useState("Connect");
  // real data returned, not transformed
  const [realData, setRealData] = useState<ILocationData[]>([]);

  useEffect(() => {
    if (!isSubscribed && isOffline && storageData.length) {
      updateBackgroundData(storageData[storageData.length - 1]);
    }
  }, [isOffline, isSubscribed, storageData]);

  // push online data to storage when unsubscribe
  useEffect(() => {
    if (!isOffline && !isSubscribed && backgroundData.length) {
      updateStorageData(backgroundData);
    }
  }, [backgroundData, isOffline, isSubscribed]);

  // sync background data with display data
  useEffect(() => {
    updateDisplayData(backgroundData);
  }, [backgroundData]);

  const toggleSubscribe = (value: boolean) => {
    setIsSubscribed(value);
  };

  const toggleOffline = (value: boolean) => {
    setIsOffline(value);
  };

  const updateDisplayData = (data: ILocationData | ILocationData[]) => {
    Array.isArray(data)
      ? setDisplayData(data)
      : setDisplayData((value) => [...value, data]);
  };

  const updateBackgroundData = (data: ILocationData | ILocationData[]) => {
    Array.isArray(data)
      ? setBackgroundData(data)
      : setBackgroundData((value) => [...value, data]);
  };

  const updateRealData = (data: ILocationData) => {
    setRealData((prev) => [...prev, data]);
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
        backgroundData,
        currentSpeed,
        setDistance,
        setTotalTime,
        toggleOffline,
        toggleSubscribe,
        setCurrentSpeed,
        updateDisplayData,
        updateStorageData,
        updateBackgroundData,
        connectStatus,
        setConnectStatus,
        realData,
        updateRealData,
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
