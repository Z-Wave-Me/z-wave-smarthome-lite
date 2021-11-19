import { InjectionToken } from '@angular/core';

export const API_COMMAND = new InjectionToken<string>('Api Command Token', {
  factory: () => {
    return 'test2';
  },
});
