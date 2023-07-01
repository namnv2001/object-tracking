import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';

interface IContextProps {
  toggleSubscribe: () => void;
  isSubscribed: boolean;
}

export const MQTTContext = createContext<IContextProps>({
  isSubscribed: false,
  toggleSubscribe: () => {},
});

export const MQTTProvider = ({ children }: PropsWithChildren) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const toggleSubscribe = () => {
    setIsSubscribed((value) => !value);
  };
  return (
    <MQTTContext.Provider value={{ isSubscribed, toggleSubscribe }}>
      {children}
    </MQTTContext.Provider>
  );
};

export const useMqttContext = () => {
  const context = useContext(MQTTContext);
  return context;
};
