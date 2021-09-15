import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsGalleryComponent } from './rooms-gallery.component';

describe('RoomsGalleryComponent', () => {
  let component: RoomsGalleryComponent;
  let fixture: ComponentFixture<RoomsGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomsGalleryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
