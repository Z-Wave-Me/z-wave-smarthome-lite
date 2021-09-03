import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownHeadComponent } from './drop-down-head.component';

describe('DropDownHeadComponent', () => {
  let component: DropDownHeadComponent;
  let fixture: ComponentFixture<DropDownHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropDownHeadComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
