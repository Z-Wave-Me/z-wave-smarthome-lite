import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomWidgetComponent } from './room-widget.component';

describe('RoomWidegetComponent', () => {
  let component: RoomWidgetComponent;
  let fixture: ComponentFixture<RoomWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomWidgetComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
