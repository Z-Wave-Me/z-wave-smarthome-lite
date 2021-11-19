export interface Metric {
  level: number | string;
  icon: string;

  [index: string]: string | number;
}
export interface Device {
  deviceType: string;
  inProgress?: boolean;
  visibility: boolean;
  tags: string[];
  creationTime: number;
  updateTime: number;
  title: string;
  creatorId: number;
  intChartUrl?: string;
  hasHistory?: boolean;
  showNotification?: boolean;
  onDashboard: boolean;
  hideEvents: boolean;
  id: string;
  iconPath: string;
  metrics: Metric;
  order: {
    [key in OrderByLocations]: number;
  };

  [key: string]: any;
}
export type OrderByLocations = 'rooms' | 'elements' | 'dashboard';
