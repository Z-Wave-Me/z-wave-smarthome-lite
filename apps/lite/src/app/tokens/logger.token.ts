import { InjectionToken } from '@angular/core';

export const LOGGER = new InjectionToken<{ [key: string]: any }>(
  'Logger token'
);
