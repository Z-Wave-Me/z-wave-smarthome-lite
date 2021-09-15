import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementSubMenuFilterByTagComponent } from './element-sub-menu-filter-by-tag.component';

describe('ElementSubMenuFilterByTagComponent', () => {
  let component: ElementSubMenuFilterByTagComponent;
  let fixture: ComponentFixture<ElementSubMenuFilterByTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElementSubMenuFilterByTagComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementSubMenuFilterByTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
