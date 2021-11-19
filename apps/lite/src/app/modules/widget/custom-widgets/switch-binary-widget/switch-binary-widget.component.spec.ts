import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchBinaryWidgetComponent } from './switch-binary-widget.component';

describe('SwitchBinaryWidgetComponent', () => {
  let component: SwitchBinaryWidgetComponent;
  let fixture: ComponentFixture<SwitchBinaryWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SwitchBinaryWidgetComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchBinaryWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
