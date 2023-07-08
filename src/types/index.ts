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
  latitude: number;
  longitude: number;
}

export interface IContextProps {
  isSubscribed: boolean;
  locationData: ILocationData[];
  locationExcelData: ILocationData[];
  toggleSubscribe: () => void;
  handleLocationData: (data: ILocationData) => void;
  handleLocationExcelData: (data: ILocationData[]) => void;
}
