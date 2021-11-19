export interface AuthTokenInterface {
  agent: string;
  date: number;
  expire: number;
  ip: string;
  lastSeen: number;
  sid: string;
}

export interface ProfileInterface {
  authTokens?: AuthTokenInterface[];
  beta?: boolean;
  dashboard?: any[]; // TODO check type
  email?: string;
  expert_view?: boolean;
  hide_all_device_events?: boolean;
  hide_single_device_events?: any[]; // TODO check type
  hide_system_events?: boolean;
  id?: number;
  interval?: number;
  lang?: string;
  login?: string;
  name?: string;
  night_mode?: boolean;
  role?: number;
  rooms?: number[];
  uuid?: string;
  settings: {
    dashboard: {
      orderBy: string;
    };
    elements: {
      orderBy: string;
    };
    rooms: {
      orderBy: string;
    };
  };
}
