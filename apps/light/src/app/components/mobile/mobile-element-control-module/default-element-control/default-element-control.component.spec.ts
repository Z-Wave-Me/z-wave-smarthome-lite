import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultElementControlComponent } from './default-element-control.component';

describe('DefaultElementControlComponent', () => {
  let component: DefaultElementControlComponent;
  let fixture: ComponentFixture<DefaultElementControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefaultElementControlComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultElementControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
