import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsSubMenuComponent } from './rooms-sub-menu.component';

describe('RoomsSubMenuComponent', () => {
  let component: RoomsSubMenuComponent;
  let fixture: ComponentFixture<RoomsSubMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomsSubMenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
