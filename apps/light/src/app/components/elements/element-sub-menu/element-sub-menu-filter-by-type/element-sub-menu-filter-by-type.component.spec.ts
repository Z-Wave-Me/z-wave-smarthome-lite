import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementSubMenuFilterByTypeComponent } from './element-sub-menu-filter-by-type.component';

describe('ElementSubMenuFilterByTypeComponent', () => {
  let component: ElementSubMenuFilterByTypeComponent;
  let fixture: ComponentFixture<ElementSubMenuFilterByTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElementSubMenuFilterByTypeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementSubMenuFilterByTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
