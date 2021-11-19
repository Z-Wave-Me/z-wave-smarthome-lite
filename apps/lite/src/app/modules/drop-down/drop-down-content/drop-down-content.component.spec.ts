import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownContentComponent } from './drop-down-content.component';

describe('DropDownContentComponent', () => {
  let component: DropDownContentComponent;
  let fixture: ComponentFixture<DropDownContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropDownContentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
