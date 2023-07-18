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

export interface ITrackingMap {
  locationData: ILocationData[];
  setCurrentSpeed: (speed: number) => void;
}

export type workSheetArray = [number, number, number][];

export interface IContextProps {
  isSubscribed: boolean;
  isOffline: boolean;
  locationData: ILocationData[];
  locationExcelData: ILocationData[];
  currentSpeed: number;
  toggleOffline: () => void;
  toggleSubscribe: () => void;
  setCurrentSpeed: (speed: number) => void;
  handleLocationData: (data: ILocationData) => void;
  handleLocationExcelData: (data: ILocationData[]) => void;
}
