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
  toggleSubscribe: () => void;
  isSubscribed: boolean;
  locationData: ILocationData[];
  handleLocationData: (data: ILocationData) => void;
}
