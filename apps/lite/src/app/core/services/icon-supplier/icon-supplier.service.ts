import { Injectable } from '@angular/core';
import { IconSupplierConfig } from '@core/services/icon-supplier/icon-supplier';
import { config } from './icon-supplier.config';
import { Device } from '@store/devices/deviceInterface';
import { SNotification } from '@store/notifications/notifications.state';
import {
  faCaretRight,
  faDotCircle,
  faFileAlt,
  faFire,
  faLightbulb,
  faListUl,
  faLock,
  faStarHalf,
  faThermometerHalf,
  faToggleOff,
  faToggleOn,
  faVideo,
} from '@fortawesome/pro-regular-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faSun } from '@fortawesome/pro-light-svg-icons';

@Injectable({
  providedIn: 'root',
})
export class IconSupplierService {
  private static iconMap = new Map<string, IconDefinition>([
    ['text', faFileAlt],
    ['camera', faVideo],
    ['switchRGBW', faStarHalf],
    ['switchControl', faToggleOff],
    ['switchBinary', faToggleOn],
    ['sensorMultiline', faListUl],
    ['switchMultilevel', faLightbulb],
    ['thermostat', faThermometerHalf],
    ['thermostatMode', faThermometerHalf],
    ['toggleButton', faDotCircle],
    ['sensorDiscrete', faDotCircle],
    ['doorlock', faLock],
    ['sensorMultilevel', faSun],
    ['sensorBinary', faFire],
  ]);
  private iconsPath = 'assets/img/icons/';
  private customIconsPath = 'assets/user/icons/';
  private readonly config: IconSupplierConfig;

  constructor() {
    this.config = config;
  }

  /**
   * Given a level, return the string representation of that level
   * @param {number | string} level - The level of logging to be displayed.
   * @returns The levelMap function is being called with the level variable as an argument.
   */
  private static levelMap(level: number | string): string {
    if (!isNaN(+level)) {
      if (+level === 0) {
        return 'off';
      }
      if (+level >= 99) {
        return 'on';
      }
      return 'half';
    }
    return level?.toString();
  }

  /**
   * Given a device, return the icon for that device
   * @param {Device}  - Device
   * @returns The icon path.
   */
  assignElementIcon({
    metrics: { icon: iconType, level },
    customIcons,
  }: Pick<Device, 'metrics' | 'customIcons'>): string {
    const baseUrl = this.iconsPath;
    let icon = 'placeholder.png';
    if (/^app\/img/.test(iconType)) {
      return baseUrl + iconType.split('/').pop();
    }
    if (this.config[iconType]) {
      icon =
        this.config[iconType].default ??
        this.config[iconType].level?.[IconSupplierService.levelMap(level)] ??
        icon;
    }
    return baseUrl + icon;
  }

  assignEventIcon(sNotification: SNotification, device: Device) {
    if (device) {
      return this.assignElementIcon({
        metrics: { icon: device.iconType, level: sNotification.message.l },
        customIcons: {},
      });
    }
    let icon = this.iconsPath + 'placeholder.png';
    switch (sNotification.type) {
      case 'device-temperature':
        icon = this.iconsPath + 'event-device-temperature.png';
        break;
      case 'device-electric':
        icon = this.iconsPath + 'event-device-electric.png';
        break;
      case 'device-power':
        icon = this.iconsPath + 'event-device-power.png';
        break;
      case 'device-status':
        icon = this.iconsPath + 'event-device-status.png';
        break;
      case 'device-OnOff':
        if (typeof sNotification.message === 'string' || !sNotification.message)
          icon = this.iconsPath + 'event-device-on.png';
        else
          icon =
            sNotification.message.l == 'on'
              ? this.iconsPath + 'event-device-on.png'
              : this.iconsPath + 'event-device-off.png';
        break;
      case 'device-luminiscence':
        icon = this.iconsPath + 'event-device-luminiscence.png';
        break;
      case 'device':
        icon = this.iconsPath + 'event-device.png';
        break;
      case 'module':
        icon = this.iconsPath + 'event-module.png';
        break;
      default:
        break;
    }
    return icon;
  }

  /**
   * Given a string, return the icon name
   * @param {string} iconName - The name of the icon to be displayed.
   * @returns The icon name.
   */
  deviceTypeIconSupplier(iconName: string) {
    return IconSupplierService.iconMap.get(iconName) ?? faCaretRight;
  }
}
