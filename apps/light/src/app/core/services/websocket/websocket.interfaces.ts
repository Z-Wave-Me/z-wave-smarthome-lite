export interface WsMessage<T> {
  event: string;
  data: T;
}
export interface WebSocketConfig {
  url: string;
}
