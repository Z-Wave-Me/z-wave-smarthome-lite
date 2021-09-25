import { Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileLayoutRoutingModule } from './mobile-layout-routing.module';
import { MobileLayoutComponent } from './mobile-layout/mobile-layout.component';
import { MobileHeaderModule } from '@components/mobile/mobile-header/mobile-header.module';
import { MobileFooterModule } from '@components/mobile/mobile-footer/mobile-footer.module';
import { TuiOverscrollModule } from '@taiga-ui/cdk';
import { MobileTitleService } from '@core/services/mobile-title/mobile-title.service';
import { ServerStreamService } from '@core/services/server-stream/server-stream.service';
import { SubscriptionManagerService } from '@core/services/subscription-manager/subscription-manager.service';
import { SERVER_SYNCHRONIZATION } from '../main-layout/tokens/server-synchronization.token';
import { TuiScrollbarModule } from '@taiga-ui/core';
import { SwipeNavigationModule } from '@features/directives/swipe-navigation/swipe-navigation.module';

const deviceFactory = (serverStreamService: ServerStreamService) => {
  serverStreamService.subscribe({ api: 'devices' });
  return 'devices';
};

const locationFactory = (serverStreamService: ServerStreamService) => {
  serverStreamService.subscribe({
    api: 'locations',
    timeBetweenRequests: 6000,
  });
  return 'locations';
};

@NgModule({
  declarations: [MobileLayoutComponent],
  imports: [
    CommonModule,
    MobileLayoutRoutingModule,
    MobileHeaderModule,
    MobileFooterModule,
    TuiOverscrollModule,
    TuiScrollbarModule,
    SwipeNavigationModule,
  ],
  providers: [
    {
      provide: SERVER_SYNCHRONIZATION,
      useFactory: deviceFactory,
      deps: [ServerStreamService],
      multi: true,
    },
    {
      provide: SERVER_SYNCHRONIZATION,
      useFactory: locationFactory,
      deps: [ServerStreamService],
      multi: true,
    },
    SubscriptionManagerService,
    MobileTitleService,
  ],
})
export class MobileLayoutModule {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Inject(SERVER_SYNCHRONIZATION) serverSynchronization: string[]
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) {}
}
