import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  HostListener,
  OnInit,
} from '@angular/core';
import { DropDownService } from './drop-down.service';
import { DropDownHeadComponent } from './drop-down-head/drop-down-head.component';
import { DropDownContentComponent } from './drop-down-content/drop-down-content.component';
import { fromEvent } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { DestroyService } from '@core/services/destroy/destroy.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'z-wave-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss'],
  providers: [DropDownService, DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropDownComponent implements OnInit, AfterViewInit {
  @ContentChild(DropDownHeadComponent, { read: ElementRef })
  dropDownHead?: ElementRef;
  @ContentChild(DropDownContentComponent, { read: ElementRef })
  dropDownContent?: ElementRef;
  constructor(
    private readonly element: ElementRef,
    private readonly dropDownService: DropDownService,
    private readonly destroy$: DestroyService,
    private readonly router$: Router
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.dropDownHead && this.dropDownContent) {
      fromEvent(this.dropDownHead.nativeElement, 'click')
        .pipe(
          takeUntil(this.destroy$),
          tap(() => {
            this.dropDownService.toggleMenu();
            this.dropDownHead?.nativeElement.classList.toggle('active');
          })
        )
        .subscribe();
      this.router$.events
        .pipe(
          takeUntil(this.destroy$),
          filter((e): e is NavigationEnd => e instanceof NavigationEnd),
          map(() => {
            this.dropDownService.closeMenu();
            this.dropDownHead?.nativeElement.classList.remove('active');
          })
        )
        .subscribe();
    } else {
      throw new Error(
        'DropDownHeadComponent && DropDownContentComponent must be implemented in DropDownComponent'
      );
    }
  }

  @HostListener('document:click', ['$event'])
  private emit(event: Event): void {
    if (!this.element.nativeElement.contains(event.target)) {
      this.dropDownService.closeMenu();
      this.dropDownHead?.nativeElement.classList.remove('active');
    }
  }
}
