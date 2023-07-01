export interface ISubscription {
  topic: string;
  qos?: 0 | 1 | 2;
}

export interface IPublishPayload {
  topic: string;
  payload: string;
  qos?: 0 | 1 | 2;
}

export interface ICoordinates {
  latitude: number;
  longitude: number;
}

export interface ILinkItem {
  path: string;
  name: string;
}
