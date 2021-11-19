import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSensorComponent } from './main-sensor.component';

describe('MainSensorComponent', () => {
  let component: MainSensorComponent;
  let fixture: ComponentFixture<MainSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainSensorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
