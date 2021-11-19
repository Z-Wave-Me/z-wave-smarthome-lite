import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/api/api.service';
import { Store } from '@ngxs/store';
import { ProgressDevice } from '@store/devices/devices.actions';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DeviceControlService {
  constructor(private api: ApiService, private store: Store) {}

  execute({ id, action }: { id: string; action: string }): void {
    this.store.dispatch(new ProgressDevice({ id, inProgress: true }));
    this.api
      .send('devices', { command: id + '/command/' + action })
      .pipe(first())
      .subscribe((result) => {
        //   // this.store.dispatch(new ProgressDevice({id, inProgress: false}));
        //   // console.log('DeviceControlService:', result);
      });
  }
}
