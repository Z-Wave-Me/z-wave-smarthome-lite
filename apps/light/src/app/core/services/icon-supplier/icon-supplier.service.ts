import { Injectable } from '@angular/core';
import { IconSupplierConfig } from '@core/services/icon-supplier/icon-supplier';
import { config } from './icon-supplier.config';
import { Device } from '@store/devices/deviceInterface';

@Injectable({
  providedIn: 'root',
})
export class IconSupplierService {
  private static iconMap = new Map<string, string>([
    ['text', 'fa-file-alt'],
    ['camera', 'fa-video'],
    ['switchRGBW', 'fa-star-half'],
    ['switchControl', 'fa-toggle-off'],
    ['switchBinary', 'fa-toggle-on'],
    ['sensorMultiline', 'fa-list-ul'],
    ['switchMultilevel', 'fa-lightbulb'],
    ['thermostat', 'fa-thermometer-half'],
    ['thermostatMode', 'fa-thermometer-half'],
    ['toggleButton', 'fa-dot-circle'],
    ['sensorDiscrete', 'fa-dot-circle'],
    ['doorlock', 'fa-lock'],
    ['sensorMultilevel', 'fa-sun'],
    ['sensorBinary', 'fa-fire'],
  ]);
  private iconsPath = 'assets/img/icons/';
  private customIconsPath = 'assets/user/icons/';
  private readonly config: IconSupplierConfig;

  constructor() {
    this.config = config;
  }

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
    return level.toString();
  }

  // Default icon
  assignElementIcon({
    metrics: { icon: iconType, level },
    customIcons,
  }: Device): string {
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

  deviceTypeIconSupplier(iconName: string): string {
    return IconSupplierService.iconMap.get(iconName) ?? 'fa-caret-right';
  }
}
