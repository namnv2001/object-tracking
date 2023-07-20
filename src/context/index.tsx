import React, {
  PropsWithChildren,
  createContext,
  useContext,
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
  locationExcelData: [],
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
  const [locationData, setLocationData] = useState<ILocationData[]>([]);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [isOffline, setIsOffline] = useState(false);
  const [locationExcelData, setLocationExcelData] = useState<ILocationData[]>(
    []
  );

  const toggleSubscribe = () => {
    setIsSubscribed((value) => !value);
  };

  const toggleOffline = () => {
    setIsOffline((value) => !value);
  };

  const handleLocationData = (data: ILocationData) => {
    setLocationData((value) => [...value, data]);
  };

  const handleLocationExcelData = (data: ILocationData[]) => {
    setLocationExcelData(data);
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
        currentSpeed,
        setDistance,
        setTotalTime,
        toggleOffline,
        toggleSubscribe,
        setCurrentSpeed,
        locationExcelData,
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
