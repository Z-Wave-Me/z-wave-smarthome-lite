import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementsFiltersComponent } from './elements-filters.component';

describe('ElementsFiltersComponent', () => {
  let component: ElementsFiltersComponent;
  let fixture: ComponentFixture<ElementsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementsFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
