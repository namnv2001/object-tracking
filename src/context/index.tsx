import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';
import { IContextProps, ILocationData } from 'types';

export const MQTTContext = createContext<IContextProps>({
  isSubscribed: false,
  toggleSubscribe: () => {},
  locationData: [],
  handleLocationData: () => {},
});

export const MQTTProvider = ({ children }: PropsWithChildren) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [locationData, setLocationData] = useState<ILocationData[]>([]);

  const toggleSubscribe = () => {
    setIsSubscribed((value) => !value);
  };

  const handleLocationData = (data: ILocationData) => {
    setLocationData((value) => [...value, data]);
  };

  return (
    <MQTTContext.Provider
      value={{
        isSubscribed,
        toggleSubscribe,
        locationData,
        handleLocationData,
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
