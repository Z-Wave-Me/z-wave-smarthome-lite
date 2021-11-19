import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchMultilevelControlComponent } from './switch-multilevel-control.component';

describe('SwitchMultilevelControlComponent', () => {
  let component: SwitchMultilevelControlComponent;
  let fixture: ComponentFixture<SwitchMultilevelControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SwitchMultilevelControlComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchMultilevelControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
