export interface ServerStreamConfig {
  api: 'devices' | 'locations' | 'profile';
  timeBetweenRequests?: number;
}
