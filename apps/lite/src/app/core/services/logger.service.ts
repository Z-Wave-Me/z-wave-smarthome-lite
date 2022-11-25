import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private readonly store: string[] = [];
  private readonly datePipe = new DatePipe('en');
  constructor() {
    console.log = (data) => {
      this.store.push('\nlog:' + JSON.stringify(data, null, 2));
    };
    console.warn = (data) => {
      this.store.push('\nwarn:' + JSON.stringify(data, null, 2));
    };
    console.error = (data) => {
      this.store.push('\nERROR:' + JSON.stringify(data, null, 2));
    };
  }
  log(data: any) {
    this.store.push('\nCUSTOM: ' + JSON.stringify(data));
  }
  save() {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(
      new Blob([this.store.concat(' ') as any], { type: 'text/html' })
    );
    a.download =
      'log-' +
      (this.datePipe.transform(new Date(), 'MM-dd--HH-mm') ?? '') +
      '.txt';
    a.click();
  }
}
