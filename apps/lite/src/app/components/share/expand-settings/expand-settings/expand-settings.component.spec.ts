import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandSettingsComponent } from './expand-settings.component';

describe('ExpandSettingsComponent', () => {
  let component: ExpandSettingsComponent;
  let fixture: ComponentFixture<ExpandSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpandSettingsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
