import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementSubMenuComponent } from './element-sub-menu.component';

describe('ElementSubMenuComponent', () => {
  let component: ElementSubMenuComponent;
  let fixture: ComponentFixture<ElementSubMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElementSubMenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
