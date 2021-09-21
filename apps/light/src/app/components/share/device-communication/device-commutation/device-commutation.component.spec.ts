import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceCommutationComponent } from './device-commutation.component';

describe('DeviceCommutationComponent', () => {
  let component: DeviceCommutationComponent;
  let fixture: ComponentFixture<DeviceCommutationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceCommutationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceCommutationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
