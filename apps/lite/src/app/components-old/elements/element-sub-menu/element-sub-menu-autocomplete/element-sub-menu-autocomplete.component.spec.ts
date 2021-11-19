import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementSubMenuAutocompleteComponent } from './element-sub-menu-autocomplete.component';

describe('ElementSubMenuAutocompleteComponent', () => {
  let component: ElementSubMenuAutocompleteComponent;
  let fixture: ComponentFixture<ElementSubMenuAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElementSubMenuAutocompleteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementSubMenuAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
