import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { IContextProps, ILocationData } from "types";

export const MQTTContext = createContext<IContextProps>({
  isSubscribed: false,
  isOffline: false,
  locationData: [],
  currentSpeed: 0,
  locationExcelData: [],
  toggleOffline: () => {},
  toggleSubscribe: () => {},
  setCurrentSpeed: () => {},
  handleLocationData: () => {},
  handleLocationExcelData: () => {},
});

export const MQTTProvider = ({ children }: PropsWithChildren) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [locationData, setLocationData] = useState<ILocationData[]>([]);
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

  return (
    <MQTTContext.Provider
      value={{
        isOffline,
        isSubscribed,
        locationData,
        currentSpeed,
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
