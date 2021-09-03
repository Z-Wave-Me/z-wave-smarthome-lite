import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ProfileState } from './profile.state';
// import { ProfileAction } from './profile.actions';

describe('Profile actions', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ProfileState])],
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    // store.dispatch(new ProfileAction('item-1'));
    store
      .select((state) => state.profile.items)
      .subscribe((items: string[]) => {
        expect(items).toEqual(jasmine.objectContaining(['item-1']));
      });
  });
});
