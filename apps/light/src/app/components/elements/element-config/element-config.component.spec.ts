import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementConfigComponent } from './element-config.component';

describe('ElementConfigComponent', () => {
  let component: ElementConfigComponent;
  let fixture: ComponentFixture<ElementConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElementConfigComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
