import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultWidgetComponent } from './default-widget.component';

describe('DefaultWidgetComponent', () => {
  let component: DefaultWidgetComponent;
  let fixture: ComponentFixture<DefaultWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefaultWidgetComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
