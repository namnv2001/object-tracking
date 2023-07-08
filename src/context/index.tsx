import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { IContextProps, ILocationData } from "types";

export const MQTTContext = createContext<IContextProps>({
  isSubscribed: false,
  locationData: [],
  locationExcelData: [],
  toggleSubscribe: () => {},
  handleLocationData: () => {},
  handleLocationExcelData: () => {},
});

export const MQTTProvider = ({ children }: PropsWithChildren) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [locationData, setLocationData] = useState<ILocationData[]>([]);
  const [locationExcelData, setLocationExcelData] = useState<ILocationData[]>(
    []
  );

  const toggleSubscribe = () => {
    setIsSubscribed((value) => !value);
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
        isSubscribed,
        locationData,
        toggleSubscribe,
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
