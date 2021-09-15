import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementSubMenuOrderByComponent } from './element-sub-menu-order-by.component';

describe('ElenentSubMenuOrderByComponent', () => {
  let component: ElementSubMenuOrderByComponent;
  let fixture: ComponentFixture<ElementSubMenuOrderByComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElementSubMenuOrderByComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementSubMenuOrderByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
