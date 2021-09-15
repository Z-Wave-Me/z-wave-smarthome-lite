import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementsSubMenuComponent } from './elements-sub-menu.component';

describe('ElementsSubMenuComponent', () => {
  let component: ElementsSubMenuComponent;
  let fixture: ComponentFixture<ElementsSubMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementsSubMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementsSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
