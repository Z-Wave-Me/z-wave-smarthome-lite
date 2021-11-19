import { Observable } from 'rxjs';

interface Message {
  event: string;
  data: any;
}

export interface Response {
  on<T>(event: string): Observable<T>;
  send(message: Message): never;
}
