import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appLongPress]',
})
export class LongPressDirective {
  pressing = false;
  longPressing = false;
  timeout: any;
  interval?: number;

  @Output() LongPress = new EventEmitter();

  @Output() LongPressing = new EventEmitter();

  @HostBinding('class.press')
  get press(): boolean {
    return this.pressing;
  }

  @HostBinding('class.long-press')
  get longPress(): boolean {
    return this.longPressing;
  }

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: Event): void {
    this.pressing = true;
    this.longPressing = false;
    this.timeout = setTimeout(() => {
      this.longPressing = true;
      this.LongPress.emit(event);
      this.interval = setInterval(() => {
        this.LongPressing.emit(event);
      }, 50);
    }, 500);
  }

  @HostListener('touchend')
  @HostListener('mouseup')
  @HostListener('mouseleave')
  endPress(): void {
    clearTimeout(this.timeout);
    clearInterval(this.interval);
    this.longPressing = false;
    this.pressing = false;
  }
}
