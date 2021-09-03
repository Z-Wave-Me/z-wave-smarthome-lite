import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchMultilevelWidgetComponent } from './switch-multilevel-widget.component';

describe('SwitchMultilevelWidgetComponent', () => {
  let component: SwitchMultilevelWidgetComponent;
  let fixture: ComponentFixture<SwitchMultilevelWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SwitchMultilevelWidgetComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchMultilevelWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
