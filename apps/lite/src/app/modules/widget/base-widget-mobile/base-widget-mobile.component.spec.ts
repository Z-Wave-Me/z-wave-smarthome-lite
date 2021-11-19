import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseWidgetMobileComponent } from './base-widget-mobile.component';

describe('BaseWidgetMobileComponent', () => {
  let component: BaseWidgetMobileComponent;
  let fixture: ComponentFixture<BaseWidgetMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseWidgetMobileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseWidgetMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
