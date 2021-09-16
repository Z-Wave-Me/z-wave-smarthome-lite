import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceWidgetComponent } from './device-widget.component';

describe('DeviceWidgetComponent', () => {
  let component: DeviceWidgetComponent;
  let fixture: ComponentFixture<DeviceWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
