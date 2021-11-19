export interface HttpEncapsulatedRequest {
  method: 'POST' | 'GET' | 'DELETE' | 'PUT';
  url: string;
  body?: Record<string, unknown> | string;
  responseEvent?: string;
}
