import { InjectionToken } from '@angular/core';
import { FilterPredicate } from '@modules/interfaces/pages.interfaces';

export const FILTER = new InjectionToken<FilterPredicate>('Filter token');
