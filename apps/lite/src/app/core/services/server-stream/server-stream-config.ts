export type availableApi =
  | 'devices'
  | 'locations'
  | 'profile'
  | 'notifications';
export interface ServerStreamConfig {
  api: availableApi;
  timeBetweenRequests?: number;
}
