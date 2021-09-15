import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomWidgetSensorComponent } from './room-widget-sensor.component';

describe('RoomWidgetSecsorComponent', () => {
  let component: RoomWidgetSensorComponent;
  let fixture: ComponentFixture<RoomWidgetSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomWidgetSensorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomWidgetSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
