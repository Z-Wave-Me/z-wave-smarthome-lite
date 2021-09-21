import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[zWaveCloser]',
})
export class CloserDirective {
  private offset = 130;

  constructor(private readonly elementRef: ElementRef) {}

  @HostListener('window:touchend')
  touchEnd() {
    if (
      this.elementRef.nativeElement.getBoundingClientRect().top +
        this.elementRef.nativeElement.getBoundingClientRect().bottom -
        2 * this.offset >
      0
    ) {
      this.elementRef.nativeElement.scrollTop = 0;

      console.log('scroll to 0  0');
    } else {
      this.elementRef.nativeElement.scrollTop =
        this.elementRef.nativeElement.getBoundingClientRect().height;
      console.log(
        'scroll to 0 ',
        this.elementRef.nativeElement.getBoundingClientRect().height
      );
    }
    console.log(this.elementRef.nativeElement);
  }
}
