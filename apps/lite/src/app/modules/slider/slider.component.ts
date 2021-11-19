import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'z-wave-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent implements AfterViewInit {
  @Input() color = '#287903';
  @Input() checked: boolean | undefined | null = false;
  @Input() mode: 'freeze' | 'regular' | undefined = 'regular';
  @Output() checkedChange = new EventEmitter();

  constructor(private readonly elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.style.setProperty('--color', this.color);
  }

  click(): void {
    if (this.mode === 'regular') {
      this.checked = !this.checked;
      this.checkedChange.emit(this.checked);
    }
  }
}
