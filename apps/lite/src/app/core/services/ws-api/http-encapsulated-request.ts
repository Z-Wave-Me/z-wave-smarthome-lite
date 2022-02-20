export interface HttpEncapsulatedRequest {
  method: 'GET' | 'PUT' | 'POST' | 'DELETE';
  url: string;
  body?: Record<string, unknown> | string;
}
