import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteWidgetComponent } from './autocomplete-widget.component';

describe('AutocompleteWidgetComponent', () => {
  let component: AutocompleteWidgetComponent;
  let fixture: ComponentFixture<AutocompleteWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutocompleteWidgetComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
