import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RestorePositionService<K, V> extends Map<K, V> {
  getWithDefault(key: K, byDefault: V) {
    return super.get(key) ?? byDefault;
  }
}
