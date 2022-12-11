import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'significant',
  standalone: true,
})
export class SignificantPipe implements PipeTransform {
  transform(value: string, count: number = 6): string {
    const [digits, ext] = value.split(' ');
    return [(+(+digits).toPrecision(count)).toString(), ext].join(' ');
  }
}
