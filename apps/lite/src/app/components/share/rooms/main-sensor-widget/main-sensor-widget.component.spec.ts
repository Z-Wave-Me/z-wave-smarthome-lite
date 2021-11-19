import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSensorWidgetComponent } from './main-sensor-widget.component';

describe('MainSensorWidgetComponent', () => {
  let component: MainSensorWidgetComponent;
  let fixture: ComponentFixture<MainSensorWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainSensorWidgetComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSensorWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
