import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeverStatusWidgetComponent } from './sever-status-widget.component';

describe('SeverStatusWidgetComponent', () => {
  let component: SeverStatusWidgetComponent;
  let fixture: ComponentFixture<SeverStatusWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeverStatusWidgetComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeverStatusWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
