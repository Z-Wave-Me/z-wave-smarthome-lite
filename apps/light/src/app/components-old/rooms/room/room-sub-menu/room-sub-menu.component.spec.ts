import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomSubMenuComponent } from './room-sub-menu.component';

describe('RoomSubMenuComponent', () => {
  let component: RoomSubMenuComponent;
  let fixture: ComponentFixture<RoomSubMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomSubMenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
