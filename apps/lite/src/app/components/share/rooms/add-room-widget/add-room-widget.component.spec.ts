import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoomWidgetComponent } from './add-room-widget.component';

describe('AddRoomWidgetComponent', () => {
  let component: AddRoomWidgetComponent;
  let fixture: ComponentFixture<AddRoomWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRoomWidgetComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoomWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
