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
  locationData: [],
  isSubscribed: false,
  locationExcelData: [[]],
  setDistance: () => {},
  setTotalTime: () => {},
  toggleOffline: () => {},
  toggleSubscribe: () => {},
  setCurrentSpeed: () => {},
  handleLocationData: () => {},
  handleLocationExcelData: () => {},
});

export const MQTTProvider = ({ children }: PropsWithChildren) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  // display information in the map
  const [locationData, setLocationData] = useState<ILocationData[]>([]);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [isOffline, setIsOffline] = useState(false);
  // data storage for metric
  const [locationExcelData, setLocationExcelData] = useState<ILocationData[][]>(
    [[]]
  );

  useEffect(() => {
    if (!isSubscribed && isOffline && locationExcelData.length) {
      setLocationData(locationExcelData[locationExcelData.length - 1]);
    }
  }, [isOffline, isSubscribed, locationExcelData]);

  // push online data to storage when unsubscribe
  useEffect(() => {
    if (!isSubscribed && locationData.length) {
      handleLocationExcelData(locationData);
    }
  }, [isSubscribed]);

  const toggleSubscribe = () => {
    setIsSubscribed((value) => !value);
  };

  const toggleOffline = () => {
    setIsOffline((value) => !value);
  };

  const handleLocationData = (data: ILocationData | ILocationData[]) => {
    Array.isArray(data)
      ? setLocationData(data)
      : setLocationData((value) => [...value, data]);
  };

  const handleLocationExcelData = (data: ILocationData[]) => {
    setLocationExcelData((prev) => [...prev, data]);
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
        locationData,
        locationExcelData,
        currentSpeed,
        setDistance,
        setTotalTime,
        toggleOffline,
        toggleSubscribe,
        setCurrentSpeed,
        handleLocationData,
        handleLocationExcelData,
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
