import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultilevelSensorComponent } from './multilevel-sensor.component';

describe('MultilevelSensorComponent', () => {
  let component: MultilevelSensorComponent;
  let fixture: ComponentFixture<MultilevelSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultilevelSensorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultilevelSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
