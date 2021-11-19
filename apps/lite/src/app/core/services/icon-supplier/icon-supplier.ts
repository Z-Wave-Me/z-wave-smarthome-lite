export interface IconSupplierConfig {
  [key: string]: Icon;
}
export interface Icon {
  level?: {
    [key: string]: string;
  };
  default?: string;
}
