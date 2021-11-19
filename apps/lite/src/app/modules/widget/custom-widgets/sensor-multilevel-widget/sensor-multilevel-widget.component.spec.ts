import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorMultilevelWidgetComponent } from './sensor-multilevel-widget.component';

describe('SensorMultilevelComponent', () => {
  let component: SensorMultilevelWidgetComponent;
  let fixture: ComponentFixture<SensorMultilevelWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SensorMultilevelWidgetComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorMultilevelWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
