export type Pages = 'dashboard' | 'rooms' | 'notifications' | 'elements';
export type SupportFilters = 'location' | 'deviceType' | 'dashboard';
// export type SupportLanguages = 'en' | 'ru';
export type OrderDirection = 'asc' | 'desc' | 'custom';
export type OrderFields = 'title' | 'timeCreation' | 'updateTime';

export interface SupportOrders {
  order: OrderDirection;
  field?: OrderFields;
}

export interface ShowOptions {
  place: Pages;
  order: SupportOrders;
  filter: SupportFilters;
}

export interface FilterPredicate {
  [key: string]: any;
  location?: number;
  onDashboard?: boolean;
  deviceType?: string[];
}
