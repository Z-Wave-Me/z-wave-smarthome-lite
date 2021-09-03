// export interface LocationsInterface {
//   creationTime: 1610645268;
//   creatorId: 6;
//   customIcons: {};
//   deviceType: 'battery';
//   h: -592588979;
//   hasHistory: false;
//   id: 'BatteryPolling_6';
//   location: 0;
//   locationName: 'globalRoom';
//   metrics: { probeTitle: 'Battery'; scaleTitle: '%'; title: 'Battery Polling'; icon: 'battery' };
//   order: { rooms: 0; elements: 0; dashboard: 0 };
//   permanently_hidden: false;
//   probeType: '';
//   tags: [];
//   updateTime: 1610645268;
//   visibility: true;
// }

export interface Location {
  default_img: string;
  id: number;
  img_type: string;
  main_sensors: string[];
  namespaces?: unknown[];
  show_background: boolean;
  title: string;
  user_img: string;
  imgSrc: string;
}
