import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchRGBWWidgetComponent } from './switch-r-g-b-w-widget.component';

describe('SwitchRGBWComponent', () => {
  let component: SwitchRGBWWidgetComponent;
  let fixture: ComponentFixture<SwitchRGBWWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SwitchRGBWWidgetComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchRGBWWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
