import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appLabel]',
})
export class LabelDirective {
  @Input() appLabel!: string;
  constructor(private readonly elementRef: ElementRef) {
    this.elementRef.nativeElement.style.cursor = 'not-allowed';
  }
}
