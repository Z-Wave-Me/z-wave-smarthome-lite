export interface WsMessage<T> {
  event?: string;
  type?: string;
  data: T;
  responseEvent?: string;
}
export interface WebSocketConfig {
  url: string;
}
