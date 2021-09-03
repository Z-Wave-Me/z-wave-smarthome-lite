import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'any',
})
export class ConfigService {
  private configuration?: { [index: string]: any };

  constructor(private httpClient: HttpClient) {}
  load(): Observable<void> {
    return this.httpClient.get('/assets/config.json').pipe(
      tap((configuration: any) => (this.configuration = configuration)),
      mapTo(undefined),
    );
  }

  get(key: string, defaultValue?: string): string {
    return this.configuration?.[key] || defaultValue;
  }
}
