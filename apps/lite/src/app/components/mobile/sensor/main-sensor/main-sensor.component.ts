import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { faFilePowerpoint as faPowerOff } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'z-wave-main-sensor',
  templateUrl: './main-sensor.component.html',
  styleUrls: ['./main-sensor.component.scss'],
  styles: [
    `
      .switch {
        transform: translateY(var(--sensor-position));
        background-color: var(--sensor-color);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainSensorComponent implements OnChanges, AfterViewInit {
  faPowerOff = faPowerOff;
  transition = false;
  @ViewChild('border', { static: true, read: ElementRef })
  borderRef?: ElementRef;
  @ViewChild('switcher', { static: true }) switchRef?: ElementRef;
  @Input() disabled = false;
  @Input()
  mode: 'binary' | 'multi' = 'binary';
  @Input()
  currentValue = 0;
  @Output()
  value = new EventEmitter<number>();
  private height = 0;
  private onStart = 0;
  private readonly maxValue = 100;
  private position = 0;
  private color = 'var(--tui-primary)';

  @HostBinding('style.--sensor-color')
  get sccColor() {
    return this.color;
  }

  @HostBinding('style.--sensor-position')
  get sccPosition() {
    return this.position + 'px';
  }

  ngOnChanges(): void {
    this.currentValue = Math.round(this.currentValue);
    this.height = this.borderRef?.nativeElement.offsetHeight + 2;
    this.position = Math.trunc(
      (1 - this.currentValue / this.maxValue) * this.height
    );
    if (this.mode === 'binary') {
      if (this.currentValue >= 75) {
        this.color = 'var(--tui-primary)';
      } else {
        this.color = 'var(--tui-base-04)';
      }
    }
  }

  @HostListener('touchstart', ['$event'])
  sensorStart(event: TouchEvent) {
    if (this.disabled) return;
    this.transition = false;
    this.onStart = event.touches[0].clientY - this.position;
  }

  @HostListener('tap', ['$event'])
  sensorTap(event: HammerInput) {
    if (this.disabled) return;

    if (this.mode === 'binary') {
      this.onStart =
        this.borderRef?.nativeElement.getBoundingClientRect().top +
        this.switchRef?.nativeElement.offsetHeight / 2;
      this.updateValue(event.center.y);
    }
    this.closer();
  }

  @HostListener('touchmove', ['$event'])
  sensorMove(event: TouchEvent) {
    if (this.disabled) return;
    event.preventDefault();
    this.updateValue(event.touches[0].pageY);
  }

  @HostListener('touchend', ['$event'])
  sensorEnd(event: TouchEvent) {
    if (this.disabled) return;
    this.updateValue(event.changedTouches[0].clientY);
    this.closer();
  }

  ngAfterViewInit(): void {
    if (this.disabled) {
      this.transition = true;
    }
  }

  private closer() {
    let value;
    if (this.mode === 'binary') {
      value = this.currentValue >= 75 ? 1 : 0;
      this.transition = true;
      if (value) {
        this.color = 'var(--tui-primary)';
        this.position = 0;
      } else {
        this.color = 'var(--tui-base-04)';
        this.position = this.switchRef?.nativeElement.offsetHeight;
      }
    } else {
      value = this.currentValue;
    }
    this.value.emit(value);
  }

  private updateValue(position: number) {
    const updatePosition = position - this.onStart;
    let switchHeight;
    if (this.mode === 'binary') {
      switchHeight = this.switchRef?.nativeElement.offsetHeight;
    }
    if (this.mode === 'multi') {
      switchHeight = this.borderRef?.nativeElement.offsetHeight;
    }
    this.position = Math.trunc(
      Math.max(Math.min(switchHeight + 2, updatePosition), 0)
    );
    this.currentValue = Math.round(
      this.maxValue * (1 - (this.position - 1) / this.height)
    );
  }
}
