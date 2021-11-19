import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileName',
})
export class FileNamePipe implements PipeTransform {
  transform(value: unknown, size: number, ...args: unknown[]): unknown {
    console.log(value);
    console.log(size);
    if (typeof value === 'string') {
      value = value.split('/').pop()?.split('\\').pop();
      if (typeof value === 'string' && value.length > size) {
        size = Math.trunc((size - 3) / 2);
        const last = value.length - size;
        value = value.slice(0, size) + '...' + value.slice(last);
      }
    }
    return value;
  }
}
