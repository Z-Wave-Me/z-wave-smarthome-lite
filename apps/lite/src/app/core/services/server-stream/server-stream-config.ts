export type availableApi = 'devices' | 'locations' | 'profile' | 'events';
export interface ServerStreamConfig {
  api: availableApi;
  timeBetweenRequests?: number;
}
