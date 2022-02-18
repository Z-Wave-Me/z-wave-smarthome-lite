import { Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileLayoutRoutingModule } from './mobile-layout-routing.module';
import { MobileLayoutComponent } from './mobile-layout/mobile-layout.component';
import { MobileHeaderModule } from '@components/mobile/mobile-header/mobile-header.module';
import { MobileFooterModule } from '@components/mobile/mobile-footer/mobile-footer.module';
import { TuiOverscrollModule } from '@taiga-ui/cdk';
import { MobileTitleService } from '@core/services/mobile-title/mobile-title.service';
import { TuiScrollbarModule } from '@taiga-ui/core';
import { SwipeNavigationModule } from '@features/directives/swipe-navigation/swipe-navigation.module';
import { SERVER_SYNCHRONIZATION } from '../main-layout/tokens/server-synchronization.token';
import { ServerStreamService } from '@core/services/server-stream/server-stream.service';

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

const profileFactory = (serverStreamService: ServerStreamService) => {
  serverStreamService.subscribe({
    api: 'profile',
  });
  return 'profile';
};

const eventsFactory = (serverStreamService: ServerStreamService) => {
  serverStreamService.subscribe({
    api: 'events',
  });
  return 'events';
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
    MobileTitleService,
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
    {
      provide: SERVER_SYNCHRONIZATION,
      useFactory: profileFactory,
      deps: [ServerStreamService],
      multi: true,
    },
    // {
    //   provide: SERVER_SYNCHRONIZATION,
    //   useFactory: eventsFactory,
    //   deps: [ServerStreamService],
    //   multi: true,
    // },
  ],
})
export class MobileLayoutModule {
  constructor(@Inject(SERVER_SYNCHRONIZATION) serverSynchronization: string[]) {
    console.warn('MobileLayoutModule loaded');
  }
}
