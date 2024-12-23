import { QoS } from "mqtt";

export interface ISubscription {
  topic: string;
  qos: QoS;
}

export interface IPublishPayload extends ISubscription {
  payload: string;
}

export interface ILinkItem {
  path: string;
  name: string;
  location: string;
}

export interface ILocationData {
  vertical: number;
  horizontal: number;
  timestamp: number;
}

export type workSheetArray = [number, number, number][];

export interface IInfoTooltip {
  message: string;
}

export interface IContextProps {
  time: number;
  distance: number;
  isOffline: boolean;
  currentSpeed: number;
  isSubscribed: boolean;
  displayData: ILocationData[];
  backgroundData: ILocationData[];
  storageData: ILocationData[][];
  connectStatus: string;
  realData: ILocationData[];
  updateRealData: (data: ILocationData) => void;
  setTotalTime: (time: number) => void;
  setDistance: (distance: number) => void;
  toggleOffline: (value: boolean) => void;
  toggleSubscribe: (value: boolean) => void;
  setCurrentSpeed: (speed: number) => void;
  updateDisplayData: (data: ILocationData | ILocationData[]) => void;
  updateBackgroundData: (data: ILocationData | ILocationData[]) => void;
  updateStorageData: (data: ILocationData[]) => void;
  setConnectStatus: (status: string) => void;
}
