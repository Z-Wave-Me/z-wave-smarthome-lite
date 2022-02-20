export interface PayloadInterface {
  data?: Record<string, unknown>;
  params?: { key: string; value: string | number }[];
  command?: string | number;
  responseEvent?: string;
  method?: 'GET' | 'PUT' | 'POST' | 'DELETE';
}
