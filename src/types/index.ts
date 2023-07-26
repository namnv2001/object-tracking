export interface ISubscription {
  topic: string;
  qos?: 0 | 1 | 2;
}

export interface IPublishPayload {
  topic: string;
  payload: string;
  qos?: 0 | 1 | 2;
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
  setTotalTime: (time: number) => void;
  setDistance: (distance: number) => void;
  toggleOffline: () => void;
  toggleSubscribe: () => void;
  setCurrentSpeed: (speed: number) => void;
  updateDisplayData: (data: ILocationData | ILocationData[]) => void;
  updateBackgroundData: (data: ILocationData | ILocationData[]) => void;
  updateStorageData: (data: ILocationData[]) => void;
}
