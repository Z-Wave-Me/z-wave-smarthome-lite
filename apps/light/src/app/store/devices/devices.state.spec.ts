import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { DevicesState } from './devices.state';

describe('Devices actions', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([DevicesState])],
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    // store.dispatch(new DevicesAction('item-1'));
    store
      .select((state) => state.devices.items)
      .subscribe((items: string[]) => {
        expect(items).toEqual(jasmine.objectContaining(['item-1']));
      });
  });
});
