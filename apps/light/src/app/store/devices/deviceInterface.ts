export interface DeviceInterface {
  creationTime: number;
  creatorId: number;
  customIcons: {};
  deviceType: string;
  h: number;
  hasHistory: boolean;
  id: string;
  location: number;
  locationName: string;
  metrics: {
    probeTitle?: string;
    scaleTitle?: string;
    title: string;
    icon: string;
    level?: string;
  };
  order: {
    rooms: string;
    elements: string;
    dashboard: string;
  };
  permanently_hidden: boolean;
  probeType: string;
  tags: any[];
  updateTime: number;
  visibility: boolean;
}
