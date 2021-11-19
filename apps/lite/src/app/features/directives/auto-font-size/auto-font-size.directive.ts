import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { fromEvent, timer } from 'rxjs';
import { first, tap } from 'rxjs/operators';

@Directive({
  selector: '[appAutoFontSize]',
})
export class AutoFontSizeDirective implements AfterViewInit {
  private length = 0;
  @Input()
  set appAutoFontSize(length: number) {
    this.length = length;
    this.calcNewSize();
  }
  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2
  ) {
    const requiredStyles = new Map<string, string>([
      ['flex', '1 1 auto'],
      ['display', 'flex'],
      ['justify-content', 'flex-end'],
      ['height', '100%'],
      ['align-items', 'center'],
      ['gap', '.3rem'],
    ]);
    requiredStyles.forEach((value, style) => {
      this.renderer.setStyle(elementRef.nativeElement, style, value);
    });
  }
  private calcNewSize(): void {
    const wight = this.elementRef.nativeElement.clientWidth;
    const height = this.elementRef.nativeElement.clientHeight;
    this.elementRef.nativeElement.style.fontSize =
      Math.min(height * 0.6, Math.trunc(wight / this.length / 0.6)) + 'px';
  }

  ngAfterViewInit(): void {
    timer(0)
      .pipe(
        first(),
        tap(() => this.calcNewSize())
      )
      .subscribe();
  }
}
