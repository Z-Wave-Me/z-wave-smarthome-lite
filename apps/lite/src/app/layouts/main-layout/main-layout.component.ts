import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SetProfile } from '@store/profile/profile.actions';
import { Observable } from 'rxjs';
import { ProfileState } from '@store/profile/profile.state';
import { ProfileInterface } from '@store/profile/profile.interfaces';
import { DevicesState } from '@store/devices/devices.state';
import { LocationsState } from '@store/locations/locations.state';
import { SERVER_SYNCHRONIZATION } from './tokens/server-synchronization.token';
import { AlertService } from '@core/services/alert/alert.service';
import { RouterOutlet } from '@angular/router';
import { routeTransitionAnimations } from './route-transition-animations';

@Component({
  selector: 'z-wave-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routeTransitionAnimations],
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  @Select(ProfileState) profile$?: Observable<ProfileInterface>;
  @Select(DevicesState) devices$?: Observable<any>;
  @Select(LocationsState) locations$?: Observable<any>;

  constructor(
    @Inject(SERVER_SYNCHRONIZATION) serverSynchronization: string[],
    private store: Store,
    private readonly alertService: AlertService
  ) {}

  ngOnInit(): void {
    // this.store.dispatch(new SetProfile());
  }

  getProfile(): void {
    // this.store.dispatch(new SetProfile());
  }

  ngOnDestroy(): void {}

  prepareRoute(outlet: RouterOutlet): string {
    return outlet?.activatedRouteData?.animation;
  }
}
